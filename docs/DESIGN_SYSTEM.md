# PAPAFLY Design System & Development Log

> 마지막 업데이트: 2026-01-15

---

## 🎯 USER INPUT DASHBOARD

### 반드시 유저가 제공해야 하는 변수들

| 변수 | 현재 값 | 설명 |
|------|---------|------|
| **Brand Name** | PAPAFLY | 브랜드명 |
| **Slogan** | Real Money, Real World | 핵심 메시지 |
| **Primary Color** | #D4AF37 (Gold) | 메인 컬러 |
| **Background Color** | #040806 (Dark Green-Black) | 배경 컬러 |
| **Hero Video** | YouTube 2FaUlNhuvTA (기차) | 메인 영상 |
| **Profile Image** | profile.jpg | 대표 이미지 |
| **Unique Concept** | 히브리어 배경 텍스처 | 차별화 요소 |
| **UI Metaphor** | 명함 카드 | UX 콘셉트 |
| **Tagline** | Built on Gold. Measured in Silver. | 서브 메시지 |
| **EST. Date** | 2026.01.13 | 설립일 |

---

## 🔧 BOILERPLATE (재사용 가능)

### 코드로 해결되는 것들
- 레이아웃 구조 (container, grid)
- 애니메이션 시스템 (keyframes, transitions)
- 호버/포커스 효과
- 반응형 브레이크포인트
- 그림자/글로우 시스템
- 타이포그래피 스케일
- 간격(spacing) 토큰

---

## 📋 DEVELOPMENT LOG

### 2026-01-15 - 프로 마감 업그레이드

#### 1차 작업: 기본 리파인
- Inter 폰트 추가
- CSS 변수 시스템 확장
- 이모지 → SVG 아이콘 전환

#### 2차 작업: REAL 프로 마감
```
[배경]
✓ Ambient gradient 추가 (골드/그린 글로우, 움직임)
✓ 노이즈 텍스처 오버레이 (필름 그레인)
✓ body::before / body::after 활용

[헤더]
✓ 타이틀 사이즈 32px → 48px
✓ 골드 펄스 글로우 애니메이션
✓ 장식용 수직 골드 라인

[명함 카드]
✓ floatCard 애니메이션 (6초 주기 플로팅)
✓ 호버 시 12px 상승 + 3D rotateX(3deg)
✓ 3겹 배경 그라데이션 레이어
✓ 프로필 hover 시 scale(1.1) + 글로우 강화
✓ 골드 라인 shimmer 애니메이션

[전체]
✓ 그림자 깊이 강화 (shadow-lg: 20px → 60px)
✓ 간격 확대 (space-3xl: 64px → 100px)
✓ 모든 transition에 커스텀 이징 적용
```

---

## 🎨 CSS VARIABLES

### Colors
```css
--bg: #040806;
--bg-elevated: #0a110d;
--bg-card: #0e1812;
--gold: #D4AF37;
--gold-light: #E8C547;
--gold-pale: #F4E4A6;
--text: #FAFAF8;
--text-secondary: rgba(250,250,248,.7);
--text-muted: rgba(250,250,248,.45);
```

### Spacing
```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 40px;
--space-2xl: 64px;
--space-3xl: 100px;
```

### Typography
```css
--text-xs: 10px;
--text-sm: 12px;
--text-base: 14px;
--text-lg: 16px;
--text-xl: 20px;
--text-2xl: 26px;
--text-3xl: 36px;
--text-4xl: 48px;
```

### Animation
```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--duration-fast: 150ms;
--duration-base: 300ms;
--duration-slow: 500ms;
```

---

## 📁 FILE STRUCTURE

```
papafly/
├── index.html          # 메인 (모든 CSS 인라인)
├── assets/
│   ├── manifest.json   # PWA 설정
│   ├── 1.jpg          # PAPAFLY 코인 아이콘
│   └── icons/
│       ├── profile.jpg
│       └── logo.jpg
├── docs/
│   ├── whitepaper.html # 인터랙티브 백서
│   ├── whitepaper.md   # 백서 마크다운
│   └── DESIGN_SYSTEM.md # ← 이 파일
└── staff/
    └── index.html      # 스태프 포털
```

---

## ✅ CHECKLIST: 새 프로젝트 시작 시

```
[ ] Brand Name 정하기
[ ] Primary Color 정하기
[ ] Background Color 정하기
[ ] Slogan/Tagline 정하기
[ ] Hero 영상 또는 이미지 준비
[ ] Profile/Logo 이미지 준비
[ ] 고유 콘셉트 아이디어 (차별화 요소)
[ ] UI 메타포 결정 (명함? 대시보드? 카드?)
```

**위 항목들은 AI가 대신할 수 없음. 반드시 유저가 결정해야 함.**

---

## 🔗 LINKS

- **Live:** https://dtslib1979.github.io/papafly/
- **Repo:** https://github.com/dtslib1979/papafly
- **PR:** https://github.com/dtslib1979/papafly/compare/main...claude/review-exit-transfer-code-bZ2oR
