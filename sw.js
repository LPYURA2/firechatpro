const CACHE_NAME = 'firechat-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Установка: кэшируем UI
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Активация: чистим старые кэши
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: отдаём из кэша или сети
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      // Всегда пробуем сеть для HTML (чтобы получить актуальную версию)
      if (e.request.mode === 'navigate') {
        return fetch(e.request).catch(() => cached);
      }
      // Для остального — кэш первым
      return cached || fetch(e.request).catch(() => {
        // Если нет в кэше и сети — отдаём offline fallback
        if (e.request.destination === 'document') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
