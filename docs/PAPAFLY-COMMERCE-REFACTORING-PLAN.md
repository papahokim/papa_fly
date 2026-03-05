# Plan: PAPAFLY 쇼핑몰 전환 — 일본 중년특화 패션 + 중고 일본 문화 허브

## Context

papafly(WS-15)를 ZONE G BRANCH → ZONE D PRODUCTION으로 승급.
gohsy-fashion 보일러플레이트 이식, 새 기술 0.
"64세 한국 아저씨가 큐레이션하는 일본 빈티지 문화 쇼핑몰"

**From**: PAPAFLY "Life & Food Rebooting OS" (제빵)
**To**: PAPAFLY "일본의 시간을 입다" (빈티지 커머스)

---

## 1. 채널 매핑

| CH | gohsy 원본 | papafly 전환 | 일본어 | 내용 |
|----|-----------|-------------|--------|------|
| CH1 | Story | **Monogatari** | 物語 | 상품 발굴 스토리, 일본 문화 배경 |
| CH2 | Material | **Shitate** | 仕立て | 소재/상태/복원, 경년변화, 등급 |
| CH3 | Costume | **Coordinate** | コーデ | 중년 남성 아메카지/워크웨어 코디 |
| CH4 | Academy | **Mekiki** | 目利き | 감정/감별 교육, 진품 구별, 가격 |

## 2. 상품 카테고리

```
fashion/      — 빈티지 의류 (amekaji, workwear, vintage_denim, military, ivy)
collectibles/ — 피규어, 레코드, 서적, 포스터, 토이
home/         — 식기, 다도구, 주방, 원단, 문구
accessories/  — 가방, 지갑, 시계, 안경, 벨트, 모자
```

채널 분배: fashion+collectibles → 쿠팡 / home+소품 → 네이버 / 전체 → 쇼룸+YouTube

## 3. PRODUCT_CARD 스키마 변경점

gohsy 스키마 유지 + 빈티지 전용 필드 추가:
- `origin_country`, `era` (1970s 등), `condition` (grade S~C + notes)
- `provenance` (source, acquired, story) — 입수 경위
- `price.purchase_jpy` — JPY 매입가 추적
- `images`: webtoon/cad → `before_after`, `provenance`, `coordinate`
- `spec.measurements` — 중고품 실측치
- `content_matrix`: real_model/webtoon/fantasy/cad → `photo_real`/`restoration`/`story`/`appraisal`
- 제품 ID 프리픽스: PROD → **PF**

## 4. 디자인 토큰 (일본 빈티지)

```
--bg: #0d0b08        墨 (sumi) 딥 웜 블랙
--surface: #1a1510   漆 (urushi) 래커 브라운블랙
--accent: #3d5a80    藍色 (ai-iro) 인디고
--gold: #c4a35a      金茶 (kincha) 골드티
--vermillion: #c0392b 朱色 (shu-iro)
--text: #f0ebe3      和紙 (washi) 웜 화이트
--ch1: #8b7355  --ch2: #3d5a80  --ch3: #6b8e23  --ch4: #c4a35a
```
폰트: 헤딩 `Noto Serif JP`, 본문 `Pretendard` (gohsy와 동일)

## 5. 기존 파일 처리

### KEEP + ADAPT
- `CNAME` (papafly.kr 유지)
- `core/` 전체 (HQ 거버넌스 — 그대로)
- `staff/` (관리자 포탈 — 그대로)
- `lite/` → 사장님 간편 상품관리 포탈로 전환
- `projects/quick-calc/` → JPY→KRW 매입원가/마진 계산기로 전환
- `philosophy/` → 일본 장인정신 철학 페이지로 전환
- `card/` → 빈티지 딜러 명함으로 전환
- `config.json`, `branch.json`, `shared/data.json` — 아이덴티티 업데이트

