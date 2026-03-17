<!-- DTSLIB-LAW-PACK-START -->
---

## 헌법 제1조: 레포지토리는 소설이다

> **모든 레포지토리는 한 권의 소설책이다.**
> **커밋이 문장이고, 브랜치가 챕터이고, git log --reverse가 줄거리다.**

- 삽질, 실패, 방향 전환 전부 남긴다. squash로 뭉개지 않는다.
- 기능 구현 과정 = 플롯 (문제→시도→실패→전환→해결)
- 레포 서사 → 블로그/웹툰/방송 콘텐츠로 파생 (액자 구성)

---

## ⚙️ 헌법 제2조: 매트릭스 아키텍처

> **모든 레포지토리는 공장이다.**
> **가로축은 재무 원장(ERP)이고, 세로축은 제조 공정(FAB)이다.**

### 가로축: 재무 원장 (ERP 로직)

커밋은 전표다. 한번 기표하면 수정이 아니라 반대 분개로 정정한다.

| 회계 개념 | Git 대응 | 예시 |
|-----------|----------|------|
| 전표 (Journal Entry) | 커밋 | `feat: 새 기능 구현` |
| 원장 (General Ledger) | `git log --reverse` | 레포 전체 거래 이력 |
| 계정과목 (Account) | 디렉토리 | `tools/`, `scripts/`, `assets/` |
| 회계 인터페이스 | 크로스레포 동기화 | 명시적 스크립트/매니페스트 |
| 감사 추적 (Audit Trail) | Co-Authored-By | AI/Human 협업 기록 |

### 세로축: 제조 공정 (FAB 로직)

레포는 반도체 팹이다. 원자재(아이디어)가 들어와서 완제품(콘텐츠)이 나간다.

| 제조 개념 | 레포 대응 | 예시 |
|-----------|----------|------|
| BOM (자재 명세) | 의존성 + 에셋 목록 | `pubspec.yaml`, `package.json`, `assets/` |
| 라우팅 (공정 순서) | 파이프라인 스크립트 | 빌드→테스트→배포 순차 실행 |
| WIP (재공품) | 브랜치 + Queue | `claude/*` 브랜치, `_queue/` |
| 수율 (Yield) | 빌드 성공률 | CI 통과율, 테스트 커버리지 |
| MES (제조실행) | 자동화 스크립트 | 동기화, 추출, 배포 도구 |
| 검수 (QC) | 테스트 + 리뷰 | `tests/`, 체크리스트 |

### 4대 원칙

1. **삭제는 없다, 반대 분개만 있다** — `git revert`로 정정. `reset --hard` 금지.
2. **증빙 없는 거래는 없다** — 커밋 메시지에 이유와 맥락. 크로스레포 이동은 명시적 스크립트로.
3. **BOM 확인 후 착공한다** — 의존성/에셋 명세 먼저, 공정 순서 명시 후 실행.
4. **재공품을 방치하지 않는다** — WIP 브랜치와 큐는 정기적으로 소화한다.

---

### 특별법 제0조: 패러다임 전환 (2026-03-16)

> **전환 이유: Claude Code가 메인 드라이버다.**
> Claude Code는 에이전트다. 이 에이전트가 가장 잘 돌아가는 환경(WSL2)에 모든 걸 맞춘다.
> Windows 환경은 무시한다. WSL2 기준으로 모든 작업을 설계한다.

| | Before | After (지금) |
|---|---|---|
| 메인 기기 | 핸드폰 (Termux) | 집 PC (WSL2) |
| 보조 기기 | PC (원격 서버) | 핸드폰 (SSH 클라이언트) |
| 브라우저 자동화 | headless 우회, ADB 체인 | PC Chrome 직접 (Playwright headless=False) |
| 배치 작업 | 핸드폰 한 세션 | tmux 던져놓고 퇴근 |

### 죽은 패턴 (절대 부활 금지)
```
❌ headless Chromium 우회
❌ ADB 체인
❌ 핸드폰에서 CDP 흉내
❌ 세션 1개 제약 설계
```

### 현재 작업 표준
```
핸드폰 → Tailscale SSH → 집 PC WSL2 → Claude Code
텔레그램 봇 → tmux 배치 세션 (tg-image, tg-audio)
브라우저 자동화 → Windows Chrome Playwright headless=False
```

---

### 특별법 제1조: 플랫폼 자동화 도구 우선순위 (2026-03-17)

