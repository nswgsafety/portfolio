'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import TypewriterText from './TypewriterText'
import LiquidGlass from './LiquidGlass'
import GlassOrbs from './GlassOrbs'

const philOrbs = [
  { size: 800, top: '0%',  left: '-15%', color: 'rgba(120,0,0,',    delay: 0, duration: 18, blur: 0, opacity: 0.18 },
  { size: 450, top: '55%', left: '78%',  color: 'rgba(80,0,30,',    delay: 2, duration: 14, blur: 0, opacity: 0.14 },
  { size: 250, top: '5%',  left: '60%',  color: 'rgba(180,10,10,',  delay: 1, duration: 11, blur: 0, opacity: 0.08 },
  { size: 160, top: '82%', left: '25%',  color: 'rgba(60,0,0,',     delay: 3, duration: 15, blur: 0, opacity: 0.12 },
]

const versionI = [
  {
    heading: 'The Ground State',
    body: 'At the foundation of human existence, beneath ideology, culture, and conscious motivation, lies a single irreducible state: fear. Not fear as an emotional response to a specific stimulus, but fear as the ground condition of being itself. It does not require a trigger. It simply is. The response comes after. Fear is generative, not reactive.',
  },
  {
    heading: 'The Uncaused Cause',
    body: 'This places fear in the same logical category that theologians assign to God and cosmologists assign to the singularity before the Big Bang. It is the uncaused cause. Every attempt to reduce it further arrives at the same wall: there is nothing beneath it. Time, sequence, and cause-and-effect are constructs that operate within the system. Fear is the system itself.',
  },
  {
    heading: 'Power as Response',
    body: "From fear, power emerges. Power is not a separate foundation but the first thing that arises when any organism attempts to manage, direct, resist, or harness its fear. The drive to secure, expand, and preserve capacity is the organism's answer to the ground state it finds itself in. Power is fear organized and projected outward.",
  },
  {
    heading: 'Everything Else Maps Back',
    body: 'Every other human drive maps back to these two forces without remainder. Love, when examined at the biological level, is the fear of losing a specific attachment. Curiosity is the organism moving toward the unknown. Altruism, kin selection, and reciprocal cooperation are fear of species termination operating through the individual body. The framework does not bend to fit the data. The data, examined at sufficient depth, converges on the framework.',
  },
  {
    heading: 'Marcus Aurelius',
    body: 'Power and fear do not compete with meaning, love, or virtue. They are the substrate on which those experiences arise. Marcus Aurelius understood this. He held more institutional power than nearly any human in history and spent his private writings attempting to govern himself rather than others, recognizing that power directed inward is the only form that does not require another to diminish.',
  },
]

const versionII = [
  {
    heading: 'The Simple Version',
    body: 'Everything humans do traces back to two things: fear and power. Not as feelings you choose to have, but as forces running underneath everything, whether you notice them or not. Fear is not just being scared of something. It is the baseline condition of being alive.',
  },
  {
    heading: 'Power Is the Response',
    body: 'Power is what emerges when something tries to manage that fear. Any time an organism secures food, forms a group, builds walls, or gains influence over its environment, it is converting fear into power. Power is not just about ruling other people. At its most basic, it is anything that reduces vulnerability.',
  },
  {
    heading: 'Everything Connects',
    body: 'A parent protecting a child is fear for the continuation of something they love. Curiosity is moving toward the unknown rather than away from it — but the unknown is still what drives the movement. People building communities are managing the fear of being alone. The love you feel for another person is inseparable from the fear of losing them.',
  },
  {
    heading: 'Not Cynicism',
    body: 'This is not a cynical view of humanity. It does not mean love is fake or that kindness does not matter. It means those things are real and they are built on something even more fundamental. The foundation does not diminish what sits on top of it.',
  },
  {
    heading: 'The Application',
    body: 'Power over yourself — the ability to direct your own actions rather than be driven by unexamined fear — is the only form of power that does not require someone else to lose. Every other kind of power in this world is contested. That kind is yours alone. Fear just is. What you do with it is the only question that matters.',
  },
]

const pullQuote = 'Fear just is. What you do with it is the only question that matters.'

