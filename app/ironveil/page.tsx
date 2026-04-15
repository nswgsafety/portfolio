'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

// ── Palette ────────────────────────────────────────────────────────────────
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

// ── Data ───────────────────────────────────────────────────────────────────
const FOUNDERS = [
  {
    name: 'Ian Andujar',
    role: 'Founder & Director',
    area: 'Engineering Systems · Defense Technology',
    bio: 'Engineering student targeting Anduril Industries. Building IronVeil as a body of serious technical work at the intersection of autonomous systems and national defense.',
    tag: 'FOUNDER',
    accent: C.steel,
  },
  {
    name: 'Avidan Sabnani',
    role: 'Co-Founder, Quantitative & Financial Research',
    area: 'Quantitative Analysis · Financial Research',
    bio: 'High school researcher focused on quantitative modeling and financial intelligence. Leads IronVeil\'s coverage of defense sector capital markets, equity analysis, and macroeconomic research.',
    tag: 'CO-FOUNDER',
    accent: '#8B6FC8',
  },
  {
    name: 'John Gawel',
    role: 'Co-Founder, Engineering Research',
    area: 'Engineering Analysis · Systems Research',
    bio: 'High school engineer focused on technical systems analysis and engineering research. Contributes to IronVeil\'s structural, mechanical, and aerospace engineering publications.',
    tag: 'CO-FOUNDER',
    accent: C.steelLt,
  },
  {
    name: 'Jack Nole',
    role: 'Co-Founder, Engineering Research',
    area: 'Engineering Analysis · Systems Research',
    bio: 'High school engineer contributing to IronVeil\'s engineering research division. Focuses on applied systems analysis and technical writing across aerospace and mechanical domains.',
    tag: 'CO-FOUNDER',
    accent: C.forge,
  },
]

const PILLARS = [
  {
    id: 'ENG', icon: '⬡', short: 'ENGINEERING',
    label: 'Engineering Systems',
    desc: 'Structural analysis, materials science, mechanical systems, autonomous platforms, and aerospace engineering research.',
    tags: ['Structures', 'Autonomy', 'Aerospace', 'Materials'],
  },
  {
    id: 'DEF', icon: '◈', short: 'DEFENSE',
    label: 'Defense & Autonomy',
    desc: 'Unmanned systems architecture, threat modeling, defense technology assessment, and national security research.',
    tags: ['UAS/UAV', 'Threat Intel', 'Defense Tech', 'Security'],
  },
  {
    id: 'FIN', icon: '▣', short: 'INTELLIGENCE',
    label: 'Financial Intelligence',
    desc: 'Capital markets analysis, defense sector financials, investment research, and macroeconomic intelligence.',
    tags: ['Markets', 'Defense Finance', 'Macro', 'Equity'],
  },
]

const STATS = [
  { label: 'FOUNDED',        value: '2026'        },
  { label: 'RESEARCH AREAS', value: '03'          },
  { label: 'RESEARCHERS',    value: '04'          },
  { label: 'STATUS',         value: 'OPERATIONAL' },
]

// ── Helpers ────────────────────────────────────────────────────────────────
function CornerMarks({ color = C.border }: { color?: string }) {
  const s: React.CSSProperties = { position: 'absolute', width: 10, height: 10, pointerEvents: 'none' }
  const b = `1px solid ${color}`
  return (
    <>
      <div style={{ ...s, top: 0,    left: 0,  borderTop: b,    borderLeft: b  }} />
      <div style={{ ...s, top: 0,    right: 0, borderTop: b,    borderRight: b }} />
      <div style={{ ...s, bottom: 0, left: 0,  borderBottom: b, borderLeft: b  }} />
      <div style={{ ...s, bottom: 0, right: 0, borderBottom: b, borderRight: b }} />
    </>
  )
}

function SteelGrid() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(74,127,165,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(74,127,165,0.03) 1px, transparent 1px),
          linear-gradient(rgba(74,127,165,0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(74,127,165,0.07) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px, 40px 40px, 160px 160px, 160px 160px',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 30%, transparent 20%, rgba(5,7,9,0.92) 100%)',
      }} />
    </div>
  )
}

function ScanLine() {
  return (
    <motion.div
      animate={{ top: ['-2%', '102%'] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'linear', repeatDelay: 7 }}
      style={{
        position: 'absolute', left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(74,127,165,0.18) 30%, rgba(74,127,165,0.4) 50%, rgba(74,127,165,0.18) 70%, transparent 100%)',
        pointerEvents: 'none', zIndex: 1,
      }}
    />
  )
}


