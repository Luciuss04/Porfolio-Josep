---
name: Porfolio Josep
description: Portfolio personal de Josep Pérez Morente, oscuro, en violeta y oro
colors:
  violeta-ritual: "#7c3aed"
  violeta-profundo: "#6d28d9"
  violeta-lunar: "#a78bfa"
  violeta-palido: "#c9b8ff"
  oro-votivo: "#d6a940"
  oro-palido: "#f0d68a"
  abismo: "#09070f"
  piedra-nocturna: "#120e1d"
  filete: "#2b2340"
  marmol: "#ece8f2"
  bruma: "#a59fb8"
typography:
  display:
    fontFamily: "Marcellus, Trajan Pro, Georgia, serif"
    fontSize: "clamp(2.75rem, 8.5vw, 6rem)"
    fontWeight: 400
    lineHeight: 1.02
  headline:
    fontFamily: "Marcellus, Trajan Pro, Georgia, serif"
    fontSize: "3rem"
    fontWeight: 400
    lineHeight: 1.25
  title:
    fontFamily: "Marcellus, Trajan Pro, Georgia, serif"
    fontSize: "1.875rem"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "Instrument Sans, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Instrument Sans, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.14em"
rounded:
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  full: "9999px"
spacing:
  gutter: "20px"
  gutter-wide: "32px"
  card: "28px"
  card-wide: "36px"
  section: "80px"
  section-wide: "112px"
components:
  button-primary:
    backgroundColor: "{colors.violeta-ritual}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "10px 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.violeta-profundo}"
    textColor: "#ffffff"
  button-outline:
    backgroundColor: "{colors.abismo}"
    textColor: "{colors.marmol}"
    rounded: "{rounded.full}"
    padding: "10px 20px"
    height: "44px"
  button-outline-hover:
    textColor: "{colors.violeta-palido}"
  chip-filter:
    textColor: "{colors.marmol}"
    rounded: "{rounded.full}"
    padding: "0 14px"
    height: "44px"
  chip-filter-selected:
    backgroundColor: "{colors.violeta-ritual}"
    textColor: "#ffffff"
  tag-tech:
    backgroundColor: "{colors.abismo}"
    textColor: "{colors.bruma}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  card-spotlight:
    backgroundColor: "{colors.piedra-nocturna}"
    textColor: "{colors.marmol}"
    rounded: "{rounded.2xl}"
    padding: "28px"
---

# Design System: Porfolio Josep

## Overview

**Creative North Star: "El Templo Nocturno"**

Arquitectura clásica vista de noche. La tipografía de los titulares recuerda a una inscripción en piedra, el oro aparece como un detalle grabado y la luz violeta entra de lado, despacio, sin iluminarlo todo. El sitio es oscuro porque el contenido son capturas de interfaces oscuras y nombres con peso mitológico; el fondo se retira para que los proyectos sean lo único que brilla.

Los componentes son refinados y contenidos: bordes finos, respuesta suave, nada reclama atención hasta que se interactúa con ello. La densidad es baja y el espacio es generoso; cada página tiene pocos elementos y cada uno está acabado.

Este sistema rechaza explícitamente dos cosas: el aspecto de **plantilla de estudiante** (barras de porcentaje de skills, filas de iconos de tecnologías, secciones de relleno) y el **neón gamer** (brillos saturados, partículas, efectos 3D, colores chillones).

**Key Characteristics:**
- Fondo casi negro con tinte violeta; la luz es ambiental y lenta.
- Violeta para lo que se puede pulsar; oro para lo que se quiere señalar.
- Titulares en serif de inscripción, texto en sans humanista.
- Superficies planas con borde fino; la elevación solo aparece como respuesta.
- Un momento de animación protagonista (la entrada del nombre) y el resto, discreto.

## Colors

Una paleta nocturna de dos acentos: el violeta hace el trabajo y el oro pone el detalle. Cada color lleva su nombre descriptivo y, al lado, el token con el que aparece en `src/index.css` y en las clases de Tailwind (`bg-violet`, `text-mist`, `border-line`…).

### Primary
- **Violeta Ritual** (`violeta-ritual` · en el código `--color-violet`, clase `violet`): relleno de todo lo que es acción principal: botón primario, filtro seleccionado, idioma activo, selección de texto.
- **Violeta Profundo** (`violeta-profundo` · en el código `--color-violet-deep`, clase `violet-deep`): estado hover de los rellenos violeta.
- **Violeta Lunar** (`violeta-lunar` · en el código `--color-violet-soft`, clase `violet-soft`): bordes que se iluminan al pasar el cursor o enfocar, y los halos del fondo.
- **Violeta Pálido** (`violeta-palido` · en el código `--color-violet-pale`, clase `violet-pale`): texto de acento sobre fondo oscuro: metadatos de proyecto, listas de tecnologías, enlaces en hover y el anillo de foco.

