import { CFG } from './config.js';

const REDIR = `${location.origin}/auth/callback.html`;

export function getUser() {
  const raw = localStorage.getItem('discord_user');
  return raw ? JSON.parse(raw) : null;
}

export function login() {
  const p = new URLSearchParams({
    client_id:     CFG.OAUTH_CID,
    redirect_uri:  REDIR,
    response_type: 'token',
    scope:         'identify',
  });
  location.href = `https://discord.com/oauth2/authorize?${p}`;
}

export function logout() {
  localStorage.removeItem('discord_user');
  location.reload();
}

export function renderAuthBtn(el) {
  const user = getUser();
  if (user) {
    el.innerHTML = `<img src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=32" class="avatar"> ${user.username} <button id="logoutBtn">로그아웃</button>`;
    el.querySelector('#logoutBtn').onclick = logout;
  } else {
    el.innerHTML = `<button id="loginBtn">Discord 로그인</button>`;
    el.querySelector('#loginBtn').onclick = login;
  }
}