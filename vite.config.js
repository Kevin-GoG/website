import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prerender from '@prerenderer/rollup-plugin'

// Cloudflare Pages has no Chrome — skip prerender in CI environments
const isCI = process.env.CF_PAGES === '1' || process.env.CI === 'true'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    !isCI && prerender({
      routes: [
        '/', '/privacy', '/terms', '/support', '/feedback', '/faq',
        '/zh', '/zh/privacy', '/zh/terms', '/zh/support', '/zh/feedback', '/zh/faq',
        '/ko', '/ko/privacy', '/ko/terms', '/ko/support', '/ko/feedback', '/ko/faq'
      ],
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: {
        renderAfterDocumentEvent: 'app-rendered',
      },
      postProcess(renderedRoute) {
        // Remove tags injected by react-helmet-async (data-rh="true") from the
        // prerendered HTML. Without this, the static HTML already contains the
        // helmet tags and the browser re-injects them at runtime, causing duplicates.
        renderedRoute.html = renderedRoute.html.replace(
          /<[^>]+ data-rh="true"[^>]*>.*?<\/[^>]+>|<[^>]+ data-rh="true"[^>]*\/?>/gs,
          '',
        );
      },
    }),
  ].filter(Boolean),
  server: {
    historyApiFallback: true,
  },
})
