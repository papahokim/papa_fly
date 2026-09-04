/* ==========================================================================
   app.js — 핵심 인터랙션 (GSAP 미포함 · IntersectionObserver + rAF 단일 흐름)
   ========================================================================== */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var doc = document;

  /* 리딩 프로그레스 + 탑바 + 백투탑 (가벼운 클래스 토글만) */
  var progress = doc.getElementById('progress');
  var topbar = doc.getElementById('topbar');
  var toTop = doc.getElementById('toTop');
  function onScroll() {
    var h = doc.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    if (progress) progress.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    if (topbar) topbar.classList.toggle('scrolled', h.scrollTop > window.innerHeight * 0.7);
    if (toTop) toTop.classList.toggle('show', h.scrollTop > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* 스크롤 리빌 (opacity + translate) */
  var reveals = doc.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* 숫자 카운터 */
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (reduce) { el.textContent = target; return; }
    var dur = 1500, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = doc.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
  }

  /* 히어로 타자기 */
  (function () {
    var el = doc.getElementById('heroType');
    if (!el) return;
    var words = ['내가 살아온 삶에도 이야기가 있다.', '사라지기 전에 기록한다.', '경험은 이야기의 원재료다.', '오늘이 가장 젊은 날이다.'];
    if (reduce) { el.textContent = words[0]; return; }
    var wi = 0, ci = 0, del = false;
    (function step() {
      var cur = words[wi];
      el.textContent = del ? cur.slice(0, ci--) : cur.slice(0, ci++);
      if (!del && ci > cur.length) { setTimeout(function () { del = true; step(); }, 2200); return; }
      if (del && ci < 0) { del = false; wi = (wi + 1) % words.length; }
      setTimeout(step, del ? 36 : 72);
    })();
  })();

  /* 스크롤스파이 닷 내비 (href 해시 기준) */
  (function () {
    var dots = doc.querySelectorAll('.dotnav .dot');
    if (!dots.length) return;
    var targets = [];
    dots.forEach(function (d) {
      var id = d.getAttribute('href');
      if (id && id.charAt(0) === '#') {
        var sec = doc.getElementById(id.slice(1));
        if (sec) targets.push({ dot: d, sec: sec });
      }
    });
    function spy() {
      var pos = window.scrollY + window.innerHeight * 0.4;
      var active = targets[0];
      targets.forEach(function (t) { if (t.sec.offsetTop <= pos) active = t; });
      dots.forEach(function (d) { d.classList.remove('active'); });
      if (active) active.dot.classList.add('active');
    }
    window.addEventListener('scroll', spy, { passive: true });
    spy();
  })();

  /* GSAP 조건부 로드 — 모션 최소화면 파일 자체를 불러오지 않음 */
  if (reduce) return;
  function load(src, cb) {
    var s = doc.createElement('script');
    s.src = src; s.onload = cb; doc.body.appendChild(s);
  }
  load('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js', function () {
    load('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js', function () {
      load('js/motion.js');
    });
  });
})();
