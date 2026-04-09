'use client'

/**
 * LiquidGlass — web-based liquid glass effect.
 *
 * Uses:
 * - SVG feTurbulence + feDisplacementMap for the wobbly glass-edge distortion
 * - CSS backdrop-filter blur for the frosted glass fill
 * - Animated shimmer border via conic-gradient
 * - The SVG filter is applied only to the border/edge layer, keeping inner text crisp
 */

import { useEffect, useId, useRef } from 'react'
import { gsap } from 'gsap'

interface LiquidGlassProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  tint?: string          // rgba tint color
  blur?: number          // backdrop blur px (default 20)
  distort?: number       // displacement scale (default 6 — subtle)
  shimmer?: boolean      // animated border shimmer
  dark?: boolean         // dark variant
}

export default function LiquidGlass({
  children,
  className,
  style,
  tint,
  blur = 20,
  distort = 6,
  shimmer = true,
  dark = false,
}: LiquidGlassProps) {
  const id = useId().replace(/:/g, '')
  const filterId = `lg-${id}`
  const shimmerRef = useRef<HTMLDivElement>(null)

  // Animate turbulence baseFrequency for the "liquid" feeling
  const freqRef = useRef<SVGFETurbulenceElement>(null)
  useEffect(() => {
    const el = freqRef.current
    if (!el) return
    let freq = 0.012
    let dir = 1
    const tick = () => {
      freq += dir * 0.000015
      if (freq > 0.022 || freq < 0.008) dir *= -1
      el.setAttribute('baseFrequency', `${freq} ${freq * 0.7}`)
    }
    const raf = setInterval(tick, 50)
    return () => clearInterval(raf)
  }, [])

  // Shimmer rotation
  useEffect(() => {
    if (!shimmer || !shimmerRef.current) return
    gsap.to(shimmerRef.current, {
      '--shimmer-angle': '360deg',
      duration: 4,
      repeat: -1,
      ease: 'none',
    })
  }, [shimmer])

  const defaultTint = dark
    ? 'rgba(20, 20, 28, 0.72)'
    : 'rgba(255, 255, 255, 0.10)'

  const borderColor = dark
    ? 'rgba(255,255,255,0.10)'
    : 'rgba(255,255,255,0.45)'

  return (
    <>
      {/* Hidden SVG filter definition */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              ref={freqRef}
              type="fractalNoise"
              baseFrequency="0.012 0.008"
              numOctaves="3"
              seed="5"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={distort}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Main container */}
      <div
        className={className}
        style={{
          position: 'relative',
          ...style,
        }}
      >
        {/* Liquid-distorted edge layer (sits behind, only the border/bg is filtered) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            backdropFilter: `blur(${blur}px) saturate(1.6)`,
            WebkitBackdropFilter: `blur(${blur}px) saturate(1.6)`,
            background: tint ?? defaultTint,
            border: `1px solid ${borderColor}`,
            // Apply liquid distortion to this layer only
            filter: `url(#${filterId})`,
            zIndex: 0,
          }}
        />

        {/* Shimmer border overlay */}
        {shimmer && (
          <div
            ref={shimmerRef}
            style={{
              position: 'absolute',
              inset: -1,
              borderRadius: 'inherit',
              background: dark
                ? 'conic-gradient(from var(--shimmer-angle, 0deg), transparent 80%, rgba(255,255,255,0.08) 90%, transparent 100%)'
                : 'conic-gradient(from var(--shimmer-angle, 0deg), transparent 80%, rgba(255,255,255,0.55) 90%, transparent 100%)',
              zIndex: 0,
              opacity: 0.8,
            } as React.CSSProperties}
          />
        )}

        {/* Inner highlight — top edge specular */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: '10%', right: '10%',
            height: '1px',
            background: dark
              ? 'linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)'
              : 'linear-gradient(to right, transparent, rgba(255,255,255,0.8), transparent)',
            zIndex: 1,
            borderRadius: 'inherit',
          }}
        />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          {children}
        </div>
      </div>
    </>
  )
}
