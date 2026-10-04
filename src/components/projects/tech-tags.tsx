import { motion } from 'motion/react'
import { popItem } from '@/components/layout/reveal'
import { cn } from '@/lib/utils'

/** Etiquetas de tecnología. Dentro de un grupo <Stagger> aparecen con un leve cambio de escala. */
export function TechTags({ items, label, className }: { items: string[]; label: string; className?: string }) {
  return (
    <ul aria-label={label} className={cn('flex flex-wrap gap-2', className)}>
      {items.map((x) => (
        <motion.li
          key={x}
          variants={popItem}
          className="rounded-full border border-line bg-abyss/40 px-3 py-1 text-[13px] text-mist transition-colors duration-300 hover:border-violet-soft/60 hover:text-violet-pale"
        >
          {x}
        </motion.li>
      ))}
    </ul>
  )
}
