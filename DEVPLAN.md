# PAPAFLY 디자인 업그레이드 개발 계획서
## 작성: Claude Sonnet 4.6 | 2026-04-23
## 대상: DeepSeek Aider 실행용 — 순서대로 한 단계씩 완료 후 커밋

---

## ⚠️ 실행 원칙 (필독)

1. 단계마다 완료 후 즉시 커밋. 통합 커밋 금지.
2. 각 단계 시작 전 `git status` 확인 — 미커밋 파일 없어야 다음 단계 진행
3. orchestrator.js 수정 후 반드시 `node automation/orchestrator.js --dry-run` 실행 확인
4. `reset --hard` 금지 — 실수는 `git revert`로 정정

---

## 현재 상태 (2026-04-23 기준)

```
✅ 완료: 웹사이트 구조, CSS 시스템, 파이프라인 설계, PF-001 쿠팡 렌더링
🔴 미완: 쿠팡 브랜딩, naver/, youtube/, 상품 데이터 PF-002~010
```

---

## PHASE 1 — 쿠팡 템플릿 브랜딩 강화
### 목표: `coupang/templates/vintage.html` 만점짜리 리라이트

**파일**: `coupang/templates/vintage.html`

**변경사항 체크리스트:**

### 1-A. 상단 헤더 브랜딩 추가
기존: 없음
변경 후:
```html
<div class="pf-header">
  <span class="pf-logo">PAPAFLY</span>
  <span class="pf-tagline">재패니즈 패치 — 일본의 시간을 입다</span>
</div>
```
스타일:
```css
.pf-header { text-align: center; padding: 16px 0 24px; border-bottom: 1px solid #e8dcc8; margin-bottom: 24px; }
.pf-logo { font-size: 18px; letter-spacing: 4px; color: #c4a35a; font-weight: bold; display: block; }
.pf-tagline { font-size: 10px; letter-spacing: 2px; color: #999; display: block; margin-top: 4px; }
```

### 1-B. 등급 표기 → 감정사 스타일
기존: `등급 B`
변경 후: `鑑定 B — 양품` (등급별 라벨 매핑)

등급 매핑:
- A → `鑑定 A — 최상품`
- B → `鑑定 B — 양품`
- C → `鑑定 C — 애호가용`
- D → `鑑定 D — 부품용`

스타일:
```css
.condition { display: inline-block; border: 1px solid #c4a35a; padding: 4px 12px; font-size: 12px; color: #8b6914; letter-spacing: 1px; background: #fdf8ef; }
```

### 1-C. 가격 섹션 — 원가 투명 공개
기존: `₩98,000`만 표시
변경 후:
```html
<div class="price-block">
  <p class="price">₩{{price.sell_krw}}</p>
  <p class="price-origin">현지 매입가 ¥{{price.purchase_jpy}} (₩{{price.purchase_krw}}) → 수익 {{price.margin_pct}}%</p>
</div>
```
스타일:
```css
.price-block { margin: 16px 0; }
.price { font-size: 28px; font-weight: bold; color: #c0392b; margin: 0 0 4px; }
.price-origin { font-size: 11px; color: #aaa; letter-spacing: 0.5px; }
```

### 1-D. 연대 스탬프 시각화
기존: 테이블 셀에 `1980s`만 텍스트
변경 후: info-table 위에 별도 연대 배지 추가
```html
<div class="era-badge">── {{era}} ──</div>
```
스타일:
```css
.era-badge { text-align: center; font-size: 13px; letter-spacing: 6px; color: #c4a35a; margin: 20px 0 12px; font-weight: bold; }
```

### 1-E. 物語 섹션 강화
기존: 골드 좌선 + 텍스트
변경 후: 배경 종이 질감 + 인용부호 + 장소명 일본어 병기

```html
<div class="provenance">
  <p class="prov-label">物語 — 발굴 스토리</p>
  <p class="prov-text">「{{provenance.story}}」</p>
  <p class="prov-source">{{provenance.source}} · {{provenance.acquired}}</p>
</div>
```
스타일:
```css
.provenance { background: #fdf5e4; border: 1px solid #e8dcc8; border-left: 3px solid #c4a35a; padding: 20px 24px; margin: 24px 0; }
.prov-label { font-size: 10px; color: #c4a35a; letter-spacing: 3px; margin-bottom: 12px; }
.prov-text { font-size: 14px; line-height: 2; color: #444; quotes: "「" "」"; }
.prov-text::before { content: open-quote; font-size: 18px; color: #c4a35a; }
.prov-text::after { content: close-quote; font-size: 18px; color: #c4a35a; }
.prov-source { font-size: 11px; color: #999; margin-top: 10px; }
```

