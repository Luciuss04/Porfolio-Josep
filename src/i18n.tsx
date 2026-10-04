import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export const LANGS = ['es', 'en', 'va', 'ja'] as const
export type Lang = (typeof LANGS)[number]

export const LANG_LABEL: Record<Lang, { short: string; name: string; html: string }> = {
  es: { short: 'ES', name: 'Español', html: 'es' },
  en: { short: 'EN', name: 'English', html: 'en' },
  va: { short: 'VA', name: 'Valencià', html: 'ca' },
  ja: { short: '日本', name: '日本語', html: 'ja' },
}

type ProjectCopy = { name: string; kind: string; desc: string; tags: string[] }

export type Dict = {
  title: string
  skip: string
  nav: { work: string; about: string; contact: string; lang: string }
  hero: { lead: string; ctaWork: string; ctaContact: string; hint: string; hintTouch: string }
  work: {
    title: string
    sub: string
    site: string
    code: string
    atenea: ProjectCopy
    poseidon: ProjectCopy
    portfolio: ProjectCopy
  }
  stack: { title: string; sub: string; mobile: string; web: string; backend: string; tools: string }
  about: { title: string; p1: string; p2: string; interestsTitle: string; interests: string[] }
  contact: { title: string; sub: string; copy: string; copied: string; elsewhere: string }
  footer: { made: string; top: string }
}

const es: Dict = {
  title: 'Josep Pérez Morente · Portfolio',
  skip: 'Saltar al contenido',
  nav: { work: 'Proyectos', about: 'Sobre mí', contact: 'Contacto', lang: 'Idioma' },
  hero: {
    lead: 'Estudio Desarrollo de Aplicaciones Multiplataforma y construyo bots de Discord, webs y apps con nombres de dioses griegos.',
    ctaWork: 'Ver proyectos',
    ctaContact: 'Escríbeme',
    hint: 'Mueve el cursor: hay constelaciones escondidas.',
    hintTouch: 'Toca el cielo: hay constelaciones escondidas.',
  },
  work: {
    title: 'Proyectos',
    sub: 'Lo que he construido y sigo manteniendo.',
    site: 'Ver web',
    code: 'Ver código',
    atenea: {
      name: 'AteneaUI',
      kind: 'Bot de música para Discord',
      desc: 'Slash commands, reproducción desde YouTube y soporte para enlaces de Spotify.',
      tags: ['Python', 'discord.py', 'yt-dlp'],
    },
    poseidon: {
      name: 'PoseidonUI',
      kind: 'Bot todo en uno para Discord',
      desc: 'Moderación automática, música, economía, mascotas RPG y un oráculo con IA, todo gestionado desde un panel web propio.',
      tags: ['Moderación', 'Economía', 'IA', 'Panel web'],
    },
    portfolio: {
      name: 'Este portfolio',
      kind: 'Web personal',
      desc: 'React, Tailwind y componentes de 21st.dev, en cuatro idiomas.',
      tags: ['React', 'Tailwind', '21st.dev'],
    },
  },
  stack: {
    title: 'Con qué trabajo',
    sub: 'Las herramientas que uso a diario y las que estoy aprendiendo.',
    mobile: 'Móvil',
    web: 'Web',
    backend: 'Backend',
    tools: 'Herramientas',
  },
  about: {
    title: 'Sobre mí',
    p1: 'Me estoy formando como desarrollador de aplicaciones multiplataforma. Me gusta llevar una idea desde el primer boceto hasta algo que la gente use de verdad: una interfaz clara, un backend que no se cae y detalles que se notan.',
    p2: 'Mis proyectos llevan nombres de la mitología griega porque cada uno tiene un carácter: Atenea pone la música, Poseidón pone orden.',
    interestsTitle: 'Lo que me interesa',
    interests: ['Desarrollo frontend', 'Inteligencia artificial', 'Diseño de interfaces', 'Diseño de videojuegos'],
  },
  contact: {
    title: '¿Construimos algo juntos?',
    sub: 'Estoy abierto a proyectos web, apps y bots. Respondo rápido.',
    copy: 'Copiar email',
    copied: 'Email copiado',
    elsewhere: 'También estoy en',
  },
  footer: { made: 'Diseñado y programado por Josep.', top: 'Volver arriba' },
}

