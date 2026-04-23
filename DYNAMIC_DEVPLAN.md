# PAPAFLY 동적 연결 개발계획 — DeepSeek Aider 실행용

**작성일:** 2026-04-23  
**작성자:** Sonnet (설계) → DeepSeek Aider (실행)  
**목적:** 랜딩 페이지를 정적 사이트에서 Discord + YouTube 연결 동적 사이트로 전환  
**레퍼런스:** phoneparis 구현체 (~/phoneparis/assets/discord/)

---

## 사전 확인 (작업 전 반드시 읽을 것)

```
papafly Discord 웹훅 (이미 발급됨):
  GUILD_ID:  1493490911278272655
  CH_ID:     1493491765934559254  (웹훅 URL에서 추출)
  WEBHOOK:   https://discord.com/api/webhooks/1493491765934559254/MWaalyI-oyi8i2KQ7z187d9cTRLJ9UadH9PSLKgxXgMfNZzGb1FgHu-FrlsbvannxeZC

레퍼런스 파일 위치:
  ~/phoneparis/assets/discord/config.js      ← SSOT 패턴
  ~/phoneparis/assets/discord/presence.js    ← 온라인 수
  ~/phoneparis/assets/discord/messages-feed.js ← 공지 피드
  ~/phoneparis/.github/workflows/discord-cache.yml ← Actions 캐시

YouTube 채널: @dtslib-branch (https://youtube.com/@dtslib-branch)
플레이리스트: 파파플라이 (playlist_id 확정 필요 — TASK-07 참고)
```

---

## TASK-01: Discord config.js 생성

**파일:** `assets/discord/config.js` (신규 생성)  
**레퍼런스:** `~/phoneparis/assets/discord/config.js` 그대로 복사 후 papafly 값으로 교체

```javascript
// assets/discord/config.js
export const CFG = {
  GUILD_ID:   "1493490911278272655",
  OAUTH_CID:  "1492464128865075350",
  CACHE_BASE: "https://dtslib1979.github.io/dtslib-papyrus/data/channels",

  REPO:    "papafly",
  CH_ID:   "1493491765934559254",
  WEBHOOK: "https://discord.com/api/webhooks/1493491765934559254/MWaalyI-oyi8i2KQ7z187d9cTRLJ9UadH9PSLKgxXgMfNZzGb1FgHu-FrlsbvannxeZC",
  WB_CHAT: "https://e.widgetbot.io/channels/1493490911278272655/1493491765934559254",

  THEME: {
    GOLD:    "#c4a35a",
    BG:      "#0d0b08",
    EMERALD: "#5fd068",
    MUTED:   "#8b7355",
  },
};
```

**커밋:** `feat: Discord config.js 생성 — papafly 웹훅/Guild 설정`

---

## TASK-02: Discord presence.js 생성

**파일:** `assets/discord/presence.js` (신규 생성)  
**내용:** `~/phoneparis/assets/discord/presence.js` 동일하게 복사

```javascript
// assets/discord/presence.js
import { CFG } from './config.js';

async function fetchCount() {
  const r = await fetch(`https://discord.com/api/guilds/${CFG.GUILD_ID}/widget.json`);
  const d = await r.json();
  return d.presence_count ?? 0;
}

export async function renderPresence(el) {
  try {
    el.textContent = await fetchCount();
  } catch {
    el.textContent = '—';
  }
}
```

**커밋:** `feat: Discord presence.js 생성 — 온라인 수 표시`

---

## TASK-03: Discord messages-feed.js 생성

**파일:** `assets/discord/messages-feed.js` (신규 생성)

```javascript
// assets/discord/messages-feed.js
import { CFG } from './config.js';

async function fetchMsgs() {
  // 1순위: papyrus 캐시
  try {
    const r = await fetch(`${CFG.CACHE_BASE}/${CFG.REPO}.json`);
    if (r.ok) return r.json();
  } catch {}
  // 2순위: 로컬 fallback
  try {
    const r = await fetch('./data/latest-messages.json');
    if (r.ok) return r.json();
  } catch {}
  return [];
}

function msgHTML(m) {
  const d = new Date(m.timestamp).toLocaleDateString('ko-KR');
  return `<article class="discord-feed-item">
    <time class="discord-feed-time">${d}</time>
    <p class="discord-feed-content">${m.content}</p>
    <span class="discord-feed-author">— ${m.author ?? 'PAPAFLY'}</span>
  </article>`;
}

