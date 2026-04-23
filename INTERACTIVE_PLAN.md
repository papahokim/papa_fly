# PAPAFLY 인터랙티브 UI 전면 업그레이드 계획서
## 작성: Claude Sonnet 4.6 | 2026-04-23
## 목표: 일본 빈티지 감성 + 최고급 인터랙션. 방문자가 "와" 소리 나오게.
## 대상: DeepSeek Aider — 태스크 번호 순서대로. 완료 후 즉시 커밋.

---

## 디자인 철학

```
빈티지 아날로그 감성 + 디지털 하이테크 인터랙션의 충돌
→ "낡은 것들을 AI가 해석한다"는 PAPAFLY 컨셉 그대로
```

참조 레퍼런스 수준:
- awwwards.com 상위 사이트 인터랙션
- 일본 명품 브랜드 사이트 (Comme des Garçons, Neighborhood)
- 다크 럭셔리 e-commerce (Number Nine, Porter)

---

## 공통 라이브러리 (CDN — 설치 불필요)

모든 페이지 `<head>` 하단에 추가:
```html
<!-- GSAP 애니메이션 엔진 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<!-- Splitting.js — 텍스트 분해 -->
<script src="https://unpkg.com/splitting/dist/splitting.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/splitting/dist/splitting.css">
<!-- Vanilla-tilt — 3D 카드 틸트 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.1/vanilla-tilt.min.js"></script>
```

---

## ════════════════════════════════════
## GLOBAL — assets/js/interactive.js (신규)
## 전 페이지 공통 적용
## ════════════════════════════════════

### G-T01: interactive.js 생성 — 커스텀 커서
**파일**: `assets/js/interactive.js` (신규), 모든 HTML에 `<script src="../assets/js/interactive.js">` 추가

```javascript
// ── 커스텀 커서 ──────────────────────────────
// 기본 커서 숨기고 골드 점 + 링 커서로 교체
// body에 cursor:none 적용

const cursor = {
  dot:  null,
  ring: null,
  init() {
    document.body.style.cursor = 'none';

    this.dot = Object.assign(document.createElement('div'), { className: 'cursor-dot' });
    this.ring = Object.assign(document.createElement('div'), { className: 'cursor-ring' });
    document.body.append(this.dot, this.ring);

    let rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      gsap.set(this.dot, { x: e.clientX, y: e.clientY });
      gsap.to(this.ring, { duration: 0.15, x: e.clientX, y: e.clientY, ease: 'power2.out' });
    });

    // 링크/버튼 호버 시 커서 확대
    document.querySelectorAll('a, button, [data-cursor-expand]').forEach(el => {
      el.addEventListener('mouseenter', () => this.ring.classList.add('cursor-expand'));
      el.addEventListener('mouseleave', () => this.ring.classList.remove('cursor-expand'));
    });
  }
};

// CSS (assets/css/components.css에 추가):
/*
.cursor-dot {
  position: fixed; top: 0; left: 0; z-index: 9999; pointer-events: none;
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--gold); transform: translate(-50%, -50%);
  transition: background 0.2s;
}
.cursor-ring {
  position: fixed; top: 0; left: 0; z-index: 9998; pointer-events: none;
  width: 32px; height: 32px; border-radius: 50%;
  border: 1px solid var(--gold); transform: translate(-50%, -50%);
  opacity: 0.5; transition: width 0.3s, height 0.3s, opacity 0.3s;
}
.cursor-ring.cursor-expand { width: 56px; height: 56px; opacity: 0.8; }
*/
```

커밋: `feat: interactive.js 커스텀 골드 커서 — dot + ring`

---

### G-T02: 페이지 전환 트랜지션
**파일**: `assets/js/interactive.js` 추가, `assets/css/components.css` 추가

