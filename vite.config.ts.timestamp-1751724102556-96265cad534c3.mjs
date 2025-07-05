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
        "Favicon/favicon-16x16.png",
        "Favicon/favicon-32x32.png",
        "Favicon/favicon-96x96.png",
        "Favicon/apple-touch-icon.png",
        "Favicon/favicon-192x192.png",
        "Favicon/favicon-512x512.png",
        "Favicon/1024x1024.png",
        "Favicon/mstile-150x150.png",
        "Favicon/safari-pinned-tab.svg",
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
            src: "/Favicon/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/Favicon/favicon-192x192.png",
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
            src: "/Favicon/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/Favicon/favicon-192x192.png",
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
                src: "/Favicon/favicon-96x96.png",
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
                src: "/Favicon/favicon-96x96.png",
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
                src: "/Favicon/favicon-96x96.png",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIFZpdGVQV0Eoe1xuICAgICAgcmVnaXN0ZXJUeXBlOiAnYXV0b1VwZGF0ZScsXG4gICAgICBzdHJhdGVnaWVzOiAnZ2VuZXJhdGVTVycsXG4gICAgICB3b3JrYm94OiB7XG4gICAgICAgIGdsb2JQYXR0ZXJuczogWycqKi8qLntqcyxjc3MsaHRtbCxpY28scG5nLHN2ZyxqcGVnLGpwZyxqc29ufSddLFxuICAgICAgICBydW50aW1lQ2FjaGluZzogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVybFBhdHRlcm46IC9eaHR0cHM6XFwvXFwvZm9udHNcXC5nb29nbGVhcGlzXFwuY29tXFwvLiovaSxcbiAgICAgICAgICAgIGhhbmRsZXI6ICdDYWNoZUZpcnN0JyxcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgY2FjaGVOYW1lOiAnZ29vZ2xlLWZvbnRzLWNhY2hlJyxcbiAgICAgICAgICAgICAgZXhwaXJhdGlvbjoge1xuICAgICAgICAgICAgICAgIG1heEVudHJpZXM6IDEwLFxuICAgICAgICAgICAgICAgIG1heEFnZVNlY29uZHM6IDYwICogNjAgKiAyNCAqIDM2NSAvLyAxIHllYXJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXJsUGF0dGVybjogL15odHRwczpcXC9cXC9mb250c1xcLmdzdGF0aWNcXC5jb21cXC8uKi9pLFxuICAgICAgICAgICAgaGFuZGxlcjogJ0NhY2hlRmlyc3QnLFxuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICBjYWNoZU5hbWU6ICdnc3RhdGljLWZvbnRzLWNhY2hlJyxcbiAgICAgICAgICAgICAgZXhwaXJhdGlvbjoge1xuICAgICAgICAgICAgICAgIG1heEVudHJpZXM6IDEwLFxuICAgICAgICAgICAgICAgIG1heEFnZVNlY29uZHM6IDYwICogNjAgKiAyNCAqIDM2NSAvLyAxIHllYXJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXJsUGF0dGVybjogL15odHRwczpcXC9cXC93d3dcXC5ib2thZGlyZWt0XFwuc2VcXC8uKi9pLFxuICAgICAgICAgICAgaGFuZGxlcjogJ05ldHdvcmtGaXJzdCcsXG4gICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgIGNhY2hlTmFtZTogJ2Jvb2tpbmctc3lzdGVtLWNhY2hlJyxcbiAgICAgICAgICAgICAgZXhwaXJhdGlvbjoge1xuICAgICAgICAgICAgICAgIG1heEVudHJpZXM6IDIwLFxuICAgICAgICAgICAgICAgIG1heEFnZVNlY29uZHM6IDYwICogNjAgKiAyNCAvLyAxIGRheVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBuZXR3b3JrVGltZW91dFNlY29uZHM6IDEwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1cmxQYXR0ZXJuOiAvXFwuKD86cG5nfGpwZ3xqcGVnfHN2Z3xnaWZ8d2VicCkkLyxcbiAgICAgICAgICAgIGhhbmRsZXI6ICdDYWNoZUZpcnN0JyxcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgY2FjaGVOYW1lOiAnaW1hZ2VzLWNhY2hlJyxcbiAgICAgICAgICAgICAgZXhwaXJhdGlvbjoge1xuICAgICAgICAgICAgICAgIG1heEVudHJpZXM6IDEwMCxcbiAgICAgICAgICAgICAgICBtYXhBZ2VTZWNvbmRzOiA2MCAqIDYwICogMjQgKiAzMCAvLyAzMCBkYXlzXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIC8vIENhY2hlIFN3ZWRpc2ggcm91dGVzIHNwZWNpZmljYWxseVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVybFBhdHRlcm46IC9eLipcXC8oaW50ZWdyaXRldHNwb2xpY3l8YW52YW5kYXJkdmlsbGtvcnxhYm91dHxvbS1vc3MpLiokLyxcbiAgICAgICAgICAgIGhhbmRsZXI6ICdOZXR3b3JrRmlyc3QnLFxuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICBjYWNoZU5hbWU6ICdhcHAtcm91dGVzLWNhY2hlJyxcbiAgICAgICAgICAgICAgZXhwaXJhdGlvbjoge1xuICAgICAgICAgICAgICAgIG1heEVudHJpZXM6IDUwLFxuICAgICAgICAgICAgICAgIG1heEFnZVNlY29uZHM6IDYwICogNjAgKiAyNCAqIDcgLy8gMSB3ZWVrXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIG5ldHdvcmtUaW1lb3V0U2Vjb25kczogM1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgLy8gQ3JpdGljYWw6IEZhbGxiYWNrIHRvIG1haW4gYXBwIGZvciBTUEEgcm91dGluZywgbm90IG9mZmxpbmUgcGFnZVxuICAgICAgICBuYXZpZ2F0ZUZhbGxiYWNrOiAnL2luZGV4Lmh0bWwnLFxuICAgICAgICBuYXZpZ2F0ZUZhbGxiYWNrRGVueWxpc3Q6IFtcbiAgICAgICAgICAvLyBEb24ndCBmYWxsYmFjayBmb3I6XG4gICAgICAgICAgL15cXC9fLywgLy8gVml0ZSBpbnRlcm5hbCByb3V0ZXNcbiAgICAgICAgICAvXFwvW14vP10rXFwuW14vXSskLywgLy8gRmlsZXMgd2l0aCBleHRlbnNpb25zXG4gICAgICAgICAgL15cXC9hcGlcXC8vLCAvLyBBUEkgcm91dGVzXG4gICAgICAgICAgL15cXC9hc3NldHNcXC8vLCAvLyBBc3NldCBmaWxlc1xuICAgICAgICAgIC9eXFwvc3dcXC5qcyQvLCAvLyBTZXJ2aWNlIHdvcmtlclxuICAgICAgICAgIC9eXFwvbWFuaWZlc3RcXC5qc29uJC8sIC8vIE1hbmlmZXN0XG4gICAgICAgICAgL15cXC9vZmZsaW5lXFwuaHRtbCQvLCAvLyBPZmZsaW5lIHBhZ2UgaXRzZWxmXG4gICAgICAgICAgL15cXC93aWRnZXQtZGF0YVxcLmpzb24kLywgLy8gV2lkZ2V0IGRhdGFcbiAgICAgICAgICAvXlxcL2FkYXB0aXZlLWNhcmRcXC5qc29uJC8gLy8gQWRhcHRpdmUgY2FyZFxuICAgICAgICBdLFxuICAgICAgICAvLyBJbmNsdWRlIFN3ZWRpc2ggcm91dGVzIGluIHByZWNhY2hpbmdcbiAgICAgICAgbmF2aWdhdGVGYWxsYmFja0FsbG93bGlzdDogW1xuICAgICAgICAgIC9eXFwvJC8sICAvLyBIb21lXG4gICAgICAgICAgL15cXC9hYm91dCQvLCAgLy8gQWJvdXRcbiAgICAgICAgICAvXlxcL29tLW9zcyQvLCAgLy8gU3dlZGlzaCBhYm91dFxuICAgICAgICAgIC9eXFwvaW50ZWdyaXRldHNwb2xpY3kkLywgIC8vIFN3ZWRpc2ggcHJpdmFjeVxuICAgICAgICAgIC9eXFwvYW52YW5kYXJkdmlsbGtvciQvLCAgLy8gU3dlZGlzaCB0ZXJtc1xuICAgICAgICAgIC9eXFwvcHJpdmFjeSQvLCAgLy8gRW5nbGlzaCBwcml2YWN5IChyZWRpcmVjdHMpXG4gICAgICAgICAgL15cXC90ZXJtcyQvICAgLy8gRW5nbGlzaCB0ZXJtcyAocmVkaXJlY3RzKVxuICAgICAgICBdLFxuICAgICAgICBza2lwV2FpdGluZzogdHJ1ZSxcbiAgICAgICAgY2xpZW50c0NsYWltOiB0cnVlLFxuICAgICAgICAvLyBIYW5kbGUgb2ZmbGluZSBzY2VuYXJpb3Mgc2VwYXJhdGVseVxuICAgICAgICBvZmZsaW5lR29vZ2xlQW5hbHl0aWNzOiBmYWxzZSxcbiAgICAgICAgY2xlYW51cE91dGRhdGVkQ2FjaGVzOiB0cnVlXG4gICAgICB9LFxuICAgICAgaW5jbHVkZUFzc2V0czogW1xuICAgICAgICAnbG9nby5wbmcnLFxuICAgICAgICAnRmF2aWNvbi9mYXZpY29uLTE2eDE2LnBuZycsXG4gICAgICAgICdGYXZpY29uL2Zhdmljb24tMzJ4MzIucG5nJyxcbiAgICAgICAgJ0Zhdmljb24vZmF2aWNvbi05Nng5Ni5wbmcnLFxuICAgICAgICAnRmF2aWNvbi9hcHBsZS10b3VjaC1pY29uLnBuZycsXG4gICAgICAgICdGYXZpY29uL2Zhdmljb24tMTkyeDE5Mi5wbmcnLFxuICAgICAgICAnRmF2aWNvbi9mYXZpY29uLTUxMng1MTIucG5nJyxcbiAgICAgICAgJ0Zhdmljb24vMTAyNHgxMDI0LnBuZycsXG4gICAgICAgICdGYXZpY29uL21zdGlsZS0xNTB4MTUwLnBuZycsXG4gICAgICAgICdGYXZpY29uL3NhZmFyaS1waW5uZWQtdGFiLnN2ZycsXG4gICAgICAgICdvZmZsaW5lLmh0bWwnLFxuICAgICAgICAnd2lkZ2V0LWRhdGEuanNvbicsXG4gICAgICAgICdhZGFwdGl2ZS1jYXJkLmpzb24nXG4gICAgICBdLFxuICAgICAgbWFuaWZlc3Q6IHtcbiAgICAgICAgbmFtZTogJ01hc3NhZ2UgQ29ybmVyIFN2ZXJpZ2UgQUInLFxuICAgICAgICBzaG9ydF9uYW1lOiAnTWFzc2FnZSBDb3JuZXInLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1ZcdTAwRTVyZGEgZGluIGtyb3BwIG1lZCBlbiBoXHUwMEU0cmxpZyBtYXNzYWdlLiBQcm9mZXNzaW9uZWxsIG1hc3NhZ2UgaSBKXHUwMEY2bmtcdTAwRjZwaW5nIC0gYm9rYSBkaW4gYmVoYW5kbGluZyBvbmxpbmUuJyxcbiAgICAgICAgdGhlbWVfY29sb3I6ICcjMDU5NjY5JyxcbiAgICAgICAgYmFja2dyb3VuZF9jb2xvcjogJyMwNTk2NjknLFxuICAgICAgICBkaXNwbGF5OiAnc3RhbmRhbG9uZScsXG4gICAgICAgIGRpc3BsYXlfb3ZlcnJpZGU6IFsnZnVsbHNjcmVlbicsICdzdGFuZGFsb25lJywgJ21pbmltYWwtdWknLCAnYnJvd3NlciddLFxuICAgICAgICBvcmllbnRhdGlvbjogJ3BvcnRyYWl0LXByaW1hcnknLFxuICAgICAgICBzY29wZTogJy8nLFxuICAgICAgICBzdGFydF91cmw6ICcvJyxcbiAgICAgICAgY2F0ZWdvcmllczogWydoZWFsdGgnLCAnd2VsbG5lc3MnLCAnbGlmZXN0eWxlJywgJ21lZGljYWwnXSxcbiAgICAgICAgbGFuZzogJ3N2JyxcbiAgICAgICAgZWRnZV9zaWRlX3BhbmVsOiB7XG4gICAgICAgICAgcHJlZmVycmVkX3dpZHRoOiA0MDBcbiAgICAgICAgfSxcbiAgICAgICAgZmlsZV9oYW5kbGVyczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGFjdGlvbjogJy8nLFxuICAgICAgICAgICAgYWNjZXB0OiB7XG4gICAgICAgICAgICAgICd0ZXh0L2NhbGVuZGFyJzogWycuaWNzJ10sXG4gICAgICAgICAgICAgICdhcHBsaWNhdGlvbi9wZGYnOiBbJy5wZGYnXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgaGFuZGxlX2xpbmtzOiAncHJlZmVycmVkJyxcbiAgICAgICAgcHJvdG9jb2xfaGFuZGxlcnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwcm90b2NvbDogJ3RlbCcsXG4gICAgICAgICAgICB1cmw6ICd0ZWw6JXMnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwcm90b2NvbDogJ21haWx0bycsIFxuICAgICAgICAgICAgdXJsOiAnbWFpbHRvOiVzJ1xuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgc2hhcmVfdGFyZ2V0OiB7XG4gICAgICAgICAgYWN0aW9uOiAnLycsXG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgIHRpdGxlOiAndGl0bGUnLFxuICAgICAgICAgICAgdGV4dDogJ3RleHQnLFxuICAgICAgICAgICAgdXJsOiAndXJsJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgd2lkZ2V0czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdTbmFiYmJva25pbmcnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdCb2thIG1hc3NhZ2Ugc25hYmJ0JyxcbiAgICAgICAgICAgIHRhZzogJ3F1aWNrLWJvb2tpbmcnLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICdxdWljay1ib29raW5nLXRlbXBsYXRlJyxcbiAgICAgICAgICAgIG1zX2FjX3RlbXBsYXRlOiAnYWRhcHRpdmUtY2FyZC5qc29uJyxcbiAgICAgICAgICAgIGRhdGE6ICcvd2lkZ2V0LWRhdGEuanNvbicsXG4gICAgICAgICAgICB0eXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICBzY3JlZW5zaG90czogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3JjOiAnL2xvZ28ucG5nJyxcbiAgICAgICAgICAgICAgICBzaXplczogJzE5MngxOTInLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnTWFzc2FnZSBDb3JuZXIgV2lkZ2V0J1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgaWNvbnM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNyYzogJy9sb2dvLnBuZycsXG4gICAgICAgICAgICAgICAgc2l6ZXM6ICc3Mng3MidcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgaWNvbnM6IFtcbiAgICAgICAgICAvLyBBbnkgcHVycG9zZSBpY29uc1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9GYXZpY29uL2Zhdmljb24tMTZ4MTYucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnMTZ4MTYnLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBwdXJwb3NlOiAnYW55J1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnL0Zhdmljb24vZmF2aWNvbi0zMngzMi5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICczMngzMicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHB1cnBvc2U6ICdhbnknXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcvRmF2aWNvbi9mYXZpY29uLTk2eDk2LnBuZycsXG4gICAgICAgICAgICBzaXplczogJzk2eDk2JyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgcHVycG9zZTogJ2FueSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9GYXZpY29uL2FwcGxlLXRvdWNoLWljb24ucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnMTgweDE4MCcsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHB1cnBvc2U6ICdhbnknXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcvRmF2aWNvbi9mYXZpY29uLTE5MngxOTIucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnMTkyeDE5MicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHB1cnBvc2U6ICdhbnknXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcvRmF2aWNvbi9mYXZpY29uLTUxMng1MTIucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHB1cnBvc2U6ICdhbnknXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcvRmF2aWNvbi8xMDI0eDEwMjQucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnMTAyNHgxMDI0JyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgcHVycG9zZTogJ2FueSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIFxuICAgICAgICAgIC8vIE1hc2thYmxlIHB1cnBvc2UgaWNvbnMgKHNlcGFyYXRlIGVudHJpZXMgZm9yIGFkYXB0aXZlIGljb25zKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9GYXZpY29uL2Zhdmljb24tOTZ4OTYucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnOTZ4OTYnLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBwdXJwb3NlOiAnbWFza2FibGUnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcvRmF2aWNvbi9hcHBsZS10b3VjaC1pY29uLnBuZycsXG4gICAgICAgICAgICBzaXplczogJzE4MHgxODAnLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBwdXJwb3NlOiAnbWFza2FibGUnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcvRmF2aWNvbi9mYXZpY29uLTE5MngxOTIucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnMTkyeDE5MicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHB1cnBvc2U6ICdtYXNrYWJsZSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9GYXZpY29uL2Zhdmljb24tNTEyeDUxMi5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgcHVycG9zZTogJ21hc2thYmxlJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnL0Zhdmljb24vMTAyNHgxMDI0LnBuZycsXG4gICAgICAgICAgICBzaXplczogJzEwMjR4MTAyNCcsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHB1cnBvc2U6ICdtYXNrYWJsZSdcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIHNob3J0Y3V0czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdCb2thIG1lZGljaW5zayBtYXNzYWdlJyxcbiAgICAgICAgICAgIHNob3J0X25hbWU6ICdNZWRpY2luc2snLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdCb2thIG1lZGljaW5zayBtYXNzYWdlIG1lZCB1bHRyYWxqdWRiZWhhbmRsaW5nJyxcbiAgICAgICAgICAgIHVybDogJy8/Y2F0ZWdvcnk9bWVkaWNpbnNrJyxcbiAgICAgICAgICAgIGljb25zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzcmM6ICcvRmF2aWNvbi9mYXZpY29uLTk2eDk2LnBuZycsXG4gICAgICAgICAgICAgICAgc2l6ZXM6ICc5Nng5NidcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0Jva2Ega2xhc3Npc2sgbWFzc2FnZScsIFxuICAgICAgICAgICAgc2hvcnRfbmFtZTogJ0tsYXNzaXNrJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQm9rYSBkanVwZ1x1MDBFNWVuZGUga2xhc3Npc2sgbWFzc2FnZScsXG4gICAgICAgICAgICB1cmw6ICcvP2NhdGVnb3J5PWtsYXNzaXNrJyxcbiAgICAgICAgICAgIGljb25zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzcmM6ICcvRmF2aWNvbi9mYXZpY29uLTk2eDk2LnBuZycsXG4gICAgICAgICAgICAgICAgc2l6ZXM6ICc5Nng5NidcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ1Jpbmcgb3NzJyxcbiAgICAgICAgICAgIHNob3J0X25hbWU6ICdSaW5nJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUmluZyBNYXNzYWdlIENvcm5lciBkaXJla3QnLFxuICAgICAgICAgICAgdXJsOiAndGVsOjA3MzE3NTk1NjcnLFxuICAgICAgICAgICAgaWNvbnM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNyYzogJy9GYXZpY29uL2Zhdmljb24tOTZ4OTYucG5nJyxcbiAgICAgICAgICAgICAgICBzaXplczogJzk2eDk2J1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgZGV2T3B0aW9uczoge1xuICAgICAgICBlbmFibGVkOiBmYWxzZVxuICAgICAgfVxuICAgIH0pXG4gIF0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGV4Y2x1ZGU6IFsnbHVjaWRlLXJlYWN0J11cbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgdmVuZG9yOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbSddLFxuICAgICAgICAgIHJvdXRlcjogWydyZWFjdC1yb3V0ZXItZG9tJ10sXG4gICAgICAgICAgaWNvbnM6IFsnbHVjaWRlLXJlYWN0J10sXG4gICAgICAgICAgc3ByaW5nOiBbJ0ByZWFjdC1zcHJpbmcvd2ViJ11cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAwXG4gIH1cbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7QUFBeU4sU0FBUyxvQkFBb0I7QUFDdFAsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUd4QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsTUFDTixjQUFjO0FBQUEsTUFDZCxZQUFZO0FBQUEsTUFDWixTQUFTO0FBQUEsUUFDUCxjQUFjLENBQUMsOENBQThDO0FBQUEsUUFDN0QsZ0JBQWdCO0FBQUEsVUFDZDtBQUFBLFlBQ0UsWUFBWTtBQUFBLFlBQ1osU0FBUztBQUFBLFlBQ1QsU0FBUztBQUFBLGNBQ1AsV0FBVztBQUFBLGNBQ1gsWUFBWTtBQUFBLGdCQUNWLFlBQVk7QUFBQSxnQkFDWixlQUFlLEtBQUssS0FBSyxLQUFLO0FBQUE7QUFBQSxjQUNoQztBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQTtBQUFBLFlBQ0UsWUFBWTtBQUFBLFlBQ1osU0FBUztBQUFBLFlBQ1QsU0FBUztBQUFBLGNBQ1AsV0FBVztBQUFBLGNBQ1gsWUFBWTtBQUFBLGdCQUNWLFlBQVk7QUFBQSxnQkFDWixlQUFlLEtBQUssS0FBSyxLQUFLO0FBQUE7QUFBQSxjQUNoQztBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQTtBQUFBLFlBQ0UsWUFBWTtBQUFBLFlBQ1osU0FBUztBQUFBLFlBQ1Qs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
