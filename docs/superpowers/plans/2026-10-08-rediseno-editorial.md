# Rediseño editorial Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar la identidad visual del portafolio Leo Dev por la dirección editorial A (nombre gigante, foto B/N, índice de proyectos, footer tipográfico) sin cambiar contenido ni stack.

**Architecture:** Tokens de color en `src/index.css` consumidos por Tailwind; fuentes self-hosted vía Fontsource; `Sections.tsx` se divide en un archivo por sección bajo `src/components/`. Textos en `src/i18n/strings.ts` (ES/EN).

**Tech Stack:** React 19, TypeScript 6, Vite 8, Tailwind 3.4, Fontsource (Archivo variable con `wdth`, Instrument Sans), Phosphor icons.

**Spec:** `docs/superpowers/specs/2026-10-08-rediseno-editorial-design.md`

Ejecución: nativa (inline), elegida por el usuario: "hazlo todo tú, no me preguntes".

## Global Constraints

- Paleta exacta del spec: `--paper #EDEBE6/#141312`, `--paper-2 #E3E0D9/#1C1B19`, `--ink #131211/#ECE9E3`, `--ink-soft #5E5A54/#A39E96`, `--rule #CFCBC3/#2E2C29`, `--signal #FF4D1F/#FF5A2E`.
- Sin `rounded-*` en botones/contenedores (excepto punto de disponibilidad y botón de tema). Sin degradados ni sombras.
- Todo texto visible pasa por `strings.ts` en ES y EN.
- Tema por clase `.dark` en `<html>` (mecanismo actual de `src/theme.ts`, sin cambios).
- Nada queda oculto en `opacity: 0` esperando IntersectionObserver.
- Sin scroll horizontal a 375px.

## Review Focus

1. Cambio de idioma con un proyecto expandido: el acordeón mantiene su estado y los textos cambian.
2. Menú móvil abierto + `Esc` o clic en enlace: cierra, devuelve el foco a "Menú" y libera el scroll del body.
3. Nombre gigante a 320–375px: no desborda horizontalmente (verificar `scrollWidth === clientWidth`).
4. Marca "LEO DEV." del footer a 31vw: no genera scroll horizontal (contenedor `overflow-hidden`).
5. Tema oscuro: el contorno de "PERDOMO" y las líneas `--rule` siguen visibles.

No hay framework de tests en el proyecto. La verificación de cada tarea es `npm run build` + `npm run lint` + revisión en navegador (`npm run dev`). Los cinco puntos anteriores se verifican en la Tarea 6.

---

### Task 1: Fundamentos (fuentes, tokens, Tailwind, foto)

**Files:**
- Modify: `package.json` (quitar Geist, agregar `@fontsource-variable/archivo`, `@fontsource-variable/instrument-sans`)
- Modify: `src/main.tsx` (imports de fuentes: `@fontsource-variable/archivo/wdth.css`, `@fontsource-variable/instrument-sans`)
- Modify: `tailwind.config.js` (familias `display`, `sans`; colores `paper`, `paper-2`, `ink`, `ink-soft`, `rule`, `signal`, `on-signal`; keyframe `rise`)
- Modify: `src/index.css` (tokens claro/oscuro, `body`, utilidades `.wrap`, `.label`, `.display-xl`, `.sec-title`, `.btn-block`, `.link-cta`, foco)
- Modify: `src/theme.ts` (`theme-color` `#EDEBE6` / `#141312`)
- Modify: `index.html` (`theme-color` `#EDEBE6`)
- Create: `public/leandro.jpg` (foto B/N, 900px ancho, ≤ 150 KB)

**Interfaces — Produces:** clases Tailwind `bg-paper`, `text-ink`, `text-ink-soft`, `border-rule`, `text-signal`, `font-display`; utilidades CSS `.wrap`, `.label`, `.sec-title`, `.btn-block`, `.link-cta`.

- [ ] Instalar/desinstalar paquetes.
- [ ] Escribir tokens y utilidades.
- [ ] Optimizar foto con Pillow a `public/leandro.jpg`.
- [ ] `npm run build` pasa (el sitio viejo compila con nombres de color nuevos aún no usados: se aceptan clases viejas rotas hasta Task 2–5).
- [ ] Commit.

### Task 2: Nav + menú móvil + SkipLink

**Files:**
- Create: `src/components/Nav.tsx` (`Nav`, `MobileMenu`, `LangToggle`, `ThemeToggle`)
- Create: `src/components/SkipLink.tsx`
- Create: `src/lib/wa.ts` (`waLink(msg: string): string`)
- Modify: `src/i18n/strings.ts` (`nav.menuLabel`, `nav.closeLabel`)

