'use client'

import { motion } from 'framer-motion'
import TypewriterText from './TypewriterText'

const activeItems = [
  {
    title: 'Human Wrist Robotic Module',
    status: 'ACTIVE_RESEARCH',
    org: '~/bergen-cc/stem-research-center/',
    description: 'Designing and prototyping a wrist module that replicates all three rotational axes of the human wrist — flexion/extension, radial/ulnar deviation, and pronation/supination.',
    tags: ['onshape', 'servo-systems', 'biomechanics', 'prototyping'],
    since: 'Nov 2026',
    color: '#8B5CF6',
  },
  {
    title: 'TSA Club Expansion & Sponsorship',
    status: 'IN_PROGRESS',
    org: '~/aths/tsa-club/paramus-nj/',
    description: "Managing 20+ students across multiple engineering project teams. Building the club's first formal corporate sponsorship pipeline to fund future competitions.",
    tags: ['leadership', 'project-management', 'outreach'],
    since: 'Sept 2026',
    color: '#22C55E',
  },
]

const deepening = ['Onshape', 'Adobe Substance', 'Blender', 'Flight Dynamics', 'Control Systems']

export default function Building() {
  return (
    <section id="building" style={{ padding: 'clamp(80px, 10vw, 140px) 0', background: '#0A0807' }}>
      <div className="section-inner">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '64px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.12em', color: 'var(--accent-coral)' }}>[02]</span>
            <TypewriterText text="// ACTIVE_OPERATIONS" speed={55} style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.14em', color: 'var(--muted)' }} />
          </div>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(40px, 6vw, 76px)', fontWeight: 400, color: 'var(--ink)', letterSpacing: '-0.035em', lineHeight: 1 }}
          >
            What I&apos;m working{' '}
            <em style={{ color: 'var(--accent-coral)', fontStyle: 'italic' }}>on now.</em>
          </h2>
        </motion.div>

        {/* Terminal project cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', marginBottom: '56px' }}>
          {activeItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              style={{
                background: 'rgba(255, 248, 240, 0.025)',
                border: '1px solid rgba(255, 248, 240, 0.07)',
                borderLeft: `2px solid ${item.color}`,
                borderRadius: '3px',
                overflow: 'hidden',
                transition: 'background 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(255, 248, 240, 0.04)'
                el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px ${item.color}30`
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(255, 248, 240, 0.025)'
                el.style.boxShadow = 'none'
              }}
            >
              {/* Terminal chrome bar */}
              <div style={{
                padding: '9px 20px',
                background: item.color + '0E',
                borderBottom: `1px solid ${item.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ width: '5px', height: '5px', borderRadius: '50%', background: item.color, boxShadow: `0 0 6px ${item.color}` }}
                  />
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: item.color, letterSpacing: '0.14em' }}>
                    [{item.status}]
                  </span>
                </div>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.08em' }}>
                  INITIATED: {item.since}
                </span>
              </div>

              {/* Content */}
              <div style={{ padding: '22px 24px 28px' }}>

                {/* Org path */}
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: `${item.color}90`, letterSpacing: '0.1em', marginBottom: '12px' }}>
                  {item.org}
                </div>

                {/* Title */}
                <h3
                  className="font-display"
                  style={{ fontSize: 'clamp(19px, 2.2vw, 25px)', fontWeight: 400, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '16px' }}
                >
                  <TypewriterText text={item.title} speed={38} delay={300} cursor={false} />
                </h3>

                {/* Description with > prompt */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '22px' }}>
                  <span style={{ color: item.color, fontFamily: 'DM Mono, monospace', fontSize: '11px', flexShrink: 0, marginTop: '2px' }}>{'>'}</span>
                  <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'var(--muted)', fontWeight: 300 }}>
                    {item.description}
                  </p>
                </div>

                {/* Tags as CLI flags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                  {item.tags.map(t => (
                    <span
                      key={t}
                      style={{
                        fontFamily: 'DM Mono, monospace', fontSize: '9px',
                        color: item.color, letterSpacing: '0.08em',
                        padding: '3px 9px',
                        border: `1px solid ${item.color}35`,
                        borderRadius: '2px',
                      }}
                    >
                      --{t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills deepening — terminal query */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '28px',
            fontFamily: 'DM Mono, monospace',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span style={{ color: 'var(--accent-coral)', fontSize: '10px' }}>{'>'}</span>
            <TypewriterText
              text="skills --learning --active"
              speed={50}
              style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.1em' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', paddingLeft: '18px' }}>
            {deepening.map((s, i) => (
              <span
                key={s}
                style={{
                  fontSize: '10px',
                  color: 'var(--ink)',
                  letterSpacing: '0.06em',
                  opacity: 0.7 + i * 0.06,
                }}
              >
                {s.replace(/\s+/g, '_')}
                {i < deepening.length - 1 && <span style={{ color: 'var(--accent-coral)', margin: '0 6px' }}>·</span>}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
