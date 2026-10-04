import { useEffect } from 'react'
import { I18nProvider, useI18n } from '@/i18n'
import { Header } from '@/components/sections/header'
import { Hero } from '@/components/sections/hero'
import { Work } from '@/components/sections/work'
import { Stack } from '@/components/sections/stack'
import { About } from '@/components/sections/about'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/sections/footer'

function Page() {
  const { t } = useI18n()

  // Si se llega con un ancla (p. ej. desde una URL antigua de contacto), baja hasta ella
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
  }, [])
  return (
    <>
      <a
        href="#work"
        className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-full bg-gold px-4 py-2 text-abyss focus:translate-y-0"
      >
        {t.skip}
      </a>
      <Header />
      <main>
        <Hero />
        <Work />
        <Stack />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <I18nProvider>
      <Page />
    </I18nProvider>
  )
}
