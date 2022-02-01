importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js"
);

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

  workbox.loadModule("workbox-strategies");

  self.addEventListener("fetch", (event) => {
    if (!event.request.url.startsWith("http")) {
      return;
    }
    if (
      event.request.url.endsWith(".png") ||
      event.request.url.endsWith(".json")
    ) {
      // Referencing workbox.strategies will now work as expected.
      const cacheFirst = new workbox.strategies.CacheFirst();
      event.respondWith(cacheFirst.handle({ event, request: event.request }));
    } else {
      const swr = new workbox.strategies.StaleWhileRevalidate();
      event.respondWith(swr.handle({ event, request: event.request }));
    }
  });
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
