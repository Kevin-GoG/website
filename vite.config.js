import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prerender from '@prerenderer/rollup-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: [
        '/', '/privacy', '/terms', '/support', '/feedback', '/faq',
        '/zh', '/zh/privacy', '/zh/terms', '/zh/support', '/zh/feedback', '/zh/faq',
        '/ko', '/ko/privacy', '/ko/terms', '/ko/support', '/ko/feedback', '/ko/faq'
      ],
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: {
        renderAfterDocumentEvent: 'app-rendered',
      },
    }),
  ],
  server: {
    historyApiFallback: true,
  },
})
