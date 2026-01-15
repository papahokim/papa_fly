# PAPAFLY 콘텐츠 복원 가이드

> papafly 구조 복제 후, 이 파일을 참고하여 papafly 고유 콘텐츠를 복원하세요.
> 생성일: 2026-01-16
> 백업 위치: ~/papafly-backup/

---

## 1. 핵심 브랜딩 정보

### 1.1 시스템 정의
```
시스템명: PAPA FLY
버전: 2.0
타입: Life & Food Rebooting OS
슬로건: "식은 빵도, 식은 꿈도 다시 날아오른다"
주인공: 64년생 제빵 장인
```

### 1.2 색상 토큰 (CSS 변수)
```css
--bg-deep: #1A1410       /* 다크 브라운 */
--bg-card: #2D2420       /* 카드 */
--highlight: #E8A54B     /* 골드 (Primary) */
--accent: #8B5A2B        /* 시나몬 */
--text-primary: #FFF8F0  /* 크림 */
```

### 1.3 가치 체계
| ID | 한국어 | Spanish | 설명 |
|----|--------|---------|------|
| craftsmanship | 장인정신 | Artesanía | 40년 노하우의 디지털 전환 |
| rebooting | 리부팅 | Renacimiento | 정년 후 삶의 재설계 |
| practicality | 실용성 | Practicidad | 누구나 따라할 수 있는 기술 |
| family | 가족 | Familia | 세대를 잇는 손맛의 전승 |

---

## 2. Driver 시스템

### 2.1 등록된 드라이버
| ID | 한국어 | Spanish | 상태 |
|----|--------|---------|------|
| AIR_FRYER | 에어프라이어 | Air Fryer | active |
| MICROWAVE | 전자레인지 | Microondas | active |
| PAN | 프라이팬 | Sartén | active |
| OVEN | 오븐 | Horno | planned |
| TOASTER | 토스터 | Tostadora | planned |

### 2.2 Air Fryer 작업 목록
| ID | 한국어 | Spanish | 온도 | 시간 | 팁 |
|----|--------|---------|------|------|-----|
| REHEAT_CROQUETTE | 고로케/튀김빵 | Croqueta | 180°C | 5분 | spray: true |
| REHEAT_CROISSANT | 크루아상 | Croissant | 160°C | 3분 | crisp: high |
| REHEAT_BREAD | 식빵/토스트 | Pan | 170°C | 2분 | butter: optional |
| REHEAT_BAGUETTE | 바게트 | Baguette | 180°C | 4분 | water: spray |

---

## 3. 레시피 콘텐츠

### 3.1 레시피 목록
| ID | 이름 | 언어 | 경로 |
|----|------|------|------|
| croquette-classic | 클래식 고로케 | ko | recipes/croquette-classic.json |
| croqueta-coreana-001 | Croqueta Coreana (EP1) | es | /es/croqueta-coreana-001/ |
| croqueta-coreana-002 | Microwave Rescue (EP2) | es | /es/croqueta-coreana-002/ |
| croqueta-coreana-003 | Pan de tu Abuela (EP3) | es | /es/croqueta-coreana-003/ |

### 3.2 레시피 상세 (croquette-classic.json)
```json
{
  "id": "croquette-classic",
  "name": "클래식 고로케",
  "version": "1.0",
  "category": "튀김빵",
  "description": "PAPA FLY 시그니처 프로그램",
  "drivers": {
    "AIR_FRYER": { "temp": 180, "time": 5, "tip": "기름 스프레이" },
    "OVEN": { "temp": 200, "time": 8, "tip": "예열 필수" }
  }
}
```

---

## 4. Phase 0 데이터

### 4.1 KPI 목표
| 지표 | 목표 | 현재 |
|------|------|------|
| 스페인어 댓글 | ≥10개 | 0 |
| PWA 클릭 | ≥50회 | 0 |
| 평균 시청률 | ≥35% | 0 |

### 4.2 킬스위치
```
2/3 KPI 충족 시 Phase 1 진행
관찰 기간: 14일
D-Day: 미정
```

---

## 5. 채널 정보

| 채널 | URL | 상태 |
|------|-----|------|
| YouTube | youtube.com/@papafly | planned |
| PWA | papafly.kr | active |

---

