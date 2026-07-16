const CACHE = 'marvin-v8-structure'
const FILES = [
  '/',
  '/index.html',
  '/assets/css/style.css',
  '/assets/img/logo.svg',
  '/assets/img/agitdu/no_phone2.png',
  '/src/app/app.js',
  '/src/data/conspects.js',
  '/src/data/integrals_data.js',
  '/src/data/semester1_data.js',
  '/src/data/physics_ntk_data.js',
  '/src/auth/firebase-init.js',
  '/src/auth/firebase-auth.js',
  '/src/auth/firebase-sync.js'
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
  const isSelf = e.request.method === 'GET' && new URL(e.request.url).origin === self.location.origin;
  if (!isSelf) return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res && res.ok) {
          const clone = res.clone()
          caches.open(CACHE).then(c => c.put(e.request, clone)).catch(() => {})
        }
        return res
      })
      .catch(() => caches.match(e.request).then(r => r || new Response('', { status: 503 })))
  )
})
