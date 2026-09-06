'use client'

import { motion } from 'framer-motion'
import { Download } from 'lucide-react'

const education = [
  {
    school: 'Applied Technology High School',
    location: 'Paramus, NJ',
    degree: 'A.S. in General Studies · High School Diploma',
    years: 'Sept 2023 — Present',
    highlights: ['TSA Club President', 'Peer Leader', 'Debate Club'],
  },
]

const experience = [
  {
    role: 'Club President — TSA',
    company: 'ATHS, Paramus',
    period: 'Oct 2024 — Present',
    bullets: [
      'Led a 6-member UAV team as primary competition pilot.',
      'Placed 6th at the 2024 NJTSA State Competition, qualifying for Nationals.',
      "Now managing 20+ students and the club's first sponsorship pipeline.",
    ],
  },
  {
    role: 'Research Volunteer — Robotic Arm Project',
    company: 'Bergen Community College, STEM Center',
    period: 'Sept 2025 — Present',
    bullets: [
      'Designing a wrist module replicating all three human wrist movements.',
      'Researching servo and battery options for the arm\'s performance budget.',
    ],
  },
]

const skillGroups = [
  { category: 'CAD & Design',    items: ['AutoCAD', 'Fusion 360', 'Onshape', 'Blender', 'Substance'] },
  { category: 'Fabrication',     items: ['3D Printing', 'Rapid Prototyping', 'Precision Soldering'] },
  { category: 'Engineering',     items: ['Arduino', 'Embedded Systems', 'Flight Controllers', 'Robotics'] },
]

export default function Resume() {
  return (
    <section id="resume" style={{ padding: 'clamp(80px, 10vw, 140px) 0', background: 'var(--white)' }}>
      <div className="section-inner">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', marginBottom: '56px' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span className="diamond-divider" />
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                Resume
              </span>
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1, fontWeight: 400 }}>
              Background<br />
              <em style={{ color: 'var(--accent-gold)' }}>& skills.</em>
            </h2>
          </div>
          <motion.a
            href="/Ian_Andujar_Resume.pdf"
            download
            whileHover={{ y: -2, boxShadow: '0 10px 28px rgba(201,164,85,0.3)' }}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'transparent', color: 'var(--accent-gold)',
              padding: '12px 24px', borderRadius: '2px',
              border: '1px solid var(--accent-gold)',
              fontFamily: 'DM Sans, sans-serif', fontSize: '12px', letterSpacing: '0.1em',
              textDecoration: 'none', textTransform: 'uppercase',
            }}
          >
            <Download size={14} /> Download PDF
          </motion.a>
        </motion.div>

        {/* Education */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: '32px' }}>
          {education.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="corner-frame"
              style={{ background: 'var(--white)', borderRadius: '3px', border: '1px solid var(--border)', padding: '26px 28px' }}
            >
              <h3 className="font-display" style={{ fontSize: '19px', color: 'var(--ink)', marginBottom: '6px', fontWeight: 400 }}>
                {e.school}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '4px' }}>
                {e.degree} · {e.location}
              </p>
              <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '16px', opacity: 0.7 }}>{e.years}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {e.highlights.map(h => <span key={h} className="tag">{h}</span>)}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Experience */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
          {experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ background: 'var(--white)', borderRadius: '3px', border: '1px solid var(--border)', borderLeft: '2px solid var(--accent-gold)', padding: '22px 24px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px', marginBottom: '4px' }}>
                <h4 className="font-display" style={{ fontSize: '17px', color: 'var(--ink)', fontWeight: 400 }}>{exp.role}</h4>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: 'var(--muted)' }}>{exp.period}</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--accent-gold)', marginBottom: '14px' }}>{exp.company}</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'none' }}>
                {exp.bullets.map((b, bi) => (
                  <li key={bi} style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7, paddingLeft: '14px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--accent-gold)' }}>&middot;</span>
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Skills */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
            {skillGroups.map(s => (
              <div key={s.category} style={{ minWidth: '180px' }}>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: 'var(--accent-gold)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '10px' }}>
                  {s.category}
                </p>
                <p style={{ fontSize: '13px', color: 'var(--ink)', lineHeight: 1.9, opacity: 0.85 }}>
                  {s.items.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
