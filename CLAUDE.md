# PAPAFLY 에이전트 프로토콜

> 이 문서는 Claude Code가 papafly 레포지토리에서 작업할 때 따라야 하는 가이드입니다.

---

## 1. 프로젝트 개요

### 목적
인큐베이션 프로젝트 - 실험적 기능 및 프로토타입 개발

### 기술 스택
- 순수 정적 사이트 (HTML/CSS/JS)
- GitHub Pages 호스팅
- 실험적 기술 적용 가능

### 핵심 가치
- 빠른 프로토타이핑
- 실험적 시도
- 실패 허용 (fail-fast)

---

## 2. HQ 연동

이 프로젝트는 **DTSLIB HQ**에서 관리됩니다.

| 항목 | 값 |
|------|-----|
| **본사 레포** | dtslib1979/dtslib-branch |
| **브랜치 ID** | papafly |
| **상태** | incubation |
| **공개** | private |
| **Tier** | canary (실험적 배포 우선) |

### HQ 브랜치 레지스트리
`dtslib-branch/hq/registry/branches.json`에서 이 프로젝트 설정 확인 가능

---

## 3. 폴더 구조

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
├── experiments/            # 실험적 기능
└── prototypes/             # 프로토타입
```

---

## 4. 커밋 컨벤션

```
feat: 새 기능 추가
fix: 버그 수정
docs: 문서 업데이트
exp: 실험적 기능
proto: 프로토타입
wip: 작업 중 (Work In Progress)
```

---

## 5. 작업 시 주의사항

1. 수정 전 반드시 `git pull` 실행
2. **인큐베이션 프로젝트** - 과감한 시도 허용
3. 실험 실패 시 롤백 용이하게 커밋 분리
4. **Private 레포** - 외부 노출 주의

---

## 6. 인큐베이션 특성

- **실험 허용**: 새로운 기술/아이디어 자유롭게 시도
- **빠른 반복**: 완벽보다 속도 우선
- **문서화**: 실험 결과 기록 권장
- **졸업 가능**: 성공 시 독립 프로젝트로 분리

---

## 7. 배포

- **호스팅**: GitHub Pages
- **도메인**: papafly.kr (예정)
- **자동배포**: main 브랜치 push 시
- **Tier**: canary (다른 브랜치보다 먼저 배포)

---

## 8. 홈 화면 바로가기 설정 (PWA 아님)

> **중요**: 이 프로젝트는 PWA 설치가 아닌 **브라우저 바로가기**만 지원한다.
> 브라우저 번역 기능, 주소창 등을 사용해야 하므로 서비스 워커 사용 금지.

### 필수 조건
- 서비스 워커(sw.js) **사용 안 함** - 있으면 삭제
- `display: "browser"` 필수 (standalone 아님)
- `start_url: "/"` (커스텀 도메인이면 /repo명/ 아님)

### manifest.json

위치: `assets/manifest.json`

```json
{
  "name": "PAPAFLY",
  "short_name": "PAPAFLY",
  "description": "PAPAFLY - Real Money, Real World",
  "start_url": "/",
  "display": "browser",
  "background_color": "#040806",
  "theme_color": "#D4AF37",
  "icons": [
    {
      "src": "icons/logo.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icons/logo.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### index.html에 추가

```html
<link rel="icon" href="./assets/icons/logo.png" />
<link rel="apple-touch-icon" href="./assets/icons/logo.png" />
<link rel="manifest" href="./assets/manifest.json" />
```

### 체크리스트

- [ ] `sw.js` 파일 없음 (있으면 삭제)
- [ ] `navigator.serviceWorker` 등록 코드 없음
- [ ] `display`가 `"browser"`인지 확인
- [ ] `start_url`이 `"/"`인지 확인 (커스텀 도메인 사용 시)
- [ ] 아이콘 파일 `assets/icons/logo.png` 존재

### 트러블슈팅

| 증상 | 원인 | 해결 |
|------|------|------|
| 404 에러 (예: /papafly/) | start_url이 잘못됨 | `start_url: "/"` 로 수정 |
| PWA 설치 프롬프트 뜸 | display가 standalone | `display: "browser"` 로 수정 |
| 번역 기능 안 됨 | PWA로 설치됨 | 바로가기 삭제 후 재추가 |
| 아이콘 안 나옴 | 경로 오류 | icons 경로 확인 |

---

*마지막 업데이트: 2026-01-21*
*소속: DTSLIB HQ*
