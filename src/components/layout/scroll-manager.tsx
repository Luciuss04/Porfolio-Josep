import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

/**
 * Con ancla, baja hasta ella. Al cambiar de página sube arriba, salvo que `deferTop` esté activo:
 * entonces lo hace la transición de página cuando la anterior ha terminado de salir.
 */
export function ScrollManager({ deferTop }: { deferTop: boolean }) {
  const { pathname, hash, key } = useLocation()
  const lastPath = useRef<string | null>(null)

  useEffect(() => {
    const prev = lastPath.current
    lastPath.current = pathname
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
      return
    }
    // Primera carga, o cambio solo de parámetros (filtros, idioma): no se mueve nada
    if (prev === null || prev === pathname || deferTop) return
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash, key, deferTop])

  return null
}
