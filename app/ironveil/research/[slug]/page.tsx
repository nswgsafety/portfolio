'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// ── Palette (same as main IronVeil) ────────────────────────────────────────
const C = {
  bg:       '#07090C',
  bgCard:   '#0D1017',
  bgDeep:   '#050709',
  border:   '#1C2433',
  borderLt: '#2A3548',
  text:     '#C8D4E0',
  muted:    '#5A6A7E',
  dim:      '#3A4A5C',
  steel:    '#4A7FA5',
  steelLt:  '#6BA0C8',
  forge:    '#B8741A',
  forgeLt:  '#D4921E',
  bright:   '#E8EEF4',
}

const MONO: React.CSSProperties = { fontFamily: '"DM Mono", monospace' }

// ── Paper registry ─────────────────────────────────────────────────────────
// Add new papers here as IronVeil publishes them.
const PAPERS: Record<string, Paper> = {
  // Example — replace with real content:
  // 'swarm-coordination': {
  //   id: 'IV-001',
  //   title: 'Autonomous Swarm Coordination in Contested Environments',
  //   area: 'DEFENSE',
  //   classification: 'RESTRICTED',
  //   authors: ['Ian Andujar', 'Marcus Vance'],
  //   date: 'Q2 2025',
  //   abstract: '...',
  //   sections: [{ heading: 'Introduction', body: '...' }],
  //   images: [{ src: '/ironveil/papers/swarm-fig1.png', caption: 'Figure 1: Swarm topology' }],
  // },
}

interface Section {
  heading: string
  body:    string
}
interface PaperImage {
  src:     string
  caption: string
}
interface Paper {
  id:             string
  title:          string
  area:           string
  classification: string
  authors:        string[]
  date:           string
  abstract:       string
  sections:       Section[]
  images?:        PaperImage[]
  pdfUrl?:        string
}

function CornerMarks({ color = C.border }: { color?: string }) {
  const s: React.CSSProperties = { position: 'absolute', width: 10, height: 10, pointerEvents: 'none' }
  const b = `1px solid ${color}`
  return (
    <>
      <div style={{ ...s, top: 0, left: 0,    borderTop: b,    borderLeft: b  }} />
      <div style={{ ...s, top: 0, right: 0,   borderTop: b,    borderRight: b }} />
      <div style={{ ...s, bottom: 0, left: 0, borderBottom: b, borderLeft: b  }} />
      <div style={{ ...s, bottom: 0, right: 0,borderBottom: b, borderRight: b }} />
    </>
  )
}

const CLASS_COLOR: Record<string, string> = {
  'RESTRICTED': '#8B2020',
  'INTERNAL':   C.forge,
  'OPEN':       '#2D6A3F',
}