페이지 이동 시 검은 오버레이가 스윕하며 전환:
```javascript
// ── 페이지 트랜지션 ──────────────────────────
const pageTransition = {
  overlay: null,
  init() {
    this.overlay = Object.assign(document.createElement('div'), { className: 'page-overlay' });
    document.body.prepend(this.overlay);

    // 페이지 입장 — 오버레이 걷힘
    gsap.to(this.overlay, { duration: 0.8, scaleY: 0, transformOrigin: 'top', ease: 'power3.inOut' });

    // 링크 클릭 시 오버레이 덮고 이동
    document.querySelectorAll('a[href]:not([target])').forEach(a => {
      if (a.href.startsWith(location.origin)) {
        a.addEventListener('click', e => {
          e.preventDefault();
          const href = a.href;
          gsap.to(this.overlay, {
            duration: 0.6, scaleY: 1, transformOrigin: 'bottom',
            ease: 'power3.inOut',
            onComplete: () => location.href = href
          });
        });
      }
    });
  }
};

// CSS:
/*
.page-overlay {
  position: fixed; inset: 0; z-index: 10000; pointer-events: none;
  background: var(--bg); transform: scaleY(0); transform-origin: top;
}
*/
```

커밋: `feat: 페이지 전환 스윕 트랜지션 — GSAP scaleY`

---

### G-T03: 스크롤 진행 바
**파일**: `assets/js/interactive.js` 추가, `assets/css/components.css` 추가

```javascript
// ── 스크롤 진행 바 ────────────────────────────
const scrollBar = {
  init() {
    const bar = Object.assign(document.createElement('div'), { className: 'scroll-progress' });
    document.body.prepend(bar);
    window.addEventListener('scroll', () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      bar.style.width = pct + '%';
    });
  }
};

// CSS:
/*
.scroll-progress {
  position: fixed; top: 0; left: 0; z-index: 9997;
  height: 2px; background: var(--gold); width: 0%;
  transition: width 0.1s linear;
  box-shadow: 0 0 8px var(--gold);
}
*/
```

커밋: `feat: 골드 스크롤 진행 바 — 상단 고정`

---

### G-T04: 노이즈 그레인 오버레이
**파일**: `assets/css/components.css` 추가

아날로그 필름 느낌 grain 효과:
```css
/* CSS (body::after로 전역 적용) */
body::after {
  content: '';
  position: fixed; inset: 0; z-index: 9996; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  opacity: 0.035;
  animation: grain 0.5s steps(1) infinite;
}
@keyframes grain {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-2%, -3%); }
  30% { transform: translate(2%, 1%); }
  50% { transform: translate(-1%, 3%); }
  70% { transform: translate(3%, -2%); }
  90% { transform: translate(-3%, 1%); }
}
```

커밋: `feat: 필름 그레인 노이즈 오버레이 — 아날로그 감성`

---

### G-T05: 텍스트 글리치 효과
**파일**: `assets/css/components.css` 추가

PAPAFLY 로고 및 채널 타이틀에 적용:
```css
.glitch {
  position: relative;
  animation: glitch-base 4s infinite;
}
.glitch::before, .glitch::after {
  content: attr(data-text);
  position: absolute; inset: 0;
  clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
}
.glitch::before {
  color: var(--accent);
  animation: glitch-before 4s infinite;
  transform: translateX(-2px);
}
.glitch::after {
  color: var(--vermillion);
  clip-path: polygon(0 66%, 100% 66%, 100% 100%, 0 100%);
  animation: glitch-after 4s infinite;
  transform: translateX(2px);
}
@keyframes glitch-before {
  0%, 90%, 100% { transform: translateX(0); opacity: 0; }
  92% { transform: translateX(-3px); opacity: 0.8; }
  94% { transform: translateX(3px); opacity: 0; }
  96% { transform: translateX(-1px); opacity: 0.8; }
}
@keyframes glitch-after {
  0%, 90%, 100% { transform: translateX(0); opacity: 0; }
  93% { transform: translateX(3px); opacity: 0.8; }
  95% { transform: translateX(-3px); opacity: 0; }
  97% { transform: translateX(2px); opacity: 0.8; }
}
```

사용법: `<h1 class="glitch" data-text="PAPAFLY">PAPAFLY</h1>`

