# PAPAFLY 레포지토리 분석 리포트
## 생성일: 2026-04-22

## 1. 프로젝트 개요

**기본 정보**
- 레포지토리: `papafly` (브랜치 패키지 P7)
- 상태: incubation (인큐베이션)
- 브랜치 ID: papafly
- 본사 레포: dtslib1979/dtslib-branch
- 공개 여부: private

**사이트 정보**
- 도메인: papafly.kr
- 컨셉: "재패니즈 패치 — 일본의 시간을 입다"
- 설명: 64세 한국 아저씨가 큐레이션하는 일본 빈티지 문화 쇼핑몰
- 설립일: 2026.03.05
- 테마 색상: #c4a35a (골드)

**비즈니스 모델**
- 플랫폼: Coupang Wing + YouTube 콘텐츠
- 수익 트랙: YouTube 콘텐츠, Coupang 직접 판매
- 소싱: 일본 플리마켓 중고품

## 2. 구현 상태

### ✅ 완료된 구현

**1. 기본 웹사이트 구조**
- 메인 페이지 (index.html) - 완전 구현
- 4개 채널 페이지 (物語, 仕立て, コーデ, 目利き)
- 쇼룸 페이지 (showroom/index.html)
- 스태프 포털 (staff/)
- 스튜디오 페이지 (studio/)
- 명함 페이지 (card/index.html)

**2. 디자인 시스템**
- CSS 토큰 시스템 완성 (tokens.css)
- 컴포넌트 라이브러리 (components.css)
- 반응형 디자인 구현
- 일본 전통 색상 팔레트 적용

**3. 데이터 구조**
- 카탈로그 시스템 (catalog/index.json, categories.json)
- 상품 데이터 모델 (PF-001 예시)
- 공유 데이터 (shared/data.json)
- 설정 파일 (config.json)

**4. 자바스크립트 기능**
- 카탈로그 동적 로드 (app.js)
- 카테고리 필터링
- 스크롤 리빌 애니메이션
- 상품 그리드 렌더링

**5. 파이프라인 설계**
- 콘텐츠 매트릭스 정의 (pipeline/content-matrix.json)
- 워크플로우 정의 (pipeline/flow.json)
- 템플릿 시스템 설계

### 🚧 부분 구현

**1. 카탈로그 시스템**
- 기본 구조는 있으나 상품 1개만 존재 (PF-001)
- 상품 상세 페이지 템플릿 준비됨
- 카테고리 필터 작동

**2. 채널 시스템**
- 4개 채널 페이지 구조는 있으나 콘텐츠 미비
- 각 채널별 디자인 차별화

**3. 관리 도구**
- 스태프 포털 기본 구조
- 콘텐츠 팩토리, 비디오 프레임 등 도구 페이지 존재
- 실제 기능 구현은 미비

### ❌ 미구현

**1. 상거래 기능**
- Coupang/Naver 연동 미구현
- 결제 시스템 없음
- 재고 관리 시스템 없음

**2. 콘텐츠 생성 파이프라인**
- 자동 HTML 렌더링 미구현
- YouTube 업로드 자동화 미구현
- PWA 화면 녹화 루프백 미구현

**3. 백엔드 기능**
- 인증 시스템 미구현
- 데이터 동기화 미구현
- API 엔드포인트 없음

## 3. 파일 구조

