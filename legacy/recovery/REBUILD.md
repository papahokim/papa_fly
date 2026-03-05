# papafly 복구 가이드 v1.0

> 이 문서는 papafly 전체 사이트를 0에서 다시 구축할 때 사용하는 인스트럭션이다.
> Claude Desktop 또는 Claude Code에 이 문서를 주고 "이대로 만들어줘"라고 하면 된다.

---

## 1. 프로젝트 개요

### 기본 정보
- **사이트명**: papafly.kr
- **컨셉**: 64세 제빵 장인의 라이프 & 푸드 리부팅
- **슬로건**: "식은 빵도, 식은 꿈도 다시 날아오른다"
- **핵심 콘텐츠**: 고로케(튀김빵) + 에어프라이어 리히팅 기술

### 기술 스택
- **호스팅**: GitHub Pages
- **도메인**: papafly.kr (예정)
- **프레임워크**: 순수 HTML/CSS/JS (정적 사이트)
- **데이터**: JSON 파일 기반
- **PWA**: Service Worker + Manifest

---

## 2. 폴더 구조

```
papafly/
├── index.html              # 메인 랜딩페이지
├── sw.js                   # Service Worker (PWA)
├── CLAUDE.md               # Claude 에이전트 프로토콜
│
├── assets/
│   ├── manifest.json       # PWA 설정
│   ├── css/style.css       # 공통 스타일
│   └── icons/
│
├── data/
│   ├── registry.json       # 전체 인덱스
│   ├── recipes/            # 레시피 JSON
│   └── content/            # 콘텐츠 JSON
│
├── staff/                  # 내부 포털 (비밀번호: 1208)
│   ├── index.html
│   └── tools/
│       ├── recipe-manager.html
│       └── content-planner.html
│
├── projects/
│   ├── quick-calc/         # 원가계산기
│   └── templates/
│
├── apps/
│   └── recipe-viewer/
│
└── recovery/
    ├── REBUILD.md          # 이 문서
    └── ORIGIN.md
```

---

## 3. 디자인 시스템

### 색상 (CSS Variables)
```css
:root {
  --bg: #1A1410;              /* 다크 브라운 */
  --bg-elevated: #2D2420;     /* 카드 배경 */
  --bg-card: #3D3430;         /* 밝은 카드 */
  --gold: #E8A54B;            /* 빵 황금색 */
  --accent: #8B5A2B;          /* 시나몬 */
  --text: #FFF8F0;            /* 크림색 */
}
```

### 컨셉 키워드
- 따뜻함, 장인정신, 가족, 리부팅
- 빵집의 아침, 오븐에서 나오는 황금빛
- 에어프라이어의 현대적 편리함

---

## 4. 핵심 페이지

### 메인 페이지 (`index.html`)
1. **Hero**: 로고 + "아버지의 손맛, 다시 날다"
2. **콘텐츠 캐러셀**: YouTube Shorts 슬롯
3. **시그니처 레시피**: 클래식 고로케
4. **에어프라이어 가이드**: 빵 종류별 리히팅 정보
5. **About**: 64년생 제빵 장인 스토리
6. **Footer**: Staff Only 링크

### Staff Portal (`staff/index.html`)
- 비밀번호: 1208
- Recipe Manager: 레시피 JSON 생성
- Content Planner: 콘텐츠 일정 관리
- 원가 계산기 링크

---

## 5. 데이터 스키마

### 레시피 (`data/recipes/{id}.json`)
```json
{
  "id": "croquette-classic",
  "name": "클래식 고로케",
  "category": "튀김빵",
  "description": "...",
  "ingredients": [...],
  "steps": [...],
  "reheat": { "temp": 180, "time": 5, "tip": "..." },
  "cost": { "ingredients": 9000, "margin": 0.3, "price": 17000 }
}
```

---

## 6. 복구 순서

1. GitHub 레포 생성 (dtslib1979/papafly)
2. 폴더 구조 생성
3. CLAUDE.md 작성
4. index.html 작성
5. PWA 파일 (manifest.json, sw.js)
6. Staff Portal
7. data/ 레이어
8. recovery/ 문서
9. Git push

---

*최초 작성: 2026-01-08*
