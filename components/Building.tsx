'use client'

import { motion } from 'framer-motion'
import AmbientOrbs from './AmbientOrbs'

const activeItems = [
  {
    title: 'Human Wrist Robotic Module',
    org: 'Bergen CC · STEM Research Center',
    description: 'A 3-DOF wrist module replicating full human range of motion — flexion, deviation, rotation.',
    tags: ['Onshape', 'Servo Systems', 'Biomechanics'],
    since: 'Since Nov 2026',
  },
  {
    title: 'TSA Club Expansion',
    org: 'ATHS · Paramus, NJ',
    description: "Leading 20+ students and launching the club's first corporate sponsorship pipeline.",
    tags: ['Leadership', 'Sponsorship', 'Outreach'],
    since: 'Since Sept 2026',
  },
]

const deepening = ['Onshape', 'Substance', 'Blender', 'Flight Dynamics', 'Control Systems']

export default function Building() {
  return (
    <section
      id="building"
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
          style={{ marginBottom: '64px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <span className="diamond-divider" />
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              Building
            </span>
          </div>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(40px, 6vw, 76px)', fontWeight: 400, color: 'var(--ink)', letterSpacing: '-0.035em', lineHeight: 1 }}
          >
            Working on <em style={{ color: 'var(--accent-gold)', fontStyle: 'italic' }}>now.</em>
          </h2>
        </motion.div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', marginBottom: '56px' }}>
          {activeItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="corner-frame"
              style={{
                background: 'rgba(42, 32, 24, 0.03)',
                border: '1px solid rgba(42, 32, 24, 0.1)',
                borderRadius: '3px',
                padding: '28px 26px 30px',
              }}
            >
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', color: 'var(--accent-gold)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '4px' }}>
                {item.org}
              </div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.08em', marginBottom: '16px' }}>
                {item.since}
              </div>

              <h3
                className="font-display"
                style={{ fontSize: 'clamp(19px, 2.2vw, 25px)', fontWeight: 400, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '14px' }}
              >
                {item.title}
              </h3>

              <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'var(--muted)', fontWeight: 300, marginBottom: '20px' }}>
                {item.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                {item.tags.map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills deepening */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ borderTop: '1px solid var(--border)', paddingTop: '24px', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}
        >
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            Deepening
          </span>
          <span style={{ fontSize: '13px', color: 'var(--ink)', opacity: 0.75 }}>
            {deepening.join('  ·  ')}
          </span>
        </motion.div>

      </div>
    </section>
  )
}