커밋: `feat: 글리치 효과 CSS — 로고 및 채널 타이틀 적용`

---

### G-T06: 스크롤 reveal 애니메이션 (GSAP ScrollTrigger)
**파일**: `assets/js/interactive.js` 추가

```javascript
// ── 스크롤 리빌 ──────────────────────────────
const scrollReveal = {
  init() {
    gsap.registerPlugin(ScrollTrigger);

    // fade-up: [data-reveal] 요소 전부
    gsap.utils.toArray('[data-reveal]').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
        }
      );
    });

    // 라인별 텍스트 분해 리빌: [data-reveal-lines]
    document.querySelectorAll('[data-reveal-lines]').forEach(el => {
      Splitting({ target: el, by: 'lines' });
      const lines = el.querySelectorAll('.line');
      gsap.fromTo(lines,
        { opacity: 0, y: '100%' },
        {
          opacity: 1, y: '0%', duration: 0.6, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%' }
        }
      );
    });
  }
};
```

HTML 사용법: 리빌할 요소에 `data-reveal` 또는 `data-reveal-lines` 속성만 붙이면 됨.

커밋: `feat: GSAP ScrollTrigger 스크롤 리빌 — fade-up + 라인별 텍스트`

---

## ════════════════════════════════════
## PAGE 1 — index.html 전용 인터랙션
## ════════════════════════════════════

### I1-T01: 히어로 — 파티클 배경
**파일**: `index.html` (script 추가)

금빛 먼지 입자가 떠다니는 캔버스 배경:
```javascript
// <canvas id="hero-canvas"> 히어로 섹션 뒤에 absolute 배치
const heroParticles = () => {
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.3,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    a: Math.random() * 0.6 + 0.2,
  }));

  const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(196, 163, 90, ${p.a})`;
      ctx.fill();
    });
    requestAnimationFrame(tick);
  };
  tick();
};
```

CSS:
```css
#hero-canvas {
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
}
.hero { position: relative; overflow: hidden; }
.hero-content { position: relative; z-index: 1; }
```

커밋: `feat: index.html 히어로 금빛 파티클 캔버스 배경`

---

### I1-T02: 히어로 — 타이핑 텍스트 효과
**파일**: `index.html`

서브타이틀이 타자기처럼 타이핑됨:
```javascript
const typewriter = (el, texts, speed = 80) => {
  let ti = 0, ci = 0, deleting = false;
  const tick = () => {
    const current = texts[ti];
    el.textContent = deleting ? current.slice(0, ci--) : current.slice(0, ci++);
    if (!deleting && ci > current.length) {
      setTimeout(() => { deleting = true; tick(); }, 2000);
      return;
    }
    if (deleting && ci < 0) {
      deleting = false; ti = (ti + 1) % texts.length; ci = 0;
    }
    setTimeout(tick, deleting ? speed / 2 : speed);
  };
  tick();
};

// 사용:
typewriter(document.querySelector('.hero-rotating-text'), [
  '80년대 도쿄의 감각',
  '일본의 시간을 입다',
  '64세 아저씨의 발굴 일지',
  '오기쿠보에서 온 물건들',
]);
```

HTML: `<p class="hero-rotating-text"></p>` 히어로 섹션 안에 추가.

커밋: `feat: index.html 히어로 타이핑 텍스트 로테이션`

---

### I1-T03: 채널 카드 — 3D 틸트 + 마그네틱 효과
**파일**: `index.html`

```javascript
// VanillaTilt 적용
VanillaTilt.init(document.querySelectorAll('.channel-card'), {
  max: 8,
  speed: 400,
  glare: true,
  'max-glare': 0.15,
  gyroscope: true,
});

