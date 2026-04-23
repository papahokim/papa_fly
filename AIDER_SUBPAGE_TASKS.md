# PAPAFLY 세부 페이지 확장 — Aider 작업지시서

**작성일:** 2026-04-24  
**작성자:** Claude Sonnet 4.6 (레포 전체 파싱 후 설계)  
**실행자:** DeepSeek Aider  
**목적:** 랜딩 페이지(index.html)에 이미 있는 섹션들을 세부 페이지로 연결·확장  

---

## 📋 작업 전 필독 — 레포 문서 구조 요약

Aider가 콘텐츠를 추출해야 할 핵심 소스 파일들:

| 파일 | 핵심 내용 |
|------|-----------|
| `docs/archive-analog-to-digital.md` | 아날로그→디지털 아카이브 프로토콜 (COLLECT→DIGITIZE→TRANSLATE 3단계) |
| `docs/whitepaper-masters-edition.md` | Lane A(아카이브)/Lane B(Authorized Edition) 듀얼 레인 구조 전체 |
| `docs/whitepaper-strategy.md` | 전략 요약 — 안목/세계관 커머스, 브리지 콘텐츠 문법 |
| `docs/owner-profile-papafly.md` | 오너 프로파일 — 61년생 CFO 베이커, 캐릭터 소개 문장 |
| `docs/whitepaper.md` | 메인 백서 |
| `docs/DESIGN_SYSTEM.md` | 디자인 시스템 (색상, 타이포, 컴포넌트) |
| `catalog/products/PF-001~010/card.json` | 실제 상품 10개 데이터 |
| `catalog/style-db/amekaji.json` | 아메카지 스타일 DB |
| `pipeline/content-matrix.json` | 콘텐츠 매트릭스 |
| `data/registry.json` | 레지스트리 |
| `shared/data.json` | 공유 설정 데이터 |

---

## 🎨 디자인 시스템 (모든 페이지 공통 적용)

`assets/css/components.css` 이미 있음. 모든 세부 페이지에서 다음을 사용:

```html
<link rel="stylesheet" href="../../assets/css/components.css">
```

CSS 변수 (추가 인라인 스타일 시 참고):
```css
--bg: #0d0b08
--surface: #13110e
--gold: #c4a35a
--vermillion: #c45a5a
--text: #e8e0d4
--text-muted: #8b7355
--text-dim: #5a5040
--border: #2a2318
--font-heading: 'Noto Serif JP', serif
--font-body: 'Pretendard', sans-serif
```

---

## TASK-01: `about/index.html` — 브랜드 소개 페이지 (신규 생성)

**위치:** `about/index.html`  
**링크:** index.html 히어로 하단에 `<a href="about/">브랜드 소개 →</a>` 추가

### 페이지 내용 구성

**소스:** `docs/whitepaper-masters-edition.md`, `docs/owner-profile-papafly.md`

#### 섹션 1 — 브랜드 한 줄 정의
```
PAPAFLY는 80–90년대 일본을 몸으로 겪은 61년생 전직 CFO 베이커와,
AI 네이티브 시스템 아키텍트가 함께 운영하는
일본 아날로그 아카이브 기반 라이프스타일 커머스입니다.
```

#### 섹션 2 — 오너 소개 카드
`docs/owner-profile-papafly.md` 5번 항목에서 추출:
```
1961년생. 롯데·대웅제약 CFO 출신. 현재 베이커리 운영.
클라리넷·스케치·사진 아마추어. 80년대 일본을 사랑했던 세대의 눈으로,
그때의 감각을 오늘의 삶에 다시 연결합니다.
```

#### 섹션 3 — 듀얼 레인 구조
`docs/whitepaper-masters-edition.md` 2번 항목에서 추출:
- **Lane A** — Archive: "팔지 않는 소장품, 세계관과 권위를 만든다"
- **Lane B** — Authorized Edition: "내 안목으로 고르고, 정식 통관·검수·판매"

