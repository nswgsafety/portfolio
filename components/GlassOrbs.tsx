'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export interface GlassOrb {
  size: number          // px
  top: string
  left: string
  color: string         // base tint color (rgba)
  delay: number         // animation delay in seconds
  duration: number      // float duration
  blur?: number         // backdrop blur amount
  opacity?: number
}

const DEFAULT_ORBS: GlassOrb[] = [
  { size: 420, top: '-8%',  left: '62%',  color: 'rgba(200,240,80,',  delay: 0,   duration: 9,  blur: 0,  opacity: 0.18 },
  { size: 280, top: '15%',  left: '-4%',  color: 'rgba(61,187,255,',  delay: 1.5, duration: 11, blur: 20, opacity: 0.22 },
  { size: 180, top: '55%',  left: '78%',  color: 'rgba(34,197,94,',   delay: 0.8, duration: 8,  blur: 16, opacity: 0.20 },
  { size: 120, top: '30%',  left: '45%',  color: 'rgba(139,92,246,',  delay: 2.2, duration: 12, blur: 24, opacity: 0.16 },
  { size: 90,  top: '72%',  left: '20%',  color: 'rgba(34,197,94,',  delay: 0.4, duration: 7,  blur: 12, opacity: 0.24 },
  { size: 65,  top: '80%',  left: '55%',  color: 'rgba(61,187,255,',  delay: 3,   duration: 10, blur: 10, opacity: 0.28 },
  { size: 50,  top: '42%',  left: '88%',  color: 'rgba(200,240,80,',  delay: 1,   duration: 6,  blur: 8,  opacity: 0.30 },
]

interface Props {
  orbs?: GlassOrb[]
  className?: string
}

export default function GlassOrbs({ orbs = DEFAULT_ORBS, className }: Props) {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      refs.current.forEach((el, i) => {
        if (!el) return
        const orb = orbs[i]
        gsap.to(el, {
          y: `${-24 - i * 4}`,
          x: `${8 + i * 3}`,
          duration: orb.duration,
          delay: orb.delay,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })
    })
    return () => ctx.revert()
  }, [orbs])

  return (
    <div
      className={className}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}
      aria-hidden
    >
      {orbs.map((orb, i) => (
        <div
          key={i}
          ref={el => { refs.current[i] = el }}
          style={{
            position: 'absolute',
            top: orb.top,
            left: orb.left,
            width: orb.size,
            height: orb.size,
            borderRadius: '50%',
            // Glass look: semi-transparent fill + internal highlight + border glow
            background: [
              `radial-gradient(circle at 32% 28%, ${orb.color}0.45) 0%, ${orb.color}0.08) 55%, ${orb.color}0.02) 100%)`,
            ].join(''),
            backdropFilter: orb.blur ? `blur(${orb.blur}px)` : undefined,
            WebkitBackdropFilter: orb.blur ? `blur(${orb.blur}px)` : undefined,
            border: `1px solid ${orb.color}0.35)`,
            boxShadow: [
              `inset 0 0 ${orb.size * 0.25}px ${orb.color}0.15)`,
              `inset 0 ${orb.size * 0.05}px ${orb.size * 0.15}px rgba(255,255,255,0.12)`,
              `0 ${orb.size * 0.08}px ${orb.size * 0.3}px ${orb.color}0.10)`,
            ].join(', '),
            opacity: orb.opacity ?? 0.2,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Inner specular highlight — makes it look like glass */}
          <div style={{
            position: 'absolute',
            top: '12%',
            left: '18%',
            width: '38%',
            height: '30%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 100%)',
            transform: 'rotate(-30deg)',
          }} />
          {/* Rim light at bottom */}
          <div style={{
            position: 'absolute',
            bottom: '8%',
            left: '25%',
            width: '50%',
            height: '15%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 100%)',
          }} />
        </div>
      ))}
    </div>
  )
}
