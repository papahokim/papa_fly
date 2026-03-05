/**
 * PAPAFLY app.js
 * 카탈로그 fetch + 상품 그리드 렌더링 + 카테고리 필터
 */

(function () {
  'use strict';

  // === 카탈로그 로드 ===
  async function loadCatalog() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    try {
      const base = document.location.pathname.includes('/showroom') ? '../' : './';
      const res  = await fetch(base + 'catalog/index.json');
      const data = await res.json();
      renderProducts(data.products, grid);
    } catch (e) {
      grid.innerHTML = '<p style="color:var(--text-dim);font-size:0.85rem;">상품을 불러오는 중...</p>';
    }
  }

  function renderProducts(products, container) {
    if (!products.length) {
      container.innerHTML = '<p style="color:var(--text-dim);font-size:0.85rem;">등록된 상품이 없습니다.</p>';
      return;
    }
    container.innerHTML = products.map(p => productCardHTML(p)).join('');
  }

  function productCardHTML(p) {
    const statusBadge = p.status === 'available'
      ? '<span class="badge badge-available">판매중</span>'
      : '<span class="badge badge-sold">판매완료</span>';

    return `
      <a href="showroom/lookbook/${p.id}.html" class="product-card" style="text-decoration:none;display:block" data-cat="${p.category}">
        <div class="card-img">
          <div style="width:100%;aspect-ratio:3/4;background:var(--surface2);display:flex;align-items:center;justify-content:center;">
            <span style="color:var(--text-dim);font-size:0.75rem;letter-spacing:0.1em">${p.era || ''}</span>
          </div>
        </div>
        <div class="card-body">
          <p class="card-patch">${p.patch || ''}</p>
          <h3 class="card-name">${p.name}</h3>
          <p class="card-era">${p.era || ''} · ${p.category}</p>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:var(--space-sm)">
            <span class="card-price">₩${p.price_krw ? p.price_krw.toLocaleString() : '—'}</span>
            <span style="display:flex;gap:4px;align-items:center">
              ${statusBadge}
              <span class="card-grade">${p.condition || ''}</span>
            </span>
          </div>
        </div>
      </a>`;
  }

  // === 카테고리 필터 ===
  function initCatFilter() {
    const items = document.querySelectorAll('.cat-item');
    if (!items.length) return;

    items.forEach(item => {
      item.addEventListener('click', () => {
        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        const cat   = item.dataset.cat;
        const cards = document.querySelectorAll('#products-grid [data-cat]');
        cards.forEach(card => {
          card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
        });
      });
    });
  }

  // === 스크롤 리빌 ===
  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.channel-card, .product-card, .coord-card, .story-item, .guide').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      io.observe(el);
    });
  }

  // === Init ===
  document.addEventListener('DOMContentLoaded', () => {
    loadCatalog();
    initCatFilter();
    initScrollReveal();
  });
})();
