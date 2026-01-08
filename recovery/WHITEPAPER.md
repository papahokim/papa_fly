# PAPA FLY: Brand Architecture & Strategic Whitepaper

> Ver 1.0 | 2026. 01. 08 | Defined by System Architect

---

## 1. Executive Summary

본 프로젝트는 64세 제빵 장인의 노하우를 디지털 콘텐츠로 전환하는 **'라이프 & 푸드 리부팅(Rebooting)'** 프로젝트이다.

식어버린 고로케(튀김빵)를 에어프라이어로 되살리는 기술적 솔루션과, 정년 이후의 삶을 새롭게 비상(Fly)시키는 인문학적 가치를 결합한다.

### 핵심 전략
> **기능(Function)과 가치(Value)의 분리**

---

## 2. Brand Identity

### 2.1 Naming

| Element | Meaning |
|---------|---------|
| **PAPA** | 아버지, 64년생 제빵 장인 |
| **FLY** | 날다, 비상하다, 리부팅 |
| **PAPA FLY** | 아버지의 손맛이 다시 날아오르다 |

### 2.2 Tagline
```
"식은 빵도, 식은 꿈도 다시 날아오른다"
```

### 2.3 Metaphor Structure
```
식은 빵     →  에어프라이어  →  갓 구운 빵
(Cold Bread)   (Driver)       (Reheated)

식은 꿈     →  새로운 도구   →  리부팅된 삶
(Old Dream)    (New Method)   (Rebooted Life)
```

---

## 3. System Architecture

### 3.1 PAPA FLY as OS

