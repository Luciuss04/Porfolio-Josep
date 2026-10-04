import { motion, useReducedMotion } from 'motion/react'
import { ConstellationField } from '@/components/ui/constellation-field'
import { LinkButton } from '@/components/ui/button'
import { useI18n } from '@/i18n'

const LINES = ['Josep', 'Pérez Morente']

export function Hero() {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const touch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches
  let i = 0

  return (
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-28 sm:items-center sm:pb-24">
      <ConstellationField className="absolute inset-0" />
      {/* viñeta para que el texto se lea siempre */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,rgba(5,12,34,.85),transparent_60%)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-abyss to-transparent" />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <h1 aria-label="Josep Pérez Morente" className="font-display text-[clamp(3rem,10.5vw,8.75rem)] leading-[0.95] tracking-[-0.01em]">
          {LINES.map((line) => (
            <span key={line} aria-hidden="true" className="block overflow-hidden pb-[0.08em]">
              {line.split('').map((ch) => {
                const delay = 0.15 + i++ * 0.035
                return (
                  <motion.span
                    key={`${line}-${delay}`}
                    className="text-engraved inline-block whitespace-pre"
                    initial={reduce ? false : { y: '105%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] }}
                  >
                    {ch}
                  </motion.span>
                )
              })}
            </span>
          ))}
        </h1>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
        >
          <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-marble/90 sm:text-xl">{t.hero.lead}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <LinkButton href="#work">{t.hero.ctaWork}</LinkButton>
            <LinkButton href="#contact" variant="outline">
              {t.hero.ctaContact}
            </LinkButton>
          </div>
          <p className="mt-14 text-sm text-mist">{touch ? t.hero.hintTouch : t.hero.hint}</p>
        </motion.div>
      </div>
    </section>
  )
}
