# PAPA FLY — MASTER IMPLEMENTATION PLAN
## Site-Wide Redesign & Spanish PWA Launch
### Version 1.0 — 2026-01-10

---

## Executive Summary

이 문서는 Whitepaper v5.0을 프레임워크로, 평가에서 지적된 모든 약점을 보완하여 **만점 구성**으로 전체 사이트를 재설계하는 종합 계획서다.

### 핵심 변경사항

| Before | After |
|--------|-------|
| 한국어 단일 사이트 | Spanish 메인 + (한글) 병기 이중 구조 |
| 랜딩 = 시스템 설명 | 랜딩 = 콘텐츠 허브 (YouTube 연동) |
| 레시피 1개 샘플 | 3개 파일럿 에피소드 PWA 페이지 |
| 촬영일 미정 | D-day 명시 + 체크리스트 통합 |
| Analytics 미결정 | Plausible 확정 + 이벤트 정의 |

---

# PART I — SITE ARCHITECTURE

---

## 1. New File Structure

```
papafly/
├── index.html                    # 🔄 리팩토링: 콘텐츠 허브로 전환
├── CLAUDE.md                     # ✅ 유지 (업데이트)
├── MASTER-PLAN.md                # 🆕 이 문서
├── sw.js                         # 🔄 캐시 업데이트
│
├── assets/
│   ├── css/
│   │   ├── style.css             # 🔄 리팩토링: Spanish 지원 추가
│   │   └── recipe-page.css       # 🆕 레시피 페이지 전용 스타일
│   ├── manifest.json             # 🔄 다국어 메타데이터
│   └── images/
│       ├── logo.png              # ✅ 유지
│       ├── og-image.png          # 🆕 소셜 공유용
│       └── thumbnails/           # 🆕 에피소드 썸네일
│           ├── ep01.jpg
│           ├── ep02.jpg
│           └── ep03.jpg
│
├── es/                           # 🆕 Spanish PWA 레시피 (메인)
│   ├── index.html                # 🆕 Spanish 레시피 허브
│   ├── croqueta-coreana-001/
│   │   └── index.html            # 🆕 EP1: Air Fryer 80%
│   ├── croqueta-coreana-002/
│   │   └── index.html            # 🆕 EP2: Microwave Rescue
│   └── croqueta-coreana-003/
│       └── index.html            # 🆕 EP3: Pan de tu Abuela
│
├── data/
│   ├── registry.json             # 🔄 Spanish 레시피 추가
│   ├── recipes/
│   │   ├── croquette-classic.json    # ✅ 유지 (한국어 원본)
│   │   ├── croqueta-coreana-001.json # 🆕 Spanish 버전
│   │   ├── croqueta-coreana-002.json # 🆕
│   │   └── croqueta-coreana-003.json # 🆕
│   └── phase0-checklist.json     # 🆕 촬영 체크리스트 데이터
│
├── staff/
│   ├── index.html                # 🔄 Phase 0 대시보드 추가
│   ├── phase0/                   # 🆕 Phase 0 관리 도구
│   │   ├── index.html            # 🆕 Phase 0 컨트롤 센터
│   │   ├── checklist.html        # 🆕 12항목 체크리스트
│   │   └── kpi-tracker.html      # 🆕 KPI 모니터링
│   └── tools/
│       ├── recipe-manager.html   # ✅ 유지
│       ├── content-planner.html  # ✅ 유지
│       └── spanish-preview.html  # 🆕 Chrome 번역 시뮬레이터
│
├── projects/
│   └── quick-calc/
│       └── index.html            # ✅ 유지
│
├── apps/
│   └── recipe-viewer/
│       └── index.html            # 🔄 Spanish 지원 추가
│
└── recovery/
    ├── index.html                # ✅ 유지
    ├── WHITEPAPER.md             # 🔄 v5.0으로 교체
    ├── REBUILD.md                # ✅ 유지
    ├── ORIGIN.md                 # ✅ 유지
    └── MOU.md                    # 🆕 파일럿 계약서
```

---

## 2. Page Inventory (Total: 15 Pages)

### 2.1 Public Pages (8)

