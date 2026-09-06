'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import AmbientOrbs from './AmbientOrbs'

const goals = [
  {
    number: '01',
    title: 'Anduril Industries',
    body: 'The benchmark for consequential defense engineering — autonomous systems, AI-native hardware. That\'s where I\'m headed first.',
  },
  {
    number: '02',
    title: 'Defense → Civilian Pipeline',
    body: 'Military R&D built GPS, the internet, jet engines. I want in early, working on what defines the next decade.',
  },
  {
    number: '03',
    title: 'Real Experience First',
    body: 'Years at the frontier before founding anything — deep technical expertise, built under real constraints.',
  },
  {
    number: '04',
    title: 'Build Something That Matters',
    body: 'An engineering company built to solve a problem that actually changes how people live.',
  },
]

export default function Vision() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section
      id="vision"
      style={{
        padding: 'clamp(100px, 12vw, 160px) 0',
        background: 'linear-gradient(to bottom, var(--white) 0%, transparent 14%, transparent 86%, var(--white) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <AmbientOrbs variant="gold" />
      <div className="section-inner">

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
              Vision
            </span>
          </div>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 400, color: 'var(--ink)', letterSpacing: '-0.035em', lineHeight: 1 }}
          >
            Building <em style={{ color: 'var(--accent-gold)' }}>toward.</em>
          </h2>
        </motion.div>

        {/* Pull quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ borderLeft: '2px solid var(--accent-gold)', paddingLeft: '28px', marginBottom: '72px' }}
        >
          <p
            className="font-display"
            style={{ fontSize: 'clamp(17px, 2.4vw, 26px)', color: 'rgba(42,32,24,0.82)', lineHeight: 1.6, fontStyle: 'italic', fontWeight: 400 }}
          >
            &ldquo;Defense contractors are where the most important engineering in the world happens. That&apos;s where I want to start.&rdquo;
          </p>
        </motion.blockquote>

        {/* Goals list */}
        <div>
          {goals.map((g, i) => (
            <motion.div
              key={g.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              onMouseEnter={() => setHovered(g.number)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'grid',
                gridTemplateColumns: '64px 1fr',
                gap: '32px',
                padding: '36px 0',
                borderTop: '1px solid var(--border)',
                alignItems: 'start',
                opacity: hovered && hovered !== g.number ? 0.35 : 1,
                transition: 'opacity 0.25s ease',
                cursor: 'default',
              }}
            >
              <span
                className="font-display"
                style={{
                  fontSize: '32px', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1,
                  color: hovered === g.number ? 'var(--accent-gold)' : 'rgba(42,32,24,0.14)',
                  transition: 'color 0.25s ease',
                }}
              >
                {g.number}
              </span>
              <div>
                <h3
                  className="font-display"
                  style={{ fontSize: 'clamp(20px, 2.4vw, 28px)', fontWeight: 400, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '8px', lineHeight: 1.1 }}
                >
                  {g.title}
                </h3>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--muted)', fontWeight: 300 }}>
                  {g.body}
                </p>
              </div>
            </motion.div>
          ))}
          <div style={{ height: '1px', background: 'var(--border)' }} />
        </div>

      </div>
    </section>
  )
}
