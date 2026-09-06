'use client'

import { motion } from 'framer-motion'
import AmbientOrbs from './AmbientOrbs'

const aphorisms = [
  'Fear is the ground state of being — not a reaction, but the foundation everything else is built on.',
  'Power is what emerges when something tries to manage that fear.',
  'Every human drive — love, curiosity, ambition — traces back to these two forces.',
  "Power over yourself is the only kind that doesn't require someone else to lose.",
]

export default function Philosophy() {
  return (
    <section id="philosophy" style={{ padding: 'clamp(100px, 14vw, 200px) 0', background: 'var(--white)', position: 'relative', overflow: 'hidden' }}>
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(181,80,46,0.06) 0%, transparent 70%)',
        }}
      />
      <AmbientOrbs variant="terracotta" />

      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '32px' }}
        >
          <span className="diamond-divider" />
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            Philosophy
          </span>
          <span className="diamond-divider" />
        </motion.div>

        {/* Dominant serif quote */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display"
          style={{
            fontSize: 'clamp(30px, 5.4vw, 76px)',
            color: 'var(--ink)',
            lineHeight: 1.15,
            fontStyle: 'italic',
            fontWeight: 400,
            textAlign: 'center',
            maxWidth: '920px',
            margin: '0 auto 56px',
          }}
        >
          &ldquo;Fear just is. What you do with it is the{' '}
          <span style={{ color: 'var(--accent-terracotta)' }}>only question</span> that matters.&rdquo;
        </motion.p>

        {/* Aphorisms */}
        <div style={{ maxWidth: '640px', margin: '0 auto 48px' }}>
          {aphorisms.map((a, i) => (
            <motion.p
              key={a}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                fontSize: '15px', lineHeight: 1.9, color: 'var(--muted)', fontWeight: 300,
                textAlign: 'center', padding: '18px 0',
                borderTop: i > 0 ? '1px solid var(--border)' : 'none',
              }}
            >
              {a}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <a
            href="/fear-and-power.html"
            download="Fear-and-Power-Ian-Andujar.html"
            className="corner-frame"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              fontFamily: 'DM Sans, sans-serif', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--accent-gold)', border: '1px solid var(--accent-gold-dim)',
              borderRadius: '2px', padding: '12px 24px', textDecoration: 'none',
              transition: 'all 0.25s ease',
            }}
          >
            Read the Full Framework
          </a>
        </motion.div>

      </div>
    </section>
  )
}