PAPA FLY를 단순한 브랜드가 아닌 **운영체제(Operating System)**로 정의한다.

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
│  └─ 에어프라이어, 오븐, 토스터, 전자레인지    │
└─────────────────────────────────────────────┘
```

### 3.2 Layer Definitions

#### Value Layer (가치 계층)
- 불변의 브랜드 철학
- 콘텐츠의 감성적 기반
- 사용자와의 정서적 연결

#### Function Layer (기능 계층)
- 실용적 기능 모듈
- 레시피, 리히팅 가이드, 원가계산
- 데이터 기반 서비스

#### Driver Layer (드라이버 계층)
- 교체 가능한 도구 모듈
- 에어프라이어, 오븐, 토스터 등
- 확장성의 핵심

---

## 4. Driver System

### 4.1 Driver Concept

조리 도구를 **교체 가능한 드라이버(Driver)**로 모듈화한다.

하나의 레시피(프로그램)가 여러 드라이버에서 실행될 수 있으며, 각 드라이버별로 최적화된 파라미터를 제공한다.

### 4.2 Driver Registry

| Driver ID | Name | Category | Status |
|-----------|------|----------|--------|
| `AIR_FRYER` | 에어프라이어 | Primary | Active |
| `OVEN` | 오븐 | Secondary | Planned |
| `TOASTER` | 토스터 | Secondary | Planned |
| `MICROWAVE` | 전자레인지 | Tertiary | Planned |

### 4.3 Driver Extensibility

새로운 조리 도구가 등장하면 드라이버로 추가하여 기존 레시피에 호환성을 부여할 수 있다.

```javascript
// Example: Adding new driver
Driver.register({
  id: 'STEAM_OVEN',
  name: '스팀오븐',
  category: 'premium',
  operations: ['REHEAT', 'STEAM', 'BAKE']
});
```

---

## 5. Recipe as Program

### 5.1 Recipe Definition

레시피는 **실행 가능한 프로그램**으로 정의한다.

```javascript
Recipe.execute(driver: AIR_FRYER) → Output: 바삭한 고로케
Recipe.execute(driver: OVEN) → Output: 촉촉한 고로케
```

### 5.2 Multi-Driver Support

하나의 레시피가 여러 드라이버를 지원:

```json
{
  "id": "croquette-classic",
  "name": "클래식 고로케",
  "drivers": {
    "AIR_FRYER": { "temp": 180, "time": 5 },
    "OVEN": { "temp": 200, "time": 8 },
    "TOASTER": null
  }
}
```

`null`은 해당 드라이버가 이 레시피를 지원하지 않음을 의미.

---

## 6. Content Strategy

### 6.1 Content as Broadcast

콘텐츠는 **브로드캐스트 시그널**로 정의한다.

```javascript
Content.broadcast(platform: YOUTUBE_SHORTS) → 60s Video
Content.broadcast(platform: NAVER_BLOG) → Article
Content.broadcast(platform: INSTAGRAM) → Reel
```

### 6.2 Channel Matrix

| Channel | Role | Format | Frequency |
|---------|------|--------|-----------|
| YouTube Shorts | 주력 콘텐츠 | 60초 영상 | 주 3-5회 |
| YouTube Long | 심화 콘텐츠 | 5-10분 영상 | 주 1회 |
| Naver Blog | SEO/유입 | 텍스트+이미지 | 영상당 1회 |
| papafly.kr | 아카이브/허브 | Web App | 상시 |

### 6.3 60-Second Script Template

```
┌──────────────────────────────────────┐
│ HOOK (0-5초)                         │
│ 시청자의 관심을 끄는 첫 문장           │
│ "어제 산 고로케, 버리지 마세요!"       │
├──────────────────────────────────────┤
│ CONTENT (5-50초)                     │
│ 핵심 정보 전달                        │
│ "에어프라이어 180도 5분이면..."        │
├──────────────────────────────────────┤
│ CTA (50-60초)                        │
│ 행동 유도                             │
│ "구독하고 더 많은 꿀팁 받아가세요"     │
└──────────────────────────────────────┘
```

---

## 7. Value Proposition

### 7.1 Core Values

| Value | Description | Expression |
|-------|-------------|------------|
| 장인정신 | 40년 노하우의 디지털 전환 | 레시피, 기술 콘텐츠 |
| 리부팅 | 정년 후 삶의 재설계 | 브랜드 스토리 |
| 실용성 | 누구나 따라할 수 있는 기술 | 드라이버 가이드 |
| 가족 | 세대를 잇는 손맛의 전승 | 감성 콘텐츠 |

### 7.2 Target Audience

#### Primary
- 30-50대 주부/주부
- 에어프라이어 소유자
- 간편한 리히팅 방법을 찾는 사람

#### Secondary
- 시니어 크리에이터 지망생
- 정년 후 새로운 시작을 고민하는 사람
- 가족 스토리에 공감하는 사람

---

## 8. Technical Stack

### 8.1 Platform

| Component | Technology |
|-----------|------------|
| Hosting | GitHub Pages |
| Domain | papafly.kr (예정) |
| Frontend | Vanilla HTML/CSS/JS |
| Data | Static JSON |
| PWA | Service Worker + Manifest |

### 8.2 Design System

| Token | Value | Meaning |
|-------|-------|---------|
| `--bg-deep` | #1A1410 | 다크 브라운, OS Background |
| `--highlight` | #E8A54B | 골드, 갓 구운 빵의 황금빛 |
| `--accent` | #8B5A2B | 시나몬, 따뜻한 악센트 |
| `--text-primary` | #FFF8F0 | 크림, 빵 속살 |

---

## 9. Roadmap

### Phase 1: Foundation (Q1 2026)
- [x] 브랜드 아키텍처 정의
- [x] 웹사이트 프레임워크 구축
- [x] CLAUDE.md 시스템 프로토콜
- [ ] 아이콘/로고 디자인
- [ ] 도메인 연결

### Phase 2: Content (Q1-Q2 2026)
- [ ] YouTube 채널 개설
- [ ] 첫 번째 Shorts 시리즈 (리히팅 가이드)
- [ ] 레시피 라이브러리 10개 이상
- [ ] 네이버 블로그 연동

### Phase 3: Scale (Q2-Q3 2026)
- [ ] 드라이버 확장 (오븐, 토스터)
- [ ] 커뮤니티 레시피 제출 기능
- [ ] 에어프라이어 브랜드 제휴
- [ ] 다국어 지원 (영어, 일본어)

---

## 10. Appendix

### A. Glossary

| Term | Definition |
|------|------------|
| Driver | 조리 도구를 추상화한 모듈 |
| Recipe | 실행 가능한 레시피 프로그램 |
| Broadcast | 플랫폼별 콘텐츠 송출 |
| Reheat | 식은 음식을 되살리는 작업 |
| Rebooting | 삶/음식의 재시작 |

### B. References

- buddies.kr REBUILD_V2.md (시스템 구조 참조)
- papafly CLAUDE.md (시스템 프로토콜)

---

*PAPA FLY Whitepaper v1.0*
*© 2026 PAPA FLY. All rights reserved.*
