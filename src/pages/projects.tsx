import { useSearchParams } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Stagger, StaggerItem } from '@/components/layout/reveal'
import { FilterGroup } from '@/components/projects/project-filters'
import { ProjectIndex } from '@/components/projects/project-index'
import { PROJECTS, type ProjectType } from '@/data/projects'
import { FILTER_TECH, PAGES } from '@/data/site'
import { useI18n } from '@/i18n'
import { EASE, useMeta } from '@/lib/utils'

const TYPES: ProjectType[] = ['web', 'bot', 'practica']
const YEARS = [...new Set(PROJECTS.flatMap((p) => p.years))].sort((a, b) => b - a)
const TECH = FILTER_TECH.filter((x) => PROJECTS.some((p) => p.tech.includes(x)))

export function Projects() {
  const { t, lang } = useI18n()
  const reduce = useReducedMotion()
  useMeta(PAGES.projects.title[lang], PAGES.projects.description[lang])

  // Los filtros viven en la URL: ?tech=Java&type=practica&year=2026
  const [params, setParams] = useSearchParams()
  const tech = params.get('tech') ?? ''
  const type = params.get('type') ?? ''
  const year = params.get('year') ?? ''

  function set(key: string, value: string) {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value) next.set(key, value)
        else next.delete(key)
        return next
      },
      { replace: true, preventScrollReset: true },
    )
  }

  function reset() {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        for (const k of ['tech', 'type', 'year']) next.delete(k)
        return next
      },
      { replace: true, preventScrollReset: true },
    )
  }

  const shown = PROJECTS.filter(
    (p) => (!tech || p.tech.includes(tech)) && (!type || p.type === type) && (!year || p.years.includes(Number(year))),
  )

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
      <Stagger onView={false}>
        <StaggerItem>
          <h1 className="font-display text-5xl leading-tight text-marble sm:text-6xl">{t.projects.title}</h1>
          <p className="mt-4 max-w-xl text-lg text-mist">{t.projects.sub}</p>
        </StaggerItem>

        <StaggerItem>
          <section
            aria-labelledby="filters"
            className="mt-12 space-y-4 rounded-2xl border border-line bg-surface/60 p-5 sm:p-7"
          >
            <h2 id="filters" className="sr-only">
              {t.projects.filters}
            </h2>
            <FilterGroup
              label={t.project.tech}
              allLabel={t.projects.all}
              value={tech}
              onChange={(v) => set('tech', v)}
              options={TECH.map((x) => ({ value: x, label: x }))}
            />
            <FilterGroup
              label={t.project.type}
              allLabel={t.projects.all}
              value={type}
              onChange={(v) => set('type', v)}
              options={TYPES.map((x) => ({ value: x, label: t.types[x] }))}
            />
            <FilterGroup
              label={t.project.year}
              allLabel={t.projects.all}
              value={year}
              onChange={(v) => set('year', v)}
              options={YEARS.map((x) => ({ value: String(x), label: String(x) }))}
            />
          </section>
        </StaggerItem>

        <StaggerItem>
          <h2 className="sr-only">{t.projects.list}</h2>
          <p role="status" className="label mb-4 mt-10 text-mist">
            {t.projects.count(shown.length)}
          </p>

          <ProjectIndex projects={shown} />

          <AnimatePresence initial={false}>
            {shown.length === 0 && (
              <motion.div
                className="border-b border-line py-14 text-center"
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE, delay: reduce ? 0 : 0.15 }}
              >
                <p className="text-marble">{t.projects.empty}</p>
                <Button variant="outline" onClick={reset} className="mt-5">
                  {t.projects.reset}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </StaggerItem>
      </Stagger>
    </div>
  )
}
