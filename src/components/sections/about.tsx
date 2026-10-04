import { useI18n } from '@/i18n'
import { SectionHead } from './section-head'

export function About() {
  const { t } = useI18n()
  return (
    <section aria-labelledby="about" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <SectionHead id="about" title={t.about.title} />
          <div className="max-w-[38rem] space-y-5 text-lg leading-relaxed text-marble/90">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </div>
        </div>
        <div className="lg:pt-24">
          <h3 className="font-display text-2xl text-gold-pale">{t.about.interestsTitle}</h3>
          <ul className="mt-5 divide-y divide-line/70 border-y border-line/70">
            {t.about.interests.map((x) => (
              <li key={x} className="py-4 text-marble/90">
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
