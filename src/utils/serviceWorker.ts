(self as unknown as ServiceWorkerGlobalScope).addEventListener(
	"install",
	(event: ExtendableEvent) => {
		event.waitUntil(
			caches.open("weathex-app-cache-v1").then((cache: Cache) => {
				return cache.addAll([
					"/",
					"/index.html",
					"/manifest.webmanifest",
					"/src/assets/icons/weathex-icon-192.png",
					"/src/assets/icons/weathex-icon-512.png"
				]);
			})
		);
	}
);

(self as unknown as ServiceWorkerGlobalScope).addEventListener(
	"fetch",
	(event: FetchEvent) => {
		event.respondWith(
			caches.match(event.request).then((response: Response | undefined) => {
				return response ?? fetch(event.request);
			})
		);
	}
);
