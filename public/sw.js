// Industry-Leading Service Worker - PWA Builder Optimized
import { precacheAndRoute } from 'workbox-precaching';

const CACHE_NAME = 'massage-corner-v1.0.0';
const OFFLINE_URL = '/offline.html';

// Precache and route files using Workbox
precacheAndRoute(self.__WB_MANIFEST);

// Install event - Skip waiting for immediate activation
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(() => {
        console.log('Service Worker installed successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Failed to install service worker:', error);
      })
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all clients
      self.clients.claim()
    ]).then(() => {
      console.log('Service Worker activated successfully');
    })
  );
});

// Fetch event - Advanced caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external domains except allowed ones
  if (url.origin !== self.location.origin && 
      !url.hostname.includes('bokadirekt.se') &&
      !url.hostname.includes('fonts.googleapis.com') &&
      !url.hostname.includes('fonts.gstatic.com')) {
    return;
  }

  event.respondWith(
    (async () => {
      try {
        // Strategy 1: Network First for HTML pages and API calls
        if (request.destination === 'document' || 
            url.pathname.includes('/api/') ||
            url.hostname.includes('bokadirekt.se')) {
          
          try {
            const networkResponse = await fetch(request);
            
            // Cache successful responses
            if (networkResponse.ok) {
              const cache = await caches.open(CACHE_NAME);
              cache.put(request, networkResponse.clone());
            }
            
            return networkResponse;
          } catch (networkError) {
            console.log('Network failed, trying cache:', request.url);
            
            const cachedResponse = await caches.match(request);
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // Return offline page for navigation requests
            if (request.destination === 'document') {
              return caches.match(OFFLINE_URL);
            }
            
            throw networkError;
          }
        }

        // Strategy 2: Cache First for static assets
        if (request.destination === 'image' || 
            request.destination === 'style' || 
            request.destination === 'script' ||
            request.destination === 'font' ||
            url.pathname.includes('/Favicon/') ||
            url.pathname.includes('/assets/')) {
          
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }
          
          try {
            const networkResponse = await fetch(request);
            
            if (networkResponse.ok) {
              const cache = await caches.open(CACHE_NAME);
              cache.put(request, networkResponse.clone());
            }
            
            return networkResponse;
          } catch (networkError) {
            console.log('Failed to fetch asset:', request.url);
            throw networkError;
          }
        }

        // Strategy 3: Stale While Revalidate for other requests
        const cachedResponse = await caches.match(request);
        
        const fetchPromise = fetch(request).then((networkResponse) => {
          if (networkResponse.ok) {
            const cache = caches.open(CACHE_NAME);
            cache.then(c => c.put(request, networkResponse.clone()));
          }
          return networkResponse;
        }).catch(() => {
          console.log('Network failed for:', request.url);
        });

        return cachedResponse || await fetchPromise;

      } catch (error) {
        console.error('Fetch handler error:', error);
        
        // Fallback for navigation requests
        if (request.destination === 'document') {
          return caches.match(OFFLINE_URL);
        }
        
        throw error;
      }
    })()
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle background sync tasks
      Promise.resolve().then(() => {
        console.log('Background sync completed');
      })
    );
  }
});

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'Ny uppdatering från Massage Corner',
    icon: '/Favicon/android-icon-192x192.png',
    badge: '/Favicon/android-icon-96x96.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Öppna app',
        icon: '/Favicon/android-icon-96x96.png'
      },
      {
        action: 'close',
        title: 'Stäng'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Massage Corner', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event.action);
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handling for client communication
self.addEventListener('message', (event) => {
  console.log('Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Periodic background sync
self.addEventListener('periodicsync', (event) => {
  console.log('Periodic sync triggered:', event.tag);
  
  if (event.tag === 'content-sync') {
    event.waitUntil(
      // Sync content in background
      Promise.resolve().then(() => {
        console.log('Periodic sync completed');
      })
    );
  }
});

console.log('Service Worker loaded successfully');