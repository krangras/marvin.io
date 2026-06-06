const CACHE = 'marvin-v9'
const STATIC_ASSETS = [
  '/style.css', '/script.js', '/conspects.js',
  '/integrals_data.js', '/semester1_data.js',
  '/physics_ntk_data.js', '/firebase-init.js',
  '/firebase-auth.js', '/firebase-sync.js', '/logo.svg'
]
const HTML_ASSETS = ['/', '/index.html']
const ALL_ASSETS = STATIC_ASSETS.concat(HTML_ASSETS)
const TTL = 4 * 60 * 60 * 1000

function isHTML(url) {
  return HTML_ASSETS.indexOf(new URL(url).pathname) !== -1
}

function isStatic(url) {
  return STATIC_ASSETS.indexOf(new URL(url).pathname) !== -1
}

function fresh(key) {
  return caches.open(CACHE).then(function (c) {
    return c.match(key).then(function (r) {
      if (!r) return false
      var h = r.headers.get('sw-time')
      return h && (Date.now() - parseInt(h, 10)) < TTL
    })
  })
}

function cacheAndReturn(req, res) {
  if (res && res.ok) {
    var clone = res.clone()
    var ts = Date.now().toString()
    var tagged = new Response(clone.body, {
      status: clone.status,
      statusText: clone.statusText,
      headers: clone.headers
    })
    tagged.headers.set('sw-time', ts)
    caches.open(CACHE).then(function (c) { c.put(req, tagged) }).catch(function () {})
  }
  return res
}

function networkFirst(req) {
  return fetch(req).then(function (res) {
    return cacheAndReturn(req, res)
  }).catch(function () {
    return caches.match(req).then(function (r) {
      return r || new Response('Offline', { status: 503, statusText: 'Offline' })
    })
  })
}

function cacheFirst(req) {
  return caches.match(req).then(function (cached) {
    return fresh(req).then(function (isFresh) {
      if (isFresh) return cached
      fetch(req).then(function (res) { cacheAndReturn(req, res) }).catch(function () {})
      return cached || networkFirst(req)
    })
  })
}

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return Promise.allSettled(ALL_ASSETS.map(function (url) {
        return c.add(url)
      }))
    })
  )
  self.skipWaiting()
})

self.addEventListener('activate', function (e) {
  e.waitUntil(Promise.all([
    caches.keys().then(function (names) {
      return Promise.all(
        names.filter(function (n) { return n !== CACHE })
             .map(function (n) { return caches.delete(n) })
      )
    }),
    clients.claim()
  ]))
})

self.addEventListener('fetch', function (e) {
  var url = new URL(e.request.url)
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return

  if (isHTML(url)) {
    e.respondWith(networkFirst(e.request))
  } else if (isStatic(url)) {
    e.respondWith(cacheFirst(e.request))
  }
})
