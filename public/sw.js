const CACHE = 'adult-literacy-cache-v1'
const URLS = ['/', '/index.html', '/src/main.tsx', '/src/styles.css']

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE).then(c => c.addAll(URLS)).catch(()=>{})
  )
  self.skipWaiting()
})

self.addEventListener('activate', (evt) => {
  evt.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (evt) => {
  evt.respondWith(caches.match(evt.request).then(r => r || fetch(evt.request)))
})
