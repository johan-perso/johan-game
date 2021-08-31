self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('pwa-assets').then(cache => 
      {
        return cache.addAll([
          '/',
          '/play',
          '/play/dormir',
          '/play/manger',
          '/play/manger/mcdo',
          '/play/manger/mcdo/travailler',
          '/play/manger/mcdo/manger',
          '/play/manger/attendre',
          '/play/toilettes',
          '/play/ordinateur',
          '/play/ordinateur/lidl',
          '/play/ordinateur/maj',
          '/play/ordinateur/jeu',
          '/play/ordinateur/cromebouque',
          '/play/ordinateur/ubuntu',
          '/play/bus/',
          '/play/bus/attendre',
          '/play/bus/rentrer',
          '/play/bus/rentrer/continuer',
          '/play/bus/rentrer/sortir',
          '/play/bus/rater',
          '/play/ecole',
          '/play/ecole/secher',
          '/play/ecole/aller',
          '/play/ecole/aller/reviser',
          '/play/ecole/aller/au-talent',
          '/play/ecole/aller/tricher',
          '/play/ecole/aller/supplier',
          '/play/ecole/distance',
          '/play/ecole/stickman',
          '/a-propos',
          '/style.css',
          '/favicon.png',
          '/icone.png',
          '/manifest.json',
          '/sw.js',
          '/404',
        ])
      })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});