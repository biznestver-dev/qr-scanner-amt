const CACHE_NAME = 'qr-scanner-am-v2';
const APP_SHELL = [
  './',
  './index.html',
  './app.js',
  './equipment.js',
  './photo_2026-08-20%2022.44.18.jpeg',
  './manifest.webmanifest',
  'https://unpkg.com/html5-qrcode',
  'https://cdn.jsdelivr.net/npm/qrcode@1.5.4/build/qrcode.min.js',
  'https://telegram.org/js/telegram-web-app.js',
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache =>
    Promise.allSettled(APP_SHELL.map(url => cache.add(url)))
  ));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
  )));
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.hostname.includes('script.google.com') || url.hostname.includes('open-meteo.com')) {
    event.respondWith(fetch(event.request));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match('./index.html'))));
});
