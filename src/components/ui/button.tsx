import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { Link, type LinkProps } from 'react-router'
import { cn } from '@/lib/utils'

// Mismo gesto con cursor y con teclado: el botón sube un punto, se ilumina y cede al pulsar
const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-medium transition-[color,background-color,border-color,box-shadow,translate,scale] duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:focus-visible:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.97] disabled:opacity-50'

export const variants = {
  primary:
    'sheen bg-violet text-white hover:bg-violet-deep shadow-violet/80 hover:shadow-[0_12px_28px_-12px] focus-visible:shadow-[0_12px_28px_-12px]',
  outline:
    'border border-line bg-abyss/40 text-marble hover:border-violet-soft/70 hover:text-violet-pale focus-visible:border-violet-soft/70 focus-visible:text-violet-pale',
  quiet: 'text-mist hover:text-violet-pale px-0',
}

type Variant = keyof typeof variants

export function LinkButton({
  variant = 'primary',
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  return <a className={cn(base, variants[variant], className)} {...props} />
}

/** Igual que LinkButton, pero para rutas internas */
export function RouteButton({ variant = 'primary', className, ...props }: LinkProps & { variant?: Variant }) {
  return <Link className={cn(base, variants[variant], className)} {...props} />
}

export function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button type="button" className={cn(base, variants[variant], className)} {...props} />
}
