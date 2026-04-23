# PAPAFLY 페이지별 태스크 계획서
## 작성: Claude Sonnet 4.6 | 2026-04-23
## 대상: DeepSeek Aider — 태스크 번호 순서대로. 완료 후 즉시 커밋.

---

## 실행 원칙
- 태스크 하나 = 커밋 하나. 통합 금지.
- 시작 전 `git status` 클린 확인.
- 삭제 금지 — 주석 처리 또는 이동만.
- style.css / recipe-page.js 건드리지 말 것.

---

## 현재 페이지 목록

| 파일 | 라인 | 완성도 | 주요 문제 |
|------|------|--------|-----------|
| index.html | 282 | 70% | 인라인 스타일 다량, nav 중복 |
| showroom/index.html | 45 | 20% | 완전 빈 껍데기, catalog 없음 |
| channels/monogatari.html | 59 | 40% | 스타일 중복, 1개 하드코딩 |
| channels/shitate.html | 65 | 40% | 스타일 중복, 1개 하드코딩 |
| channels/coordinate.html | 74 | 50% | 스타일 중복, 3개 하드코딩 |
| channels/mekiki.html | 77 | 50% | 스타일 중복, 3개 하드코딩 |
| staff/index.html | 4383 | 80% | 독자 디자인 시스템, tokens 미적용 |
| card/index.html | 459 | 85% | --gold 충돌, tokens 미적용 |
| studio/index.html | 151 | - | papafly 무관 유산 |

---

## ════════════════════════════════════
## PAGE 1 — index.html (메인 랜딩)
## ════════════════════════════════════

### P1-T01: 공통 `<head>` 블록 표준화
**파일**: `index.html`

현재 index.html `<head>` 확인 후 아래 순서로 정리:
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="재패니즈 패치 — 일본의 시간을 입다. 64세 아저씨가 큐레이션하는 일본 빈티지 라이프스타일.">
<title>PAPAFLY — 재패니즈 패치</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;600&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" rel="stylesheet">
<link rel="stylesheet" href="assets/css/tokens.css">
<link rel="stylesheet" href="assets/css/components.css">
```
`<style>` 인라인 블록은 아직 건드리지 말 것 (P1-T03에서 처리).

커밋: `refactor: index.html head 블록 표준화 — 링크 순서 정리`

---

### P1-T02: 네비게이션 active 상태 클래스화
**파일**: `index.html`

현재 nav에 active 표시 없음. 아래처럼 수정:
```html
<nav class="nav">
  <a href="index.html" class="nav-logo">PAPAFLY</a>
  <div class="nav-links">
    <a href="channels/monogatari.html">物語</a>
    <a href="channels/shitate.html">仕立て</a>
    <a href="channels/coordinate.html">コーデ</a>
    <a href="mekiki.html">目利き</a>
    <a href="showroom/index.html" class="nav-showroom">쇼룸</a>
  </div>
</nav>
```
components.css에 `.nav-showroom` 추가:
```css
.nav-showroom { color: var(--gold); }
```
커밋: `refactor: index.html nav 쇼룸 링크 추가 + active 클래스화`

---

### P1-T03: 인라인 `<style>` 블록 → components.css 이동
**파일**: `index.html`, `assets/css/components.css`

index.html `<style>` 블록 전체를 components.css 하단 `/* === INDEX PAGE === */` 섹션으로 이동.
이동 후 index.html `<style>` 태그 완전 삭제.

이동 대상 (index.html에서 검색해서 전부):
- `.hero-divider`
- `.cat-bar`, `.cat-item`, `.cat-item:hover`, `.cat-item.active`, `.cat-item.anchor`
- `.products-grid`, `.track`, `.track span`
- `.biz-arch__eye`, `.biz-arch__title`, `.biz-arch__sub`
- `.biz-col`, `.biz-col__lbl`, `.biz-col__tag`
- `.biz-row`, `.biz-row:hover`, `.biz-cell`, `.biz-split`
- `footer p`, `footer .footer-logo`
- 기타 index.html `<style>` 블록 안 모든 클래스

커밋: `refactor: index.html 인라인 스타일 전체 → components.css 추출`

---

### P1-T04: 히어로 섹션 콘텐츠 보강
**파일**: `index.html`

히어로 섹션에 아래 요소 추가 (없으면 신규):
```html
<section class="hero">
  <div class="hero-content">
    <p class="hero-eye">재패니즈 패치 — PAPAFLY</p>
    <h1 class="hero-title">日本の時間を着る</h1>
    <p class="hero-sub">64세 아저씨가 도쿄 플리마켓에서 직접 발굴한<br>80–90년대 일본 빈티지 라이프스타일</p>
    <div class="hero-divider"></div>
    <a href="showroom/index.html" class="hero-cta">쇼룸 둘러보기 →</a>
  </div>
