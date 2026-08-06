# deulli-policy

영어 청취 학습 앱 **들리(deulli)**의 고객지원 · 이용약관 · 개인정보 처리방침 · 계정 삭제 요청 안내 정적 사이트.

배포 주소 — **https://deulli.policy.nangmans.com**

빌드 없는 순수 HTML/CSS다. Vercel에 그대로 올린다.

```
index.html              /terms 이동용 폴백
support.html            → /support
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
| 개인정보 처리방침 웹 URL | **필수** — App Store Connect 메타데이터 필드 | **필수** |
| 고객지원 웹 URL | **필수** — App Store Connect의 Support URL이 required 필드 | 선택 — 지원 이메일만 필수, 웹사이트는 권장 |
| 계정 삭제 요청 웹 URL | 불필요 | **필수** — Data safety 폼에 등록 |
| 앱 내 계정 삭제 | **필수** (앱에서 시작돼야 함) | **필수** |

Google Play는 방침 URL이 **활성·공개 접근 가능·편집 불가**여야 한다고 명시한다. PDF 불가, 로그인 뒤 불가.

### 고객지원 페이지 (`/support`)

Apple 심사지침 1.5는 *"Make sure your app and its Support URL include an easy way to contact you"*라고 요구하고, App Store Connect의 **Support URL은 Privacy Policy URL과 함께 required 필드**다. 즉 앱을 올리려면 이 페이지가 없을 수 없다.

거절을 부르는 형태가 정해져 있다 — SNS 프로필, 404, "coming soon", 연락 수단 없는 회사 홈페이지, FAQ만 있고 연락처가 없는 페이지. 그래서 `/support`는 **연락 수단(이메일)을 최상단 블록에 두고**, 회신 기한을 명시하고, 앱 이름을 페이지에 드러낸다.

Google Play는 웹사이트를 요구하진 않지만 **지원 이메일은 필수**이고 *"respond to customer support questions within three business days"*를 요구한다. 페이지에 적은 "영업일 기준 3일 이내 처리 경과"가 이 기준과 약관 제21조제3항 양쪽에 맞춰져 있다.

국내법 근거도 있다. 「전기통신사업법」 제32조제1항은 *"이용자로부터 제기되는 정당한 의견이나 불만을 즉시 처리하여야 한다. 이 경우 즉시 처리하기 곤란한 경우에는 이용자에게 그 사유와 처리일정을 알려야 한다"*고 정한다. 무료·개인 운영이라도 적용된다 — 같은 법 시행령 제30조제1항이 **인터넷으로 부가통신역무를 제공하는 자본금 1억원 이하 사업자의 신고를 면제**하고, 법 제2조제8호가 **"신고가 면제된 경우를 포함"하여 전기통신사업자로 정의**하기 때문이다. 페이지의 "즉시 처리하기 곤란한 경우 사유와 처리 일정을 알려 드립니다" 문장이 이 조문을 그대로 이행한다.

### 계정 삭제 페이지 (`/account-deletion`)

**`/support`와 별도로 유지해야 한다.** 필요한 이유는 Google 정책 원문에 있다 — *"Some users may have already uninstalled your app."* 이미 앱을 지운 사람도 삭제를 요청할 수 있어야 한다. 형식은 자유이고 **이메일 안내만으로도 인정**된다.

Google은 이 웹 링크가 ① 오류 없이 로드되고 ② 삭제 경로가 눈에 띄게 드러나며 ③ **스토어 등재명과 같은 앱·개발자 이름을 담을 것**을 요구한다. Data safety 폼에 등록하는 URL이 고객지원 페이지가 되면 삭제 경로가 다른 안내에 묻히므로, 전용 URL을 유지하고 `/support` 제5항에서 링크만 건다.

Apple은 반대로 **웹 페이지를 요구하지 않는다.** 오히려 *"Apps not operating in highly regulated industries should not require people to make a phone call, send an email, or go through other support flows"*라고 못박는다. 앱 내 삭제가 정상 경로이고, 웹 페이지는 앱을 지운 사람을 위한 보조 수단이다.

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
- [ ] **App Store Connect** → 앱 정보 → 지원 URL *(required 필드)*
  `https://deulli.policy.nangmans.com/support`
- [ ] **Play Console** → 앱 콘텐츠 → 개인정보처리방침
  `https://deulli.policy.nangmans.com/privacy`
- [ ] **Play Console** → 스토어 설정 → 스토어 등록정보 연락처 정보
  이메일 `contact@nangmans.com` *(필수)* · 웹사이트 `https://deulli.policy.nangmans.com/support` *(권장)*
- [ ] **Play Console** → 앱 콘텐츠 → Data safety → 데이터 삭제 URL
  `https://deulli.policy.nangmans.com/account-deletion`
- [ ] **앱 설정 화면**의 약관·방침 항목을 위 URL로 연결
  Apple 5.1.1(i)는 스토어 메타데이터**와** 앱 내부 **양쪽**을 요구한다.

---

## 공개 전 체크리스트

- [ ] **`.todo` 표시 채우기** — `privacy.html` 제8항 국외이전 표, `support.html` 제1항 앱 버전 확인 경로. 브라우저에서 빨간색으로 보인다.
  ```bash
  grep -n 'class="todo"' *.html
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
