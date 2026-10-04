import { Link } from 'react-router'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { SpotlightCard } from '@/components/ui/spotlight-card'
import { LinkButton, RouteButton } from '@/components/ui/button'
import { GithubIcon } from '@/components/icons'
import { Reveal, Stagger, StaggerItem } from '@/components/layout/reveal'
import { TechTags } from '@/components/projects/tech-tags'
import { FEATURED, yearLabel, type Project } from '@/data/projects'
import { useI18n } from '@/i18n'
import { asset, cn } from '@/lib/utils'
import { SectionHead } from './section-head'

/** Enlaces de un proyecto: web publicada (si existe) y repositorio */
export function ProjectLinks({ project, className }: { project: Project; className?: string }) {
  const { t, lang } = useI18n()
  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      {project.demo && (
        <LinkButton href={project.demo} target="_blank" rel="noopener" variant="outline" className="px-4 text-sm">
          {t.project.site}
          <span className="sr-only">: {project.name[lang]}</span>
          <ArrowUpRight className="icon-nudge icon-nudge-out size-4" aria-hidden="true" />
        </LinkButton>
      )}
      <LinkButton href={project.repo} target="_blank" rel="noopener" variant="outline" className="px-4 text-sm">
        <GithubIcon className="icon-nudge-gh size-4" />
        {t.project.code}
        <span className="sr-only">: {project.name[lang]}</span>
      </LinkButton>
    </div>
  )
}

function CardBody({ project, big }: { project: Project; big?: boolean }) {
  const { t, lang, to } = useI18n()
  return (
    <>
      <h3 className={cn('font-display text-marble', big ? 'text-4xl sm:text-5xl' : 'text-3xl')}>
        <Link
          to={to(`/proyectos/${project.slug}`)}
          className="transition-colors duration-300 hover:text-gold-pale focus-visible:text-gold-pale"
        >
          {project.name[lang]}
        </Link>
      </h3>
      <p className="label mt-3 text-violet-pale">
        {t.types[project.type]} · {yearLabel(project)} · {t.statuses[project.status]}
      </p>
      <p className="mt-4 max-w-xl text-mist">{project.summary[lang]}</p>
      <TechTags items={project.tech} label={t.project.tech} className="mt-5" />
      <div className="mt-7 flex flex-wrap gap-3">
        <RouteButton to={to(`/proyectos/${project.slug}`)} className="px-4 text-sm">
          {t.project.caseStudy}
          <span className="sr-only">: {project.name[lang]}</span>
          <ArrowRight className="icon-nudge size-4" aria-hidden="true" />
        </RouteButton>
        <ProjectLinks project={project} />
      </div>
    </>
  )
}

// Al pasar por una tarjeta (o enfocarla), las otras dos ceden protagonismo. No bajar del 80 %:
// por debajo, el texto secundario pierde el contraste AA
const card =
  'h-full group-hover/bento:opacity-80 group-hover/bento:hover:opacity-100 group-has-[:focus-visible]/bento:opacity-80 group-has-[:focus-visible]/bento:focus-within:opacity-100'
// La imagen se acerca despacio mientras la tarjeta tiene la atención
const zoom =
  'transition-transform duration-700 ease-soft motion-safe:group-hover/spot:scale-[1.04] motion-safe:group-focus-within/spot:scale-[1.04]'

export function Featured() {
  const { t, lang, to } = useI18n()
  const [main, second, third] = FEATURED

  return (
    <section aria-labelledby="featured" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHead id="featured" title={t.featured.title} sub={t.featured.sub} />

      <Stagger className="group/bento grid gap-5 lg:grid-cols-3">
        {/* Proyecto principal, con captura real del panel */}
        <StaggerItem className="lg:col-span-2">
          <SpotlightCard className={cn(card, 'flex flex-col')}>
            <div className="p-7 sm:p-9">
              <CardBody project={main} big />
            </div>
            {main.cover && (
              <div className="ml-7 mt-auto overflow-hidden rounded-tl-xl border-l border-t border-line sm:ml-9">
                <img
                  src={asset(main.cover.src)}
                  alt={main.cover.alt[lang]}
                  width={main.cover.width}
                  height={main.cover.height}
                  loading="lazy"
                  decoding="async"
                  className={cn('block w-full origin-top-left', zoom)}
                />
              </div>
            )}
          </SpotlightCard>
        </StaggerItem>

        <StaggerItem>
          <SpotlightCard className={cn(card, 'flex flex-col')}>
            {second.cover && (
              <div className="relative aspect-[16/9] overflow-hidden lg:aspect-auto lg:h-44">
                <img
                  src={asset(second.cover.src)}
                  alt={second.cover.alt[lang]}
                  width={second.cover.width}
                  height={second.cover.height}
                  loading="lazy"
                  decoding="async"
                  className={cn('absolute inset-0 size-full object-cover object-[50%_35%]', zoom)}
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
              </div>
            )}
            <div className="flex flex-1 flex-col p-7 sm:p-9">
              <CardBody project={second} />
            </div>
          </SpotlightCard>
        </StaggerItem>

        <StaggerItem className="lg:col-span-3">
          <SpotlightCard className={card}>
            <div className="grid items-center gap-8 p-7 sm:p-9 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <CardBody project={third} />
              </div>
              {third.cover && (
                <div className="hidden overflow-hidden rounded-xl border border-line lg:block">
                  <img
                    src={asset(third.cover.src)}
                    alt={third.cover.alt[lang]}
                    width={third.cover.width}
                    height={third.cover.height}
                    loading="lazy"
                    decoding="async"
                    className={cn('block w-full', zoom)}
                  />
                </div>
              )}
            </div>
          </SpotlightCard>
        </StaggerItem>
      </Stagger>

      <Reveal className="mt-10">
        <RouteButton to={to('/proyectos')} variant="outline">
          {t.featured.all}
          <ArrowRight className="icon-nudge size-4" aria-hidden="true" />
        </RouteButton>
      </Reveal>
    </section>
  )
}
