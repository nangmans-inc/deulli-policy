# deulli-policy

영어 청취 학습 앱 **들리(deulli)**의 고객지원 · 이용약관 · 개인정보 처리방침 · 결제·취소·환불 · 계정 삭제 요청 안내 정적 사이트.

배포 주소 — **https://deulli.policy.nangmans.com**

빌드 없는 순수 HTML/CSS다. Vercel에 그대로 올린다.

```
index.html              /terms 이동용 폴백
support.html            → /support
terms.html              → /terms
privacy.html            → /privacy
refund.html             → /refund
account-deletion.html   → /account-deletion
licenses.html           → /licenses
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

### 출처·라이선스 페이지 (`/licenses`)

**법적 의무를 이행하는 페이지다.** 단어장의 뜻풀이는 위키낱말사전에서 나온 자료를 kaikki.org 추출본으로 받아 쓰는데, 이 자료의 라이선스가 **CC BY-SA 4.0**이라 저작자 표시가 조건이다. 표시 없이 배포하면 라이선스 위반이다.

CC BY-SA 4.0은 요구 정보를 담은 리소스의 **URI나 하이퍼링크를 제공하는 방식으로 표시 의무를 충족**할 수 있게 정하고 있다(제3조 가항). 그래서 앱 안에 전문을 박아 넣는 대신 이 페이지를 두고 앱에서 링크한다. 출처가 늘어날 때마다 앱을 재배포하지 않아도 되는 게 실질적 이유다.

Apple 심사지침 5.2.1도 제3자 자료를 쓸 권한을 요구하며, 심사에서 근거 제출을 요청받는다. "CC BY-SA이고 이 페이지에서 표시하고 있다"가 그 답이 된다.

동일조건변경허락(ShareAlike) 조건 때문에 **뜻풀이 데이터를 추려 만든 우리 데이터셋도 CC BY-SA 4.0으로 공개한다고 페이지에 명시**했다. 이 범위를 바꾸려면 라이선스 해석을 다시 확인해야 한다.

콘텐츠 제작에 생성형 AI를 쓴다는 사실은 `terms.html` 제3조가 이미 고지하고 있고, 이 페이지는 그 내용을 출처 관점에서 다시 정리한 것이다. **둘 중 하나만 고치면 어긋난다.**

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
- [ ] **앱 설정 화면**(상세정보)에 출처·라이선스 항목 추가
  `https://deulli.policy.nangmans.com/licenses`
  CC BY-SA의 저작자 표시는 앱에서 이 페이지에 닿을 수 있어야 이행된다.

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

**`/refund`는 Google Play·Apple 인앱결제의 취소·환불 경로를 안내한다.** 스토어별 관리 화면과 환불 신청 경로를 제공하며, 회원 탈퇴와 구독 취소가 별도 절차임을 알린다. 안내 기준일은 2026년 9월 30일이다. 웹 PG 결제 또는 자체 환불·크레딧 처리 기준을 추가하려면 실제 상품과 운영 방식을 먼저 확정한다.

결제 출시 전에는 다음을 별도로 완료해야 한다.

- `terms.html`의 무료 서비스 전제와 `support.html`의 무료 요금 안내를 실제 출시 내용에 맞춰 개정하고 기존 약관의 공지·통지 절차를 확인한다.
- 개인정보 처리방침에 실제로 추가되는 결제·구독 데이터 및 처리 업체를 반영한다.
- `/refund` 배포가 확인된 뒤 앱의 결제 화면과 설정에 `https://deulli.policy.nangmans.com/refund` 링크를 연결한다. Google Play의 취소 경로 요건은 웹 안내 페이지를 만들어 두는 것만으로 충족되지 않으며, 앱 안에서도 구독 관리·취소 경로에 닿을 수 있어야 한다.
- 결제 화면에 상품명, 제공 내용, 가격, 결제 주기, 자동 갱신 및 체험 후 과금 조건을 표시한다. Google Play·Apple의 구매와 갱신·취소·환불에 따른 실제 권한 처리는 결제 구현에서 검증한다.

