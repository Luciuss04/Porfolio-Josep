import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-medium transition-colors duration-200 disabled:opacity-50'

export const variants = {
  gold: 'bg-gold text-abyss hover:bg-gold-pale',
  outline: 'border border-line text-marble hover:border-gold/70 hover:text-gold-pale',
  quiet: 'text-mist hover:text-gold-pale px-0',
}

type Variant = keyof typeof variants

export function LinkButton({
  variant = 'gold',
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  return <a className={cn(base, variants[variant], className)} {...props} />
}

export function Button({
  variant = 'gold',
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button type="button" className={cn(base, variants[variant], className)} {...props} />
}