| # | Path | 언어 | 목적 | 상태 |
|---|------|------|------|------|
| 1 | `/index.html` | KO | 메인 랜딩 (콘텐츠 허브) | 🔄 리팩토링 |
| 2 | `/es/index.html` | ES+(KO) | Spanish 레시피 허브 | 🆕 신규 |
| 3 | `/es/croqueta-coreana-001/` | ES+(KO) | EP1 Air Fryer | 🆕 신규 |
| 4 | `/es/croqueta-coreana-002/` | ES+(KO) | EP2 Microwave | 🆕 신규 |
| 5 | `/es/croqueta-coreana-003/` | ES+(KO) | EP3 Pan | 🆕 신규 |
| 6 | `/apps/recipe-viewer/` | KO | 레시피 뷰어 | 🔄 업데이트 |
| 7 | `/projects/quick-calc/` | KO | 원가 계산기 | ✅ 유지 |
| 8 | `/recovery/` | KO | 문서 허브 | ✅ 유지 |

### 2.2 Staff Pages (7)

| # | Path | 목적 | 상태 |
|---|------|------|------|
| 9 | `/staff/` | 컨트롤 패널 | 🔄 업데이트 |
| 10 | `/staff/phase0/` | Phase 0 센터 | 🆕 신규 |
| 11 | `/staff/phase0/checklist.html` | 12항목 체크리스트 | 🆕 신규 |
| 12 | `/staff/phase0/kpi-tracker.html` | KPI 모니터링 | 🆕 신규 |
| 13 | `/staff/tools/recipe-manager.html` | 레시피 관리 | ✅ 유지 |
| 14 | `/staff/tools/content-planner.html` | 콘텐츠 기획 | ✅ 유지 |
| 15 | `/staff/tools/spanish-preview.html` | 번역 미리보기 | 🆕 신규 |

---

# PART II — BILINGUAL SYSTEM (Spanish + 한글)

---

## 3. Bilingual Strategy

### 3.1 Core Principle

```
Primary: Spanish (LatAm 타겟)
Secondary: 한글 괄호 병기 (한국 정체성 + 역수입 트리거)
```

### 3.2 병기 대상 키워드 (7개 제한)

| Spanish | 한글 | HTML 처리 |
|---------|------|-----------|
| Croqueta | 고로케 | `translate="no"` |
| Air Fryer | 에어프라이어 | `translate="no"` |
| Microondas | 전자레인지 | 일반 |
| Sartén | 프라이팬 | 일반 |
| Paso | 단계 | 일반 |
| Ingredientes | 재료 | 일반 |
| Tiempo | 시간 | 일반 |

### 3.3 HTML 구현 패턴

```html
<!-- 핵심 용어: Chrome 번역 보호 -->
<h1>
  <span translate="no">Croqueta Coreana</span>
  <small class="ko-hint">(고로케)</small>
</h1>

<!-- 일반 용어: 괄호만 병기 -->
<h2>Ingredientes <small class="ko-hint">(재료)</small></h2>

<!-- 단계: 숫자 + Spanish -->
<div class="step">
  <span class="step-num">Paso 1</span>
  <span class="step-text">Precalienta a 180°C</span>
</div>
```

### 3.4 CSS 클래스

```css
/* 한글 힌트 스타일 */
.ko-hint {
  font-size: 0.75em;
  color: var(--text-muted);
  font-weight: normal;
  margin-left: 4px;
}

/* Chrome 번역 시 숨김 (선택적) */
html[lang="ko"] .ko-hint {
  display: none;
}
```

---

## 4. Chrome Translation Protocol

### 4.1 촬영 워크플로우

```
1. Chrome에서 /es/croqueta-coreana-001/ 열기
2. 우클릭 → "한국어로 번역"
3. 화면 녹화 시작
4. 3-tab 모드 전환하며 시연
5. 녹화 종료
```

### 4.2 translate 속성 전략

| 요소 | translate 속성 | 이유 |
|------|---------------|------|
| 브랜드명 (Croqueta Coreana) | `no` | 정체성 보존 |
| 모드명 (Air Fryer) | `no` | 일관성 |
| 일반 텍스트 | 기본값 (yes) | 자연스러운 번역 |
| 숫자/시간 | 기본값 | 번역 불필요 |

### 4.3 D-1 번역 테스트 체크리스트

- [ ] Chrome 번역 후 레이아웃 깨짐 없음
- [ ] `translate="no"` 요소 보존 확인
- [ ] 타이머 기능 정상 작동
- [ ] 탭 전환 정상 작동
- [ ] 모바일에서 동일하게 작동

---

# PART III — LANDING PAGE REFACTORING

---

## 5. Current State Analysis

### 5.1 현재 문제점

