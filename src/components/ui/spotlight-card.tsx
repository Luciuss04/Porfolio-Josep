import { useRef, type HTMLAttributes, type PointerEvent } from 'react'
import { cn } from '@/lib/utils'

/**
 * Tarjeta con borde que se ilumina en violeta siguiendo al cursor (o al recibir el foco)
 * (patrón "spotlight / glow card" de 21st.dev, sin dependencias).
 */
export function SpotlightCard({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null)

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={cn(
        'group/spot relative isolate overflow-hidden rounded-2xl border border-line bg-surface/70',
        // elevación al pasar el cursor o enfocar algo dentro
        'transition-[translate,border-color,opacity] duration-300',
        'motion-safe:hover:-translate-y-1 motion-safe:focus-within:-translate-y-1',
        'hover:border-violet-soft/50',
        'focus-within:border-violet-soft/50',
        // borde iluminado
        'before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:p-px before:opacity-0 before:transition-opacity before:duration-300',
        'before:[background:radial-gradient(420px_circle_at_var(--x,50%)_var(--y,50%),color-mix(in_oklab,var(--color-violet-soft)_75%,transparent),transparent_45%)]',
        'before:[mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]',
        'hover:before:opacity-100 focus-within:before:opacity-100',
        // brillo interior tenue
        'after:pointer-events-none after:absolute after:inset-0 after:-z-20 after:opacity-0 after:transition-opacity after:duration-300',
        'after:[background:radial-gradient(520px_circle_at_var(--x,50%)_var(--y,50%),color-mix(in_oklab,var(--color-violet)_10%,transparent),transparent_55%)]',
        'hover:after:opacity-100 focus-within:after:opacity-100',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