### 1-F. 푸터 브랜딩
기존: 단순 텍스트
변경 후:
```html
<div class="pf-footer">
  <p>PAPAFLY 재패니즈 패치 · papafly.kr</p>
  <p class="pf-footer-jp">日本の時間を着る</p>
</div>
```
스타일:
```css
.pf-footer { text-align: center; padding: 24px 0 8px; border-top: 1px solid #e8dcc8; margin-top: 32px; }
.pf-footer p { font-size: 11px; color: #aaa; letter-spacing: 1px; margin: 2px 0; }
.pf-footer-jp { color: #c4a35a !important; }
```

**완료 후 커밋:**
```bash
git add coupang/templates/vintage.html
git commit -m "feat: 쿠팡 빈티지 템플릿 브랜딩 강화 — 감정사 등급/연대배지/원가공개/物語 리디자인"
```

**렌더링 재생성:**
```bash
node automation/orchestrator.js
git add coupang/rendered/
git commit -m "chore: PF-001 쿠팡 렌더 재생성 — 브랜딩 업그레이드 반영"
```

---

## PHASE 2 — Naver 디렉토리 + 템플릿 생성
### 목표: `pipeline/flow.json` Step 3 실행 가능하게 만들기

**생성할 파일 목록:**
```
naver/
├── templates/
│   └── standard.html     ← 메인 템플릿
└── rendered/             ← orchestrator.js가 여기 출력
```

**`naver/templates/standard.html`** — 쿠팡 vintage.html 기반으로 만들되:
- 네이버 스마트스토어 규격 맞춤 (최대 800px)
- 상단에 `PAPAFLY × 스마트스토어` 표시
- 나머지 구조는 쿠팡 템플릿과 동일하게 유지

**orchestrator.js 수정** — Step 3 (render_naver) 처리 추가:
`render_coupang` 블록 참고해서 `render_naver` 블록 동일 패턴으로 추가.
조건: `card.channel?.platform === 'naver'` 또는 `card.channel?.naver === true`

**완료 후 커밋:**
```bash
git add naver/
git commit -m "feat: Naver 스마트스토어 템플릿 + 디렉토리 생성 — 파이프라인 Step 3 활성화"
```

---

## PHASE 3 — YouTube 템플릿 5종 생성
### 목표: `pipeline/flow.json` Step 4 실행 가능하게 만들기

**생성할 파일 목록:**
```
youtube/
├── templates/
│   ├── sourcing-story.html    ← 발굴 스토리 썸네일
│   ├── appraisal.html         ← 감정 영상 썸네일
│   ├── coordinate.html        ← 코디 제안 썸네일
│   ├── pwa-screen.html        ← PWA 화면 캡처용
│   └── flea-market.html       ← 플리마켓 영상 썸네일
└── rendered/
```