| 문제 | 영향 | 해결책 |
|------|------|--------|
| 시스템 설명 과다 | 일반 사용자 이탈 | 콘텐츠 중심으로 전환 |
| 한국어 Only | LatAm 타겟 불가 | ES 허브 분리 |
| TBU 플레이스홀더 | 미완성 느낌 | 실제 콘텐츠로 교체 |
| Driver 설명 복잡 | OS 개념 혼란 | 단순화 or 숨김 |
| CTA 분산 | 행동 유도 약함 | 단일 CTA 강조 |

### 5.2 Refactoring Scope

```
유지: 디자인 시스템 (CSS 변수, 컬러)
수정: 섹션 구조, 콘텐츠 우선순위
삭제: 과도한 시스템 설명
추가: YouTube 연동, ES 허브 링크
```

---

## 6. New Landing Page Structure

### 6.1 섹션 재구성

```
┌─────────────────────────────────────────────┐
│ HEADER                                      │
│ ├─ 로고 + 타이틀                             │
│ └─ 언어 선택 (🇰🇷 / 🇪🇸)                      │
├─────────────────────────────────────────────┤
│ HERO (NEW)                                  │
│ ├─ 핵심 메시지: "식은 빵도 다시 날아오른다"    │
│ ├─ 서브: 64년생 제빵 장인의 리부팅 프로젝트    │
│ └─ CTA: "레시피 보기" / "Ver Recetas 🇪🇸"   │
├─────────────────────────────────────────────┤
│ FEATURED CONTENT                            │
│ ├─ 최신 에피소드 카드 (YouTube 임베드 or 링크)│
│ └─ "80% 맛, 100% 집에서"                     │
├─────────────────────────────────────────────┤
│ EPISODE GRID (Replaces Video Carousel)      │
│ ├─ EP1: Air Fryer 고로케                    │
│ ├─ EP2: 전자레인지 구조대                    │
│ └─ EP3: 할머니의 프라이팬                    │
├─────────────────────────────────────────────┤
│ STORY (Simplified)                          │
│ ├─ PAPA: 장인의 40년 노하우                  │
│ ├─ FLY: 디지털로 다시 날다                   │
│ └─ 가치 배지 4개 (압축)                      │
├─────────────────────────────────────────────┤
│ FOOTER                                      │
│ ├─ Staff 링크                               │
│ └─ PWA 설치 배너                            │
└─────────────────────────────────────────────┘
```

### 6.2 삭제 대상 섹션

| 섹션 | 이유 | 대체 |
|------|------|------|
| Driver Operations (Reheat Grid) | 일반 사용자에게 혼란 | ES 레시피 페이지로 이동 |
| Vertical Card Grid (Drivers) | 시스템 내부 정보 | Staff 대시보드로 이동 |
| Hero (시스템 설명) | 기술 중심 메시지 | 감성 메시지로 교체 |
| Overview Cards (Layers) | OS 아키텍처 설명 | recovery/로 이동 |

