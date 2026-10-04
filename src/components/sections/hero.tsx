import { useRef, type PointerEvent } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'motion/react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { RouteButton } from '@/components/ui/button'
import { riseItem } from '@/components/layout/reveal'
import { GITHUB_URL } from '@/data/site'
import { useI18n } from '@/i18n'
import { EASE } from '@/lib/utils'

const sequence: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

// Cada línea del nombre sube desde detrás de una máscara
const line: Variants = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.75, ease: EASE } },
}

export function Hero() {
  const { t, to } = useI18n()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  // La retícula solo se mueve mientras el hero está a la vista
  const inView = useInView(ref)

  // Profundidad: el fondo se desplaza más despacio que el contenido al hacer scroll
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const backY = useTransform(scrollYProgress, [0, 1], [0, 110])

  // Un halo sigue al cursor con inercia (solo se calcula mientras el puntero se mueve)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const glowX = useSpring(px, { stiffness: 60, damping: 20 })
  const glowY = useSpring(py, { stiffness: 60, damping: 20 })

  function onPointerMove(e: PointerEvent<HTMLElement>) {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    px.set(e.clientX - rect.left - rect.width * 0.7)
    py.set(e.clientY - rect.top - rect.height * 0.3)
  }

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      onPointerMove={onPointerMove}
      className="relative overflow-hidden border-b border-line/60"
    >
      <motion.div aria-hidden="true" style={reduce ? undefined : { y: backY }} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(55%_60%_at_78%_18%,color-mix(in_oklab,var(--color-violet)_26%,transparent),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(30%_35%_at_12%_95%,color-mix(in_oklab,var(--color-gold)_10%,transparent),transparent_70%)]" />
        {/* Halo que acompaña al cursor */}
        <motion.div
          style={{ x: glowX, y: glowY }}
          className="absolute left-[70%] top-[30%] -ml-[19rem] -mt-[19rem] size-[38rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-violet-soft)_16%,transparent),transparent)]"
        />
        {/* Retícula que se desliza muy despacio, enmascarada hacia los bordes */}
        <div className="absolute inset-0 overflow-hidden [mask-image:radial-gradient(70%_70%_at_70%_25%,#000,transparent_75%)]">
          <div
            style={{ animationPlayState: inView ? 'running' : 'paused' }}
            className="absolute -inset-16 animate-grid-pan bg-[linear-gradient(to_right,color-mix(in_oklab,var(--color-violet-soft)_8%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--color-violet-soft)_8%,transparent)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>
      </motion.div>

      <motion.div
        className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-36 sm:px-8 sm:pb-24 sm:pt-44"
        variants={sequence}
        initial={reduce ? false : 'hidden'}
        animate="show"
      >
        <h1 id="hero-title" className="font-display text-[clamp(2.75rem,8.5vw,6rem)] leading-[1.02]">
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span variants={line} className="block text-marble">
              Josep
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.12em]">
            <motion.span variants={line} className="block text-gold-pale">
              Pérez Morente
            </motion.span>
          </span>
        </h1>

        <motion.p variants={riseItem} className="mt-7 max-w-[36rem] text-lg leading-relaxed text-marble/90 sm:text-xl">
          {t.hero.lead}
        </motion.p>

        <motion.div variants={riseItem} className="mt-9 flex flex-wrap gap-3">
          <RouteButton to={to('/proyectos')}>
            {t.hero.ctaWork}
            <ArrowRight className="icon-nudge size-4" aria-hidden="true" />
          </RouteButton>
          <RouteButton to={to('/#contact')} variant="outline">
            {t.hero.ctaContact}
          </RouteButton>
        </motion.div>

        <motion.dl variants={riseItem} className="mt-16 grid gap-x-10 gap-y-6 border-t border-line/70 pt-8 sm:grid-cols-3">
          <div>
            <dt className="label text-mist">{t.hero.facts.build}</dt>
            <dd className="mt-2 text-marble">{t.hero.facts.buildValue}</dd>
          </div>
          <div>
            <dt className="label text-mist">{t.hero.facts.stack}</dt>
            <dd className="mt-2 text-marble">Java · Python · TypeScript</dd>
          </div>
          <div>
            <dt className="label text-mist">{t.hero.facts.code}</dt>
            <dd className="mt-2">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener me"
                className="link-sweep inline-flex items-center gap-1 pb-0.5 text-violet-pale hover:text-gold-pale"
              >
                github.com/Luciuss04
                <ArrowUpRight className="icon-nudge-out icon-nudge size-4" aria-hidden="true" />
              </a>
            </dd>
          </div>
        </motion.dl>
      </motion.div>
    </section>
  )
}
