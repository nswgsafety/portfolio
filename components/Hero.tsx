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