### 각 템플릿 공통 스펙
- 크기: 1280×720 (YouTube 썸네일 표준)
- 배경: 다크 (#0d0b08) 또는 종이 질감 (#fdf5e4)
- 폰트: Noto Serif JP (제목) + Pretendard (본문)
- 색상: 골드 #c4a35a 포인트

### sourcing-story.html (발굴 스토리)
```
레이아웃:
[좌: 상품 이미지 영역 60%] [우: 텍스트 40%]
우측 상단: PAPAFLY 로고 (골드)
우측 중앙: 상품명 (한글 대) + 일본어 소
우측 하단: "64세 아저씨의 발굴" 고정 태그라인
하단 바: 연대 스탬프 + 매입가 → 판매가
```

### appraisal.html (감정)
```
레이아웃: 중앙 집중형
상단: 鑑定 (큰 한자) — 골드
중앙: 등급 도트 ◉◉◯◯◯
하단: 아이템명 + 등급 설명
배경: 어두운 종이 질감
```

### coordinate.html (코디)
```
레이아웃: 풀블리드 이미지형
좌하단 오버레이: コーデ 제안
아이템명 + 가격
우상단: PAPAFLY 배지
```

### pwa-screen.html (PWA 화면)
```
모바일 프레임 (390×844) 중앙 배치
papafly.kr 쇼룸 페이지 시뮬레이션
상단: "PAPAFLY 쇼룸" 텍스트
```

### flea-market.html (플리마켓)
```
레이아웃: 다이나믹 대각선 분할
좌상→우하: 도쿄 플리마켓 분위기
골드 텍스트: 장소명 (일본어) + 날짜
하단: PAPAFLY 로고
```

**orchestrator.js 수정** — Step 4 (render_youtube) 처리 추가:
`content_matrix` 필드 기준으로 어떤 유튜브 템플릿 렌더링할지 결정.
- `photo_real: true` → sourcing-story.html 렌더
- `appraisal: true` → appraisal.html 렌더
- 나머지는 coordinate.html 기본 렌더

**완료 후 커밋:**
```bash
git add youtube/
git commit -m "feat: YouTube 썸네일 템플릿 5종 생성 — 파이프라인 Step 4 활성화"
```

---

## PHASE 4 — 샘플 상품 데이터 PF-002~005
### 목표: 파이프라인 일괄 렌더링 검증

**PF-001 card.json 구조 완전히 따라서** 4개 추가 생성:

```
catalog/products/PF-002/card.json  ← 70s 데님 재킷
catalog/products/PF-003/card.json  ← 80s 나이론 파카
catalog/products/PF-004/card.json  ← 60s 울 코트
catalog/products/PF-005/card.json  ← 90s 가죽 벨트
```

**PF-002 예시:**
```json
{
  "id": "PF-002",
  "patch": "재패니즈 패치 #002",
  "name": {
    "ko": "70s 일본제 데님 트러커 재킷",
    "jp": "70年代 日本製 デニムトラッカージャケット",
    "en": "1970s Japanese Denim Trucker Jacket"
  },
  "category": "fashion",
  "tags": ["denim", "amekaji", "outerwear"],
  "origin_country": "JP",
  "era": "1970s",
  "made_in": "일본제",
  "condition": {
    "grade": "A",
    "notes": "세탁 후 전체 양호. 단추 원본. 내부 태그 완존."
  },
  "spec": {
    "measurements": {
      "chest": "102cm",
      "length": "65cm",
      "shoulder": "46cm",
      "sleeve": "62cm"
    },
    "color": "인디고 블루",
    "material": "코튼 100%"
  },
  "provenance": {
    "source": "도쿄 시모키타자와 빈티지 마켓",
    "acquired": "2026-02",
    "story": "시모키타자와 빈티지 골목 구석 상자에서 발굴. 70년대 특유의 셀비지 스티치가 살아있다. 등판 로고 없는 순수 공장 오리지널."
  },
  "price": {
    "purchase_jpy": 5000,
    "purchase_krw": 46000,
    "sell_krw": 138000,
    "margin_pct": 67
  },
  "images": {
    "main": "images/main.jpg",
    "before_after": [],
    "provenance": "images/provenance.jpg",
    "coordinate": []
  },
  "content_matrix": {
    "photo_real": true,
    "restoration": false,
    "story": true,
    "appraisal": true
  },
  "channel": {
    "platform": "coupang",
    "template": "vintage",
    "rendered": "../../coupang/rendered/PF-002.html"
  },
  "status": "available",
  "created": "2026-04-23"
}
```

PF-003~005는 동일 구조로 아이템만 교체:
- PF-003: 80s 나이론 파카, era=1980s, condition.grade=B
- PF-004: 60s 울 오버코트, era=1960s, condition.grade=A
- PF-005: 90s 가죽 군더벨트, era=1990s, category=accessory, condition.grade=B

**전체 파이프라인 실행:**
```bash
node automation/orchestrator.js
```

**완료 후 커밋:**
```bash
git add catalog/products/ coupang/rendered/ naver/rendered/ youtube/rendered/
git commit -m "feat: 샘플 상품 PF-002~005 추가 + 전체 파이프라인 일괄 렌더 실행"
```

---

## PHASE 5 — catalog/index.json 자동 갱신 검증
### 목표: orchestrator.js Step 5 확인

`node automation/orchestrator.js` 실행 후 `catalog/index.json` 확인:
- total: 5로 갱신됐는지
- PF-001~005 전부 등록됐는지

이상 없으면:
```bash
git add catalog/index.json
git commit -m "chore: 카탈로그 인덱스 갱신 — PF-001~005 총 5개 등록"
```

---

## 완료 기준 체크리스트

```
Phase 1: [ ] coupang/templates/vintage.html 브랜딩 업그레이드
         [ ] PF-001 재렌더링 확인
Phase 2: [ ] naver/templates/standard.html 생성
         [ ] naver/rendered/ 디렉토리 생성
         [ ] orchestrator.js naver 처리 추가
Phase 3: [ ] youtube/templates/ 5종 생성
         [ ] youtube/rendered/ 디렉토리 생성
         [ ] orchestrator.js youtube 처리 추가
Phase 4: [ ] PF-002~005 card.json 4개 생성
         [ ] 전체 파이프라인 실행 성공
Phase 5: [ ] catalog/index.json total=5 확인
```

---

## 작업 순서 요약

```
Phase 1 (쿠팡 브랜딩)  → Phase 2 (Naver)  → Phase 3 (YouTube)
     ↓
Phase 4 (상품 데이터 5개)
     ↓
Phase 5 (인덱스 갱신 확인)
     ↓
전체 파이프라인 node automation/orchestrator.js 실행
```

각 Phase 완료마다 커밋. 총 커밋 예상: 7~9개.

---
*Plan by Claude Sonnet 4.6 | 2026-04-23*
*Execute by DeepSeek Aider*
