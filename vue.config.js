const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  pwa: {
    name: 'Mi App Vue',
    themeColor: '#4DBA87',
    backgroundColor: '#ffffff',
    display: 'standalone',
    manifestOptions: {
      short_name: 'MiApp',
      start_url: '.',
      icons: [
        {
          src: './img/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: './img/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workboxPluginMode: 'GenerateSW', // usa Workbox para generar el Service Worker automáticamente
    workboxOptions: {
      // Puedes personalizar aquí qué archivos se cachean
    }
  }
})
