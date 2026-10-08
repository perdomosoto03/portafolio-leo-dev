# Rediseño editorial del portafolio Leo Dev

Fecha: 2026-10-08
Estado: aprobado en conversación, pendiente de revisión escrita
Maqueta de referencia: https://claude.ai/artifact/2h5Def3snmRK3Hw98bz7TM

## Objetivo

Cambiar la identidad visual del sitio para que no parezca una plantilla generada con IA.
El sitio debe recordarse por el nombre gigante y la foto en blanco y negro de Leandro.

Éxito = una persona abre el sitio, no reconoce "la plantilla de siempre" y recuerda el nombre y la foto.

## Lo que no cambia

- Público: dueños de negocio que contratan a Leandro como freelancer.
- Contenido: servicios, proyectos, proceso, sobre mí, contacto.
- Stack: React 19, TypeScript, Vite, Tailwind 3.
- Bilingüe ES/EN con `LangContext` y `src/i18n/strings.ts`.
- Datos en `src/data/site.ts` y `src/data/projects.ts`.
- Modo claro y oscuro, con el toggle actual y `localStorage('theme')`.
- Despliegue en Netlify (`leodev-rd.netlify.app`).

## Sistema visual

### Tipografía

| Rol | Fuente | Uso |
|---|---|---|
| Display | Archivo variable, eje de ancho `wdth` | Nombre, títulos de sección, cifras, marca. Mayúsculas, `font-stretch: 62%`, peso 800–900, `line-height` ~0.82–0.9. |
| Display media | Archivo `font-stretch: 85%`, peso 700 | Títulos de proyecto, frase del footer. |
| Texto | Instrument Sans variable | Párrafos, navegación, botones. |
| Etiqueta | Archivo `font-stretch: 100%`, 12px, mayúsculas, `letter-spacing: .08em` | Metadatos (categoría, año, ubicación). |

Paquetes: `@fontsource-variable/archivo` (con archivo de eje `wdth`) y `@fontsource-variable/instrument-sans`.
Se eliminan `@fontsource-variable/geist` y `@fontsource-variable/geist-mono`.

### Color

Variables en `src/index.css` (formato `R G B`, igual que hoy):

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `--paper` | `#EDEBE6` | `#141312` | Fondo |
| `--paper-2` | `#E3E0D9` | `#1C1B19` | Superficie secundaria |
| `--ink` | `#131211` | `#ECE9E3` | Texto, botón principal, footer |
| `--ink-soft` | `#5E5A54` | `#A39E96` | Texto secundario, etiquetas |
| `--rule` | `#CFCBC3` | `#2E2C29` | Líneas finas |
| `--signal` | `#FF4D1F` | `#FF5A2E` | Acento. Solo: subrayado de enlaces CTA, resaltado del claim, hover de títulos, punto de disponibilidad, punto final de la marca del footer. |

Sin degradados, sin brillos, sin sombras.
`theme-color`: `#EDEBE6` claro, `#141312` oscuro.

### Forma y espaciado

- Sin bordes redondeados en botones ni contenedores. Excepción: el punto de disponibilidad y el botón de tema (círculos).
- Sin tarjetas. Las secciones se separan con líneas: 1px `--ink` bajo los títulos de sección y 1px `--rule` entre filas.
- Retícula de 12 columnas, ancho máximo 1440px, margen lateral `clamp(16px, 3.2vw, 40px)`.
- Botón principal: bloque rectangular `--ink` con texto `--paper`. En hover pasa a `--signal`.
- Botón secundario: enlace con subrayado `--signal` de 2px.

### Movimiento

- Entrada del nombre: cada línea sube 18% y aparece (0.9s, `cubic-bezier(.16,1,.3,1)`).
- Hover en filas de índice: desplazamiento de 12px y título en `--signal`.
- Todo respeta `prefers-reduced-motion`. Nada queda en `opacity: 0` esperando un observer.
- Se elimina `CodeBackground` y la animación `deco-float`.

## Secciones

### Navbar

- Fija arriba, fondo `--paper`, línea inferior `--rule`, 56px de alto.
- Izquierda: marca "LEO DEV®" en display condensado.
- Centro: Proyectos, Servicios, Proceso, Sobre mí (14px).
- Derecha: ES / EN en texto, botón de tema circular, enlace "Escríbeme" subrayado en `--signal`.
- Bajo 860px: solo marca y botón "Menú". El menú abre un overlay a pantalla completa en `--ink` con enlaces gigantes en display condensado, el selector de idioma, el tema, y WhatsApp/correo abajo. Cierra con "Cerrar", con `Esc` y al elegir un enlace. Bloquea el scroll del body mientras está abierto.

### Hero