// 마그네틱 버튼 효과
document.querySelectorAll('.channel-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
    gsap.to(card, { x, y, duration: 0.3, ease: 'power2.out' });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
  });
});
```

커밋: `feat: index.html 채널 카드 VanillaTilt 3D + 마그네틱 효과`

---

### I1-T04: 상품 카드 — 호버 이미지 줌 + 오버레이
**파일**: `index.html`, `assets/css/components.css`

```css
.product-card { overflow: hidden; position: relative; }
.product-card .card-img { transition: transform 0.6s var(--ease); }
.product-card:hover .card-img { transform: scale(1.08); }
.product-card .card-overlay {
  position: absolute; inset: 0; background: rgba(13,11,8,0.7);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity 0.3s;
}
.product-card:hover .card-overlay { opacity: 1; }
.card-overlay-text {
  color: var(--gold); font-size: 0.8rem; letter-spacing: 0.2em;
  border: 1px solid var(--gold); padding: 8px 20px;
  transform: translateY(8px); transition: transform 0.3s 0.1s;
}
.product-card:hover .card-overlay-text { transform: translateY(0); }
```

커밋: `feat: index.html 상품 카드 호버 줌 + 오버레이 CTA`

---

### I1-T05: 섹션 패럴랙스 스크롤
**파일**: `index.html`

```javascript
// 히어로 JP 텍스트 패럴랙스
gsap.to('.hero-jp', {
  yPercent: -30,
  ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
});