// ── Boot Screen ────────────────────────────────────────────────────────────
const BOOT_LINES = [
  { text: 'IRONVEIL SECURE TERMINAL v2.4.1',          delay: 0,    color: '#4A7FA5' },
  { text: '─────────────────────────────────────────', delay: 120,  color: '#1C2433' },
  { text: 'INITIALIZING CORE SYSTEMS...',              delay: 340,  color: '#5A6A7E' },
  { text: '  [OK] CRYPTOGRAPHIC MODULE LOADED',        delay: 640,  color: '#2D6A3F' },
  { text: '  [OK] NETWORK INTERFACE ESTABLISHED',      delay: 880,  color: '#2D6A3F' },
  { text: '  [OK] RESEARCH DATABASE MOUNTED',          delay: 1100, color: '#2D6A3F' },
  { text: 'VERIFYING SYSTEM INTEGRITY...',             delay: 1360, color: '#5A6A7E' },
  { text: '  [OK] CHECKSUM VERIFIED — CLEAN',          delay: 1600, color: '#2D6A3F' },
  { text: '  [OK] ACCESS CLEARANCE GRANTED',           delay: 1820, color: '#2D6A3F' },
  { text: 'ESTABLISHING SECURE CHANNEL...',            delay: 2060, color: '#5A6A7E' },
  { text: '  [OK] TLS 1.3 HANDSHAKE COMPLETE',         delay: 2280, color: '#2D6A3F' },
  { text: '─────────────────────────────────────────', delay: 2440, color: '#1C2433' },
  { text: 'IRONVEIL RESEARCH — SYSTEMS OPERATIONAL',   delay: 2600, color: '#4A7FA5' },
]
const BOOT_TOTAL = 3200