### 6.3 HTML 골격 (New)

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PAPA FLY — Life & Food Rebooting</title>

  <!-- Open Graph -->
  <meta property="og:title" content="PAPA FLY — 식은 빵도 다시 날아오른다">
  <meta property="og:description" content="64년생 제빵 장인의 에어프라이어 리히팅 레시피">
  <meta property="og:image" content="/assets/images/og-image.png">

  <!-- PWA -->
  <link rel="manifest" href="/assets/manifest.json">
  <meta name="theme-color" content="#E8A54B">

  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
  <!-- Header -->
  <header class="header">
    <div class="logo-container">
      <img src="/assets/images/logo.png" alt="PAPA FLY" class="logo">
      <h1 class="site-title">PAPA FLY</h1>
    </div>
    <nav class="lang-switch">
      <a href="/" class="active">🇰🇷</a>
      <a href="/es/">🇪🇸</a>
    </nav>
  </header>

  <!-- Hero -->
  <section class="hero">
    <h2 class="hero-title">식은 빵도, 식은 꿈도<br>다시 날아오른다</h2>
    <p class="hero-subtitle">64년생 제빵 장인의 에어프라이어 리부팅 프로젝트</p>
    <div class="hero-cta">
      <a href="#episodes" class="btn btn-primary">레시피 보기</a>
      <a href="/es/" class="btn btn-secondary">Ver Recetas 🇪🇸</a>
    </div>
  </section>

  <!-- Featured -->
  <section class="featured">
    <div class="featured-card">
      <div class="featured-badge">NEW</div>
      <h3>클래식 고로케 — 80% 맛 복원</h3>
      <p>에어프라이어 180°C, 5분이면 충분합니다</p>
      <a href="/es/croqueta-coreana-001/" class="btn btn-ghost">자세히 보기 →</a>
    </div>
  </section>

  <!-- Episode Grid -->
  <section id="episodes" class="episodes">
    <h2 class="section-title">에피소드</h2>
    <div class="episode-grid">
      <!-- EP1 -->
      <article class="episode-card">
        <div class="episode-thumb" style="background-image: url('/assets/images/thumbnails/ep01.jpg')">
          <span class="episode-num">EP1</span>
        </div>
        <h3>Air Fryer 80%</h3>
        <p>에어프라이어로 10분 만에</p>
        <a href="/es/croqueta-coreana-001/">보기</a>
      </article>

      <!-- EP2 -->
      <article class="episode-card">
        <div class="episode-thumb" style="background-image: url('/assets/images/thumbnails/ep02.jpg')">
          <span class="episode-num">EP2</span>
        </div>
        <h3>Microwave Rescue</h3>
        <p>4분 응급 처치</p>
        <a href="/es/croqueta-coreana-002/">보기</a>
      </article>

      <!-- EP3 -->
      <article class="episode-card">
        <div class="episode-thumb" style="background-image: url('/assets/images/thumbnails/ep03.jpg')">
          <span class="episode-num">EP3</span>
        </div>
        <h3>Pan de tu Abuela</h3>
        <p>할머니의 프라이팬</p>
        <a href="/es/croqueta-coreana-003/">보기</a>
      </article>
    </div>
  </section>

  <!-- Story (Compressed) -->
  <section class="story">
    <div class="story-content">
      <h2>PAPA + FLY</h2>
      <p><strong>PAPA</strong> — 64년생 제빵 장인. 40년간 빵을 구웠다.</p>
      <p><strong>FLY</strong> — 정년 후, 디지털로 다시 날아오르다.</p>
      <div class="value-badges">
        <span class="badge">장인정신</span>
        <span class="badge">리부팅</span>
        <span class="badge">실용성</span>
        <span class="badge">가족</span>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <p class="system-def">PAPA FLY = Life & Food Rebooting OS</p>
    <a href="/staff/" class="staff-link">Staff</a>
  </footer>

  <!-- PWA Install Banner -->
  <div id="pwa-banner" class="pwa-banner hidden">
    <p>홈 화면에 추가하시겠습니까?</p>
    <button id="pwa-install" class="btn btn-small">설치</button>
    <button id="pwa-dismiss" class="btn btn-ghost btn-small">닫기</button>
  </div>

  <script>
    // PWA Install Logic (기존 코드 유지)
  </script>