// 채널 섹션 타이틀 패럴랙스
gsap.to('.section-eye', {
  yPercent: -20,
  ease: 'none',
  scrollTrigger: { trigger: '.section', start: 'top bottom', end: 'bottom top', scrub: true }
});
```

커밋: `feat: index.html 히어로 + 섹션 패럴랙스 스크롤`

---

### I1-T06: 숫자 카운터 애니메이션
**파일**: `index.html`

비즈니스 아키텍처 섹션 통계 숫자가 올라오며 카운트:
```javascript
const animateCount = (el, target, duration = 1500) => {
  const start = performance.now();
  const tick = now => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    el.textContent = Math.floor(ease * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

// ScrollTrigger로 화면 진입 시 실행
document.querySelectorAll('[data-count]').forEach(el => {
  ScrollTrigger.create({
    trigger: el,
    start: 'top 80%',
    once: true,
    onEnter: () => animateCount(el, parseInt(el.dataset.count))
  });
});
```

HTML 사용법: `<span data-count="80">80</span>` (80년대 등 숫자에 적용)

커밋: `feat: index.html 숫자 카운터 ScrollTrigger 애니메이션`

---

## ════════════════════════════════════
## PAGE 2 — showroom/index.html 전용
## ════════════════════════════════════

### I2-T01: 상품 카드 스태거 진입 애니메이션
**파일**: `showroom/index.html`, `assets/js/app.js`

app.js가 카드를 렌더링한 후 GSAP 스태거 적용:
```javascript
// app.js renderProducts() 완료 후 호출
const animateCards = () => {
  gsap.fromTo('.product-card',
    { opacity: 0, y: 30, scale: 0.97 },
    { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out' }
  );
};
```

커밋: `feat: showroom 상품 카드 스태거 진입 애니메이션`

---

### I2-T02: 필터 — 부드러운 카드 필터링
**파일**: `showroom/index.html`

카테고리 변경 시 카드 fade+scale 전환:
```javascript
const filterCards = (cat) => {
  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => {
    const match = cat === 'all' || card.dataset.cat === cat;
    gsap.to(card, {
      opacity: match ? 1 : 0,
      scale: match ? 1 : 0.92,
      duration: 0.3,
      onComplete: () => card.style.display = match ? '' : 'none'
    });
  });
};
```

커밋: `feat: showroom 카테고리 필터 GSAP 애니메이션 전환`

---

### I2-T03: 상품 라이트박스 (풀스크린 이미지 뷰어)
**파일**: `showroom/index.html`, `assets/css/components.css`

카드 클릭 시 풀스크린 이미지 + 상품 정보:
```javascript
const lightbox = {
  el: null,
  init() {
    this.el = document.createElement('div');
    this.el.className = 'lightbox';
    this.el.innerHTML = `
      <div class="lb-backdrop"></div>
      <div class="lb-content">
        <button class="lb-close">✕</button>
        <div class="lb-img-wrap"><img class="lb-img" /></div>
        <div class="lb-info">
          <p class="lb-patch"></p>
          <h2 class="lb-name"></h2>
          <p class="lb-price"></p>
          <a class="lb-link">상세 보기 →</a>
        </div>
      </div>
    `;
    document.body.append(this.el);
    this.el.querySelector('.lb-close').onclick = () => this.close();
    this.el.querySelector('.lb-backdrop').onclick = () => this.close();
  },
  open(data) {
    this.el.querySelector('.lb-img').src = data.img;
    this.el.querySelector('.lb-patch').textContent = data.patch;
    this.el.querySelector('.lb-name').textContent = data.name;
    this.el.querySelector('.lb-price').textContent = data.price;
    this.el.querySelector('.lb-link').href = data.link;
    gsap.fromTo(this.el,
      { opacity: 0, display: 'flex' },
      { opacity: 1, duration: 0.3 }
    );
    gsap.fromTo(this.el.querySelector('.lb-content'),
      { scale: 0.9, y: 20 },
      { scale: 1, y: 0, duration: 0.4, ease: 'power3.out' }
    );
  },
  close() {
    gsap.to(this.el, { opacity: 0, duration: 0.2, onComplete: () => this.el.style.display = 'none' });
  }
};
```

CSS:
```css
.lightbox {
  display: none; position: fixed; inset: 0; z-index: 5000;
  align-items: center; justify-content: center;
}
.lb-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.85); }
.lb-content {
  position: relative; z-index: 1; display: flex; gap: 40px;
  max-width: 900px; width: 90%; background: var(--surface);
  border: 1px solid var(--border); padding: 40px;
}
.lb-close {
  position: absolute; top: 16px; right: 16px; background: none;
  border: none; color: var(--gold); font-size: 1.2rem; cursor: none;
}
.lb-img-wrap { width: 50%; }
.lb-img { width: 100%; aspect-ratio: 3/4; object-fit: cover; }
.lb-info { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 12px; }
.lb-patch { font-size: 0.7rem; color: var(--gold); letter-spacing: 0.2em; }
.lb-name { font-family: var(--font-heading); font-size: 1.2rem; }
.lb-price { font-size: 1.4rem; color: var(--vermillion); }
.lb-link { color: var(--gold); font-size: 0.85rem; letter-spacing: 0.1em; }
```

커밋: `feat: showroom 상품 라이트박스 풀스크린 뷰어`

---

## ════════════════════════════════════
## PAGE 3 — channels/monogatari.html 전용
## ════════════════════════════════════

### I3-T01: 스토리 아이템 — 타임라인 인터랙션
**파일**: `channels/monogatari.html`

스크롤 시 좌선이 위에서 아래로 그려지며 나타남:
```javascript
// .story-item의 border-left를 SVG line으로 교체하고 stroke-dashoffset 애니메이션
gsap.utils.toArray('.story-item').forEach((item, i) => {
  gsap.fromTo(item,
    { opacity: 0, x: -20 },
    {
      opacity: 1, x: 0, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: item, start: 'top 80%' }
    }
  );
});