</section>
```
components.css에 `.hero-eye`, `.hero-sub`, `.hero-cta` 추가:
```css
.hero-eye { font-size: 0.72rem; letter-spacing: 0.3em; color: var(--gold); margin-bottom: var(--space-sm); }
.hero-sub { font-size: 0.9rem; color: var(--text-muted); line-height: 1.9; margin-top: var(--space-sm); }
.hero-cta { display: inline-block; margin-top: var(--space-lg); padding: 10px 24px; border: 1px solid var(--gold); color: var(--gold); font-size: 0.8rem; letter-spacing: 0.1em; transition: background 0.2s; }
.hero-cta:hover { background: var(--gold); color: var(--bg); }
```
커밋: `feat: index.html 히어로 섹션 콘텐츠 + CTA 버튼 추가`

---

### P1-T05: 카탈로그 섹션 — 데이터 없을 때 fallback UI
**파일**: `index.html`, `assets/js/app.js`

현재 app.js가 catalog/index.json fetch 실패 시 빈 화면.
app.js `loadCatalog()` 함수에 catch 블록 추가:
```javascript
.catch(() => {
  document.getElementById('products-grid').innerHTML = `
    <div class="catalog-empty">
      <p>상품 준비 중입니다.</p>
      <a href="showroom/index.html">쇼룸 →</a>
    </div>
  `;
});
```
components.css에 `.catalog-empty` 추가:
```css
.catalog-empty { grid-column: 1/-1; text-align: center; padding: var(--space-2xl); color: var(--text-muted); font-size: 0.9rem; }
.catalog-empty a { color: var(--gold); }
```
커밋: `feat: index.html 카탈로그 빈 상태 fallback UI 추가`

---

### P1-T06: 푸터 보강
**파일**: `index.html`

푸터에 링크 + 저작권 추가:
```html
<footer>
  <p class="footer-logo">PAPAFLY</p>
  <p>재패니즈 패치 — 일본의 시간을 입다</p>
  <p style="margin-top:var(--space-sm)">
    <a href="channels/monogatari.html">物語</a> &nbsp;·&nbsp;
    <a href="channels/shitate.html">仕立て</a> &nbsp;·&nbsp;
    <a href="channels/coordinate.html">コーデ</a> &nbsp;·&nbsp;
    <a href="channels/mekiki.html">目利き</a> &nbsp;·&nbsp;
    <a href="showroom/index.html">쇼룸</a>
  </p>
  <p style="margin-top:var(--space-md);font-size:0.7rem;color:var(--text-dim)">© 2026 PAPAFLY · papafly.kr</p>
