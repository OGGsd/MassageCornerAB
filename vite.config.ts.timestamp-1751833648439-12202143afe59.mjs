// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///home/project/node_modules/vite-plugin-pwa/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      strategies: "injectManifest",
      srcDir: "public",
      filename: "sw.js",
      injectManifest: {
        swSrc: "public/sw.js",
        swDest: "dist/sw.js",
        globDirectory: "dist",
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpeg,jpg,json,woff2}"]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpeg,jpg,json,woff2}"],
        maximumFileSizeToCacheInBytes: 5e6,
        // 5MB
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365
                // 1 year
              },
              cacheKeyWillBeUsed: async ({ request }) => {
                return `${request.url}?version=1.0.0`;
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: {
                maxEntries: 20,
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
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 2
                // 2 hours
              },
              plugins: [
                {
                  cacheKeyWillBeUsed: async ({ request }) => {
                    return request.url.split("?")[0];
                  }
                }
              ]
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30
                // 30 days
              }
            }
          },
          {
            urlPattern: /^.*\/(integritetspolicy|anvandardvillkor|about).*$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "app-routes-cache",
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7
                // 1 week
              }
            }
          },
          {
            urlPattern: /\.(?:js|css)$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "static-resources",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30
                // 30 days
              }
            }
          }
        ]
      },
      includeAssets: [
        "logo.png",
        "Olga.png",
        "Favicon/favicon.ico",
        "Favicon/favicon-16x16.png",
        "Favicon/favicon-32x32.png",
        "Favicon/favicon-96x96.png",
        "Favicon/apple-icon-57x57.png",
        "Favicon/apple-icon-60x60.png",
        "Favicon/apple-icon-72x72.png",
        "Favicon/apple-icon-76x76.png",
        "Favicon/apple-icon-114x114.png",
        "Favicon/apple-icon-120x120.png",
        "Favicon/apple-icon-144x144.png",
        "Favicon/apple-icon-152x152.png",
        "Favicon/apple-icon-180x180.png",
        "Favicon/apple-icon-precomposed.png",
        "Favicon/apple-icon.png",
        "Favicon/android-icon-36x36.png",
        "Favicon/android-icon-48x48.png",
        "Favicon/android-icon-72x72.png",
        "Favicon/android-icon-96x96.png",
        "Favicon/android-icon-144x144.png",
        "Favicon/android-icon-192x192.png",
        "Favicon/ms-icon-70x70.png",
        "Favicon/ms-icon-144x144.png",
        "Favicon/ms-icon-150x150.png",
        "Favicon/ms-icon-310x310.png",
        "Favicon/safari-pinned-tab.svg",
        "Favicon/1024x1024.png",
        "apple-touch-icon.png",
        "apple-touch-icon-152x152.png",
        "apple-touch-icon-1024x1024.png",
        "offline.html",
        "widget-data.json",
        "adaptive-card.json"
      ],
      devOptions: {
        enabled: false,
        type: "module"
      },
      manifest: {
        name: "Massage Corner Sverige AB",
        short_name: "Massage Corner",
        description: "V\xE5rda din kropp med en h\xE4rlig massage. Professionell massage i J\xF6nk\xF6ping - boka din behandling online.",
        theme_color: "#059669",
        background_color: "#059669",
        display: "standalone",
        display_override: ["fullscreen", "standalone", "minimal-ui", "browser"],
        orientation: "any",
        scope: "/",
        start_url: "/",
        id: "/",
        categories: ["health", "wellness", "lifestyle", "medical"],
        lang: "sv",
        dir: "ltr",
        iarc_rating_id: "e84b072d-71b3-4d3e-86ae-31a8ce4e53b7",
        prefer_related_applications: false,
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
        launch_handler: {
          client_mode: "navigate-existing"
        },
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
        screenshots: [
          {
            src: "/Favicon/android-icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            platform: "wide",
            label: "Massage Corner - Booking Interface"
          },
          {
            src: "/Favicon/android-icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            platform: "narrow",
            label: "Massage Corner - Mobile View"
          }
        ],
        icons: [
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
            src: "/Favicon/apple-icon-152x152.png",
            sizes: "152x152",
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
            src: "/Favicon/1024x1024.png",
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
          {
            src: "/Favicon/apple-icon-152x152.png",
            sizes: "152x152",
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
            src: "/Favicon/1024x1024.png",
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
          spring: ["@react-spring/web"],
          motion: ["framer-motion"]
        }
      }
    },
    chunkSizeWarningLimit: 1e3,
    target: "esnext",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIFZpdGVQV0Eoe1xuICAgICAgcmVnaXN0ZXJUeXBlOiAnYXV0b1VwZGF0ZScsXG4gICAgICBzdHJhdGVnaWVzOiAnaW5qZWN0TWFuaWZlc3QnLFxuICAgICAgc3JjRGlyOiAncHVibGljJyxcbiAgICAgIGZpbGVuYW1lOiAnc3cuanMnLFxuICAgICAgaW5qZWN0TWFuaWZlc3Q6IHtcbiAgICAgICAgc3dTcmM6ICdwdWJsaWMvc3cuanMnLFxuICAgICAgICBzd0Rlc3Q6ICdkaXN0L3N3LmpzJyxcbiAgICAgICAgZ2xvYkRpcmVjdG9yeTogJ2Rpc3QnLFxuICAgICAgICBnbG9iUGF0dGVybnM6IFsnKiovKi57anMsY3NzLGh0bWwsaWNvLHBuZyxzdmcsanBlZyxqcGcsanNvbix3b2ZmMn0nXVxuICAgICAgfSxcbiAgICAgIHdvcmtib3g6IHtcbiAgICAgICAgZ2xvYlBhdHRlcm5zOiBbJyoqLyoue2pzLGNzcyxodG1sLGljbyxwbmcsc3ZnLGpwZWcsanBnLGpzb24sd29mZjJ9J10sXG4gICAgICAgIG1heGltdW1GaWxlU2l6ZVRvQ2FjaGVJbkJ5dGVzOiA1MDAwMDAwLCAvLyA1TUJcbiAgICAgICAgY2xlYW51cE91dGRhdGVkQ2FjaGVzOiB0cnVlLFxuICAgICAgICBza2lwV2FpdGluZzogdHJ1ZSxcbiAgICAgICAgY2xpZW50c0NsYWltOiB0cnVlLFxuICAgICAgICBydW50aW1lQ2FjaGluZzogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHVybFBhdHRlcm46IC9eaHR0cHM6XFwvXFwvZm9udHNcXC5nb29nbGVhcGlzXFwuY29tXFwvLiovaSxcbiAgICAgICAgICAgIGhhbmRsZXI6ICdDYWNoZUZpcnN0JyxcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgY2FjaGVOYW1lOiAnZ29vZ2xlLWZvbnRzLWNhY2hlJyxcbiAgICAgICAgICAgICAgZXhwaXJhdGlvbjoge1xuICAgICAgICAgICAgICAgIG1heEVudHJpZXM6IDIwLFxuICAgICAgICAgICAgICAgIG1heEFnZVNlY29uZHM6IDYwICogNjAgKiAyNCAqIDM2NSAvLyAxIHllYXJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgY2FjaGVLZXlXaWxsQmVVc2VkOiBhc3luYyAoeyByZXF1ZXN0IH0pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7cmVxdWVzdC51cmx9P3ZlcnNpb249MS4wLjBgO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1cmxQYXR0ZXJuOiAvXmh0dHBzOlxcL1xcL2ZvbnRzXFwuZ3N0YXRpY1xcLmNvbVxcLy4qL2ksXG4gICAgICAgICAgICBoYW5kbGVyOiAnQ2FjaGVGaXJzdCcsXG4gICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgIGNhY2hlTmFtZTogJ2dzdGF0aWMtZm9udHMtY2FjaGUnLFxuICAgICAgICAgICAgICBleHBpcmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgbWF4RW50cmllczogMjAsXG4gICAgICAgICAgICAgICAgbWF4QWdlU2Vjb25kczogNjAgKiA2MCAqIDI0ICogMzY1IC8vIDEgeWVhclxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1cmxQYXR0ZXJuOiAvXmh0dHBzOlxcL1xcL3d3d1xcLmJva2FkaXJla3RcXC5zZVxcLy4qL2ksXG4gICAgICAgICAgICBoYW5kbGVyOiAnTmV0d29ya0ZpcnN0JyxcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgY2FjaGVOYW1lOiAnYm9va2luZy1zeXN0ZW0tY2FjaGUnLFxuICAgICAgICAgICAgICBuZXR3b3JrVGltZW91dFNlY29uZHM6IDUsXG4gICAgICAgICAgICAgIGV4cGlyYXRpb246IHtcbiAgICAgICAgICAgICAgICBtYXhFbnRyaWVzOiA1MCxcbiAgICAgICAgICAgICAgICBtYXhBZ2VTZWNvbmRzOiA2MCAqIDYwICogMiAvLyAyIGhvdXJzXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBjYWNoZUtleVdpbGxCZVVzZWQ6IGFzeW5jICh7IHJlcXVlc3QgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdC51cmwuc3BsaXQoJz8nKVswXTsgLy8gUmVtb3ZlIHF1ZXJ5IHBhcmFtcyBmb3IgY2FjaGluZ1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXJsUGF0dGVybjogL1xcLig/OnBuZ3xqcGd8anBlZ3xzdmd8Z2lmfHdlYnApJC8sXG4gICAgICAgICAgICBoYW5kbGVyOiAnQ2FjaGVGaXJzdCcsXG4gICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgIGNhY2hlTmFtZTogJ2ltYWdlcy1jYWNoZScsXG4gICAgICAgICAgICAgIGV4cGlyYXRpb246IHtcbiAgICAgICAgICAgICAgICBtYXhFbnRyaWVzOiAyMDAsXG4gICAgICAgICAgICAgICAgbWF4QWdlU2Vjb25kczogNjAgKiA2MCAqIDI0ICogMzAgLy8gMzAgZGF5c1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1cmxQYXR0ZXJuOiAvXi4qXFwvKGludGVncml0ZXRzcG9saWN5fGFudmFuZGFyZHZpbGxrb3J8YWJvdXQpLiokLyxcbiAgICAgICAgICAgIGhhbmRsZXI6ICdOZXR3b3JrRmlyc3QnLFxuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICBjYWNoZU5hbWU6ICdhcHAtcm91dGVzLWNhY2hlJyxcbiAgICAgICAgICAgICAgbmV0d29ya1RpbWVvdXRTZWNvbmRzOiAzLFxuICAgICAgICAgICAgICBleHBpcmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgbWF4RW50cmllczogNTAsXG4gICAgICAgICAgICAgICAgbWF4QWdlU2Vjb25kczogNjAgKiA2MCAqIDI0ICogNyAvLyAxIHdlZWtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXJsUGF0dGVybjogL1xcLig/OmpzfGNzcykkLyxcbiAgICAgICAgICAgIGhhbmRsZXI6ICdTdGFsZVdoaWxlUmV2YWxpZGF0ZScsXG4gICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgIGNhY2hlTmFtZTogJ3N0YXRpYy1yZXNvdXJjZXMnLFxuICAgICAgICAgICAgICBleHBpcmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgbWF4RW50cmllczogMTAwLFxuICAgICAgICAgICAgICAgIG1heEFnZVNlY29uZHM6IDYwICogNjAgKiAyNCAqIDMwIC8vIDMwIGRheXNcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIGluY2x1ZGVBc3NldHM6IFtcbiAgICAgICAgJ2xvZ28ucG5nJyxcbiAgICAgICAgJ09sZ2EucG5nJyxcbiAgICAgICAgJ0Zhdmljb24vZmF2aWNvbi5pY28nLFxuICAgICAgICAnRmF2aWNvbi9mYXZpY29uLTE2eDE2LnBuZycsXG4gICAgICAgICdGYXZpY29uL2Zhdmljb24tMzJ4MzIucG5nJyxcbiAgICAgICAgJ0Zhdmljb24vZmF2aWNvbi05Nng5Ni5wbmcnLFxuICAgICAgICAnRmF2aWNvbi9hcHBsZS1pY29uLTU3eDU3LnBuZycsXG4gICAgICAgICdGYXZpY29uL2FwcGxlLWljb24tNjB4NjAucG5nJyxcbiAgICAgICAgJ0Zhdmljb24vYXBwbGUtaWNvbi03Mng3Mi5wbmcnLFxuICAgICAgICAnRmF2aWNvbi9hcHBsZS1pY29uLTc2eDc2LnBuZycsXG4gICAgICAgICdGYXZpY29uL2FwcGxlLWljb24tMTE0eDExNC5wbmcnLFxuICAgICAgICAnRmF2aWNvbi9hcHBsZS1pY29uLTEyMHgxMjAucG5nJyxcbiAgICAgICAgJ0Zhdmljb24vYXBwbGUtaWNvbi0xNDR4MTQ0LnBuZycsXG4gICAgICAgICdGYXZpY29uL2FwcGxlLWljb24tMTUyeDE1Mi5wbmcnLFxuICAgICAgICAnRmF2aWNvbi9hcHBsZS1pY29uLTE4MHgxODAucG5nJyxcbiAgICAgICAgJ0Zhdmljb24vYXBwbGUtaWNvbi1wcmVjb21wb3NlZC5wbmcnLFxuICAgICAgICAnRmF2aWNvbi9hcHBsZS1pY29uLnBuZycsXG4gICAgICAgICdGYXZpY29uL2FuZHJvaWQtaWNvbi0zNngzNi5wbmcnLFxuICAgICAgICAnRmF2aWNvbi9hbmRyb2lkLWljb24tNDh4NDgucG5nJyxcbiAgICAgICAgJ0Zhdmljb24vYW5kcm9pZC1pY29uLTcyeDcyLnBuZycsXG4gICAgICAgICdGYXZpY29uL2FuZHJvaWQtaWNvbi05Nng5Ni5wbmcnLFxuICAgICAgICAnRmF2aWNvbi9hbmRyb2lkLWljb24tMTQ0eDE0NC5wbmcnLFxuICAgICAgICAnRmF2aWNvbi9hbmRyb2lkLWljb24tMTkyeDE5Mi5wbmcnLFxuICAgICAgICAnRmF2aWNvbi9tcy1pY29uLTcweDcwLnBuZycsXG4gICAgICAgICdGYXZpY29uL21zLWljb24tMTQ0eDE0NC5wbmcnLFxuICAgICAgICAnRmF2aWNvbi9tcy1pY29uLTE1MHgxNTAucG5nJyxcbiAgICAgICAgJ0Zhdmljb24vbXMtaWNvbi0zMTB4MzEwLnBuZycsXG4gICAgICAgICdGYXZpY29uL3NhZmFyaS1waW5uZWQtdGFiLnN2ZycsXG4gICAgICAgICdGYXZpY29uLzEwMjR4MTAyNC5wbmcnLFxuICAgICAgICAnYXBwbGUtdG91Y2gtaWNvbi5wbmcnLFxuICAgICAgICAnYXBwbGUtdG91Y2gtaWNvbi0xNTJ4MTUyLnBuZycsIFxuICAgICAgICAnYXBwbGUtdG91Y2gtaWNvbi0xMDI0eDEwMjQucG5nJyxcbiAgICAgICAgJ29mZmxpbmUuaHRtbCcsXG4gICAgICAgICd3aWRnZXQtZGF0YS5qc29uJyxcbiAgICAgICAgJ2FkYXB0aXZlLWNhcmQuanNvbidcbiAgICAgIF0sXG4gICAgICBkZXZPcHRpb25zOiB7XG4gICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICB0eXBlOiAnbW9kdWxlJ1xuICAgICAgfSxcbiAgICAgIG1hbmlmZXN0OiB7XG4gICAgICAgIG5hbWU6ICdNYXNzYWdlIENvcm5lciBTdmVyaWdlIEFCJyxcbiAgICAgICAgc2hvcnRfbmFtZTogJ01hc3NhZ2UgQ29ybmVyJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdWXHUwMEU1cmRhIGRpbiBrcm9wcCBtZWQgZW4gaFx1MDBFNHJsaWcgbWFzc2FnZS4gUHJvZmVzc2lvbmVsbCBtYXNzYWdlIGkgSlx1MDBGNm5rXHUwMEY2cGluZyAtIGJva2EgZGluIGJlaGFuZGxpbmcgb25saW5lLicsXG4gICAgICAgIHRoZW1lX2NvbG9yOiAnIzA1OTY2OScsXG4gICAgICAgIGJhY2tncm91bmRfY29sb3I6ICcjMDU5NjY5JyxcbiAgICAgICAgZGlzcGxheTogJ3N0YW5kYWxvbmUnLFxuICAgICAgICBkaXNwbGF5X292ZXJyaWRlOiBbJ2Z1bGxzY3JlZW4nLCAnc3RhbmRhbG9uZScsICdtaW5pbWFsLXVpJywgJ2Jyb3dzZXInXSxcbiAgICAgICAgb3JpZW50YXRpb246ICdhbnknLFxuICAgICAgICBzY29wZTogJy8nLFxuICAgICAgICBzdGFydF91cmw6ICcvJyxcbiAgICAgICAgaWQ6ICcvJyxcbiAgICAgICAgY2F0ZWdvcmllczogWydoZWFsdGgnLCAnd2VsbG5lc3MnLCAnbGlmZXN0eWxlJywgJ21lZGljYWwnXSxcbiAgICAgICAgbGFuZzogJ3N2JyxcbiAgICAgICAgZGlyOiAnbHRyJyxcbiAgICAgICAgaWFyY19yYXRpbmdfaWQ6ICdlODRiMDcyZC03MWIzLTRkM2UtODZhZS0zMWE4Y2U0ZTUzYjcnLFxuICAgICAgICBwcmVmZXJfcmVsYXRlZF9hcHBsaWNhdGlvbnM6IGZhbHNlLFxuICAgICAgICBlZGdlX3NpZGVfcGFuZWw6IHtcbiAgICAgICAgICBwcmVmZXJyZWRfd2lkdGg6IDQwMFxuICAgICAgICB9LFxuICAgICAgICBmaWxlX2hhbmRsZXJzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgYWN0aW9uOiAnLycsXG4gICAgICAgICAgICBhY2NlcHQ6IHtcbiAgICAgICAgICAgICAgJ3RleHQvY2FsZW5kYXInOiBbJy5pY3MnXSxcbiAgICAgICAgICAgICAgJ2FwcGxpY2F0aW9uL3BkZic6IFsnLnBkZiddXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBsYXVuY2hfaGFuZGxlcjoge1xuICAgICAgICAgIGNsaWVudF9tb2RlOiAnbmF2aWdhdGUtZXhpc3RpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIGhhbmRsZV9saW5rczogJ3ByZWZlcnJlZCcsXG4gICAgICAgIHByb3RvY29sX2hhbmRsZXJzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgcHJvdG9jb2w6ICd0ZWwnLFxuICAgICAgICAgICAgdXJsOiAndGVsOiVzJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgcHJvdG9jb2w6ICdtYWlsdG8nLCBcbiAgICAgICAgICAgIHVybDogJ21haWx0bzolcydcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIHNoYXJlX3RhcmdldDoge1xuICAgICAgICAgIGFjdGlvbjogJy8nLFxuICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICB0aXRsZTogJ3RpdGxlJyxcbiAgICAgICAgICAgIHRleHQ6ICd0ZXh0JyxcbiAgICAgICAgICAgIHVybDogJ3VybCdcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHdpZGdldHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnU25hYmJib2tuaW5nJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQm9rYSBtYXNzYWdlIHNuYWJidCcsXG4gICAgICAgICAgICB0YWc6ICdxdWljay1ib29raW5nJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAncXVpY2stYm9va2luZy10ZW1wbGF0ZScsXG4gICAgICAgICAgICBtc19hY190ZW1wbGF0ZTogJ2FkYXB0aXZlLWNhcmQuanNvbicsXG4gICAgICAgICAgICBkYXRhOiAnL3dpZGdldC1kYXRhLmpzb24nLFxuICAgICAgICAgICAgdHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgc2NyZWVuc2hvdHM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNyYzogJy9sb2dvLnBuZycsXG4gICAgICAgICAgICAgICAgc2l6ZXM6ICcxOTJ4MTkyJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ01hc3NhZ2UgQ29ybmVyIFdpZGdldCdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGljb25zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzcmM6ICcvbG9nby5wbmcnLFxuICAgICAgICAgICAgICAgIHNpemVzOiAnNzJ4NzInXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIHNjcmVlbnNob3RzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnL0Zhdmljb24vYW5kcm9pZC1pY29uLTE5MngxOTIucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnMTkyeDE5MicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHBsYXRmb3JtOiAnd2lkZScsXG4gICAgICAgICAgICBsYWJlbDogJ01hc3NhZ2UgQ29ybmVyIC0gQm9va2luZyBJbnRlcmZhY2UnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcvRmF2aWNvbi9hbmRyb2lkLWljb24tMTkyeDE5Mi5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICcxOTJ4MTkyJywgXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHBsYXRmb3JtOiAnbmFycm93JyxcbiAgICAgICAgICAgIGxhYmVsOiAnTWFzc2FnZSBDb3JuZXIgLSBNb2JpbGUgVmlldydcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGljb25zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnL0Zhdmljb24vZmF2aWNvbi0xNngxNi5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICcxNngxNicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHB1cnBvc2U6ICdhbnknXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcvRmF2aWNvbi9mYXZpY29uLTMyeDMyLnBuZycsXG4gICAgICAgICAgICBzaXplczogJzMyeDMyJyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgcHVycG9zZTogJ2FueSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9GYXZpY29uL2Zhdmljb24tOTZ4OTYucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnOTZ4OTYnLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBwdXJwb3NlOiAnYW55J1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnL0Zhdmljb24vYXBwbGUtaWNvbi0xNTJ4MTUyLnBuZycsXG4gICAgICAgICAgICBzaXplczogJzE1MngxNTInLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBwdXJwb3NlOiAnYW55J1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnL0Zhdmljb24vYW5kcm9pZC1pY29uLTE5MngxOTIucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnMTkyeDE5MicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHB1cnBvc2U6ICdhbnknXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcvRmF2aWNvbi8xMDI0eDEwMjQucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHB1cnBvc2U6ICdhbnknXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcvRmF2aWNvbi8xMDI0eDEwMjQucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnMTAyNHgxMDI0JyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgcHVycG9zZTogJ2FueSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9GYXZpY29uL2FwcGxlLWljb24tMTUyeDE1Mi5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICcxNTJ4MTUyJyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgcHVycG9zZTogJ21hc2thYmxlJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnL0Zhdmljb24vYW5kcm9pZC1pY29uLTE5MngxOTIucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnMTkyeDE5MicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHB1cnBvc2U6ICdtYXNrYWJsZSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9GYXZpY29uLzEwMjR4MTAyNC5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgcHVycG9zZTogJ21hc2thYmxlJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnL0Zhdmljb24vMTAyNHgxMDI0LnBuZycsXG4gICAgICAgICAgICBzaXplczogJzEwMjR4MTAyNCcsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIHB1cnBvc2U6ICdtYXNrYWJsZSdcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIHNob3J0Y3V0czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdCb2thIG1lZGljaW5zayBtYXNzYWdlJyxcbiAgICAgICAgICAgIHNob3J0X25hbWU6ICdNZWRpY2luc2snLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdCb2thIG1lZGljaW5zayBtYXNzYWdlIG1lZCB1bHRyYWxqdWRiZWhhbmRsaW5nJyxcbiAgICAgICAgICAgIHVybDogJy8/Y2F0ZWdvcnk9bWVkaWNpbnNrJyxcbiAgICAgICAgICAgIGljb25zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzcmM6ICcvRmF2aWNvbi9hbmRyb2lkLWljb24tOTZ4OTYucG5nJyxcbiAgICAgICAgICAgICAgICBzaXplczogJzk2eDk2J1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnQm9rYSBrbGFzc2lzayBtYXNzYWdlJywgXG4gICAgICAgICAgICBzaG9ydF9uYW1lOiAnS2xhc3Npc2snLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdCb2thIGRqdXBnXHUwMEU1ZW5kZSBrbGFzc2lzayBtYXNzYWdlJyxcbiAgICAgICAgICAgIHVybDogJy8/Y2F0ZWdvcnk9a2xhc3Npc2snLFxuICAgICAgICAgICAgaWNvbnM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNyYzogJy9GYXZpY29uL2FuZHJvaWQtaWNvbi05Nng5Ni5wbmcnLFxuICAgICAgICAgICAgICAgIHNpemVzOiAnOTZ4OTYnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdSaW5nIG9zcycsXG4gICAgICAgICAgICBzaG9ydF9uYW1lOiAnUmluZycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JpbmcgTWFzc2FnZSBDb3JuZXIgZGlyZWt0JyxcbiAgICAgICAgICAgIHVybDogJ3RlbDowNzMxNzU5NTY3JyxcbiAgICAgICAgICAgIGljb25zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzcmM6ICcvRmF2aWNvbi9hbmRyb2lkLWljb24tOTZ4OTYucG5nJyxcbiAgICAgICAgICAgICAgICBzaXplczogJzk2eDk2J1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9XG4gICAgfSlcbiAgXSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgZXhjbHVkZTogWydsdWNpZGUtcmVhY3QnXVxuICB9LFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICB2ZW5kb3I6IFsncmVhY3QnLCAncmVhY3QtZG9tJ10sXG4gICAgICAgICAgcm91dGVyOiBbJ3JlYWN0LXJvdXRlci1kb20nXSxcbiAgICAgICAgICBpY29uczogWydsdWNpZGUtcmVhY3QnXSxcbiAgICAgICAgICBzcHJpbmc6IFsnQHJlYWN0LXNwcmluZy93ZWInXSxcbiAgICAgICAgICBtb3Rpb246IFsnZnJhbWVyLW1vdGlvbiddXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCxcbiAgICB0YXJnZXQ6ICdlc25leHQnLFxuICAgIG1pbmlmeTogJ3RlcnNlcicsXG4gICAgdGVyc2VyT3B0aW9uczoge1xuICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLFxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9XG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFHeEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLE1BQ04sY0FBYztBQUFBLE1BQ2QsWUFBWTtBQUFBLE1BQ1osUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsZ0JBQWdCO0FBQUEsUUFDZCxPQUFPO0FBQUEsUUFDUCxRQUFRO0FBQUEsUUFDUixlQUFlO0FBQUEsUUFDZixjQUFjLENBQUMsb0RBQW9EO0FBQUEsTUFDckU7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNQLGNBQWMsQ0FBQyxvREFBb0Q7QUFBQSxRQUNuRSwrQkFBK0I7QUFBQTtBQUFBLFFBQy9CLHVCQUF1QjtBQUFBLFFBQ3ZCLGFBQWE7QUFBQSxRQUNiLGNBQWM7QUFBQSxRQUNkLGdCQUFnQjtBQUFBLFVBQ2Q7QUFBQSxZQUNFLFlBQVk7QUFBQSxZQUNaLFNBQVM7QUFBQSxZQUNULFNBQVM7QUFBQSxjQUNQLFdBQVc7QUFBQSxjQUNYLFlBQVk7QUFBQSxnQkFDVixZQUFZO0FBQUEsZ0JBQ1osZUFBZSxLQUFLLEtBQUssS0FBSztBQUFBO0FBQUEsY0FDaEM7QUFBQSxjQUNBLG9CQUFvQixPQUFPLEVBQUUsUUFBUSxNQUFNO0FBQ3pDLHVCQUFPLEdBQUcsUUFBUSxHQUFHO0FBQUEsY0FDdkI7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFVBQ0E7QUFBQSxZQUNFLFlBQVk7QUFBQSxZQUNaLFNBQVM7QUFBQSxZQUNULFNBQVM7QUFBQSxjQUNQLFdBQVc7QUFBQSxjQUNYLFlBQVk7QUFBQSxnQkFDVixZQUFZO0FBQUEsZ0JBQ1osZUFBZSxLQUFLLEtBQUssS0FBSztBQUFBO0FBQUEsY0FDaEM7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFVBQ0E7QUFBQSxZQUNFLFlBQVk7QUFBQSxZQUNaLFNBQVM7QUFBQSxZQUNULFNBQVM7QUFBQSxjQUNQLFdBQVc7QUFBQSxjQUNYLHVCQUF1QjtBQUFBLGNBQ3ZCLFlBQVk7QUFBQSxnQkFDVixZQUFZO0FBQUEsZ0JBQ1osZUFBZSxLQUFLLEtBQUs7QUFBQTtBQUFBLGNBQzNCO0FBQUEsY0FDQSxTQUFTO0FBQUEsZ0JBQ1A7QUFBQSxrQkFDRSxvQkFBb0IsT0FBTyxFQUFFLFFBQVEsTUFBTTtBQUN6QywyQkFBTyxRQUFRLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUFBLGtCQUNqQztBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQTtBQUFBLFlBQ0UsWUFBWTtBQUFBLFlBQ1osU0FBUztBQUFBLFlBQ1QsU0FBUztBQUFBLGNBQ1AsV0FBVztBQUFBLGNBQ1gsWUFBWTtBQUFBLGdCQUNWLFlBQVk7QUFBQSxnQkFDWixlQUFlLEtBQUssS0FBSyxLQUFLO0FBQUE7QUFBQSxjQUNoQztBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQTtBQUFBLFlBQ0UsWUFBWTtBQUFBLFlBQ1osU0FBUztBQUFBLFlBQ1QsU0FBUztBQUFBLGNBQ1AsV0FBVztBQUFBLGNBQ1gsdUJBQXVCO0FBQUEsY0FDdkIsWUFBWTtBQUFBLGdCQUNWLFlBQVk7QUFBQSxnQkFDWixlQUFlLEtBQUssS0FBSyxLQUFLO0FBQUE7QUFBQSxjQUNoQztBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQTtBQUFBLFlBQ0UsWUFBWTtBQUFBLFlBQ1osU0FBUztBQUFBLFlBQ1QsU0FBUztBQUFBLGNBQ1AsV0FBVztBQUFBLGNBQ1gsWUFBWTtBQUFBLGdCQUNWLFlBQVk7QUFBQSxnQkFDWixlQUFlLEtBQUssS0FBSyxLQUFLO0FBQUE7QUFBQSxjQUNoQztBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGVBQWU7QUFBQSxRQUNiO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFlBQVk7QUFBQSxRQUNWLFNBQVM7QUFBQSxRQUNULE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQSxVQUFVO0FBQUEsUUFDUixNQUFNO0FBQUEsUUFDTixZQUFZO0FBQUEsUUFDWixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixrQkFBa0I7QUFBQSxRQUNsQixTQUFTO0FBQUEsUUFDVCxrQkFBa0IsQ0FBQyxjQUFjLGNBQWMsY0FBYyxTQUFTO0FBQUEsUUFDdEUsYUFBYTtBQUFBLFFBQ2IsT0FBTztBQUFBLFFBQ1AsV0FBVztBQUFBLFFBQ1gsSUFBSTtBQUFBLFFBQ0osWUFBWSxDQUFDLFVBQVUsWUFBWSxhQUFhLFNBQVM7QUFBQSxRQUN6RCxNQUFNO0FBQUEsUUFDTixLQUFLO0FBQUEsUUFDTCxnQkFBZ0I7QUFBQSxRQUNoQiw2QkFBNkI7QUFBQSxRQUM3QixpQkFBaUI7QUFBQSxVQUNmLGlCQUFpQjtBQUFBLFFBQ25CO0FBQUEsUUFDQSxlQUFlO0FBQUEsVUFDYjtBQUFBLFlBQ0UsUUFBUTtBQUFBLFlBQ1IsUUFBUTtBQUFBLGNBQ04saUJBQWlCLENBQUMsTUFBTTtBQUFBLGNBQ3hCLG1CQUFtQixDQUFDLE1BQU07QUFBQSxZQUM1QjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxnQkFBZ0I7QUFBQSxVQUNkLGFBQWE7QUFBQSxRQUNmO0FBQUEsUUFDQSxjQUFjO0FBQUEsUUFDZCxtQkFBbUI7QUFBQSxVQUNqQjtBQUFBLFlBQ0UsVUFBVTtBQUFBLFlBQ1YsS0FBSztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsWUFDRSxVQUFVO0FBQUEsWUFDVixLQUFLO0FBQUEsVUFDUDtBQUFBLFFBQ0Y7QUFBQSxRQUNBLGNBQWM7QUFBQSxVQUNaLFFBQVE7QUFBQSxVQUNSLFFBQVE7QUFBQSxVQUNSLFFBQVE7QUFBQSxZQUNOLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLEtBQUs7QUFBQSxVQUNQO0FBQUEsUUFDRjtBQUFBLFFBQ0EsU0FBUztBQUFBLFVBQ1A7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLGFBQWE7QUFBQSxZQUNiLEtBQUs7QUFBQSxZQUNMLFVBQVU7QUFBQSxZQUNWLGdCQUFnQjtBQUFBLFlBQ2hCLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxZQUNOLGFBQWE7QUFBQSxjQUNYO0FBQUEsZ0JBQ0UsS0FBSztBQUFBLGdCQUNMLE9BQU87QUFBQSxnQkFDUCxPQUFPO0FBQUEsY0FDVDtBQUFBLFlBQ0Y7QUFBQSxZQUNBLE9BQU87QUFBQSxjQUNMO0FBQUEsZ0JBQ0UsS0FBSztBQUFBLGdCQUNMLE9BQU87QUFBQSxjQUNUO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxhQUFhO0FBQUEsVUFDWDtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sVUFBVTtBQUFBLFlBQ1YsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixVQUFVO0FBQUEsWUFDVixPQUFPO0FBQUEsVUFDVDtBQUFBLFFBQ0Y7QUFBQSxRQUNBLE9BQU87QUFBQSxVQUNMO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1g7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1g7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFVBRUE7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1g7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUEsUUFDRjtBQUFBLFFBQ0EsV0FBVztBQUFBLFVBQ1Q7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLFlBQVk7QUFBQSxZQUNaLGFBQWE7QUFBQSxZQUNiLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxjQUNMO0FBQUEsZ0JBQ0UsS0FBSztBQUFBLGdCQUNMLE9BQU87QUFBQSxjQUNUO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixZQUFZO0FBQUEsWUFDWixhQUFhO0FBQUEsWUFDYixLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsY0FDTDtBQUFBLGdCQUNFLEtBQUs7QUFBQSxnQkFDTCxPQUFPO0FBQUEsY0FDVDtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sWUFBWTtBQUFBLFlBQ1osYUFBYTtBQUFBLFlBQ2IsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLGNBQ0w7QUFBQSxnQkFDRSxLQUFLO0FBQUEsZ0JBQ0wsT0FBTztBQUFBLGNBQ1Q7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ1osU0FBUyxDQUFDLGNBQWM7QUFBQSxFQUMxQjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBLFVBQ1osUUFBUSxDQUFDLFNBQVMsV0FBVztBQUFBLFVBQzdCLFFBQVEsQ0FBQyxrQkFBa0I7QUFBQSxVQUMzQixPQUFPLENBQUMsY0FBYztBQUFBLFVBQ3RCLFFBQVEsQ0FBQyxtQkFBbUI7QUFBQSxVQUM1QixRQUFRLENBQUMsZUFBZTtBQUFBLFFBQzFCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLHVCQUF1QjtBQUFBLElBQ3ZCLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNiLFVBQVU7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLGVBQWU7QUFBQSxNQUNqQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
