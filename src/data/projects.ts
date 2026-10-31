// ─────────────────────────────────────────────────────────────
//  PROYECTOS — para agregar uno nuevo, copia un bloque y edítalo.
//  Imagen: ponla en /public/projects/ y usa '/projects/archivo.jpg'.
//  Sin imagen: usa highlight (cifra grande) o codeSnippet.
//  Ojo: no publiques código de proyectos de una empresa.
// ─────────────────────────────────────────────────────────────
export type Lang = 'es' | 'en'
type T = Record<Lang, string>

export interface Project {
  id: string
  title: string
  category: T
  summary: T
  problem: T
  solution: T
  results: Record<Lang, string[]> // logros concretos; usa números reales cuando los tengas
  tech: string[]
  image?: string
  imageSrcSet?: string // versiones en varios anchos, ej: '/projects/x-600.webp 600w, /projects/x-1200.webp 1200w'
  codeSnippet?: string // se muestra si no hay imagen
  highlight?: { value: string; label: T } // cifra grande si no hay imagen
  liveUrl?: string
  repoUrl?: string
  year: string
  type: 'client' | 'software'
}

export const projects: Project[] = [
  {
    id: 'posleodev',
    title: 'POS Leo Dev',
    type: 'software',
    year: '2026',
    category: { es: 'Producto propio / punto de venta en la nube', en: 'Own product / cloud point of sale' },
    summary: {
      es: 'Punto de venta en la nube para colmados, bodegas, ferreterías y tiendas de República Dominicana, con factura electrónica e-CF para la DGII.',
      en: 'Cloud point of sale for Dominican corner stores, hardware stores and shops, with e-CF electronic invoicing for the DGII.',
    },
    problem: {
      es: 'Con la Ley 32-23 los negocios con RNC deben pasar a comprobante fiscal electrónico (e-CF). Muchos colmados y tiendas pequeñas no tienen un sistema de caja que lo emita, ni forma de ver sus ventas desde el celular.',
      en: 'Under Law 32-23, businesses with an RNC must move to electronic fiscal receipts (e-CF). Many small stores have no checkout system that issues them, nor a way to follow sales from their phone.',
    },
    solution: {
      es: 'Aplicación web (PWA) con API en Node.js y PostgreSQL multi-negocio con seguridad por filas. La caja funciona sin internet y sincroniza después sin duplicar ventas. La factura e-CF sale por una cola de reintentos conectada por API a Alanube, un proveedor autorizado por la DGII.',
      en: 'Web app (PWA) with a Node.js API and a multi-business PostgreSQL database with row-level security. The register works offline and syncs later without duplicating sales. The e-CF invoice goes through a retry queue connected by API to Alanube, a DGII-authorized provider.',
    },
    results: {
      es: [
        'Cobro en efectivo, tarjeta, transferencia y pago mixto, con fiado e inventario con alerta de stock bajo',
        'Roles de cajero, supervisor y dueño, con PIN de supervisor y registro de auditoría',
        'Cuadre de caja por turno, reportes y carga de catálogos grandes desde Excel',
        'Prueba de carga local: 8.879 ventas con 0 errores y un comprobante consecutivo por venta',
        'Sitio de presentación publicado y en etapa previa al piloto con el primer cliente',
      ],
      en: [
        'Cash, card, transfer and split payments, with store credit and low-stock alerts',
        'Cashier, supervisor and owner roles, with supervisor PIN and an audit log',
        'Shift cash reconciliation, reports and large catalog import from Excel',
        'Local load test: 8,879 sales with 0 errors and one sequential receipt per sale',
        'Presentation site published and in the stage before the pilot with the first client',
      ],
    },
    tech: ['React', 'TypeScript', 'Node.js', 'Fastify', 'PostgreSQL', 'Docker', 'PWA', 'IndexedDB', 'e-CF / Alanube', 'Vitest'],
    highlight: {
      value: 'e-CF',
      label: { es: 'factura electrónica para la DGII', en: 'electronic invoicing for the DGII' },
    },
    liveUrl: 'https://pos-leo-dev.pages.dev',
  },
  {
    id: 'mme',
    title: 'Multiservicios Manuel Esteban SRL',
    type: 'client',
    year: '2026',
    category: { es: 'Sitio web para cliente', en: 'Client website' },
    summary: {
      es: 'Sitio profesional para empresa dominicana de control de plagas enfocada en cocinas profesionales.',
      en: 'Professional website for a Dominican pest-control company focused on commercial kitchens.',
    },
    problem: {
      es: 'La empresa necesitaba un sitio profesional para mostrar sus servicios y recibir solicitudes de cotización.',
      en: 'The company needed a professional site to showcase its services and receive quote requests.',
    },
    solution: {
      es: 'Sitio multipágina con página por servicio, solicitud de cotización, zona de cobertura y contacto directo por WhatsApp.',
      en: 'Multi-page site with a page per service, quote request, coverage area and direct WhatsApp contact.',
    },
    results: {
      es: [
        '5 servicios con página propia',
        'SEO técnico: sitemap, robots y metadatos Open Graph',
        'Carga por partes (code splitting) para abrir rápido en móvil',
        'Botón de WhatsApp en todo el sitio',
      ],
      en: [
        '5 services, each with its own page',
        'Technical SEO: sitemap, robots and Open Graph metadata',
        'Code splitting for fast loading on mobile',
        'WhatsApp button across the whole site',
      ],
    },
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router', 'Vitest', 'Playwright', 'GitHub Actions', 'Netlify'],
    image: '/projects/mme-1200.webp',
    imageSrcSet: '/projects/mme-600.webp 600w, /projects/mme-1200.webp 1200w',
    liveUrl: 'https://multiservicios-manuel-esteban.pages.dev',
  },
  {
    id: 'monitorsuite',
    title: 'MainScreenDS Monitor Suite',
    type: 'software',
    year: '2026',
    category: { es: 'Software empresarial / servicio de Windows', en: 'Enterprise software / Windows service' },
    summary: {
      es: 'Supervisor externo en C# / .NET que mantiene funcionando las pizarras deportivas de una cadena con 150 sucursales. Una sola solución, instalada en cada sucursal.',
      en: 'External C# / .NET supervisor that keeps the sports boards of a 150-branch chain running. One solution, installed at every branch.',
    },
    problem: {
      es: 'El programa de las pizarras (MainScreenDS.exe) consumía cada vez más memoria durante horas hasta cerrarse o dar "Out of memory". No había código fuente para corregirlo.',
      en: 'The board app (MainScreenDS.exe) kept using more memory for hours until it crashed or threw "Out of memory". There was no source code to fix it.',
    },
    solution: {
      es: 'Servicio de Windows independiente con tres umbrales de memoria (1.250, 1.400 y 1.500 MB). Registra cada evento en logs y, solo en el nivel crítico, cierra el programa y lo vuelve a abrir en la pantalla de la sucursal con CreateProcessAsUser.',
      en: 'Standalone Windows service with three memory thresholds (1,250, 1,400 and 1,500 MB). It logs every event and, only at the critical level, closes the app and reopens it on the branch screen with CreateProcessAsUser.',
    },
    results: {
      es: [
        'Funciona sin tocar el programa original ni su inicio automático',
        'Problema resuelto en las 150 sucursales',
        'Una sola solución desplegada con el mismo instalador en cada sucursal',
        'Protección contra ciclos de reinicio: límite de intentos y enfriamiento',
        'Instalador self-contained para Windows x64: no requiere instalar .NET',
      ],
      en: [
        'Works without touching the original app or its autostart',
        'Issue solved across all 150 branches',
        'One solution, deployed with the same installer at every branch',
        'Restart-loop protection: attempt limits and cooldown',
        'Self-contained installer for Windows x64: no .NET install needed',
      ],
    },
    tech: ['C#', '.NET 8', 'Windows Service', 'Win32 API (CreateProcessAsUser)', 'Logging'],
    highlight: {
      value: '150',
      label: { es: 'sucursales con pizarras funcionando', en: 'branches with boards running' },
    },
  },
]
