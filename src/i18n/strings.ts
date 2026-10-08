import type { Lang } from '../data/projects'

export const strings = {
  es: {
    nav: { services: 'Servicios', projects: 'Proyectos', about: 'Sobre mí', process: 'Proceso', contact: 'Contacto', cta: 'Escríbeme', menu: 'Abrir menú', menuClose: 'Cerrar menú', skip: 'Saltar al contenido', themeLight: 'Cambiar a modo claro', themeDark: 'Cambiar a modo oscuro' },
    hero: {
      badge: 'Disponible para nuevos proyectos',
      title1: 'Sitios web que',
      title2: 'consiguen clientes.',
      sub: 'Soy Leandro, estudiante de Ingeniería de Software. Diseño y desarrollo landing pages y software a medida para tu negocio.',
      primary: 'Escríbeme',
      secondary: 'Ver proyectos',
      latest: 'Último proyecto',
      previewAlt: 'Vista previa del sitio de Multiservicios Manuel Esteban',
    },
    services: {
      title: 'Lo que puedo hacer por tu negocio',
      items: [
        { t: 'Landing pages', d: 'Una página enfocada en convertir visitas en clientes: oferta clara, testimonios y botón directo a WhatsApp.', tags: ['WhatsApp directo','Carga rápida','Diseño a medida'] },
        { t: 'Sitios web para negocios', d: 'Varias páginas con servicios, cobertura, formulario de cotización y SEO básico para aparecer en Google.', tags: ['Varias páginas','SEO básico','Cotización en línea'] },
        { t: 'Software a medida', d: 'Herramientas internas, servicios de Windows y automatizaciones en C# / .NET para resolver procesos de tu empresa.', tags: ['C#','.NET 8','Servicios de Windows'] },
        { t: 'Dominio, hosting y soporte', d: 'Me encargo de publicar tu sitio, el dominio y el hosting. Incluye 30 días de ajustes sin costo.', tags: ['Dominio','Hosting','30 días de ajustes'] },
      ],
    },
    projects: {
      eyebrow: 'Portafolio',
      title: 'Proyectos y resultados',
      sub: 'Trabajo real para clientes y software propio. Cada proyecto con el problema, la solución y lo que se logró.',
      filters: { all: 'Todos', client: 'Clientes', software: 'Software' },
      problem: 'Problema',
      solution: 'Solución',
      results: 'Resultados',
      live: 'Ver sitio',
      repo: 'Código',
      soon: 'Publicación próxima',
      newTab: '(abre en una pestaña nueva)',
    },
    process: {
      title: 'De la idea a tu web publicada',
      steps: [
        { t: 'Conversamos', d: 'Me cuentas tu negocio, tus clientes y qué quieres lograr.' },
        { t: 'Cotización', d: 'Recibes una propuesta clara con precio, tiempos y alcance.' },
        { t: 'Diseño y desarrollo', d: 'Te muestro avances para que opines antes de publicar.' },
        { t: 'Publicación y soporte', d: 'Tu sitio en línea con dominio propio y 30 días de ajustes.' },
      ],
    },
    about: {
      title: 'Estudiante de ingeniería, desarrollador con proyectos reales',
      p1: 'Estudio Ingeniería de Software en UNICARIBE y soy técnico en Soporte TIC (ITLA). Trabajo en soporte técnico para una empresa con 150 sucursales, donde también desarrollo software que resuelve problemas reales del negocio.',
      p2: 'Trabajo tanto en frontend (React, TypeScript, Tailwind) como en backend y software de escritorio (C#, .NET 8). Uso herramientas de IA para entregar más rápido sin sacrificar calidad.',
      groups: { frontend: 'Frontend', backend: 'Backend / .NET', tools: 'Herramientas', infra: 'Soporte TI y redes' },
      cv: 'Descargar CV',
    },
    contact: {
      title: '¿Tienes un proyecto en mente?',
      sub: 'Cuéntame qué necesitas y te respondo con una cotización sin compromiso.',
      waMsg: 'Hola Leandro, vi tu portafolio y me interesa una página web para mi negocio.',
      mail: 'Correo',
    },
    footer: 'Hecho con React, TypeScript y Tailwind.',
  },
  en: {
    nav: { services: 'Services', projects: 'Projects', about: 'About', process: 'Process', contact: 'Contact', cta: 'Message me', menu: 'Open menu', menuClose: 'Close menu', skip: 'Skip to content', themeLight: 'Switch to light mode', themeDark: 'Switch to dark mode' },
    hero: {
      badge: 'Available for new projects',
      title1: 'Websites that',
      title2: 'win clients.',
      sub: "I'm Leandro, a Software Engineering student. I design and build landing pages and custom software for your business.",
      primary: 'Message me',
      secondary: 'See projects',
      latest: 'Latest project',
      previewAlt: 'Preview of the Multiservicios Manuel Esteban website',
    },
    services: {
      title: 'What I can do for your business',
      items: [
        { t: 'Landing pages', d: 'A single page built to turn visitors into clients: clear offer, testimonials and a direct WhatsApp button.', tags: ['Direct WhatsApp','Fast loading','Custom design'] },
        { t: 'Business websites', d: 'Multiple pages with services, coverage, a quote form and basic SEO to show up on Google.', tags: ['Multiple pages','Basic SEO','Online quote form'] },
        { t: 'Custom software', d: 'Internal tools, Windows services and automations in C# / .NET to solve your company processes.', tags: ['C#','.NET 8','Windows services'] },
        { t: 'Domain, hosting & support', d: 'I handle publishing, domain and hosting. Includes 30 days of free tweaks.', tags: ['Domain','Hosting','30 days of tweaks'] },
      ],
    },
    projects: {
      eyebrow: 'Portfolio',
      title: 'Projects & results',
      sub: 'Real client work and my own software. Each project with the problem, the solution and the outcome.',
      filters: { all: 'All', client: 'Clients', software: 'Software' },
      problem: 'Problem',
      solution: 'Solution',
      results: 'Results',
      live: 'Visit site',
      repo: 'Code',
      soon: 'Launching soon',
      newTab: '(opens in a new tab)',
    },
    process: {
      title: 'From idea to live website',
      steps: [
        { t: 'We talk', d: 'Tell me about your business, your clients and your goals.' },
        { t: 'Quote', d: 'You get a clear proposal with price, timeline and scope.' },
        { t: 'Design & build', d: 'I share progress so you can give feedback before launch.' },
        { t: 'Launch & support', d: 'Your site live on your own domain, plus 30 days of tweaks.' },
      ],
    },
    about: {
      title: 'Engineering student, developer with real projects',
      p1: 'I study Software Engineering at UNICARIBE and hold an IT Support certification (ITLA). I work in IT support for a company with 150 branches, where I also build software that solves real business problems.',
      p2: 'I work on frontend (React, TypeScript, Tailwind) as well as backend and desktop software (C#, .NET 8). I use AI tools to ship faster without cutting quality.',
      groups: { frontend: 'Frontend', backend: 'Backend / .NET', tools: 'Tools', infra: 'IT support & networking' },
      cv: 'Download CV',
    },
    contact: {
      title: 'Have a project in mind?',
      sub: "Tell me what you need and I'll reply with a no-commitment quote.",
      waMsg: "Hi Leandro, I saw your portfolio and I'm interested in a website for my business.",
      mail: 'Email',
    },
    footer: 'Built with React, TypeScript and Tailwind.',
  },
} satisfies Record<Lang, unknown>

export type Strings = (typeof strings)['es']
