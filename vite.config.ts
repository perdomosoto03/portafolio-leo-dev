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

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), fontPreload()],
})
