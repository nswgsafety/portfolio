'use client'

import { motion } from 'framer-motion'
import TypewriterText from './TypewriterText'
import { Download } from 'lucide-react'

const education = [
  {
    school: 'Applied Technology High School',
    location: 'Paramus, NJ',
    degree: 'A.S. in General Studies · High School Diploma',
    years: 'Sept 2023 — Present',
    notes: 'Relevant Coursework: Engineering Design, CAD Modeling, Embedded Systems, Robotics, Manufacturing Processes. Project lead on 6+ engineering projects.',
    highlights: ['TSA_Club_President (2024–Present)', 'Peer_Leader', 'Debate_Club', '3SP Volunteer'],
  },
]

const experience = [
  {
    role: 'Club President — TSA (Technology Student Association)',
    company: 'ATHS, Paramus',
    period: 'Oct 2024 — Present',
    color: '#22C55E',
    bullets: [
      'Coordinated workflow and task delegation for a 6-member UAV drone development team while serving as primary pilot for all competition flights.',
      'Placed 6th at the 2024 NJTSA State Competition, earning qualification to the TSA National Competition.',
      'Engineered drone assembly through precision soldering, custom 3D-printed component design, and flight controller configuration.',
      "Elected club president 2025 — now managing 20+ students across multiple project teams, establishing the organization's first corporate sponsorship program, and launching the official club website.",
    ],
  },
  {
    role: 'Research Volunteer — Robotic Arm Project',
    company: 'Bergen Community College, STEM Center',
    period: 'Sept 2025 — Present',
    color: '#8B5CF6',
    bullets: [
      'Researching battery components and servo alternatives to optimize future performance for the Robotic Arm Project.',
      'Designing a wrist module that replicates all three movements of the human wrist.',
      'Manufacturing and testing wrist module prototypes using Onshape, Google Docs, and Sheets for documentation and tracking.',
      'Collaborating with students and faculty on research tasks at the STEM Research Center.',
    ],
  },
]

const skillGroups = [
  { category: 'CAD_&_DESIGN',     items: ['AutoCAD', 'Fusion_360', 'Onshape', 'Blender', 'Adobe_Substance'], color: '#22C55E' },
  { category: 'FABRICATION',      items: ['3D_Printing', 'Rapid_Prototyping', 'Precision_Soldering', 'FDM'], color: '#3DBBFF' },
  { category: 'ENGINEERING',      items: ['Arduino_IDE', 'Embedded_Systems', 'Flight_Controllers', 'Robotics'], color: '#8B5CF6' },
  { category: 'PRODUCTION_&_OPS', items: ['Adobe_Premiere', 'Project_Management', 'Project_Design', 'Documentation'], color: '#C8F050' },
]

const MONO: React.CSSProperties = { fontFamily: 'DM Mono, monospace' }

