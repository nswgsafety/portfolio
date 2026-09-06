'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Phase = 'typing' | 'correcting' | 'complete' | 'swoosh' | 'logo' | 'exit'

// Module-level flag: false when JS first loads (hard reload), stays true during SPA nav
let hasPlayed = false

const WRONG   = '1an\u00A0@ndujar'   // \u00A0 = non-breaking space before @
const CHAR_MS = 72
const TYPED   = WRONG.length * CHAR_MS                 // ~864ms

const T = {
  correcting: TYPED + 500,
  complete:   TYPED + 1700,
  swoosh:     TYPED + 2700,
  logo:       TYPED + 3300,
  exit:       TYPED + 5200,
  done:       TYPED + 5900,
}

const FONT = {
  fontFamily: '"Playfair Display", Georgia, serif',
  fontWeight: 900,
  fontSize:   'clamp(50px, 8.5vw, 100px)',
  letterSpacing: '-0.03em',
  lineHeight: 1,
  color: 'var(--ink)',
} as const

export default function Loader({ onComplete }: { onComplete: () => void }) {
  // Start hidden — only show if we actually need to play the animation
  const [visible, setVisible]   = useState(false)
  const [phase,   setPhase]     = useState<Phase>('typing')
  const [chars,   setChars]     = useState(0)

  useEffect(() => {
    // Already played this JS session (SPA nav) → skip instantly
    if (hasPlayed) {
      setVisible(false)
      onComplete()
      return
    }

    hasPlayed = true
    setVisible(true)

    let active = true
    let completed = false   // tracks whether animation ran to completion

    const interval = setInterval(() => {
      if (!active) return
      setChars(n => {
        if (n >= WRONG.length) { clearInterval(interval); return n }
        return n + 1
      })
    }, CHAR_MS)

    const go = (p: Phase, ms: number) =>
      setTimeout(() => { if (active) setPhase(p) }, ms)

    const timers = [
      go('correcting', T.correcting),
      go('complete',   T.complete),
      go('swoosh',     T.swoosh),
      go('logo',       T.logo),
      go('exit',       T.exit),
      setTimeout(() => {
        if (!active) return
        completed = true
        onComplete()
      }, T.done),
    ]

    return () => {
      active = false
      clearInterval(interval)
      timers.forEach(clearTimeout)
      // StrictMode cleanup fires before animation completes — reset so the
      // real second invocation can run the animation normally
      if (!completed) hasPlayed = false
    }
  }, [onComplete])

  // Nothing to render if we're skipping or haven't started yet
  if (!visible) return null

  // ── Derived display state ────────────────────────────────────────────────
  const isCorrect = ['correcting', 'complete', 'swoosh'].includes(phase)
  const showText  = !['logo', 'exit'].includes(phase)
  const showLogo  = ['logo', 'exit'].includes(phase)

  // WRONG = '1an\u00A0@ndujar'
  //          0 123    4 5678910  (12 chars with nbsp)
  // segments: [1][an\u00A0][@][ndujar]
  //   first char idx 0
  //   mid    idx 1-3  ("an\u00A0")
  //   @      idx 4
  //   rest   idx 5-11 ("ndujar")
  const MID      = 'an\u00A0'
  const midCount = Math.min(3, Math.max(0, chars - 1))
  const midText  = isCorrect ? MID : MID.slice(0, midCount)

  const restFull  = 'ndujar'
  const restCount = Math.max(0, chars - 5)
  const restText  = isCorrect ? restFull : restFull.slice(0, restCount)

  const showFirst = chars >= 1
  const showAt    = chars >= 5

  return (
    <motion.div
      animate={{ opacity: phase === 'exit' ? 0 : 1 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: 'var(--white)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: '20px',
        pointerEvents: phase === 'exit' ? 'none' : 'all',
      }}
    >
      {/* ── Typing / correcting text ─────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {showText && (
          <motion.div
            key="name"
            animate={
              phase === 'swoosh'
                ? { x: '115vw', opacity: 0 }
                : { x: 0, opacity: 1 }
            }
            transition={
              phase === 'swoosh'
                ? { duration: 0.55, ease: [0.76, 0, 0.24, 1] }
                : {}
            }
            style={{ display: 'flex', alignItems: 'baseline' }}
          >
            {/* "1" → "I" */}
            {(showFirst || isCorrect) && (
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <motion.span
                  animate={isCorrect ? { opacity: 0, y: -16 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeIn' }}
                  style={{ ...FONT, color: 'var(--accent-gold)', display: 'block' }}
                >1</motion.span>

                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={isCorrect ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                  style={{ ...FONT, position: 'absolute', top: 0, left: 0 }}
                >I</motion.span>
              </div>
            )}

            {/* "an " */}
            {(midCount > 0 || isCorrect) && (
              <span style={{ ...FONT }}>{midText}</span>
            )}

            {/* "@" → "A": hidden spacer controls width (A-width when corrected, @-width when typing)
                so ndujar always sits flush against whichever glyph is visible */}
            {(showAt || isCorrect) && (
              <div style={{ position: 'relative', display: 'inline-block' }}>
                {/* Invisible spacer — sets container width to 'A' when corrected, '@' when typing */}
                <span style={{ ...FONT, visibility: 'hidden' }}>
                  {isCorrect ? 'A' : '@'}
                </span>

                <motion.span
                  animate={isCorrect ? { opacity: 0, y: 16, scale: 0.8 } : { opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.28, ease: 'easeIn', delay: 0.06 }}
                  style={{ ...FONT, color: 'var(--accent-gold)', position: 'absolute', top: 0, left: 0 }}
                >@</motion.span>

                <motion.span
                  initial={{ opacity: 0, y: -80 }}
                  animate={isCorrect ? { opacity: 1, y: 0 } : { opacity: 0, y: -80 }}
                  transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
                  style={{ ...FONT, position: 'absolute', top: 0, left: 0 }}
                >A</motion.span>

                {(restCount > 0 || isCorrect) && (
                  <span style={{ ...FONT }}>{restText}</span>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── IA. logo ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showLogo && (
          <>
            <motion.div
              key="logo"
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ ...FONT, fontSize: 'clamp(80px, 15vw, 160px)', letterSpacing: '-0.04em' }}
            >
              IA<span style={{ color: 'var(--accent-gold)' }}>.</span>
            </motion.div>

            <motion.p
              key="sub"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 0.38, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              style={{
                fontFamily: 'DM Mono, monospace', fontSize: '11px',
                letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)',
              }}
            >
              Mechatronics · Aerospace · Builder
            </motion.p>
          </>
        )}
      </AnimatePresence>

      {/* ── Progress line ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.22 }}
        transition={{
          scaleX: { duration: T.done / 1000, ease: 'linear' },
          opacity: { duration: 0.4 },
        }}
        style={{
          position: 'absolute', bottom: '52px',
          left: 'calc(50% - 64px)', width: '128px', height: '1px',
          background: 'var(--accent-gold)', transformOrigin: 'left center',
        }}
      />
    </motion.div>
  )
}