</footer>
```
커밋: `feat: index.html 푸터 링크 + 저작권 보강`

---

## ════════════════════════════════════
## PAGE 2 — showroom/index.html
## ════════════════════════════════════

### P2-T01: head 표준화 + 인라인 스타일 추출
**파일**: `showroom/index.html`, `assets/css/components.css`

head를 P1-T01 기준으로 통일 (경로는 `../assets/`).
인라인 `<style>` 블록의 `.showroom-header`, `.lookbook-grid` → components.css `/* === SHOWROOM === */` 섹션으로 이동 후 `<style>` 삭제.

커밋: `refactor: showroom head 표준화 + 인라인 스타일 → components.css`

---

### P2-T02: 쇼룸 필터 바 추가
**파일**: `showroom/index.html`

헤더 아래에 카테고리 필터 추가:
```html
<div class="cat-bar">
  <span class="cat-item active" data-cat="all">전체</span>
  <span class="cat-item" data-cat="fashion">패션</span>
  <span class="cat-item" data-cat="accessory">소품</span>
  <span class="cat-item" data-cat="lifestyle">라이프스타일</span>
</div>
```
커밋: `feat: showroom 카테고리 필터 바 추가`

---

### P2-T03: 상품 없을 때 빈 상태 UI
**파일**: `showroom/index.html`

`#products-grid` 컨테이너 안에 정적 placeholder 추가:
```html
<main class="lookbook-grid" id="products-grid">
  <div class="catalog-empty">
    <p>🗂 상품을 불러오는 중입니다.</p>
    <p style="margin-top:8px;font-size:0.8rem">발굴된 물건들이 곧 도착합니다.</p>
  </div>
</main>
```
app.js 로드 시 자동으로 대체되므로 정적 fallback 역할.

커밋: `feat: showroom 빈 상태 placeholder UI`

---

### P2-T04: 쇼룸 헤더 브랜딩 강화
**파일**: `showroom/index.html`

현재: `<h1>쇼룸</h1>` 단순
변경:
```html
<header class="showroom-header">
  <p class="hero-eye">PAPAFLY SHOWROOM</p>
  <h1>再패니즈 패치<br>컬렉션</h1>
  <p>도쿄 플리마켓에서 직접 발굴한 80–90년대 일본 빈티지</p>
  <div class="hero-divider"></div>
</header>
```
커밋: `feat: showroom 헤더 브랜딩 강화`

---

## ════════════════════════════════════
## PAGE 3 — channels/monogatari.html (CH1 物語)
## ════════════════════════════════════

### P3-T01: head 표준화
**파일**: `channels/monogatari.html`

현재: tokens.css 링크 없음.
추가:
```html
<link rel="stylesheet" href="../assets/css/tokens.css">
<link rel="stylesheet" href="../assets/css/components.css">
```
폰트 CDN 링크도 추가 (현재 없음).

커밋: `refactor: monogatari head 표준화 — tokens.css 링크 추가`

---

### P3-T02: 인라인 스타일 → components.css
**파일**: `channels/monogatari.html`, `assets/css/components.css`

`<style>` 블록 전체 → components.css `/* === CH1 MONOGATARI === */` 섹션으로 이동.

이동 대상:
- `.ch-header`, `.ch-badge`, `.ch-title`, `.ch-sub` (공통)
- `.stories`, `.story-item`, `.story-patch`, `.story-name`, `.story-text`, `.story-meta`

이동 후 `<style>` 태그 삭제.

커밋: `refactor: monogatari 인라인 스타일 → components.css CH1 섹션`

---

### P3-T03: nav active 처리 — inline style → class
**파일**: `channels/monogatari.html`

현재: `<a href="monogatari.html" style="color:var(--ch1)">物語</a>`
변경: `<a href="monogatari.html" class="nav-active-ch1">物語</a>`

components.css에 추가:
```css
.nav-active-ch1 { color: var(--ch1) !important; }
.nav-active-ch2 { color: var(--ch2) !important; }
.nav-active-ch3 { color: var(--ch3) !important; }
.nav-active-ch4 { color: var(--ch4) !important; }
```
(4개 채널 전부 한번에 추가할 것 — 나머지 채널에서 재사용)

