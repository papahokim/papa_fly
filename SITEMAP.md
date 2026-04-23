# PAPAFLY 사이트맵 — 전체 페이지 구조 (25개)

```
                        index.html
                     [랜딩 페이지 — 허브]
                          │
        ┌─────────┬───────┼───────┬─────────┬────────┐
        │         │       │       │         │        │
      BRAND    ARCHIVE CHANNELS SHOWROOM  STUDIO  STRATEGY
     (7개)     (3개)   (4개)   (1개)    (2개)   (2개)
                                              │
                                           DEVELOG
                                           (1개)
```

---

## PART 0 — BRAND (브랜드)

| # | 페이지 | 소스 | 상태 |
|---|--------|------|------|
| 01 | `/about/index.html` | whitepaper-masters-edition.md | ✅ |
| 02 | `/about/strategy.html` | whitepaper-strategy.md | ✅ |
| 03 | `/about/owner.html` | owner-profile-papafly.md | 🆕 |
| 04 | `/about/architecture.html` | review-sonnet-architecture-debate.md | 🆕 |
| 05 | `/brand/philosophy.html` | docs/design-philosophy.html (774행) | 🆕 |
| 06 | `/brand/design-system.html` | docs/DESIGN_SYSTEM.md (166행) | 🆕 |
| 07 | `/brand/whitepaper.html` | docs/whitepaper.md + whitepaper.html 통합 | 🆕 |

**index.html 연결:** 히어로 → `about/` · Biz Arch → `about/strategy.html`

---

## PART 1 — ARCHIVE (아카이브)

| # | 페이지 | 소스 | 상태 |
|---|--------|------|------|
| 08 | `/archive/index.html` | archive-analog-to-digital.md | ✅ |
| 09 | `/archive/pipeline-comfyui.html` | pipeline-comfyui-washing.md (152행) | 🆕 |
| 10 | `/archive/purchase-guardrails.html` | purchase-guardrails.md (146행) | 🆕 |

**index.html 연결:** MISSION 섹션 → `archive/`

---

## PART 2 — CHANNELS (4대 채널)

| # | 페이지 | 소스 | 상태 |
|---|--------|------|------|
| 11 | `/channels/monogatari.html` | 物語 — 발굴 스토리 + Lane A/B | ✅ |
| 12 | `/channels/shitate.html` | 仕立て — 상태·등급 + 확대경 | ✅ |
| 13 | `/channels/coordinate.html` | コーデ — 스타일링 + 태그필터 | ✅ |
| 14 | `/channels/mekiki.html` | 目利き — 감별·검수 + 체크리스트 | ✅ |

**index.html 연결:** 채널 그리드 → 각 채널 (링크 있음)

---

## PART 3 — SHOWROOM (쇼룸)

| # | 페이지 | 소스 | 상태 |
|---|--------|------|------|
| 15 | `/showroom/index.html` | catalog/products/PF-001~010 | 🔄 |

**index.html 연결:** 상품 그리드 → showroom

---

## PART 4 — STUDIO (스튜디오)

| # | 페이지 | 소스 | 상태 |
|---|--------|------|------|
| 16 | `/studio/index.html` | 기존 studio.html | 🔄 |
| 17 | `/project/index.html` | 기존 project.html | 🔄 |
| 18 | `/card/index.html` | card-implementation.md + 기존 | 🔄 |

---

## PART 5 — STRATEGY (전략)

| # | 페이지 | 소스 | 상태 |
|---|--------|------|------|
| 19 | `/strategy/session.html` | strategy-session-2026-03-05.md (153행) | 🆕 |
| 20 | `/strategy/refactoring.html` | PAPAFLY-COMMERCE-REFACTORING-PLAN.md (168행) | 🆕 |

---

## PART 6 — DEVELOG (개발 연대기)

| # | 페이지 | 소스 | 상태 |
|---|--------|------|------|
| 21 | `/devlog/index.html` | docs/devlog/ 5개 파일 통합 타임라인 | 🆕 |

---

## PART 7 — EXISTING (기존 업그레이드)

| # | 페이지 | 설명 | 상태 |
|---|--------|------|------|
| 22 | `/philosophy/index.html` | 철학 페이지 인터랙티브 업그레이드 | 🔄 |
| 23 | `/lite/index.html` | 라이트 버전 연결 | 🔄 |
| 24 | `/projects/quick-calc/index.html` | 퀵 계산기 연결 | 🔄 |

---

## BUILT-IN (index.html 내장)

| 섹션 | 설명 | 상태 |
|------|------|------|
| Discord 커뮤니티 | 공지 피드 + 온라인 접속자 수 | ✅ |
| YouTube 플레이리스트 | @dtslib-branch 파파플라이 영상 | ✅ |
| Business Architecture | 채널+커머스 슬롯 구조 | ✅ |
| 아날로그→디지털 미션 | COLLECT/DIGITIZE/TRANSLATE | ✅ |

---

## 요약

```
✅ 완료:   8개  (랜딩 + about 2개 + archive + 채널 4개)
🆕 신규:  10개  (owner/architecture/philosophy/design/whitepaper/
                 pipeline-comfyui/guardrails/session/refactoring/devlog)
🔄 업그레이드: 7개  (showroom/studio/project/card/philosophy/lite/quick-calc)
─────────────────────────────────────
총 25개 페이지 — 전부 GSAP + Tilt + Canvas + Scroll Reveal
```

index.html을 허브로 모든 페이지가 노드 연결. 각 페이지 상단 네비게이션 바에 모든 파트 링크 표시.