### ARCHIVE (legacy/로 이동)
- `data/recipes/` (제빵 레시피)
- `pages/` (에어프라이어 레시피 페이지들)
- `apps/recipe-viewer/` (레시피 PWA)
- `recovery/` (제빵 복구 문서)
- `business/` (구 비즈니스 페이지)
- `articles/` (구 기사 시스템)
- `affiliates/` (구 제휴 링크)
- `MASTER-PLAN.md`, `CLAUDE-PAPAFLY.md`

### NEW (gohsy-fashion 이식)
- `catalog/` — categories.json, index.json, products/PF-001/card.json, style-db/
- `channels/` — monogatari.html, shitate.html, coordinate.html, mekiki.html
- `showroom/` — index.html, lookbook/, console.html
- `coupang/` — queue/, rendered/, templates/
- `naver/` — queue/, rendered/, templates/
- `youtube/` — queue/, rendered/, templates/ (5종)
- `automation/` — orchestrator.js + 4 adapters
- `pipeline/` — flow.json, content-matrix.json
- `analytics/` — collector.js, dashboard.json, *.jsonl
- `gpu/` — detail-renderer/, render/
- `content/` — restoration/, stories/, coordinates/, appraisal/
- `styles/` — tokens.css(신규), reset/components/animations(이식), 채널CSS 4개
- `js/` — app.js, scroll-reveal.js, player-bar.js
- `workstation/` — index.html, dashboard.html, app.js
- `FACTORY.json`
- `index.html` — 메인 랜딩 리라이트

## 6. 실행 순서 (6 Phase)

### Phase 0: Archive + Scaffold
- legacy/ 생성, 구 파일 이동
- 디렉토리 스캐폴딩 (catalog/, coupang/, naver/, youtube/ 등)
- CLAUDE.md 업데이트, FACTORY.json 생성

### Phase 1: Catalog + Pipeline Core
- categories.json, index.json, PF-001 샘플 card.json
- style-db/ 이식 (amekaji/workwear/ivy/military 컨텍스트)
- pipeline/flow.json, content-matrix.json
- automation/orchestrator.js + 4 adapters
- analytics/ 스텁

### Phase 2: Design System + Channel Pages
- styles/tokens.css (일본 빈티지 팔레트)
- reset.css, components.css, animations.css 이식
- 채널 CSS 4개 + channels/ HTML 4개
- js/app.js, scroll-reveal.js, player-bar.js 이식

### Phase 3: Showroom + Templates
- index.html 리라이트 (메인 랜딩)
- showroom/ (index.html, console.html)
- coupang/naver templates (standard + vintage/culture)
- youtube templates 5종
- gpu/detail-renderer 이식

### Phase 4: 기존 콘텐츠 재활용
- config.json, branch.json, shared/data.json 업데이트
- quick-calc → 매입원가 계산기 (JPY→KRW)
- philosophy, lite, card 페이지 전환
- workstation/ 이식
- manifest.json, sitemap.xml 업데이트

### Phase 5: Scripts + HQ 연동
- scripts/sync-to-papyrus.sh, generate-report.sh
- core/version.json 범프, reporter.js 업데이트
- .github/workflows/deploy.yml
- CLAUDE.md 최종 프로토콜

### Phase 6: 첫 상품 검증
- PF-001 풀 카드 + coupang/naver rendered HTML
- showroom/lookbook/PF-001.html
- orchestrator.js --dry-run 파이프라인 검증

## 7. 검증

- papafly.kr 접속 → 일본 빈티지 쇼핑몰 랜딩
- 4채널(monogatari/shitate/coordinate/mekiki) 페이지 동작
- catalog/index.json fetch → 상품 카드 렌더링
- showroom/lookbook/PF-001.html 상품 상세
- workstation/ 비밀번호 게이트 (1126)
- quick-calc JPY→KRW 환산
- orchestrator.js PF-001 --dry-run 통과
- 모바일 반응형 (768px breakpoint)
