import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

import defaultPlotsJson from './src/default-plots.json'
const plots = defaultPlotsJson.map(e => e.url)

export default defineConfig({
  base: './',
  build: {
    assetsDir: '.',
  },
  plugins: [
    VitePWA({
      includeAssets: ['plots.schema.json', ...plots],
      injectRegister: 'inline',
      manifest: {
        short_name: 'Map',
        name: 'Simple Map',
        start_url: '.',
        display: 'standalone',
        orientation: 'portrait-primary',
        theme_color: '#696969',
        background_color: '#696969',
        icons: [{
          src: "favicon-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable"
        }, {
          src: "favicon-192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any maskable"
        }],
      },
      workbox: {
        runtimeCaching: [{
          urlPattern: ({url}) => url.origin === 'https://tile.openstreetmap.org',
          handler: 'CacheFirst'
        }],
      },
    }),
  ]
})
