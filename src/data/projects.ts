// Datos estáticos de los proyectos. Toda la información sale de los repositorios públicos
// de GitHub; lo que no se puede comprobar ahí no se incluye.
// Este fichero no importa nada: también lo lee scripts/prerender.mjs con Node.

export type L<T = string> = { es: T; en: T }

export type ProjectType = 'web' | 'bot' | 'practica'
export type ProjectStatus = 'activo' | 'terminado'

export type Image = { src: string; width: number; height: number; alt: L }

export type Project = {
  slug: string
  /** Nombre real del repositorio en GitHub */
  repoName: string
  name: L
  level: 'featured' | 'secondary'
  type: ProjectType
  years: number[]
  status: ProjectStatus
  tech: string[]
  repo: string
  demo?: string
  cover?: Image
  summary: L
  caseStudy?: {
    intro: L<string[]>
    built: L<string[]>
    screenshots: Image[]
    notes?: L<string[]>
    // Pendientes de texto del autor; si no existen, la página no muestra el bloque
    decisions?: L<string[]>
    learned?: L<string[]>
  }
}

const gh = (repo: string) => `https://github.com/Luciuss04/${repo}`

export const PROJECTS: Project[] = [
  {
    slug: 'poseidonui',
    repoName: 'PoseidonUI',
    name: { es: 'PoseidonUI', en: 'PoseidonUI' },
    level: 'featured',
    type: 'web',
    years: [2026],
    status: 'activo',
    tech: ['HTML/CSS', 'Tailwind CSS', 'JavaScript', 'Formspree', 'GitHub Pages'],
    repo: gh('PoseidonUI'),
    demo: 'https://luciuss04.github.io/PoseidonUI/',
    cover: {
      src: 'img/poseidon-panel.webp',
      width: 1400,
      height: 487,
      alt: {
        es: 'Panel de administración de PoseidonUI con el selector de servidor y las tarjetas de estado',
        en: 'PoseidonUI admin panel showing the server selector and status cards',
      },
    },
    summary: {
      es: 'La web de PoseidonUI: landing, pantalla de acceso, panel de administración y páginas legales, publicada en GitHub Pages.',
      en: 'The PoseidonUI website: landing page, sign-in screen, admin panel and legal pages, published on GitHub Pages.',
    },
    caseStudy: {
      intro: {
        es: [
          'El repositorio público contiene la web del proyecto PoseidonUI, no el bot. Son cinco páginas HTML estáticas servidas desde GitHub Pages.',
          'La pantalla de acceso y el panel son la capa de interfaz: hablan con una API externa cuyo código no está en este repositorio.',
        ],
        en: [
          'The public repository holds the PoseidonUI website, not the bot. It is five static HTML pages served from GitHub Pages.',
          'The sign-in screen and the panel are the interface layer: they talk to an external API whose code is not in this repository.',
        ],
      },
      built: {
        es: [
          'Landing con secciones de funcionamiento, características, preguntas frecuentes y novedades.',
          'Formulario de contacto conectado a Formspree.',
          'Pantalla de acceso que inicia el login con Discord contra el servidor del bot.',
          'Panel de administración con selector de servidor, tarjetas de estado y formularios de configuración que leen y guardan datos a través de una API REST.',
          'Páginas de política de privacidad y términos de servicio.',
          'Estilos con Tailwind CSS cargado por CDN y JavaScript sin framework.',
        ],
        en: [
          'Landing page with how-it-works, features, FAQ and changelog sections.',
          'Contact form wired to Formspree.',
          'Sign-in screen that starts the Discord login against the bot server.',
          'Admin panel with a server selector, status cards and settings forms that read and save data through a REST API.',
          'Privacy policy and terms of service pages.',
          'Styling with Tailwind CSS loaded from a CDN and framework-free JavaScript.',
        ],
      },
      screenshots: [],
      notes: {
        es: [
          'El backend (la API y el bot) no forma parte del repositorio público, así que aquí solo se describe la interfaz web.',
        ],
        en: [
          'The backend (the API and the bot) is not part of the public repository, so only the web interface is described here.',
        ],
      },
    },
  },
  {
    slug: 'ateneaui',
    repoName: 'AteneaUI',
    name: { es: 'AteneaUI', en: 'AteneaUI' },
    level: 'featured',
    type: 'bot',
    years: [2025],
    status: 'terminado',
    tech: ['Python', 'discord.py', 'yt-dlp', 'spotipy', 'GitHub Actions'],
    repo: gh('AteneaUI'),
    cover: {
      src: 'img/atenea.webp',
      width: 640,
      height: 601,
      alt: {
        es: 'Emblema de AteneaUI: un búho dorado con casco griego',
        en: 'AteneaUI emblem: a golden owl wearing a Greek helmet',
      },
    },
    summary: {
      es: 'Bot de música para Discord con slash commands, reproducción desde YouTube y soporte de enlaces de Spotify.',
      en: 'Music bot for Discord with slash commands, YouTube playback and support for Spotify links.',
    },
    caseStudy: {
      intro: {
        es: [
          'Bot escrito en Python con discord.py. Reproduce audio de YouTube mediante yt-dlp y acepta enlaces de Spotify de canciones, álbumes y playlists, que convierte en búsquedas.',
          'El código está separado en módulos de comandos, música, configuración y licencias, y cada cambio pasa por varios workflows de GitHub Actions.',
        ],
        en: [
          'A bot written in Python with discord.py. It plays YouTube audio through yt-dlp and accepts Spotify links for tracks, albums and playlists, which it turns into searches.',
          'The code is split into command, music, configuration and licence modules, and every change runs through several GitHub Actions workflows.',
        ],
      },
      built: {
        es: [
          'Slash commands de reproducción: play, pause, resume, skip, stop, queue, now, volume, shuffle, remove y clear.',
          'Autocompletado de resultados al escribir en /play.',
          'Resolución de enlaces de Spotify con spotipy.',
          'Configuración por servidor guardada en JSON, con comandos para consultarla y cambiarla.',
          'Licencias por servidor con periodo de prueba, gestionadas por comandos.',
          'CI con Ruff y Mypy, análisis de seguridad con Bandit, smoke test de importación, comprobación de FFmpeg y workflow de release.',
        ],
        en: [
          'Playback slash commands: play, pause, resume, skip, stop, queue, now, volume, shuffle, remove and clear.',
          'Result autocompletion while typing in /play.',
          'Spotify link resolution with spotipy.',
          'Per-server configuration stored as JSON, with commands to read and change it.',
          'Per-server licences with a trial period, managed through commands.',
          'CI with Ruff and Mypy, security analysis with Bandit, an import smoke test, an FFmpeg check and a release workflow.',
        ],
      },
      screenshots: [],
    },
  },
  {
    slug: 'porfolio-josep',
    repoName: 'Porfolio-Josep',
    name: { es: 'Porfolio-Josep', en: 'Porfolio-Josep' },
    level: 'featured',
    type: 'web',
    years: [2025, 2026],
    status: 'activo',
    tech: ['TypeScript', 'React', 'Tailwind CSS', 'Vite', 'React Router', 'Motion', 'GitHub Actions'],
    repo: gh('Porfolio-Josep'),
    demo: 'https://luciuss04.github.io/Porfolio-Josep/',
    cover: {
      src: 'img/portfolio-home.webp',
      width: 1440,
      height: 900,
      alt: { es: 'Página de inicio de este portfolio', en: 'Home page of this portfolio' },
    },
    summary: {
      es: 'Este sitio: portfolio personal en español e inglés, con páginas de proyecto y despliegue automático en GitHub Pages.',
      en: 'This site: a personal portfolio in Spanish and English, with project pages and automatic deployment to GitHub Pages.',
    },
    caseStudy: {
      intro: {
        es: [
          'Aplicación de una sola página hecha con React, TypeScript y Vite. Reúne mis proyectos públicos con datos estáticos, sin depender de la API de GitHub al cargar.',
        ],
        en: [
          'A single-page application built with React, TypeScript and Vite. It gathers my public projects from static data, with no dependency on the GitHub API at load time.',
        ],
      },
      built: {
        es: [
          'Rutas con React Router: inicio, proyectos, detalle de proyecto y sobre mí.',
          'Índice de proyectos con filtros por tecnología, tipo y año que se guardan en la URL.',
          'Interfaz en español e inglés.',
          'Estilos con Tailwind CSS 4 y una paleta propia definida como tokens.',
          'Animaciones con Motion que se desactivan con prefers-reduced-motion.',
          'Despliegue automático con GitHub Actions; el build genera un HTML por ruta con su título y metadatos.',
        ],
        en: [
          'Routing with React Router: home, projects, project detail and about.',
          'Project index with technology, type and year filters stored in the URL.',
          'Interface in Spanish and English.',
          'Styling with Tailwind CSS 4 and a custom palette defined as tokens.',
          'Motion animations that switch off with prefers-reduced-motion.',
          'Automatic deployment with GitHub Actions; the build emits one HTML file per route with its own title and metadata.',
        ],
      },
      screenshots: [],
    },
  },

  // Hueco reservado: proyecto final de 2.º de DAM.
  // Se añadirá como 'featured' cuando exista su repositorio; no se muestra nada hasta entonces.

  {
    slug: 'simulador-futbol',
    repoName: 'EDtema6',
    name: { es: 'Simulador de fútbol', en: 'Football simulator' },
    level: 'secondary',
    type: 'practica',
    years: [2026],
    status: 'terminado',
    tech: ['Java', 'Gradle', 'Javadoc'],
    repo: gh('EDtema6'),
    summary: {
      es: 'Simulación por consola de un partido entre dos equipos, con narrador y clases documentadas con Javadoc.',
      en: 'Console simulation of a match between two teams, with a commentator and classes documented with Javadoc.',
    },
  },
  {
    slug: 'tests-junit5',
    repoName: 'EDTema5Junix',
    name: { es: 'Tests con JUnit 5', en: 'Tests with JUnit 5' },
    level: 'secondary',
    type: 'practica',
    years: [2026],
    status: 'terminado',
    tech: ['Java', 'JUnit 5', 'Gradle'],
    repo: gh('EDTema5Junix'),
    summary: {
      es: 'Siete ejercicios con pruebas unitarias diseñadas a partir de la complejidad ciclomática de cada método.',
      en: 'Seven exercises with unit tests designed from the cyclomatic complexity of each method.',
    },
  },
  {
    slug: 'tamagochi',
    repoName: 'Tamagochi',
    name: { es: 'Tamagochi', en: 'Tamagochi' },
    level: 'secondary',
    type: 'practica',
    years: [2026],
    status: 'terminado',
    tech: ['Java'],
    repo: gh('Tamagochi'),
    summary: {
      es: 'Mascota virtual de consola: comer, dormir, jugar y bañarse cambian sus estadísticas, y un sprite ASCII muestra cómo está.',
      en: 'Console virtual pet: eating, sleeping, playing and bathing change its stats, and an ASCII sprite shows how it feels.',
    },
  },
  {
    slug: 'cv-terminal',
    repoName: 'Maven',
    name: { es: 'CV en terminal', en: 'Terminal CV' },
    level: 'secondary',
    type: 'practica',
    years: [2026],
    status: 'terminado',
    tech: ['Java', 'Maven', 'Lanterna', 'JFiglet'],
    repo: gh('Maven'),
    summary: {
      es: 'Currículum animado en la terminal con un banner ASCII, hecho con Lanterna y JFiglet.',
      en: 'An animated CV in the terminal with an ASCII banner, built with Lanterna and JFiglet.',
    },
  },
  {
    slug: 'debate-llms',
    repoName: 'Gradle',
    name: { es: 'Debate entre LLMs locales', en: 'Local LLM debate' },
    level: 'secondary',
    type: 'practica',
    years: [2026],
    status: 'terminado',
    tech: ['Java', 'Gradle', 'LangChain4j', 'Ollama'],
    repo: gh('Gradle'),
    summary: {
      es: 'Dos modelos de lenguaje locales debaten entre sí mediante LangChain4j y Ollama; incluye tareas de Gradle propias.',
      en: 'Two local language models debate each other through LangChain4j and Ollama; includes custom Gradle tasks.',
    },
  },
]

export const FEATURED = PROJECTS.filter((p) => p.level === 'featured')

export const yearLabel = (p: Project) => p.years.join('–')
