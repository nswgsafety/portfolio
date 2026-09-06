'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Linkedin, Mail, Phone, ArrowUpRight, Check } from 'lucide-react'
import AmbientOrbs from './AmbientOrbs'

const EMAIL = 'ianmarcoandujar9@gmail.com'

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ian-andujar-710a6a388', icon: Linkedin },
  { label: 'Email', href: `mailto:${EMAIL}`, icon: Mail },
  { label: 'Phone', href: 'tel:+18622471465', icon: Phone },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)

  function copyEmail() {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    })
  }

  return (
    <footer id="contact" style={{ padding: 'clamp(80px, 10vw, 140px) 0 48px', background: 'var(--white)', position: 'relative', overflow: 'hidden' }}>
      <AmbientOrbs variant="terracotta" />
      <div className="section-inner">

        {/* Big CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          style={{
            borderRadius: '3px',
            padding: 'clamp(48px, 6vw, 88px)',
            background: 'var(--black)',
            border: '1px solid var(--border)',
            borderTop: '2px solid var(--accent-gold)',
            marginBottom: '72px',
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'center',
          }}
        >
          <AmbientOrbs variant="gold" />

          <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
            <span className="diamond-divider" />
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              Contact
            </span>
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(38px, 6vw, 80px)', color: '#EDE9E4', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '20px', fontWeight: 400 }}>
            Let&apos;s build<br />
            <em style={{ color: 'var(--accent-gold)' }}>something together.</em>
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(250,250,248,0.5)', maxWidth: '440px', margin: '0 auto 44px', lineHeight: 1.75 }}>
            Whether it&apos;s a path toward Anduril, an engineering collaboration, an internship opportunity, or just a conversation — the door is open.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <motion.button
              onClick={copyEmail}
              whileHover={{ y: -2, boxShadow: '0 12px 32px rgba(201,164,85,0.35)' }}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                background: copied ? 'rgba(201,164,85,0.15)' : 'var(--accent-gold)',
                color: copied ? 'var(--accent-gold)' : 'var(--black)',
                padding: '14px 28px', borderRadius: '2px',
                fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '0.1em',
                border: copied ? '1px solid rgba(201,164,85,0.5)' : 'none',
                cursor: 'pointer',
                transition: 'background 0.3s ease, color 0.3s ease',
                textTransform: 'uppercase',
              }}
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <Check size={14} /> Copied!
                  </motion.span>
                ) : (
                  <motion.span
                    key="default"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <Mail size={14} /> Copy Email
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <motion.a
              href="https://www.linkedin.com/in/ian-andujar-710a6a388"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.borderColor = 'var(--accent-gold)'
                el.style.color = 'var(--accent-gold)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.borderColor = 'rgba(255,248,240,0.14)'
                el.style.color = '#EDE9E4'
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                border: '1px solid rgba(255,248,240,0.14)', color: '#EDE9E4',
                padding: '14px 28px', borderRadius: '2px',
                fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '0.1em',
                textDecoration: 'none', textTransform: 'uppercase',
                transition: 'border-color 0.2s ease, color 0.2s ease',
              }}
            >
              LinkedIn <ArrowUpRight size={13} />
            </motion.a>
          </div>
          </div>
        </motion.div>

        {/* Easter egg riddle */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6 }}
          style={{
            marginBottom: '40px',
            padding: '16px 20px',
            borderLeft: '2px solid rgba(201,164,85,0.28)',
            background: 'rgba(201,164,85,0.015)',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          <div style={{ fontSize: '8px', color: 'rgba(201,164,85,0.35)', letterSpacing: '0.18em', marginBottom: '10px' }}>
            {`// ANOMALOUS_SIGNAL_DETECTED`}
          </div>
          {[
            '> somewhere on every page, a terminal sleeps.',
            '> it wakes for those curious enough to find it.',
            '> four numbers hold the door — ask yourself:',
            '> what year does the mission end?',
          ].map((line, i) => (
            <div key={i} style={{ fontSize: '9px', color: 'rgba(201,164,85,0.18)', letterSpacing: '0.05em', lineHeight: 1.95 }}>
              <span style={{ color: i === 3 ? 'rgba(201,164,85,0.3)' : undefined }}>{line}</span>
            </div>
          ))}
          <div style={{ fontSize: '9px', color: 'rgba(201,164,85,0.12)', letterSpacing: '0.05em', lineHeight: 1.95, marginTop: '2px' }}>
            {'> '}look to where the page runs out.
            <span style={{
              display: 'inline-block', width: 4, height: 8,
              background: 'rgba(201,164,85,0.3)',
              animation: 'terminal-blink 1.1s step-start infinite',
              verticalAlign: 'middle', marginLeft: 4,
            }} />
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span className="font-display font-bold" style={{ fontSize: '20px', color: 'var(--ink)' }}>
              Ian Andujar<span style={{ color: 'var(--accent-gold)' }}>.</span>
            </span>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>
              Mechatronics & Aerospace · Paramus, NJ
            </p>
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {socials.map(({ label, href, icon: Icon }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                aria-label={label}
                style={{ color: 'var(--muted)', transition: 'color 0.2s ease' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-gold)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
              >
                <Icon size={17} />
              </motion.a>
            ))}
          </div>

          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: 'var(--muted)' }}>
            © {new Date().getFullYear()} Ian Andujar
          </p>
        </div>
      </div>
    </footer>
  )
}