function BootScreen({ onDone }: { onDone: () => void }) {
  const [lines, setLines]       = useState<number[]>([])
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting]   = useState(false)

  useEffect(() => {
    BOOT_LINES.forEach((l, i) => {
      setTimeout(() => setLines(v => [...v, i]), l.delay)
    })
    const start = Date.now()
    const tick = setInterval(() => {
      const p = Math.min((Date.now() - start) / BOOT_TOTAL, 1)
      setProgress(p)
      if (p >= 1) clearInterval(tick)
    }, 16)
    setTimeout(() => {
      setExiting(true)
      setTimeout(onDone, 600)
    }, BOOT_TOTAL)
    return () => clearInterval(tick)
  }, [onDone])

  return (
    <motion.div
      animate={exiting ? { opacity: 0, scale: 1.015 } : { opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.4, 0, 1, 1] }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#020406', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: '"DM Mono", monospace',
      }}
    >
      {/* scanline overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
      }} />

      <div style={{ width: '100%', maxWidth: 640, padding: '0 32px' }}>
        {/* header logo */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 64, height: 64, border: '1px solid #1C2433', marginBottom: 20,
            position: 'relative',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: 8, height: 8, borderTop: '1px solid #4A7FA5', borderLeft: '1px solid #4A7FA5' }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: 8, height: 8, borderTop: '1px solid #4A7FA5', borderRight: '1px solid #4A7FA5' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: 8, height: 8, borderBottom: '1px solid #4A7FA5', borderLeft: '1px solid #4A7FA5' }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 8, height: 8, borderBottom: '1px solid #4A7FA5', borderRight: '1px solid #4A7FA5' }} />
            <motion.span
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ fontSize: 26, color: '#4A7FA5' }}
            >⬡</motion.span>
          </div>
        </div>

        {/* terminal window */}
        <div style={{
          border: '1px solid #1C2433', background: 'rgba(13,16,23,0.9)',
          minHeight: 320, padding: '20px 24px', position: 'relative',
        }}>
          {/* title bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            borderBottom: '1px solid #1C2433', padding: '6px 16px',
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(7,9,12,0.8)',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#8B2020', opacity: 0.8 }} />
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#B8741A', opacity: 0.8 }} />
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2D6A3F', opacity: 0.8 }} />
            <span style={{ marginLeft: 8, fontSize: '8px', letterSpacing: '0.2em', color: '#3A4A5C' }}>
              IRONVEIL-TERMINAL — SECURE SESSION
            </span>
          </div>

          <div style={{ marginTop: 28, fontSize: '11px', letterSpacing: '0.06em', lineHeight: 1.9 }}>
            {BOOT_LINES.map((l, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={lines.includes(i) ? { opacity: 1 } : {}}
                transition={{ duration: 0.15 }}
                style={{ color: l.color }}
              >
                {l.text}
              </motion.div>
            ))}
            {/* blinking cursor */}
            {lines.length > 0 && !exiting && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                style={{ color: '#4A7FA5' }}
              >▌</motion.span>
            )}
          </div>
        </div>

        {/* progress bar */}
        <div style={{ marginTop: 16, height: 2, background: '#0D1017', position: 'relative', overflow: 'hidden' }}>
          <motion.div
            style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              background: 'linear-gradient(90deg, #1C3A52, #4A7FA5, #6BA0C8)',
              width: `${progress * 100}%`,
              boxShadow: '0 0 12px rgba(74,127,165,0.6)',
            }}
          />
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          marginTop: 8, fontSize: '8px', letterSpacing: '0.16em', color: '#3A4A5C',
        }}>
          <span>LOADING SYSTEMS</span>
          <span>{Math.round(progress * 100)}%</span>
        </div>
      </div>
    </motion.div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function IronVeilPage() {
  const [booted, setBooted]           = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [form, setForm]               = useState({ name: '', email: '', org: '', msg: '' })
  const [emailTouched, setEmailTouched] = useState(false)
  const [sending, setSending]         = useState(false)
  const [sent, setSent]               = useState(false)

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  const formReady  = !!(form.name && emailValid && form.msg)
  const [glitch, setGlitch]           = useState(false)

  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY       = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  useEffect(() => {
    const t = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 100)
    }, 4800 + Math.random() * 3000)
    return () => clearInterval(t)
  }, [])

  async function sendContact() {
    if (!formReady) return
    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, org: form.org, msg: form.msg, timestamp: new Date().toISOString() }),
      })
      const data = await res.json()

      if (data.ok) {
        setSent(true)
      } else {
        // Fallback: open mailto with everything pre-filled
        const subject = encodeURIComponent(`IronVeil Research — Inquiry from ${form.name}${form.org ? ` (${form.org})` : ''}`)
        const body    = encodeURIComponent(
          `Name: ${form.name}\nEmail: ${form.email}\nOrganization: ${form.org || 'N/A'}\nTimestamp: ${new Date().toLocaleString()}\n\n─────────────────\n\n${form.msg}`
        )
        window.open(`mailto:ianmarcoandujar9@gmail.com?subject=${subject}&body=${body}`)
        setSent(true)
      }
    } catch {
      const subject = encodeURIComponent(`IronVeil Research — Inquiry from ${form.name}`)
      const body    = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nOrg: ${form.org || 'N/A'}\n\n${form.msg}`)
      window.open(`mailto:ianmarcoandujar9@gmail.com?subject=${subject}&body=${body}`)
      setSent(true)
    } finally {
      setSending(false)
    }
  }

  function resetContact() {
    setContactOpen(false)
    setForm({ name: '', email: '', org: '', msg: '' })
    setEmailTouched(false)
    setSent(false)
  }

  return (
    <>
    {!booted && <BootScreen onDone={() => setBooted(true)} />}
    <motion.div
      initial={{ opacity: 0 }}
      animate={booted ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ background: C.bg, color: C.text, minHeight: '100vh', overflowX: 'hidden', ...MONO }}
    >

      {/* ── Classification bar ── */}
      <div style={{
        background: 'rgba(7,9,12,0.97)', borderBottom: `1px solid ${C.border}`,
        padding: '7px 0', position: 'sticky', top: 0, zIndex: 100,
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, fontSize: '8px', letterSpacing: '0.22em', color: C.dim, flexWrap: 'wrap', padding: '0 24px' }}>
          <span style={{ color: C.steel }}>⬡</span>
          <span>IRONVEIL RESEARCH</span>
          <span style={{ color: C.border }}>◈</span>
          <span>INDEPENDENT RESEARCH DIVISION</span>
          <span style={{ color: C.border }}>◈</span>
          <span>EST. 2026</span>
          <span style={{ color: C.border }}>◈</span>
          <Link href="/" style={{ color: C.steel, textDecoration: 'none' }}>← PORTFOLIO</Link>
        </div>
      </div>

      {/* ── Hero ── */}
      <div ref={heroRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <SteelGrid />
        <ScanLine />
        <div style={{
          position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 1000, height: 700, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(74,127,165,0.04) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity, position: 'relative', zIndex: 2, width: '100%' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(80px,12vw,140px) clamp(24px,6vw,80px)' }}>

            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 44 }}
            >
              <div style={{ width: 32, height: 1, background: C.steel }} />
              <span style={{ fontSize: '8px', letterSpacing: '0.3em', color: C.steel }}>
                IRONVEIL RESEARCH — INDEPENDENT DIVISION — EST. 2026
              </span>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }} style={{ marginBottom: 24 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 56, height: 56, border: `1px solid ${C.borderLt}`,
                background: 'rgba(74,127,165,0.05)', position: 'relative', marginBottom: 28,
              }}>
                <CornerMarks color={C.steel} />
                <span style={{ fontSize: 22, color: C.steel }}>⬡</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-display"
              style={{
                fontSize: 'clamp(56px, 9vw, 120px)', fontWeight: 900, lineHeight: 0.9,
                letterSpacing: '-0.03em', fontStyle: 'italic', color: C.bright, marginBottom: 12,
                filter: glitch ? 'blur(0.4px)' : 'none',
                transform: glitch ? 'skewX(-0.4deg)' : 'none',
                transition: 'filter 0.04s, transform 0.04s',
              }}
            >
              IRON<span style={{ color: C.steel }}>VEIL</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
              style={{ fontSize: 'clamp(11px,1.4vw,14px)', letterSpacing: '0.24em', color: C.muted, marginBottom: 52 }}
            >
              RESEARCH &nbsp;·&nbsp; ENGINEERING &nbsp;·&nbsp; DEFENSE &nbsp;·&nbsp; INTELLIGENCE
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                fontFamily: 'DM Sans, sans-serif', fontWeight: 300,
                fontSize: 'clamp(15px,1.6vw,18px)', color: C.text,
                maxWidth: 580, lineHeight: 1.85, marginBottom: 64, letterSpacing: '0.01em',
              }}
            >
              A private research organization producing independent analysis on advanced engineering,
              defense technology, and financial intelligence. We study the systems that others overlook.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}
            >
              <button
                onClick={() => document.getElementById('pillars')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  background: 'rgba(74,127,165,0.1)', border: `1px solid ${C.steel}`,
                  color: C.steelLt, ...MONO, fontSize: '10px', letterSpacing: '0.2em',
                  padding: '14px 40px', cursor: 'pointer', transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(74,127,165,0.2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(74,127,165,0.1)')}
              >
                EXPLORE RESEARCH
              </button>
              <button
                onClick={() => setContactOpen(true)}
                style={{
                  background: 'transparent', border: `1px solid ${C.border}`,
                  color: C.muted, ...MONO, fontSize: '10px', letterSpacing: '0.2em',
                  padding: '14px 40px', cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderLt; e.currentTarget.style.color = C.text }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted }}
              >
                GET IN TOUCH
              </button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 7, 0] }} transition={{ duration: 2.2, repeat: Infinity }}
          style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', fontSize: '8px', color: C.dim, letterSpacing: '0.22em' }}
        >
          ↓
        </motion.div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: C.border }} />
      </div>

      {/* ── Video section ── */}
      <section style={{ position: 'relative', background: C.bgDeep, borderBottom: `1px solid ${C.border}` }}>
        {/* Label bar */}
        <div style={{ padding: '18px clamp(24px,6vw,80px)', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 20, height: 1, background: C.steel }} />
            <span style={{ fontSize: '8px', letterSpacing: '0.28em', color: C.steel }}>DEFENSE INDUSTRY OVERVIEW</span>
          </div>
          <span style={{ fontSize: '7px', letterSpacing: '0.2em', color: C.dim }}>LOCKHEED MARTIN CORPORATION</span>
        </div>

        {/* Video frame */}
        <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto', padding: 'clamp(32px,4vw,56px) clamp(24px,6vw,80px)' }}>
          <div style={{
            position: 'relative',
            border: `1px solid ${C.border}`,
            background: '#000',
            overflow: 'hidden',
          }}>
            <CornerMarks color={C.borderLt} />

            {/* Aspect ratio container — 16:9 */}
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <video
                src="/defense-reel.mp4"
                autoPlay
                muted
                loop
                playsInline
                controls
                style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '100%', height: '100%',
                  display: 'block', objectFit: 'cover',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <div style={{ background: C.bgCard, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(24px,6vw,80px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                style={{
                  padding: '26px 0',
                  borderRight: i < STATS.length - 1 ? `1px solid ${C.border}` : 'none',
                  paddingLeft: i > 0 ? 28 : 0, paddingRight: 28,
                }}
              >
                <div style={{ fontSize: '7px', letterSpacing: '0.24em', color: C.muted, marginBottom: 8 }}>{s.label}</div>
                <div style={{ fontSize: s.value.length > 5 ? 13 : 26, color: C.bright, fontWeight: 700, letterSpacing: s.value.length > 5 ? '0.16em' : '0.04em', lineHeight: 1 }}>
                  {s.value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── About / Mission ── */}
      <section style={{ padding: 'clamp(80px,10vw,120px) clamp(24px,6vw,80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                <div style={{ width: 24, height: 1, background: C.forge }} />
                <span style={{ fontSize: '8px', letterSpacing: '0.28em', color: C.forge }}>MISSION BRIEF</span>
              </div>
              <h2 className="font-display" style={{
                fontSize: 'clamp(28px,4vw,52px)', fontWeight: 700, fontStyle: 'italic',
                color: C.bright, marginBottom: 28, lineHeight: 1.1, letterSpacing: '-0.02em',
              }}>
                Clarity in Complex Systems
              </h2>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: C.text, lineHeight: 1.9, fontWeight: 300, marginBottom: 20 }}>
                IronVeil Research exists to produce rigorous, independent analysis on the systems
                that shape modern defense and engineering landscapes. We write papers, build models,
                and conduct private research at the boundary of what&apos;s publicly understood.
              </p>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: C.muted, lineHeight: 1.9, fontWeight: 300 }}>
                We don&apos;t publish for speed. Every briefing we release is built from first principles —
                engineered, not assembled. When IronVeil puts its name on analysis, it means something.
              </p>
            </div>

            <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, padding: '28px 32px', position: 'relative' }}>
              <CornerMarks color={C.borderLt} />
              <div style={{ fontSize: '7px', letterSpacing: '0.24em', color: C.muted, marginBottom: 24 }}>ORG_PROFILE // IRONVEIL_RESEARCH</div>
              {[
                ['DIRECTOR',       'Ian Andujar'],
                ['FOUNDED',        '2026'],
                ['FOCUS',          'Engineering · Defense · Finance'],
                ['METHODOLOGY',    'Independent Research'],
                ['OUTPUT',         'White Papers · Analysis · Reports'],
                ['COLLABORATE',    'Open to Partners'],
              ].map(([k, v]) => (
                <div key={k} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  borderBottom: `1px solid ${C.border}`, padding: '10px 0', gap: 16,
                }}>
                  <span style={{ fontSize: '8px', letterSpacing: '0.16em', color: C.muted, flexShrink: 0 }}>{k}</span>
                  <span style={{ fontSize: '11px', color: C.text, textAlign: 'right', letterSpacing: '0.04em', fontFamily: 'DM Sans, sans-serif' }}>{v}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Research pillars ── */}
      <section id="pillars" style={{
        borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`,
        background: C.bgDeep, padding: 'clamp(80px,10vw,120px) clamp(24px,6vw,80px)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
              <div style={{ width: 24, height: 1, background: C.steel }} />
              <span style={{ fontSize: '8px', letterSpacing: '0.28em', color: C.steel }}>RESEARCH DOMAINS</span>
            </div>
            <h2 className="font-display" style={{
              fontSize: 'clamp(24px,3vw,40px)', fontWeight: 700, fontStyle: 'italic',
              color: C.bright, marginBottom: 56, letterSpacing: '-0.02em',
            }}>
              Three Domains. One Mission.
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: C.border }}>
              {PILLARS.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
                  style={{ background: C.bgCard, padding: '40px 36px', position: 'relative' }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${C.steel}77, transparent)` }} />
                  <div style={{ fontSize: 26, marginBottom: 18, color: C.steel }}>{p.icon}</div>
                  <div style={{ fontSize: '7px', letterSpacing: '0.28em', color: C.muted, marginBottom: 10 }}>
                    {String(i + 1).padStart(2, '0')} / {p.short}
                  </div>
                  <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 17, fontWeight: 600, color: C.bright, marginBottom: 14, lineHeight: 1.3 }}>
                    {p.label}
                  </h3>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: C.muted, lineHeight: 1.75, marginBottom: 22, fontWeight: 300 }}>
                    {p.desc}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {p.tags.map(t => (
                      <span key={t} style={{ fontSize: '7px', letterSpacing: '0.14em', border: `1px solid ${C.border}`, color: C.dim, padding: '3px 8px' }}>{t}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Briefings coming soon ── */}
      <section style={{ padding: 'clamp(80px,10vw,120px) clamp(24px,6vw,80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
              <div style={{ width: 24, height: 1, background: C.forge }} />
              <span style={{ fontSize: '8px', letterSpacing: '0.28em', color: C.forge }}>BRIEFINGS</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
              <div>
                <h2 className="font-display" style={{
                  fontSize: 'clamp(24px,3vw,44px)', fontWeight: 700, fontStyle: 'italic',
                  color: C.bright, marginBottom: 20, letterSpacing: '-0.02em', lineHeight: 1.1,
                }}>
                  First Briefings<br />
                  <span style={{ color: C.muted }}>Coming Soon</span>
                </h2>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: C.muted, lineHeight: 1.85, fontWeight: 300, marginBottom: 32 }}>
                  IronVeil is in its founding stage. Our first research briefings across engineering,
                  defense, and financial intelligence are in active development. We publish when the
                  work is ready — not before.
                </p>
                <button
                  onClick={() => setContactOpen(true)}
                  style={{
                    background: 'rgba(184,116,26,0.08)', border: `1px solid ${C.forge}`,
                    color: C.forgeLt, ...MONO, fontSize: '9px', letterSpacing: '0.2em',
                    padding: '11px 28px', cursor: 'pointer', transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(184,116,26,0.18)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(184,116,26,0.08)')}
                >
                  GET NOTIFIED ↗
                </button>
              </div>

              {/* Pipeline — no pulsing dots */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: C.border }}>
                {[
                  { id: 'IV-001', area: 'DEFENSE',      title: 'Autonomous Swarm Coordination'        },
                  { id: 'IV-002', area: 'INTELLIGENCE',  title: 'Defense Sector Capital: 2026–2031'   },
                  { id: 'IV-003', area: 'ENGINEERING',   title: 'Carbon Fiber Composite Failure Modes' },
                ].map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    style={{
                      background: C.bgCard, padding: '18px 24px',
                      display: 'grid', gridTemplateColumns: '60px 1fr 90px',
                      alignItems: 'center', gap: 16,
                    }}
                  >
                    <span style={{ fontSize: '8px', letterSpacing: '0.14em', color: C.dim }}>{item.id}</span>
                    <div>
                      <div style={{ fontSize: '7px', letterSpacing: '0.2em', color: C.dim, marginBottom: 4 }}>{item.area}</div>
                      <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: C.muted }}>{item.title}</div>
                    </div>
                    <div style={{
                      fontSize: '7px', letterSpacing: '0.14em', color: C.forge,
                      border: `1px solid ${C.forge}33`, padding: '3px 8px',
                      textAlign: 'center', background: `${C.forge}08`,
                    }}>
                      IN DEV
                    </div>
                  </motion.div>
                ))}
                <div style={{ background: C.bgDeep, padding: '11px 24px', textAlign: 'center' }}>
                  <span style={{ fontSize: '7px', letterSpacing: '0.18em', color: C.dim }}>MORE IN PIPELINE</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Founders ── */}
      <section id="founders" style={{
        borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`,
        background: C.bgDeep, padding: 'clamp(80px,10vw,120px) clamp(24px,6vw,80px)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
              <div style={{ width: 24, height: 1, background: C.steel }} />
              <span style={{ fontSize: '8px', letterSpacing: '0.28em', color: C.steel }}>FOUNDING TEAM</span>
            </div>
            <h2 className="font-display" style={{
              fontSize: 'clamp(24px,3vw,42px)', fontWeight: 700, fontStyle: 'italic',
              color: C.bright, marginBottom: 56, letterSpacing: '-0.02em',
            }}>
              The People Behind the Research
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: C.border }}>
              {FOUNDERS.map((f, i) => (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }}
                  style={{
                    background: C.bgCard, padding: '36px 36px',
                    display: 'flex', gap: 24, alignItems: 'flex-start',
                    position: 'relative', overflow: 'hidden',
                  }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${f.accent}44, transparent)` }} />

                  {/* Avatar */}
                  <div style={{
                    width: 52, height: 52, flexShrink: 0,
                    border: `1px solid ${f.accent}44`,
                    background: `${f.accent}0C`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative',
                  }}>
                    <CornerMarks color={`${f.accent}44`} />
                    <span style={{ fontSize: '11px', letterSpacing: '0.08em', color: f.accent }}>
                      {f.name.split(' ').map((n: string) => n[0]).join('')}
                    </span>
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: 8 }}>
                      <span style={{
                        fontSize: '7px', letterSpacing: '0.2em',
                        color: f.accent, border: `1px solid ${f.accent}33`,
                        padding: '2px 7px', background: `${f.accent}0A`,
                      }}>
                        {f.tag}
                      </span>
                    </div>
                    <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 16, fontWeight: 600, color: C.bright, marginBottom: 3 }}>
                      {f.name}
                    </h3>
                    <div style={{ fontSize: '9px', letterSpacing: '0.12em', color: f.accent, marginBottom: 5 }}>{f.role}</div>
                    <div style={{ fontSize: '8px', letterSpacing: '0.1em', color: C.dim, marginBottom: 14 }}>{f.area}</div>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: C.muted, lineHeight: 1.75, fontWeight: 300 }}>{f.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: 'clamp(80px,10vw,120px) clamp(24px,6vw,80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7 }}
            style={{
              background: C.bgCard, border: `1px solid ${C.border}`,
              padding: 'clamp(52px,6vw,80px) clamp(36px,5vw,72px)',
              position: 'relative', overflow: 'hidden', textAlign: 'center',
            }}
          >
            <CornerMarks color={C.steel} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 110%, rgba(74,127,165,0.04) 0%, transparent 55%)', pointerEvents: 'none' }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 20 }}>
              <div style={{ width: 24, height: 1, background: C.steel }} />
              <span style={{ fontSize: '8px', letterSpacing: '0.28em', color: C.steel }}>COLLABORATE</span>
              <div style={{ width: 24, height: 1, background: C.steel }} />
            </div>
            <h2 className="font-display" style={{
              fontSize: 'clamp(26px,4vw,52px)', fontWeight: 700, fontStyle: 'italic',
              color: C.bright, marginBottom: 16, letterSpacing: '-0.02em',
            }}>
              Work With IronVeil
            </h2>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: C.muted, maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.8, fontWeight: 300 }}>
              Open to collaboration on research projects, technical analysis, and long-form writing
              across engineering, defense technology, and financial intelligence.
            </p>
            <button
              onClick={() => setContactOpen(true)}
              style={{
                background: 'rgba(74,127,165,0.1)', border: `1px solid ${C.steel}`,
                color: C.steelLt, ...MONO, fontSize: '10px', letterSpacing: '0.22em',
                padding: '14px 52px', cursor: 'pointer', transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(74,127,165,0.22)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(74,127,165,0.1)')}
            >
              GET IN TOUCH
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: `1px solid ${C.border}`, background: C.bgDeep, padding: '28px clamp(24px,6vw,80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ color: C.steel, fontSize: '14px' }}>⬡</span>
            <span style={{ fontSize: '9px', letterSpacing: '0.22em', color: C.dim }}>IRONVEIL RESEARCH</span>
            <span style={{ color: C.border }}>|</span>
            <span style={{ fontSize: '8px', letterSpacing: '0.14em', color: C.dim }}>EST. 2026</span>
          </div>
          <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ fontSize: '8px', letterSpacing: '0.18em', color: C.muted, textDecoration: 'none' }}>PORTFOLIO</Link>
            <button onClick={() => setContactOpen(true)} style={{ background: 'none', border: 'none', fontSize: '8px', letterSpacing: '0.18em', color: C.muted, cursor: 'pointer', ...MONO }}>CONTACT</button>
            <span style={{ fontSize: '8px', letterSpacing: '0.12em', color: C.dim }}>© 2026 IRONVEIL RESEARCH</span>
          </div>
        </div>
      </footer>

      {/* ── Contact modal ── */}
      <AnimatePresence>
        {contactOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 1000,
              background: 'rgba(5,7,9,0.94)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
            }}
            onClick={e => { if (e.target === e.currentTarget) resetContact() }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 16 }}
              transition={{ duration: 0.2 }}
              style={{ background: C.bgCard, border: `1px solid ${C.borderLt}`, width: '100%', maxWidth: 460, position: 'relative' }}
            >
              <CornerMarks color={C.steel} />

              {/* Modal header */}
              <div style={{
                padding: '14px 20px', borderBottom: `1px solid ${C.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <motion.span
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ color: C.steel, fontSize: 14 }}
                  >⬡</motion.span>
                  <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: C.muted }}>CONTACT // IRONVEIL_RESEARCH</span>
                </div>
                <button onClick={resetContact} style={{ background: 'none', border: 'none', color: C.muted, cursor: 'pointer', fontSize: 18, lineHeight: 1, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = C.text)}
                  onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
                >×</button>
              </div>

              {/* Progress bar */}
              <div style={{ height: 2, background: C.border, position: 'relative', overflow: 'hidden' }}>
                <motion.div
                  animate={{ width: `${[form.name, emailValid, form.msg].filter(Boolean).length / 3 * 100}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  style={{ height: '100%', background: `linear-gradient(90deg, ${C.steel}, ${C.steelLt})`, position: 'absolute', left: 0, top: 0 }}
                />
              </div>

              <div style={{ padding: '24px 28px 30px' }}>
                <AnimatePresence mode="wait">
                  {!sent ? (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div style={{ fontSize: '8px', color: C.dim, letterSpacing: '0.14em', marginBottom: 22, lineHeight: 1.6, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ color: C.steel }}>▶</span>
                        <span>INQUIRY ROUTED TO ianmarcoandujar9@gmail.com</span>
                      </div>

                      {/* NAME */}
                      <div style={{ marginBottom: 14 }}>
                        <label style={{ fontSize: '7px', letterSpacing: '0.24em', color: C.muted, display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span>NAME <span style={{ color: C.forge }}>*</span></span>
                          {form.name && <span style={{ color: '#2D7A4A' }}>✓ OK</span>}
                        </label>
                        <input
                          value={form.name}
                          onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                          placeholder="Your full name"
                          style={{
                            width: '100%', boxSizing: 'border-box',
                            background: form.name ? 'rgba(74,127,165,0.06)' : 'rgba(74,127,165,0.03)',
                            border: `1px solid ${form.name ? C.steel : C.border}`,
                            color: C.text, ...MONO, fontSize: '12px',
                            padding: '10px 14px', outline: 'none', letterSpacing: '0.03em', transition: 'all 0.2s',
                          }}
                          onFocus={e => (e.target.style.borderColor = C.steel)}
                          onBlur={e => (e.target.style.borderColor = form.name ? C.steel : C.border)}
                        />
                      </div>

                      {/* EMAIL */}
                      <div style={{ marginBottom: 14 }}>
                        <label style={{ fontSize: '7px', letterSpacing: '0.24em', color: C.muted, display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span>EMAIL <span style={{ color: C.forge }}>*</span></span>
                          {emailTouched && form.email && (
                            <motion.span
                              initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }}
                              style={{ color: emailValid ? '#2D7A4A' : '#8B2020' }}
                            >
                              {emailValid ? '✓ VALID' : '✗ INVALID FORMAT'}
                            </motion.span>
                          )}
                        </label>
                        <div style={{ position: 'relative' }}>
                          <input
                            type="email"
                            value={form.email}
                            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                            onBlur={() => setEmailTouched(true)}
                            placeholder="your@email.com"
                            style={{
                              width: '100%', boxSizing: 'border-box',
                              background: emailTouched && form.email
                                ? emailValid ? 'rgba(45,122,74,0.06)' : 'rgba(139,32,32,0.06)'
                                : 'rgba(74,127,165,0.03)',
                              border: `1px solid ${
                                emailTouched && form.email
                                  ? emailValid ? '#2D7A4A' : '#8B2020'
                                  : C.border
                              }`,
                              color: C.text, ...MONO, fontSize: '12px',
                              padding: '10px 36px 10px 14px', outline: 'none',
                              letterSpacing: '0.03em', transition: 'all 0.25s',
                            }}
                            onFocus={e => { if (!emailTouched || !form.email) e.target.style.borderColor = C.steel }}
                            onBlurCapture={e => { if (!emailValid && form.email) e.target.style.borderColor = '#8B2020' }}
                          />
                          {/* Live icon */}
                          {emailTouched && form.email && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                              style={{
                                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                                fontSize: 12, color: emailValid ? '#2D7A4A' : '#8B2020',
                              }}
                            >
                              {emailValid ? '✓' : '✗'}
                            </motion.span>
                          )}
                        </div>
                      </div>

                      {/* ORG */}
                      <div style={{ marginBottom: 14 }}>
                        <label style={{ fontSize: '7px', letterSpacing: '0.24em', color: C.muted, display: 'block', marginBottom: 6 }}>
                          ORGANIZATION <span style={{ color: C.dim }}>(optional)</span>
                        </label>
                        <input
                          value={form.org}
                          onChange={e => setForm(p => ({ ...p, org: e.target.value }))}
                          placeholder="Company / institution"
                          style={{
                            width: '100%', boxSizing: 'border-box',
                            background: 'rgba(74,127,165,0.03)', border: `1px solid ${C.border}`,
                            color: C.text, ...MONO, fontSize: '12px',
                            padding: '10px 14px', outline: 'none', letterSpacing: '0.03em', transition: 'all 0.2s',
                          }}
                          onFocus={e => (e.target.style.borderColor = C.steel)}
                          onBlur={e => (e.target.style.borderColor = C.border)}
                        />
                      </div>

                      {/* MESSAGE */}
                      <div style={{ marginBottom: 20 }}>
                        <label style={{ fontSize: '7px', letterSpacing: '0.24em', color: C.muted, display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span>MESSAGE <span style={{ color: C.forge }}>*</span></span>
                          {form.msg && <span style={{ color: C.dim }}>{form.msg.length} chars</span>}
                        </label>
                        <textarea
                          value={form.msg}
                          onChange={e => setForm(p => ({ ...p, msg: e.target.value }))}
                          rows={4}
                          placeholder="Research interest, collaboration proposal, or general inquiry..."
                          style={{
                            width: '100%', boxSizing: 'border-box',
                            background: form.msg ? 'rgba(74,127,165,0.06)' : 'rgba(74,127,165,0.03)',
                            border: `1px solid ${form.msg ? C.steel : C.border}`,
                            color: C.text, ...MONO, fontSize: '11px',
                            padding: '10px 14px', outline: 'none', resize: 'vertical',
                            letterSpacing: '0.03em', lineHeight: 1.65, transition: 'all 0.2s',
                          }}
                          onFocus={e => (e.target.style.borderColor = C.steel)}
                          onBlur={e => (e.target.style.borderColor = form.msg ? C.steel : C.border)}
                        />
                      </div>

                      {/* Submit */}
                      <motion.button
                        onClick={sendContact}
                        disabled={!formReady || sending}
                        whileHover={formReady ? { scale: 1.01 } : {}}
                        whileTap={formReady ? { scale: 0.99 } : {}}
                        style={{
                          width: '100%',
                          background: formReady ? 'rgba(74,127,165,0.14)' : 'rgba(74,127,165,0.03)',
                          border: `1px solid ${formReady ? C.steel : C.border}`,
                          color: formReady ? C.steelLt : C.dim,
                          ...MONO, fontSize: '10px', letterSpacing: '0.24em',
                          padding: '14px', cursor: formReady ? 'pointer' : 'default',
                          transition: 'all 0.2s', position: 'relative', overflow: 'hidden',
                        }}
                      >
                        {sending ? (
                          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                            <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ display: 'inline-block' }}>◈</motion.span>
                            TRANSMITTING...
                          </span>
                        ) : (
                          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                            {formReady
                              ? <><motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>▶</motion.span> SEND INQUIRY</>
                              : <>◈ COMPLETE REQUIRED FIELDS</>
                            }
                          </span>
                        )}
                      </motion.button>

                      {!formReady && (
                        <div style={{ marginTop: 10, fontSize: '7px', letterSpacing: '0.14em', color: C.dim, textAlign: 'center' }}>
                          {[!form.name && 'NAME', !emailValid && 'VALID EMAIL', !form.msg && 'MESSAGE'].filter(Boolean).join(' · ')} REQUIRED
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      style={{ textAlign: 'center', padding: '28px 0' }}
                    >
                      <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                        style={{ fontSize: 36, color: C.steel, marginBottom: 18 }}
                      >⬡</motion.div>
                      <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: C.steelLt, marginBottom: 12 }}>
                        INQUIRY TRANSMITTED
                      </div>
                      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: C.muted, lineHeight: 1.75, marginBottom: 8 }}>
                        Your message has been sent to IronVeil Research.
                      </p>
                      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: C.dim, lineHeight: 1.75, marginBottom: 28 }}>
                        We&apos;ll respond to <span style={{ color: C.steelLt }}>{form.email}</span> within 48 hours.
                      </p>
                      <button
                        onClick={resetContact}
                        style={{
                          background: 'transparent', border: `1px solid ${C.border}`,
                          color: C.muted, ...MONO, fontSize: '9px', letterSpacing: '0.18em',
                          padding: '8px 24px', cursor: 'pointer',
                        }}
                      >
                        CLOSE
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
    </>
  )
}