커밋: `refactor: monogatari nav active inline style → class 처리`

---

### P3-T04: 스토리 JSON 로드 연결
**파일**: `channels/monogatari.html`, `channels/CH1-stories.json`

CH1-stories.json이 REFACTOR_PLAN.md TASK-07에서 생성됐는지 확인.
없으면 여기서 생성:
```json
{
  "stories": [
    {
      "id": "ST-001",
      "patch": "재패니즈 패치 #001",
      "name": "80s 일본 밀리터리 M-65 필드자켓",
      "text": "오기쿠보 구제 골목 끝 상자 더미에서 꺼냈다. 미군 지급품이 일본 거쳐 현지화된 버전. 단추 刻印이 일본어다. 80년대 일본 젊은이들이 미군 잉여물을 어떻게 소화했는지를 보여주는 물건.",
      "source": "도쿄 오기쿠보 플리마켓",
      "date": "2026-02",
      "era": "1980s",
      "product_link": "../showroom/lookbook/PF-001.html",
      "product_id": "PF-001"
    }
  ]
}
```

monogatari.html `#stories-container` 위의 하드코딩 `<article>` 제거.
`<script>` 블록 추가:
```javascript
fetch('../channels/CH1-stories.json')
  .then(r => r.json())
  .then(data => {
    const container = document.getElementById('stories-container');
    container.innerHTML = data.stories.map(s => `
      <article class="story-item">
        <p class="story-patch">${s.patch}</p>
        <h2 class="story-name">${s.name}</h2>
        <p class="story-text">${s.text}</p>
        <div class="story-meta">
          <span>${s.source}</span>
          <span>${s.date}</span>
          <span>${s.era}</span>
          <a href="${s.product_link}" style="color:var(--ch1)">쇼룸 →</a>
        </div>
      </article>
    `).join('');
  });
```
커밋: `feat: monogatari 스토리 JSON 동적 로드 전환`

---

## ════════════════════════════════════
## PAGE 4 — channels/shitate.html (CH2 仕立て)
## ════════════════════════════════════

### P4-T01: head 표준화 + 인라인 스타일 → components.css
**파일**: `channels/shitate.html`, `assets/css/components.css`

P3-T01/T02와 동일 패턴.
tokens.css 링크 추가.
`<style>` 블록 → components.css `/* === CH2 SHITATE === */` 섹션으로 이동:
- `.ch-header`, `.ch-badge`, `.ch-title`, `.ch-sub` (P3에서 이미 추가됐으면 중복 추가 금지)
- `.items`, `.grade-legend`, `.grade-item`

커밋: `refactor: shitate head 표준화 + 인라인 스타일 → components.css CH2 섹션`

---

### P4-T02: nav active class 적용
**파일**: `channels/shitate.html`

P3-T03에서 정의한 `.nav-active-ch2` 클래스 적용:
`<a href="shitate.html" class="nav-active-ch2">仕立て</a>`

커밋: `refactor: shitate nav active class 적용`

---

### P4-T03: 등급 범례 JSON화 + 상품 동적 로드
**파일**: `channels/shitate.html`

등급 범례를 데이터로 분리 — `channels/CH2-grades.json` 생성:
```json
{
  "grades": [
    { "grade": "S", "label": "데드스톡. 미사용에 가까운 상태" },
    { "grade": "A", "label": "사용감 거의 없음. 미세한 흔적만" },
    { "grade": "B", "label": "자연스러운 빈티지 사용감. 실용 충분" },
    { "grade": "C", "label": "뚜렷한 사용감. 그 자체가 앤티크" }
  ]
}
```

shitate.html의 하드코딩 `.grade-legend` 제거 → JS로 렌더링.
`#items-container` 하드코딩 상품 카드 제거 → catalog/index.json 연동 (app.js 활용).

커밋: `feat: shitate 등급 범례 JSON화 + 상품 동적 로드`

---