**현재 v1은 무료 서비스 · 개인 명의 전제로 작성됐다.** 전자상거래법·콘텐츠산업 진흥법의 의무는 모두 "거래"(유상)가 전제라 지금은 적용되지 않는다.

유료 결제를 도입하려면 사업자등록·통신판매업 신고가 선행돼야 하고, 약관에 유료 서비스 장(章)을 신설해야 한다. 되살릴 조문 전문과 선행 과제는 Notion의 「v2 보관함」에 보관돼 있다.

**`terms.html` 제3조(인공지능 기술의 이용 및 고지)를 지우지 말 것.** 「인공지능 발전과 신뢰 기반 조성 등에 관한 기본법」 제31조제1항의 사전 고지 의무를 이행하는 조항이고, 시행령 제23조제1항제1호가 이용약관을 고지 방법으로 명문화하고 있다.

## /refund 구현 검증 (2026-09-30)

범위는 신규 `refund.html`, 기존 정책 문서의 연결 링크, 공통 탐색·대비 보정이다. 앱 결제 구현이나 배포 완료를 의미하지 않는다.

Design Read: 들리 이용자가 결제한 스토어의 취소·환불 경로를 찾는 안내 문서. 기존 정책 사이트의 밝은 문서 레이아웃, 들리 파랑과 한글 서체를 사용한다. ENERGY 1 / RHYTHM 1 / MOTION 1.

- 색: 기존 들리 파랑으로 현재 문서와 실제 취소·환불 동작을 표시한다. 보조 글씨는 대비를 위해 `#617287`로 조정했다.
- 레이아웃: 결제 방식 확인 후 각 스토어의 취소와 환불을 읽는 순서다. 긴 문서의 목차와 모바일 접이식을 기존 사이트에서 이어 쓴다.
- 서체: 사이트의 Pretendard 및 한글 시스템 서체 설정을 재사용한다. 제목·절·본문의 크기로 안내 구조를 구분한다.
- 여백: 절 사이의 큰 간격과 문단 사이의 작은 간격으로 취소·환불·문의 내용을 나눈다.
- 강조 블록: 취소와 환불의 차이, 계정 삭제 전에 확인할 구독, 문의에 필요한 정보만 기존 안내 스타일로 강조한다.
- 이미지와 모션: 기존 로고만 사용한다. 신규 장식이나 자동 재생 애니메이션은 없다.

검증은 독립된 임시 HTTP 서버와 별도 headless Chromium에서 수행했다. 기존 개발 서버·브라우저·앱 실행 세션은 조작하지 않았다. 검증 서버와 브라우저는 실행한 프로세스가 정상적으로 종료했다.

- 정책 문서 6개를 320, 375, 390, 760, 768, 960, 961, 1024, 1440px에서 렌더링해 문서 전체의 가로 넘침이 없음을 확인했다. 좁은 화면의 문서 탭은 기존 방식의 가로 스크롤이다.
- 신규 페이지를 320·390px에서 글씨 200%로 확인했다. 문서 전체의 가로 넘침이 없다.
- 목차 접기·펴기, 본문 건너뛰기의 키보드 동작, 문서 내 목적지 6개, 정책 탐색 경로 6개를 확인했다.
- 외부 링크 8개의 클릭 목적지를 브라우저 요청 가로채기로 확인했다. 환불이나 취소 요청을 실제로 제출하지 않았다. 링크와 안내 내용의 근거는 아래 공식 문서에서 별도로 확인했다.
- 이메일 링크 2개는 클릭 이벤트와 `mailto:contact@nangmans.com` 목적지를 확인했다. 실제 메일 앱 호출과 발송은 수행하지 않았다.
- 신규 페이지의 표시된 글씨 대비 최솟값은 4.71:1이다. JavaScript 실행 오류는 0건이며 HTML 내부 경로·목차 ID 검증과 `git diff --check`를 통과했다.
- 390px·1440px 화면 및 전체 문서를 렌더링 이미지로 확인했다.

