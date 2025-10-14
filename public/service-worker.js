importScripts('https://js.pusher.com/beams/service-worker.js');

self.addEventListener('push', event => {
  if (event.data) {
    const payload = event.data.json();

    event.waitUntil(
      clients.matchAll({ includeUncontrolled: true }).then(allClients => {
        allClients.forEach(client => client.postMessage(payload));
      })
    );
  }
});