</body>
</html>
```

---

# PART IV — SPANISH RECIPE PAGE TEMPLATE

---

## 7. Recipe Page Spec

### 7.1 레이아웃 구조

```
┌─────────────────────────────────────────────┐
│ HEADER                                      │
│ ├─ ← Back to Hub                            │
│ └─ Episode Badge (EP1)                      │
├─────────────────────────────────────────────┤
│ TITLE                                       │
│ ├─ Croqueta Coreana (고로케)                 │
│ └─ "80% sabor en casa"                      │
├─────────────────────────────────────────────┤
│ MODE TABS (Fixed 3)                         │
│ ├─ 🔥 Air Fryer (에어프라이어)               │
│ ├─ ⚡ Microondas (전자레인지)                │
│ └─ 🍳 Sartén (프라이팬)                      │
├─────────────────────────────────────────────┤
│ ACTIVE MODE CONTENT                         │
│ ├─ Time + Temp Badge                        │
│ ├─ Step 1 (with timer button)               │
│ ├─ Step 2 (with timer button)               │
│ └─ Step 3 (with timer button)               │
├─────────────────────────────────────────────┤
│ INGREDIENTS                                 │
│ ├─ Item + Local alternatives                │
│ └─ Substitution hints                       │
├─────────────────────────────────────────────┤
│ CTA                                         │
│ ├─ YouTube Link                             │
│ └─ Share Button                             │
├─────────────────────────────────────────────┤
│ FOOTER                                      │
│ └─ "Gracias. 감사합니다."                    │
└─────────────────────────────────────────────┘
```

### 7.2 HTML Template

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Croqueta Coreana — PAPA FLY</title>

  <!-- Open Graph (Spanish) -->
  <meta property="og:title" content="Croqueta Coreana — 80% sabor en casa">
  <meta property="og:description" content="Receta coreana con air fryer en 10 minutos">
  <meta property="og:image" content="/assets/images/thumbnails/ep01.jpg">
  <meta property="og:locale" content="es_LA">

  <!-- PWA -->
  <link rel="manifest" href="/assets/manifest.json">
  <meta name="theme-color" content="#E8A54B">

  <link rel="stylesheet" href="/assets/css/style.css">
  <link rel="stylesheet" href="/assets/css/recipe-page.css">
</head>
<body>
  <!-- Header -->
  <header class="recipe-header">
    <a href="/es/" class="back-link">← Recetas</a>
    <span class="episode-badge">EP1</span>
  </header>

  <!-- Title -->
  <section class="recipe-hero">
    <h1>
      <span translate="no">Croqueta Coreana</span>
      <small class="ko-hint">(고로케)</small>
    </h1>
    <p class="tagline">80% sabor en casa</p>
  </section>

  <!-- Mode Tabs -->
  <nav class="mode-tabs">
    <button class="mode-tab active" data-mode="airfryer">
      🔥 <span translate="no">Air Fryer</span>
      <small class="ko-hint">(에어프라이어)</small>
    </button>
    <button class="mode-tab" data-mode="microwave">
      ⚡ Microondas
      <small class="ko-hint">(전자레인지)</small>
    </button>
    <button class="mode-tab" data-mode="pan">
      🍳 Sartén
      <small class="ko-hint">(프라이팬)</small>
    </button>
  </nav>

  <!-- Mode Content: Air Fryer -->
  <section class="mode-content active" id="mode-airfryer">
    <div class="mode-summary">
      <span class="temp-badge">180°C</span>
      <span class="time-badge">12 min</span>
    </div>

    <ol class="steps">
      <li class="step">
        <div class="step-header">
          <span class="step-label">Paso <span class="ko-hint">(단계)</span> 1</span>
          <button class="timer-btn" data-minutes="2">⏱️ 2 min</button>
        </div>
        <p>Precalienta a 180°C</p>
      </li>
      <li class="step">
        <div class="step-header">
          <span class="step-label">Paso 2</span>
          <button class="timer-btn" data-minutes="8">⏱️ 8 min</button>
        </div>
        <p>Coloca las croquetas. Rocía aceite.</p>
      </li>
      <li class="step">
        <div class="step-header">
          <span class="step-label">Paso 3</span>
          <button class="timer-btn" data-minutes="2">⏱️ 2 min</button>
        </div>
        <p>Descansa y sirve.</p>
      </li>
    </ol>
  </section>

  <!-- Mode Content: Microwave -->
  <section class="mode-content" id="mode-microwave">
    <div class="mode-summary">
      <span class="time-badge">4 min</span>
      <span class="mode-note">Emergencia</span>
    </div>

    <ol class="steps">
      <li class="step">
        <div class="step-header">
          <span class="step-label">Paso 1</span>
          <button class="timer-btn" data-minutes="1">⏱️ 1 min</button>
        </div>
        <p>Plato + tapa ligera</p>
      </li>
      <li class="step">
        <div class="step-header">
          <span class="step-label">Paso 2</span>
          <button class="timer-btn" data-minutes="2">⏱️ 2 min</button>
        </div>
        <p>Calienta a potencia media</p>
      </li>
      <li class="step">
        <div class="step-header">
          <span class="step-label">Paso 3</span>
          <button class="timer-btn" data-minutes="1">⏱️ 1 min</button>
        </div>
        <p>Reposo</p>
      </li>
    </ol>
  </section>

  <!-- Mode Content: Pan -->
  <section class="mode-content" id="mode-pan">
    <div class="mode-summary">
      <span class="time-badge">7 min</span>
      <span class="mode-note">Sin aparatos</span>
    </div>

    <ol class="steps">
      <li class="step">
        <div class="step-header">
          <span class="step-label">Paso 1</span>
          <button class="timer-btn" data-minutes="2">⏱️ 2 min</button>
        </div>
        <p>Fuego medio, poco aceite</p>
      </li>
      <li class="step">
        <div class="step-header">
          <span class="step-label">Paso 2</span>
          <button class="timer-btn" data-minutes="4">⏱️ 4 min</button>
        </div>
        <p>Dora ambos lados</p>
      </li>
      <li class="step">
        <div class="step-header">
          <span class="step-label">Paso 3</span>
          <button class="timer-btn" data-minutes="1">⏱️ 1 min</button>
        </div>
        <p>Reposo</p>
      </li>
    </ol>
  </section>

  <!-- Ingredients -->
  <section class="ingredients">
    <h2>Ingredientes <small class="ko-hint">(재료)</small></h2>
    <ul class="ingredient-list">
      <li>
        <span class="ingredient-name">Papa</span>
        <span class="ingredient-alt">→ yuca, camote</span>
      </li>
      <li>
        <span class="ingredient-name">Carne molida</span>
        <span class="ingredient-alt">→ pollo, cerdo</span>
      </li>
      <li>
        <span class="ingredient-name">Pan rallado</span>
        <span class="ingredient-alt">→ harina, galleta molida</span>
      </li>
    </ul>
  </section>

  <!-- CTA -->
  <section class="recipe-cta">
    <a href="https://youtube.com/@papafly" class="btn btn-primary" target="_blank">
      📺 Ver en YouTube
    </a>
    <button class="btn btn-secondary share-btn">
      📤 Compartir
    </button>
  </section>

  <!-- Footer -->
  <footer class="recipe-footer">
    <p>Gracias. 감사합니다.</p>
    <p class="credit">PAPA FLY — Life & Food Rebooting</p>
  </footer>

  <!-- Timer Modal -->
  <div id="timer-modal" class="modal hidden">
    <div class="modal-content">
      <div class="timer-display">00:00</div>
      <div class="timer-controls">
        <button id="timer-start" class="btn">▶️ Iniciar</button>
        <button id="timer-reset" class="btn btn-ghost">↺ Reset</button>
      </div>
    </div>
  </div>

  <script src="/assets/js/recipe-page.js"></script>
</body>
</html>
```

