'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export interface Orb {
  size: number
  top: string
  left: string
  color: string // rgb triplet, e.g. '201,164,85'
  opacity?: number
  blur?: number
  duration?: number
  delay?: number
}

const PALETTES: Record<string, Orb[]> = {
  gold: [
    { size: 480, top: '-10%', left: '68%', color: '201,164,85', opacity: 0.16, blur: 60, duration: 14, delay: 0 },
    { size: 260, top: '55%',  left: '-6%', color: '181,80,46',  opacity: 0.12, blur: 50, duration: 11, delay: 1.2 },
    { size: 180, top: '78%',  left: '82%', color: '107,122,79', opacity: 0.14, blur: 40, duration: 9,  delay: 0.6 },
  ],
  terracotta: [
    { size: 420, top: '5%',   left: '-8%', color: '181,80,46',  opacity: 0.16, blur: 55, duration: 13, delay: 0 },
    { size: 300, top: '60%',  left: '78%', color: '201,164,85', opacity: 0.14, blur: 50, duration: 10, delay: 0.8 },
  ],
  olive: [
    { size: 360, top: '10%', left: '80%', color: '107,122,79', opacity: 0.15, blur: 55, duration: 12, delay: 0 },
    { size: 240, top: '70%', left: '5%',  color: '201,164,85', opacity: 0.13, blur: 45, duration: 10, delay: 1.4 },
  ],
}

export default function AmbientOrbs({ variant = 'gold' }: { variant?: keyof typeof PALETTES }) {
  const orbs = PALETTES[variant]
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      refs.current.forEach((el, i) => {
        if (!el) return
        const orb = orbs[i]
        gsap.to(el, {
          y: -30 - i * 8,
          x: 12 + i * 6,
          duration: orb.duration ?? 12,
          delay: orb.delay ?? 0,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })
    })
    return () => ctx.revert()
  }, [orbs])

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }} aria-hidden>
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
            background: `radial-gradient(circle, rgba(${orb.color},${orb.opacity ?? 0.15}) 0%, rgba(${orb.color},0) 70%)`,
            filter: `blur(${orb.blur ?? 40}px)`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  )
}