## ════════════════════════════════════
## PAGE 5 — channels/coordinate.html (CH3 コーデ)
## ════════════════════════════════════

### P5-T01: head 표준화 + 인라인 스타일 → components.css
**파일**: `channels/coordinate.html`, `assets/css/components.css`

tokens.css 링크 추가.
`<style>` 블록 → components.css `/* === CH3 COORDINATE === */`:
- `.coords`, `.coord-card`, `.coord-title`, `.coord-items`

커밋: `refactor: coordinate head 표준화 + 인라인 스타일 → components.css CH3 섹션`

---

### P5-T02: nav active + 코디 JSON 동적 로드
**파일**: `channels/coordinate.html`

nav: `.nav-active-ch3` 클래스 적용.
`channels/CH3-coordinates.json` 생성:
```json
{
  "coordinates": [
    {
      "id": "COORD-001",
      "title": "아메카지 기본기 — 밀리터리 레이어드",
      "items": ["M-65 필드자켓 (PF-001)", "화이트 크루넥 스웨트", "리바이스 501 셀비지", "레드윙 875 아이리시 세터", "뉴에라 59FIFTY 올리브"],
      "tags": ["amekaji", "military", "layered"]
    },
    {
      "id": "COORD-002",
      "title": "필름카메라 데이 룩",
      "items": ["워크웨어 덕 재킷 (브라운)", "챔피언 리버스위브 스웨트", "치노 팬츠 (베이지)", "흰 스니커즈", "캐논 AE-1 어깨 슬링"],
      "tags": ["workwear", "camera", "casual"]
    },
    {
      "id": "COORD-003",
      "title": "자전거 투어 룩",
      "items": ["빈티지 나일론 자켓", "이비 스타일 OCBD 셔츠", "코듀로이 팬츠 (올리브)", "콜스 하운 로퍼", "빈티지 자전거 글러브"],
      "tags": ["bicycle", "ivy", "outdoor"]
    }
  ]
}
```

하드코딩 3개 카드 제거 → JS 동적 렌더링.

커밋: `feat: coordinate JSON 동적 로드 전환 + nav active class`

---

## ════════════════════════════════════
## PAGE 6 — channels/mekiki.html (CH4 目利き)
## ════════════════════════════════════

### P6-T01: head 표준화 + 인라인 스타일 → components.css
**파일**: `channels/mekiki.html`, `assets/css/components.css`

tokens.css 링크 추가.
`<style>` 블록 → components.css `/* === CH4 MEKIKI === */`:
- `.guides`, `.guide`, `.guide h3`, `.guide p`, `.guide ul`, `.guide ul li`, `.guide ul li::before`

커밋: `refactor: mekiki head 표준화 + 인라인 스타일 → components.css CH4 섹션`

---

### P6-T02: nav active + 가이드 JSON 동적 로드
**파일**: `channels/mekiki.html`

nav: `.nav-active-ch4` 클래스 적용.
`channels/CH4-guides.json` 생성:
```json
{
  "guides": [
    {
      "id": "GUIDE-001",
      "title": "밀리터리 재킷 진위 판별 — M-65편",
      "intro": "미군 지급품과 일본 현지화 버전의 차이를 단추 刻印과 내부 라벨로 구별한다.",
      "steps": [
        "원판 US 라벨: 영어 + NSN(국가재고번호) 필수",
        "일본 현지화: 일본어 단추 刻印, 한자 사이즈 표기",
        "복각판 구별: 지퍼 이빨 크기와 브라스 색상 확인",
        "연대 측정: 내부 계약번호 앞 두 자리가 제조연도"
      ]
    },
    {
      "id": "GUIDE-002",
      "title": "필름카메라 구매 전 체크리스트",
      "intro": "80년대 일본제 필름카메라는 구매 전 반드시 셔터막 확인이 필요하다.",
      "steps": [
        "셔터 전속도 동작 여부 (1/1000s까지)",
        "뷰파인더 곰팡이 · 분리막 확인",
        "광각 테스트: 기름기 묻은 조리개날 체크",
        "미터링 작동 여부 (전지 교체 후 재확인)",
        "필름 장전구 내부 쿠션 상태"
      ]
    },
    {
      "id": "GUIDE-003",
      "title": "빈티지 데님 연대 판별",
      "intro": "리바이스 501 기준, 셀비지 끝과 패치 재질로 연대를 추정할 수 있다.",
      "steps": [
        "빅E 태그: 1971년 이전",
        "가죽 패치: 1985년 이전",
        "레드탭 대문자: 1983년 이전",
        "셀비지 아이디: 특정 공장·시기 특정 가능"
      ]
    }
  ]
}
```

