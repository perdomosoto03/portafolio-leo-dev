# Portafolio Leo Dev

React + TypeScript + Vite + Tailwind. Bilingüe (ES/EN).

## Editar contenido
- `src/data/site.ts` → nombre, WhatsApp, correo, GitHub, LinkedIn, CV.
- `src/data/projects.ts` → proyectos. Copia un bloque para agregar uno nuevo.
- `src/i18n/strings.ts` → todos los textos en español e inglés.
- Imágenes de proyectos → `public/projects/`.

## Comandos
```
npm install
npm run dev      # ver en http://localhost:5173
npm run build    # genera carpeta dist/
```

## Publicar (Netlify)
1. `npm run build`
2. Arrastra la carpeta `dist/` a https://app.netlify.com/drop
3. Conecta tu dominio en Netlify → Domain settings.
