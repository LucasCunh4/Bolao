const CACHE_NAME = 'tga-bolao-silent-v1';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  // Mantive os ícones aqui, mas se você ainda não subiu a pasta "android",
  // o site pode dar erro. Se der erro, remova essas duas linhas abaixo:
  './android/android-launchericon-192-192.png',
  './android/android-launchericon-512-512.png',
  'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
