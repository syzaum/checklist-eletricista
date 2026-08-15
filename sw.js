const CACHE_NAME = "checklist-eletricista-v2";

const ARQUIVOS = [
  "./",
  "./index.html",
  "./manifest.json"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ARQUIVOS);
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (nomes) {
      return Promise.all(
        nomes
          .filter(function (nome) {
            return nome !== CACHE_NAME;
          })
          .map(function (nome) {
            return caches.delete(nome);
          })
      );
    })
  );

  self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request)
      .then(function (resposta) {
        return resposta;
      })
      .catch(function () {
        return caches.match(event.request);
      })
  );
});