하드코딩 3개 가이드 제거 → JS 동적 렌더링.

커밋: `feat: mekiki 가이드 JSON 동적 로드 전환 + nav active class`

---

## ════════════════════════════════════
## PAGE 7 — card/index.html (비즈니스 카드)
## ════════════════════════════════════

### P7-T01: 색상 토큰 tokens.css 통일
**파일**: `card/index.html`

card/index.html 자체 정의 CSS 변수 확인:
- `--gold: #D4AF37` → tokens.css의 `--gold: #c4a35a`와 다름

card/index.html `<head>`에 추가:
```html
<link rel="stylesheet" href="../assets/css/tokens.css">
```

card/index.html `<style>` 블록에서 tokens.css와 겹치는 변수 정의 제거:
`--gold`, `--bg`, `--text`, `--text-muted` 등.
대신 `var(--gold)` 등으로 참조.

⚠️ 주의: 카드에만 있는 고유 변수 (`--radius-sm`, `--radius-md` 등)는 유지.

커밋: `refactor: card/index.html 색상 변수 → tokens.css 통일`

---

### P7-T02: 카드 내 config.json 연동
**파일**: `card/index.html`

현재: 이름, 이메일, 직함 하드코딩.
config.json에서 로드하도록 `<script>` 블록 추가:
```javascript
fetch('../config.json')
  .then(r => r.json())
  .then(cfg => {
    // cfg.owner.name, cfg.owner.email 등으로 채우기
    document.querySelectorAll('[data-cfg]').forEach(el => {
      const key = el.dataset.cfg.split('.').reduce((o, k) => o?.[k], cfg);
      if (key) el.textContent = key;
    });
  });
```
하드코딩된 텍스트 엘리먼트에 `data-cfg="owner.name"` 등 속성 부여.

커밋: `feat: card config.json 연동 — 하드코딩 개인정보 동적화`

---

## ════════════════════════════════════
## PAGE 8 — staff/index.html (스태프 포털)
## ════════════════════════════════════

### P8-T01: 독자 색상 시스템 → tokens.css 연계
**파일**: `staff/index.html`

