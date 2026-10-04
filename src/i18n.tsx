import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { useLocation, useNavigate, type To } from 'react-router'
import type { ProjectStatus, ProjectType } from '@/data/projects'

export const LANGS = ['es', 'en'] as const
export type Lang = (typeof LANGS)[number]

export const LANG_LABEL: Record<Lang, { short: string; name: string }> = {
  es: { short: 'ES', name: 'Español' },
  en: { short: 'EN', name: 'English' },
}

// Textos de interfaz. El contenido de cada proyecto vive en src/data/projects.ts
export type Dict = {
  skip: string
  nav: { home: string; projects: string; about: string; contact: string; lang: string; menu: string; main: string }
  hero: {
    lead: string
    ctaWork: string
    ctaContact: string
    facts: { build: string; buildValue: string; stack: string; code: string }
  }
  featured: { title: string; sub: string; all: string }
  project: {
    caseStudy: string
    site: string
    code: string
    write: string
    type: string
    year: string
    status: string
    tech: string
    links: string
    about: string
    built: string
    screenshots: string
    notes: string
    decisions: string
    learned: string
    back: string
    more: string
    featuredMark: string
    external: string
  }
  types: Record<ProjectType, string>
  statuses: Record<ProjectStatus, string>
  projects: {
    title: string
    sub: string
    filters: string
    list: string
    all: string
    count: (n: number) => string
    empty: string
    reset: string
  }
  skills: { title: string; sub: string; groups: Record<'languages' | 'frontend' | 'bots' | 'build' | 'tools', string> }
  about: { title: string; p1: string; p2: string; interestsTitle: string; interests: string[]; timeline: string }
  contact: { title: string; sub: string; copy: string; copied: string; elsewhere: string }
  footer: { made: string; top: string }
  notFound: { title: string; text: string; home: string }
}

const es: Dict = {
  skip: 'Saltar al contenido',
  nav: {
    home: 'Inicio',
    projects: 'Proyectos',
    about: 'Sobre mí',
    contact: 'Contacto',
    lang: 'Idioma',
    menu: 'Menú',
    main: 'Principal',
  },
  hero: {
    lead: 'Hago webs, bots de Discord y herramientas de consola por encargo, en remoto. Estudio Desarrollo de Aplicaciones Multiplataforma.',
    ctaWork: 'Ver proyectos',
    ctaContact: 'Escríbeme',
    facts: {
      build: 'Qué construyo',
      buildValue: 'Webs, bots de Discord y herramientas de consola',
      stack: 'Con qué',
      code: 'Dónde está el código',
    },
  },
  featured: {
    title: 'Proyectos destacados',
    sub: 'Los tres proyectos que mejor muestran cómo trabajo.',
    all: 'Ver todos los proyectos',
  },
  project: {
    caseStudy: 'Ver proyecto',
    site: 'Ver web',
    code: 'Ver código',
    write: 'Escríbeme',
    type: 'Tipo',
    year: 'Año',
    status: 'Estado',
    tech: 'Tecnologías',
    links: 'Enlaces',
    about: 'Qué es',
    built: 'Qué construí',
    screenshots: 'Capturas',
    notes: 'A tener en cuenta',
    decisions: 'Decisiones',
    learned: 'Qué aprendí',
    back: 'Todos los proyectos',
    more: 'Otros proyectos destacados',
    featuredMark: 'Destacado',
    external: 'se abre en GitHub',
  },
  types: { web: 'Web', bot: 'Bot', practica: 'Práctica DAM' },
  statuses: { activo: 'Activo', terminado: 'Terminado' },
  projects: {
    title: 'Proyectos',
    sub: 'Todo lo que tengo público en GitHub y merece verse. Los destacados tienen página propia; el resto enlaza a su repositorio.',
    filters: 'Filtros',
    list: 'Lista de proyectos',
    all: 'Todos',
    count: (n) => (n === 1 ? '1 proyecto' : `${n} proyectos`),
    empty: 'Ningún proyecto coincide con estos filtros.',
    reset: 'Quitar filtros',
  },
  skills: {
    title: 'Con qué trabajo',
    sub: 'Solo tecnologías que se pueden ver en mis repositorios públicos.',
    groups: {
      languages: 'Lenguajes',
      frontend: 'Frontend',
      bots: 'Bots',
      build: 'Testing y build',
      tools: 'Herramientas',
    },
  },
  about: {
    title: 'Sobre mí',
    p1: 'Me estoy formando como desarrollador de aplicaciones multiplataforma (DAM). Me gusta llevar una idea desde el primer boceto hasta algo que funciona: una interfaz clara, código ordenado y detalles cuidados.',
    p2: 'En clase trabajo sobre todo con Java. Por mi cuenta hago webs con React y TypeScript y bots de Discord con Python.',
    interestsTitle: 'Lo que me interesa',
    interests: ['Desarrollo frontend', 'Inteligencia artificial', 'Diseño de interfaces', 'Diseño de videojuegos'],
    timeline: 'Trayectoria',
  },
  contact: {
    title: '¿Construimos algo juntos?',
    sub: 'Ahora mismo acepto encargos de webs y bots de Discord, en remoto. Cuéntame qué necesitas.',
    copy: 'Copiar email',
    copied: 'Email copiado',
    elsewhere: 'También estoy en',
  },
  footer: { made: 'Diseñado y programado por Josep.', top: 'Volver arriba' },
  notFound: {
    title: 'Esta página no existe',
    text: 'La dirección puede estar mal escrita o la página se ha movido.',
    home: 'Ir al inicio',
  },
}