export async function renderFeed(el) {
  try {
    const msgs = await fetchMsgs();
    if (!msgs.length) throw new Error('empty');
    el.innerHTML = msgs.slice(0, 5).map(msgHTML).join('');
  } catch {
    el.innerHTML = '<p class="discord-feed-empty">최신 공지가 없습니다.</p>';
  }
}
```

**커밋:** `feat: Discord messages-feed.js 생성 — 공지 피드 (papyrus캐시→로컬 fallback)`

---

## TASK-04: data/latest-messages.json 생성 (로컬 fallback)

**파일:** `data/latest-messages.json` (신규 생성)

```json
[
  {
    "id": "placeholder",
    "content": "PAPAFLY Discord 채널에 오신 걸 환영합니다. 최신 소싱 소식을 공지합니다.",
    "author": "PAPAFLY",
    "timestamp": "2026-04-23T00:00:00.000Z"
  }
]
```

**커밋:** `feat: data/latest-messages.json 생성 — Discord fallback`

---

## TASK-05: GitHub Actions discord-cache.yml 생성

**파일:** `.github/workflows/discord-cache.yml` (신규 생성)  
**내용:** phoneparis 워크플로우 복사, CHANNEL_ID만 papafly 값으로 교체

```yaml
name: Discord 공지 캐시 갱신

on:
  schedule:
    - cron: '*/30 * * * *'
  workflow_dispatch:

permissions:
  contents: write

jobs:
  cache:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Fetch Discord 공지 채널 메시지
        env:
          DISCORD_BOT_TOKEN: ${{ secrets.DISCORD_BOT_TOKEN }}
          CHANNEL_ID: "1493491765934559254"
        run: |
          if [ -z "$DISCORD_BOT_TOKEN" ]; then
            echo "DISCORD_BOT_TOKEN 미설정 — 스킵"
            exit 0
          fi
          curl -s \
            -H "Authorization: Bot $DISCORD_BOT_TOKEN" \
            "https://discord.com/api/v10/channels/${CHANNEL_ID}/messages?limit=10" \
            -o data/latest-messages.json
          echo "캐시 갱신 완료: $(date -u +%Y-%m-%dT%H:%M:%SZ)"

      - name: 변경사항 커밋
        run: |
          git config user.name  "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add data/latest-messages.json
          git diff --cached --quiet || git commit -m "chore: discord 공지 캐시 갱신 $(date -u +%Y-%m-%dT%H:%M:%SZ)"
          git push
```

**커밋:** `feat: GitHub Actions discord-cache.yml 추가 — 30분 공지 캐시`

---

## TASK-06: index.html Discord 섹션 삽입

**파일:** `index.html`  
**위치:** `<footer>` 바로 위에 삽입

**삽입할 HTML:**
```html
<!-- Discord 커뮤니티 섹션 -->
<section class="discord-section">
  <div class="discord-inner">
    <div class="discord-left">
      <p class="discord-label">COMMUNITY</p>
      <h2 class="discord-title">Discord 채널</h2>
      <p class="discord-desc">소싱 여정 공지 · 감별 질문 · 구매 문의</p>
      <div class="discord-meta">
        <span class="discord-online">
          <span class="discord-dot"></span>
          온라인 <strong id="discord-presence">—</strong>명
        </span>
        <a href="https://discord.gg/papafly" class="discord-cta" target="_blank" rel="noopener">
          채널 참여 →
        </a>
      </div>
    </div>
    <div class="discord-right" id="discord-feed">
      <p class="discord-feed-empty">공지 로딩 중...</p>
    </div>
  </div>