## 6. 복원할 파일 목록 (백업에서)

### 6.1 필수 복원 파일
```
~/papafly-backup/MASTER-PLAN.md          → 마스터 플랜
~/papafly-backup/CLAUDE.md               → 시스템 프로토콜
~/papafly-backup/data/registry.json      → 시스템 레지스트리
~/papafly-backup/data/notices.json       → 공지사항
~/papafly-backup/data/recipes/           → 레시피 데이터
~/papafly-backup/recovery/               → 문서 (WHITEPAPER, MOU 등)
```

### 6.2 Staff 도구 (복원 권장)
```
~/papafly-backup/staff/tools/content-factory/
~/papafly-backup/staff/tools/video-frame/
~/papafly-backup/staff/tools/decision-engine.html
~/papafly-backup/staff/tools/micro-bos.html
~/papafly-backup/staff/tools/recipe-manager.html
~/papafly-backup/staff/tools/content-planner.html
~/papafly-backup/staff/phase0/
~/papafly-backup/staff/meetings/
~/papafly-backup/staff/devlog/
~/papafly-backup/staff/projects/
```

### 6.3 Public 페이지
```
~/papafly-backup/pages/baguette-airfryer.html
~/papafly-backup/pages/croissant-airfryer.html
~/papafly-backup/pages/croqueta-airfryer.html
~/papafly-backup/apps/recipe-viewer/
~/papafly-backup/projects/quick-calc/
```

### 6.4 에셋
```
~/papafly-backup/assets/css/style.css
~/papafly-backup/assets/css/recipe-page.css
~/papafly-backup/assets/js/recipe-page.js
~/papafly-backup/assets/images/logo.png
~/papafly-backup/assets/manifest.json
```

---

## 7. 복원 명령어

### 7.1 전체 복원
```bash
# 백업에서 전체 복원
cp -r ~/papafly-backup/* ~/papafly/
```

### 7.2 선택적 복원
```bash
# 데이터만 복원
cp -r ~/papafly-backup/data/* ~/papafly/data/

# recovery 문서만 복원
cp -r ~/papafly-backup/recovery/* ~/papafly/recovery/

# staff 도구만 복원
cp -r ~/papafly-backup/staff/* ~/papafly/staff/
```

### 7.3 병합 복원 (papafly 구조 유지 + papafly 콘텐츠)
```bash
# 1. papafly 구조로 된 새 papafly에서
# 2. 아래 파일들을 백업에서 가져와 덮어쓰기

# 핵심 데이터
cp ~/papafly-backup/data/registry.json ~/papafly/config.json  # 병합 필요
cp -r ~/papafly-backup/data/recipes/ ~/papafly/data/

# 문서
mkdir -p ~/papafly/docs
cp ~/papafly-backup/MASTER-PLAN.md ~/papafly/docs/
cp -r ~/papafly-backup/recovery/*.md ~/papafly/docs/

# staff 도구 (papafly staff 구조에 추가)
cp ~/papafly-backup/staff/tools/*.html ~/papafly/staff/
```

---

## 8. 브랜딩 치환 가이드

papafly → papafly 복제 후 치환할 값:

| papafly 값 | papafly 값 |
|----------|------------|
| `GOHSY` / `PAPAFLY` | `PAPA FLY` |
| `gohsy.com` | `papafly.kr` |
| `gohsy@gohsy.com` | `papa@papafly.kr` |
| `dtslib1979.github.io/gohsy/` | `dtslib1979.github.io/papafly/` |
| `gohsy comes true` | `Life & Food Rebooting OS` |
| `Bluffing based editing` | `식은 빵도 다시 날아오른다` |
| `#D4AF37` (Gold) | `#E8A54B` (PAPA FLY Gold) |
| `#1A1410` (Dark) | `#1A1410` (동일) |

---

## 9. 주요 문서 원문 (인라인 백업)

### 9.1 README.md
```
# PAPA FLY
Life & Food Rebooting OS
```

### 9.2 robots.txt
```
User-agent: *
Allow: /

Sitemap: https://papafly.kr/sitemap.xml
```

---

*이 파일은 자동 생성되었습니다. 복원 작업 시 참고하세요.*
*백업 위치: ~/papafly-backup/*
*생성일: 2026-01-16*