const en: Dict = {
  skip: 'Skip to content',
  nav: {
    home: 'Home',
    projects: 'Projects',
    about: 'About',
    contact: 'Contact',
    lang: 'Language',
    menu: 'Menu',
    main: 'Main',
  },
  hero: {
    lead: 'I build websites, Discord bots and command-line tools to order, remotely. I study cross-platform application development.',
    ctaWork: 'See projects',
    ctaContact: 'Get in touch',
    facts: {
      build: 'What I build',
      buildValue: 'Websites, Discord bots and command-line tools',
      stack: 'With what',
      code: 'Where the code lives',
    },
  },
  featured: {
    title: 'Featured projects',
    sub: 'The three projects that best show how I work.',
    all: 'See all projects',
  },
  project: {
    caseStudy: 'View project',
    site: 'Visit site',
    code: 'View code',
    write: 'Get in touch',
    type: 'Type',
    year: 'Year',
    status: 'Status',
    tech: 'Technologies',
    links: 'Links',
    about: 'What it is',
    built: 'What I built',
    screenshots: 'Screenshots',
    notes: 'Worth knowing',
    decisions: 'Decisions',
    learned: 'What I learned',
    back: 'All projects',
    more: 'Other featured projects',
    featuredMark: 'Featured',
    external: 'opens on GitHub',
  },
  types: { web: 'Web', bot: 'Bot', practica: 'Coursework' },
  statuses: { activo: 'Active', terminado: 'Finished' },
  projects: {
    title: 'Projects',
    sub: 'Everything I have public on GitHub that is worth a look. Featured projects have their own page; the rest link to their repository.',
    filters: 'Filters',
    list: 'Project list',
    all: 'All',
    count: (n) => (n === 1 ? '1 project' : `${n} projects`),
    empty: 'No project matches these filters.',
    reset: 'Clear filters',
  },
  skills: {
    title: 'What I work with',
    sub: 'Only technologies you can see in my public repositories.',
    groups: {
      languages: 'Languages',
      frontend: 'Frontend',
      bots: 'Bots',
      build: 'Testing and build',
      tools: 'Tools',
    },
  },
  about: {
    title: 'About',
    p1: 'I am training as a cross-platform application developer. I like taking an idea from the first sketch to something that works: a clear interface, tidy code and polished details.',
    p2: 'In class I mostly work with Java. On my own I build websites with React and TypeScript and Discord bots with Python.',
    interestsTitle: 'What interests me',
    interests: ['Frontend development', 'Artificial intelligence', 'Interface design', 'Game design'],
    timeline: 'Path',
  },
  contact: {
    title: 'Shall we build something together?',
    sub: 'I’m currently taking on freelance work: websites and Discord bots, fully remote. Tell me what you need.',
    copy: 'Copy email',
    copied: 'Email copied',
    elsewhere: 'Also on',
  },
  footer: { made: 'Designed and built by Josep.', top: 'Back to top' },
  notFound: {
    title: 'This page does not exist',
    text: 'The address may be mistyped or the page has moved.',
    home: 'Go to home',
  },
}

export const DICTS: Record<Lang, Dict> = { es, en }

const isLang = (x: string | null): x is Lang => !!x && (LANGS as readonly string[]).includes(x)

function detectLang(): Lang {
  const param = new URLSearchParams(window.location.search).get('lang')
  if (isLang(param)) return param
  try {
    const saved = localStorage.getItem('lang')
    if (isLang(saved)) return saved
  } catch {
    /* almacenamiento no disponible */
  }
  return navigator.language.toLowerCase().startsWith('en') ? 'en' : 'es'
}

type Ctx = { lang: Lang; t: Dict; setLang: (l: Lang) => void; to: (path: string) => To }
const I18nContext = createContext<Ctx | null>(null)

/** Debe ir dentro del router: el idioma viaja en la URL como ?lang=en */
export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* almacenamiento no disponible */
    }
  }, [lang])

  function setLang(next: Lang) {
    setLangState(next)
    const params = new URLSearchParams(location.search)
    if (next === 'es') params.delete('lang')
    else params.set('lang', next)
    const search = params.toString()
    navigate({ pathname: location.pathname, search: search ? `?${search}` : '', hash: location.hash }, { replace: true })
  }

  // Enlace interno que conserva el idioma: to('/proyectos#x')
  const to = useCallback(
    (path: string): To => {
      const [pathname, hash] = path.split('#')
      return { pathname, search: lang === 'es' ? '' : `?lang=${lang}`, hash: hash ? `#${hash}` : '' }
    },
    [lang],
  )

  return <I18nContext.Provider value={{ lang, t: DICTS[lang], setLang, to }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n debe usarse dentro de I18nProvider')
  return ctx
}
