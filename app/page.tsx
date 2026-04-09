'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TypewriterText from '@/components/TypewriterText'
import dynamic from 'next/dynamic'
const Loader = dynamic(() => import('@/components/Loader'), { ssr: false })
import Cursor from '@/components/Cursor'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Work from '@/components/Work'
import Building from '@/components/Building'
import Passion from '@/components/Passion'
import Resume from '@/components/Resume'
import Vision from '@/components/Vision'
import Philosophy from '@/components/Philosophy'
import Contact from '@/components/Contact'

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const handleComplete = useCallback(() => setLoaded(true), [])
  const [quoteStarted, setQuoteStarted] = useState(false)
  const [quoteComplete, setQuoteComplete] = useState(false)

  const QUOTE_TEXT = `\u201cEngineering is the key to unlocking humanity\u2019s potential \u2014 whether by blasting into the stars, or by changing lives down on the surface. And so I believe that the path I take in life will be one with the goal to make a difference in this big world.\u201d`

  return (
    <>
      {/* Loader always mounts first; sessionStorage skips it on repeat visits */}
      <Loader onComplete={handleComplete} />

      {/* Site fades in once loader calls onComplete */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ pointerEvents: loaded ? 'all' : 'none' }}
      >
        <Cursor />
        <Nav />
        <main>
          <Contact />
          <Hero />
          <Work />

          {/* ── Manifesto quote ── */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9 }}
            style={{
              background: '#0A0807',
              padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 96px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderTop: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <blockquote style={{ maxWidth: '800px', position: 'relative' }}>
              {/* Top bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '36px' }}>
                <div style={{ width: '32px', height: '2px', background: 'var(--accent-coral)' }} />
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.18em', color: 'var(--accent-coral)', textTransform: 'uppercase' }}>
                  {quoteComplete ? 'TRANSMISSION COMPLETE' : quoteStarted ? 'DECRYPTING...' : 'TRANSMISSION ENCRYPTED'}
                </span>
                {quoteStarted && !quoteComplete && (
                  <span className="terminal-cursor" style={{ marginLeft: '4px' }} />
                )}
              </div>

              <AnimatePresence mode="wait">
                {!quoteStarted ? (
                  /* ── Encrypted state ── */
                  <motion.div
                    key="encrypted"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p
                      className="font-display"
                      style={{
                        fontSize: 'clamp(22px, 3.2vw, 40px)',
                        color: 'rgba(237,234,229,0.12)',
                        lineHeight: 1.5,
                        fontStyle: 'italic',
                        fontWeight: 400,
                        letterSpacing: '-0.01em',
                        marginBottom: '32px',
                        userSelect: 'none',
                      }}
                    >
                      {'█'.repeat(14)} {'█'.repeat(2)} {'█'.repeat(3)} {'█'.repeat(3)} {'█'.repeat(2)}{' '}
                      {'█'.repeat(10)} {'█'.repeat(12)} {'█'.repeat(8)}{' '}
                      {'█'.repeat(7)} {'█'.repeat(2)} {'█'.repeat(8)} {'█'.repeat(4)}{' '}
                      {'█'.repeat(3)} {'█'.repeat(5)} {'█'.repeat(2)} {'█'.repeat(9)}{' '}
                      {'█'.repeat(3)} {'█'.repeat(2)} {'█'.repeat(7)} {'█'.repeat(4)}{' '}
                      {'█'.repeat(6)} {'█'.repeat(2)} {'█'.repeat(4)} {'█'.repeat(3)}.
                    </p>
                    <motion.button
                      onClick={() => setQuoteStarted(true)}
                      animate={{
                        boxShadow: [
                          '0 0 14px rgba(34,197,94,0.25), 0 0 32px rgba(34,197,94,0.08)',
                          '0 0 28px rgba(34,197,94,0.55), 0 0 60px rgba(34,197,94,0.18)',
                          '0 0 14px rgba(34,197,94,0.25), 0 0 32px rgba(34,197,94,0.08)',
                        ],
                      }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      whileHover={{ y: -2 }}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '12px',
                        fontFamily: 'DM Mono, monospace', fontSize: '11px',
                        letterSpacing: '0.14em', textTransform: 'uppercase',
                        color: 'var(--accent-coral)',
                        background: 'rgba(34,197,94,0.06)',
                        border: '1px solid rgba(34,197,94,0.35)',
                        borderRadius: '2px',
                        padding: '12px 28px',
                        cursor: 'pointer',
                      }}
                    >
                      <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.1, repeat: Infinity }}
                        style={{ fontSize: '14px', lineHeight: 1 }}
                      >
                        ▶
                      </motion.span>
                      DECRYPT TRANSMISSION
                    </motion.button>
                  </motion.div>
                ) : (
                  /* ── Typing / complete state ── */
                  <motion.div
                    key="decrypted"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p
                      className="font-display"
                      style={{
                        fontSize: 'clamp(22px, 3.2vw, 40px)',
                        color: 'var(--ink)',
                        lineHeight: 1.5,
                        fontStyle: 'italic',
                        fontWeight: 400,
                        letterSpacing: '-0.01em',
                        marginBottom: '32px',
                      }}
                    >
                      {quoteComplete ? (
                        <>
                          &ldquo;Engineering is the key to unlocking humanity&apos;s potential ; whether by blasting into the stars,
                          or by changing lives down on the surface. I believe that the path I take in life
                          will be one with the goal to make a{' '}
                          <span style={{ color: 'var(--accent-coral)' }}>difference.</span>&rdquo;
                        </>
                      ) : (
                        <TypewriterText
                          text={QUOTE_TEXT}
                          speed={22}
                          triggerOnView={false}
                          started={quoteStarted}
                          onComplete={() => setQuoteComplete(true)}
                          cursor
                        />
                      )}
                    </p>
                    <motion.footer
                      initial={{ opacity: 0 }}
                      animate={{ opacity: quoteComplete ? 1 : 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                    >
                      <div style={{ width: '20px', height: '1px', background: 'var(--muted)' }} />
                      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                        Ian Andujar
                      </span>
                    </motion.footer>
                  </motion.div>
                )}
              </AnimatePresence>
            </blockquote>
          </motion.section>

          <Building />
          <Passion />
          <Resume />
          <Vision />
          <Philosophy />
          <Contact />
        </main>
      </motion.div>
    </>
  )
}