```
papafly/
├── index.html                    # 메인 페이지
├── config.json                   # 사이트 설정
├── CLAUDE.md                     # 에이전트 가이드
├── README.md                     # 기본 설명
├── assets/                       # 정적 자원
│   ├── css/
│   │   ├── tokens.css           # 디자인 토큰
│   │   ├── components.css       # 컴포넌트 스타일
│   │   ├── style.css           # 기본 스타일
│   │   └── recipe-page.css     # 레시피 페이지 스타일
│   ├── js/
│   │   └── app.js              # 메인 애플리케이션 로직
│   └── manifest.json           # PWA 매니페스트
├── catalog/                     # 상품 카탈로그
│   ├── index.json              # 상품 목록
│   ├── categories.json         # 카테고리 정의
│   ├── products/               # 상품별 데이터
│   └── style-db/               # 스타일 데이터베이스
├── channels/                    # 4개 콘텐츠 채널
│   ├── monogatari.html         # CH.01 物語 - 발굴 스토리
│   ├── shitate.html           # CH.02 仕立て - 복원/상태
│   ├── coordinate.html        # CH.03 コーデ - 코디네이션
│   └── mekiki.html            # CH.04 目利き - 감별/감정
├── core/                       # 코어 시스템
│   ├── auth/                  # 인증 모듈
│   ├── config/                # 설정 로더
│   ├── hq/                    # 본사 연동
│   ├── pr/                    # PR 인터페이스
│   ├── registry/              # 레지스트리
│   ├── storage/               # 스토리지
│   └── version.json           # 버전 정보
├── coupang/                   # 쿠팡 연동
│   └── templates/             # HTML 템플릿
├── data/                      # 데이터 파일
│   ├── notices.json          # 공지사항
│   └── registry.json         # 레지스트리
├── docs/                      # 문서
│   ├── DESIGN_SYSTEM.md      # 디자인 시스템
│   ├── PAPAFLY-COMMERCE-REFACTORING-PLAN.md  # 리팩토링 계획
│   └── devlog/               # 개발 일지
├── legacy/                    # 레거시 파일
├── pipeline/                  # 콘텐츠 파이프라인
│   ├── content-matrix.json   # 콘텐츠 매트릭스
│   └── flow.json             # 워크플로우
├── showroom/                  # 쇼룸
│   └── lookbook/             # 상품 룩북
├── staff/                     # 스태프 포털
│   ├── tools/                # 관리 도구
│   ├── devlog/               # 스태프 개발일지
│   └── meetings/             # 회의 기록
├── studio/                    # 스튜디오 페이지
├── tools/                     # 유틸리티 도구
└── shared/                    # 공유 데이터
    └── data.json             # 공통 데이터 (호야당 등)
```

## 4. 테마 및 디자인 시스템

### 디자인 철학
- **재패니즈 패치**: 일본 전통 미학과 빈티지 현대성의 결합
- **물성 중심**: 디지털보다 실물 콘텐츠에 집중
- **중년 남성 타겟**: 아메카지, 워크웨어 스타일

### 색상 팔레트
- **기본 배경**: #0d0b08 (墨 - Sumi 블랙)
- **표면**: #1a1510 (漆 - Urushi 래커 브라운)
- **강조색**: #c4a35a (金茶 - Kincha 골드티)
- **채널 색상**: 
  - CH1: #8b7355 (物語 - 고동)
  - CH2: #3d5a80 (仕立て - 인디고)
  - CH3: #6b8e23 (コーデ - 올리브)
  - CH4: #c4a35a (目利き - 골드)

### 타이포그래피
- **헤딩**: Noto Serif JP (일본 전통 서체)
- **본문**: Pretendard (현대 한국어 산세리프)
- **모노스페이스**: JetBrains Mono

### 레이아웃 원칙
- 모바일 퍼스트 반응형 디자인
- 그리드 기반 카드 레이아웃
- 미니멀한 네비게이션
- 히어로 섹션에 일본어 타이포그래피 강조

## 5. 기능 구성

### 1. 채널 시스템 (4채널)
1. **物語 (Monogatari)**: 발굴 스토리, 일본 문화 배경
2. **仕立て (Shitate)**: 소재, 상태, 복원, 경년변화
3. **コーデ (Coordinate)**: 중년 남성 아메카지, 워크웨어 코디
4. **目利き (Mekiki)**: 감정, 감별 교육, 진품 구별

### 2. 비즈니스 아키텍처
**콘텐츠 채널 (박씨)**
- YouTube 수익 (멤버십 + 제휴링크)
- 4개 채널별 전문 콘텐츠

**커머스 슬롯 (파트너)**
- A: 일본 현지 소싱
- B: 감별/진품 보증
- C: 일본→한국 국제물류
- D: 국내 배송/쿠팡 입고
- E: 큐레이터 프랜차이즈

### 3. 기술 스택
- 순수 정적 사이트 (HTML/CSS/JS)
- GitHub Pages 호스팅
- PWA (Progressive Web App) 지원
- JSON 기반 데이터 관리
- 파이프라인 자동화 설계

