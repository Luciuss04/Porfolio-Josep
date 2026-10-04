// Datos del sitio que no son proyectos. Sin imports: también lo lee scripts/prerender.mjs.

type L<T = string> = { es: T; en: T }

export const SITE_URL = 'https://luciuss04.github.io/Porfolio-Josep'
export const SITE_NAME = 'Josep Pérez Morente'
export const GITHUB_URL = 'https://github.com/Luciuss04'
export const EMAIL = 'luciuss4@proton.me'

export type PageKey = 'home' | 'projects' | 'about'

export const PAGES: Record<PageKey, { path: string; title: L; description: L }> = {
  home: {
    path: '/',
    title: { es: 'Josep Pérez Morente · Desarrollador', en: 'Josep Pérez Morente · Developer' },
    description: {
      es: 'Portfolio de Josep Pérez Morente, estudiante de DAM: webs, bots de Discord y proyectos en Java, Python y TypeScript.',
      en: 'Portfolio of Josep Pérez Morente, a cross-platform development student: websites, Discord bots and projects in Java, Python and TypeScript.',
    },
  },
  projects: {
    path: '/proyectos',
    title: { es: 'Proyectos · Josep Pérez Morente', en: 'Projects · Josep Pérez Morente' },
    description: {
      es: 'Todos los proyectos públicos de Josep Pérez Morente, con filtros por tecnología, tipo y año.',
      en: 'All of Josep Pérez Morente’s public projects, filterable by technology, type and year.',
    },
  },
  about: {
    path: '/sobre-mi',
    title: { es: 'Sobre mí · Josep Pérez Morente', en: 'About · Josep Pérez Morente' },
    description: {
      es: 'Quién es Josep Pérez Morente, qué estudia y con qué tecnologías trabaja.',
      en: 'Who Josep Pérez Morente is, what he studies and the technologies he works with.',
    },
  },
}

// Solo tecnologías respaldadas por los repositorios públicos
export const SKILLS: { id: 'languages' | 'frontend' | 'bots' | 'build' | 'tools'; items: string[] }[] = [
  { id: 'languages', items: ['Java', 'Python', 'TypeScript', 'HTML/CSS'] },
  { id: 'frontend', items: ['React', 'Tailwind CSS'] },
  { id: 'bots', items: ['discord.py'] },
  { id: 'build', items: ['JUnit 5', 'Maven', 'Gradle'] },
  { id: 'tools', items: ['Git', 'GitHub Actions'] },
]

/** Tecnologías por las que se puede filtrar el índice de proyectos */
export const FILTER_TECH = SKILLS.flatMap((g) => g.items).filter((x) => x !== 'Git')

// Trayectoria: vacía hasta tener fechas reales. Mientras lo esté, la sección no se muestra.
export const TIMELINE: { year: string; title: L; text: L }[] = []