- Línea de metadatos: "● Disponible para proyectos" a la izquierda y "Desarrollo web y software · República Dominicana" a la derecha.
- `h1`: "LEANDRO" sólido y "PERDOMO" en contorno (`-webkit-text-stroke: 2px`), columnas 1–8, `clamp(88px, 15.4vw, 230px)`.
- Foto en columnas 9–12, proporción 3:4, escala de grises, con pie: "Ing. de Software · UNICARIBE" y "Santo Domingo".
- Claim: "Sitios web que *consiguen clientes.* Software que no se cae." con franja `--signal` bajo la parte resaltada.
- Párrafo, botón "Escríbeme por WhatsApp →" y enlace "Ver proyectos".
- Fila de 3 cifras con línea `--ink` arriba: **150** sucursales con un servicio .NET suyo, **30 días** de ajustes, **ES / EN**.
- Móvil: nombre a todo el ancho (`clamp(72px, 24vw, 160px)`), foto debajo, cifras apiladas.
- Foto: `public/leandro.jpg` (la foto de estudio en blanco y negro), optimizada a ≤ 150 KB, con `width`/`height` explícitos y `fetchpriority="high"`.

### Servicios

- Título de sección gigante "SERVICIOS" con etiqueta a la derecha.
- Cuatro filas: título en display condensado a la izquierda (columnas 1–5), descripción y etiquetas a la derecha (columnas 7–12).
- Etiquetas como texto plano: "WhatsApp directo · Carga rápida · Diseño a medida".

### Proyectos

- Título "PROYECTOS" y etiqueta "Trabajo real · 2026".
- Índice: una fila por proyecto con título, categoría, año y flecha.
- Desktop con hover: aparece una vista previa inclinada (imagen o cifra destacada).
- Clic en la fila: se expande (acordeón, `aria-expanded`) y muestra imagen/cifra/código, resumen, Problema, Solución, Resultados, tecnologías como texto plano, y enlaces "Ver sitio ↗" o "Publicación próxima".
- El primer proyecto empieza expandido.
- Se eliminan los filtros Todos/Clientes/Software y la lectura de filtro inicial.

### Proceso

- Título "PROCESO".
- Cuatro columnas con línea arriba y número grande en contorno (01–04), título y descripción.
- Móvil: una columna.

### Sobre mí

- Título "SOBRE MÍ".
- Dos párrafos actuales en columnas 1–7.
- Stack en cuatro columnas de texto (Frontend, Backend / .NET, Herramientas, Soporte TI y redes), cada una con etiqueta y lista simple.
- Enlace "Descargar CV" subrayado en `--signal`.

### Footer y contacto

- Se elimina la sección `Contact`. El footer la absorbe y conserva `id="contacto"`.
- Fondo `--ink`, texto `--paper`.
- Fila: frase "¿Tienes un proyecto en mente? Hablemos." y tres columnas: Contacto (WhatsApp, correo), En línea (LinkedIn, GitHub si existe, CV), Sitio (enlaces de sección).
- Barra: "© 2026 Leandro Perdomo Soto · República Dominicana" y "Volver arriba ↑".
- Marca "LEO DEV." gigante (31vw) cortada por el borde inferior, con el punto en `--signal`, `aria-hidden`.

### WhatsApp flotante

- Se mantiene. Cuadrado de 52px, fondo `--ink`, icono `--paper`, hover `--signal`. Abajo a la derecha, respetando `safe-area-inset-bottom`.

## Estructura de código

`src/components/Sections.tsx` (22 KB) se divide en un archivo por sección:

```
src/components/
  Nav.tsx            Nav, MobileMenu, LangToggle, ThemeToggle
  Hero.tsx
  Services.tsx
  Projects.tsx       Projects, ProjectRow
  Process.tsx
  About.tsx
  Footer.tsx         Footer (incluye contacto)
  FloatingWhatsApp.tsx
  SkipLink.tsx
  Icons.tsx          (existente)
```

Se eliminan `CodeBackground.tsx` y `CodeWindow.tsx` si quedan sin uso.
`App.tsx` importa cada sección desde su archivo.

Textos nuevos (claim, metadatos, cifras, títulos de sección, frase del footer, "Menú", "Cerrar") se agregan a `strings.ts` en ES y EN.
Se quitan de `strings.ts` las claves que queden sin uso (filtros, `contact.title` de la sección eliminada si no se reutiliza).

## SEO y metadatos

- `index.html`: `theme-color` nuevo, `<link rel="preload">` de la fuente display.
- `public/og-image.png`: se regenera con el estilo nuevo (fondo hueso, "LEANDRO PERDOMO" condensado, foto). 1200×630.

## Accesibilidad

- `h1` único con el nombre completo legible (el contorno de "PERDOMO" mantiene contraste ≥ 3:1 por tamaño grande).
- Foco visible: contorno 2px `--signal`.
- Overlay de menú: foco atrapado dentro mientras está abierto, `Esc` cierra, el foco vuelve al botón "Menú".
- Filas de proyecto: `button` con `aria-expanded` y `aria-controls`.
- Contraste de `--ink-soft` sobre `--paper` ≥ 4.5:1 en ambos temas.

## Verificación

- `npm run build` sin errores de TypeScript.
- `npm run lint` sin errores.
- Revisión visual en navegador a 1440px y 375px, en claro y oscuro, en ES y EN.
- Sin scroll horizontal en móvil.
- Lighthouse móvil: Performance ≥ 90, Accesibilidad ≥ 95.

## Fuera de alcance

- Contenido nuevo (proyectos, testimonios, blog).
- Cambio de dominio o de hosting.
- Reorientar el sitio a reclutadores.
