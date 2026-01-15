# CLAUDE.md — PAPA FLY System Protocol

> PAPA FLY Operating System v1.0
> 이 문서는 Claude 에이전트가 PAPA FLY 시스템을 이해하고 운영하기 위한 프로토콜입니다.

---

## 1. System Overview

### 1.1 Core Identity
```
PAPA FLY = Life & Food Rebooting OS
```

| 항목 | 정의 |
|------|------|
| **시스템명** | PAPA FLY |
| **버전** | 1.0 |
| **아키텍처** | Function-Value Separation |
| **코어** | 64년생 제빵 장인의 노하우 |
| **슬로건** | "식은 빵도, 식은 꿈도 다시 날아오른다" |

### 1.2 Architecture Philosophy

**핵심 전략: 기능(Function)과 가치(Value)의 분리**

```
┌─────────────────────────────────────────────┐
│              PAPA FLY OS                    │
├─────────────────────────────────────────────┤
│  Value Layer (가치 계층)                     │
│  └─ 장인정신, 가족, 리부팅, 비상              │
├─────────────────────────────────────────────┤
│  Function Layer (기능 계층)                  │
│  └─ 레시피, 리히팅, 원가계산, 콘텐츠          │
├─────────────────────────────────────────────┤
│  Driver Layer (드라이버 계층)                │
│  └─ 에어프라이어, 오븐, 토스터 ...           │
└─────────────────────────────────────────────┘
```

---

## 2. Driver System

### 2.1 Driver 개념
조리 도구를 **교체 가능한 드라이버(Driver)**로 모듈화.
하나의 레시피가 여러 드라이버에서 실행될 수 있음.

### 2.2 Registered Drivers

| Driver ID | Name | Category | Status |
|-----------|------|----------|--------|
| `AIR_FRYER` | 에어프라이어 | Primary | ✅ Active |
| `OVEN` | 오븐 | Secondary | 🔄 Planned |
| `TOASTER` | 토스터 | Secondary | 🔄 Planned |
| `MICROWAVE` | 전자레인지 | Tertiary | 🔄 Planned |

### 2.3 Driver Schema
```json
{
  "driver_id": "AIR_FRYER",
  "name": "에어프라이어",
  "category": "primary",
  "operations": [
    {
      "op": "REHEAT",
      "params": { "temp": "°C", "time": "min" }
    },
    {
      "op": "CRISP",
      "params": { "temp": "°C", "time": "min", "spray": "boolean" }
    }
  ]
}
```

---

## 3. Recipe System

### 3.1 Recipe as Program
레시피는 **실행 가능한 프로그램**으로 정의.
Driver를 지정하여 실행하면 결과물(음식)이 출력됨.

```
Recipe.execute(driver: AIR_FRYER) → Output: 바삭한 고로케
```

### 3.2 Recipe Schema
```json
{
  "id": "croquette-classic",
  "name": "클래식 고로케",
  "version": "1.0",
  "category": "튀김빵",
  "description": "PAPA FLY 시그니처 프로그램",

  "ingredients": [...],
  "steps": [...],

  "drivers": {
    "AIR_FRYER": { "temp": 180, "time": 5, "tip": "기름 스프레이" },
    "OVEN": { "temp": 200, "time": 8, "tip": "예열 필수" },
    "TOASTER": null
  },

  "cost": {
    "ingredients": 9000,
    "margin": 0.3,
    "price": 17000
  },

  "metadata": {
    "created": "2026-01-08",
    "author": "PAPA",
    "tags": ["signature", "튀김빵", "고로케"]
  }
}
```

---

## 4. Content System

### 4.1 Content as Broadcast
콘텐츠는 **브로드캐스트 시그널**로 정의.
플랫폼별로 포맷을 변환하여 송출.

```
Content.broadcast(platform: YOUTUBE_SHORTS) → 60s Video
Content.broadcast(platform: NAVER_BLOG) → Article
```

### 4.2 60-Second Script Template
```
┌──────────────────────────────────────┐
│ HOOK (0-5초)                         │
│ "어제 산 고로케, 버리지 마세요!"      │
├──────────────────────────────────────┤
│ CONTENT (5-50초)                     │
│ 에어프라이어 180도 5분이면...         │
├──────────────────────────────────────┤
│ CTA (50-60초)                        │
│ "구독하고 더 많은 꿀팁 받아가세요"    │
└──────────────────────────────────────┘
```

