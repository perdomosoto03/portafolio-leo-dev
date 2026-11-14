// Páginas del sitio que tienen su propia URL. Las usan main.tsx (qué montar), entry-server.tsx y
// scripts/prerender.mjs (HTML estático con su propio <head>) y vite.config.ts (sitemap).
export const SITE_URL = 'https://leodevrd.com'

// Sin barra final: Cloudflare Pages sirve dist/<nombre>.html en /<nombre> y redirige /<nombre>/ a /<nombre>.
export const designPath = '/diseno-web-republica-dominicana'
export const designUrl = `${SITE_URL}${designPath}`

const title = 'Diseño web para negocios en República Dominicana | Leo Dev'
const description =
  'Páginas web y landing pages para negocios dominicanos. Desde RD$ 15,000 sin ITBIS, en 2 semanas desde que tengo tu material y con 30 días de ajustes.'

// Precios y plazos: mantener en sintonía con strings.ts (pricing) y con el JSON-LD de index.html.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${designUrl}#webpage`,
      url: designUrl,
      name: title,
      description,
      inLanguage: 'es',
      about: { '@id': `${SITE_URL}/#leodev` },
      breadcrumb: { '@id': `${designUrl}#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${designUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Diseño web en República Dominicana', item: designUrl },
      ],
    },
    {
      '@type': 'Service',
      '@id': `${designUrl}#servicio`,
      name: 'Diseño web para negocios en República Dominicana',
      serviceType: 'Diseño de páginas web y landing pages',
      provider: { '@type': 'ProfessionalService', '@id': `${SITE_URL}/#leodev`, name: 'Leo Dev', url: `${SITE_URL}/` },
      areaServed: { '@type': 'Country', name: 'República Dominicana' },
      offers: [
        {
          '@type': 'Offer',
          name: 'Landing page',
          priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'DOP', minPrice: 15000, valueAddedTaxIncluded: false },
        },
        {
          '@type': 'Offer',
          name: 'Sitio web de varias páginas',
          priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'DOP', minPrice: 25000, valueAddedTaxIncluded: false },
        },
      ],
    },
  ],
}

// Etiquetas del <head> que prerender.mjs reemplaza en el HTML de la portada para cada página.
export const designHead = { title, description, url: designUrl, jsonLd }

// Caso de Multiservicios Manuel Esteban. Cloudflare Pages sirve dist/proyectos/<nombre>.html en esta ruta.
export const mmeCasePath = '/proyectos/multiservicios-manuel-esteban'
export const mmeCaseUrl = `${SITE_URL}${mmeCasePath}`

const mmeTitle = 'Caso: sitio web de Multiservicios Manuel Esteban | Leo Dev'
const mmeDescription =
  'Sitio de varias páginas para una empresa dominicana de control de plagas: cinco servicios con página propia, cotización en línea y WhatsApp.'

export const mmeCaseHead = {
  title: mmeTitle,
  description: mmeDescription,
  url: mmeCaseUrl,
  jsonLd: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${mmeCaseUrl}#webpage`,
        url: mmeCaseUrl,
        name: mmeTitle,
        description: mmeDescription,
        inLanguage: 'es',
        about: { '@id': `${mmeCaseUrl}#sitio` },
        breadcrumb: { '@id': `${mmeCaseUrl}#breadcrumb` },
        primaryImageOfPage: `${SITE_URL}/projects/mme-1200.webp`,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${mmeCaseUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Multiservicios Manuel Esteban', item: mmeCaseUrl },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${mmeCaseUrl}#sitio`,
        name: 'Multiservicios Manuel Esteban SRL',
        url: 'https://multiservicios-manuel-esteban.pages.dev',
        creator: { '@id': `${SITE_URL}/#leandro` },
      },
    ],
  },
}
