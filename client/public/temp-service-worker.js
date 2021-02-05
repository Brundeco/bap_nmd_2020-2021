const CACHE_NAME = 'static-cache-v1.5.5';
const DATA_CACHE_NAME = 'data-cache';


const FILES_TO_CACHE = [
    "/index.html",
    "/matematicas/",
    "/fisica/",
    "/contacto/",
    "/scripts/MatematicasJS.js",
    "/scripts/FisicaJS.js",
    "/css/CommonStyle.css",
    "/scripts/ActivacionContacto.js",
    "/scripts/install.js",
    "/manifest.webmanifest",
    "/sobre-narioh/",
    "/scripts/lazysizes.min.js",
    "/img/512narioh.png",
    "/img/192narioh.png",
    "/img/LogoNarioh.webp",
    "/img/Calculadora1.webp",
    "/img/LogoNarioh.png",
    "/img/Calculadora1.png",
    "/img/512narioh.webp",
    "/img/maskable_icon.webp",
    "/img/correosoporte.png",
    "/favicon.ico",
    "/soporte/",
    "/soporte/offline.html",
    "/soporte/funcionamiento.html",
    "/soporte/FAQ.html",
    "/err/404.html",
    "/scripts/math.js",
    "/sw.js",
    "/sitemap.xml",
    "/robots.txt",
    "/scripts/Consent.js",
    "/scripts/math.js.map",
    "/notas-version/",

    "/aviso-legal/",
    "/privacidad/",
    "/cookies/",
    "/xpress/",
    "/scripts/xpress.js",
    "/img/datoslegales.png",
    "/utilidades/",
    "/scripts/Utilidades.js",
    "/img/monedacara.png",
    "/img/monedacruz.png"
];

self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install');
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(FILES_TO_CACHE);
        }).then(self.skipWaiting())
    );


});

self.addEventListener('activate', (evt) => {
    console.log('[ServiceWorker] Activate');

    evt.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );

    self.clients.claim();
});
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

workbox.googleAnalytics.initialize();

self.addEventListener('fetch', (evt) => {
    console.log('[ServiceWorker] Fetch', evt.request.url);
    if (evt.request.url.includes('nariohtools.com/')) {
        evt.respondWith(

            caches.open(CACHE_NAME).then(cache => {
                return cache.match(evt.request).then(cacheResponse => cacheResponse || fetch(evt.request).then(networkResponse => {
                    cache.put(evt.request, networkResponse.clone());
                    return networkResponse;
                }));

            }))

    } else {
        evt.respondWith(
            fetch(evt.request)
        )
    }


});