#### 섹션 4 — 수익 구조 (선택적)
3개 수익 줄기 카드: ① 콘텐츠 수익 ② 커머스 수익 ③ 제휴/광고/콜라보

**커밋:** `feat: about/index.html — 브랜드 소개 페이지 (백서 기반)`

---

## TASK-02: `archive/index.html` — 아날로그 아카이브 페이지 (신규 생성)

**위치:** `archive/index.html`  
**링크:** index.html MISSION 섹션 하단에 `<a href="archive/">아카이브 전체 보기 →</a>` 추가

### 페이지 내용 구성

**소스:** `docs/archive-analog-to-digital.md` 전체

#### 섹션 1 — 헤더
```
ARCHIVE
아날로그 자산을 디지털로 보존한다
```
서브텍스트: "80–90년대 일본 버블기 잡지·화보·카탈로그를 수집·디지털화·해석해서 콘텐츠 소스 + 커머스 기획 엔진 + 세계관 증거로 재구성"

#### 섹션 2 — 타깃 자산 범위 (`docs/archive-analog-to-digital.md` 2번)
버블 시기 매체 유형 카드:
- 패션 잡지 (Popeye, BRUTUS, Begin, 메이지야 카탈로그)
- 인테리어/라이프스타일 잡지
- 브랜드/백화점 카탈로그
- 광고집

#### 섹션 3 — 3단계 프로토콜 (문서 3번~5번)
수평 타임라인 or 3열 카드:
1. **COLLECT** — 소스 채널, 획득 정책, 카탈로그 기록
2. **DIGITIZE** — 스캔 방식, 파일 구조, meta.json 스키마
3. **TRANSLATE** — 태그 체계, 활용 플래그 테이블

#### 섹션 4 — 활용 전략 (문서 6번)
- 아카이브 해설 영상 포맷 설명
- 브리지 콘텐츠 (빈티지 ↔ 현재 상품 연결) 설명

#### 섹션 5 — CTA
```html
<div style="text-align:center;margin-top:var(--space-2xl)">
  <p style="color:var(--text-dim);font-size:0.85rem">현재 아카이브 구축 중입니다. Discord 채널에서 소식을 먼저 받으세요.</p>
  <a href="https://discord.gg/papafly" class="btn-outline">Discord 참여 →</a>
</div>
```

**커밋:** `feat: archive/index.html — 아날로그 아카이브 프로토콜 페이지`

---

## TASK-03: 채널 세부 페이지 4개 확장

기존 파일: `channels/monogatari.html`, `shitate.html`, `coordinate.html`, `mekiki.html`  
현재 상태: 기본 틀만 있고 내용 없음 (확인 필요)

**소스:** `docs/whitepaper-masters-edition.md`, `docs/whitepaper-strategy.md`

### 각 채널 페이지에 추가할 공통 구조:

#### 1. 채널 정의 섹션
각 채널의 역할을 백서에서 추출:

| 채널 | 소스 내용 |
|------|-----------|
| `monogatari.html` (物語) | 브이로그·일상·착용기·일본 플리마켓 탐방·발굴 스토리 |
| `shitate.html` (仕立て) | 소재·상태·복원·관리법·경년변화 |
| `coordinate.html` (コーデ) | 중년 남성 아메카지·워크웨어 코디 제안 |
| `mekiki.html` (目利き) | 감정·감별·진품 검수·상태 등급 체계 |

#### 2. Lane A / Lane B 연결 설명
각 채널이 Lane A(세계관)와 Lane B(커머스)에 어떻게 기여하는지 짧게 설명

#### 3. "준비 중" 플레이스홀더 + Discord CTA
현재 콘텐츠 없는 채널은 준비 중 표시 + Discord 링크

**커밋:** `feat: channels/* — 4개 채널 페이지 백서 기반 내용 확장`

---

## TASK-04: `index.html` — 랜딩 페이지 섹션 연결 링크 추가

