# Porfolio · Josep Pérez Morente

Portfolio personal en español e inglés, hecho con **React**, **TypeScript**, **Vite** y **Tailwind CSS**.

🔗 **Web:** https://luciuss04.github.io/Porfolio-Josep/

## Desarrollo

```bash
npm install
npm run dev      # servidor local en http://localhost:5173/Porfolio-Josep/
npm run build    # genera la web en /dist (incluye un HTML por ruta, 404.html y sitemap.xml)
npm run lint
```

Cada `push` a `main` construye y publica la web automáticamente en GitHub Pages (`.github/workflows/deploy-pages.yml`).

## Páginas

| Ruta | Contenido |
|---|---|
| `/` | Inicio: presentación, proyectos destacados y tecnologías |
| `/proyectos` | Índice de todos los proyectos con filtros por tecnología, tipo y año |
| `/proyectos/<slug>` | Página de detalle de cada proyecto destacado |
| `/sobre-mi` | Sobre mí y tecnologías |

El inglés usa las mismas rutas con `?lang=en`.

## Estructura

```
src/
├─ data/
│  ├─ projects.ts            proyectos (textos ES/EN, tecnologías, enlaces)  ← aquí se añaden proyectos
│  └─ site.ts                metadatos de página, skills y trayectoria
├─ i18n.tsx                  textos de la interfaz en español e inglés
├─ pages/                    una página por ruta
├─ components/
│  ├─ ui/                    spotlight-card, button
│  ├─ layout/                fondo ambiental, reveal y grupos escalonados, scroll-manager
│  ├─ projects/              índice de proyectos, filtros, etiquetas
│  └─ sections/              cabecera, hero, destacados, skills, contacto, pie
scripts/prerender.mjs        tras el build, escribe el HTML de cada ruta con su título y metadatos
public/
├─ img/                      imágenes de los proyectos
└─ en/, va/, jp/, es/        redirecciones desde las URLs de versiones anteriores
```

## Añadir un proyecto

Añade una entrada en `src/data/projects.ts`. Con `level: 'featured'` y un bloque `caseStudy` tendrá página propia; con `level: 'secondary'` aparece solo en el índice y enlaza a su repositorio. Incluye solo información que se pueda comprobar en el repositorio.

La trayectoria de «Sobre mí» está preparada pero oculta: se muestra al añadir entradas a `TIMELINE` en `src/data/site.ts`.