const en: Dict = {
  title: 'Josep Pérez Morente · Portfolio',
  skip: 'Skip to content',
  nav: { work: 'Work', about: 'About', contact: 'Contact', lang: 'Language' },
  hero: {
    lead: 'I study cross-platform app development and build Discord bots, websites and apps named after Greek gods.',
    ctaWork: 'See my work',
    ctaContact: 'Get in touch',
    hint: 'Move your cursor: there are hidden constellations.',
    hintTouch: 'Touch the sky: there are hidden constellations.',
  },
  work: {
    title: 'Work',
    sub: 'Things I have built and still maintain.',
    site: 'Visit site',
    code: 'View code',
    atenea: {
      name: 'AteneaUI',
      kind: 'Music bot for Discord',
      desc: 'Slash commands, YouTube playback and support for Spotify links.',
      tags: ['Python', 'discord.py', 'yt-dlp'],
    },
    poseidon: {
      name: 'PoseidonUI',
      kind: 'All-in-one Discord bot',
      desc: 'Auto-moderation, music, economy, RPG pets and an AI oracle, all managed from its own web panel.',
      tags: ['Moderation', 'Economy', 'AI', 'Web panel'],
    },
    portfolio: {
      name: 'This portfolio',
      kind: 'Personal site',
      desc: 'React, Tailwind and 21st.dev components, in four languages.',
      tags: ['React', 'Tailwind', '21st.dev'],
    },
  },
  stack: {
    title: 'What I work with',
    sub: 'The tools I use every day and the ones I am learning.',
    mobile: 'Mobile',
    web: 'Web',
    backend: 'Backend',
    tools: 'Tools',
  },
  about: {
    title: 'About',
    p1: 'I am training as a cross-platform app developer. I like taking an idea from the first sketch to something people actually use: a clear interface, a backend that stays up and details you can feel.',
    p2: 'My projects are named after Greek mythology because each one has a character: Athena brings the music, Poseidon keeps order.',
    interestsTitle: 'What interests me',
    interests: ['Frontend development', 'Artificial intelligence', 'Interface design', 'Game design'],
  },
  contact: {
    title: 'Shall we build something together?',
    sub: 'Open to web, app and bot projects. I reply quickly.',
    copy: 'Copy email',
    copied: 'Email copied',
    elsewhere: 'Also on',
  },
  footer: { made: 'Designed and built by Josep.', top: 'Back to top' },
}

const va: Dict = {
  title: 'Josep Pérez Morente · Portfolio',
  skip: 'Saltar al contingut',
  nav: { work: 'Projectes', about: 'Sobre mi', contact: 'Contacte', lang: 'Idioma' },
  hero: {
    lead: "Estudie Desenvolupament d'Aplicacions Multiplataforma i construïsc bots de Discord, webs i apps amb noms de déus grecs.",
    ctaWork: 'Veure projectes',
    ctaContact: 'Escriu-me',
    hint: 'Mou el cursor: hi ha constel·lacions amagades.',
    hintTouch: 'Toca el cel: hi ha constel·lacions amagades.',
  },
  work: {
    title: 'Projectes',
    sub: 'El que he construït i continue mantenint.',
    site: 'Veure web',
    code: 'Veure codi',
    atenea: {
      name: 'AteneaUI',
      kind: 'Bot de música per a Discord',
      desc: 'Slash commands, reproducció des de YouTube i suport per a enllaços de Spotify.',
      tags: ['Python', 'discord.py', 'yt-dlp'],
    },
    poseidon: {
      name: 'PoseidonUI',
      kind: 'Bot tot en u per a Discord',
      desc: "Moderació automàtica, música, economia, mascotes RPG i un oracle amb IA, tot gestionat des d'un panell web propi.",
      tags: ['Moderació', 'Economia', 'IA', 'Panell web'],
    },
    portfolio: {
      name: 'Aquest portfolio',
      kind: 'Web personal',
      desc: 'React, Tailwind i components de 21st.dev, en quatre idiomes.',
      tags: ['React', 'Tailwind', '21st.dev'],
    },
  },
  stack: {
    title: 'Amb què treballe',
    sub: 'Les eines que use cada dia i les que estic aprenent.',
    mobile: 'Mòbil',
    web: 'Web',
    backend: 'Backend',
    tools: 'Eines',
  },
  about: {
    title: 'Sobre mi',
    p1: "M'estic formant com a desenvolupador d'aplicacions multiplataforma. M'agrada portar una idea des del primer esbós fins a una cosa que la gent use de veritat: una interfície clara, un backend que no cau i detalls que es noten.",
    p2: 'Els meus projectes porten noms de la mitologia grega perquè cadascun té un caràcter: Atena posa la música, Posidó posa ordre.',
    interestsTitle: "El que m'interessa",
    interests: ['Desenvolupament frontend', 'Intel·ligència artificial', "Disseny d'interfícies", 'Disseny de videojocs'],
  },
  contact: {
    title: 'Construïm alguna cosa junts?',
    sub: 'Estic obert a projectes web, apps i bots. Responc ràpid.',
    copy: 'Copiar email',
    copied: 'Email copiat',
    elsewhere: 'També estic a',
  },
  footer: { made: 'Dissenyat i programat per Josep.', top: 'Tornar amunt' },
}

