# CLAUDE.md — papafly 운영 에이전트 프로토콜

> 이 문서는 Claude가 papafly 프로젝트를 이해하고 협업하기 위한 컨텍스트 문서입니다.

---

## 프로젝트 개요

### 기본 정보
- **사이트명**: papafly.kr
- **컨셉**: 64세 제빵 장인의 라이프 & 푸드 리부팅
- **슬로건**: "식은 빵도, 식은 꿈도 다시 날아오른다"
- **핵심 콘텐츠**: 고로케(튀김빵) + 에어프라이어 리히팅 기술

### 브랜드 스토리
64년생 제빵 장인 아버지의 손맛을 현대적으로 재해석.
오래된 빵집의 레시피와 에어프라이어라는 현대 기술의 만남.
"다시 날아오르다(FLY)"라는 의미를 담은 리부팅 프로젝트.

---

## 기술 스택

- **호스팅**: GitHub Pages
- **도메인**: papafly.kr (예정)
- **프레임워크**: 순수 HTML/CSS/JS (정적 사이트)
- **데이터**: JSON 파일 기반
- **PWA**: Service Worker + Manifest

---

## 폴더 구조

```
papafly/
├── index.html              # 메인 랜딩
├── sw.js                   # Service Worker
├── CLAUDE.md               # 이 문서
├── assets/
│   ├── manifest.json       # PWA
│   ├── css/style.css       # 스타일
│   └── icons/
├── data/
│   ├── registry.json       # 전체 인덱스
│   ├── recipes/            # 레시피 JSON
│   └── content/            # 콘텐츠 JSON
├── staff/                  # 내부 포털 (비밀번호: 1208)
│   ├── index.html
│   └── tools/
│       ├── recipe-manager.html
│       └── content-planner.html
├── projects/
│   ├── quick-calc/         # 원가계산기
│   └── templates/
├── apps/
│   └── recipe-viewer/
└── recovery/
    ├── REBUILD.md
    └── ORIGIN.md
```

---

## 디자인 시스템

### 색상 팔레트
```css
:root {
  --bg: #1A1410;              /* 다크 브라운 */
  --bg-elevated: #2D2420;     /* 카드 배경 */
  --bg-card: #3D3430;         /* 밝은 카드 */
  --gold: #E8A54B;            /* 빵 황금색 */
  --accent: #8B5A2B;          /* 시나몬 */
  --text: #FFF8F0;            /* 크림색 */
  --text-secondary: rgba(255,248,240,.7);
  --text-muted: rgba(255,248,240,.5);
}
```

### 컨셉 키워드
- 따뜻함, 장인정신, 가족, 리부팅
- 빵집의 아침, 오븐에서 나오는 황금빛
- 에어프라이어의 현대적 편리함

---

## 에이전트 역할

Claude는 papafly 프로젝트에서 다음 역할을 수행합니다:

### 1. 레시피 콘텐츠 관리
- `data/recipes/` 폴더의 JSON 파일 생성/수정
- 레시피 포맷: 재료, 조리법, 에어프라이어 리히팅 가이드
- 원가 계산 데이터 관리

### 2. 영상 스크립트 자동화
- YouTube Shorts용 스크립트 템플릿 제공
- Hook → Content → CTA 구조
- 60초 이내 영상 구성

### 3. 에어프라이어 리히팅 가이드
- 빵 종류별 최적 온도/시간 데이터
- 식감 복원 팁
- 보관법 안내

### 4. 콘텐츠 플래닝
- `data/content/` 폴더의 콘텐츠 일정 관리
- 네이버/YouTube 채널별 콘텐츠 계획

---

## 데이터 스키마

### 레시피 (`data/recipes/{id}.json`)
```json
{
  "id": "croquette-basic",
  "name": "클래식 고로케",
  "category": "튀김빵",
  "description": "아버지의 시그니처 레시피",
  "ingredients": [
    { "name": "감자", "amount": "500g", "cost": 2000 },
    { "name": "다진 소고기", "amount": "200g", "cost": 4000 }
  ],
  "steps": [
    "감자를 삶아 으깬다",
    "다진 소고기를 볶는다"
  ],
  "reheat": {
    "device": "에어프라이어",
    "temp": 180,
    "time": 5,
    "tip": "바삭한 식감을 위해 기름 스프레이"
  },
  "cost": {
    "ingredients": 8000,
    "labor": 2000,
    "overhead": 1000,
    "total": 11000,
    "margin": 0.3,
    "price": 14300
  }
}
```

### 콘텐츠 플랜 (`data/content/{date}.json`)
```json
{
  "date": "2026-01-15",
  "platform": "youtube-shorts",
  "title": "24시간 지난 고로케 완벽 복원법",
  "script": {
    "hook": "어제 산 고로케, 버리지 마세요!",
    "content": "에어프라이어 180도 5분이면...",
    "cta": "구독하고 더 많은 꿀팁 받아가세요"
  },
  "status": "planned"
}
```

---

## Staff Portal 접근

- **URL**: `/staff/`
- **비밀번호**: 1208
- **기능**:
  - Recipe Manager: 레시피 등록/수정
  - Content Planner: 콘텐츠 일정 관리
  - 원가 계산기

---

## 자주 하는 작업

### 새 레시피 추가
```
data/recipes/에 새 JSON 파일 생성
registry.json의 recipes 배열에 추가
```

### 콘텐츠 계획 추가
```
data/content/에 날짜별 JSON 파일 생성
```

### 스타일 수정
```
assets/css/style.css 수정
```

---

## 연락처

- **운영**: papafly.kr
- **GitHub**: dtslib1979/papafly

---

*이 문서는 Claude 에이전트가 프로젝트를 이해하고 효과적으로 협업하기 위한 프로토콜입니다.*
