const CACHE = 'adult-literacy-cache-v1'
const URLS = ['/', '/index.html', '/manifest.json', '/sw.js']

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(URLS))
      .catch(() => {})
  )
  self.skipWaiting()
})

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE)
          .map((oldCache) => caches.delete(oldCache))
      )
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((cached) => cached || fetch(evt.request).then((response) => {
      if (evt.request.method === 'GET' && response.ok) {
        const copy = response.clone()
        caches.open(CACHE).then((cache) => cache.put(evt.request, copy))
      }
      return response
    }))
  )
})