const ja: Dict = {
  title: 'Josep Pérez Morente · ポートフォリオ',
  skip: '本文へスキップ',
  nav: { work: 'プロジェクト', about: '自己紹介', contact: 'お問い合わせ', lang: '言語' },
  hero: {
    lead: 'マルチプラットフォーム・アプリ開発を学びながら、ギリシャ神話の神々の名前を冠したDiscordボット、Webサイト、アプリを作っています。',
    ctaWork: 'プロジェクトを見る',
    ctaContact: '連絡する',
    hint: 'カーソルを動かすと、隠れた星座が現れます。',
    hintTouch: '空に触れると、隠れた星座が現れます。',
  },
  work: {
    title: 'プロジェクト',
    sub: 'これまでに作り、今も開発を続けているもの。',
    site: 'サイトを見る',
    code: 'コードを見る',
    atenea: {
      name: 'AteneaUI',
      kind: 'Discord用音楽ボット',
      desc: 'スラッシュコマンド、YouTube再生、Spotifyリンクに対応。',
      tags: ['Python', 'discord.py', 'yt-dlp'],
    },
    poseidon: {
      name: 'PoseidonUI',
      kind: 'オールインワンDiscordボット',
      desc: '自動モデレーション、音楽、経済システム、RPGペット、AIオラクルを専用のWebパネルで管理。',
      tags: ['モデレーション', '経済', 'AI', 'Webパネル'],
    },
    portfolio: {
      name: 'このポートフォリオ',
      kind: '個人サイト',
      desc: 'React、Tailwind、21st.devのコンポーネントで制作。4か国語に対応。',
      tags: ['React', 'Tailwind', '21st.dev'],
    },
  },
  stack: {
    title: '使用技術',
    sub: '毎日使っているツールと、いま学んでいるもの。',
    mobile: 'モバイル',
    web: 'Web',
    backend: 'バックエンド',
    tools: 'ツール',
  },
  about: {
    title: '自己紹介',
    p1: 'マルチプラットフォーム・アプリ開発者を目指して勉強中です。最初のスケッチから、実際に使ってもらえるものになるまで形にするのが好きです。わかりやすいインターフェース、落ちないバックエンド、そして気づいてもらえる細部。',
    p2: 'プロジェクトにギリシャ神話の名前をつけているのは、それぞれに個性があるからです。アテナは音楽を、ポセイドンは秩序を担当しています。',
    interestsTitle: '興味のあること',
    interests: ['フロントエンド開発', '人工知能', 'インターフェースデザイン', 'ゲームデザイン'],
  },
  contact: {
    title: '一緒に何か作りませんか？',
    sub: 'Web、アプリ、ボットのプロジェクトを受け付けています。返信は早めです。',
    copy: 'メールをコピー',
    copied: 'コピーしました',
    elsewhere: 'その他のリンク',
  },
  footer: { made: 'デザイン・開発：Josep', top: 'ページの先頭へ' },
}

export const DICTS: Record<Lang, Dict> = { es, en, va, ja }

function detectLang(): Lang {
  const param = new URLSearchParams(window.location.search).get('lang')
  if (param && (LANGS as readonly string[]).includes(param)) return param as Lang
  try {
    const saved = localStorage.getItem('lang')
    if (saved && (LANGS as readonly string[]).includes(saved)) return saved as Lang
  } catch {
    /* almacenamiento no disponible */
  }
  const nav = navigator.language.toLowerCase()
  if (nav.startsWith('ja')) return 'ja'
  if (nav.startsWith('ca') || nav.startsWith('va')) return 'va'
  if (nav.startsWith('en')) return 'en'
  return 'es'
}

type Ctx = { lang: Lang; t: Dict; setLang: (l: Lang) => void }
const I18nContext = createContext<Ctx | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(detectLang)

  useEffect(() => {
    document.documentElement.lang = LANG_LABEL[lang].html
    // La fuente japonesa solo se descarga si se elige 日本語
    if (lang === 'ja') import('@fontsource/noto-serif-jp/400.css')
    document.title = DICTS[lang].title
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* almacenamiento no disponible */
    }
    const url = new URL(window.location.href)
    if (lang === 'es') url.searchParams.delete('lang')
    else url.searchParams.set('lang', lang)
    window.history.replaceState(null, '', url)
  }, [lang])

  return <I18nContext.Provider value={{ lang, t: DICTS[lang], setLang }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n debe usarse dentro de I18nProvider')
  return ctx
}
