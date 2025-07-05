import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpeg,jpg,json}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          },
          {
            urlPattern: /^https:\/\/www\.bokadirekt\.se\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'booking-system-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 // 1 day
              },
              networkTimeoutSeconds: 10
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          },
          // Cache Swedish routes specifically
          {
            urlPattern: /^.*\/(integritetspolicy|anvandardvillkor|about|om-oss).*$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'app-routes-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 1 week
              },
              networkTimeoutSeconds: 3
            }
          }
        ],
        // Critical: Fallback to main app for SPA routing, not offline page
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [
          // Don't fallback for:
          /^\/_/, // Vite internal routes
          /\/[^/?]+\.[^/]+$/, // Files with extensions
          /^\/api\//, // API routes
          /^\/assets\//, // Asset files
          /^\/sw\.js$/, // Service worker
          /^\/manifest\.json$/, // Manifest
          /^\/offline\.html$/, // Offline page itself
          /^\/widget-data\.json$/, // Widget data
          /^\/adaptive-card\.json$/ // Adaptive card
        ],
        // Include Swedish routes in precaching
        navigateFallbackAllowlist: [
          /^\/$/,  // Home
          /^\/about$/,  // About
          /^\/om-oss$/,  // Swedish about
          /^\/integritetspolicy$/,  // Swedish privacy
          /^\/anvandardvillkor$/,  // Swedish terms
          /^\/privacy$/,  // English privacy (redirects)
          /^\/terms$/   // English terms (redirects)
        ],
        skipWaiting: true,
        clientsClaim: true,
        // Handle offline scenarios separately
        offlineGoogleAnalytics: false,
        cleanupOutdatedCaches: true
      },
      includeAssets: [
        'logo.png',
        'Favicon/favicon.ico',
        'Favicon/favicon-16x16.png',
        'Favicon/favicon-32x32.png',
        'Favicon/favicon-48x48.png',
        'Favicon/favicon-64x64.png',
        'Favicon/favicon-96x96.png',
        'Favicon/favicon-128x128.png',
        'Favicon/favicon-256x256.png',
        'Favicon/favicon-384x384.png',
        'Favicon/favicon-512x512.png',
        'Favicon/apple-icon-57x57.png',
        'Favicon/apple-icon-60x60.png',
        'Favicon/apple-icon-72x72.png',
        'Favicon/apple-icon-76x76.png',
        'Favicon/apple-icon-114x114.png',
        'Favicon/apple-icon-120x120.png',
        'Favicon/apple-icon-144x144.png',
        'Favicon/apple-icon-152x152.png',
        'Favicon/apple-icon-180x180.png',
        'Favicon/apple-icon.png',
        'Favicon/apple-icon-precomposed.png',
        'Favicon/android-icon-36x36.png',
        'Favicon/android-icon-48x48.png',
        'Favicon/android-icon-72x72.png',
        'Favicon/android-icon-96x96.png',
        'Favicon/android-icon-144x144.png',
        'Favicon/android-icon-192x192.png',
        'Favicon/android-chrome-256x256.png',
        'Favicon/android-chrome-384x384.png',
        'Favicon/android-chrome-512x512.png',
        'Favicon/ms-icon-70x70.png',
        'Favicon/ms-icon-144x144.png',
        'Favicon/ms-icon-150x150.png',
        'Favicon/ms-icon-310x310.png',
        'Favicon/mstile-270x270.png',
        'Favicon/mstile-310x150.png',
        'Favicon/mstile-310x310.png',
        'Favicon/safari-pinned-tab.svg',
        'Favicon/1024x1024.png',
        'offline.html',
        'widget-data.json',
        'adaptive-card.json'
      ],
      manifest: {
        name: 'Massage Corner Sverige AB',
        short_name: 'Massage Corner',
        description: 'Vårda din kropp med en härlig massage. Professionell massage i Jönköping - boka din behandling online.',
        theme_color: '#059669',
        background_color: '#059669',
        display: 'standalone',
        display_override: ['fullscreen', 'standalone', 'minimal-ui', 'browser'],
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        categories: ['health', 'wellness', 'lifestyle', 'medical'],
        lang: 'sv',
        edge_side_panel: {
          preferred_width: 400
        },
        file_handlers: [
          {
            action: '/',
            accept: {
              'text/calendar': ['.ics'],
              'application/pdf': ['.pdf']
            }
          }
        ],
        handle_links: 'preferred',
        protocol_handlers: [
          {
            protocol: 'tel',
            url: 'tel:%s'
          },
          {
            protocol: 'mailto', 
            url: 'mailto:%s'
          }
        ],
        share_target: {
          action: '/',
          method: 'GET',
          params: {
            title: 'title',
            text: 'text',
            url: 'url'
          }
        },
        widgets: [
          {
            name: 'Snabbbokning',
            description: 'Boka massage snabbt',
            tag: 'quick-booking',
            template: 'quick-booking-template',
            ms_ac_template: 'adaptive-card.json',
            data: '/widget-data.json',
            type: 'application/json',
            screenshots: [
              {
                src: '/logo.png',
                sizes: '192x192',
                label: 'Massage Corner Widget'
              }
            ],
            icons: [
              {
                src: '/logo.png',
                sizes: '72x72'
              }
            ]
          }
        ],
        icons: [
          // Any purpose icons
          {
            src: '/Favicon/favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/Favicon/favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/Favicon/favicon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/Favicon/apple-icon-180x180.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/Favicon/android-icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/Favicon/favicon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/Favicon/1024x1024.png',
            sizes: '1024x1024',
            type: 'image/png',
            purpose: 'any'
          },
          
          // Maskable purpose icons (separate entries for adaptive icons)
          {
            src: '/Favicon/favicon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/Favicon/apple-icon-180x180.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/Favicon/android-icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/Favicon/favicon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/Favicon/1024x1024.png',
            sizes: '1024x1024',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        shortcuts: [
          {
            name: 'Boka medicinsk massage',
            short_name: 'Medicinsk',
            description: 'Boka medicinsk massage med ultraljudbehandling',
            url: '/?category=medicinsk',
            icons: [
              {
                src: '/Favicon/android-icon-96x96.png',
                sizes: '96x96'
              }
            ]
          },
          {
            name: 'Boka klassisk massage', 
            short_name: 'Klassisk',
            description: 'Boka djupgående klassisk massage',
            url: '/?category=klassisk',
            icons: [
              {
                src: '/Favicon/android-icon-96x96.png',
                sizes: '96x96'
              }
            ]
          },
          {
            name: 'Ring oss',
            short_name: 'Ring',
            description: 'Ring Massage Corner direkt',
            url: 'tel:0731759567',
            icons: [
              {
                src: '/Favicon/android-icon-96x96.png',
                sizes: '96x96'
              }
            ]
          }
        ]
      },
      devOptions: {
        enabled: false
      }
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react'],
          spring: ['@react-spring/web']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});