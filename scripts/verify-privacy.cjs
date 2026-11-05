// 실행: node scripts/verify-privacy.cjs
// 빌드 없는 정책 HTML을 별도 로컬 서버와 브라우저에서 확인한다.
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const http = require('node:http');
const { execFileSync } = require('node:child_process');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE ||
  '/Users/shinythink/Projects/SWMaestro/Deulli/model_dashboard/web/node_modules/playwright');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'node_modules/.privacy-review');
const executablePath = process.env.CHROMIUM_PATH ||
  '/Users/shinythink/Projects/SWMaestro/Deulli/model_dashboard/data/playwright-browsers/chromium_headless_shell-1248/chrome-headless-shell-mac-arm64/chrome-headless-shell';
const changed = ['privacy.html', 'privacy-v1-0.html', 'account-deletion.html', 'support.html'];
const archiveNotice = '\t\t<div class="note"><p><strong>이전 버전</strong> · 2026년 7월 29일 시행, 버전 1.0입니다. <a href="/privacy">현행 개인정보 처리방침</a>을 확인해 주세요.</p></div>\n';

async function main() {
  await fs.mkdir(output, { recursive: true });
  // archive는 보존 원문을 수정하지 않았는지 바이트 단위로 확인한다.
  const oldPrivacy = execFileSync('git', ['show', 'd7de10d:privacy.html'], { cwd: root, encoding: 'utf8' });
  const archive = await fs.readFile(path.join(root, 'privacy-v1-0.html'), 'utf8');
  assert(archive.includes(archiveNotice));
  assert.equal(archive.replace(archiveNotice, '').replace('content="noindex, follow"', 'content="index, follow"'), oldPrivacy);
  for (const file of ['terms.html', 'terms-next.html', 'refund.html']) {
    const original = execFileSync('git', ['show', `d7de10d:${file}`], { cwd: root, encoding: 'utf8' });
    assert.equal(await fs.readFile(path.join(root, file), 'utf8'), original, `${file}: 약관·환불 원문 변경`);
  }

  const server = http.createServer(async (request, response) => {
    try {
      let relative = decodeURIComponent(new URL(request.url, 'http://localhost').pathname).slice(1) || 'index.html';
      if (!path.extname(relative)) relative += '.html';
      const filename = path.resolve(root, relative);
      if (!filename.startsWith(root + path.sep)) throw new Error('경로 범위 밖');
      const data = await fs.readFile(filename);
      response.writeHead(200, { 'Content-Type': filename.endsWith('.css') ? 'text/css' : filename.endsWith('.svg') ? 'image/svg+xml' : 'text/html; charset=utf-8' });
      response.end(data);
    } catch {
      response.writeHead(404);
      response.end();
    }
  });
  // 사용자 개발 서버와 분리한 18000번대 포트. 충돌 시 기존 서버를 중단하지 않는다.
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(18017, '127.0.0.1', resolve);
  });
  let browser;
  const result = { archiveExact: true, unchangedContracts: 3, documents: [], viewports: [], screenshots: [], pageErrors: [] };
  try {
    browser = await chromium.launch({ executablePath, headless: true });
    const page = await browser.newPage();
    page.on('pageerror', error => result.pageErrors.push(error.message));
    const documents = (await fs.readdir(root)).filter(name => name.endsWith('.html'));
    for (const file of documents) {
      const response = await page.goto(`http://127.0.0.1:18017/${file}`, { waitUntil: 'load' });
      assert.equal(response.status(), 200);
      if (file === 'index.html') {
        await page.waitForURL('**/terms', { waitUntil: 'load' });
        result.documents.push({ file, tables: 0, rows: 0, internalLinks: 1, redirect: '/terms' });
        continue;
      }
      const structure = await page.evaluate(() => {
        const ids = [...document.querySelectorAll('[id]')].map(element => element.id);
        const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
        const tables = [...document.querySelectorAll('table')].map((table, index) => {
          const widths = [...table.rows].map(row => [...row.cells].reduce((sum, cell) => sum + cell.colSpan, 0));
          return { index, rows: widths.length, columns: widths[0], consistent: widths.every(width => width === widths[0]) };
        });
        const links = [...document.querySelectorAll('a[href]')].filter(link => link.origin === location.origin)
          .map(link => ({ path: link.pathname, hash: decodeURIComponent(link.hash.slice(1)) }));
        const sections = [...document.querySelectorAll('h2[id^="s"]')].map(element => element.id);
        const toc = [...document.querySelectorAll('.toc a')].map(link => link.hash.slice(1));
        return { duplicates, tables, links, sections, toc };
      });
      assert.deepEqual(structure.duplicates, [], `${file}: 중복 ID`);
      assert(structure.tables.every(table => table.consistent), `${file}: 표 칸 수`);
      for (const link of structure.links) {
        let target = link.path.slice(1) || 'index.html';
        if (!path.extname(target)) target += '.html';
        const contents = await fs.readFile(path.join(root, target), 'utf8');
        if (link.hash) {
          const escaped = link.hash.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          assert(new RegExp(`\\bid=["']${escaped}["']`).test(contents), `${file}: 없는 앵커 ${target}#${link.hash}`);
        }
      }
      if (file === 'privacy.html' || file === 'privacy-v1-0.html') {
        const expected = Array.from({ length: 17 }, (_, index) => `s${index + 1}`);
        assert.deepEqual(structure.sections, expected, `${file}: 17개 항 번호`);
        assert.deepEqual(structure.toc, expected, `${file}: 목차`);
      }
      result.documents.push({ file, tables: structure.tables.length, rows: structure.tables.reduce((sum, table) => sum + table.rows, 0), internalLinks: structure.links.length });
    }
    for (const width of [390, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      for (const file of changed) {
        await page.goto(`http://127.0.0.1:18017/${file}`, { waitUntil: 'load' });
        await page.evaluate(() => document.fonts.ready);
        const dimensions = await page.evaluate(() => ({
          viewport: innerWidth,
          document: document.documentElement.scrollWidth,
          body: document.body.scrollWidth,
          // 표·상단 탭의 내부 가로 스크롤은 허용하며 문서 전체 넘침을 검사한다.
          articleRight: document.querySelector('article').getBoundingClientRect().right,
        }));
        assert(dimensions.document <= width && dimensions.body <= width && dimensions.articleRight <= width + 1, `${file}/${width}: 본문 가로 넘침 ${JSON.stringify(dimensions)}`);
        result.viewports.push({ file, width, ...dimensions });
        await page.screenshot({ path: path.join(output, `${file.replace('.html', '')}-top-${width}.png`) });
        const screenshot = path.join(output, `${file.replace('.html', '')}-${width}.png`);
        await page.screenshot({ path: screenshot, fullPage: true });
        result.screenshots.push(screenshot);
        if (file === 'privacy.html') {
          for (const section of ['s2', 's8', 's16']) {
            await page.locator(`#${section}`).scrollIntoViewIfNeeded();
            await page.screenshot({ path: path.join(output, `privacy-${section}-${width}.png`) });
          }
          await page.evaluate(() => {
            let element = document.getElementById('s8').nextElementSibling;
            while (!element.classList.contains('table-scroll')) element = element.nextElementSibling;
            window.scrollTo({ top: element.getBoundingClientRect().top + scrollY - 120, behavior: 'instant' });
          });
          await page.screenshot({ path: path.join(output, `privacy-transfers-${width}.png`) });
          const transfers = page.getByRole('region', { name: '개인정보 국외 이전 표', exact: true });
          await transfers.focus();
          const scrolled = await transfers.evaluate(element => {
            element.scrollLeft = element.scrollWidth;
            return element.scrollLeft;
          });
          assert(scrolled > 0, '국외 이전 표 가로 이동');
          await page.screenshot({ path: path.join(output, `privacy-transfers-right-${width}.png`) });
          // 신규 대조표를 실제로 초점·가로 스크롤할 수 있는지 확인한다.
          await page.locator('[aria-label="개인정보 처리방침 변경 전후 대조표"]').focus();
          assert.equal(await page.evaluate(() => document.activeElement.getAttribute('role')), 'region');
          await page.keyboard.press('ArrowRight');
        }
      }
    }
    assert.deepEqual(result.pageErrors, []);
    await fs.writeFile(path.join(output, 'result.json'), JSON.stringify(result, null, 2) + '\n');
    console.log(JSON.stringify({ documents: result.documents.length, tables: result.documents.reduce((sum, doc) => sum + doc.tables, 0), rows: result.documents.reduce((sum, doc) => sum + doc.rows, 0), internalLinks: result.documents.reduce((sum, doc) => sum + doc.internalLinks, 0), viewports: result.viewports.length, pageErrors: result.pageErrors.length, archiveExact: true, unchangedContracts: 3, output }, null, 2));
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
