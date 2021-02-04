const CACHE_NAME = 'version-1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/static/js/2.44f64547.chunk.js',
  '/static/js/main.14cd8e64.chunk.js',
  '/static/js/8.2cc50e72.chunk.js',
  '/static/css/8.01f28ce7.chunk.css',
  '/static/css/main.4b11eda5.chunk.css',
  '/static/css/css2?family=Source+Code+Pro:wght@600&display=swap',
  '/static/css/css2?family=Open+Sans+Condensed:wght@300&display=swap',
  '/web-fonts/webfonts/z7NFdQDnbTkabZAIOl9il_O6KJj73e7Ff1GhDuXMRw.woff2',
  '/logo192.png',
  '/logo512.png',
  '/images/crown.png',
  '/images/crwn-192x192.png',
  '/images/crwn-512x512.png',
  '/static/media/crown.3a4e2b15.svg',
  '/crown.png',
];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // console.log('Opened cache');

      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Listen for requests

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

// Activate the SW
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