// 좌선 그리기 효과
gsap.utils.toArray('.story-item').forEach(item => {
  gsap.fromTo(item,
    { borderLeftWidth: 0 },
    {
      borderLeftWidth: 2, duration: 0.4,
      scrollTrigger: { trigger: item, start: 'top 80%' }
    }
  );
});
```

커밋: `feat: monogatari 스토리 타임라인 스크롤 애니메이션`

---

### I3-T02: 발굴 스토리 — 호버 시 지도 팝업
**파일**: `channels/monogatari.html`

스토리 아이템 호버 시 소스 지역(도쿄 오기쿠보 등) 미니 지도 팝업:
```javascript
// 각 .story-item에 data-location 속성 (JSON에서 읽어옴)
// 호버 시 Google Maps Static API 이미지 팝업 (또는 지도 텍스트 팝업)
document.querySelectorAll('.story-item').forEach(item => {
  const tooltip = document.createElement('div');
  tooltip.className = 'location-tooltip';
  tooltip.textContent = '📍 ' + (item.dataset.location || '도쿄');
  item.append(tooltip);

  item.addEventListener('mouseenter', () => {
    gsap.fromTo(tooltip, { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.2 });
  });
  item.addEventListener('mouseleave', () => {
    gsap.to(tooltip, { opacity: 0, duration: 0.15 });
  });
});
```

CSS:
```css
.location-tooltip {
  position: absolute; right: 0; top: 0;
  background: var(--surface2); border: 1px solid var(--ch1);
  padding: 4px 10px; font-size: 0.75rem; color: var(--ch1);
  pointer-events: none; opacity: 0;
}
```

커밋: `feat: monogatari 스토리 호버 발굴 지역 툴팁`

---

## ════════════════════════════════════
## PAGE 4 — channels/shitate.html 전용
## ════════════════════════════════════

### I4-T01: 등급 도트 인터랙티브 시각화
**파일**: `channels/shitate.html`

등급(A/B/C/S)을 클릭하면 해당 등급 상품만 필터링 + 도트 강조:
```javascript
// 등급 범례 클릭 필터
document.querySelectorAll('.grade-item').forEach(item => {
  item.style.cursor = 'none';
  item.addEventListener('click', () => {
    const grade = item.dataset.grade;
    document.querySelectorAll('.grade-item').forEach(g => g.classList.remove('active'));
    item.classList.add('active');
    filterByGrade(grade); // catalog 카드 필터
  });
});
```

CSS:
```css
.grade-item { transition: all 0.2s; padding: 8px 16px; border: 1px solid transparent; border-radius: 2px; cursor: none; }
.grade-item.active { border-color: var(--ch2); color: var(--text); }
.grade-item strong { display: inline-block; width: 20px; height: 20px; border-radius: 50%; background: var(--ch2); color: var(--bg); text-align: center; line-height: 20px; font-size: 0.75rem; margin-right: 6px; }
```

커밋: `feat: shitate 등급 도트 클릭 필터 인터랙션`

---

### I4-T02: 상품 카드 — 소재 확대경 효과
**파일**: `channels/shitate.html`

카드 이미지에 마우스 올리면 돋보기 원이 따라다니며 이미지 확대:
```javascript
document.querySelectorAll('.product-card').forEach(card => {
  const img = card.querySelector('.card-img');
  if (!img) return;
  const lens = document.createElement('div');
  lens.className = 'magnifier-lens';
  card.style.position = 'relative';
  card.append(lens);

  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    lens.style.left = (x - 40) + 'px';
    lens.style.top  = (y - 40) + 'px';
    lens.style.backgroundPosition = `-${x * 1.5 - 40}px -${y * 1.5 - 40}px`;
    gsap.to(lens, { opacity: 1, scale: 1, duration: 0.2 });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(lens, { opacity: 0, scale: 0.8, duration: 0.2 });
  });
});
```

CSS:
```css
.magnifier-lens {
  position: absolute; width: 80px; height: 80px;
  border-radius: 50%; border: 2px solid var(--ch2);
  pointer-events: none; opacity: 0;
  background-repeat: no-repeat; background-size: 300%;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
}
```

커밋: `feat: shitate 상품 이미지 돋보기 확대경 효과`

---

## ════════════════════════════════════
## PAGE 5 — channels/coordinate.html 전용
## ════════════════════════════════════

### I5-T01: 코디 카드 — 아이템별 순차 등장
**파일**: `channels/coordinate.html`

카드 호버 시 리스트 아이템이 위에서 하나씩 등장:
```javascript
VanillaTilt.init(document.querySelectorAll('.coord-card'), {
  max: 6, speed: 300, glare: true, 'max-glare': 0.1
});

