import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { LANGS, LANG_LABEL, useI18n } from '@/i18n'
import { EASE, cn } from '@/lib/utils'

export function Header() {
  const { t, lang, setLang, to } = useI18n()
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const links = [
    { path: '/', label: t.nav.home, end: true },
    { path: '/proyectos', label: t.nav.projects, end: false },
    { path: '/sobre-mi', label: t.nav.about, end: false },
  ]
  const contactHref = { pathname, search: lang === 'es' ? '' : `?lang=${lang}`, hash: '#contact' }
  const glide = { duration: 0.32, ease: EASE }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled || open ? 'border-b border-line/70 bg-abyss/85 backdrop-blur-md' : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          to={to('/')}
          className="inline-flex min-h-11 items-center font-display text-2xl text-gold-pale transition-colors duration-300 hover:text-marble"
          onClick={() => setOpen(false)}
        >
          Josep
        </Link>

        <div className="flex items-center gap-3 sm:gap-6">
          <nav aria-label={t.nav.main} className="hidden items-center gap-7 text-[15px] md:flex">
            {links.map((l) => (
              <NavLink
                key={l.path}
                to={to(l.path)}
                end={l.end}
                className={({ isActive }) =>
                  cn('relative inline-flex min-h-11 items-center transition-colors duration-300 hover:text-marble', isActive ? 'text-marble' : 'text-mist')
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {/* El subrayado se desliza de un enlace a otro */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-2 h-px bg-gold"
                        transition={glide}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            {/* El contacto es el destino del sitio: se distingue con un contorno, sin relleno */}
            <Link
              to={contactHref}
              className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-marble transition-colors duration-300 hover:border-violet-soft/70 hover:text-violet-pale focus-visible:border-violet-soft/70 focus-visible:text-violet-pale"
            >
              {t.nav.contact}
            </Link>
          </nav>

          <div role="group" aria-label={t.nav.lang} className="flex rounded-full border border-line p-0.5">
            {LANGS.map((l) => (
              <button
                key={l}
                type="button"
                lang={l}
                aria-pressed={lang === l}
                title={LANG_LABEL[l].name}
                onClick={() => setLang(l)}
                className={cn(
                  'relative min-h-11 min-w-11 rounded-full px-2.5 text-[13px] font-medium transition-colors duration-300',
                  lang === l ? 'text-white' : 'text-mist hover:text-marble',
                )}
              >
                {/* La píldora se desliza de un idioma al otro */}
                {lang === l && (
                  <motion.span
                    layoutId="lang-pill"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-violet"
                    transition={glide}
                  />
                )}
                <span className="relative">{LANG_LABEL[l].short}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={t.nav.menu}
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-full border border-line text-marble transition-colors duration-300 hover:border-violet-soft/70 md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label={t.nav.main}
            className="overflow-hidden border-t border-line/70 md:hidden"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={glide}
          >
            <ul className="mx-auto max-w-6xl px-5 py-3 sm:px-8">
              {links.map((l) => (
                <li key={l.path}>
                  <NavLink
                    to={to(l.path)}
                    end={l.end}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'block border-l-2 py-3 pl-4 text-lg transition-colors duration-300',
                        isActive ? 'border-gold text-marble' : 'border-transparent text-mist',
                      )
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
              <li className="pb-2 pl-4 pt-3">
                <Link
                  to={contactHref}
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-11 items-center rounded-full border border-line px-5 text-lg text-marble transition-colors duration-300 hover:border-violet-soft/70 hover:text-violet-pale"
                >
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Progreso de lectura de la página */}
      {!reduce && (
        <motion.div
          aria-hidden="true"
          style={{ scaleX: scrollYProgress }}
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-violet-soft via-violet-soft to-gold"
        />
      )}
    </header>
  )
}
