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
  // 간단 치환: {{key}} → card.field
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
    if (step.id === 'render_coupang' && card.channel?.platform === 'coupang') {
      const tpl  = path.join(ROOT, step.template);
      const out  = path.join(ROOT, step.output.replace('{id}', card.id));
      const html = renderTemplate(tpl, card);
      if (html && !DRY_RUN) { ensureDir(path.dirname(out)); fs.writeFileSync(out, html); }
      log(`  ${DRY_RUN ? '[dry]' : ''} coupang → ${out}`);
    }

    if (step.id === 'render_naver' && card.channel?.platform === 'naver') {
      const tpl  = path.join(ROOT, step.template);
      const out  = path.join(ROOT, step.output.replace('{id}', card.id));
      const html = renderTemplate(tpl, card);
      if (html && !DRY_RUN) { ensureDir(path.dirname(out)); fs.writeFileSync(out, html); }
      log(`  ${DRY_RUN ? '[dry]' : ''} naver   → ${out}`);
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
