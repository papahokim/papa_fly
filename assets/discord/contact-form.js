import { CFG } from './config.js';

function buildEmbed(name, msg) {
  return {
    embeds: [{
      title: `${name} 님 문의`,
      description: msg,
      color: 0xD4AF37,
      timestamp: new Date().toISOString(),
    }],
  };
}

async function sendWebhook(name, msg) {
  const r = await fetch(CFG.WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(buildEmbed(name, msg)),
  });
  if (!r.ok) throw new Error(r.status);
}

export function initContactForm(wrapEl) {
  wrapEl.innerHTML = `
    <div style="max-width:520px;margin:0 auto;padding:2rem 1.5rem;">
      <h3 style="font-family:'Playfair Display',serif;color:var(--gold,#D4AF37);font-size:1.4rem;margin-bottom:.3rem;">문의</h3>
      <p style="color:#9B8E6E;font-size:.9rem;margin-bottom:1.5rem;">Discord로 직접 전송됩니다. 답변은 DM 또는 채널로 드립니다.</p>
      <form id="dc-contact-form" style="display:flex;flex-direction:column;gap:1rem;">
        <input name="uname" type="text" placeholder="이름 또는 닉네임" required
          style="background:rgba(255,255,255,.06);border:1px solid rgba(212,175,55,.3);border-radius:8px;
                 padding:.75rem 1rem;color:#F5F5DC;font-size:.95rem;outline:none;"/>
        <textarea name="umsg" rows="4" placeholder="문의 내용을 입력하세요" required
          style="background:rgba(255,255,255,.06);border:1px solid rgba(212,175,55,.3);border-radius:8px;
                 padding:.75rem 1rem;color:#F5F5DC;font-size:.95rem;outline:none;resize:vertical;"></textarea>
        <button type="submit"
          style="background:var(--gold,#D4AF37);color:#0F0C04;font-weight:700;font-size:.95rem;
                 border:none;border-radius:8px;padding:.8rem 1.5rem;cursor:pointer;transition:opacity .2s;">
          Discord로 전송 →
        </button>
        <p id="dc-contact-status" style="color:#10b981;font-size:.88rem;min-height:1.2em;text-align:center;"></p>
      </form>
      <p style="margin-top:1.2rem;text-align:center;">
        <a href="https://discord.gg/${CFG.GUILD_ID}" target="_blank" rel="noopener"
           style="color:#9B8E6E;font-size:.85rem;text-decoration:none;">
          Discord 서버 직접 참여 →
        </a>
      </p>
    </div>
  `;

  const form   = wrapEl.querySelector('#dc-contact-form');
  const status = wrapEl.querySelector('#dc-contact-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = form.querySelector('[name=uname]').value.trim();
    const msg  = form.querySelector('[name=umsg]').value.trim();
    status.style.color = '#9B8E6E';
    status.textContent = '전송 중…';
    try {
      await sendWebhook(name, msg);
      status.style.color = '#10b981';
      status.textContent = '✅ 전송 완료. Discord에서 확인하세요.';
      form.reset();
    } catch {
      status.style.color = '#ef4444';
      status.textContent = '❌ 전송 실패. 잠시 후 재시도';
    }
  });
}