// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///home/project/node_modules/vite-plugin-pwa/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      strategies: "generateSW",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpeg,jpg,json}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
                // 1 year
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
                // 1 year
              }
            }
          },
          {
            urlPattern: /^https:\/\/www\.bokadirekt\.se\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "booking-system-cache",
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24
                // 1 day
              },
              networkTimeoutSeconds: 10
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30
                // 30 days
              }
            }
          },
          // Cache Swedish routes specifically
          {
            urlPattern: /^.*\/(integritetspolicy|anvandardvillkor|about|om-oss).*$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "app-routes-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7
                // 1 week
              },
              networkTimeoutSeconds: 3
            }
          }
        ],
        // Critical: Fallback to main app for SPA routing, not offline page
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [
          // Don't fallback for:
          /^\/_/,
          // Vite internal routes
          /\/[^/?]+\.[^/]+$/,
          // Files with extensions
          /^\/api\//,
          // API routes
          /^\/assets\//,
          // Asset files
          /^\/sw\.js$/,
          // Service worker
          /^\/manifest\.json$/,
          // Manifest
          /^\/offline\.html$/,
          // Offline page itself
          /^\/widget-data\.json$/,
          // Widget data
          /^\/adaptive-card\.json$/
          // Adaptive card
        ],
        // Include Swedish routes in precaching
        navigateFallbackAllowlist: [
          /^\/$/,
          // Home
          /^\/about$/,
          // About
          /^\/om-oss$/,
          // Swedish about
          /^\/integritetspolicy$/,
          // Swedish privacy
          /^\/anvandardvillkor$/,
          // Swedish terms
          /^\/privacy$/,
          // English privacy (redirects)
          /^\/terms$/
          // English terms (redirects)
        ],
        skipWaiting: true,
        clientsClaim: true,
        // Handle offline scenarios separately
        offlineGoogleAnalytics: false,
        cleanupOutdatedCaches: true
      },
      includeAssets: [
        "logo.png",
        "Favicon/favicon.ico",
        "Favicon/favicon-16x16.png",
        "Favicon/favicon-32x32.png",
        "Favicon/favicon-48x48.png",
        "Favicon/favicon-64x64.png",
        "Favicon/favicon-96x96.png",
        "Favicon/favicon-128x128.png",
        "Favicon/favicon-256x256.png",
        "Favicon/favicon-384x384.png",
        "Favicon/favicon-512x512.png",
        "Favicon/apple-icon-57x57.png",
        "Favicon/apple-icon-60x60.png",
        "Favicon/apple-icon-72x72.png",
        "Favicon/apple-icon-76x76.png",
        "Favicon/apple-icon-114x114.png",
        "Favicon/apple-icon-120x120.png",
        "Favicon/apple-icon-144x144.png",
        "Favicon/apple-icon-152x152.png",
        "Favicon/apple-icon-180x180.png",
        "Favicon/apple-icon.png",
        "Favicon/apple-icon-precomposed.png",
        "Favicon/android-icon-36x36.png",
        "Favicon/android-icon-48x48.png",
        "Favicon/android-icon-72x72.png",
        "Favicon/android-icon-96x96.png",
        "Favicon/android-icon-144x144.png",
        "Favicon/android-icon-192x192.png",
        "Favicon/android-chrome-256x256.png",
        "Favicon/android-chrome-384x384.png",
        "Favicon/android-chrome-512x512.png",
        "Favicon/ms-icon-70x70.png",
        "Favicon/ms-icon-144x144.png",
        "Favicon/ms-icon-150x150.png",
        "Favicon/ms-icon-310x310.png",
        "Favicon/mstile-270x270.png",
        "Favicon/mstile-310x150.png",
        "Favicon/mstile-310x310.png",
        "Favicon/safari-pinned-tab.svg",
        "Favicon/1024x1024.png",
        "offline.html",
        "widget-data.json",
        "adaptive-card.json"
      ],
      manifest: {
        name: "Massage Corner Sverige AB",
        short_name: "Massage Corner",
        description: "V\xE5rda din kropp med en h\xE4rlig massage. Professionell massage i J\xF6nk\xF6ping - boka din behandling online.",
        theme_color: "#059669",
        background_color: "#059669",
        display: "standalone",
        display_override: ["fullscreen", "standalone", "minimal-ui", "browser"],
        orientation: "portrait-primary",
        scope: "/",
        start_url: "/",
        categories: ["health", "wellness", "lifestyle", "medical"],
        lang: "sv",
        edge_side_panel: {
          preferred_width: 400
        },
        file_handlers: [
          {
            action: "/",
            accept: {
              "text/calendar": [".ics"],
              "application/pdf": [".pdf"]
            }
          }
        ],
        handle_links: "preferred",
        protocol_handlers: [
          {
            protocol: "tel",
            url: "tel:%s"
          },
          {
            protocol: "mailto",
            url: "mailto:%s"
          }
        ],
        share_target: {
          action: "/",
          method: "GET",
          params: {
            title: "title",
            text: "text",
            url: "url"
          }
        },
        widgets: [
          {
            name: "Snabbbokning",
            description: "Boka massage snabbt",
            tag: "quick-booking",
            template: "quick-booking-template",
            ms_ac_template: "adaptive-card.json",
            data: "/widget-data.json",
            type: "application/json",
            screenshots: [
              {
                src: "/logo.png",
                sizes: "192x192",
                label: "Massage Corner Widget"
              }
            ],
            icons: [
              {
                src: "/logo.png",
                sizes: "72x72"
              }
            ]
          }
        ],
        icons: [
          // Any purpose icons
          {
            src: "/Favicon/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/Favicon/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/Favicon/favicon-96x96.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/Favicon/apple-icon-180x180.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/Favicon/android-icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/Favicon/favicon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/Favicon/1024x1024.png",
            sizes: "1024x1024",
            type: "image/png",
            purpose: "any"
          },
          // Maskable purpose icons (separate entries for adaptive icons)
          {
            src: "/Favicon/favicon-96x96.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/Favicon/apple-icon-180x180.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/Favicon/android-icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/Favicon/favicon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/Favicon/1024x1024.png",
            sizes: "1024x1024",
            type: "image/png",
            purpose: "maskable"
          }
        ],
        shortcuts: [
          {
            name: "Boka medicinsk massage",
            short_name: "Medicinsk",
            description: "Boka medicinsk massage med ultraljudbehandling",
            url: "/?category=medicinsk",
            icons: [
              {
                src: "/Favicon/android-icon-96x96.png",
                sizes: "96x96"
              }
            ]
          },
          {
            name: "Boka klassisk massage",
            short_name: "Klassisk",
            description: "Boka djupg\xE5ende klassisk massage",
            url: "/?category=klassisk",
            icons: [
              {
                src: "/Favicon/android-icon-96x96.png",
                sizes: "96x96"
              }
            ]
          },
          {
            name: "Ring oss",
            short_name: "Ring",
            description: "Ring Massage Corner direkt",
            url: "tel:0731759567",
            icons: [
              {
                src: "/Favicon/android-icon-96x96.png",
                sizes: "96x96"
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
    exclude: ["lucide-react"]
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          icons: ["lucide-react"],
          spring: ["@react-spring/web"]
        }
      }
    },
    chunkSizeWarningLimit: 1e3
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIFZpdGVQV0Eoe1xuICAgICAgcmVnaXN0ZXJUeXBlOiAnYXV0b1VwZGF0ZScsXG4gICAgICBzdHJhdGVnaWVzOiAnZ2VuZXJhdGVTVycsXG4gICAgICB3b3JrYm94OiB7XG4gICAgICAgIGdsb2JQYXR0ZXJuczogWycqKi8qLntqcyxjc3MsaHRtbCxpY28scG5nLHN2ZyxqcGVnLGpwZyxqc29ufSddLFxuICAgICAgICBydW50aW1lQ2FjaGluZzogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVybFBhdHRlcm46IC9eaHR0cHM6XFwvXFwvZm9udHNcXC5nb29nbGVhcGlzXFwuY29tXFwvLiovaSxcbiAgICAgICAgICAgIGhhbmRsZXI6ICdDYWNoZUZpcnN0JyxcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgY2FjaGVOYW1lOiAnZ29vZ2xlLWZvbnRzLWNhY2hlJyxcbiAgICAgICAgICAgICAgZXhwaXJhdGlvbjoge1xuICAgICAgICAgICAgICAgIG1heEVudHJpZXM6IDEwLFxuICAgICAgICAgICAgICAgIG1heEFnZVNlY29uZHM6IDYwICogNjAgKiAyNCAqIDM2NSAvLyAxIHllYXJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXJsUGF0dGVybjogL15odHRwczpcXC9cXC9mb250c1xcLmdzdGF0aWNcXC5jb21cXC8uKi9pLFxuICAgICAgICAgICAgaGFuZGxlcjogJ0NhY2hlRmlyc3QnLFxuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICBjYWNoZU5hbWU6ICdnc3RhdGljLWZvbnRzLWNhY2hlJyxcbiAgICAgICAgICAgICAgZXhwaXJhdGlvbjoge1xuICAgICAgICAgICAgICAgIG1heEVudHJpZXM6IDEwLFxuICAgICAgICAgICAgICAgIG1heEFnZVNlY29uZHM6IDYwICogNjAgKiAyNCAqIDM2NSAvLyAxIHllYXJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXJsUGF0dGVybjogL15odHRwczpcXC9cXC93d3dcXC5ib2thZGlyZWt0XFwuc2VcXC8uKi9pLFxuICAgICAgICAgICAgaGFuZGxlcjogJ05ldHdvcmtGaXJzdCcsXG4gICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgIGNhY2hlTmFtZTogJ2Jvb2tpbmctc3lzdGVtLWNhY2hlJyxcbiAgICAgICAgICAgICAgZXhwaXJhdGlvbjoge1xuICAgICAgICAgICAgICAgIG1heEVudHJpZXM6IDIwLFxuICAgICAgICAgICAgICAgIG1heEFnZVNlY29uZHM6IDYwICogNjAgKiAyNCAvLyAxIGRheVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBuZXR3b3JrVGltZW91dFNlY29uZHM6IDEwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1cmxQYXR0ZXJuOiAvXFwuKD86cG5nfGpwZ3xqcGVnfHN2Z3xnaWZ8d2VicCkkLyxcbiAgICAgICAgICAgIGhhbmRsZXI6ICdDYWNoZUZpcnN0JyxcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgY2FjaGVOYW1lOiAnaW1hZ2VzLWNhY2hlJyxcbiAgICAgICAgICAgICAgZXhwaXJhdGlvbjoge1xuICAgICAgICAgICAgICAgIG1heEVudHJpZXM6IDEwMCxcbiAgICAgICAgICAgICAgICBtYXhBZ2VTZWNvbmRzOiA2MCAqIDYwICogMjQgKiAzMCAvLyAzMCBkYXlzXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIC8vIENhY2hlIFN3ZWRpc2ggcm91dGVzIHNwZWNpZmljYWxseVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVybFBhdHRlcm46IC9eLipcXC8oaW50ZWdyaXRldHNwb2xpY3l8YW52YW5kYXJkdmlsbGtvcnxhYm91dHxvbS1vc3MpLiokLyxcbiAgICAgICAgICAgIGhhbmRsZXI6ICdOZXR3b3JrRmlyc3QnLFxuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICBjYWNoZU5hbWU6ICdhcHAtcm91dGVzLWNhY2hlJyxcbiAgICAgICAgICAgICAgZXhwaXJhdGlvbjoge1xuICAgICAgICAgICAgICAgIG1heEVudHJpZXM6IDUwLFxuICAgICAgICAgICAgICAgIG1heEFnZVNlY29uZHM6IDYwICogNjAgKiAyNCAqIDcgLy8gMSB3ZWVrXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIG5ldHdvcmtUaW1lb3V0U2Vjb25kczogM1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgLy8gQ3JpdGljYWw6IEZhbGxiYWNrIHRvIG1haW4gYXBwIGZvciBTUEEgcm91dGluZywgbm90IG9mZmxpbmUgcGFnZVxuICAgICAgICBuYXZpZ2F0ZUZhbGxiYWNrOiAnL2luZGV4Lmh0bWwnLFxuICAgICAgICBuYXZpZ2F0ZUZhbGxiYWNrRGVueWxpc3Q6IFtcbiAgICAgICAgICAvLyBEb24ndCBmYWxsYmFjayBmb3I6XG4gICAgICAgICAgL15cXC9fLywgLy8gVml0ZSBpbnRlcm5hbCByb3V0ZXNcbiAgICAgICAgICAvXFwvW14vP10rXFwuW14vXSskLywgLy8gRmlsZXMgd2l0aCBleHRlbnNpb25zXG4gICAgICAgICAgL15cXC9hcGlcXC8vLCAvLyBBUEkgcm91dGVzXG4gICAgICAgICAgL15cXC9hc3NldHNcXC8vLCAvLyBBc3NldCBmaWxlc1xuICAgICAgICAgIC9eXFwvc3dcXC5qcyQvLCAvLyBTZXJ2aWNlIHdvcmtlclxuICAgICAgICAgIC9eXFwvbWFuaWZlc3RcXC5qc29uJC8sIC8vIE1hbmlmZXN0XG4gICAgICAgICAgL15cXC9vZmZsaW5lXFwuaHRtbCQvLCAvLyBPZmZsaW5lIHBhZ2UgaXRzZWxmXG4gICAgICAgICAgL15cXC93aWRnZXQtZGF0YVxcLmpzb24kLywgLy8gV2lkZ2V0IGRhdGFcbiAgICAgICAgICAvXlxcL2FkYXB0aXZlLWNhcmRcXC5qc29uJC8gLy8gQWRhcHRpdmUgY2FyZFxuICAgICAgICBdLFxuICAgICAgICAvLyBJbmNsdWRlIFN3ZWRpc2ggcm91dGVzIGluIHByZWNhY2hpbmdcbiAgICAgICAgbmF2aWdhdGVGYWxsYmFja0FsbG93bGlzdDogW1xuICAgICAgICAgIC9eXFwvJC8sICAvLyBIb21lXG4gICAgICAgICAgL15cXC9hYm91dCQvLCAgLy8gQWJvdXRcbiAgICAgICAgICAvXlxcL29tLW9zcyQvLCAgLy8gU3dlZGlzaCBhYm91dFxuICAgICAgICAgIC9eXFwvaW50ZWdyaXRldHNwb2xpY3kkLywgIC8vIFN3ZWRpc2ggcHJpdmFjeVxuICAgICAgICAgIC9eXFwvYW52YW5kYXJkdmlsbGtvciQvLCAgLy8gU3dlZGlzaCB0ZXJtc1xuICAgICAgICAgIC9eXFwvcHJpdmFjeSQvLCAgLy8gRW5nbGlzaCBwcml2YWN5IChyZWRpcmVjdHMpXG4gICAgICAgICAgL15cXC90ZXJtcyQvICAgLy8gRW5nbGlzaCB0ZXJtcyAocmVkaXJlY3RzKVxuICAgICAgICBdLFxuICAgICAgICBza2lwV2FpdGluZzogdHJ1ZSxcbiAgICAgICAgY2xpZW50c0NsYWltOiB0cnVlLFxuICAgICAgICAvLyBIYW5kbGUgb2ZmbGluZSBzY2VuYXJpb3Mgc2VwYXJhdGVseVxuICAgICAgICBvZmZsaW5lR29vZ2xlQW5hbHl0aWNzOiBmYWxzZSxcbiAgICAgICAgY2xlYW51cE91dGRhdGVkQ2FjaGVzOiB0cnVlXG4gICAgICB9LFxuICAgICAgaW5jbHVkZUFzc2V0czogW1xuICAgICAgICAnbG9nby5wbmcnLFxuICAgICAgICAnRmF2aWNvbi9mYXZpY29uLmljbycsXG4gICAgICAgICdGYXZpY29uL2Zhdmljb24tMTZ4MTYucG5nJyxcbiAgICAgICAgJ0Zhdmljb24vZmF2aWNvbi0zMngzMi5wbmcnLFxuICAgICAgICAnRmF2aWNvbi9mYXZpY29uLTQ4eDQ4LnBuZycsXG4gICAgICAgICdGYXZpY29uL2Zhdmljb24tNjR4NjQucG5nJyxcbiAgICAgICAgJ0Zhdmljb24vZmF2aWNvbi05Nng5Ni5wbmcnLFxuICAgICAgICAnRmF2aWNvbi9mYXZpY29uLTEyOHgxMjgucG5nJyxcbiAgICAgICAgJ0Zhdmljb24vZmF2aWNvbi0yNTZ4MjU2LnBuZycsXG4gICAgICAgICdGYXZpY29uL2Zhdmljb24tMzg0eDM4NC5wbmcnLFxuICAgICAgICAnRmF2aWNvbi9mYXZpY29uLTUxMng1MTIucG5nJyxcbiAgICAgICAgJ0Zhdmljb24vYXBwbGUtaWNvbi01N3g1Ny5wbmcnLFxuICAgICAgICAnRmF2aWNvbi9hcHBsZS1pY29uLTYweDYwLnBuZycsXG4gICAgICAgICdGYXZpY29uL2FwcGxlLWljb24tNzJ4NzIucG5nJyxcbiAgICAgICAgJ0Zhdmljb24vYXBwbGUtaWNvbi03Nng3Ni5wbmcnLFxuICAgICAgICAnRmF2aWNvbi9hcHBsZS1pY29uLTExNHgxMTQucG5nJyxcbiAgICAgICAgJ0Zhdmljb24vYXBwbGUtaWNvbi0xMjB4MTIwLnBuZycsXG4gICAgICAgICdGYXZpY29uL2FwcGxlLWljb24tMTQ0eDE0NC5wbmcnLFxuICAgICAgICAnRmF2aWNvbi9hcHBsZS1pY29uLTE1MngxNTIucG5nJyxcbiAgICAgICAgJ0Zhdmljb24vYXBwbGUtaWNvbi0xODB4MTgwLnBuZycsXG4gICAgICAgICdGYXZpY29uL2FwcGxlLWljb24ucG5nJyxcbiAgICAgICAgJ0Zhdmljb24vYXBwbGUtaWNvbi1wcmVjb21wb3NlZC5wbmcnLFxuICAgICAgICAnRmF2aWNvbi9hbmRyb2lkLWljb24tMzZ4MzYucG5nJyxcbiAgICAgICAgJ0Zhdmljb24vYW5kcm9pZC1pY29uLTQ4eDQ4LnBuZycsXG4gICAgICAgICdGYXZpY29uL2FuZHJvaWQtaWNvbi03Mng3Mi5wbmcnLFxuICAgICAgICAnRmF2aWNvbi9hbmRyb2lkLWljb24tOTZ4OTYucG5nJyxcbiAgICAgICAgJ0Zhdmljb24vYW5kcm9pZC1pY29uLTE0NHgxNDQucG5nJyxcbiAgICAgICAgJ0Zhdmljb24vYW5kcm9pZC1pY29uLTE5MngxOTIucG5nJyxcbiAgICAgICAgJ0Zhdmljb24vYW5kcm9pZC1jaHJvbWUtMjU2eDI1Ni5wbmcnLFxuICAgICAgICAnRmF2aWNvbi9hbmRyb2lkLWNocm9tZS0zODR4Mzg0LnBuZycsXG4gICAgICAgICdGYXZpY29uL2FuZHJvaWQtY2hyb21lLTUxMng1MTIucG5nJyxcbiAgICAgICAgJ0Zhdmljb24vbXMtaWNvbi03MHg3MC5wbmcnLFxuICAgICAgICAnRmF2aWNvbi9tcy1pY29uLTE0NHgxNDQucG5nJyxcbiAgICAgICAgJ0Zhdmljb24vbXMtaWNvbi0xNTB4MTUwLnBuZycsXG4gICAgICAgICdGYXZpY29uL21zLWljb24tMzEweDMxMC5wbmcnLFxuICAgICAgICAnRmF2aWNvbi9tc3RpbGUtMjcweDI3MC5wbmcnLFxuICAgICAgICAnRmF2aWNvbi9tc3RpbGUtMzEweDE1MC5wbmcnLFxuICAgICAgICAnRmF2aWNvbi9tc3RpbGUtMzEweDMxMC5wbmcnLFxuICAgICAgICAnRmF2aWNvbi9zYWZhcmktcGlubmVkLXRhYi5zdmcnLFxuICAgICAgICAnRmF2aWNvbi8xMDI0eDEwMjQucG5nJyxcbiAgICAgICAgJ29mZmxpbmUuaHRtbCcsXG4gICAgICAgICd3aWRnZXQtZGF0YS5qc29uJyxcbiAgICAgICAgJ2FkYXB0aXZlLWNhcmQuanNvbidcbiAgICAgIF0sXG4gICAgICBtYW5pZmVzdDoge1xuICAgICAgICBuYW1lOiAnTWFzc2FnZSBDb3JuZXIgU3ZlcmlnZSBBQicsXG4gICAgICAgIHNob3J0X25hbWU6ICdNYXNzYWdlIENvcm5lcicsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnVlx1MDBFNXJkYSBkaW4ga3JvcHAgbWVkIGVuIGhcdTAwRTRybGlnIG1hc3NhZ2UuIFByb2Zlc3Npb25lbGwgbWFzc2FnZSBpIEpcdTAwRjZua1x1MDBGNnBpbmcgLSBib2thIGRpbiBiZWhhbmRsaW5nIG9ubGluZS4nLFxuICAgICAgICB0aGVtZV9jb2xvcjogJyMwNTk2NjknLFxuICAgICAgICBiYWNrZ3JvdW5kX2NvbG9yOiAnIzA1OTY2OScsXG4gICAgICAgIGRpc3BsYXk6ICdzdGFuZGFsb25lJyxcbiAgICAgICAgZGlzcGxheV9vdmVycmlkZTogWydmdWxsc2NyZWVuJywgJ3N0YW5kYWxvbmUnLCAnbWluaW1hbC11aScsICdicm93c2VyJ10sXG4gICAgICAgIG9yaWVudGF0aW9uOiAncG9ydHJhaXQtcHJpbWFyeScsXG4gICAgICAgIHNjb3BlOiAnLycsXG4gICAgICAgIHN0YXJ0X3VybDogJy8nLFxuICAgICAgICBjYXRlZ29yaWVzOiBbJ2hlYWx0aCcsICd3ZWxsbmVzcycsICdsaWZlc3R5bGUnLCAnbWVkaWNhbCddLFxuICAgICAgICBsYW5nOiAnc3YnLFxuICAgICAgICBlZGdlX3NpZGVfcGFuZWw6IHtcbiAgICAgICAgICBwcmVmZXJyZWRfd2lkdGg6IDQwMFxuICAgICAgICB9LFxuICAgICAgICBmaWxlX2hhbmRsZXJzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgYWN0aW9uOiAnLycsXG4gICAgICAgICAgICBhY2NlcHQ6IHtcbiAgICAgICAgICAgICAgJ3RleHQvY2FsZW5kYXInOiBbJy5pY3MnXSxcbiAgICAgICAgICAgICAgJ2FwcGxpY2F0aW9uL3BkZic6IFsnLnBkZiddXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBoYW5kbGVfbGlua3M6ICdwcmVmZXJyZWQnLFxuICAgICAgICBwcm90b2NvbF9oYW5kbGVyczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHByb3RvY29sOiAndGVsJyxcbiAgICAgICAgICAgIHVybDogJ3RlbDolcydcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHByb3RvY29sOiAnbWFpbHRvJywgXG4gICAgICAgICAgICB1cmw6ICdtYWlsdG86JXMnXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBzaGFyZV90YXJnZXQ6IHtcbiAgICAgICAgICBhY3Rpb246ICcvJyxcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgdGl0bGU6ICd0aXRsZScsXG4gICAgICAgICAgICB0ZXh0OiAndGV4dCcsXG4gICAgICAgICAgICB1cmw6ICd1cmwnXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB3aWRnZXRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ1NuYWJiYm9rbmluZycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0Jva2EgbWFzc2FnZSBzbmFiYnQnLFxuICAgICAgICAgICAgdGFnOiAncXVpY2stYm9va2luZycsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ3F1aWNrLWJvb2tpbmctdGVtcGxhdGUnLFxuICAgICAgICAgICAgbXNfYWNfdGVtcGxhdGU6ICdhZGFwdGl2ZS1jYXJkLmpzb24nLFxuICAgICAgICAgICAgZGF0YTogJy93aWRnZXQtZGF0YS5qc29uJyxcbiAgICAgICAgICAgIHR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgIHNjcmVlbnNob3RzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzcmM6ICcvbG9nby5wbmcnLFxuICAgICAgICAgICAgICAgIHNpemVzOiAnMTkyeDE5MicsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdNYXNzYWdlIENvcm5lciBXaWRnZXQnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBpY29uczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3JjOiAnL2xvZ28ucG5nJyxcbiAgICAgICAgICAgICAgICBzaXplczogJzcyeDcyJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBpY29uczogW1xuICAgICAgICAgIC8vIEFueSBwdXJwb3NlIGljb25zXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnL0Zhdmljb24vZmF2aWNvbi0xNngxNi5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICcxNngxNicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHB1cnBvc2U6ICdhbnknXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcvRmF2aWNvbi9mYXZpY29uLTMyeDMyLnBuZycsXG4gICAgICAgICAgICBzaXplczogJzMyeDMyJyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgcHVycG9zZTogJ2FueSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9GYXZpY29uL2Zhdmljb24tOTZ4OTYucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnOTZ4OTYnLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBwdXJwb3NlOiAnYW55J1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnL0Zhdmljb24vYXBwbGUtaWNvbi0xODB4MTgwLnBuZycsXG4gICAgICAgICAgICBzaXplczogJzE4MHgxODAnLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBwdXJwb3NlOiAnYW55J1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnL0Zhdmljb24vYW5kcm9pZC1pY29uLTE5MngxOTIucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnMTkyeDE5MicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHB1cnBvc2U6ICdhbnknXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcvRmF2aWNvbi9mYXZpY29uLTUxMng1MTIucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHB1cnBvc2U6ICdhbnknXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcvRmF2aWNvbi8xMDI0eDEwMjQucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnMTAyNHgxMDI0JyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgcHVycG9zZTogJ2FueSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIFxuICAgICAgICAgIC8vIE1hc2thYmxlIHB1cnBvc2UgaWNvbnMgKHNlcGFyYXRlIGVudHJpZXMgZm9yIGFkYXB0aXZlIGljb25zKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9GYXZpY29uL2Zhdmljb24tOTZ4OTYucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnOTZ4OTYnLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBwdXJwb3NlOiAnbWFza2FibGUnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcvRmF2aWNvbi9hcHBsZS1pY29uLTE4MHgxODAucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnMTgweDE4MCcsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHB1cnBvc2U6ICdtYXNrYWJsZSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9GYXZpY29uL2FuZHJvaWQtaWNvbi0xOTJ4MTkyLnBuZycsXG4gICAgICAgICAgICBzaXplczogJzE5MngxOTInLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBwdXJwb3NlOiAnbWFza2FibGUnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcvRmF2aWNvbi9mYXZpY29uLTUxMng1MTIucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHB1cnBvc2U6ICdtYXNrYWJsZSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9GYXZpY29uLzEwMjR4MTAyNC5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICcxMDI0eDEwMjQnLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBwdXJwb3NlOiAnbWFza2FibGUnXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBzaG9ydGN1dHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQm9rYSBtZWRpY2luc2sgbWFzc2FnZScsXG4gICAgICAgICAgICBzaG9ydF9uYW1lOiAnTWVkaWNpbnNrJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQm9rYSBtZWRpY2luc2sgbWFzc2FnZSBtZWQgdWx0cmFsanVkYmVoYW5kbGluZycsXG4gICAgICAgICAgICB1cmw6ICcvP2NhdGVnb3J5PW1lZGljaW5zaycsXG4gICAgICAgICAgICBpY29uczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3JjOiAnL0Zhdmljb24vYW5kcm9pZC1pY29uLTk2eDk2LnBuZycsXG4gICAgICAgICAgICAgICAgc2l6ZXM6ICc5Nng5NidcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0Jva2Ega2xhc3Npc2sgbWFzc2FnZScsIFxuICAgICAgICAgICAgc2hvcnRfbmFtZTogJ0tsYXNzaXNrJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQm9rYSBkanVwZ1x1MDBFNWVuZGUga2xhc3Npc2sgbWFzc2FnZScsXG4gICAgICAgICAgICB1cmw6ICcvP2NhdGVnb3J5PWtsYXNzaXNrJyxcbiAgICAgICAgICAgIGljb25zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzcmM6ICcvRmF2aWNvbi9hbmRyb2lkLWljb24tOTZ4OTYucG5nJyxcbiAgICAgICAgICAgICAgICBzaXplczogJzk2eDk2J1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnUmluZyBvc3MnLFxuICAgICAgICAgICAgc2hvcnRfbmFtZTogJ1JpbmcnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSaW5nIE1hc3NhZ2UgQ29ybmVyIGRpcmVrdCcsXG4gICAgICAgICAgICB1cmw6ICd0ZWw6MDczMTc1OTU2NycsXG4gICAgICAgICAgICBpY29uczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3JjOiAnL0Zhdmljb24vYW5kcm9pZC1pY29uLTk2eDk2LnBuZycsXG4gICAgICAgICAgICAgICAgc2l6ZXM6ICc5Nng5NidcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIGRldk9wdGlvbnM6IHtcbiAgICAgICAgZW5hYmxlZDogZmFsc2VcbiAgICAgIH1cbiAgICB9KVxuICBdLFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBleGNsdWRlOiBbJ2x1Y2lkZS1yZWFjdCddXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgIHZlbmRvcjogWydyZWFjdCcsICdyZWFjdC1kb20nXSxcbiAgICAgICAgICByb3V0ZXI6IFsncmVhY3Qtcm91dGVyLWRvbSddLFxuICAgICAgICAgIGljb25zOiBbJ2x1Y2lkZS1yZWFjdCddLFxuICAgICAgICAgIHNwcmluZzogWydAcmVhY3Qtc3ByaW5nL3dlYiddXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMFxuICB9XG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFHeEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLE1BQ04sY0FBYztBQUFBLE1BQ2QsWUFBWTtBQUFBLE1BQ1osU0FBUztBQUFBLFFBQ1AsY0FBYyxDQUFDLDhDQUE4QztBQUFBLFFBQzdELGdCQUFnQjtBQUFBLFVBQ2Q7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QUEsZ0JBQ0UsS0FBSztBQUFBLGdCQUNMLE9BQU87QUFBQSxjQUNUO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxPQUFPO0FBQUE7QUFBQSxVQUVMO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1g7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1g7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBO0FBQUEsVUFHQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1g7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1g7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFFBQ0Y7QUFBQSxRQUNBLFdBQVc7QUFBQSxVQUNUO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixZQUFZO0FBQUEsWUFDWixhQUFhO0FBQUEsWUFDYixLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsY0FDTDtBQUFBLGdCQUNFLEtBQUs7QUFBQSxnQkFDTCxPQUFPO0FBQUEsY0FDVDtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sWUFBWTtBQUFBLFlBQ1osYUFBYTtBQUFBLFlBQ2IsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLGNBQ0w7QUFBQSxnQkFDRSxLQUFLO0FBQUEsZ0JBQ0wsT0FBTztBQUFBLGNBQ1Q7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLFlBQVk7QUFBQSxZQUNaLGFBQWE7QUFBQSxZQUNiLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxjQUNMO0FBQUEsZ0JBQ0UsS0FBSztBQUFBLGdCQUNMLE9BQU87QUFBQSxjQUNUO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsWUFBWTtBQUFBLFFBQ1YsU0FBUztBQUFBLE1BQ1g7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsY0FBYztBQUFBLEVBQzFCO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUEsVUFDWixRQUFRLENBQUMsU0FBUyxXQUFXO0FBQUEsVUFDN0IsUUFBUSxDQUFDLGtCQUFrQjtBQUFBLFVBQzNCLE9BQU8sQ0FBQyxjQUFjO0FBQUEsVUFDdEIsUUFBUSxDQUFDLG1CQUFtQjtBQUFBLFFBQzlCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLHVCQUF1QjtBQUFBLEVBQ3pCO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
