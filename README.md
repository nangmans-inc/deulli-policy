# deulli-policy

영어 청취 학습 앱 **들리(deulli)**의 이용약관 · 개인정보 처리방침 · 계정 삭제 요청 안내 정적 사이트.

배포 주소 — **https://deulli.policy.nangmans.com**

빌드 없는 순수 HTML/CSS다. Vercel에 그대로 올린다.

```
index.html              /terms 이동용 폴백
terms.html              → /terms
privacy.html            → /privacy
account-deletion.html   → /account-deletion
logo.svg                사이트 로고 및 파비콘
styles.css              라이트 모드, 탭 탐색, 모바일 대응
vercel.json             cleanUrls: true, / → /terms 리디렉션
```

---

## 왜 필요한가

앱만 있어도 공개 웹 URL이 필요하다. 스토어 요구사항이 서로 다르다.

| | Apple | Google Play |
| --- | --- | --- |
| 개인정보 처리방침 웹 URL | **필수** — App Store Connect 메타데이터 필드가 URL 입력란 | **필수** |
| 계정 삭제 요청 웹 URL | 불필요 | **필수** — Data safety 폼에 등록 |
| 앱 내 계정 삭제 | **필수** (앱에서 시작돼야 함) | **필수** |

Google Play는 방침 URL이 **활성·공개 접근 가능·편집 불가**여야 한다고 명시한다. PDF 불가, 로그인 뒤 불가.

계정 삭제 웹 페이지가 따로 필요한 이유는 Google 정책 원문에 있다 — *"Some users may have already uninstalled your app."* 이미 앱을 지운 사람도 삭제를 요청할 수 있어야 한다. 형식은 자유이고 **이메일 안내만으로도 인정**된다.

---

## 배포

### 1. Vercel

GitHub 리포지토리를 Vercel에서 Import 한다.

- Framework Preset: **Other**
- Build Command: (비움)
- Output Directory: (비움 / 루트)

빌드 설정이 필요 없다. `vercel.json`의 `cleanUrls`가 `/terms` 같은 확장자 없는 경로를 처리한다.

### 2. 도메인 연결

Vercel 프로젝트 → Settings → Domains → `deulli.policy.nangmans.com` 추가.

3단계 서브도메인이며 Vercel이 인증서를 자동 발급한다. DNS는 Vercel이 안내하는 CNAME 레코드를 `nangmans.com` DNS에 추가하면 된다.

### 3. 배포 후 등록

- [ ] **App Store Connect** → 앱 정보 → 개인정보 처리방침 URL
  `https://deulli.policy.nangmans.com/privacy`
- [ ] **Play Console** → 앱 콘텐츠 → 개인정보처리방침
  `https://deulli.policy.nangmans.com/privacy`
- [ ] **Play Console** → 앱 콘텐츠 → Data safety → 데이터 삭제 URL
  `https://deulli.policy.nangmans.com/account-deletion`
- [ ] **앱 설정 화면**의 약관·방침 항목을 위 URL로 연결
  Apple 5.1.1(i)는 스토어 메타데이터**와** 앱 내부 **양쪽**을 요구한다.

---

## 공개 전 체크리스트

- [ ] **`.todo` 표시 채우기** — `privacy.html` 제8항 국외이전 표에 4곳. 브라우저에서 빨간색으로 보인다.
  ```bash
  grep -n 'class="todo"' privacy.html
  ```
- [ ] **시행일 확인** — 현재 `2026년 7월 29일`. 실제 공개일이 다르면 아래를 고친다.
  `terms.html`(헤더, 부칙) · `privacy.html`(헤더, 제17항, 버전 이력)

> **변호사 검토는 받지 않기로 했다** (2026-07-29 결정). 남는 리스크는 「약관의 규제에 관한 법률」상 개별 조항의 무효 판정인데, 무효가 나더라도 같은 법 제16조에 따라 **그 조항만 효력을 잃고 나머지 약관은 유지**된다. 면책 조항은 `terms.html` 제23조제5항에 고의·중과실 배제를 두어 전면 무효를 피하도록 설계했다.

---

## 문서를 고칠 때

원본 초안과 조사 근거는 Notion에 있다. 이 사이트에 넣지 않은 작성 배경·법령 출처·향후 과제가 그쪽에 정리돼 있다.

- [들리(deulli) 이용약관 (초안 v1)](https://app.notion.com/p/3ac8fad4b21181a3a567d0ff2efaa151)
- [들리(deulli) 개인정보 처리방침 (초안 v1)](https://app.notion.com/p/3ac8fad4b2118184bfd9d1e297c3c853)

법령 조사 원본은 `deulli-content` 레포의 `docs/LEGAL_POLICY_RESEARCH.md`에 있다.

---

## 알아둘 것

**현재 v1은 무료 서비스 · 개인 명의 전제로 작성됐다.** 전자상거래법·콘텐츠산업 진흥법의 의무는 모두 "거래"(유상)가 전제라 지금은 적용되지 않는다.

유료 결제를 도입하려면 사업자등록·통신판매업 신고가 선행돼야 하고, 약관에 유료 서비스 장(章)을 신설해야 한다. 되살릴 조문 전문과 선행 과제는 Notion의 「v2 보관함」에 보관돼 있다.

**`terms.html` 제3조(인공지능 기술의 이용 및 고지)를 지우지 말 것.** 「인공지능 발전과 신뢰 기반 조성 등에 관한 기본법」 제31조제1항의 사전 고지 의무를 이행하는 조항이고, 시행령 제23조제1항제1호가 이용약관을 고지 방법으로 명문화하고 있다.