</section>
```

**삽입할 CSS (index.html `<style>` 블록 안에 추가):**
```css
.discord-section {
  border-top: 1px solid var(--border);
  padding: var(--space-2xl) var(--space-lg);
  background: var(--surface);
}
.discord-inner {
  max-width: 960px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2xl);
  align-items: start;
}
.discord-label { font-size: 0.7rem; letter-spacing: 0.2em; color: var(--gold); margin-bottom: var(--space-sm); }
.discord-title { font-family: var(--font-heading); font-size: 1.4rem; color: var(--text); margin-bottom: var(--space-sm); }
.discord-desc { font-size: 0.85rem; color: var(--text-muted); line-height: 1.8; margin-bottom: var(--space-lg); }
.discord-meta { display: flex; align-items: center; gap: var(--space-lg); flex-wrap: wrap; }
.discord-online { font-size: 0.8rem; color: var(--text-muted); display: flex; align-items: center; gap: 6px; }
.discord-dot { width: 8px; height: 8px; border-radius: 50%; background: #5fd068; animation: pulse 2s infinite; flex-shrink: 0; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
.discord-cta {
  font-size: 0.78rem; letter-spacing: 0.1em;
  border: 1px solid var(--gold); color: var(--gold);
  padding: 6px 16px; text-decoration: none;
  transition: all 0.2s;
}
.discord-cta:hover { background: var(--gold); color: var(--bg); }
.discord-feed-item { border-left: 2px solid var(--border); padding-left: var(--space-md); margin-bottom: var(--space-md); }
.discord-feed-time { font-size: 0.72rem; color: var(--text-dim); display: block; margin-bottom: 4px; }
.discord-feed-content { font-size: 0.85rem; color: var(--text-muted); line-height: 1.7; }
.discord-feed-author { font-size: 0.72rem; color: var(--gold); margin-top: 4px; display: block; }
.discord-feed-empty { font-size: 0.85rem; color: var(--text-dim); }
@media (max-width: 768px) {
  .discord-inner { grid-template-columns: 1fr; }
}
```

**삽입할 `<script>` (index.html 하단 `</body>` 직전에 추가):**
```html
<script type="module">
  import { CFG } from './assets/discord/config.js';
  import { renderPresence } from './assets/discord/presence.js';
  import { renderFeed } from './assets/discord/messages-feed.js';

  const presenceEl = document.getElementById('discord-presence');
  const feedEl     = document.getElementById('discord-feed');
  if (presenceEl) renderPresence(presenceEl);
  if (feedEl)     renderFeed(feedEl);
</script>
```

**커밋:** `feat: index.html Discord 섹션 — 공지피드 + 온라인수 + 채널CTA`

---

## TASK-07: index.html YouTube 섹션 삽입

**파일:** `index.html`  
**위치:** Discord 섹션 위 (채널 그리드 섹션 아래)  
**채널:** `@dtslib-branch` (https://youtube.com/@dtslib-branch)  
**플레이리스트:** 파파플라이 — playlist_id를 아래 PLAYLIST_ID 자리에 교체. 모를 경우 채널 링크만으로 활성화.

**삽입할 HTML:**
```html
<!-- YouTube 최신 영상 섹션 -->
<section class="yt-section" data-youtube-playlist-id="PLadnA-OuFIxBk3kddEsRNozEAUMrPw9A8">
  <div style="max-width:960px;margin:0 auto;padding:var(--space-2xl) var(--space-lg)">
    <div style="text-align:center;margin-bottom:var(--space-xl)">
      <p style="font-size:0.7rem;letter-spacing:0.2em;color:var(--vermillion);margin-bottom:var(--space-sm)">YOUTUBE</p>
      <h2 class="section-title">소싱 여정</h2>
      <p class="section-sub">오기쿠보 구제 골목부터 교토 골동품 시장까지</p>
    </div>
    <div class="yt-grid" id="yt-grid">
      <!-- JS로 플레이리스트 최신 영상 렌더링 -->
      <div class="yt-placeholder">
        <p style="color:var(--text-dim);font-size:0.85rem;text-align:center">YouTube 준비 중</p>
      </div>
    </div>
    <div style="text-align:center;margin-top:var(--space-xl)">
      <a href="https://youtube.com/@dtslib-branch" class="btn-outline" target="_blank" rel="noopener">
        채널 구독 →
      </a>
    </div>
  </div>
</section>
```

**삽입할 CSS:**
```css
.yt-section { border-top: 1px solid var(--border); background: var(--bg); }
.yt-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-md);
}
.yt-card { background: var(--surface); border: 1px solid var(--border); overflow: hidden; }
.yt-thumb { width: 100%; aspect-ratio: 16/9; object-fit: cover; display: block; background: var(--surface2); }
.yt-info { padding: var(--space-md); }
.yt-title { font-size: 0.88rem; color: var(--text); line-height: 1.5; margin-bottom: var(--space-xs); }
.yt-date  { font-size: 0.75rem; color: var(--text-dim); }
.yt-placeholder { grid-column: 1/-1; padding: var(--space-2xl); border: 1px solid var(--border); text-align: center; }
.btn-outline {
  border: 1px solid var(--border); color: var(--text-muted);
  padding: 8px 24px; font-size: 0.8rem; letter-spacing: 0.1em;
  text-decoration: none; transition: all 0.2s; display: inline-block;
}
.btn-outline:hover { border-color: var(--gold); color: var(--gold); }
```

**삽입할 `<script>` (Discord 스크립트 다음에 추가):**
```html
<script>
// YouTube oEmbed 방식 (API 키 불필요)
// 채널 ID 확정 후 UC_PAPAFLY_CHANNEL_ID 교체 필요
(function() {
  const sec = document.querySelector('.yt-section');
  if (!sec) return;
  const plId = sec.dataset.youtubePlaylistId;
  if (!plId) return;
  // 플레이리스트 RSS → rss2json 프록시 (CORS 우회, API 키 불필요)
  const RSS_URL = `https://www.youtube.com/feeds/videos.xml?playlist_id=${plId}`;
  const API = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}&count=3`;
  fetch(API).then(r=>r.json()).then(d=>{
    if (!d.items?.length) return;
    const grid = document.getElementById('yt-grid');
    if (!grid) return;
    grid.innerHTML = d.items.map(v => {
      const vid = v.link.split('v=')[1];
      const date = new Date(v.pubDate).toLocaleDateString('ko-KR');
      return `<div class="yt-card">
        <a href="${v.link}" target="_blank" rel="noopener">
          <img class="yt-thumb" src="https://img.youtube.com/vi/${vid}/mqdefault.jpg" alt="${v.title}" loading="lazy">
          <div class="yt-info">
            <p class="yt-title">${v.title}</p>
            <p class="yt-date">${date}</p>
          </div>
        </a>
      </div>`;
    }).join('');
  }).catch(()=>{});
})();
</script>
```

**커밋:** `feat: index.html YouTube 섹션 — @dtslib-branch 파파플라이 플레이리스트 (playlist_id 확정 후 활성화)`

---

## TASK-08: discord-notify.yml DISCORD_WEBHOOK Secret 연결

**파일:** `.github/workflows/discord-notify.yml`  
**현황:** 파일은 이미 있음. `${{ secrets.DISCORD_WEBHOOK }}` 변수만 사용 중.  
**작업:** 아래 내용으로 `env` 블록 확인 후 WEBHOOK URL을 직접 넣지 말 것 (보안). 대신 워크플로우 `run` 블록에 fallback 추가.

```yaml
# .github/workflows/discord-notify.yml 의 run 블록 수정
# DISCORD_WEBHOOK secret 미설정 시 graceful skip
- name: Send Discord notification
  env:
    DISCORD_WEBHOOK: ${{ secrets.DISCORD_WEBHOOK }}
  run: |
    if [ -z "$DISCORD_WEBHOOK" ]; then
      echo "DISCORD_WEBHOOK 미설정 — 스킵"
      exit 0
    fi
    # ... 기존 curl 코드 유지
```

**커밋:** `fix: discord-notify.yml — Secret 미설정 시 graceful skip`

---

## TASK-09: 검증 체크리스트 (에이더가 직접 실행)

각 TASK 완료 후 아래 체크:

```bash
# 파일 존재 확인
ls assets/discord/
# → config.js presence.js messages-feed.js

ls data/
# → latest-messages.json

ls .github/workflows/
# → discord-cache.yml discord-notify.yml

# index.html Discord/YouTube 섹션 포함 확인
grep -c "discord-section\|yt-section" index.html
# → 2

# git push
git push origin main
```

**커밋:** `chore: 동적 연결 구현 완료 — Discord 공지피드 + YouTube 섹션`

---

## 실행 순서 요약

```
TASK-01  assets/discord/config.js           ← papafly 웹훅 설정
TASK-02  assets/discord/presence.js          ← 온라인 수
TASK-03  assets/discord/messages-feed.js     ← 공지 피드
TASK-04  data/latest-messages.json           ← fallback JSON
TASK-05  .github/workflows/discord-cache.yml ← 30분 캐싱
TASK-06  index.html Discord 섹션 삽입        ← HTML+CSS+script
TASK-07  index.html YouTube 섹션 삽입        ← HTML+CSS+script
TASK-08  discord-notify.yml 수정             ← graceful skip
TASK-09  검증 + git push                     ← 완료 확인
```

## 주의사항

- TASK-01~05는 신규 파일 생성 — 기존 파일 건드리지 말 것
- TASK-06, 07은 index.html 수정 — `<footer>` 위 정확한 위치에 삽입
- WEBHOOK URL은 JS 파일에만 들어감 (HTML 인라인 금지)
- YouTube 채널 ID `UC_PAPAFLY_CHANNEL_ID`는 플레이스홀더 — 박씨가 채널 ID 주면 교체
- `type="module"` script는 반드시 `</body>` 바로 앞에 위치