document.querySelectorAll('.coord-card').forEach(card => {
  const items = card.querySelectorAll('.coord-items li');
  card.addEventListener('mouseenter', () => {
    gsap.fromTo(items,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.06, ease: 'power2.out' }
    );
  });
});
```

커밋: `feat: coordinate 코디 카드 틸트 + 아이템 순차 등장`

---

### I5-T02: 코디 태그 — 클릭 하이라이트
**파일**: `channels/coordinate.html`

태그(amekaji, military 등) 클릭 시 해당 태그 코디만 강조:
```javascript
document.querySelectorAll('.coord-tag').forEach(tag => {
  tag.addEventListener('click', () => {
    const val = tag.dataset.tag;
    document.querySelectorAll('.coord-card').forEach(card => {
      const match = card.dataset.tags?.includes(val);
      gsap.to(card, { opacity: match ? 1 : 0.3, scale: match ? 1 : 0.97, duration: 0.3 });
    });
  });
});
```

CSS:
```css
.coord-tag {
  display: inline-block; font-size: 0.7rem; letter-spacing: 0.1em;
  border: 1px solid var(--ch3); color: var(--ch3); padding: 2px 8px;
  margin: 4px 2px; transition: all 0.2s; cursor: none;
}
.coord-tag:hover { background: var(--ch3); color: var(--bg); }
```

커밋: `feat: coordinate 태그 클릭 필터 하이라이트`

---

## ════════════════════════════════════
## PAGE 6 — channels/mekiki.html 전용
## ════════════════════════════════════

### I6-T01: 가이드 — 체크리스트 인터랙션
**파일**: `channels/mekiki.html`

체크 포인트 클릭 시 체크 표시 + 완료 카운트:
```javascript
document.querySelectorAll('.guide ul li').forEach(li => {
  li.style.cursor = 'none';
  li.addEventListener('click', () => {
    li.classList.toggle('checked');
    const guide = li.closest('.guide');
    const total = guide.querySelectorAll('li').length;
    const done  = guide.querySelectorAll('li.checked').length;
    let badge = guide.querySelector('.check-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'check-badge';
      guide.querySelector('h3').append(badge);
    }
    badge.textContent = `${done}/${total}`;
    if (done === total) {
      gsap.fromTo(guide, { borderLeftColor: 'var(--ch4)' }, { borderLeftColor: '#5fd068', duration: 0.5 });
    }
  });
});
```

CSS:
```css
.guide ul li.checked { text-decoration: line-through; color: var(--text-dim); }
.guide ul li.checked::before { content: "✓"; color: #5fd068; }
.check-badge {
  display: inline-block; margin-left: 8px; font-size: 0.65rem;
  background: var(--surface2); color: var(--gold); padding: 2px 8px;
  border-radius: 999px; vertical-align: middle;
}
```

커밋: `feat: mekiki 가이드 체크리스트 인터랙션 + 완료 뱃지`

---

### I6-T02: 가이드 — 아코디언 펼침
**파일**: `channels/mekiki.html`

가이드 타이틀 클릭 시 스텝 펼침/접힘:
```javascript
document.querySelectorAll('.guide h3').forEach(h3 => {
  const ul = h3.nextElementSibling?.nextElementSibling; // p 다음 ul
  if (!ul) return;
  h3.style.cursor = 'none';
  gsap.set(ul, { height: 'auto' });
  let open = true;

  h3.addEventListener('click', () => {
    if (open) {
      gsap.to(ul, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });
    } else {
      gsap.to(ul, { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' });
    }
    open = !open;
    h3.classList.toggle('closed', !open);
  });
});
```

CSS:
```css
.guide ul { overflow: hidden; }
.guide h3::after { content: ' ▾'; font-size: 0.7em; color: var(--gold); transition: transform 0.3s; }
.guide h3.closed::after { transform: rotate(-90deg); }
```

커밋: `feat: mekiki 가이드 아코디언 펼침 인터랙션`

---

## ════════════════════════════════════
## 공통 인터랙션 마무리
## ════════════════════════════════════

### G-T07: 모바일 터치 최적화
**파일**: `assets/js/interactive.js` 추가

모바일에서 커서 비활성화 + 터치 swipe 지원:
```javascript
const isMobile = () => window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;

// 커서는 데스크톱만
if (!isMobile()) cursor.init();

// 채널 카드 swipe (모바일)
if (isMobile()) {
  // VanillaTilt 비활성화
  // 대신 swipe로 채널 전환
}
```

커밋: `feat: interactive.js 모바일 터치 분기 처리`

---

### G-T08: 사운드 이펙트 (선택적 — 음소거 토글)
**파일**: `assets/js/interactive.js` 추가

링크 호버/클릭 시 미세한 클릭 음향 (Web Audio API, 서버 파일 없음):
```javascript
const sound = {
  ctx: null,
  muted: true, // 기본 음소거
  play(freq = 800, dur = 0.05) {
    if (this.muted) return;
    if (!this.ctx) this.ctx = new AudioContext();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);
    osc.start(); osc.stop(this.ctx.currentTime + dur);
  }
};

// 음소거 토글 버튼 (nav에 추가)
// <button id="sound-toggle">♪</button>
document.getElementById('sound-toggle')?.addEventListener('click', () => {
  sound.muted = !sound.muted;
});
document.querySelectorAll('a').forEach(a => {
  a.addEventListener('mouseenter', () => sound.play(600, 0.03));
});
```

커밋: `feat: Web Audio API 마이크로 사운드 이펙트 (음소거 기본)`

---

## 전체 인터랙션 태스크 체크리스트

```
GLOBAL interactive.js:
  [ ] G-T01: 커스텀 골드 커서
  [ ] G-T02: 페이지 전환 스윕 트랜지션
  [ ] G-T03: 골드 스크롤 진행 바
  [ ] G-T04: 필름 그레인 노이즈 오버레이
  [ ] G-T05: 글리치 텍스트 CSS
  [ ] G-T06: GSAP ScrollTrigger 스크롤 리빌
  [ ] G-T07: 모바일 터치 분기
  [ ] G-T08: 마이크로 사운드 이펙트

index.html:
  [ ] I1-T01: 히어로 파티클 캔버스
  [ ] I1-T02: 타이핑 텍스트 로테이션
  [ ] I1-T03: 채널 카드 3D 틸트 + 마그네틱
  [ ] I1-T04: 상품 카드 호버 줌 + 오버레이
  [ ] I1-T05: 패럴랙스 스크롤
  [ ] I1-T06: 숫자 카운터 애니메이션

showroom:
  [ ] I2-T01: 상품 카드 스태거 진입
  [ ] I2-T02: 필터 GSAP 전환
  [ ] I2-T03: 라이트박스 풀스크린 뷰어

monogatari (CH1):
  [ ] I3-T01: 스토리 타임라인 스크롤
  [ ] I3-T02: 발굴 지역 툴팁

shitate (CH2):
  [ ] I4-T01: 등급 도트 클릭 필터
  [ ] I4-T02: 소재 확대경 효과

coordinate (CH3):
  [ ] I5-T01: 코디 카드 틸트 + 아이템 순차 등장
  [ ] I5-T02: 태그 클릭 필터

mekiki (CH4):
  [ ] I6-T01: 체크리스트 인터랙션
  [ ] I6-T02: 아코디언 펼침

총 인터랙션 태스크: 25개
```

---

## 실행 순서

```
1. G-T04 (그레인) → G-T05 (글리치) CSS만 먼저 — 빠름
2. G-T01~T03 interactive.js 기반 구축
3. G-T06 ScrollTrigger — 이후 모든 페이지 data-reveal 적용
4. I1-T01~T06 index.html 전체
5. I2-T01~T03 showroom
6. I3~I6 채널 4개 (각 2태스크)
7. G-T07~T08 마무리
```

---

*Plan by Claude Sonnet 4.6 | 2026-04-23*
*Execute by DeepSeek Aider*
*라이브러리: GSAP 3.12.2 / VanillaTilt 1.8.1 / Splitting.js — 전부 CDN, 설치 불필요*