export default function PaperPage() {
  const params = useParams()
  const slug   = typeof params.slug === 'string' ? params.slug : ''
  const paper  = PAPERS[slug]

  // If paper not found in registry, show 404
  if (!paper) notFound()

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: '100vh', overflowX: 'hidden', ...MONO }}>

      {/* ── Top bar ── */}
      <div style={{
        background: 'rgba(7,9,12,0.96)', borderBottom: `1px solid ${C.border}`,
        padding: '7px 0', display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(12px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, fontSize: '8px', letterSpacing: '0.22em', color: C.dim, padding: '0 24px' }}>
          <Link href="/ironveil" style={{ color: C.steel, textDecoration: 'none' }}>⬡ IRONVEIL</Link>
          <span style={{ color: C.border }}>◈</span>
          <span>RESEARCH BRIEFING</span>
          <span style={{ color: C.border }}>◈</span>
          <span
            style={{
              color: CLASS_COLOR[paper.classification] ?? C.muted,
              border: `1px solid ${CLASS_COLOR[paper.classification] ?? C.muted}44`,
              padding: '2px 8px',
              background: `${CLASS_COLOR[paper.classification] ?? C.muted}11`,
            }}
          >
            {paper.classification}
          </span>
          <span style={{ color: C.border }}>◈</span>
          <Link href="/" style={{ color: C.muted, textDecoration: 'none' }}>← PORTFOLIO</Link>
        </div>
      </div>

      {/* ── Paper header ── */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: 'clamp(60px,8vw,100px) clamp(24px,6vw,80px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>

          {/* ID + area */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}
          >
            <span style={{ fontSize: '8px', letterSpacing: '0.22em', color: C.muted }}>{paper.id}</span>
            <span style={{ color: C.border }}>|</span>
            <span style={{ fontSize: '8px', letterSpacing: '0.22em', color: C.steel }}>{paper.area}</span>
            <span style={{ color: C.border }}>|</span>
            <span style={{ fontSize: '8px', letterSpacing: '0.16em', color: C.muted }}>{paper.date}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display"
            style={{
              fontSize: 'clamp(28px, 4.5vw, 60px)', fontWeight: 900, fontStyle: 'italic',
              color: C.bright, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 32,
            }}
          >
            {paper.title}
          </motion.h1>

          {/* Authors */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}
          >
            <span style={{ fontSize: '8px', letterSpacing: '0.18em', color: C.dim }}>AUTHORS</span>
            <span style={{ color: C.border }}>—</span>
            {paper.authors.map((a, i) => (
              <span key={a} style={{ fontSize: '10px', letterSpacing: '0.1em', color: C.muted }}>
                {a}{i < paper.authors.length - 1 ? ' ·' : ''}
              </span>
            ))}
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
          >
            {paper.pdfUrl && (
              <a
                href={paper.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'rgba(74,127,165,0.1)', border: `1px solid ${C.steel}`,
                  color: C.steelLt, ...MONO, fontSize: '9px', letterSpacing: '0.2em',
                  padding: '10px 28px', textDecoration: 'none', transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(74,127,165,0.22)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(74,127,165,0.1)')}
              >
                DOWNLOAD PDF ↓
              </a>
            )}
            <Link
              href="/ironveil"
              style={{
                background: 'transparent', border: `1px solid ${C.border}`,
                color: C.muted, ...MONO, fontSize: '9px', letterSpacing: '0.2em',
                padding: '10px 28px', textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderLt; e.currentTarget.style.color = C.text }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted }}
            >
              ← ALL BRIEFINGS
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Abstract ── */}
      <div style={{ padding: 'clamp(48px,6vw,72px) clamp(24px,6vw,80px)', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: '28px 32px', position: 'relative' }}
          >
            <CornerMarks color={C.steel} />
            <div style={{ fontSize: '7px', letterSpacing: '0.28em', color: C.steel, marginBottom: 16 }}>ABSTRACT</div>
            <p style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: C.text,
              lineHeight: 1.9, fontWeight: 300,
            }}>
              {paper.abstract}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Images ── */}
      {paper.images && paper.images.length > 0 && (
        <div style={{ padding: 'clamp(48px,6vw,72px) clamp(24px,6vw,80px)', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
              <div style={{ width: 24, height: 1, background: C.forge }} />
              <span style={{ fontSize: '8px', letterSpacing: '0.28em', color: C.forge }}>FIGURES</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 1, background: C.border }}>
              {paper.images.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  style={{ background: C.bgCard, padding: 0, position: 'relative' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.caption}
                    style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '12px 16px', borderTop: `1px solid ${C.border}` }}>
                    <span style={{ fontSize: '8px', letterSpacing: '0.14em', color: C.muted }}>
                      FIG. {String(i + 1).padStart(2, '0')} — {img.caption}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Body sections ── */}
      {paper.sections.map((section, i) => (
        <div
          key={i}
          style={{
            padding: 'clamp(48px,6vw,64px) clamp(24px,6vw,80px)',
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <span style={{ fontSize: '8px', letterSpacing: '0.22em', color: C.dim }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div style={{ width: 24, height: 1, background: C.border }} />
                <h2 style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(16px, 2vw, 22px)',
                  fontWeight: 600, color: C.bright, letterSpacing: '0.01em',
                }}>
                  {section.heading}
                </h2>
              </div>
              <p style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: C.text,
                lineHeight: 1.95, fontWeight: 300, maxWidth: 720,
              }}>
                {section.body}
              </p>
            </motion.div>
          </div>
        </div>
      ))}

      {/* ── Footer ── */}
      <footer style={{ borderTop: `1px solid ${C.border}`, background: C.bgDeep, padding: '24px clamp(24px,6vw,80px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ fontSize: '8px', letterSpacing: '0.14em', color: C.dim }}>
            {paper.id} // {paper.title.slice(0, 50)}{paper.title.length > 50 ? '...' : ''} // {paper.date}
          </div>
          <Link href="/ironveil" style={{ fontSize: '8px', letterSpacing: '0.18em', color: C.muted, textDecoration: 'none' }}>
            ← IRONVEIL RESEARCH
          </Link>
        </div>
      </footer>

    </div>
  )
}