현재: 4383줄, 완전 독자 디자인 시스템 (--bg: #0a0f0c, --gold: #f0c850).
staff는 내부 포털이므로 디자인 완전 통일 대신 **토큰 충돌 변수만 해소**.

staff/index.html `<style>` `:root` 블록에서 PAPAFLY 공통과 **다른** 값 확인:
- `--gold: #f0c850` vs tokens.css `--gold: #c4a35a`

staff는 독자 컬러 쓰는 게 맞음 (내부 전용 다크 그린 테마).
대신 `<head>`에 주석만 추가:
```html
<!-- Staff Portal: 독자 디자인 시스템 유지 (내부 전용). tokens.css 적용 불필요. -->
```

커밋: `docs: staff/index.html 독자 디자인 시스템 유지 근거 주석`

---

### P8-T02: 스태프 포털 상단 PAPAFLY 브랜딩 연결
**파일**: `staff/index.html`

로그인 성공 후 대시보드 상단에 PAPAFLY 로고 + 메인 링크 추가:
```html
<div class="pf-staff-brand">
  <a href="../index.html">← PAPAFLY</a>
  <span>Staff Portal</span>
</div>
```
스타일:
```css
.pf-staff-brand { display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; border-bottom: 1px solid var(--border-gold); font-size: 0.8rem; color: var(--text-muted); }
.pf-staff-brand a { color: var(--gold); }
```
커밋: `feat: staff 포털 상단 PAPAFLY 브랜딩 링크 추가`

---

## ════════════════════════════════════
## PAGE 9 — studio/index.html (유산 격리)
## ════════════════════════════════════

### P9-T01: 유산 격리 + 리다이렉트 안내
**파일**: `studio/index.html`

파일 상단에 주석 + 페이지 내 안내 배너 추가:
```html
<!-- LEGACY: dtslib Studio 유산 파일. PAPAFLY와 무관.
     삭제 검토 필요 — 박씨 확인 전 유지. 2026-04-23 Sonnet -->
```
`<body>` 상단에 배너:
```html
<div style="background:#c0392b;color:#fff;text-align:center;padding:8px;font-size:0.8rem;">
  이 페이지는 PAPAFLY 서비스 외 내부 도구입니다.
  <a href="../index.html" style="color:#fff;text-decoration:underline">PAPAFLY 메인 →</a>
</div>
```
커밋: `chore: studio/index.html 유산 격리 주석 + 경고 배너`

---

## ════════════════════════════════════
## 전체 태스크 체크리스트
## ════════════════════════════════════

```
PAGE 1 index.html:
  [ ] P1-T01: head 표준화
  [ ] P1-T02: nav active class화 + 쇼룸 링크
  [ ] P1-T03: 인라인 스타일 → components.css
  [ ] P1-T04: 히어로 CTA 추가
  [ ] P1-T05: 카탈로그 fallback UI
  [ ] P1-T06: 푸터 보강

PAGE 2 showroom:
  [ ] P2-T01: head 표준화 + 인라인 → components.css
  [ ] P2-T02: 필터 바 추가
  [ ] P2-T03: 빈 상태 placeholder
  [ ] P2-T04: 헤더 브랜딩 강화

PAGE 3 monogatari (CH1):
  [ ] P3-T01: head 표준화
  [ ] P3-T02: 인라인 → components.css
  [ ] P3-T03: nav active class
  [ ] P3-T04: JSON 동적 로드

PAGE 4 shitate (CH2):
  [ ] P4-T01: head + 인라인 → components.css
  [ ] P4-T02: nav active class
  [ ] P4-T03: 등급 JSON화 + 동적 로드

PAGE 5 coordinate (CH3):
  [ ] P5-T01: head + 인라인 → components.css
  [ ] P5-T02: nav active + JSON 동적 로드

PAGE 6 mekiki (CH4):
  [ ] P6-T01: head + 인라인 → components.css
  [ ] P6-T02: nav active + JSON 동적 로드

PAGE 7 card:
  [ ] P7-T01: 색상 tokens.css 통일
  [ ] P7-T02: config.json 연동

PAGE 8 staff:
  [ ] P8-T01: 독자 시스템 유지 근거 주석
  [ ] P8-T02: 상단 브랜딩 링크

PAGE 9 studio:
  [ ] P9-T01: 유산 격리 배너
```

**총 태스크: 23개 | 총 예상 커밋: 23개**

---

## 실행 순서 권장

```
P3~P6 (채널 4개) 먼저 — 구조 동일해서 빠름
  ↓
P1 index.html — CSS 통합 후 확인
  ↓
P2 showroom — 연결 확인
  ↓
P7 card — 독립적
  ↓
P8 staff — 건드림 최소화
  ↓
P9 studio — 마지막 (격리만)
```

---

*Plan by Claude Sonnet 4.6 | 2026-04-23*
*Execute by DeepSeek Aider*