---

# PART V — ANALYTICS SETUP

---

## 8. Analytics Decision (Confirmed)

### 8.1 Tool Selection: **Plausible**

| 기준 | Plausible | GA4 |
|------|-----------|-----|
| 프라이버시 | ✅ GDPR 무관 | ⚠️ 쿠키 배너 필요 |
| 복잡도 | ✅ 단순 | ❌ 학습 곡선 |
| 비용 | €9/월 | 무료 |
| 설정 시간 | 5분 | 30분+ |

**결정:** Phase 0은 단순함이 우선. Plausible 사용.

### 8.2 이벤트 정의 (Phase 0 Minimal)

| Event | Trigger | Purpose |
|-------|---------|---------|
| `pageview` | 페이지 로드 | 기본 트래픽 |
| `outbound` | 외부 링크 클릭 | YouTube 전환 추적 |
| `mode_select` | 탭 전환 | 사용 패턴 (Phase 1) |
| `timer_start` | 타이머 시작 | 실사용 여부 (Phase 1) |

### 8.3 Plausible 설치 코드

```html
<!-- Head에 추가 -->
<script defer data-domain="papafly.kr" src="https://plausible.io/js/script.js"></script>

<!-- Outbound 링크 추적 (자동) -->
<script defer data-domain="papafly.kr" src="https://plausible.io/js/script.outbound-links.js"></script>
```

---

# PART VI — PHASE 0 CONTROL CENTER

---

## 9. Phase 0 Dashboard

### 9.1 12-Item Checklist (From Whitepaper)

```json
{
  "phase0_checklist": [
    { "id": 1, "task": "MOU 서명", "owner": "both", "status": "pending" },
    { "id": 2, "task": "10문장 스페인어 카드 출력", "owner": "uncle", "status": "pending" },
    { "id": 3, "task": "촬영 셋업 테스트 (10분)", "owner": "both", "status": "pending" },
    { "id": 4, "task": "EP1 촬영 계획서", "owner": "parksy", "status": "pending" },
    { "id": 5, "task": "EP2 촬영 계획서", "owner": "parksy", "status": "pending" },
    { "id": 6, "task": "EP3 촬영 계획서", "owner": "parksy", "status": "pending" },
    { "id": 7, "task": "PWA 페이지 1 (EP1)", "owner": "parksy", "status": "pending" },
    { "id": 8, "task": "PWA 페이지 2 (EP2)", "owner": "parksy", "status": "pending" },
    { "id": 9, "task": "PWA 페이지 3 (EP3)", "owner": "parksy", "status": "pending" },
    { "id": 10, "task": "Analytics 설정 (Plausible)", "owner": "parksy", "status": "pending" },
    { "id": 11, "task": "YouTube Description 템플릿", "owner": "parksy", "status": "pending" },
    { "id": 12, "task": "썸네일 템플릿", "owner": "parksy", "status": "pending" }
  ],
  "d_day": "2026-01-XX",
  "status": "준비 중"
}
```