export default function Philosophy() {
  const [open, setOpen] = useState(false)
  const [version, setVersion] = useState<'I' | 'II'>('II')
  const sections = version === 'I' ? versionI : versionII
  const versionLabel = version === 'I' ? 'For the Philosopher' : 'For Everyone Else'

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section
      id="philosophy"
      ref={containerRef}
      style={{
        padding: 'clamp(100px, 12vw, 180px) 0 clamp(80px, 10vw, 140px)',
        background: '#0a0000',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Deep red vignette */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(100,0,0,0.35) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(60,0,0,0.5) 0%, transparent 70%)',
      }} />

      <GlassOrbs orbs={philOrbs} />

      <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>

        {/* ── Header ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '32px', alignItems: 'end', marginBottom: '72px' }}>
          <motion.div style={{ y: titleY }}>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}
            >
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.12em', color: '#8B0000' }}>[08]</span>
              <TypewriterText text="// CLASSIFIED_FRAMEWORK" speed={55} style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.14em', color: 'rgba(139,0,0,0.5)' }} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2
                className="font-display font-black"
                style={{
                  fontSize: 'clamp(72px, 13vw, 172px)',
                  letterSpacing: '-0.045em',
                  lineHeight: 0.85,
                  color: '#f5f0f0',
                  textShadow: '0 0 80px rgba(150,0,0,0.4)',
                }}
              >
                Fear
              </h2>
              <h2
                className="font-display font-black"
                style={{
                  fontSize: 'clamp(72px, 13vw, 172px)',
                  letterSpacing: '-0.045em',
                  lineHeight: 0.85,
                  color: 'transparent',
                  WebkitTextStroke: '1.5px rgba(180,0,0,0.75)',
                  textShadow: '0 0 60px rgba(180,0,0,0.25)',
                }}
              >
                &amp; Power.
              </h2>
            </motion.div>
          </motion.div>

          {/* Vertical label */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', paddingBottom: '12px' }}
          >
            <div style={{
              writingMode: 'vertical-rl', transform: 'rotate(180deg)',
              fontFamily: 'DM Mono, monospace', fontSize: '10px',
              color: 'rgba(180,0,0,0.4)', letterSpacing: '0.14em', textTransform: 'uppercase',
            }}>
              Human Existence
            </div>
            <div style={{ width: '1px', height: '72px', background: 'linear-gradient(to bottom, transparent, rgba(180,0,0,0.5))' }} />
          </motion.div>
        </div>

        {/* ── Open button (shown when closed) ── */}
        <AnimatePresence>
          {!open && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', justifyContent: 'center', paddingTop: '16px' }}
            >
              <motion.button
                onClick={() => setOpen(true)}
                animate={{
                  boxShadow: [
                    '0 0 18px rgba(34,197,94,0.35), 0 0 40px rgba(34,197,94,0.15)',
                    '0 0 32px rgba(34,197,94,0.6), 0 0 70px rgba(34,197,94,0.25)',
                    '0 0 18px rgba(34,197,94,0.35), 0 0 40px rgba(34,197,94,0.15)',
                  ],
                }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.04 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '12px',
                  fontFamily: 'DM Mono, monospace', fontSize: '12px',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'rgba(200,255,210,0.9)',
                  background: 'rgba(34,197,94,0.1)',
                  border: '1px solid rgba(34,197,94,0.5)',
                  borderRadius: '2px',
                  padding: '14px 32px',
                  cursor: 'pointer',
                  transition: 'background 0.25s ease, border-color 0.25s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.background = 'rgba(34,197,94,0.2)'
                  el.style.borderColor = 'rgba(34,197,94,0.8)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.background = 'rgba(34,197,94,0.1)'
                  el.style.borderColor = 'rgba(34,197,94,0.5)'
                }}
              >
                <motion.span
                  animate={{ boxShadow: ['0 0 6px rgba(34,197,94,0.7)', '0 0 14px rgba(34,197,94,1)', '0 0 6px rgba(34,197,94,0.7)'] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22C55E', display: 'inline-block' }}
                />
                Read the Framework
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Expanded content ── */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
              style={{ overflow: 'hidden' }}
            >

              {/* Pull quote */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{ marginBottom: '72px', paddingTop: '8px' }}
              >
                <LiquidGlass
                  dark
                  blur={20}
                  distort={5}
                  shimmer={false}
                  tint="rgba(30,0,0,0.78)"
                  style={{ borderRadius: '3px', overflow: 'hidden' }}
                >
                  <div style={{ height: '2px', background: 'linear-gradient(90deg, #8B0000 0%, rgba(139,0,0,0.3) 60%, transparent 100%)' }} />
                  <div style={{ padding: 'clamp(32px, 5vw, 60px) clamp(28px, 6vw, 68px)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '40px', alignItems: 'center' }}>
                      <p className="font-display" style={{ fontSize: 'clamp(20px, 3vw, 38px)', color: 'rgba(240,230,230,0.92)', lineHeight: 1.5, fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.01em' }}>
                        &ldquo;{pullQuote}&rdquo;
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', minWidth: '20px' }}>
                        <div style={{ width: '1px', height: '52px', background: 'linear-gradient(to bottom, transparent, rgba(139,0,0,0.6))' }} />
                        <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#8B0000', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                          Ian Andujar
                        </span>
                      </div>
                    </div>
                  </div>
                </LiquidGlass>
              </motion.div>

              {/* Version toggle */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '44px', flexWrap: 'wrap' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(139,0,0,0.25)', borderRadius: '3px', padding: '4px' }}>
                  {(['II', 'I'] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setVersion(v)}
                      style={{
                        fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.08em',
                        padding: '10px 22px', borderRadius: '2px', border: 'none', cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        background: version === v ? '#8B0000' : 'transparent',
                        color: version === v ? 'rgba(255,230,230,0.95)' : 'rgba(255,255,255,0.28)',
                        boxShadow: version === v ? '0 4px 20px rgba(139,0,0,0.45)' : 'none',
                      }}
                    >
                      {v === 'I' ? 'For the Philosopher' : 'For Everyone Else'}
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={version}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.22 }}
                    style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.12em', textTransform: 'uppercase' }}
                  >
                    Version {version} · {versionLabel}
                  </motion.span>
                </AnimatePresence>
              </motion.div>

              {/* Content cards */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={version}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '10px' }}
                >
                  {sections.map((s, i) => (
                    <motion.div
                      key={s.heading}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.05, ease: [0.25, 1, 0.5, 1] }}
                      whileHover={{ y: -5, transition: { duration: 0.25 } }}
                      style={{
                        position: 'relative', borderRadius: '3px', padding: '28px',
                        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                        background: 'rgba(15,0,0,0.72)', border: '1px solid rgba(139,0,0,0.18)',
                        overflow: 'hidden', cursor: 'default',
                        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                      }}
                    >
                      <span aria-hidden className="font-display font-black" style={{ position: 'absolute', top: '-8px', right: '12px', fontSize: '88px', lineHeight: 1, color: 'rgba(139,0,0,0.07)', letterSpacing: '-0.04em', pointerEvents: 'none', userSelect: 'none' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <motion.div
                        animate={{ boxShadow: ['0 0 6px rgba(139,0,0,0.5)', '0 0 14px rgba(139,0,0,0.9)', '0 0 6px rgba(139,0,0,0.5)'] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}
                      >
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8B0000', flexShrink: 0 }} />
                        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#8B0000', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </motion.div>
                      <h3 className="font-display font-bold" style={{ fontSize: 'clamp(15px, 1.6vw, 20px)', color: 'rgba(240,225,225,0.92)', lineHeight: 1.2, marginBottom: '14px', letterSpacing: '-0.02em', position: 'relative', zIndex: 1 }}>
                        {s.heading}
                      </h3>
                      <p style={{ fontSize: '13px', lineHeight: 1.9, color: 'rgba(220,200,200,0.42)', fontWeight: 300 }}>
                        {s.body}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{ marginTop: '64px' }}
              >
                <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(139,0,0,0.35) 30%, rgba(139,0,0,0.35) 70%, transparent)', marginBottom: '36px' }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
                  <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.14)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Written by Ian Andujar &nbsp;·&nbsp; Personal philosophical framework &nbsp;·&nbsp; All rights reserved
                  </p>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => setOpen(false)}
                      style={{
                        fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.08em',
                        color: 'rgba(255,255,255,0.25)', background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.08)', borderRadius: '2px',
                        padding: '10px 20px', cursor: 'pointer', transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.25)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
                    >
                      Collapse
                    </button>
                    <a
                      href="/fear-and-power.html"
                      download="Fear-and-Power-Ian-Andujar.html"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '10px',
                        fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase',
                        color: 'rgba(220,180,180,0.75)', border: '1px solid rgba(139,0,0,0.35)',
                        borderRadius: '2px', padding: '10px 22px', textDecoration: 'none',
                        transition: 'all 0.25s ease', background: 'rgba(139,0,0,0.08)',
                      }}
                      onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'rgba(139,0,0,0.22)'; el.style.borderColor = 'rgba(139,0,0,0.6)'; el.style.color = 'rgba(255,210,210,0.95)' }}
                      onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'rgba(139,0,0,0.08)'; el.style.borderColor = 'rgba(139,0,0,0.35)'; el.style.color = 'rgba(220,180,180,0.75)' }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Download the Full Framework
                    </a>
                  </div>
                </div>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
