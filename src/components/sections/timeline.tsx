import { TIMELINE } from '@/data/site'
import { useI18n } from '@/i18n'

/** Trayectoria. No se muestra mientras TIMELINE (src/data/site.ts) esté vacío. */
export function Timeline() {
  const { t, lang } = useI18n()
  if (TIMELINE.length === 0) return null

  return (
    <section aria-labelledby="timeline" className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
      <h2 id="timeline" className="font-display text-3xl text-marble">
        {t.about.timeline}
      </h2>
      <ol className="mt-8 border-l border-line">
        {TIMELINE.map((e) => (
          <li key={e.year + e.title.es} className="relative pb-8 pl-7 last:pb-0">
            <span aria-hidden="true" className="absolute -left-[5px] top-2 size-2.5 rounded-full bg-gold" />
            <p className="text-sm text-violet-pale">{e.year}</p>
            <h3 className="mt-1 font-display text-xl text-marble">{e.title[lang]}</h3>
            <p className="mt-1.5 max-w-xl text-mist">{e.text[lang]}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