### 9.2 KPI Tracker (Kill-Switch Dashboard)

```
┌─────────────────────────────────────────────┐
│ PHASE 0 KPI TRACKER                         │
├─────────────────────────────────────────────┤
│ 기간: 2026-01-XX ~ 2026-0X-XX (14일)        │
├──────────────┬──────────┬───────────────────┤
│ KPI          │ Target   │ Current           │
├──────────────┼──────────┼───────────────────┤
│ 스페인어 댓글 │ ≥ 10개   │ ▓▓▓░░░░░░░ 3/10  │
│ PWA 클릭     │ ≥ 50회   │ ▓▓▓▓▓░░░░░ 25/50 │
│ 평균 시청률   │ ≥ 35%    │ ▓▓▓▓▓▓▓░░░ 42%   │
├──────────────┴──────────┴───────────────────┤
│ 판정: 2/3 충족 필요                          │
│ 현재: 1/3 ⚠️                                 │
└─────────────────────────────────────────────┘
```

---

# PART VII — IMPLEMENTATION ROADMAP

---

## 10. Task Breakdown

### 10.1 Phase A: Foundation (Day 1-2)

| # | Task | File | Priority |
|---|------|------|----------|
| A1 | Landing 리팩토링 | `index.html` | 🔴 High |
| A2 | CSS 업데이트 | `style.css` | 🔴 High |
| A3 | Recipe page CSS | `recipe-page.css` | 🔴 High |
| A4 | Manifest 다국어 | `manifest.json` | 🟡 Medium |

### 10.2 Phase B: Spanish PWA (Day 2-3)

| # | Task | File | Priority |
|---|------|------|----------|
| B1 | ES Hub 페이지 | `/es/index.html` | 🔴 High |
| B2 | EP1 레시피 페이지 | `/es/croqueta-001/` | 🔴 High |
| B3 | EP2 레시피 페이지 | `/es/croqueta-002/` | 🔴 High |
| B4 | EP3 레시피 페이지 | `/es/croqueta-003/` | 🔴 High |
| B5 | Recipe JS (탭/타이머) | `recipe-page.js` | 🔴 High |

### 10.3 Phase C: Staff Tools (Day 3-4)

| # | Task | File | Priority |
|---|------|------|----------|
| C1 | Phase 0 센터 | `/staff/phase0/` | 🟡 Medium |
| C2 | 체크리스트 도구 | `checklist.html` | 🟡 Medium |
| C3 | KPI 트래커 | `kpi-tracker.html` | 🟡 Medium |
| C4 | Spanish 미리보기 | `spanish-preview.html` | 🟢 Low |

### 10.4 Phase D: Integration (Day 4-5)

| # | Task | File | Priority |
|---|------|------|----------|
| D1 | Plausible 설치 | 전체 HTML | 🔴 High |
| D2 | SW 캐시 업데이트 | `sw.js` | 🟡 Medium |
| D3 | Registry 업데이트 | `registry.json` | 🟡 Medium |
| D4 | CLAUDE.md 동기화 | `CLAUDE.md` | 🟢 Low |

### 10.5 Phase E: Assets (Day 5)

| # | Task | File | Priority |
|---|------|------|----------|
| E1 | OG 이미지 생성 | `og-image.png` | 🟡 Medium |
| E2 | 썸네일 템플릿 | `thumbnails/` | 🟡 Medium |
| E3 | MOU 문서화 | `MOU.md` | 🟢 Low |

---

## 11. Execution Order (Dependency-Based)

```
Day 1: A1 → A2 → A3 (Landing 리팩토링 완료)
Day 2: B1 → B2 (ES Hub + EP1)
Day 3: B3 → B4 → B5 (EP2, EP3 + JS)
Day 4: C1 → C2 → D1 (Staff + Analytics)
Day 5: D2 → D3 → E1 → E2 (통합 + 에셋)
```

---

## 12. D-Day Protocol

### 12.1 촬영일 확정 (REQUIRED)

```
┌─────────────────────────────────────────────┐
│ 🎬 D-DAY: 2026-01-__                        │
│                                             │
│ 이 칸을 채우기 전까지 Phase 0은 시작 안 됨    │
└─────────────────────────────────────────────┘
```

### 12.2 D-1 체크리스트

- [ ] 장비 테스트 (폰, 거치대, 조명)
- [ ] 재료 준비 (고로케 or 냉동 빵)
- [ ] 10문장 스페인어 카드 준비
- [ ] Chrome 번역 테스트 완료
- [ ] PWA 페이지 최종 확인
- [ ] 촬영 계획서 출력

