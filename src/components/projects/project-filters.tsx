import { useId } from 'react'
import { motion } from 'motion/react'
import { EASE, cn } from '@/lib/utils'

type Option = { value: string; label: string }

/** Grupo de filtro de selección única; value '' significa «todos». */
export function FilterGroup({
  label,
  options,
  value,
  allLabel,
  onChange,
}: {
  label: string
  options: Option[]
  value: string
  allLabel: string
  onChange: (value: string) => void
}) {
  const id = useId()
  const all: Option[] = [{ value: '', label: allLabel }, ...options]

  return (
    <div role="group" aria-labelledby={id} className="flex flex-col gap-2.5 sm:flex-row sm:items-baseline sm:gap-5">
      <p id={id} className="label shrink-0 text-mist sm:w-28">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {all.map((o) => {
          const active = o.value === value
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.value)}
              className={cn(
                'relative min-h-11 rounded-full border px-3.5 text-sm transition-[color,border-color,scale] duration-300 motion-safe:active:scale-95',
                active
                  ? 'border-transparent text-white'
                  : 'border-line text-marble/90 hover:border-violet-soft/70 hover:text-violet-pale focus-visible:border-violet-soft/70 focus-visible:text-violet-pale',
              )}
            >
              {/* El relleno violeta viaja de la opción anterior a la nueva */}
              {active && (
                <motion.span
                  layoutId={`filter-${id}`}
                  aria-hidden="true"
                  className="absolute -inset-px rounded-full bg-violet shadow-[0_8px_24px_-10px] shadow-violet/80"
                  transition={{ duration: 0.32, ease: EASE }}
                />
              )}
              <span className="relative">{o.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