### 4.3 Channel Strategy

| Channel | Role | Format |
|---------|------|--------|
| YouTube | 영상 송출 | Shorts, Long-form |
| Naver | 유입/바이럴 | Blog, Cafe |
| papafly.kr | 아카이브/허브 | Web App |

---

## 5. Value Layer

### 5.1 Brand Story
```
주인공: 64년생 제빵 장인 (PAPA)
테마: 리부팅 (Rebooting)
메타포: 식은 빵 = 식은 꿈
솔루션: 에어프라이어 = 새로운 도구/방법론
결과: 다시 날아오르다 (FLY)
```

### 5.2 Value Proposition

| Value | Description |
|-------|-------------|
| **장인정신** | 40년 노하우의 디지털 전환 |
| **리부팅** | 정년 후 삶의 재설계 |
| **실용성** | 누구나 따라할 수 있는 기술 |
| **가족** | 세대를 잇는 손맛의 전승 |

---

## 6. System Operations

### 6.1 Agent Role
Claude는 PAPA FLY OS의 **시스템 운영자(Operator)**로서:

1. **Recipe CRUD**: 레시피 프로그램 생성/수정/삭제
2. **Driver Management**: 드라이버 정보 관리
3. **Content Planning**: 콘텐츠 브로드캐스트 스케줄링
4. **Cost Calculation**: 원가/마진 연산
5. **Documentation**: 시스템 문서 유지보수

### 6.2 File System
```
papafly/
├── index.html              # OS Landing
├── CLAUDE.md               # System Protocol (이 문서)
├── sw.js                   # Service Worker
│
├── assets/                 # Static Assets
│   ├── css/style.css       # Design System
│   └── manifest.json       # PWA Config
│
├── data/                   # Data Layer
│   ├── registry.json       # System Registry
│   ├── drivers/            # Driver Definitions
│   └── recipes/            # Recipe Programs
│
├── staff/                  # Control Panel
│   └── tools/
│       ├── recipe-manager.html
│       └── content-planner.html
│
├── projects/
│   └── quick-calc/         # Cost Calculator
│
├── apps/
│   └── recipe-viewer/      # Recipe Executor UI
│
└── recovery/
    ├── WHITEPAPER.md       # Brand Architecture
    ├── REBUILD.md          # Recovery Guide
    └── ORIGIN.md           # Origin Story
```

---

## 7. API Reference

### 7.1 Registry API
```javascript
// Get all recipes
fetch('/data/registry.json')
  .then(r => r.json())
  .then(data => data.recipes)

// Get recipe detail
fetch('/data/recipes/{id}.json')
  .then(r => r.json())
```

### 7.2 Driver API (Future)
```javascript
Driver.execute(recipe, params)
Driver.getCompatibleRecipes()
Driver.getOperations()
```

---

## 8. Design Tokens

### 8.1 Color System
```css
--bg-deep: #1A1410       /* 다크 브라운 (OS Background) */
--bg-card: #2D2420       /* 카드 (Module) */
--highlight: #E8A54B     /* 골드 (Primary Action) */
--accent: #8B5A2B        /* 시나몬 (Secondary) */
--text-primary: #FFF8F0  /* 크림 (Foreground) */
```

### 8.2 Semantic Meaning
| Color | System Meaning |
|-------|----------------|
| Gold (#E8A54B) | 갓 구운 빵의 황금빛, CTA |
| Brown (#1A1410) | 오래된 빵집의 나무, Background |
| Cream (#FFF8F0) | 빵 속살, Text |

---

## 9. Roadmap

### Phase 1: Foundation (Current)
- [x] OS Landing Page
- [x] Recipe System Schema
- [x] Staff Control Panel
- [x] PWA Setup

### Phase 2: Content
- [ ] YouTube Shorts 콘텐츠 제작
- [ ] 레시피 라이브러리 확장
- [ ] Driver별 가이드 페이지

### Phase 3: Scale
- [ ] 다국어 지원
- [ ] 커뮤니티 레시피 제출
- [ ] 제휴 (에어프라이어 브랜드)

---

*PAPA FLY OS v1.0 — System Protocol*
*Last Updated: 2026-01-08*
