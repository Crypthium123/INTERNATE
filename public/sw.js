const CACHE_NAME = 'internate-v3-cache-v1';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/404.html',
  '/favicon.svg',
  '/contact.html',
  '/css/style.css',
  '/css/theme.css',
  '/js/firebase-config.js',
  '/js/pdf-export.js',
  '/auth/Login_Internate.html',
  '/auth/Register_internate.html',
  '/dashboard/Connected_internate.html',
  '/courses/Ressources_ex.html',
  '/classes/index.html',
  '/profile/index.html',
  '/help/index.html',
  '/legal/Legal.html',
  '/manifest.json',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_URLS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(name => !currentCaches.includes(name));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(name => caches.delete(name)));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

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
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
