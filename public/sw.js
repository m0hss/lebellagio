// Le Bellagio service worker — plain JS, no build step.
// Bump VERSION to ship a new release; old caches are removed on activate.
const VERSION = "v1"
const PRECACHE = `lb-precache-${VERSION}`
const RUNTIME = `lb-runtime-${VERSION}`

const PRECACHE_URLS = [
  "/offline",
  "/logo.svg",
  "/favicon.svg",
  "/site.webmanifest",
  "/menu.pdf",
  "/apple-touch-icon.png",
  "/web-app-manifest-192x192.png",
  "/web-app-manifest-512x512.png",
  "/images/ambience.png",
  "/images/dish-1.png",
  "/images/dish-2.png",
  "/images/dish-3.png",
  "/images/dish-4.png",
  "/images/hero.png",
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== PRECACHE && key !== RUNTIME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  )
})

function isStaticAsset(url) {
  return (
    url.pathname.startsWith("/_next/static") ||
    url.pathname.startsWith("/images/") ||
    url.pathname === "/logo.svg" ||
    url.pathname === "/favicon.svg" ||
    url.pathname === "/favicon.ico" ||
    url.pathname === "/site.webmanifest" ||
    url.pathname === "/menu.pdf" ||
    /\.(png|jpg|jpeg|svg|webp|ico|woff2?)$/.test(url.pathname)
  )
}

async function cacheFirst(request) {
  const cached = await caches.match(request)
  if (cached) return cached

  try {
    const response = await fetch(request)
    if (response.ok && response.type !== "opaque") {
      const cache = await caches.open(RUNTIME)
      cache.put(request, response.clone())
    }
    return response
  } catch (error) {
    if (cached) return cached
    throw error
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request)
    if (response.ok && response.type !== "opaque") {
      const cache = await caches.open(RUNTIME)
      cache.put(request, response.clone())
    }
    return response
  } catch (error) {
    const cached = await caches.match(request)
    if (cached) return cached
    const offline = await caches.match("/offline")
    if (offline) return offline
    throw error
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event
  if (request.method !== "GET") return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return
  if (url.searchParams.has("_rsc")) return

  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(request))
    return
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request))
  }
})
