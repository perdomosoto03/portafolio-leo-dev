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
  codeSnippet?: string // se muestra si no hay imagen
  highlight?: { value: string; label: T } // cifra grande si no hay imagen
  liveUrl?: string
  repoUrl?: string
  year: string
  type: 'client' | 'software'
}

export const projects: Project[] = [
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
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Netlify'],
    image: '/projects/mme.jpg',
    liveUrl: 'https://multiserviciosmanuelesteban.netlify.app',
  },
  {
    id: 'monitorsuite',
    title: 'MainScreenDS Monitor Suite',
    type: 'software',
    year: '2026',
    category: { es: 'Software empresarial / servicio de Windows', en: 'Enterprise software / Windows service' },
    summary: {
      es: 'Servicio en .NET 8 que mantiene funcionando las pizarras de resultados de una cadena de bancas de apuestas con 150 sucursales.',
      en: '.NET 8 service that keeps the results boards running for a betting-shop chain with 150 branches.',
    },
    problem: {
      es: 'Las pizarras de resultados se caían constantemente. Los clientes se molestaban y se iban a otra banca.',
      en: 'The results boards crashed constantly. Customers got frustrated and went to a competitor.',
    },
    solution: {
      es: 'Servicio de monitoreo en segundo plano (Worker Service con BackgroundService + IHost), con instalador y desinstalador propios para desplegarlo en cada PC.',
      en: 'Background monitoring service (Worker Service with BackgroundService + IHost), with its own installer and uninstaller to deploy it on every PC.',
    },
    results: {
      es: [
        'Problema resuelto en las 150 sucursales',
        'Las pizarras dejaron de caerse',
        'Se evitó la pérdida de clientes por pizarras apagadas',
        'Arquitectura modular: servicio, instalador y desinstalador',
      ],
      en: [
        'Issue solved across all 150 branches',
        'Results boards stopped crashing',
        'Prevented losing customers to downed boards',
        'Modular architecture: service, installer and uninstaller',
      ],
    },
    tech: ['C#', '.NET 8', 'BackgroundService', 'IHost / DI'],
    highlight: {
      value: '150',
      label: { es: 'sucursales con pizarras estables', en: 'branches with stable boards' },
    },
  },
]
