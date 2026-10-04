import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type Star = { x: number; y: number; r: number; phase: number; glow: number }

type Props = {
  className?: string
  /** Estrellas por cada 10.000 px² */
  density?: number
  /** Radio de la "linterna" que revela las constelaciones */
  radius?: number
  color?: string
  lineColor?: string
}

/**
 * Cielo estrellado en canvas. Las estrellas cercanas están unidas en un grafo fijo
 * (como constelaciones) que solo se ilumina alrededor del cursor. Sin puntero,
 * una luz recorre el cielo despacio. Con "reducir movimiento" se dibuja estático.
 */
export function ConstellationField({
  className,
  density = 1.1,
  radius = 240,
  color = '240, 214, 138',
  lineColor = '214, 169, 64',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let stars: Star[] = []
    let edges: [number, number][] = []
    let w = 0
    let h = 0
    let raf = 0
    const pointer = { x: -9999, y: -9999, active: false, lastMove: 0 }
    const lantern = { x: 0, y: 0 }

    // Generador determinista: el cielo es siempre el mismo
    let seed = 7
    const rand = () => {
      seed = (seed * 16807) % 2147483647
      return (seed - 1) / 2147483646
    }

    function build() {
      const rect = canvas!.getBoundingClientRect()
      w = rect.width
      h = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = Math.round(w * dpr)
      canvas!.height = Math.round(h * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      seed = 7
      const count = Math.round(((w * h) / 10000) * density)
      stars = Array.from({ length: count }, () => ({
        x: rand() * w,
        y: rand() * h,
        r: rand() < 0.08 ? 1.6 + rand() * 0.9 : 0.5 + rand() * 0.8,
        phase: rand() * Math.PI * 2,
        glow: 0,
      }))

      // Une cada estrella con sus 2 vecinas más cercanas (si están cerca)
      const maxDist = Math.min(150, Math.max(90, w / 10))
      const seen = new Set<string>()
      edges = []
      stars.forEach((s, i) => {
        const near = stars
          .map((o, j) => ({ j, d: Math.hypot(o.x - s.x, o.y - s.y) }))
          .filter((n) => n.j !== i && n.d < maxDist)
          .sort((a, b) => a.d - b.d)
          .slice(0, 2)
        near.forEach(({ j }) => {
          const key = i < j ? `${i}-${j}` : `${j}-${i}`
          if (!seen.has(key)) {
            seen.add(key)
            edges.push([i, j])
          }
        })
      })
    }

    function lightAt(x: number, y: number) {
      const d = Math.hypot(x - lantern.x, y - lantern.y)
      return Math.max(0, 1 - d / radius)
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, w, h)

      // Si el puntero lleva quieto o fuera, una luz recorre el cielo
      const idle = !pointer.active || time - pointer.lastMove > 4000
      const tx = idle ? w * (0.62 + 0.28 * Math.sin(time / 5200)) : pointer.x
      const ty = idle ? h * (0.45 + 0.3 * Math.sin(time / 3700 + 1)) : pointer.y
      lantern.x += (tx - lantern.x) * (reduced ? 1 : 0.08)
      lantern.y += (ty - lantern.y) * (reduced ? 1 : 0.08)

      // Líneas
      ctx!.lineWidth = 0.8
      for (const [a, b] of edges) {
        const sa = stars[a]
        const sb = stars[b]
        const l = Math.min(lightAt(sa.x, sa.y), lightAt(sb.x, sb.y))
        if (l <= 0.02) continue
        ctx!.strokeStyle = `rgba(${lineColor}, ${Math.min(1, l * 1.1)})`
        ctx!.beginPath()
        ctx!.moveTo(sa.x, sa.y)
        ctx!.lineTo(sb.x, sb.y)
        ctx!.stroke()
      }

      // Estrellas
      for (const s of stars) {
        const target = lightAt(s.x, s.y)
        s.glow += (target - s.glow) * (reduced ? 1 : 0.12)
        const twinkle = reduced ? 0.7 : 0.55 + 0.45 * Math.sin(time / 900 + s.phase)
        const alpha = 0.3 * twinkle + s.glow * 0.7
        const r = s.r * (1 + s.glow * 0.9)
        ctx!.fillStyle = `rgba(${color}, ${alpha})`
        ctx!.beginPath()
        ctx!.arc(s.x, s.y, r, 0, Math.PI * 2)
        ctx!.fill()
        if (s.glow > 0.3 && s.r > 1.4) {
          const halo = ctx!.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 7)
          halo.addColorStop(0, `rgba(${color}, ${s.glow * 0.35})`)
          halo.addColorStop(1, `rgba(${color}, 0)`)
          ctx!.fillStyle = halo
          ctx!.beginPath()
          ctx!.arc(s.x, s.y, r * 7, 0, Math.PI * 2)
          ctx!.fill()
        }
      }

      if (!reduced) raf = requestAnimationFrame(draw)
    }

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active = pointer.y >= 0 && pointer.y <= rect.height
      pointer.lastMove = performance.now()
    }
    function onLeave() {
      pointer.active = false
    }

    build()
    lantern.x = w * 0.7
    lantern.y = h * 0.4
    if (reduced) draw(0)
    else raf = requestAnimationFrame(draw)

    const ro = new ResizeObserver(() => {
      build()
      if (reduced) draw(0)
    })
    ro.observe(canvas)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [density, radius, color, lineColor])

  return <canvas ref={canvasRef} aria-hidden="true" className={cn('pointer-events-none size-full', className)} />
}
