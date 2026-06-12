// Crowne Plaza Amman — Issue Tracker Service Worker v1.0
const CACHE = 'cp-issues-v1';
const SHELL = [
  './login.html',
  './management.html',
  './department.html',
  './cp_logo.png',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(SHELL).catch(function(err) {
        console.log('[SW] Cache partial fail:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  // Always network for Firebase
  if (e.request.url.includes('firebase') ||
      e.request.url.includes('googleapis.com/identitytoolkit') ||
      e.request.url.includes('firebasestorage')) {
    return;
  }
  e.respondWith(
    fetch(e.request)
      .then(function(res) {
        var clone = res.clone();
        caches.open(CACHE).then(function(c) { c.put(e.request, clone); });
        return res;
      })
      .catch(function() {
        return caches.match(e.request);
      })
  );
});
