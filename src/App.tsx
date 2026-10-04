import { useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'motion/react'
import { I18nProvider, useI18n } from '@/i18n'
import { Ambient } from '@/components/layout/ambient'
import { ScrollManager } from '@/components/layout/scroll-manager'
import { Header } from '@/components/sections/header'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/sections/footer'
import { Home } from '@/pages/home'
import { Projects } from '@/pages/projects'
import { ProjectDetail } from '@/pages/project-detail'
import { About } from '@/pages/about'
import { NotFound } from '@/pages/not-found'
import { EASE } from '@/lib/utils'

function Layout() {
  const { t } = useI18n()
  const location = useLocation()
  const reduce = useReducedMotion()
  // La barra final no cuenta: /proyectos y /proyectos/ son la misma página
  const pageKey = location.pathname.replace(/\/$/, '') || '/'

  // Cuando la página saliente termina de irse, se sube arriba (con movimiento reducido lo hace ScrollManager)
  function onExitComplete() {
    if (reduce || window.location.hash) return
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // El foco pasa al contenido en cuanto se monta la página nueva, no en la primera carga
  const mountedKey = useRef<string | null>(null)
  function onMainMount(el: HTMLElement | null) {
    if (!el) return
    const changed = mountedKey.current !== null && mountedKey.current !== pageKey
    mountedKey.current = pageKey
    if (changed && !window.location.hash) el.focus({ preventScroll: true })
  }

  return (
    <>
      <Ambient />
      <a
        href="#main"
        className="fixed left-4 top-4 z-[60] -translate-y-24 inline-flex min-h-11 items-center rounded-full bg-violet px-4 text-white focus:translate-y-0"
      >
        {t.skip}
      </a>
      <ScrollManager deferTop={!reduce} />
      <Header />
      {/* Transición de página: la saliente se desvanece, se sube arriba y entra la nueva.
          Con movimiento reducido el cambio es inmediato. */}
      <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
        <motion.main
          id="main"
          ref={onMainMount}
          tabIndex={-1}
          key={pageKey}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8, transition: { duration: 0.16, ease: EASE } }}
          transition={{ duration: 0.28, ease: EASE }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/proyectos" element={<Projects />} />
            <Route path="/proyectos/:slug" element={<ProjectDetail />} />
            <Route path="/sobre-mi" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Contact />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <I18nProvider>
        <Layout />
      </I18nProvider>
    </MotionConfig>
  )
}
