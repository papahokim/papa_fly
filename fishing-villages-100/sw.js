"use strict";

const scope = new URL(self.registration.scope);
const prefix = "fishing-villages-100:" + scope.pathname + ":";
const cacheName = prefix + "v1";
const shell = new URL("./index.html",scope).href;
const assets = [shell,new URL("./manifest.webmanifest",scope).href,new URL("./icon.svg",scope).href];

self.addEventListener("install",event=>{
  event.waitUntil((async ()=>{
    const cache = await caches.open(cacheName);
    await cache.addAll(assets.map(url=>new Request(url,{cache:"reload"})));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate",event=>{
  event.waitUntil((async ()=>{
    const keys = await caches.keys();
    await Promise.all(keys.filter(key=>key.startsWith(prefix) && key !== cacheName).map(key=>caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch",event=>{
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== scope.origin) return;

  const navigation = request.mode === "navigate" &&
    (url.pathname === scope.pathname || url.pathname === new URL(shell).pathname);
  if (navigation) {
    event.respondWith((async ()=>{
      try {
        const response = await fetch(request);
        if (response.status < 500) return response;
      } catch {
        // 연결이 없으면 저장한 앱 화면을 반환합니다.
      }
      const cache = await caches.open(cacheName);
      return (await cache.match(shell)) || Response.error();
    })());
    return;
  }
  if (assets.includes(url.href)) {
    event.respondWith((async ()=>{
      const cache = await caches.open(cacheName);
      return (await cache.match(request)) || fetch(request);
    })());
  }
});
