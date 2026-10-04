import { Stagger, StaggerItem } from '@/components/layout/reveal'
import { Skills } from '@/components/sections/skills'
import { Timeline } from '@/components/sections/timeline'
import { PAGES } from '@/data/site'
import { useI18n } from '@/i18n'
import { useMeta } from '@/lib/utils'

export function About() {
  const { t, lang } = useI18n()
  useMeta(PAGES.about.title[lang], PAGES.about.description[lang])

  return (
    <>
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-32 sm:px-8 sm:pb-24 sm:pt-40">
        <Stagger onView={false} className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <StaggerItem>
              <h1 className="font-display text-5xl leading-tight text-marble sm:text-6xl">{t.about.title}</h1>
            </StaggerItem>
            <div className="mt-8 max-w-[38rem] space-y-5 text-lg leading-relaxed text-marble/90">
              <StaggerItem>
                <p>{t.about.p1}</p>
              </StaggerItem>
              <StaggerItem>
                <p>{t.about.p2}</p>
              </StaggerItem>
            </div>
          </div>
          <section aria-labelledby="interests" className="lg:pt-28">
            <StaggerItem>
              <h2 id="interests" className="label text-gold-pale">
                {t.about.interestsTitle}
              </h2>
            </StaggerItem>
            <ul className="mt-5 border-t border-line/70">
              {t.about.interests.map((x) => (
                <li key={x} className="border-b border-line/70">
                  <StaggerItem className="py-4 text-marble/90 transition-[color,padding] duration-300 hover:text-gold-pale motion-safe:hover:pl-2">
                    {x}
                  </StaggerItem>
                </li>
              ))}
            </ul>
          </section>
        </Stagger>
      </div>
      <Timeline />
      <Skills />
    </>
  )
}
