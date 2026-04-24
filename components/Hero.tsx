'use client'

import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import TypewriterText from './TypewriterText'

const marqueeItems = [
  'Mechatronics', '·', 'FPV Drones', '·', 'Aerospace', '·', 'Anduril Industries', '·',
  'Embedded Systems', '·', 'CAD Design', '·', '3D Printing', '·', 'Robotics', '·',
  'TSA President', '·', 'Rapid Prototyping', '·', 'Bergen County, NJ', '·',
  'Mechatronics', '·', 'FPV Drones', '·', 'Aerospace', '·', 'Anduril Industries', '·',
  'Embedded Systems', '·', 'CAD Design', '·', '3D Printing', '·', 'Robotics', '·',
]

const stats = [
  { label: 'Placement',  value: '6th National' },
  { label: 'Role',       value: 'Team Lead' },
  { label: 'Club',       value: '20+ Students' },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.85, ease: 'easeOut' as const } },
}

/* Anduril geometric mark — two nested diamonds + center dot */
function AndurilMark({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Anduril Industries"
      className="anduril-ping"
    >
      <path d="M12 1.5L22.5 12L12 22.5L1.5 12Z" stroke="#22C55E" strokeWidth="1.3" />
      <path d="M12 6L18 12L12 18L6 12Z"          stroke="#22C55E" strokeWidth="0.9" opacity="0.5" />
      <circle cx="12" cy="12" r="1.8"             fill="#22C55E" />
    </svg>
  )
}

