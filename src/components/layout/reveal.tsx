import type { ReactNode } from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { EASE } from '@/lib/utils'

type Props = { children: ReactNode; className?: string }

const VIEWPORT = { once: true, margin: '0px 0px -60px 0px' } as const

/** Aparición suave al entrar en pantalla, una sola vez. Sin movimiento si el usuario lo pide. */
export function Reveal({ children, className, delay = 0 }: Props & { delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
}

/** Elemento de un grupo escalonado: sube y aparece */
export const riseItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

/** Etiqueta de un grupo escalonado: aparece con un leve cambio de escala */
export const popItem: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: EASE } },
}

/**
 * Grupo que revela a sus hijos (StaggerItem) uno tras otro: se anima el conjunto,
 * no cada elemento por su cuenta. `onView` lo dispara al entrar en pantalla; si no, al montar.
 */
export function Stagger({ children, className, onView = true }: Props & { onView?: boolean }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      variants={group}
      initial={reduce ? false : 'hidden'}
      {...(onView ? { whileInView: 'show', viewport: VIEWPORT } : { animate: 'show' })}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: Props) {
  return (
    <motion.div className={className} variants={riseItem}>
      {children}
    </motion.div>
  )
}