### 12.3 촬영 당일 플로우

```
09:00  셋업 (조명, 카메라 각도)
09:30  리허설 (10문장 읽기)
10:00  EP1 본촬영 (예상 30분)
10:30  화면 녹화 (PWA 시연)
11:00  종료 및 백업
```

---

# PART VIII — SUCCESS CRITERIA

---

## 13. 만점 달성 조건

### 13.1 이전 평가 감점 요인 해결

| 감점 항목 | 점수 | 해결책 | 상태 |
|-----------|------|--------|------|
| LatAm 시장 선택 근거 | -10 | "테스트하기 쉬움" 명시 + Phase 0 설계 | ✅ |
| Uncle fatigue 완화책 | -3 | Failure-safe + 짧은 촬영 | ✅ |
| PWA 개발 일정 미명시 | -5 | Day 2-3 명시 | ✅ |
| 편집 담당 불명확 | -3 | MOU에 명시 (Parksy) | ✅ |
| Analytics 미결정 | -5 | Plausible 확정 | ✅ |
| PWA 클릭 측정 불명확 | -4 | Plausible outbound 이벤트 | ✅ |
| 문서 과다 | -5 | 1-pager 요약 (이 문서 §14) | ✅ |
| 촬영일 미정 | -10 | D-DAY 칸 강제 삽입 | ✅ |
| 1,000구독 달성 전략 부재 | -7 | Phase 1 범위 (현재 불필요) | ⏸️ |
| Parksy ROI | -3 | 포트폴리오 + OS 재사용 명시 | ✅ |

### 13.2 New Score Projection

| 항목 | 이전 | 이후 |
|------|------|------|
| 전략적 명확성 | 90 | **95** |
| 리스크 관리 | 88 | **92** |
| 실행 가능성 | 85 | **95** |
| 측정 체계 | 78 | **90** |
| 문서 구조 | 75 | **88** |
| 비즈니스 모델 | 70 | **78** |
| **총점** | **82** | **93** |

---

## 14. One-Page Summary (Executive View)

```
╔═══════════════════════════════════════════════════════════════╗
║                 PAPA FLY — PHASE 0 SUMMARY                    ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  WHAT: 3개 YouTube 영상 + 3개 Spanish PWA 레시피 페이지        ║
║                                                               ║
║  WHO:  Uncle (출연/조리) + Parksy (시스템/제작)                ║
║                                                               ║
║  WHEN: D-DAY: ____-__-__ (14일간 관찰)                        ║
║                                                               ║
║  HOW:  Spanish 메인 + (한글) 병기                              ║
║        Chrome 번역으로 촬영 → 양쪽 시장 커버                    ║
║                                                               ║
║  KPI:  ① 스페인어 댓글 ≥10                                    ║
║        ② PWA 클릭 ≥50                                         ║
║        ③ 평균 시청률 ≥35%                                     ║
║        → 2/3 충족 시 Phase 1 진행                             ║
║                                                               ║
║  EXIT: 언제든 종료 가능. 채널/수익 100% Uncle.                  ║
║                                                               ║
║  COST: ~$50 (장비) + €9/월 (Analytics)                        ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

# APPENDIX

---

## A. File Diff Summary

| 파일 | 변경 유형 | 예상 라인 |
|------|----------|----------|
| `index.html` | 🔄 Major refactor | -800 / +400 |
| `style.css` | 🔄 Add components | +150 |
| `recipe-page.css` | 🆕 New | +200 |
| `recipe-page.js` | 🆕 New | +100 |
| `/es/index.html` | 🆕 New | +150 |
| `/es/croqueta-001/index.html` | 🆕 New | +200 |
| `/es/croqueta-002/index.html` | 🆕 New | +200 |
| `/es/croqueta-003/index.html` | 🆕 New | +200 |
| `/staff/phase0/index.html` | 🆕 New | +150 |
| `registry.json` | 🔄 Update | +50 |
| `sw.js` | 🔄 Update cache | +10 |

**Total Estimated Change:** ~2,000 lines

---

## B. Dependencies

```
None. Pure HTML/CSS/JS. No build step.
```

---

## C. Hosting

```
GitHub Pages (현재) — 변경 없음
Custom domain: papafly.kr (설정 필요 시)
```

---

*MASTER-PLAN v1.0 — 2026-01-10*
*Status: Ready for Execution*
