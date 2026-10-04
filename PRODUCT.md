# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dos públicos con el mismo peso, confirmados por Josep:

- **Empresas que evalúan para prácticas o un primer empleo.** Reclutadores y tutores de empresa que abren el enlace desde un CV o un correo. Miran rápido: quién es, qué sabe hacer de verdad y dónde está el código.
- **Personas que buscan a alguien que les haga una web o un bot de Discord.** Quieren ver trabajos anteriores antes de decidir si escriben.

Ninguno de los dos manda sobre el otro; el sitio no debe inclinarse hacia un tono de currículum ni hacia uno comercial.

## Product Purpose

Portfolio personal de Josep Pérez Morente, estudiante de Desarrollo de Aplicaciones Multiplataforma (DAM). Reúne en un solo sitio sus proyectos públicos de GitHub y explica cada uno con información comprobable.

**Éxito = que el visitante escriba.** El contacto por email o redes es la acción principal; ver el código y entender el nivel son pasos hacia ella, no el objetivo final.

## Positioning

Lo que se muestra es lo que hay en los repositorios públicos, descrito sin adornos: cada proyecto dice qué es, qué construyó Josep y con qué, y enlaza al código. Un proyecto cuyo backend no es público se presenta solo por la parte que sí se puede ver.

## Operating Context

- Se llega desde un enlace en un CV, un correo, el perfil de GitHub o una conversación en Discord; casi siempre es una primera visita y corta.
- El visitante compara con otros candidatos o proveedores y decide en poco tiempo si sigue leyendo.
- El sitio se publica en GitHub Pages bajo `/Porfolio-Josep/` y se despliega solo con cada push a `main`.

## Capabilities and Constraints

- **Rutas:** inicio, índice de proyectos con filtros (tecnología, tipo, año), página de detalle para cada proyecto destacado, y sobre mí. El contacto es una sección al final de cada página.
- **Idiomas (regla fija):** español como idioma principal e inglés como única traducción. No se añaden más idiomas.
- **Proyectos:** tres destacados (PoseidonUI, AteneaUI, Porfolio-Josep) y cinco prácticas de DAM. Los datos son estáticos, en `src/data/projects.ts`; el sitio no depende de la API de GitHub al cargar.
- **Tecnologías mostradas:** solo las doce respaldadas por los repositorios públicos (ver `src/data/site.ts`).
- **Pendiente, sin decidir todavía:**
  - Proyecto final de 2.º de DAM: hueco reservado como destacado; no se muestra nada hasta que exista su repositorio.
  - Trayectoria con fechas: la sección está preparada y oculta hasta que Josep aporte fechas reales.
  - Bloques "Decisiones" y "Qué aprendí" de cada proyecto: requieren texto del propio Josep.
- **Solo información verificable (regla fija):** no se inventan proyectos, métricas, clientes, usuarios, experiencia ni funciones. Todo lo que se muestra debe poder comprobarse en los repositorios públicos; si falta información, se pregunta a Josep o se omite.

## Brand Commitments

- **Nombre:** Josep Pérez Morente; en la cabecera, solo "Josep".
- **Nombres mitológicos (regla fija):** los proyectos propios llevan nombres de la mitología griega (AteneaUI, PoseidonUI). Forma parte de la marca y se mantiene en proyectos futuros.
- **Activos existentes:** emblema de AteneaUI (búho dorado con casco griego, `public/img/atenea.webp`) y captura del panel de PoseidonUI (`public/img/poseidon-panel.webp`).
- **Canales de contacto:** email, GitHub, Discord y Mastodon. X/Twitter se retiró a petición de Josep y no se vuelve a añadir.

## Evidence on Hand

- Repositorios públicos en `github.com/Luciuss04`: PoseidonUI (web publicada en GitHub Pages), AteneaUI, Porfolio-Josep, EDtema6, EDTema5Junix, Tamagochi, Maven y Gradle.
- Capturas reales: panel de PoseidonUI y página de inicio del propio portfolio.
- **No existe y no debe fabricarse:** testimonios, clientes, cifras de uso o de disponibilidad, precios, capturas de AteneaUI en funcionamiento, ni fechas de estudios o experiencia laboral.

## Product Principles

1. **El contacto es el destino.** Cada página deja claro cómo escribir a Josep; nada compite con esa acción.
2. **Dos públicos, una sola voz.** El mismo contenido debe servir a quien contrata y a quien encarga, sin versiones distintas.
3. **Enseñar antes que afirmar.** Un enlace al código o a la web publicada vale más que un adjetivo.
4. **Lo que falta, se omite.** Un hueco honesto es mejor que un relleno.
5. **Los nombres cuentan una historia.** La mitología griega da carácter a los proyectos y los hace recordables.

## Accessibility & Inclusion

Reglas fijas, confirmadas por Josep:

- **Contraste WCAG AA** en todo el texto y en los controles, en cualquier estado.
- **Movimiento reducido:** todo cambio debe respetar `prefers-reduced-motion`; con esa preferencia activa no hay desplazamientos, bucles ni transiciones de página, y el contenido se ve de inmediato.
- Navegación completa con teclado y foco visible.
