import { useEffect } from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Curva común de todas las animaciones (la misma que --ease-soft en CSS) */
export const EASE = [0.16, 1, 0.3, 1] as const

/** Ruta de un fichero de /public respetando la base del despliegue */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

/** Título y descripción de la página actual (el HTML estático de cada ruta ya los trae para buscadores) */
export function useMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}
