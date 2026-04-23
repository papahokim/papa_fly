# PAPAFLY 리팩토링 계획서
## 작성: Claude Sonnet 4.6 | 2026-04-23
## 대상: DeepSeek Aider 실행용 — 태스크 번호 순서대로 실행. 완료 후 즉시 커밋.

---

## 실행 원칙

- 태스크 하나 완료 → 즉시 커밋 → 다음 태스크
- 각 태스크 시작 전 `git status` 클린 확인
- 파일 삭제 금지 — 이동만 허용 (레포 헌법: revert 원칙)
- style.css / recipe-page.js 는 건드리지 말 것 (레거시, 별도 확인 필요)

---

## 현재 상태 진단 요약

```
전체 완성도: 45%
가장 큰 문제:
  1. index.html 인라인 스타일 600줄 — components.css에 없음
  2. 각 채널 HTML이 각자 스타일 정의 — 4번 중복
  3. catalog/index.json 없음 — app.js 상품 로드 실패
  4. card/index.html 독자 색상 시스템 — tokens.css와 충돌
  5. studio/index.html papafly와 무관 — dtslib 유산
```

---

## PHASE 1 — CSS 통합 (인라인 → components.css)

### TASK-01: index.html 인라인 스타일 추출
**파일**: `index.html`, `assets/css/components.css`

index.html `<style>` 블록 안에 있는 클래스들을 components.css 하단에 이동.
이동 대상 클래스 (index.html에서 찾아서 전부 옮길 것):
```
.hero-divider
.cat-bar / .cat-item / .cat-item:hover / .cat-item.active / .cat-item.anchor
.products-grid
.track / .track span
.biz-arch__eye / .biz-arch__title / .biz-arch__sub
.biz-col / .biz-col__lbl / .biz-col__tag
.biz-row / .biz-row:hover / .biz-cell
.biz-split
footer p / footer .footer-logo
```
index.html `<style>` 블록은 삭제하고 위 클래스들은 components.css에만 존재.
index.html `<head>`에 `<link rel="stylesheet" href="assets/css/components.css">` 있는지 확인.

커밋:
```
refactor: index.html 인라인 스타일 600줄 → components.css 추출
```

---

### TASK-02: 채널 공통 헤더 스타일 통합
**파일**: `channels/monogatari.html`, `channels/shitate.html`, `channels/coordinate.html`, `channels/mekiki.html`, `assets/css/components.css`

4개 채널 HTML 각각에 흩어진 아래 클래스를 components.css로 통합:
```
.ch-header / .ch-eyelet / .ch-num / .ch-title / .ch-badge / .ch-desc
.ch-section / .section-eye
```
각 채널 HTML `<style>` 블록에서 위 클래스 제거.
components.css에 `/* === CHANNEL COMMON === */` 섹션 헤더 달고 추가.

커밋:
```
refactor: 4개 채널 공통 헤더 스타일 → components.css 통합
```

---

### TASK-03: 채널별 고유 스타일 통합
**파일**: 위 4개 채널 HTML, `assets/css/components.css`

채널별로만 쓰이는 스타일도 components.css로 이동. 섹션 분리:
```css
/* === CH1 MONOGATARI === */
.story-item / .story-date / .story-img / .story-body

/* === CH2 SHITATE === */
.grade-legend / .grade-dot / .items / .item-card

/* === CH3 COORDINATE === */
.coord-card / .coord-items / .coord-tag / .size-note

/* === CH4 MEKIKI === */
.guide / .guide-header / .guide-steps / .step
```
각 채널 HTML의 `<style>` 블록 삭제. 비어있으면 `<style>` 태그 자체 제거.

커밋:
```
refactor: 채널별 고유 스타일 → components.css 섹션별 통합
```

---

### TASK-04: card/index.html 색상 토큰 통일
**파일**: `card/index.html`, `assets/css/tokens.css`

