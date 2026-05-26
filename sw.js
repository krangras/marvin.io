const CACHE = 'marvin-v2'
const FILES = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/conspects.js',
  '/integrals_data.js',
  '/semester1_data.js',
  '/firebase-init.js',
  '/firebase-auth.js',
  '/firebase-sync.js',
  '/logo.svg'
]

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES))
  )
  self.skipWaiting()
})

self.addEventListener('activate', e => {
  e.waitUntil(Promise.all([
    caches.keys().then(names =>
      Promise.all(names.filter(n => n !== CACHE).map(n => caches.delete(n)))
    ),
    clients.claim()
  ]))
})

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res && res.ok) {
          const clone = res.clone()
          caches.open(CACHE).then(c => c.put(e.request, clone)).catch(() => {})
        }
        return res
      })
      .catch(() => caches.match(e.request))
  )
})