'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  baseSize: number
  phase: number
}

const COUNT       = 42
const LINK_DIST   = 140
const SPEED       = 0.16
const REPEL_R     = 125   // cursor repels particles within this radius
const REPEL_FORCE = 1.3
const CURSOR_GLOW = 100   // radius of cursor halo on canvas

export default function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse     = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animId: number
    let W = 0, H = 0
    const pts: Particle[] = []

    function spawn() {
      W = window.innerWidth
      H = window.innerHeight
      canvas!.width  = W
      canvas!.height = H
      pts.length = 0
      for (let i = 0; i < COUNT; i++) {
        pts.push({
          x:        Math.random() * W,
          y:        Math.random() * H,
          vx:       (Math.random() - 0.5) * SPEED,
          vy:       (Math.random() - 0.5) * SPEED,
          baseSize: 0.8 + Math.random() * 1.4,
          phase:    Math.random() * Math.PI * 2,
        })
      }
    }

    function frame(ts: number) {
      animId = requestAnimationFrame(frame)
      ctx!.clearRect(0, 0, W, H)

      const t  = ts * 0.001
      const mx = mouse.current.x
      const my = mouse.current.y
      const hasMouse = mx > -100

      // ── 1. Breathing centre glow ─────────────────────────────────────
      {
        const pulse = Math.sin(t * 0.32)
        const r     = Math.min(W, H) * (0.52 + pulse * 0.09)
        const a     = 0.038 + pulse * 0.022
        const g     = ctx!.createRadialGradient(W * 0.5, H * 0.44, 0, W * 0.5, H * 0.44, r)
        g.addColorStop(0,    `rgba(201,164,85,${a.toFixed(4)})`)
        g.addColorStop(0.45, `rgba(201,164,85,${(a * 0.3).toFixed(4)})`)
        g.addColorStop(1,    'rgba(201,164,85,0)')
        ctx!.fillStyle = g
        ctx!.fillRect(0, 0, W, H)
      }

      // ── 2. Cursor spotlight on background ────────────────────────────
      if (hasMouse) {
        const cp = 0.055 + Math.sin(t * 2.1) * 0.018  // subtle pulse
        const cg = ctx!.createRadialGradient(mx, my, 0, mx, my, CURSOR_GLOW)
        cg.addColorStop(0,   `rgba(201,164,85,${cp.toFixed(4)})`)
        cg.addColorStop(0.5, `rgba(201,164,85,${(cp * 0.28).toFixed(4)})`)
        cg.addColorStop(1,   'rgba(201,164,85,0)')
        ctx!.fillStyle = cg
        ctx!.fillRect(0, 0, W, H)
      }

      // ── 3. Move particles + cursor repulsion ─────────────────────────
      for (const p of pts) {
        // Drift + per-particle deformation
        p.x += p.vx + Math.sin(t * 0.55 + p.phase)        * 0.14
        p.y += p.vy + Math.cos(t * 0.38 + p.phase * 1.2)  * 0.14

        // Repel from cursor
        if (hasMouse) {
          const dx = p.x - mx
          const dy = p.y - my
          const d2 = dx * dx + dy * dy
          if (d2 < REPEL_R * REPEL_R && d2 > 0) {
            const d     = Math.sqrt(d2)
            const force = ((REPEL_R - d) / REPEL_R) * REPEL_FORCE
            p.x += (dx / d) * force
            p.y += (dy / d) * force
          }
        }

        // Wrap
        if      (p.x < -12)   p.x = W + 12
        else if (p.x > W + 12) p.x = -12
        if      (p.y < -12)   p.y = H + 12
        else if (p.y > H + 12) p.y = -12
      }

      // ── 4. Connection lines — brighten near cursor ───────────────────
      ctx!.lineWidth = 0.5
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d2 = dx * dx + dy * dy
          if (d2 >= LINK_DIST * LINK_DIST) continue

          const d    = Math.sqrt(d2)
          let alpha  = (1 - d / LINK_DIST) * 0.09

          if (hasMouse) {
            const midX = (pts[i].x + pts[j].x) * 0.5
            const midY = (pts[i].y + pts[j].y) * 0.5
            const cdx  = midX - mx
            const cdy  = midY - my
            const cd   = Math.sqrt(cdx * cdx + cdy * cdy)
            if (cd < 160) alpha += (1 - cd / 160) * 0.22
          }

          ctx!.strokeStyle = `rgba(201,164,85,${Math.min(alpha, 0.38).toFixed(3)})`
          ctx!.beginPath()
          ctx!.moveTo(pts[i].x, pts[i].y)
          ctx!.lineTo(pts[j].x, pts[j].y)
          ctx!.stroke()
        }
      }

      // ── 5. Dots — swell near cursor ──────────────────────────────────
      for (const p of pts) {
        let r    = p.baseSize + Math.sin(t * 1.4 + p.phase) * 0.45
        let a    = 0.50

        if (hasMouse) {
          const dx  = p.x - mx
          const dy  = p.y - my
          const d   = Math.sqrt(dx * dx + dy * dy)
          if (d < REPEL_R) {
            const prox = 1 - d / REPEL_R
            r += prox * 1.8
            a += prox * 0.35
          }
        }

        ctx!.fillStyle = `rgba(201,164,85,${Math.min(a, 0.7).toFixed(3)})`
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    spawn()
    animId = requestAnimationFrame(frame)

    const onMove  = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY } }
    const onLeave = ()              => { mouse.current = { x: -9999,     y: -9999     } }
    const onResize = ()             => spawn()

    window.addEventListener('mousemove',             onMove,   { passive: true })
    window.addEventListener('resize',                onResize, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove',             onMove)
      window.removeEventListener('resize',                onResize)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:      'fixed',
        inset:         0,
        zIndex:        1,
        pointerEvents: 'none',
        opacity:       0.7,
      }}
    />
  )
}