### Secondary
- **Oro Votivo** (`oro-votivo` · en el código `--color-gold`, clase `gold`): líneas finas de señalización: subrayado del enlace activo, filete de la fila enfocada, marcas de lista, punto de estado "activo".
- **Oro Pálido** (`oro-palido` · en el código `--color-gold-pale`, clase `gold-pale`): texto destacado: el apellido en el hero, la marca "Josep" de la cabecera, títulos en hover, cabeceras de los grupos de skills.

### Neutral
- **Abismo** (`abismo` · en el código `--color-abyss`, clase `abyss`): fondo de la página.
- **Piedra Nocturna** (`piedra-nocturna` · en el código `--color-surface`, clase `surface`): superficie de tarjetas, paneles y bandas de sección, casi siempre al 40–70 % de opacidad para dejar pasar la luz del fondo.
- **Filete** (`filete` · en el código `--color-line`, clase `line`): todos los bordes y divisores en reposo.
- **Mármol** (`marmol` · en el código `--color-marble`, clase `marble`): texto principal y titulares.
- **Bruma** (`bruma` · en el código `--color-mist`, clase `mist`): texto secundario, resúmenes y etiquetas.

### Named Rules
**La Regla del Oro Escaso.** El oro nunca rellena una superficie grande ni un botón de uso habitual. Aparece en líneas de 1 px y en texto destacado; su escasez es lo que lo hace valer.

**La Regla del Violeta Pulsable.** Si algo está relleno de violeta, se puede pulsar o está seleccionado. El violeta no se usa como decoración de texto corrido.

## Typography

**Display Font:** Marcellus (con Trajan Pro y Georgia como respaldo)
**Body Font:** Instrument Sans (con la sans del sistema como respaldo)

**Character:** Marcellus aporta la voz de inscripción clásica, con un solo peso y mucha presencia; Instrument Sans la acompaña con un tono neutro y actual que mantiene legible el texto largo.

### Hierarchy
- **Display** (400, `clamp(2.75rem, 8.5vw, 6rem)`, 1.02): solo el nombre en el hero. Tope de 6 rem.
- **Headline** (400, 3rem en móvil a 3.75rem en escritorio, 1.25): título de cada página y titulares de sección.
- **Title** (400, 1.5rem a 1.875rem, 1.2): nombres de proyecto en tarjetas, filas del índice y bloques de las páginas de detalle.
- **Body** (400, 1.0625rem, 1.6): texto general. Los párrafos de lectura se limitan a unos 36–38 rem de ancho (65–75 caracteres).
- **Label** (500, 0.75rem, espaciado 0.14em, mayúsculas): metadatos: tipo, año y estado de un proyecto, cabeceras de ficha, nombre de cada grupo de filtros.

### Named Rules
**La Regla del Título Solo.** Ningún titular lleva un antetítulo encima. Los metadatos van debajo del título o en la ficha lateral.

**La Regla del Texto Liso.** El texto es de un color sólido. Nada de gradientes en letras; el énfasis sale del tamaño o del color.

## Layout

Contenedor centrado de 72 rem de ancho máximo, con 20 px de margen lateral en móvil y 32 px a partir de 640 px. Las secciones se separan con 80 px en móvil y entre 96 y 112 px en escritorio; dentro de una tarjeta el relleno es de 28 px, 36 px en pantallas anchas.

- **Destacados:** rejilla asimétrica de tres columnas en escritorio: una tarjeta ancha de dos columnas, una estrecha, y una tercera a todo el ancho. En tablet y móvil se apilan en una sola columna.
- **Índice de proyectos:** una fila por proyecto con columnas fijas (año, contenido, miniatura, tipo y estado, flecha). La miniatura solo existe a partir de 1024 px; en móvil la fila se apila.
- **Detalle de proyecto:** columna de texto más una ficha lateral de 18 rem que se queda fija al hacer scroll; en móvil la ficha pasa debajo.
- **Cabecera:** fija, de 64 px; la navegación se convierte en un menú desplegable por debajo de 768 px.

Todos los controles miden al menos 44 px de alto en cualquier tamaño de pantalla.

## Elevation & Depth

Sistema plano. Las superficies se distinguen del fondo por un borde de 1 px y un cambio tonal mínimo, no por sombras. La profundidad la dan tres capas de luz: los halos lentos del fondo, la superficie translúcida y, encima, el contenido.

### Shadow Vocabulary
- **Resplandor de acción** (`box-shadow: 0 12px 28px -12px` en Violeta Ritual al 80 %): solo bajo el botón primario y el filtro seleccionado, que no tienen borde.

### Named Rules
**La Regla de la Elevación Única.** Un elemento se eleva con borde o con sombra, nunca con los dos. Las tarjetas tienen borde, así que al pasar el cursor suben 4 px y su borde se ilumina, sin sombra.

**La Regla del Reposo Plano.** En reposo nada flota. La elevación es una respuesta a hover o foco y desaparece al salir.

## Shapes

Dos formas y nada más: rectángulos de esquina suave para contenedores y píldoras para controles. Las tarjetas y paneles usan 16 px de radio; las imágenes dentro de una tarjeta, 12 px; las miniaturas, 8 px. Botones, filtros, etiquetas y el selector de idioma son píldoras completas. Los bordes son siempre de 1 px; los divisores de listas y secciones son líneas horizontales del mismo grosor.

