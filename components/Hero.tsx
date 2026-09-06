'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section
      id="hero"
      style={{ minHeight: '100svh', background: 'transparent', position: 'relative', overflow: 'hidden' }}
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
            color: 'var(--ink)',
            letterSpacing: '-0.03em',
            lineHeight: 0.95,
          }}
        >
          Ian Andujar<span style={{ color: 'var(--accent-gold)' }}>.</span>
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
          <span className="diamond-divider" />
          <span
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '11px',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            Engineer &middot; Builder
          </span>
          <span className="diamond-divider" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '48px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
        }}
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.7, 0.25, 0.7] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '1px', height: '40px', background: 'var(--accent-gold)' }}
        />
      </motion.div>
    </section>
  )
}
