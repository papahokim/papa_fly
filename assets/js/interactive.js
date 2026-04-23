// ── PAPAFLY Interactive — 전 페이지 공통 ──────────
// GSAP, Splitting, VanillaTilt — 전부 CDN에서 로드 가정

// ── G-T01: 커스텀 골드 커서 ──────────────────────
const cursor = {
  dot:  null,
  ring: null,
  init() {
    document.body.style.cursor = 'none';

    this.dot = Object.assign(document.createElement('div'), { className: 'cursor-dot' });
    this.ring = Object.assign(document.createElement('div'), { className: 'cursor-ring' });
    document.body.append(this.dot, this.ring);

    document.addEventListener('mousemove', e => {
      gsap.set(this.dot, { x: e.clientX, y: e.clientY });
      gsap.to(this.ring, { duration: 0.15, x: e.clientX, y: e.clientY, ease: 'power2.out' });
    });

    document.querySelectorAll('a, button, [data-cursor-expand]').forEach(el => {
      el.addEventListener('mouseenter', () => this.ring.classList.add('cursor-expand'));
      el.addEventListener('mouseleave', () => this.ring.classList.remove('cursor-expand'));
    });
  }
};

// ── G-T02: 페이지 전환 스윕 트랜지션 ──────────────
const pageTransition = {
  overlay: null,
  init() {
    this.overlay = Object.assign(document.createElement('div'), { className: 'page-overlay' });
    document.body.prepend(this.overlay);

    gsap.to(this.overlay, { duration: 0.8, scaleY: 0, transformOrigin: 'top', ease: 'power3.inOut' });

    document.querySelectorAll('a[href]:not([target])').forEach(a => {
      try {
        const aHref = a.href;
        if (!aHref || aHref.startsWith('javascript:') || aHref.startsWith('#')) return;
        const aUrl = new URL(aHref);
        if (aUrl.origin === location.origin) {
          a.addEventListener('click', e => {
            e.preventDefault();
            gsap.to(this.overlay, {
              duration: 0.6, scaleY: 1, transformOrigin: 'bottom',
              ease: 'power3.inOut',
              onComplete: () => { location.href = aHref; }
            });
          });
        }
      } catch(e) { /* cross-origin skip */ }
    });
  }
};

// ── G-T03: 스크롤 진행 바 ──────────────────────────
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

// ── G-T06: 스크롤 리빌 (GSAP ScrollTrigger) ──────
const scrollReveal = {
  init() {
    if (typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('[data-reveal]').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
        }
      );
    });

    document.querySelectorAll('[data-reveal-lines]').forEach(el => {
      if (typeof Splitting === 'undefined') return;
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

// ── G-T07: 모바일 터치 분기 ──────────────────────
const isMobile = () => window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;

// ── G-T08: 마이크로 사운드 이펙트 ────────────────
const sound = {
  ctx: null,
  muted: true,
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

// ── 초기화 ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') return;

  scrollBar.init();

  if (isMobile()) {
    // 모바일: 커서 비활성화
  } else {
    cursor.init();
    pageTransition.init();
  }

  scrollReveal.init();

  // 사운드 토글
  document.getElementById('sound-toggle')?.addEventListener('click', () => {
    sound.muted = !sound.muted;
  });
  document.querySelectorAll('a').forEach(a => {
    a.addEventListener('mouseenter', () => sound.play(600, 0.03));
  });
});
