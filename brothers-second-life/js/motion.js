/* ==========================================================================
   motion.js — GSAP 기반 패럴랙스 + 스크롤 드로우 (app.js가 조건부 로드)
   ========================================================================== */
(function () {
  'use strict';
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  /* 히어로 배경 패럴랙스 */
  var heroBg = document.getElementById('heroBg');
  if (heroBg) {
    gsap.to(heroBg, { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  }

  /* 에필로그 배경 패럴랙스 */
  var epiBg = document.getElementById('epiBg');
  if (epiBg) {
    gsap.to(epiBg, { yPercent: 16, ease: 'none', scrollTrigger: { trigger: '.epilogue', start: 'top bottom', end: 'bottom top', scrub: true } });
  }

  /* 풀블리드 이미지 브레이크 패럴랙스 */
  document.querySelectorAll('.img-break img').forEach(function (img) {
    gsap.fromTo(img, { yPercent: -12 }, { yPercent: 12, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* 경험→이야기 파이프라인 채우기 */
  var pipeFill = document.getElementById('pipeFill');
  if (pipeFill) {
    gsap.to(pipeFill, { height: '100%', ease: 'none', scrollTrigger: { trigger: pipeFill.parentElement, start: 'top 78%', end: 'bottom 45%', scrub: true } });
  }

  /* 인생 타임라인 채우기 */
  var tlFill = document.getElementById('tlFill');
  if (tlFill) {
    gsap.to(tlFill, { width: '100%', ease: 'none', scrollTrigger: { trigger: tlFill.parentElement, start: 'top 80%', end: 'bottom 60%', scrub: true } });
  }
})();
