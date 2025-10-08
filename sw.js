// Service Worker for Malik Portfolio
// Version 1.0.0

const CACHE_NAME = 'malik-portfolio-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/dark-mode.js',
    '/contact.php',
    '/assets/malik-profile.jpg',
    '/assets/malik-cv.pdf',
    '/favicon.ico',
    '/favicon-32x32.png',
    '/favicon-16x16.png',
    '/apple-touch-icon.png',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                return fetch(event.request).then(
                    function(response) {
                        // Check if we received a valid response
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Background sync for contact form
self.addEventListener('sync', function(event) {
    if (event.tag === 'contact-form-sync') {
        event.waitUntil(syncContactForm());
    }
});

function syncContactForm() {
    return new Promise(function(resolve, reject) {
        // Get pending form submissions from IndexedDB
        // This would be implemented with IndexedDB operations
        // For now, just resolve
        resolve();
    });
}

// Push notifications (for future use)
self.addEventListener('push', function(event) {
    const options = {
        body: event.data ? event.data.text() : 'Nova mensagem no portfolio',
        icon: '/favicon-32x32.png',
        badge: '/favicon-16x16.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Ver portfolio',
                icon: '/favicon-16x16.png'
            },
            {
                action: 'close',
                title: 'Fechar',
                icon: '/favicon-16x16.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Malik Portfolio', options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', function(event) {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message handling from main thread
self.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Network status handling
self.addEventListener('online', function(event) {
    console.log('Back online');
    // Sync any pending data
});

self.addEventListener('offline', function(event) {
    console.log('Gone offline');
    // Handle offline state
});

