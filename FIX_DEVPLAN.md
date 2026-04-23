# PAPAFLY 동적 연결 픽스 — DeepSeek Aider 실행용

**작성일:** 2026-04-23  
**작성자:** Sonnet (진단+설계) → DeepSeek Aider (실행)  
**목적:** 랜딩 페이지 YouTube·Discord 섹션 에러 4개 전부 수정

---

## 진단 결과 (Playwright 확인 완료)

### 에러 현황
```
❌ ERR 1: YouTube RSS 404
   rss2json.com → playlist_id=PLadnA-OuFIxBk3kddEsRNozEAUMrPw9A8 → 404
   원인: YouTube RSS는 playlist_id 불완전 지원. channel_id 방식이 정석.

❌ ERR 2: papyrus 캐시 CORS
   fetch → dtslib1979.github.io/dtslib-papyrus/data/channels/papafly.json → 404/CORS
   원인: 해당 파일이 papyrus 레포에 존재하지 않음.

❌ ERR 3: Discord widget.json 403
   fetch → discord.com/api/guilds/1493490911278272655/widget.json → 403
   원인: Discord 서버에서 위젯 기능 비활성화 상태.
   → 이건 코드 문제 아님. 박씨가 Discord 서버 설정에서 직접 켜야 함.

❌ ERR 4: YouTube "준비 중" placeholder 노출
   원인: ERR 1 때문에 JS가 데이터를 못 받아서 fallback 텍스트 유지됨.
```

### phoneparis 구현과 차이점
```
phoneparis YouTube:
  channel_id=UCOvHKAfWYYUQKPunZIjOQbg  ← channel_id 방식 ✅

papafly YouTube (현재):
  playlist_id=PLadnA-OuFIxBk3kddEsRNozEAUMrPw9A8  ← 잘못된 방식 ❌

@dtslib-branch 실제 채널 ID (yt-dlp로 확인 완료):
  UCxz800sMD27pk6X6HvxNS1g
```

---

## 에이더가 할 것 (TASK-FIX-01, 02, 03)

### TASK-FIX-01: index.html YouTube 섹션 — channel_id 방식으로 교체

**파일:** `index.html`

**수정 1 — HTML section 속성 교체:**
```
찾을 것:
<section class="yt-section" data-youtube-playlist-id="PLadnA-OuFIxBk3kddEsRNozEAUMrPw9A8">

교체할 것:
<section class="yt-section" data-youtube-channel-id="UCxz800sMD27pk6X6HvxNS1g">
```

**수정 2 — JS 스크립트 블록 교체 (index.html 하단 `<script>` 블록):**

찾을 것 (JS 전체 블록):
```javascript
(function() {
  const sec = document.querySelector('.yt-section');
  if (!sec) return;
  const plId = sec.dataset.youtubePlaylistId;
  if (!plId) return;
  // 플레이리스트 RSS → rss2json 프록시 (CORS 우회, API 키 불필요)
  const RSS_URL = `https://www.youtube.com/feeds/videos.xml?playlist_id=${plId}`;
  const API = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}&count=3`;
```

교체할 것:
```javascript
(function() {
  const sec = document.querySelector('.yt-section');
  if (!sec) return;
  const chId = sec.dataset.youtubeChannelId;
  if (!chId) return;
  // 채널 RSS → rss2json 프록시 (phoneparis 동일 방식)
  const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${chId}`;
  const API = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}&count=3`;
```

**커밋:** `fix: YouTube 섹션 — playlist_id → channel_id 방식 교체 (UCxz800sMD27pk6X6HvxNS1g)`

---

### TASK-FIX-02: assets/discord/messages-feed.js — papyrus 캐시 silent fail 처리

**파일:** `assets/discord/messages-feed.js`

**현재 코드:**
```javascript
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
```

**교체할 코드:**
```javascript
async function fetchMsgs() {
  // 1순위: papyrus 캐시 (파일 없으면 silent skip)
  try {
    const r = await fetch(`${CFG.CACHE_BASE}/${CFG.REPO}.json`, { mode: 'cors' });
    if (r.ok) {
      const data = await r.json();
      if (Array.isArray(data) && data.length) return data;
    }
  } catch {}
  // 2순위: 로컬 latest-messages.json (항상 있음)
  try {
    const r = await fetch('./data/latest-messages.json');
    if (r.ok) return r.json();
  } catch {}
  return [];
}
```

**커밋:** `fix: messages-feed.js — CORS silent fail + 로컬 fallback 강화`

---

### TASK-FIX-03: data/latest-messages.json 공지 내용 업데이트

**파일:** `data/latest-messages.json`

현재 placeholder를 실제 공지 3개로 교체:

```json
[
  {
    "id": "001",
    "content": "PAPAFLY 오픈 준비 중입니다. 오기쿠보·교토 소싱 여정을 유튜브로 먼저 공개합니다.",
    "author": "PAPAFLY",
    "timestamp": "2026-04-23T00:00:00.000Z"
  },
  {
    "id": "002",
    "content": "80년대 일본 빈티지 아이템 감별법 — CH.04 目利き 채널에서 시작합니다.",
    "author": "PAPAFLY",
    "timestamp": "2026-04-22T00:00:00.000Z"
  },
  {
    "id": "003",
    "content": "파트너 슬롯 A·B·C·D·E 문의는 Discord 채널로 주세요.",
    "author": "PAPAFLY",
    "timestamp": "2026-04-21T00:00:00.000Z"
  }
]
```

**커밋:** `content: latest-messages.json — placeholder → 실제 공지 3개`

---

### TASK-FIX-04: 검증

```bash
# 파일 수정 확인
grep "data-youtube-channel-id" index.html
# → data-youtube-channel-id="UCxz800sMD27pk6X6HvxNS1g" 나와야 함

grep "channel_id" index.html
# → feeds/videos.xml?channel_id= 나와야 함

grep "playlist_id" index.html
# → 아무것도 안 나와야 함 (전부 교체됨)

cat data/latest-messages.json | python3 -c "import sys,json; d=json.load(sys.stdin); print(len(d), '개 공지')"
# → 3 개 공지

git push origin main
```

**커밋:** `chore: 픽스 검증 완료 — YouTube channel_id + Discord fallback`

---

## 박씨가 직접 해야 할 것 (코드로 못 함)

### Discord 서버 위젯 활성화
```
Discord 앱 → 서버 선택 → 서버 설정 → 위젯
→ "서버 위젯 활성화" 토글 ON
→ 저장

완료되면 온라인 인원 수가 숫자로 표시됨
```

---

## 실행 순서 요약

```
TASK-FIX-01  index.html YouTube section attr+JS 교체  ← 제일 중요
TASK-FIX-02  messages-feed.js CORS silent fail 처리
TASK-FIX-03  latest-messages.json 실제 공지로 교체
TASK-FIX-04  검증 + git push

박씨 직접: Discord 서버 위젯 활성화
```

## 주의사항

- TASK-FIX-01에서 `data-youtube-playlist-id` 속성을 `data-youtube-channel-id`로 완전히 교체할 것
- `playlist_id`라는 문자열이 index.html에 단 하나도 남으면 안 됨
- phoneparis 구현 레퍼런스: `~/phoneparis/index.html` 하단 `loadYTFeed()` 함수 참고