## 6. 파이프라인 및 자동화

### 콘텐츠 매트릭스
| 콘텐츠 타입 | 채널 | 플랫폼 | YouTube 템플릿 |
|------------|------|--------|---------------|
| photo_real | CH2_shitate | coupang, naver | sourcing-story |
| restoration | CH2_shitate | coupang | appraisal |
| story | CH1_monogatari | showroom | flea-market |
| appraisal | CH4_mekiki | showroom | appraisal |
| coordinate | CH3_coordinate | coupang, naver | coordinate |

### 워크플로우 (flow.json)
1. **상품 카드 로드**: catalog/products/*/card.json
2. **쿠팡 HTML 렌더**: coupang/templates/vintage.html
3. **네이버 HTML 렌더**: naver/templates/standard.html
4. **YouTube 콘텐츠 생성**: 5개 템플릿 활용
5. **카탈로그 갱신**: catalog/index.json 업데이트

### PWA 루프백
- 쇼룸 페이지 업데이트 시 PWA 화면 녹화
- YouTube 업로드 자동화 설계
- 템플릿: youtube/templates/pwa-screen.html

## 7. 미구현 항목 및 차기 과제

### 고우선순위 (P0)
1. **상품 카탈로그 확장**
   - 실제 상품 데이터 10개 이상 추가
   - 상품 상세 페이지 템플릿 완성
   - 이미지 업로드 시스템 구축

2. **콘텐츠 파이프라인 구현**
   - 자동 HTML 렌더링 스크립트 개발
   - YouTube 업로드 자동화 연동
   - PWA 화면 녹화 구현

3. **Coupang Wing 연동**
   - 실제 상품 등록 프로세스 구현
   - 주문 관리 시스템 설계
   - 재고 동기화 메커니즘

### 중우선순위 (P1)
1. **관리자 도구 완성**
   - 스태프 포털 인증 시스템
   - 콘텐츠 편집기 구현
   - 상품 관리 대시보드

2. **데이터 동기화**
   - 본사(dtslib-branch)와의 데이터 동기화
   - 실시간 업데이트 메커니즘
   - 백업/복구 시스템

3. **성능 최적화**
   - 이미지 레이지 로딩
   - CSS/JS 번들링
   - 캐싱 전략 구현

### 저우선순위 (P2)
1. **소셜 기능**
   - 댓글 시스템
   - 좋아요/북마크
   - 소셜 공유 최적화

2. **다국어 지원**
   - 일본어 번역
   - 영어 버전
   - 언어 전환 시스템

3. **고급 기능**
   - AR 가상 피팅
   - 3D 제품 뷰어
   - AI 기반 추천 시스템

## 8. 결론

PAPAFLY 레포지토리는 **잘 설계된 기반 구조**를 갖추고 있으나, **실제 콘텐츠와 상거래 기능이 부족**한 상태입니다.

### 강점
1. 체계적인 디자인 시스템과 일관된 브랜딩
2. 명확한 비즈니스 모델과 채널 구조
3. 확장 가능한 파이프라인 설계
4. 모바일 퍼스트의 현대적 웹 기술 스택

### 약점
1. 데모 데이터만 존재 (실제 상품 1개)
2. 자동화 파이프라인 미구현
3. 상거래 연동 기능 없음
4. 관리 도구 기능 미비

### 다음 단계 권장사항
1. **즉시 실행**: 상품 카탈로그에 실제 데이터 5-10개 추가
2. **단기 목표**: Coupang Wing 테스트 상품 등록 및 판매 프로세스 검증
3. **중기 목표**: 콘텐츠 파이프라인 자동화 구현 (HTML 렌더링 → YouTube 업로드)
4. **장기 목표**: 전체 커머스 플로우 자동화 및 파트너 슬롯 운영

레포지토리는 인큐베이션 단계로 실험과 빠른 반복이 가능한 상태입니다. 현재 구조를 바탕으로 실제 상품과 콘텐츠를 채워나가는 것이 최우선 과제입니다.

---
*분석 완료: 2026-04-22*
*분석자: Claude Code*