### antislop Delivery Gate: PASS

- R-02 PASS: 신규 페이지와 추가된 문구에 em dash가 없다. 기존 문서의 조문 전문은 이번 검사 범위가 아니다.
- R-03 PASS: 위 9개 너비와 작은 화면의 200% 글씨 검증에서 문서 가로 넘침이 없다. 취소·환불 버튼의 최소 높이는 44px이다.
- R-17 PASS: 통계·성과 수치를 추가하지 않았다. 48시간·24시간 기준은 아래 공식 스토어 안내, 문의 회신 기한은 기존 약관 제21조를 따른다.
- R-18 PASS: 후기나 인물 소개가 없다.
- R-23 PASS: 기존 로고와 문서 구성을 재사용하고 요청한 결제·환불 문서를 탐색에 추가했다.
- R-24 PASS: 모든 정책 탐색 목적지에 실제 HTML 문서가 있고 로컬 요청이 성공했다.
- R-25 PASS: 신규 페이지 표시 글씨의 대비 최솟값 4.71:1을 계산했다.
- R-26 PASS: 문서 이동·목차·스토어 링크·이메일 링크에 실제 목적지가 있고 각 동작 유형을 검증했다.
- R-27 PASS: 데이터 조회나 입력 폼이 없는 정적 문서다. 비동기 데이터의 빈 상태·로딩·오류 UI 대상이 없다.
- R-28 PASS: 기존 고객지원에는 요청에 해당하는 구독 취소·환불 안내만 추가했다. 신규 페이지에 일반적인 FAQ를 만들지 않았다.
- R-32 PASS: 기본 링크·details/summary를 사용하고 본문 건너뛰기와 목차의 키보드 동작을 확인했다. 초점선은 들리 파랑 3px이다.
- R-33 PASS: HTML/CSS 원본을 직접 편집했다. 소스를 치환하는 별도 패치 스크립트를 만들지 않았다.
- R-34 PASS: 기존 정책 사이트의 라이트 테마를 사용하며 테마 전환 기능이 없다.
- R-35 PASS: 실제 로컬 HTTP 응답으로 렌더링하고 위 동작·목적지·실행 오류를 확인했다.
- R-36 PASS: 보안 인증·성과·법적 적합성 보장 등 근거 없는 주장을 추가하지 않았다.
- R-37 PASS: 기존 정책 사이트의 시각 방향과 위 Design Read를 기준으로 구현했다.
- R-38 PASS: 가격이나 환불 금액·비율·크레딧 규칙을 만들어 넣지 않았다. 운영자와 문의 주소는 기존 약관과 같다.
- R-01 PASS: 기존 브랜드의 파랑과 안내 배경을 사용한다. 신규 그라디언트가 없다.
- R-04 PASS: 기존 로고 외 신규 아이콘이나 장식용 emoji가 없다.
- R-06 PASS: 한글 문서를 읽는 기존 서체를 사용하며 대형 monospace나 영문 대문자 장식이 없다.
- R-07 PASS: 배경 격자·패턴이 없다.
- R-08 PASS: 버튼에 장식용 화살표를 넣지 않았다.
- R-09 PASS: 장식용 배지가 없다.
- R-10 PASS: 기존 상단 탐색의 흐림 효과 1개만 사용한다.
- R-12 PASS: 문서·버튼·안내 블록에 그림자가 없다.
- R-13 PASS: glow 효과가 없다.
- R-14 PASS: 기능 소개 카드 그리드가 없다. 안내 블록의 목적은 위에 기록했다.
- R-19 PASS: 기존 문서 내 이동과 hover만 사용하며 반복 애니메이션이 없다.
- R-22 PASS: 신규 일러스트가 없다.
- Liveliness / dials PASS: ENERGY 1 / RHYTHM 1 / MOTION 1을 선언하고 일정한 문서 구조로 구현했다.
- Liveliness / focal point PASS: 한 개의 h1이 문서 제목을 표시하며 각 절에서는 제목과 실제 동작 버튼이 내용을 이끈다.
- Liveliness / whitespace PASS: 절과 문단의 간격을 구분해 긴 문서를 나눈다.
- Liveliness / accent PASS: 기존 들리 파랑을 현재 문서·링크·동작 버튼에 사용한다.
- Liveliness / identity PASS: 기존 들리 로고·파랑·한글 서체·정책 문서의 제목과 목차 패턴을 이어 쓴다.
- Liveliness / Design Read PASS: 구현 전에 위 방향과 dials를 선언했다.
- C-1 PASS: 색·레이아웃·서체·간격·강조 블록의 이유를 위에 기록했다.
- C-2 PASS: 동작 없는 신규 컨트롤이 없다. 외부 서비스의 실제 취소·환불 제출은 검증 범위에서 제외했다.
- C-3 PASS: 스토어 확인·취소·환불·법정 권리·탈퇴·문의에 필요한 절만 있다.
- C-4 PASS: 작은 화면·큰 글씨·목차 상태·키보드 동작을 확인했다. 실기기 검증은 수행하지 않았다.
- C-5 PASS: 공식 스토어 안내와 기존 약관의 확인된 내용으로 작성했다.
- R-05 PASS: 제품 소개 템플릿 대신 일정한 문서 구성을 의도적으로 사용한다.
- R-11 PASS: 기존 안내 블록 12px·문의 블록 14px·버튼 10px 반경을 재사용한다.
- R-15 PASS: Google Play 구독 관리, 환불 요청, Apple 구독 관리, 환불 요청의 동작을 버튼 이름에 적었다.
- R-16 PASS: 신규 문구에 AI 마케팅 표현이 없다.
- R-20 PASS: 기존 들리 정책 사이트의 브랜드·문서 구성을 따르고 결제별 실제 경로를 안내한다.
- R-21 PASS: 기존 정책 문서의 라이트 테마를 그대로 이어 사용한다.
- R-29 PASS: 들리 파랑, 경고 문구 색, 기존 중립 색을 사용한다.
- R-30 PASS: 다른 제품의 디자인을 복제하지 않았다.
- R-31 PASS: 주요 결정의 이유를 위에 기록했다.
- UI Skill Checklist PASS: 기존 팔레트·의도한 문서 리듬·실제 동작·낮은 모션·효과 제한·실제 내용·모바일/키보드 검증으로 해당 항목을 충족했다. 데이터 표·입력 폼·데이터 상태 항목은 정적 문서이므로 적용 대상이 없다.

