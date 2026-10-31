# Leo Dev — Portafolio de Leandro Perdomo

Sitio de [Leo Dev](https://leodevrd.com): landing pages, sitios web para negocios y software a medida en C# / .NET, desde República Dominicana.

[![CI](https://github.com/perdomosoto03/portafolio-leo-dev/actions/workflows/ci.yml/badge.svg)](https://github.com/perdomosoto03/portafolio-leo-dev/actions/workflows/ci.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/43dce691-e3c1-48fa-a98b-91074efbbe9a/deploy-status)](https://app.netlify.com/projects/leodev-rd/deploys)

## Stack

- **React 19 + TypeScript** en modo estricto
- **Vite 8** para desarrollo y build
- **Tailwind CSS** con colores definidos como variables (tema claro y oscuro)
- Bilingüe **ES / EN** sin dependencias externas
- Fuentes propias (Archivo e Instrument Sans) servidas desde el sitio
- Publicado en **Netlify** con despliegue automático desde `main`

## Calidad

- Lighthouse: 97–100 en móvil y 100 en escritorio (rendimiento, accesibilidad, buenas prácticas y SEO)
- Content-Security-Policy sin `unsafe-inline` y encabezados de seguridad en [`public/_headers`](public/_headers)
- GitHub Actions revisa lint, tipos y build en cada push y pull request
- Dependabot avisa de actualizaciones semanalmente
- Imágenes WebP con `srcset` y precarga de fuentes y de la imagen principal

## Estructura

```
src/
  components/   una sección del sitio por archivo (Hero, Projects, Nav…)
  data/         contenido: datos personales (site.ts) y proyectos (projects.ts)
  i18n/         textos en español e inglés (strings.ts) y contexto de idioma
  lib/          utilidades (enlace de WhatsApp)
public/         archivos estáticos, _headers, 404 y CV
```

## Editar contenido

| Qué | Dónde |
|---|---|
| Nombre, WhatsApp, correo, redes, CV | `src/data/site.ts` |
| Proyectos (copia un bloque para agregar uno) | `src/data/projects.ts` |
| Todos los textos en ES y EN | `src/i18n/strings.ts` |
| Colores del tema | `src/index.css` (variables al inicio) |
| Imágenes de proyectos | `public/projects/` (WebP con varias medidas) |

## Comandos

```bash
npm install
npm run dev       # desarrollo en http://localhost:5173
npm run lint      # oxlint
npm run build     # tipos + build de producción en dist/
npm run preview   # sirve dist/ localmente
```

## Publicación

Cada push a `main` dispara el build en Netlify (configurado en [`netlify.toml`](netlify.toml)). No hace falta subir archivos a mano.

---

© Leandro Perdomo Soto. Todos los derechos reservados. El código es público para mostrar mi trabajo; no se permite reutilizar el diseño ni el contenido sin permiso.
