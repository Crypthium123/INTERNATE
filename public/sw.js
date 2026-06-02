const CACHE_NAME = 'internate-cache-v3';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/404.html',
  '/offline.html',
  '/favicon.svg',
  '/contact.html',
  '/css/style.css',
  '/css/theme.css',
  '/js/app.js',
  '/js/focus-mode.js',
  '/help/index.html',
  '/legal/Legal.html',
  '/manifest.json',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.allSettled(
        PRECACHE_URLS.map(url =>
          cache.add(url).catch(err => console.error('SW: failed to cache', url, err.message))
        )
      );
    })
  );
});

self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME];
  event.waitUntil(
    (async () => {
      const oldCaches = await caches.keys();
      await Promise.all(oldCaches.filter(name => !currentCaches.includes(name)).map(name => caches.delete(name)));
      await self.clients.claim();
      if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable();
      }
    })()
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) return preloadResponse;
          return await fetch(event.request);
        } catch {
          const cached = await caches.match(event.request);
          if (cached) return cached;
          const offline = await caches.match('/offline.html');
          if (offline) return offline;
          return await caches.match('/404.html');
        }
      })()
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      const fetchPromise = fetch(event.request).then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, clone);
          });
        }
        return response;
      }).catch(function() {
        return cached || caches.match('/offline.html') || caches.match('/404.html');
      });
      return cached || fetchPromise;
    })
  );
});
