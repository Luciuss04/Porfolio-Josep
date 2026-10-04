import { Link } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { yearLabel, type Project } from '@/data/projects'
import { useI18n } from '@/i18n'
import { EASE, asset } from '@/lib/utils'

/**
 * Índice de proyectos: una fila por proyecto con año, título, resumen, tecnologías, tipo y estado.
 * Al pasar el cursor o enfocar una fila, el resto se atenúa y, si hay portada, aparece una miniatura.
 * Al filtrar, las filas entran, salen y se recolocan con una transición.
 * Los destacados enlazan a su página; el resto, a su repositorio.
 */
export function ProjectIndex({ projects }: { projects: Project[] }) {
  const { t, lang, to } = useI18n()
  const reduce = useReducedMotion()

  return (
    <ul className="group/list relative border-t border-line">
      <AnimatePresence mode="popLayout" initial={false}>
        {projects.map((p) => {
          const featured = p.level === 'featured'
          const titleClass =
            'font-display text-2xl text-marble transition-colors duration-300 after:absolute after:inset-0 group-hover/row:text-gold-pale focus-visible:text-gold-pale'
          const Arrow = featured ? ArrowRight : ArrowUpRight

          return (
            <motion.li
              key={p.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.98, transition: { duration: 0.18, ease: EASE } }}
              transition={{ duration: 0.32, ease: EASE }}
              className="border-b border-line"
            >
              {/* La atenuación va en este contenedor para no chocar con la opacidad que anima la fila */}
              <div className="group/row relative grid gap-x-8 gap-y-3 px-1 py-6 transition-[opacity,background-color] duration-300 hover:bg-surface/60 focus-within:bg-surface/60 group-hover/list:opacity-80 group-hover/list:hover:opacity-100 group-has-[:focus-visible]/list:opacity-80 group-has-[:focus-visible]/list:focus-within:opacity-100 sm:px-4 md:grid-cols-[5.5rem_minmax(0,1fr)_11rem_1.5rem] lg:grid-cols-[5.5rem_minmax(0,1fr)_9rem_11rem_1.5rem]">
                {/* Filete dorado que crece a la izquierda de la fila activa */}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-gold transition-transform duration-300 motion-reduce:transition-none group-focus-within/row:scale-y-100 group-hover/row:scale-y-100"
                />

                <p className="label whitespace-nowrap tabular-nums text-mist md:pt-2.5">
                  <span className="sr-only">{t.project.year}: </span>
                  {yearLabel(p)}
                </p>

                <div>
                  <h3 className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    {featured ? (
                      <Link to={to(`/proyectos/${p.slug}`)} className={titleClass}>
                        {p.name[lang]}
                      </Link>
                    ) : (
                      <a href={p.repo} target="_blank" rel="noopener" className={titleClass}>
                        {p.name[lang]}
                        <span className="sr-only"> ({t.project.external})</span>
                      </a>
                    )}
                    {featured && (
                      <span className="rounded-full border border-gold/50 px-2.5 py-0.5 text-xs text-gold-pale">
                        {t.project.featuredMark}
                      </span>
                    )}
                  </h3>
                  <p className="mt-2 max-w-xl text-mist">{p.summary[lang]}</p>
                  <ul aria-label={t.project.tech} className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-violet-pale">
                    {p.tech.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>

                {/* Miniatura: solo en pantallas anchas y solo si el proyecto tiene portada */}
                <div aria-hidden="true" className="hidden self-center lg:block">
                  {p.cover && (
                    <img
                      src={asset(p.cover.src)}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full rounded-lg border border-line object-cover object-left-top opacity-0 transition-[opacity,translate,scale] duration-300 group-focus-within/row:opacity-100 group-hover/row:opacity-100 motion-safe:translate-y-2 motion-safe:scale-95 motion-safe:group-focus-within/row:translate-y-0 motion-safe:group-focus-within/row:scale-100 motion-safe:group-hover/row:translate-y-0 motion-safe:group-hover/row:scale-100"
                    />
                  )}
                </div>

                <dl className="flex gap-x-6 text-sm md:block md:space-y-1 md:pt-2">
                  <div>
                    <dt className="sr-only">{t.project.type}</dt>
                    <dd className="text-marble/90">{t.types[p.type]}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">{t.project.status}</dt>
                    <dd className="flex items-center gap-2 text-mist">
                      <span
                        aria-hidden="true"
                        className={
                          p.status === 'activo'
                            ? 'size-1.5 rounded-full bg-gold'
                            : 'size-1.5 rounded-full bg-mist/60'
                        }
                      />
                      {t.statuses[p.status]}
                    </dd>
                  </div>
                </dl>

                <Arrow
                  aria-hidden="true"
                  className="hidden size-5 text-mist transition-[color,translate] duration-300 group-focus-within/row:text-gold-pale group-hover/row:text-gold-pale motion-safe:group-focus-within/row:translate-x-1 motion-safe:group-hover/row:translate-x-1 md:mt-2 md:block"
                />
              </div>
            </motion.li>
          )
        })}
      </AnimatePresence>
    </ul>
  )
}
