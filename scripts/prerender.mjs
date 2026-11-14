// Prerenderiza cada página: mete el HTML de React dentro del HTML construido para que buscadores
// y agentes de IA vean el contenido sin ejecutar JavaScript. En el navegador, createRoot lo reemplaza.
//   - Portada:  dist/index.html
//   - Diseño web: dist/diseno-web-republica-dominicana.html (con su propio title, canonical y JSON-LD).
//     Cloudflare Pages sirve ese archivo en /diseno-web-republica-dominicana.
//   - Caso Multiservicios: dist/proyectos/multiservicios-manuel-esteban.html, igual que la anterior.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createServer } from 'vite'

const homeFile = new URL('../dist/index.html', import.meta.url)
const shell = await readFile(homeFile, 'utf8')
const marker = '<div id="root"></div>'
if (!shell.includes(marker)) throw new Error('prerender: no encontré <div id="root"></div> en dist/index.html')

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Reemplaza una etiqueta del <head>; falla si no existe, para no publicar una copia con el canonical de la portada.
const swap = (html, re, value, name) => {
  if (!re.test(html)) throw new Error(`prerender: no encontré ${name} en dist/index.html`)
  return html.replace(re, () => value)
}

const withHead = (html, h) => {
  let out = html
  out = swap(out, /<title>[^<]*<\/title>/, `<title>${escapeAttr(h.title)}</title>`, '<title>')
  out = swap(out, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeAttr(h.description)}" />`, 'meta description')
  out = swap(out, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeAttr(h.title)}" />`, 'og:title')
  out = swap(out, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeAttr(h.description)}" />`, 'og:description')
  out = swap(out, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${h.url}" />`, 'og:url')
  out = swap(out, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${h.url}" />`, 'canonical')
  const ld = JSON.stringify(h.jsonLd).replace(/</g, '\\u003c')
  out = swap(out, /<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${ld}</script>`, 'JSON-LD')
  return out
}

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})
try {
  const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')
  const { designHead, mmeCaseHead } = await vite.ssrLoadModule('/src/pages.ts')
  const inject = (html, page) => html.replace(marker, () => `<div id="root">${render(page)}</div>`)

  await writeFile(homeFile, inject(shell, 'home'))
  // Cada página: archivo en dist/, página de entry-server.tsx y su <head>.
  const pages = [
    ['diseno-web-republica-dominicana.html', 'design', designHead],
    ['proyectos/multiservicios-manuel-esteban.html', 'case-mme', mmeCaseHead],
  ]
  for (const [file, page, head] of pages) {
    const out = new URL(`../dist/${file}`, import.meta.url)
    await mkdir(new URL('.', out), { recursive: true })
    await writeFile(out, inject(withHead(shell, head), page))
  }
  console.log(`prerender: dist/index.html, ${pages.map(([f]) => `dist/${f}`).join(', ')} listos`)
} finally {
  await vite.close()
}