기존 섹션들에 세부 페이지 링크 추가:

### 4-1. MISSION 섹션 하단 (아카이브 페이지 링크)
```html
<div style="text-align:center;margin-top:var(--space-xl)">
  <a href="archive/" class="btn-outline">아카이브 전체 보기 →</a>
</div>
```

### 4-2. 채널 그리드 하단 (각 채널 이미 링크됨 — 확인만)
`channels/monogatari.html` 등 4개 링크 이미 있음. 페이지 내용만 채워지면 됨.

### 4-3. 히어로 하단 (브랜드 소개 링크)
tracks 아래에:
```html
<a href="about/" style="font-size:0.75rem;color:var(--text-dim);text-decoration:none;letter-spacing:0.1em;border-bottom:1px solid var(--border);padding-bottom:2px">브랜드 소개 →</a>
```

### 4-4. Business Architecture 섹션 하단 (전략 상세 링크)
```html
<a href="about/#lane-structure" class="btn-outline">듀얼 레인 구조 전체 보기 →</a>
```

**커밋:** `feat: index.html — 세부 페이지 연결 링크 추가`

---

## TASK-05: `about/strategy.html` — 전략 백서 공개 페이지 (선택)

**위치:** `about/strategy.html`  
**소스:** `docs/whitepaper-strategy.md` 전체

이 페이지는 `about/index.html`에서 내부 링크로 연결.

### 내용:
- 전략 방향 한 줄 요약 테이블
- 듀얼 레인 구조 상세
- 새 제품 vs 중고 역할 구분
- 수익 구조 3개 줄기
- 브리지 콘텐츠 형식 설명

**커밋:** `feat: about/strategy.html — 전략 백서 공개 페이지`

---

## 📌 실행 순서

```
TASK-04 먼저  → index.html 링크 추가 (가장 간단, 즉시 효과)
TASK-01       → about/index.html 브랜드 소개
TASK-02       → archive/index.html 아카이브 페이지
TASK-03       → channels 4개 확장
TASK-05       → about/strategy.html (선택)
```

---

## ⚠️ 주의사항

1. **CSS는 새로 쓰지 않는다** — `assets/css/components.css` + 인라인 스타일만
2. **JS는 최소화** — 정적 페이지가 원칙. 동적 기능 추가 금지
3. **이미지 경로** — 이미지 없으면 placeholder 텍스트로 대체. 빈 `<img>` 태그 금지
4. **링크 경로** — 상대 경로 사용. `href="../../assets/..."` 방식
5. **docs/ 문서를 그대로 붙여넣지 않는다** — 랜딩용 문장으로 재구성
6. **각 TASK마다 커밋** — 하나씩 완료 후 즉시 커밋
7. **git push origin main** — 각 TASK 커밋 후 push까지

---

## 검증 체크리스트

```bash
# TASK-04 완료 확인
grep "about/" index.html   # 브랜드 소개 링크
grep "archive/" index.html # 아카이브 링크

# TASK-01 완료 확인
cat about/index.html | grep "Lane A\|Lane B\|CFO"

# TASK-02 완료 확인  
cat archive/index.html | grep "COLLECT\|DIGITIZE\|TRANSLATE"

# TASK-03 완료 확인
cat channels/monogatari.html | grep "브이로그\|발굴"

# 전체 빌드 확인 (에러 없는지)
python3 -c "
import os
pages = ['index.html','about/index.html','archive/index.html',
         'channels/monogatari.html','channels/shitate.html']
for p in pages:
    path = f'/home/dtsli/papafly/{p}'
    print('OK' if os.path.exists(path) else 'MISSING', p)
"
```

---

*작성: Claude Sonnet 4.6*  
*레포 파싱 대상: 42개 .md + 30개 .json 전체*  
*연계 문서: docs/archive-analog-to-digital.md / docs/whitepaper-masters-edition.md / docs/whitepaper-strategy.md / docs/owner-profile-papafly.md*
