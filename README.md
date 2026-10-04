# Porfolio · Josep Pérez Morente

Portfolio personal en cuatro idiomas (español, inglés, valenciano y japonés), hecho con **React**, **Tailwind CSS** y componentes al estilo de **[21st.dev](https://21st.dev)**.

🔗 **Web:** https://luciuss04.github.io/Porfolio-Josep/

## Desarrollo

```bash
npm install
npm run dev      # servidor local en http://localhost:5173
npm run build    # genera la web en /dist
```

Cada `push` a `main` construye y publica la web automáticamente en GitHub Pages (`.github/workflows/deploy-pages.yml`).

## Estructura

```
src/
├─ i18n.tsx                  textos de los 4 idiomas  ← aquí se cambia el contenido
├─ components/
│  ├─ ui/                    componentes reutilizables (estilo shadcn / 21st.dev)
│  │  ├─ constellation-field.tsx   cielo de constelaciones del inicio
│  │  ├─ spotlight-card.tsx        tarjeta con borde dorado que sigue al cursor
│  │  └─ button.tsx
│  └─ sections/              cada sección de la página
public/
├─ img/                      imágenes de los proyectos
└─ en/, va/, jp/, es/        redirecciones desde las URLs de la versión anterior
```

## Añadir componentes de 21st.dev

El proyecto ya está preparado para la CLI de shadcn (`components.json` y el alias `@/`). Copia el comando de instalación de cualquier componente en 21st.dev, por ejemplo:

```bash
npx shadcn@latest add "https://21st.dev/r/<autor>/<componente>?api_key=TU_API_KEY"
```

El componente aparece en `src/components/ui/` y se importa con `import { ... } from '@/components/ui/<componente>'`. Los colores del tema (`--primary`, `--background`, etc.) ya están definidos en `src/index.css`, así que los componentes heredan el dorado y azul de la web.
