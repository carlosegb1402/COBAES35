self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('mi-app-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/app.js',
          'icono-512.png',
          'icono-512.png'
        ]);
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
  