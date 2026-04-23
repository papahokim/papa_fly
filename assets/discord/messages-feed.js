import { CFG } from './config.js';

async function fetchMsgs() {
  const url = `${CFG.CACHE_BASE}/${CFG.REPO}.json`;
  const r = await fetch(url);
  return r.json();
}

function msgHTML(m) {
  const d = new Date(m.timestamp).toLocaleDateString('ko-KR');
  return `<article class="feed-item">
    <time>${d}</time>
    <p>${m.content}</p>
    <span class="feed-author">— ${m.author}</span>
  </article>`;
}

export async function renderFeed(el) {
  try {
    const msgs = await fetchMsgs();
    el.innerHTML = msgs.map(msgHTML).join('');
  } catch {
    el.innerHTML = '<p class="feed-empty">공지 없음</p>';
  }
}