> **플랫폼 자동화 작업 시 Claude는 반드시 이 순서를 따른다. 임의로 스크립트 작성 금지.**

```
0순위: API / 터미널
  → 항상 먼저 확인. 되면 끝. 아래로 내려가지 않는다.

      ↓ API/터미널로 안 될 때만

1순위: Claude in Chrome (Chrome 확장)
  → GUI 클릭 필수 작업 (구글 콘솔, YouTube Studio, OAuth 등)
  → Claude가 브라우저 안에서 직접 보고 클릭. UI 변화 자동 적응.

2순위: Playwright MCP
  → Claude가 브라우저 외부에서 직접 조작

3순위: CDP/스크립트 (tools/ 경로)
  → 반복 배치. 사람 없이 야간 자동 실행.
```

**Claude 행동 규칙: 위 순서를 건너뛰고 스크립트를 먼저 짜는 것은 헌법 위반이다.**

---
<!-- DTSLIB-LAW-PACK-END -->

---

# PAPAFLY 에이전트 프로토콜 v3.1

---

## 헌법 제1조: 레포지토리는 소설이다

> **모든 레포지토리는 한 권의 소설책이다.**
> **커밋이 문장이고, 브랜치가 챕터이고, git log --reverse가 줄거리다.**

- 삽질, 실패, 방향 전환 전부 남긴다. squash로 뭉개지 않는다.
- 기능 구현 과정 = 플롯 (문제→시도→실패→전환→해결)
- 레포 서사 → 블로그/웹툰/방송 콘텐츠로 파생 (액자 구성)

### 서사 추출 명령

```bash
narrative-extract.py --repo .                    # 이 레포 줄거리
narrative-extract.py --repo . --format synopsis  # 시놉시스
narrative-extract.py --repo . --format blog      # 블로그 원고
narrative-extract.py --repo . --climax           # 전환점만
narrative-extract.py --all ~                     # 28개 레포 연작 인덱스
```

### 서사 분류

| 커밋 유형 | 서사 | 의미 |
|-----------|------|------|
| `feat:` / 기능 추가 | 시도 | 주인공이 무언가를 만든다 |
| `fix:` / 버그 수정 | 삽질 | 예상대로 안 됐다 |
| `migration` / 전환 | 전환 | 버리고 다른 길을 간다 |
| `rewrite` / v2 | 각성 | 처음부터 제대로 다시 한다 |
| `refactor:` | 성장 | 같은 일을 더 잘하게 됐다 |
| `docs:` | 정리 | 지나온 길을 돌아본다 |

---

## ⚙️ 헌법 제2조: 매트릭스 아키텍처

> **모든 레포지토리는 공장이다.**
> **가로축은 재무 원장(ERP)이고, 세로축은 제조 공정(FAB)이다.**

### 가로축: 재무 원장 (ERP 로직)

커밋은 전표다. 한번 기표하면 수정이 아니라 반대 분개로 정정한다.

| 회계 개념 | Git 대응 | 예시 |
|-----------|----------|------|
| 전표 (Journal Entry) | 커밋 | `feat: 새 기능 구현` |
| 원장 (General Ledger) | `git log --reverse` | 레포 전체 거래 이력 |
| 계정과목 (Account) | 디렉토리 | `tools/`, `scripts/`, `assets/` |
| 회계 인터페이스 | 크로스레포 동기화 | 명시적 스크립트/매니페스트 |
| 감사 추적 (Audit Trail) | Co-Authored-By | AI/Human 협업 기록 |

### 세로축: 제조 공정 (FAB 로직)

레포는 반도체 팹이다. 원자재(아이디어)가 들어와서 완제품(콘텐츠)이 나간다.

| 제조 개념 | 레포 대응 | 예시 |
|-----------|----------|------|
| BOM (자재 명세) | 의존성 + 에셋 목록 | `pubspec.yaml`, `package.json`, `assets/` |
| 라우팅 (공정 순서) | 파이프라인 스크립트 | 빌드→테스트→배포 순차 실행 |
| WIP (재공품) | 브랜치 + Queue | `claude/*` 브랜치, `_queue/` |
| 수율 (Yield) | 빌드 성공률 | CI 통과율, 테스트 커버리지 |
| MES (제조실행) | 자동화 스크립트 | 동기화, 추출, 배포 도구 |
| 검수 (QC) | 테스트 + 리뷰 | `tests/`, 체크리스트 |

