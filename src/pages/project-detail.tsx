import { Link, useParams } from 'react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Reveal, Stagger, StaggerItem } from '@/components/layout/reveal'
import { ProjectLinks } from '@/components/sections/featured'
import { TechTags } from '@/components/projects/tech-tags'
import { FEATURED, yearLabel } from '@/data/projects'
import { SITE_NAME } from '@/data/site'
import { useI18n } from '@/i18n'
import { EASE, asset, useMeta } from '@/lib/utils'
import { NotFound } from './not-found'

function Block({ title, items, list }: { title: string; items?: string[]; list?: boolean }) {
  if (!items?.length) return null
  return (
    <Reveal>
      <section>
        <h2 className="font-display text-3xl text-marble">{title}</h2>
        {list ? (
          <ul className="mt-5 space-y-3 text-marble/90">
            {items.map((x) => (
              <li key={x} className="relative pl-6">
                <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-px w-3 bg-gold" />
                {x}
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-marble/90">
            {items.map((x) => (
              <p key={x}>{x}</p>
            ))}
          </div>
        )}
      </section>
    </Reveal>
  )
}

export function ProjectDetail() {
  const { slug } = useParams()
  const project = FEATURED.find((p) => p.slug === slug)
  if (!project?.caseStudy) return <NotFound />
  return <Detail key={project.slug} slug={project.slug} />
}

function Detail({ slug }: { slug: string }) {
  const { t, lang, to } = useI18n()
  const reduce = useReducedMotion()
  const project = FEATURED.find((p) => p.slug === slug)!
  const cs = project.caseStudy!
  useMeta(`${project.name[lang]} · ${SITE_NAME}`, project.summary[lang])

  const others = FEATURED.filter((p) => p.slug !== slug)

  return (
    <article className="mx-auto max-w-6xl px-5 pb-24 pt-28 sm:px-8 sm:pt-36">
      <Stagger onView={false}>
        <StaggerItem>
          <Link
            to={to('/proyectos')}
            className="link-sweep inline-flex min-h-11 items-center gap-2 text-sm text-mist hover:text-violet-pale"
          >
            <ArrowLeft className="icon-nudge icon-nudge-back size-4" aria-hidden="true" />
            {t.project.back}
          </Link>
        </StaggerItem>

        <header className="mt-6">
          <StaggerItem>
            <h1 className="font-display text-5xl leading-tight text-marble sm:text-6xl">{project.name[lang]}</h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-5 max-w-xl text-lg text-mist sm:text-xl">{project.summary[lang]}</p>
            <ProjectLinks project={project} className="mt-8" />
          </StaggerItem>
        </header>
      </Stagger>

      {project.cover && (
        <motion.div
          className="mt-12 overflow-hidden rounded-2xl border border-line bg-surface"
          initial={reduce ? false : { opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
        >
          <img
            src={asset(project.cover.src)}
            alt={project.cover.alt[lang]}
            width={project.cover.width}
            height={project.cover.height}
            decoding="async"
            className={
              // Las portadas casi cuadradas (emblemas) se muestran enteras; las capturas, a todo el ancho
              project.cover.height / project.cover.width > 0.7
                ? 'mx-auto block max-h-[24rem] w-auto'
                : 'block max-h-[28rem] w-full object-cover object-top'
            }
          />
        </motion.div>
      )}

      <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-14">
          <Block title={t.project.about} items={cs.intro[lang]} />
          <Block title={t.project.built} items={cs.built[lang]} list />
          <Block title={t.project.decisions} items={cs.decisions?.[lang]} list />
          <Block title={t.project.learned} items={cs.learned?.[lang]} list />
          <Block title={t.project.notes} items={cs.notes?.[lang]} />
        </div>

        <aside className="h-fit lg:sticky lg:top-24">
          <Stagger className="rounded-2xl border border-line bg-surface/60 p-6">
            <dl className="space-y-5">
              {[
                [t.project.type, t.types[project.type]],
                [t.project.year, yearLabel(project)],
                [t.project.status, t.statuses[project.status]],
              ].map(([k, v]) => (
                <StaggerItem key={k}>
                  <dt className="label text-mist">{k}</dt>
                  <dd className="mt-1.5 text-marble">{v}</dd>
                </StaggerItem>
              ))}
              <StaggerItem>
                <dt className="label text-mist">{t.project.tech}</dt>
                <dd className="mt-3">
                  <TechTags items={project.tech} label={t.project.tech} />
                </dd>
              </StaggerItem>
            </dl>
          </Stagger>
        </aside>
      </div>

      {cs.screenshots.length > 0 && (
        <Reveal className="mt-16">
          <section>
            <h2 className="font-display text-3xl text-marble">{t.project.screenshots}</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {cs.screenshots.map((s) => (
                <figure key={s.src} className="overflow-hidden rounded-xl border border-line bg-surface">
                  <img
                    src={asset(s.src)}
                    alt={s.alt[lang]}
                    width={s.width}
                    height={s.height}
                    loading="lazy"
                    decoding="async"
                    className="block w-full"
                  />
                  <figcaption className="border-t border-line px-4 py-3 text-sm text-mist">{s.alt[lang]}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      <nav aria-labelledby="more-projects" className="mt-20 border-t border-line pt-10">
        <h2 id="more-projects" className="label text-mist">
          {t.project.more}
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {others.map((p) => (
            <li key={p.slug}>
              <Link
                to={to(`/proyectos/${p.slug}`)}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface/40 p-5 transition-[border-color,translate] duration-300 hover:border-violet-soft/70 focus-visible:border-violet-soft/70 motion-safe:hover:-translate-y-0.5 motion-safe:focus-visible:-translate-y-0.5"
              >
                <span>
                  <span className="block font-display text-2xl text-marble transition-colors group-hover:text-gold-pale">
                    {p.name[lang]}
                  </span>
                  <span className="mt-1 block text-sm text-mist">{t.types[p.type]}</span>
                </span>
                <ArrowRight
                  className="size-5 shrink-0 text-mist transition-[color,translate] duration-300 group-hover:text-gold-pale group-focus-visible:text-gold-pale motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  )
}
