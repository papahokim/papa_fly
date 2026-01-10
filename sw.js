// papafly Service Worker v2.0
const CACHE_NAME = 'papafly-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/assets/css/style.css',
  '/assets/css/recipe-page.css',
  '/assets/js/recipe-page.js',
  '/assets/manifest.json',
  '/data/registry.json',
  // Spanish PWA pages
  '/es/',
  '/es/index.html',
  '/es/croqueta-coreana-001/',
  '/es/croqueta-coreana-001/index.html',
  '/es/croqueta-coreana-002/',
  '/es/croqueta-coreana-002/index.html',
  '/es/croqueta-coreana-003/',
  '/es/croqueta-coreana-003/index.html'
];

// Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - Network first, fallback to cache
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip external requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone and cache successful responses
        if (response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
