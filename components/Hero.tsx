'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100svh',
        background: 'transparent',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="flex flex-col items-center justify-center"
    >
      {/* Corner frame — echoes the logo's frame motif at the scale of the viewport */}
      {([
        { top: 'clamp(24px, 4vw, 48px)', left: 'clamp(24px, 4vw, 48px)', borderWidth: '1px 0 0 1px' },
        { top: 'clamp(24px, 4vw, 48px)', right: 'clamp(24px, 4vw, 48px)', borderWidth: '1px 1px 0 0' },
        { bottom: 'clamp(24px, 4vw, 48px)', left: 'clamp(24px, 4vw, 48px)', borderWidth: '0 0 1px 1px' },
        { bottom: 'clamp(24px, 4vw, 48px)', right: 'clamp(24px, 4vw, 48px)', borderWidth: '0 1px 1px 0' },
      ] as const).map((pos, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 + i * 0.1, duration: 0.8 }}
          style={{
            position: 'absolute',
            ...pos,
            width: '32px',
            height: '32px',
            borderStyle: 'solid',
            borderColor: 'rgba(248,239,224,0.55)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Side details — coordinates + mission tag, echoing an aerospace plaque */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.9 }}
        style={{
          position: 'absolute',
          left: 'clamp(24px, 4vw, 48px)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          writingMode: 'vertical-rl',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '10px',
          letterSpacing: '0.28em',
          color: 'rgba(248,239,224,0.55)',
          textTransform: 'uppercase',
        }}
      >
        40.9274&deg;N &middot; 74.0762&deg;W
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.9 }}
        style={{
          position: 'absolute',
          right: 'clamp(24px, 4vw, 48px)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          writingMode: 'vertical-rl',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '10px',
          letterSpacing: '0.28em',
          color: 'rgba(248,239,224,0.55)',
          textTransform: 'uppercase',
        }}
      >
        Mechatronics &middot; Aerospace
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}
      >
        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(52px, 11vw, 148px)',
            fontWeight: 400,
            color: '#F8EFE0',
            letterSpacing: '-0.03em',
            lineHeight: 0.95,
            textShadow: '0 4px 40px rgba(42,20,8,0.35)',
          }}
        >
          Ian Andujar<span style={{ color: 'var(--dusk-warm)' }}>.</span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            marginTop: '22px',
          }}
        >
          <span style={{ width: '6px', height: '6px', background: 'var(--dusk-warm)', transform: 'rotate(45deg)' }} />
          <span
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '11px',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: 'rgba(248,239,224,0.75)',
            }}
          >
            Engineer &middot; Builder
          </span>
          <span style={{ width: '6px', height: '6px', background: 'var(--dusk-warm)', transform: 'rotate(45deg)' }} />
        </motion.div>
      </motion.div>

      <motion.a
        href="#work"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.9 }}
        whileHover={{ scale: 1.05 }}
        style={{
          position: 'absolute',
          bottom: '56px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          border: '1px solid rgba(248,239,224,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '9px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(248,239,224,0.85)',
          }}
        >
          Scroll
        </span>
      </motion.a>
    </section>
  )
}
