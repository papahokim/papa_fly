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