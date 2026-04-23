import { CFG } from './config.js';

export function injectChat(el) {
  const f = document.createElement('iframe');
  f.src = CFG.WB_CHAT;
  f.width = '100%';
  f.height = '500';
  f.style.cssText = 'border:none;border-radius:12px;';
  f.allow = 'clipboard-write';
  el.appendChild(f);
}

export function injectForum(el) {
  const f = document.createElement('iframe');
  f.src = CFG.WB_FORUM;
  f.width = '100%';
  f.height = '640';
  f.style.cssText = 'border:none;border-radius:12px;';
  el.appendChild(f);
}