**Interfaces — Produces:** `export function Nav()`, `export function SkipLink()`, `export const waLink`.

- [ ] Nav fija 56px, grid 3 columnas, marca "LEO DEV®", enlaces centrales, ES/EN texto, tema circular, "Escríbeme" subrayado.
- [ ] Bajo `lg` (1024px; el spec dice 860px, se usa el breakpoint `lg` de Tailwind más cercano que no rompe los 4 enlaces): marca + "Menú".
- [ ] Overlay `--ink` pantalla completa, enlaces display 62% gigantes, `Esc` cierra, foco atrapado, foco vuelve al botón, `overflow: hidden` en body.
- [ ] Build + lint. Commit.

### Task 3: Hero

**Files:**
- Create: `src/components/Hero.tsx`
- Modify: `src/i18n/strings.ts` (`hero.meta`, `hero.where`, `hero.first`, `hero.last`, `hero.claimA`, `hero.claimEm`, `hero.claimB`, `hero.lede`, `hero.caption1`, `hero.caption2`, `hero.photoAlt`, `hero.facts[]`)

- [ ] Grid 12 col: metadatos, `h1` LEANDRO/PERDOMO (contorno), foto 3:4 col 9–12 con pie, claim con franja `--signal`, lede, `btn-block` WhatsApp, enlace "Ver proyectos", 3 cifras.
- [ ] Móvil: nombre `clamp(72px,24vw,160px)`, foto debajo.
- [ ] Build + lint. Commit.

### Task 4: Servicios, Proyectos, Proceso, Sobre mí

**Files:**
- Create: `src/components/Services.tsx`, `src/components/Projects.tsx` (`Projects`, `ProjectRow`), `src/components/Process.tsx`, `src/components/About.tsx`
- Create: `src/components/SectionHead.tsx` (`SectionHead({ id, title, label })`)
- Modify: `src/i18n/strings.ts` (títulos cortos: `services.head`, `projects.head`, `process.head`, `about.head`, `*.label`; quitar `projects.filters`, `projects.eyebrow`)

- [ ] Servicios: 4 filas, título display izquierda, descripción + etiquetas `·` derecha.
- [ ] Proyectos: `button` por fila con `aria-expanded`/`aria-controls`, vista previa en hover (solo `hover:hover`), panel expandido con media, resumen, problema, solución, resultados, tech, enlace. Primer proyecto abierto. Estado por `id` (sobrevive al cambio de idioma).
- [ ] Proceso: `ol` 4 columnas, número en contorno.
- [ ] Sobre mí: dos párrafos, stack en 4 columnas, enlaces CV/LinkedIn/GitHub.
- [ ] Build + lint. Commit.

### Task 5: Footer, WhatsApp flotante, App, limpieza

**Files:**
- Create: `src/components/Footer.tsx`, `src/components/FloatingWhatsApp.tsx`
- Modify: `src/App.tsx`
- Delete: `src/components/Sections.tsx`, `src/components/CodeBackground.tsx`, `src/components/CodeWindow.tsx`
- Modify: `src/i18n/strings.ts` (`footer.ask`, `footer.contact`, `footer.online`, `footer.site`, `footer.top`, `footer.rights`; quitar `contact.title`/`contact.sub`/`hero.latest`/`hero.previewAlt` sin uso)
- Modify: `src/components/Icons.tsx` (quitar iconos sin uso)
- Modify: `public/favicon.svg` (cuadrado `#131211`, "L" condensada `#EDEBE6`, punto `#FF4D1F`)

- [ ] Footer `id="contacto"` fondo ink, columnas, barra, marca gigante cortada.
- [ ] WhatsApp flotante cuadrado 52px.
- [ ] `App.tsx` con imports por archivo.
- [ ] Build + lint. Commit.

### Task 6: Verificación + OG image + build de publicación

**Files:**
- Create: `scripts/og-image.py` no se agrega al repo; la imagen se genera desde el scratchpad.
- Modify: `public/og-image.png`

- [ ] `npm run dev`, revisar 1440 y 375 px, claro/oscuro, ES/EN. Verificar los 5 puntos de Review Focus.
- [ ] Generar OG 1200×630 (hueso, "LEANDRO PERDOMO" condensado, foto a la derecha).
- [ ] `npm run build`, copiar `dist/` a `../portafolio-leo-dev-para-publicar/`, regenerar los dos zips.
- [ ] Commit final.
