const CACHE_NAME = 'tga-bolao-final-v2'; // Nome atualizado para forçar atualização

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './logo-goty.png', // O logo dourado
  './android/android-launchericon-192-192.png', // Ícone App
  './android/android-launchericon-512-512.png', // Ícone App
  'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js'
];

// Instalação
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Ativa imediatamente
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch (Suporte Offline)
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
