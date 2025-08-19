const CACHE_NAME = 'tarjeta-v1'; // 1) Cambia a v2 si actualizas archivos

const ASSETS = [                  // 2) Archivos para cache offline
  './',
  './index.html',
  './style.css',
  './app.js',
  './frontruben.png',
  './backruben.png',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {  // 3) Instala y cachea
  event.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();                           // 4) Toma control inmediato
});

self.addEventListener('activate', (event) => {  // 5) Limpia caches viejos
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys
      .filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
  self.clients.claim();                         // 6) Controla todas las pestañas
});

self.addEventListener('fetch', (event) => {     // 7) Respuesta cache-first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;                // 8) Devuelve del cache si existe
      return fetch(event.request).then(resp => { // 9) Si no, va a red y guarda copia
        const copy = resp.clone();
        caches.open(CACHE_NAME).then(c => c.put(event.request, copy));
        return resp;
      }).catch(() => caches.match('./index.html')); // 10) Fallback si no hay red
    })
  );
});
