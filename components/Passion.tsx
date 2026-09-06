'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const passions = [
  {
    index: '01',
    title: 'Engineering',
    description: 'Engineering is not what I do — it is how I think. Every problem I encounter I immediately begin to break down, model, and solve. Building real physical systems, from FPV drones to robotic wrist modules, is where I feel most alive. There is nothing more satisfying than making something that was not there before.',
  },
  {
    index: '02',
    title: 'Critical Thinking',
    description: 'I break everything down to first principles. Before I touch a design or system, I want to understand what it actually is at the deepest level — why it exists, what failure looks like, and what an ideal version would look like. That kind of thinking produced the Fear & Power framework. It is how I approach engineering too.',
  },
  {
    index: '03',
    title: 'Aerospace & Defense',
    description: 'The most consequential engineering in the world happens under the pressure of real stakes and real funding. Defense R&D has produced GPS, the internet, and jet propulsion. I want to be inside that pipeline — building systems that will define the next generation of civilian technology.',
  },
  {
    index: '04',
    title: 'Building for Humanity',
    description: 'The goal is not just a startup. The goal is to build something that makes the world meaningfully different — technology that reaches people who need it, problems solved at a scale that makes one life count as many. Engineering is the key to unlocking what humans can become.',
  },
]

export default function Passion() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section id="passion" style={{ padding: 'clamp(80px, 10vw, 140px) 0', background: 'var(--white)' }}>
      <div className="section-inner">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '72px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <span className="diamond-divider" />
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              Passion
            </span>
          </div>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(40px, 6vw, 76px)', fontWeight: 400, color: 'var(--ink)', letterSpacing: '-0.035em', lineHeight: 1 }}
          >
            What drives <em style={{ color: 'var(--accent-gold)', fontStyle: 'italic' }}>me.</em>
          </h2>
        </motion.div>

        {/* Passion rows */}
        <div>
          {passions.map((p, i) => (
            <motion.div
              key={p.index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              onMouseEnter={() => setHovered(p.index)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '60px',
                padding: '48px 0',
                borderTop: '1px solid var(--border)',
                alignItems: 'start',
                position: 'relative',
                opacity: hovered && hovered !== p.index ? 0.4 : 1,
                transition: 'opacity 0.25s ease',
                cursor: 'default',
              }}
              className="passion-grid"
            >
              {/* Watermark number */}
              <span
                aria-hidden
                className="font-display"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '20px',
                  fontSize: 'clamp(80px, 12vw, 140px)',
                  fontWeight: 900,
                  color: 'rgba(255,248,240,0.025)',
                  letterSpacing: '-0.05em',
                  lineHeight: 1,
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              >
                {p.index}
              </span>

              {/* Left: index + title */}
              <div>
                <span style={{
                  display: 'block',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '11px',
                  color: hovered === p.index ? 'var(--accent-gold)' : 'var(--muted)',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginBottom: '18px',
                  transition: 'color 0.2s ease',
                }}>
                  {p.index}
                </span>
                <h3
                  className="font-display"
                  style={{
                    fontSize: 'clamp(28px, 3.5vw, 48px)',
                    fontWeight: 400,
                    color: hovered === p.index ? 'var(--ink)' : 'rgba(237,234,229,0.85)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.05,
                    transition: 'color 0.2s ease',
                  }}
                >
                  {p.title}
                </h3>
              </div>

              {/* Right: description */}
              <p style={{
                fontSize: '15px',
                lineHeight: 1.85,
                color: 'var(--muted)',
                fontWeight: 300,
                paddingTop: '44px',
              }}>
                {p.description}
              </p>
            </motion.div>
          ))}
          <div style={{ height: '1px', background: 'var(--border)' }} />
        </div>

      </div>
    </section>
  )
}
