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
      es: 'Supervisor externo en C# / .NET que vigila el programa de las pizarras deportivas de una cadena con 150 sucursales y lo recupera cuando su memoria llega al límite.',
      en: 'External C# / .NET supervisor that watches the sports-board app of a 150-branch chain and recovers it when its memory hits the limit.',
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
        'Recuperación automática probada al llegar al umbral crítico',
        'Protección contra ciclos de reinicio: límite de intentos y enfriamiento',
        'Instalador self-contained para Windows x64: no requiere instalar .NET',
        'En pruebas piloto antes del despliegue en todas las sucursales',
      ],
      en: [
        'Works without touching the original app or its autostart',
        'Automatic recovery tested at the critical threshold',
        'Restart-loop protection: attempt limits and cooldown',
        'Self-contained installer for Windows x64: no .NET install needed',
        'In pilot testing before rollout to every branch',
      ],
    },
    tech: ['C#', '.NET 8', 'Windows Service', 'Win32 API (CreateProcessAsUser)', 'Logging'],
    highlight: {
      value: '1.5 GB',
      label: { es: 'límite de memoria que activa la recuperación', en: 'memory limit that triggers recovery' },
    },
  },
]
