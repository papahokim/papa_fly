#!/usr/bin/env node
/**
 * PAPAFLY Automation Orchestrator
 * catalog/products/ → coupang/naver/youtube 렌더링 파이프라인
 */

const fs   = require('fs');
const path = require('path');

const ROOT     = path.resolve(__dirname, '..');
const CATALOG  = path.join(ROOT, 'catalog/products');
const PIPELINE = require(path.join(ROOT, 'pipeline/flow.json'));

const args    = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const TARGET  = args.find(a => a.startsWith('PF-'));

function log(msg) { console.log(`[orchestrator] ${msg}`); }

// 등급 → 감정사 라벨 매핑
const GRADE_LABELS = { A: '최상품', B: '양품', C: '애호가용', D: '부품용' };

/** card에 computed field 추가 */
function enhanceCard(card) {
  const g = card.condition?.grade || '';
  card._gradeLabel = GRADE_LABELS[g] || '';
  card._gradeFull = `鑑定 ${g} — ${card._gradeLabel}`;
  card._priceComma = (card.price?.sell_krw || 0).toLocaleString();
  card._purchaseJpy = card.price?.purchase_jpy || 0;
  card._purchaseKrwComma = (card.price?.purchase_krw || 0).toLocaleString();
  card._marginPct = card.price?.margin_pct || 0;
  return card;
}

function getProducts() {
  if (TARGET) return [path.join(CATALOG, TARGET, 'card.json')];
  return fs.readdirSync(CATALOG)
    .map(id => path.join(CATALOG, id, 'card.json'))
    .filter(p => fs.existsSync(p));
}

function renderTemplate(templatePath, card) {
  if (!fs.existsSync(templatePath)) {
    log(`WARN: template not found: ${templatePath}`);
    return null;
  }
  let html = fs.readFileSync(templatePath, 'utf8');
  // computed field 적용
  card = enhanceCard(card);
  // 간단 치환: {{key}} → card.field (점표기법 지원)
  html = html.replace(/\{\{(\w+(?:\.\w+)*)\}\}/g, (_, key) => {
    const val = key.split('.').reduce((o, k) => o && o[k], card);
    return val !== undefined ? val : '';
  });
  return html;
}

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function processCard(cardPath) {
  const card = JSON.parse(fs.readFileSync(cardPath, 'utf8'));
  log(`Processing ${card.id} — ${card.name.ko}`);

  for (const step of PIPELINE.steps) {
    if (step.id === 'render_coupang' && (card.channel?.platform === 'coupang' || card.channel?.platform === 'both')) {
      const tpl  = path.join(ROOT, step.template);
      const out  = path.join(ROOT, step.output.replace('{id}', card.id));
      const html = renderTemplate(tpl, card);
      if (html && !DRY_RUN) { ensureDir(path.dirname(out)); fs.writeFileSync(out, html); }
      log(`  ${DRY_RUN ? '[dry]' : ''} coupang → ${out}`);
    }

    if (step.id === 'render_naver' && (card.channel?.platform === 'naver' || card.channel?.platform === 'both')) {
      const tpl  = path.join(ROOT, step.template);
      const out  = path.join(ROOT, step.output.replace('{id}', card.id));
      const html = renderTemplate(tpl, card);
      if (html && !DRY_RUN) { ensureDir(path.dirname(out)); fs.writeFileSync(out, html); }
      log(`  ${DRY_RUN ? '[dry]' : ''} naver   → ${out}`);
    }

    if (step.id === 'render_youtube') {
      const tpls    = step.templates || [];
      const outDir  = path.join(ROOT, step.output.replace('{id}', card.id));
      const cm      = card.content_matrix || {};

      // content_matrix 기반 템플릿 선택
      const selected = [];
      if (cm.story)     selected.push('sourcing-story.html');
      if (cm.appraisal) selected.push('appraisal.html');
      if (cm.photo_real) selected.push('coordinate.html');  // 코디 연출
      // 기본: 항상 sourcing-story + flea-market
      selected.push('flea-market.html');
      selected.push('pwa-screen.html');

      const unique = [...new Set(selected)];
      for (const tplFile of unique) {
        const tplPath = path.join(ROOT, 'youtube/templates', tplFile);
        if (!fs.existsSync(tplPath)) { log(`  WARN: youtube template ${tplFile} not found`); continue; }
        const html = renderTemplate(tplPath, card);
        if (html && !DRY_RUN) {
          ensureDir(outDir);
          const outFile = path.join(outDir.replace(/\/$/, ''), tplFile);
          fs.writeFileSync(outFile, html);
        }
        log(`  ${DRY_RUN ? '[dry]' : ''} youtube → ${outDir}/${tplFile}`);
      }
    }
  }
}

function updateIndex(products) {
  const indexPath = path.join(ROOT, 'catalog/index.json');
  const index     = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  const existing  = new Set(index.products.map(p => p.id));

  products.forEach(cardPath => {
    const card = JSON.parse(fs.readFileSync(cardPath, 'utf8'));
    if (!existing.has(card.id)) {
      index.products.push({
        id: card.id, category: card.category,
        name: card.name.ko, era: card.era,
        condition: card.condition.grade,
        price_krw: card.price.sell_krw,
        channel: card.channel.platform,
        status: card.status,
        patch: card.patch
      });
      log(`  index +${card.id}`);
    }
  });

  index.total   = index.products.length;
  index.updated = new Date().toISOString().split('T')[0];
  if (!DRY_RUN) fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
  log(`  ${DRY_RUN ? '[dry]' : ''} index updated (total: ${index.total})`);
}

// Main
const products = getProducts();
log(`Found ${products.length} product(s). DRY_RUN=${DRY_RUN}`);
products.forEach(processCard);
updateIndex(products);
log('Done.');