card/index.html에 자체 정의된 CSS 변수 확인:
- `--gold: #D4AF37` → `var(--gold)` (tokens.css: #c4a35a)
- `--bg` 등 독자 정의 변수들

card/index.html `<style>` 블록에서 tokens.css와 겹치는 변수 정의 삭제.
card/index.html `<head>`에 tokens.css 링크 추가:
```html
<link rel="stylesheet" href="../assets/css/tokens.css">
```
삭제 후 `var(--gold)`, `var(--bg)` 등으로 참조.

커밋:
```
refactor: card/index.html 독자 색상 → tokens.css 통일
```

---

## PHASE 2 — 불필요 파일 격리

### TASK-05: studio/index.html 격리
**파일**: `studio/index.html`

studio/index.html 상단에 주석 추가:
```html
<!-- NOTE: 이 파일은 dtslib 전용 대시보드 유산. papafly 시스템과 무관.
     삭제 검토 필요 — 박씨 확인 전 유지. 2026-04-23 Sonnet -->
```
index.html 기준 studio 링크 있으면 `data-status="pending"` 속성 추가.
실제 삭제는 하지 말 것.

커밋:
```
chore: studio/index.html dtslib 유산 격리 주석 추가
```

---

### TASK-06: recipe-page.js 격리
**파일**: `assets/js/recipe-page.js`

파일 상단에 주석 추가:
```javascript
// NOTE: 웹팩토리 프로젝트 유산. recipe-page.html 미존재.
// 2026-04-23 Sonnet — 박씨 확인 전 삭제 보류.
```
index.html 또는 다른 파일에서 이 JS를 load하는 `<script>` 태그 있으면 제거.

커밋:
```
chore: recipe-page.js 유산 격리 주석 — 실제 참조 제거
```

---

## PHASE 3 — 데이터 구조 완성

### TASK-07: 채널 콘텐츠 JSON화 — CH1 물語
**파일**: `channels/CH1-stories.json` (신규), `channels/monogatari.html`

신규 파일 생성:
```json
// channels/CH1-stories.json
{
  "channel": "monogatari",
  "stories": [
    {
      "id": "ST-001",
      "date": "2026-02",
      "source": "도쿄 오기쿠보 플리마켓",
      "title": "상자 더미 끝에서 꺼낸 M-65",
      "body": "오기쿠보 구제 골목 끝 상자 더미에서 꺼냈다. 미군 지급품이 일본 거쳐 현지화된 버전. 단추 刻印이 일본어.",
      "product_id": "PF-001",
      "image": "../catalog/products/PF-001/images/main.jpg"
    }
  ]
}
```
monogatari.html에 JS 추가 — fetch로 CH1-stories.json 로드 후 `.story-list` 컨테이너에 렌더링.
기존 하드코딩 스토리 1개는 JSON으로 이동 후 HTML에서 제거.

커밋:
```
feat: CH1 물語 스토리 JSON화 — 동적 렌더링 전환
```

---

### TASK-08: 채널 콘텐츠 JSON화 — CH3 コーデ
**파일**: `channels/CH3-coordinates.json` (신규), `channels/coordinate.html`

신규 파일:
```json
{
  "channel": "coordinate",
  "coordinates": [
    {
      "id": "COORD-001",
      "title": "오기쿠보 스타일",
      "items": ["상의", "하의", "아우터", "소품"],
      "tags": ["amekaji", "workwear"],
      "note": "사이즈 참고"
    }
  ]
}
```
coordinate.html에 JS 추가 — 동적 렌더링. 하드코딩 3개 → JSON 이동 후 제거.

커밋:
```
feat: CH3 コーデ 조합 JSON화 — 동적 렌더링 전환
```

---

### TASK-09: 채널 콘텐츠 JSON화 — CH4 目利き
**파일**: `channels/CH4-guides.json` (신규), `channels/mekiki.html`

신규 파일:
```json
{
  "channel": "mekiki",
  "guides": [
    {
      "id": "GUIDE-001",
      "item": "M-65 필드자켓",
      "steps": ["단추 刻印 확인", "안감 스티치 확인", "지퍼 브랜드 확인"]
    }
  ]
}
```
mekiki.html에 JS 추가. 하드코딩 3개 → JSON 이동.

커밋:
```
feat: CH4 目利き 가이드 JSON화 — 동적 렌더링 전환
```

---

## PHASE 4 — tokens.css 정리

### TASK-10: 미사용 토큰 제거 + 보강
**파일**: `assets/css/tokens.css`

제거:
```css
--camera: /* 사용 여부 grep 후 없으면 제거 */
--bicycle: /* 동일 */
```
보강 — 아래 추가:
```css
/* 채널 보더 */
--ch1-border: var(--ch1);
--ch2-border: var(--ch2);
--ch3-border: var(--ch3);
--ch4-border: var(--ch4);

/* 반응형 폰트 */
--fs-hero: clamp(2rem, 5vw, 3.5rem);
--fs-section: clamp(1rem, 2.5vw, 1.4rem);
```

제거 전 grep 필수:
```bash
grep -r "var(--camera)" . --include="*.html" --include="*.css" --include="*.js"
grep -r "var(--bicycle)" . --include="*.html" --include="*.css" --include="*.js"
```
사용 중이면 제거 금지.

커밋:
```
refactor: tokens.css 미사용 변수 제거 + 채널 보더/반응형 폰트 토큰 보강
```

---

## PHASE 5 — 네비게이션 통일

### TASK-11: 전체 페이지 네비게이션 일관성 확인
**파일**: `index.html`, `channels/*.html`, `showroom/index.html`, `staff/index.html`

각 파일의 `<nav>` 블록 비교. 불일치 항목 확인:
- href 경로 (상대경로 혼재 여부)
- 현재 활성 페이지 강조 표시 방식
- 모바일 햄버거 메뉴 여부

불일치 발견 시 index.html 기준으로 통일.
경로는 루트 상대경로 (`/channels/monogatari.html`) 또는 문서 상대경로 (`../channels/monogatari.html`) 한 가지로 통일.

커밋:
```
refactor: 전체 페이지 네비게이션 경로 + 구조 통일
```

---

## TASK 완료 체크리스트

```
PHASE 1 CSS 통합:
  [ ] TASK-01: index.html 인라인 스타일 → components.css
  [ ] TASK-02: 채널 공통 헤더 스타일 → components.css
  [ ] TASK-03: 채널별 고유 스타일 → components.css
  [ ] TASK-04: card/index.html 색상 tokens.css 통일

PHASE 2 파일 격리:
  [ ] TASK-05: studio/index.html 격리 주석
  [ ] TASK-06: recipe-page.js 격리 주석 + 참조 제거

PHASE 3 데이터 JSON화:
  [ ] TASK-07: CH1 스토리 JSON화
  [ ] TASK-08: CH3 코디 JSON화
  [ ] TASK-09: CH4 가이드 JSON화

PHASE 4 토큰 정리:
  [ ] TASK-10: tokens.css 미사용 제거 + 보강

PHASE 5 네비게이션:
  [ ] TASK-11: 전체 네비게이션 통일
```

---

## 작업 후 기대 상태

```
완성도: 45% → 75%
components.css: 깔끔한 섹션 구조, 중복 없음
각 채널 HTML: <style> 블록 없음, 데이터만 JSON에서 로드
tokens.css: 미사용 변수 없음, 채널 토큰 완비
card/: tokens.css와 색상 시스템 통일
```

---

*Plan by Claude Sonnet 4.6 | 2026-04-23*
*Execute by DeepSeek Aider | TASK-01부터 순서대로*