export default function Resume() {
  return (
    <section id="resume" style={{ padding: 'clamp(80px, 10vw, 140px) 0', background: '#0D0D0D' }}>
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
              <span style={{ ...MONO, fontSize: '10px', letterSpacing: '0.12em', color: 'var(--accent-coral)' }}>[04]</span>
              <TypewriterText text="// DOSSIER" speed={55} style={{ ...MONO, fontSize: '10px', letterSpacing: '0.14em', color: 'var(--muted)' }} />
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1, fontWeight: 400 }}>
              Background<br />
              <em style={{ color: 'var(--accent-amber)' }}>& skills.</em>
            </h2>
          </div>
          <motion.a
            href="/Ian_Andujar_Resume.pdf"
            download
            whileHover={{ y: -2, boxShadow: '0 10px 28px rgba(34,197,94,0.3)' }}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'transparent', color: 'var(--accent-amber)',
              padding: '12px 24px', borderRadius: '2px',
              border: '1px solid var(--accent-amber)',
              ...MONO, fontSize: '11px', letterSpacing: '0.1em',
              textDecoration: 'none', textTransform: 'uppercase',
            }}
          >
            <Download size={14} /> Download PDF
          </motion.a>
        </motion.div>

        {/* ── Education ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ ...MONO, fontSize: '11px', color: 'var(--accent-coral)' }}>{'>'}</span>
            <TypewriterText text="cat education.log" speed={50} style={{ ...MONO, fontSize: '11px', letterSpacing: '0.08em', color: 'var(--muted)' }} />
          </div>

          {education.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ background: 'var(--white)', borderRadius: '3px', border: '1px solid var(--border)', borderLeft: '2px solid var(--accent-coral)', overflow: 'hidden' }}
            >
              {/* Terminal bar */}
              <div style={{ padding: '9px 20px', background: 'rgba(34,197,94,0.06)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ ...MONO, fontSize: '9px', color: 'var(--accent-coral)', letterSpacing: '0.14em' }}>EDUCATION.LOG</span>
                <span style={{ ...MONO, fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.08em' }}>RECORD 01/01</span>
              </div>

              {/* Content */}
              <div style={{ padding: '24px 28px 28px' }}>
                {/* Key-value rows */}
                {[
                  ['INSTITUTION', e.school],
                  ['LOCATION', e.location],
                  ['PROGRAM', e.degree],
                  ['PERIOD', e.years],
                ].map(([key, val]) => (
                  <div key={key} style={{ display: 'flex', gap: '12px', marginBottom: '8px', alignItems: 'flex-start' }}>
                    <span style={{ ...MONO, fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.1em', minWidth: '100px', flexShrink: 0 }}>{key}</span>
                    <span style={{ ...MONO, fontSize: '10px', color: 'rgba(34,197,94,0.3)', flexShrink: 0 }}>···</span>
                    <span style={{ ...MONO, fontSize: '10px', color: 'var(--ink)', letterSpacing: '0.04em' }}>{val}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '8px', alignItems: 'flex-start' }}>
                  <span style={{ ...MONO, fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.1em', minWidth: '100px', flexShrink: 0 }}>COURSEWORK</span>
                  <span style={{ ...MONO, fontSize: '10px', color: 'rgba(34,197,94,0.3)', flexShrink: 0 }}>···</span>
                  <span style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>{e.notes}</span>
                </div>
                {/* Roles/highlights */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '4px', alignItems: 'flex-start' }}>
                  <span style={{ ...MONO, fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.1em', minWidth: '100px', flexShrink: 0 }}>ROLES</span>
                  <span style={{ ...MONO, fontSize: '10px', color: 'rgba(34,197,94,0.3)', flexShrink: 0 }}>···</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {e.highlights.map(h => (
                      <span key={h} style={{ ...MONO, fontSize: '9px', padding: '2px 8px', borderRadius: '2px', background: 'rgba(34,197,94,0.06)', color: 'var(--accent-coral)', letterSpacing: '0.06em' }}>
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Experience ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ ...MONO, fontSize: '11px', color: 'var(--accent-coral)' }}>{'>'}</span>
            <TypewriterText text="ps aux --filter=experience --sort=recent" speed={45} style={{ ...MONO, fontSize: '11px', letterSpacing: '0.08em', color: 'var(--muted)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ background: 'var(--white)', borderRadius: '3px', border: '1px solid var(--border)', borderLeft: `2px solid ${exp.color}`, overflow: 'hidden' }}
              >
                {/* Terminal process bar */}
                <div style={{
                  padding: '9px 20px',
                  background: exp.color + '10',
                  borderBottom: `1px solid ${exp.color}25`,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                      style={{ width: '5px', height: '5px', borderRadius: '50%', background: exp.color }}
                    />
                    <span style={{ ...MONO, fontSize: '9px', color: exp.color, letterSpacing: '0.12em' }}>[PROCESS]</span>
                    <span style={{ ...MONO, fontSize: '9px', color: 'var(--ink)', letterSpacing: '0.06em' }}>
                      {exp.company.replace(/,\s*/g, '/').replace(/\s+/g, '-').toLowerCase()}
                    </span>
                  </div>
                  <span style={{ ...MONO, fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.08em', border: `1px solid ${exp.color}30`, padding: '2px 8px', borderRadius: '2px' }}>
                    {exp.period}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: '20px 24px 24px' }}>
                  <h4
                    className="font-display"
                    style={{ fontSize: '17px', color: 'var(--ink)', marginBottom: '16px', fontWeight: 400, letterSpacing: '-0.01em', lineHeight: 1.2 }}
                  >
                    <TypewriterText text={exp.role} speed={28} delay={200} cursor={false} />
                  </h4>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '9px', listStyle: 'none' }}>
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} style={{ display: 'flex', gap: '12px', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7 }}>
                        <span style={{ ...MONO, color: exp.color, flexShrink: 0, marginTop: '1px', fontSize: '11px' }}>$</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Skills terminal output ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ ...MONO, fontSize: '11px', color: 'var(--accent-coral)' }}>{'>'}</span>
            <TypewriterText text="query_skills --list-all --format=table" speed={45} style={{ ...MONO, fontSize: '11px', letterSpacing: '0.08em', color: 'var(--muted)' }} />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              background: 'rgba(255,248,240,0.02)',
              border: '1px solid var(--border)',
              borderLeft: '2px solid var(--accent-coral)',
              borderRadius: '3px',
              overflow: 'hidden',
              marginBottom: '24px',
            }}
          >
            {/* Terminal output header */}
            <div style={{ padding: '9px 20px', background: 'rgba(34,197,94,0.04)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ ...MONO, fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.1em' }}>SKILLS_INDEX · {skillGroups.reduce((n, g) => n + g.items.length, 0)} ENTRIES</span>
              <span style={{ ...MONO, fontSize: '9px', color: 'rgba(34,197,94,0.4)', letterSpacing: '0.1em' }}>STATUS: LOADED</span>
            </div>

            <div style={{ padding: '20px 20px 16px' }}>
              {skillGroups.map((s, i) => (
                <motion.div
                  key={s.category}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.09 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: i < skillGroups.length - 1 ? '13px' : 0 }}
                >
                  <span style={{ ...MONO, color: s.color, fontSize: '9px', minWidth: '170px', letterSpacing: '0.1em', flexShrink: 0, paddingTop: '1px' }}>
                    [{s.category}]
                  </span>
                  <span style={{ ...MONO, color: 'rgba(34,197,94,0.2)', fontSize: '9px', flexShrink: 0 }}>···</span>
                  <div style={{ display: 'flex', gap: '0', flexWrap: 'wrap' }}>
                    {s.items.map((item, j) => (
                      <span key={item} style={{ ...MONO, color: 'var(--ink)', fontSize: '11px', letterSpacing: '0.03em' }}>
                        {item}
                        {j < s.items.length - 1 && (
                          <span style={{ color: 'var(--border)', margin: '0 8px' }}>|</span>
                        )}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Bottom prompt */}
              <div style={{ marginTop: '16px', borderTop: '1px solid var(--border)', paddingTop: '12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ ...MONO, color: 'var(--accent-coral)', fontSize: '10px' }}>{'>'}</span>
                <span style={{ ...MONO, color: 'var(--muted)', fontSize: '10px', letterSpacing: '0.08em' }}>
                  env --languages
                </span>
                <span style={{ ...MONO, color: 'var(--muted)', fontSize: '10px', marginLeft: '12px' }}>
                  English_Native
                </span>
                <span style={{ ...MONO, color: 'rgba(34,197,94,0.3)', fontSize: '10px', margin: '0 4px' }}>|</span>
                <span style={{ ...MONO, color: 'var(--muted)', fontSize: '10px' }}>
                  Spanish_Fluent
                </span>
                <span className="terminal-cursor" style={{ marginLeft: '4px' }} />
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