export default function Hero() {
  return (
    <section
      style={{ minHeight: '100svh', background: 'var(--white)', position: 'relative', overflow: 'hidden' }}
      className="flex flex-col"
    >
      {/* Scan line — slow beam from top to bottom */}
      <div aria-hidden className="hero-scanline" />

      {/* Targeting reticle — top-right corner, hidden on mobile */}
      <svg
        aria-hidden
        className="hero-reticle"
        style={{
          position: 'absolute',
          top: 72,
          right: 'clamp(24px, 6vw, 96px)',
          opacity: 0.18,
          pointerEvents: 'none',
          zIndex: 1,
          overflow: 'visible',
        }}
        width="80" height="80" viewBox="0 0 80 80"
      >
        {/* Outer dashed ring — spins slowly */}
        <circle
          cx="40" cy="40" r="32"
          fill="none"
          stroke="rgba(34,197,94,1)"
          strokeWidth="0.65"
          strokeDasharray="5 12"
          className="crosshair-spin"
        />
        {/* Inner dashed ring — reverse spin */}
        <circle
          cx="40" cy="40" r="20"
          fill="none"
          stroke="rgba(34,197,94,1)"
          strokeWidth="0.5"
          strokeDasharray="3 9"
          className="crosshair-spin-reverse"
        />
        {/* Static crosshair lines */}
        <line x1="40" y1="0"  x2="40" y2="80" stroke="rgba(34,197,94,1)" strokeWidth="0.6" />
        <line x1="0"  y1="40" x2="80" y2="40" stroke="rgba(34,197,94,1)" strokeWidth="0.6" />
        {/* Corner tick marks */}
        <line x1="40" y1="0"  x2="40" y2="8"  stroke="rgba(34,197,94,1)" strokeWidth="1.2" />
        <line x1="40" y1="72" x2="40" y2="80" stroke="rgba(34,197,94,1)" strokeWidth="1.2" />
        <line x1="0"  y1="40" x2="8"  y2="40" stroke="rgba(34,197,94,1)" strokeWidth="1.2" />
        <line x1="72" y1="40" x2="80" y2="40" stroke="rgba(34,197,94,1)" strokeWidth="1.2" />
        {/* Center dot */}
        <circle cx="40" cy="40" r="2.2" fill="rgba(34,197,94,1)" />
        {/* Coordinate labels */}
        <text x="44" y="28" fontFamily="DM Mono, monospace" fontSize="5.5"
          fill="rgba(34,197,94,0.9)" letterSpacing="0.04em">40.9274°N</text>
        <text x="44" y="54" fontFamily="DM Mono, monospace" fontSize="5.5"
          fill="rgba(34,197,94,0.9)" letterSpacing="0.04em">74.0762°W</text>
      </svg>

      {/* Main content */}
      <div
        className="section-inner flex-1 flex flex-col justify-center w-full"
        style={{ paddingTop: 'clamp(96px, 18svh, 140px)', paddingBottom: '40px', position: 'relative', zIndex: 2 }}
      >
        <motion.div variants={stagger} initial="hidden" animate="show">

          {/* Eyebrow — mission target */}
          <motion.div variants={item} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '44px' }}>
            <div className="live-dot" />
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.16em', color: 'var(--accent-coral)' }}>
              TARGET
            </span>
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.08em', color: 'var(--muted)' }}>=</span>
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink)' }}>
              ANDURIL_INDUSTRIES
            </span>
          </motion.div>

          {/* Name */}
          <motion.div variants={item}>
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(68px, 12vw, 164px)',
                fontWeight: 400,
                color: 'var(--ink)',
                letterSpacing: '-0.04em',
                lineHeight: 0.9,
              }}
            >
              Ian<br />
              Andujar<span style={{ color: 'var(--accent-coral)' }}>.</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={item}
            style={{
              maxWidth: '460px',
              fontSize: 'clamp(15px, 1.5vw, 17px)',
              lineHeight: 1.9,
              color: 'var(--muted)',
              fontWeight: 300,
              marginTop: '36px',
            }}
          >
            Building drones, robotic arms, and embedded systems.
            TSA Club President. National competitor.
            Every project is a step toward{' '}
            <span style={{ color: 'var(--ink)', fontWeight: 400 }}>Anduril Industries.</span>
          </motion.p>

          {/* Terminal mission brief */}
          <motion.div
            variants={item}
            style={{
              marginTop: '36px',
              padding: '18px 22px',
              background: 'rgba(34,197,94,0.03)',
              border: '1px solid rgba(34,197,94,0.1)',
              borderLeft: '2px solid var(--accent-coral)',
              fontFamily: 'DM Mono, monospace',
              fontSize: '10px',
              letterSpacing: '0.08em',
              maxWidth: '420px',
            }}
          >
            <div style={{ color: 'var(--accent-coral)', marginBottom: '10px', letterSpacing: '0.14em' }}>
              {'>'} MISSION_BRIEF ──────────────
            </div>
            {([
              ['OPERATOR', 'IAN_ANDUJAR'],
              ['OBJECTIVE', 'ANDURIL_INTERNSHIP'],
              ['TIMELINE', '2027_TARGET'],
              ['LOCATION', '40.9274°N  74.0762°W'],
              ['STATUS', 'ACTIVE_PURSUIT'],
            ] as [string, string][]).map(([key, val], idx) => (
              <div key={key} style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                <span style={{ color: 'var(--muted)', minWidth: '80px' }}>{key}</span>
                <span style={{ color: 'rgba(34,197,94,0.3)', flex: 1 }}>{'·'.repeat(12)}</span>
                <TypewriterText
                  text={val}
                  speed={45}
                  delay={900 + idx * 380}
                  style={{ color: 'var(--ink)' }}
                  cursor={idx === 4}
                />
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px', color: 'var(--muted)' }}>
              <span style={{ color: 'var(--accent-coral)' }}>{'>'}</span>
              <span className="terminal-cursor" />
            </div>
          </motion.div>

          {/* Engineering specs strip */}
          <motion.div
            variants={item}
            className="hero-stats-strip"
            style={{
              display: 'flex',
              gap: '0',
              flexWrap: 'wrap',
              marginTop: '52px',
              paddingTop: '24px',
              borderTop: '1px solid var(--border)',
              alignItems: 'flex-end',
            }}
          >
            {/* Regular stats */}
            {stats.map((s) => (
              <div
                key={s.label}
                className="hero-stat-item"
                style={{
                  paddingRight: '28px',
                  marginRight: '28px',
                  borderRight: '1px solid var(--border)',
                }}
              >
                <span style={{
                  display: 'block',
                  fontFamily: 'DM Mono, monospace', fontSize: '9px',
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'var(--muted)', marginBottom: '5px',
                }}>
                  {s.label}
                </span>
                <span style={{
                  display: 'block',
                  fontFamily: 'DM Mono, monospace', fontSize: '13px',
                  color: 'var(--ink)', letterSpacing: '0.02em',
                }}>
                  {s.value}
                </span>
              </div>
            ))}

            {/* Anduril entry — special treatment */}
            <div style={{ paddingRight: '32px' }}>
              <span style={{
                display: 'block',
                fontFamily: 'DM Mono, monospace', fontSize: '9px',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'var(--muted)', marginBottom: '6px',
              }}>
                Dream Company
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AndurilMark size={20} />
                <span style={{
                  fontFamily: 'DM Mono, monospace', fontSize: '13px',
                  color: 'var(--accent-coral)', letterSpacing: '0.08em', fontWeight: 500,
                }}>
                  ANDURIL
                </span>
              </div>
            </div>

            {/* CTA */}
            <a
              href="#work"
              className="hero-cta-btn"
              style={{
                marginLeft: 'auto',
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                border: '1px solid rgba(255,248,240,0.14)',
                color: 'var(--ink)',
                padding: '10px 22px', borderRadius: '2px',
                fontFamily: 'DM Mono, monospace', fontSize: '11px',
                letterSpacing: '0.1em', textDecoration: 'none', textTransform: 'uppercase',
                transition: 'border-color 0.2s ease, color 0.2s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.borderColor = 'var(--accent-coral)'
                el.style.color = 'var(--accent-coral)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.borderColor = 'rgba(255,248,240,0.14)'
                el.style.color = 'var(--ink)'
              }}
            >
              View Work <ArrowDown size={12} />
            </a>
          </motion.div>

        </motion.div>
      </div>

      {/* Contact card — top-right, hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.7, ease: 'easeOut' }}
        className="hero-contact-card"
        style={{
          position: 'absolute',
          top: 'clamp(180px, 22vw, 220px)',
          right: 'clamp(24px, 6vw, 96px)',
          zIndex: 2,
          fontFamily: 'DM Mono, monospace',
          fontSize: '10px',
          letterSpacing: '0.1em',
          border: '1px solid rgba(34,197,94,0.15)',
          background: 'rgba(34,197,94,0.03)',
          padding: '14px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '7px',
        }}
      >
        <div style={{ color: 'var(--accent-coral)', letterSpacing: '0.16em', marginBottom: '4px', fontSize: '9px' }}>
          {'>'} CONTACT
        </div>
        {([
          ['EMAIL', 'ianmarcoandujar9@gmail.com'],
          ['LOC',   'Paramus, NJ'],
          ['LINK',  'linkedin.com/in/ian-andujar'],
        ] as [string, string][]).map(([label, value]) => (
          <div key={label} style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
            <span style={{ color: 'var(--muted)', minWidth: '44px' }}>{label}</span>
            <span style={{ color: 'rgba(34,197,94,0.55)' }}>·</span>
            {label === 'LINK' ? (
              <a href="https://linkedin.com/in/ian-andujar" target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--ink)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-coral)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink)')}
              >{value}</a>
            ) : label === 'EMAIL' ? (
              <a href="mailto:ianmarcoandujar9@gmail.com"
                style={{ color: 'var(--ink)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-coral)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink)')}
              >{value}</a>
            ) : (
              <span style={{ color: 'var(--ink)' }}>{value}</span>
            )}
          </div>
        ))}
      </motion.div>

      {/* Marquee strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        style={{
          borderTop: '1px solid var(--border)',
          overflow: 'hidden', whiteSpace: 'nowrap',
          padding: '13px 0', position: 'relative', zIndex: 2,
        }}
      >
        <div className="animate-marquee inline-block">
          {marqueeItems.map((text, i) => (
            <span key={i} style={{
              fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.13em',
              color: text === '·' ? 'var(--accent-coral)' : 'var(--muted)',
              marginRight: '20px', textTransform: 'uppercase',
            }}>{text}</span>
          ))}
        </div>
        <div className="animate-marquee inline-block" aria-hidden>
          {marqueeItems.map((text, i) => (
            <span key={i} style={{
              fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.13em',
              color: text === '·' ? 'var(--accent-coral)' : 'var(--muted)',
              marginRight: '20px', textTransform: 'uppercase',
            }}>{text}</span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
