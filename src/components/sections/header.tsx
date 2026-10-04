import { useEffect, useState } from 'react'
import { LANGS, LANG_LABEL, useI18n } from '@/i18n'
import { cn } from '@/lib/utils'

export function Header() {
  const { t, lang, setLang } = useI18n()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled ? 'border-b border-line/70 bg-abyss/80 backdrop-blur-md' : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="font-display text-2xl text-gold-pale">
          Josep
        </a>

        <nav className="flex items-center gap-1 sm:gap-6">
          <div className="hidden items-center gap-6 text-[15px] text-mist sm:flex">
            <a className="transition-colors hover:text-marble" href="#work">{t.nav.work}</a>
            <a className="transition-colors hover:text-marble" href="#about">{t.nav.about}</a>
            <a className="transition-colors hover:text-marble" href="#contact">{t.nav.contact}</a>
          </div>

          <div role="group" aria-label={t.nav.lang} className="flex rounded-full border border-line p-0.5">
            {LANGS.map((l) => (
              <button
                key={l}
                type="button"
                lang={LANG_LABEL[l].html}
                aria-pressed={lang === l}
                title={LANG_LABEL[l].name}
                onClick={() => setLang(l)}
                className={cn(
                  'min-w-9 rounded-full px-2.5 py-1 text-[13px] font-medium transition-colors',
                  lang === l ? 'bg-gold text-abyss' : 'text-mist hover:text-marble',
                )}
              >
                {LANG_LABEL[l].short}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
