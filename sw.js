const CACHE_NAME = 'pwa-cache-v1';
const ASSETS_TO_CACHE = [
  'index.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
];

// ขั้นตอนติดตั้ง Service Worker และเก็บไฟล์ลง Cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// ขั้นตอนการเรียกใช้งานไฟล์ (ดึงข้อมูลจาก Cache แทนเน็ตในกรณีออฟไลน์)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