## Components

### Buttons
- **Shape:** píldora completa, 44 px de alto mínimo, relleno horizontal de 20 px.
- **Primary:** fondo Violeta Ritual con texto blanco. Para la acción principal de cada bloque.
- **Hover / Focus:** sube 2 px, el fondo pasa a Violeta Profundo, aparece el resplandor de acción y un destello cruza el botón una vez. Al pulsar vuelve a su sitio y se encoge un 3 %. El mismo estado con teclado y con cursor.
- **Outline:** borde Filete sobre fondo Abismo al 40 %, texto Mármol. En hover el borde pasa a Violeta Lunar y el texto a Violeta Pálido. Para acciones secundarias: ver web, ver código, copiar email.

### Chips
- **Filtros:** píldoras de 44 px con borde Filete y texto Mármol. El seleccionado se rellena de Violeta Ritual, y ese relleno se desliza desde la opción anterior a la nueva.
- **Etiquetas de tecnología:** píldoras pequeñas con borde Filete y texto Bruma; no son interactivas.
- **Marca "Destacado":** píldora con borde dorado al 50 % y texto Oro Pálido.

### Cards / Containers
- **Corner Style:** 16 px.
- **Background:** Piedra Nocturna al 70 %.
- **Shadow Strategy:** ninguna; ver Elevation & Depth.
- **Border:** 1 px Filete; al pasar el cursor, un brillo Violeta Lunar recorre el borde siguiendo al puntero.
- **Internal Padding:** 28 px, 36 px a partir de 640 px.
- **Comportamiento:** la tarjeta con la atención sube 4 px y su imagen se acerca un 4 %; las tarjetas vecinas bajan al 80 % de opacidad, el mínimo que mantiene el texto secundario por encima de 4,5:1.

### Navigation
- Enlaces en Bruma que pasan a Mármol en hover y cuando están activos. El enlace activo lleva un subrayado Oro Votivo de 1 px que se desliza de un enlace a otro.
- Selector de idioma: dos opciones en una píldora con borde; la activa se rellena de Violeta Ritual y el relleno se desliza al cambiar.
- En móvil, un botón redondo de 44 px despliega la lista de enlaces bajo la cabecera; se cierra con Escape y al navegar.
- Bajo la cabecera, una línea de 1 px indica el progreso de lectura de la página.

### Fila del índice de proyectos
El componente propio del sitio. Cada fila muestra año, título, resumen, tecnologías, tipo y estado. Al pasar el cursor o enfocar una fila, las demás bajan al 80 % de opacidad (nunca menos: por debajo el texto secundario pierde el contraste AA), un filete dorado crece en su borde izquierdo, el título pasa a Oro Pálido y, si el proyecto tiene portada, aparece una miniatura. Al filtrar, las filas entran, salen y se recolocan con una transición.

### Movimiento
- **Momento protagonista:** en el hero, el nombre sube línea a línea desde detrás de una máscara (0,75 s). Es la única entrada larga del sitio.
- **Curva y ritmo:** una sola curva de salida, `cubic-bezier(0.16, 1, 0.3, 1)`; unos 0,3 s para cambios de estado, 0,28 s de entrada y 0,16 s de salida en el cambio de página.
- **Ambiente:** tres halos que se desplazan en ciclos de 28 a 36 s y una retícula que se desliza en 40 s y se detiene cuando el hero sale de pantalla.
- **Movimiento reducido:** se detienen los bucles, el parallax, las elevaciones y la transición de página; se conservan los cambios de color que confirman hover, foco y selección.

## Do's and Don'ts

### Do:
- **Do** usar Violeta Ritual solo en rellenos pulsables o seleccionados, y Oro Votivo solo en líneas de 1 px y texto destacado.
- **Do** dar a hover y a foco de teclado exactamente el mismo tratamiento visual.
- **Do** mantener todos los controles en 44 px de alto mínimo.
- **Do** poner los metadatos de un proyecto debajo de su título, en versalitas pequeñas.
- **Do** limitar el radio de las tarjetas a 16 px y reservar las píldoras para controles.
- **Do** marcar con `motion-safe` cualquier desplazamiento, para que desaparezca con movimiento reducido.

### Don't:
- **Don't** añadir barras de porcentaje de skills, filas de iconos de tecnologías ni secciones de relleno: es el aspecto de plantilla de estudiante que este sistema rechaza.
- **Don't** usar brillos saturados, partículas, efectos 3D ni colores chillones: nada de neón gamer.
- **Don't** combinar borde y sombra en el mismo elemento.
- **Don't** usar texto con gradiente ni antetítulos sobre los titulares.
- **Don't** usar desenfoque de fondo como decoración; solo la cabecera lo lleva, para que el contenido que pasa por debajo no estorbe.
- **Don't** añadir una segunda entrada animada larga: el nombre del hero es el único momento protagonista.
