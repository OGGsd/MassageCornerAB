import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'public',
      filename: 'sw.js',
      injectManifest: {
        swSrc: 'public/sw.js',
        swDest: 'dist/sw.js',
        globDirectory: 'dist',
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpeg,jpg,json,woff2}']
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpeg,jpg,json,woff2}'],
        maximumFileSizeToCacheInBytes: 5000000, // 5MB
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheKeyWillBeUsed: async ({ request }) => {
                return `${request.url}?version=1.0.0`;
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          },
          {
            urlPattern: /^https:\/\/www\.bokadirekt\.se\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'booking-system-cache',
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 2 // 2 hours
              },
              plugins: [
                {
                  cacheKeyWillBeUsed: async ({ request }) => {
                    return request.url.split('?')[0]; // Remove query params for caching
                  }
                }
              ]
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          },
          {
            urlPattern: /^.*\/(integritetspolicy|anvandardvillkor|about).*$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'app-routes-cache',
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 1 week
              }
            }
          },
          {
            urlPattern: /\.(?:js|css)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      },
      includeAssets: [
        'logo.png',
        'Olga.png',
        'Favicon/favicon.ico',
        'Favicon/favicon-16x16.png',
        'Favicon/favicon-32x32.png',
        'Favicon/favicon-96x96.png',
        'Favicon/apple-icon-57x57.png',
        'Favicon/apple-icon-60x60.png',
        'Favicon/apple-icon-72x72.png',
        'Favicon/apple-icon-76x76.png',
        'Favicon/apple-icon-114x114.png',
        'Favicon/apple-icon-120x120.png',
        'Favicon/apple-icon-144x144.png',
        'Favicon/apple-icon-152x152.png',
        'Favicon/apple-icon-180x180.png',
        'Favicon/apple-icon-precomposed.png',
        'Favicon/apple-icon.png',
        'Favicon/android-icon-36x36.png',
        'Favicon/android-icon-48x48.png',
        'Favicon/android-icon-72x72.png',
        'Favicon/android-icon-96x96.png',
        'Favicon/android-icon-144x144.png',
        'Favicon/android-icon-192x192.png',
        'Favicon/ms-icon-70x70.png',
        'Favicon/ms-icon-144x144.png',
        'Favicon/ms-icon-150x150.png',
        'Favicon/ms-icon-310x310.png',
        'Favicon/safari-pinned-tab.svg',
        'Favicon/1024x1024.png',
        'apple-touch-icon.png',
        'apple-touch-icon-152x152.png', 
        'apple-touch-icon-1024x1024.png',
        'offline.html',
        'widget-data.json',
        'adaptive-card.json'
      ],
      devOptions: {
        enabled: false,
        type: 'module'
      },
      manifest: {
        name: 'Massage Corner Sverige AB',
        short_name: 'Massage Corner',
        description: 'Vårda din kropp med en härlig massage. Professionell massage i Jönköping - boka din behandling online.',
        theme_color: '#059669',
        background_color: '#059669',
        display: 'standalone',
        display_override: ['fullscreen', 'standalone', 'minimal-ui', 'browser'],
        orientation: 'any',
        scope: '/',
        start_url: '/',
        id: '/',
        categories: ['health', 'wellness', 'lifestyle', 'medical'],
        lang: 'sv',
        dir: 'ltr',
        iarc_rating_id: 'e84b072d-71b3-4d3e-86ae-31a8ce4e53b7',
        prefer_related_applications: false,
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
        launch_handler: {
          client_mode: 'navigate-existing'
        },
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
        screenshots: [
          {
            src: '/Favicon/android-icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            platform: 'wide',
            label: 'Massage Corner - Booking Interface'
          },
          {
            src: '/Favicon/android-icon-192x192.png',
            sizes: '192x192', 
            type: 'image/png',
            platform: 'narrow',
            label: 'Massage Corner - Mobile View'
          }
        ],
        icons: [
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
            src: '/Favicon/apple-icon-152x152.png',
            sizes: '152x152',
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
            src: '/Favicon/1024x1024.png',
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
          
          {
            src: '/Favicon/apple-icon-152x152.png',
            sizes: '152x152',
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
            src: '/Favicon/1024x1024.png',
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
          vendor: ['react', 'react-dom', 'react-router-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react'],
          spring: ['@react-spring/web'],
          motion: ['framer-motion']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
});