### 4대 원칙

1. **삭제는 없다, 반대 분개만 있다** — `git revert`로 정정. `reset --hard` 금지.
2. **증빙 없는 거래는 없다** — 커밋 메시지에 이유와 맥락. 크로스레포 이동은 명시적 스크립트로.
3. **BOM 확인 후 착공한다** — 의존성/에셋 명세 먼저, 공정 순서 명시 후 실행.
4. **재공품을 방치하지 않는다** — WIP 브랜치와 큐는 정기적으로 소화한다.

### 교차점: JSON 매니페스트

가로축과 세로축이 만나는 곳에 JSON이 있다. 매니페스트는 공정 기록이자 거래 증빙이다.

```
app-meta.json      = 제품 사양서
state.json         = 공정 현황판
*.youtube.json     = 출하 전표
*-SOURCES.md       = 원자재 입고 대장
```

### Claude 자동 체크

| 트리거 | 체크 | 위반 시 |
|--------|------|---------|
| `git commit` 전 | 커밋 메시지에 이유/맥락 있는가 | "증빙 누락" 경고 |
| `reset --hard` 요청 | 반대 분개(revert) 가능한가 | 차단, revert 제안 |
| 새 파일/도구 추가 | BOM(package.json 등) 업데이트했는가 | "BOM 미갱신" 경고 |
| 세션 시작 | `git branch --no-merged main` WIP 확인 | 3개 이상이면 정리 권고 |
| 크로스레포 작업 | 동기화 스크립트/매니페스트 경유하는가 | "인터페이스 우회" 경고 |

> **코드를 짜는 게 아니라 공장을 돌리고 있다.**
> **다만 그 공장의 원장이 git이고, 라인이 파이프라인일 뿐이다.**

---


> 이 문서는 Claude Code가 papafly 레포지토리에서 작업할 때 따라야 하는 가이드입니다.

---

## 0. HQ–Node Governance (2026-02-13 확정)

**PapaFly = Center (HQ). 이 규칙은 변경 불가.**

1. **PapaFly is the only Center.** 모든 기준·구조·철학은 여기서 결정한다.
2. **Hoyadang 등 위성은 Satellite.** `shared/data.json`을 직접 수정하지 않는다.
3. **데이터 흐름은 단방향.** 현장→HQ (로그 수집), HQ→Node (배포). 양방향 편집 금지.
4. **철학·구조·AI 규칙은 PapaFly에만 존재한다.** Node에서 재정의하지 않는다.
5. **Node는 실행·기록·피드백한다.** 핵심을 재정의하지 않는다.

### shared/data.json
- 위치: `shared/data.json` (이 레포 루트)
- URL: `https://papafly.kr/shared/data.json`
- 내용: 연락처, YouTube ID, 도구 URL 등 공유 데이터
- **수정 권한: PapaFly(이 레포)에서만 수정**
- Satellite는 fetch로 읽기만 한다

---

## 1. Branch Identity (2-Axis System)

| 축 | 값 | 설명 |
|----|-----|------|
| **Governance** | `collaborator` | HQ와 강하게 연동. 구조/룰/업데이트 HQ 주도 |
| **Cognitive** | `creator` | 콘텐츠 중심. AI는 도우미. 출력=콘텐츠 |

### HQ Access 권한
```
✅ templates    - 페이지/컴포넌트 템플릿
✅ sync         - HQ 동기화 시스템
✅ broadcast    - 방송/강의 시스템
❌ claude-code  - (Creator 타입 - 불필요)
❌ sdk          - (Creator 타입 - 불필요)
```

### 캐릭터 프로필
- **본성**: 물성 중심 크리에이터
- **강점**: 사진, 실물 콘텐츠, 스튜디오 작업
- **전략**: 디지털보다 물성에 집중. 시스템은 HQ 위임.

---

## 2. 프로젝트 개요

### 목적
물성 스튜디오 - 사진/실물 기반 콘텐츠 플랫폼

### Focus 영역
- 물성 스튜디오
- 사진 콘텐츠
- 실물 프로덕트

### 기술 스택
- 순수 정적 사이트 (HTML/CSS/JS)
- GitHub Pages 호스팅

### 상태
- **Status**: incubation (인큐베이션)
- 빠른 프로토타이핑, 실험적 시도 허용

---

## 3. HQ 연동

이 프로젝트는 **DTSLIB HQ**에서 관리됩니다.

