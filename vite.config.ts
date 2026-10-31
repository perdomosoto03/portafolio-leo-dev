import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// Precarga las dos fuentes latinas del sitio para que el texto del hero no salte al cargar (CLS).
// Los nombres llevan hash, así que se buscan en el bundle final.
const fontPreload = (): Plugin => ({
  name: 'font-preload',
  apply: 'build',
  transformIndexHtml: {
    order: 'post',
    handler(_html, ctx) {
      const files = Object.keys(ctx.bundle ?? {}).filter((f) =>
        /(archivo-latin-wdth-normal|instrument-sans-latin-wght-normal)-[\w-]+\.woff2$/.test(f),
      )
      return files.map((f) => ({
        tag: 'link',
        attrs: { rel: 'preload', href: `/${f}`, as: 'font', type: 'font/woff2', crossorigin: '' },
        injectTo: 'head' as const,
      }))
    },
  },
})

// Genera sitemap.xml en cada build con la fecha del día (antes había que editarla a mano).
const SITE_URL = 'https://leodevrd.com/'
const sitemap = (): Plugin => ({
  name: 'sitemap',
  apply: 'build',
  generateBundle() {
    const today = new Date().toISOString().slice(0, 10)
    this.emitFile({
      type: 'asset',
      fileName: 'sitemap.xml',
      source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}</loc><lastmod>${today}</lastmod></url>
</urlset>
`,
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), fontPreload(), sitemap()],
})
