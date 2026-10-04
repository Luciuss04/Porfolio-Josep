import { Stagger, StaggerItem } from '@/components/layout/reveal'
import { SKILLS } from '@/data/site'
import { useI18n } from '@/i18n'
import { SectionHead } from './section-head'

export function Skills() {
  const { t } = useI18n()

  return (
    <section aria-labelledby="skills" className="border-y border-line/60 bg-surface/40">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHead id="skills" title={t.skills.title} sub={t.skills.sub} />
        <Stagger className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
          {SKILLS.map((g) => (
            <StaggerItem key={g.id}>
              <h3 className="label border-b border-gold/40 pb-3 text-gold-pale">{t.skills.groups[g.id]}</h3>
              <ul className="mt-4 space-y-1">
                {g.items.map((x) => (
                  <li
                    key={x}
                    className="group/skill flex items-center gap-0 py-1 text-marble/90 transition-colors duration-300 hover:text-marble"
                  >
                    {/* Marca dorada que se abre al pasar el cursor */}
                    <span
                      aria-hidden="true"
                      className="h-px w-0 bg-gold transition-[width,margin] duration-300 motion-safe:group-hover/skill:mr-2.5 motion-safe:group-hover/skill:w-4"
                    />
                    {x}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
