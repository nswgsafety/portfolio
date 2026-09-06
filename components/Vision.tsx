'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import TypewriterText from './TypewriterText'

const goals = [
  {
    number: '01',
    title: 'Anduril Industries',
    body: 'Anduril is the benchmark. The company is doing the most consequential defense engineering on the planet — autonomous systems, AI-native hardware, Lattice OS. Landing a role at Anduril is the first major target. The pace, the stakes, the technology — nothing else compares.',
  },
  {
    number: '02',
    title: 'Defense → Civilian Pipeline',
    body: 'Military R&D has always been the upstream source of civilian technology — GPS, the internet, jet engines, night vision. I want to be inside that pipeline early in my career, working on systems that will define the next decade of civilian life. The knowledge compounds.',
  },
  {
    number: '03',
    title: 'Build Real Experience',
    body: "I'm not in a rush to start a company before I'm ready. I want to spend years working at the frontier — designing systems under real constraints, with real accountability. The best founders I admire built deep technical expertise before they ever raised a dollar.",
  },
  {
    number: '04',
    title: 'Build Something That Matters',
    body: "The end goal is an engineering company built to solve a problem that actually changes how people live. Not a feature — a mission. I want my life to count for more than just one. Engineering is the key to unlocking what humans can become.",
  },
]

export default function Vision() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section id="vision" style={{ padding: 'clamp(80px, 10vw, 140px) 0', background: '#0A0A0A' }}>
      <div className="section-inner">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '72px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.12em', color: 'var(--accent-coral)' }}>[06]</span>
            <TypewriterText text="// MISSION_OBJECTIVES" speed={55} style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.14em', color: 'var(--muted)' }} />
          </div>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 400, color: 'var(--ink)', letterSpacing: '-0.035em', lineHeight: 1 }}
          >
            The life I&apos;m <em style={{ color: 'var(--accent-coral)' }}>building toward.</em>
          </h2>
        </motion.div>

        {/* Mission status terminal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '10px',
            color: 'var(--muted)',
            letterSpacing: '0.1em',
            marginBottom: '48px',
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ color: 'var(--accent-coral)', letterSpacing: '0.14em' }}>TARGET://</span>
          <TypewriterText text="ANDURIL_INDUSTRIES" speed={55} delay={300} cursor={false} />
          <span style={{ color: 'var(--border)' }}>·</span>
          <span>STATUS: <TypewriterText text="IN_PURSUIT" speed={65} delay={900} style={{ color: '#22C55E' }} cursor={false} /></span>
          <span style={{ color: 'var(--border)' }}>·</span>
          <span>ETA: <TypewriterText text="2029-2031" speed={65} delay={1500} style={{ color: 'var(--ink)' }} cursor /></span>
        </motion.div>

        {/* Pull quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            borderLeft: '2px solid var(--accent-coral)',
            paddingLeft: '28px',
            marginBottom: '80px',
          }}
        >
          <p
            className="font-display"
            style={{
              fontSize: 'clamp(17px, 2.4vw, 26px)',
              color: 'rgba(237,234,229,0.8)',
              lineHeight: 1.6,
              fontStyle: 'italic',
              fontWeight: 400,
            }}
          >
            &ldquo;Military contractors are where the most important engineering in the world happens.
            The funding is real, the stakes are real, and the technology eventually reaches everyone.
            That&apos;s where I want to start ; and what I want to eventually build on.&rdquo;
          </p>
          <footer style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'var(--muted)', marginTop: '14px', letterSpacing: '0.06em' }}>
            — Ian Andujar
          </footer>
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
                padding: '40px 0',
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
                  color: hovered === g.number ? 'var(--accent-coral)' : 'rgba(237,234,229,0.15)',
                  transition: 'color 0.25s ease',
                }}
              >
                {g.number}
              </span>
              <div>
                <h3
                  className="font-display"
                  style={{ fontSize: 'clamp(20px, 2.4vw, 28px)', fontWeight: 400, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '12px', lineHeight: 1.1 }}
                >
                  <TypewriterText text={g.title} speed={42} delay={150} cursor={false} />
                </h3>
                <p style={{ fontSize: '14px', lineHeight: 1.85, color: 'var(--muted)', fontWeight: 300 }}>
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
