'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

let hasPlayed = false

const RING_COUNT = 32
const RING_RADIUS = 46
const DOT_RADIUS = 7.5

function OrnamentRing({ progress }: { progress: number }) {
  const items = Array.from({ length: RING_COUNT })
  return (
    <svg width="150" height="150" viewBox="0 0 140 140">
      <circle cx="70" cy="70" r="40" fill="none" stroke="rgba(216,154,92,0.35)" strokeWidth="0.75" />
      {items.map((_, i) => {
        const angle = (i / RING_COUNT) * Math.PI * 2
        const cx = 70 + RING_RADIUS * Math.cos(angle)
        const cy = 70 + RING_RADIUS * Math.sin(angle)
        const lit = i / RING_COUNT <= progress
        return (
          <circle
            key={i}
            cx={cx} cy={cy} r={DOT_RADIUS}
            fill="none"
            stroke={lit ? '#D89A5C' : 'rgba(216,154,92,0.25)'}
            strokeWidth="0.75"
          />
        )
      })}
      <text x="70" y="78" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="26" fill="#F3D9A8">
        {Math.round(progress * 100)}
      </text>
    </svg>
  )
}

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (hasPlayed) {
      // visible already defaults to false — nothing to update locally
      onComplete()
      return
    }
    hasPlayed = true
    setVisible(true)

    let raf: number
    let completed = false
    const duration = 1700
    const start = performance.now()

    function tick(now: number) {
      const p = Math.min(1, (now - start) / duration)
      setProgress(p)
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        completed = true
        setTimeout(onComplete, 450)
      }
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      if (!completed) hasPlayed = false
    }
  }, [onComplete])

  if (!visible) return null

  return (
    <motion.div
      animate={{ opacity: progress >= 1 ? 0 : 1 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: 'var(--dusk-deep)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: '20px',
        pointerEvents: progress >= 1 ? 'none' : 'all',
      }}
    >
      <div style={{ position: 'absolute', top: '28px', left: '32px', fontFamily: 'Playfair Display, serif', fontSize: '15px', color: 'rgba(243,217,168,0.7)' }}>
        Ian Andujar
      </div>
      <OrnamentRing progress={progress} />
    </motion.div>
  )
}
