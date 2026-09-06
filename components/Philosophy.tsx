'use client'

import { motion } from 'framer-motion'

const aphorisms = [
  'Fear is the ground state of being — not a reaction, but the foundation everything else is built on.',
  'Power is what emerges when something tries to manage that fear.',
  'Every human drive — love, curiosity, ambition — traces back to these two forces.',
  "Power over yourself is the only kind that doesn't require someone else to lose.",
]

const pullQuote = 'Fear just is. What you do with it is the only question that matters.'

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      style={{ padding: 'clamp(100px, 12vw, 160px) 0', background: 'var(--white)', position: 'relative', overflow: 'hidden' }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(201,164,85,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '56px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <span className="diamond-divider" />
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              Philosophy
            </span>
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(48px, 8vw, 100px)', fontWeight: 400, color: 'var(--ink)', letterSpacing: '-0.03em', lineHeight: 0.95 }}>
            Fear <span style={{ color: 'var(--accent-gold)' }}>&amp; Power.</span>
          </h2>
        </motion.div>

        {/* Pull quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="corner-frame"
          style={{
            marginBottom: '48px',
            padding: 'clamp(28px, 4vw, 48px)',
            border: '1px solid var(--accent-gold-dim)',
            borderRadius: '3px',
            background: 'rgba(201,164,85,0.03)',
          }}
        >
          <p className="font-display" style={{ fontSize: 'clamp(20px, 3vw, 34px)', color: 'var(--ink)', lineHeight: 1.5, fontStyle: 'italic', fontWeight: 400 }}>
            &ldquo;{pullQuote}&rdquo;
          </p>
        </motion.div>

        {/* Aphorisms */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2px', marginBottom: '40px', background: 'var(--border)' }}>
          {aphorisms.map((a, i) => (
            <motion.div
              key={a}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              style={{ padding: '26px', background: 'var(--white)' }}
            >
              <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--muted)', fontWeight: 300 }}>{a}</p>
            </motion.div>
          ))}
        </div>

        <motion.a
          href="/fear-and-power.html"
          download="Fear-and-Power-Ian-Andujar.html"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            fontFamily: 'DM Sans, sans-serif', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--accent-gold)', border: '1px solid var(--accent-gold-dim)',
            borderRadius: '2px', padding: '12px 24px', textDecoration: 'none',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,164,85,0.08)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
        >
          Read the Full Framework
        </motion.a>

      </div>
    </section>
  )
}
