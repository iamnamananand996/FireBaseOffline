var CACHE_NAME = "pwa-task-manager";
var urlsToCache = [
	"index.html",
	"../../src/App.css",
	"../../src/App.js",
	"../../src/MainPage.js",
	"manifest.json",
	"favicon.ico",
	"../node_modules"
];

// Install a service worker
self.addEventListener("install", event => {
	// Perform install steps
	event.waitUntil(
		caches.open(CACHE_NAME).then(function(cache) {
			console.log("Opened cache");
			console.log(urlsToCache);
			return cache.addAll(urlsToCache);
		})
	);
});

// Cache and return requests
self.addEventListener("fetch", event => {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			// Cache hit - return response
			if (response) {
				return response;
			}
			return fetch(event.request);
		})
	);
});

// Update a service worker
self.addEventListener("activate", event => {
	var cacheWhitelist = ["pwa-task-manager"];
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cacheName => {
					if (cacheWhitelist.indexOf(cacheName) === -1) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});
