/**
 * Fondo ambiental fijo: tres halos que se desplazan muy despacio.
 * Solo CSS (transform), sin JavaScript; con prefers-reduced-motion queda quieto.
 */
export function Ambient() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-[12%] -top-[22%] size-[58vmax] animate-drift-a rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-violet)_20%,transparent),transparent)] will-change-transform" />
      <div className="absolute -right-[18%] top-[30%] size-[52vmax] animate-drift-b rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-violet-soft)_11%,transparent),transparent)] will-change-transform" />
      <div className="absolute -bottom-[28%] left-[18%] size-[46vmax] animate-drift-a rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-gold)_7%,transparent),transparent)] will-change-transform [animation-delay:-14s]" />
    </div>
  )
}
