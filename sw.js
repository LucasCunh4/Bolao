const CACHE_NAME = 'tga-bolao-bingo-v3'; // Mudei para v3 para forçar atualização
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './android/android-launchericon-192-192.png', // Caminho atualizado
  './android/android-launchericon-512-512.png', // Caminho atualizado
  'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js',
  './sons/heartbeat.mp3',
  './sons/applause.mp3',
  './sons/explosion.mp3'
];

// Instalação
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch (Offline support)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Limpeza de cache antigo
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
