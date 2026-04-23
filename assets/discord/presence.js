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