### 안내 내용의 공식 근거

- [Google Play 구독 정책](https://support.google.com/googleplay/android-developer/answer/9900533?hl=ko): 앱에서 취소 방법과 온라인 취소 경로를 공개해야 한다.
- [Google Play 구독 취소 도움말](https://support.google.com/googleplay/answer/7018481?hl=ko): 구독 관리 링크·취소 후 이용 기간·앱 삭제와 취소의 구분.
- [Google Play 환불 정책](https://support.google.com/googleplay/answer/2479637?hl=ko), [환불 요청 안내](https://support.google.com/googleplay/answer/15574897?hl=ko): 상품·지역별 처리와 개발자 문의 경로. 구매 후 48시간이 지났다는 이유로 환불이 불가능하다고 안내하지 않는다.
- [Apple 구독 취소 도움말](https://support.apple.com/ko-kr/118428): 웹 구독 관리 목적지, 기기 경로, 체험 종료 최소 24시간 전 취소. 2026년 9월 29일 게시 내용을 확인했다.
- [Apple 환불 요청 도움말](https://support.apple.com/ko-kr/118223): Apple 심사·요청 경로·지역별 법정 권리.
- [전자상거래법 제13조](https://www.law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1022341933), [법제처 반품·환불 안내](https://www.easylaw.go.kr/CSP/CnpClsMain.laf?ccfNo=4&cciNo=1&cnpClsNo=2&csmSeq=835): 사전 거래조건 고지, 디지털콘텐츠 청약철회 제한 요건과 법정 권리.
