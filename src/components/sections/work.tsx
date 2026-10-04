import { ArrowUpRight } from 'lucide-react'
import { SpotlightCard } from '@/components/ui/spotlight-card'
import { LinkButton } from '@/components/ui/button'
import { GithubIcon } from '@/components/icons'
import { useI18n } from '@/i18n'
import { SectionHead } from './section-head'

const img = (name: string) => `${import.meta.env.BASE_URL}img/${name}`

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {items.map((x) => (
        <li key={x} className="rounded-full border border-line px-3 py-1 text-[13px] text-mist">
          {x}
        </li>
      ))}
    </ul>
  )
}

function CodeLink({ href, label }: { href: string; label: string }) {
  return (
    <LinkButton href={href} target="_blank" rel="noopener" variant="outline" className="px-4 py-2 text-sm">
      <GithubIcon className="size-4" />
      {label}
    </LinkButton>
  )
}

export function Work() {
  const { t } = useI18n()
  const w = t.work

  return (
    <section aria-labelledby="work" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHead id="work" title={w.title} sub={w.sub} />

      <div className="grid gap-5 lg:grid-cols-3">
        {/* PoseidonUI — proyecto principal, con captura real del panel */}
        <SpotlightCard className="lg:col-span-2">
          <div className="p-7 sm:p-9">
            <p className="text-sm text-gold">{w.poseidon.kind}</p>
            <h3 className="mt-2 font-display text-4xl text-marble sm:text-5xl">{w.poseidon.name}</h3>
            <p className="mt-4 max-w-xl text-mist">{w.poseidon.desc}</p>
            <Tags items={w.poseidon.tags} />
            <div className="mt-7 flex flex-wrap gap-3">
              <LinkButton href="https://luciuss04.github.io/PoseidonUI/" target="_blank" rel="noopener" className="px-4 py-2 text-sm">
                {w.site}
                <ArrowUpRight className="size-4" />
              </LinkButton>
              <CodeLink href="https://github.com/luciuss04/PoseidonUI" label={w.code} />
            </div>
          </div>
          <div className="ml-7 overflow-hidden rounded-tl-2xl border-l border-t border-line sm:ml-9">
            <img
              src={img('poseidon-panel.webp')}
              alt="PoseidonUI"
              width={1400}
              height={487}
              loading="lazy"
              decoding="async"
              className="block w-full origin-top-left transition-transform duration-700 group-hover/spot:scale-[1.015]"
            />
          </div>
        </SpotlightCard>

        {/* AteneaUI */}
        <SpotlightCard className="flex flex-col">
          <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:h-72">
            <img
              src={img('atenea.webp')}
              alt="AteneaUI"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover object-[50%_40%] transition-transform duration-700 group-hover/spot:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#091439] via-[#091439]/20 to-transparent" />
          </div>
          <div className="flex flex-1 flex-col p-7 pt-2 sm:p-9 sm:pt-2">
            <p className="text-sm text-gold">{w.atenea.kind}</p>
            <h3 className="mt-2 font-display text-3xl text-marble">{w.atenea.name}</h3>
            <p className="mt-3 text-mist">{w.atenea.desc}</p>
            <Tags items={w.atenea.tags} />
            <div className="mt-auto pt-7">
              <CodeLink href="https://github.com/luciuss04/AteneaUI" label={w.code} />
            </div>
          </div>
        </SpotlightCard>

        {/* Este portfolio */}
        <SpotlightCard className="lg:col-span-3">
          <div className="flex flex-col gap-6 p-7 sm:flex-row sm:items-end sm:justify-between sm:p-9">
            <div className="max-w-md">
              <p className="text-sm text-gold">{w.portfolio.kind}</p>
              <h3 className="mt-2 font-display text-3xl text-marble">{w.portfolio.name}</h3>
              <p className="mt-3 text-mist">{w.portfolio.desc}</p>
              <Tags items={w.portfolio.tags} />
            </div>
            <div className="self-start sm:self-end">
              <CodeLink href="https://github.com/Luciuss04/Porfolio-Josep" label={w.code} />
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  )
}