| 항목 | 값 |
|------|-----|
| **본사 레포** | dtslib1979/dtslib-branch |
| **브랜치 ID** | papafly |
| **상태** | incubation |
| **공개** | private |
| **레지스트리** | `hq/registry/branches.json` |

---

## 4. 폴더 구조

```
papafly/
├── index.html              # 메인 페이지
├── config.json             # 설정 파일
├── CLAUDE.md               # 이 문서
│
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
│
├── gallery/                # 사진 갤러리
├── studio/                 # 스튜디오 작업물
├── experiments/            # 실험적 기능
└── prototypes/             # 프로토타입
```

---

## 5. 커밋 컨벤션

```
feat: 새 기능 추가
fix: 버그 수정
docs: 문서 업데이트
style: 디자인 변경
photo: 사진/갤러리 관련
studio: 스튜디오 작업
exp: 실험적 기능
proto: 프로토타입
```

커밋 메시지 끝:
```
Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

---

## 6. Creator 타입 작업 가이드

### 핵심 원칙
> "물성이 먼저. 디지털은 전시 공간."

### AI 활용 방식
- 사진 설명/캡션 작성
- 갤러리 구조 제안
- 콘텐츠 아이디어 브레인스토밍
- 텍스트 보조

### 하지 않는 것
- 복잡한 코드 작업
- 자동화 시스템 구축
- SDK 개발

### 인큐베이션 특권
- 실험 허용: 새로운 시도 자유롭게
- 빠른 반복: 완벽보다 속도
- 실패 허용: fail-fast 원칙

---

## 7. 작업 시 주의사항

1. 수정 전 반드시 `git pull` 실행
2. **인큐베이션 프로젝트** - 과감한 시도 허용
3. 실험 실패 시 롤백 용이하게 커밋 분리
4. **Private 레포** - 외부 노출 주의

---

*Version: 3.0*
*Last Updated: 2026-01-26*
*Affiliation: DTSLIB HQ (Collaborator - Incubation)*
---

## Browser Runtime

> Parksy OS 2+2 매트릭스 — 이 레포 전담 브라우저

| 항목 | 값 |
|------|-----|
| **브라우저** | Naver Whale |
| **이유** | 인큐베이션 브랜치 — 사이드바 리서치 |
| **URL** | https://github.com/dtslib1979/papafly |


---

## ⚡ 전역 컨텍스트 — 반드시 읽어라 (2026-03-16 갱신)

> **세션 시작 시 이 블록을 먼저 읽는다. 모든 하위 조항보다 우선한다.**

### 패러다임 전환 (특별법 제0조)

| | Before | After (지금) |
|---|---|---|
| 메인 기기 | 핸드폰 (Termux) | 집 PC (WSL2) |
| 보조 기기 | PC (원격 서버) | 핸드폰 (SSH 클라이언트) |
| 브라우저 자동화 | headless 우회, ADB 체인 | PC Chrome 직접 (Playwright headless=False) |
| 배치 작업 | 핸드폰 한 세션 | tmux 던져놓고 퇴근 |

### 죽은 패턴 (절대 부활 금지)
```
❌ headless Chromium 우회
❌ ADB 체인
❌ 핸드폰에서 CDP 흉내
❌ 세션 1개 제약 설계
```

### 현재 작업 표준
```
핸드폰 → Tailscale SSH → 집 PC WSL2 → Claude Code
텔레그램 봇 → tmux 배치 세션 (tg-image, tg-audio)
브라우저 자동화 → Windows Chrome Playwright headless=False
```

### SCM 자동화 개발 시퀀스 (진행 중)
```
1. 텔레그램 봇        ✅ 완료 (2026-03-16)
2. 티스토리 자동화    🔄 진행 중 — Playwright headless=False
3. 네이버 자동화      ⏳ 대기 — login.cjs PC-native 교체
4. YouTube 자동화     ⏳ 대기 — Draft injection, OAuth 정상화
5. Google 자동화      ⏳ 대기
   ↓
6. APK 업데이트       ⏳ 대기
7. 워크센터 레포 정비 ⏳ 대기 (28개)
8. 양산               ⏳ 대기
```

### 지금 당장 막힌 것
- 티스토리 19개 블로그 스킨 삽입 미완료 (player.html)
- 티스토리 25슬롯 서브도메인 미확보
- 관련 스크립트: `C:\Temp\tistory_auto_v2.py`

---
