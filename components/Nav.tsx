'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Building', href: '#building' },
  { label: 'Passion', href: '#passion' },
  { label: 'Resume', href: '#resume' },
  { label: 'Vision', href: '#vision' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          paddingLeft: 'clamp(24px, 5vw, 80px)',
          paddingRight: 'clamp(24px, 5vw, 80px)',
          paddingTop: scrolled ? '14px' : '24px',
          paddingBottom: scrolled ? '14px' : '24px',
          transition: 'padding 0.4s ease, background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease',
          background: scrolled ? 'rgba(8, 8, 8, 0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.2)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.2)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          boxShadow: scrolled ? '0 1px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a
            href="#"
            className="font-display corner-frame"
            style={{ color: 'var(--ink)', fontSize: '18px', fontWeight: 700, padding: '6px 12px', letterSpacing: '-0.01em' }}
          >
            IA<span style={{ color: 'var(--accent-gold)' }}>.</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="link-underline text-sm font-medium"
                style={{ color: 'var(--muted)', fontFamily: 'DM Mono, monospace', fontSize: '12px', letterSpacing: '0.06em' }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              style={{
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'var(--ink)',
                padding: '7px 16px',
                borderRadius: '2px',
                fontSize: '11px',
                fontFamily: 'DM Mono, monospace',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transition: 'border-color 0.2s ease, color 0.2s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.borderColor = 'var(--accent-gold)'
                el.style.color = 'var(--accent-gold)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.borderColor = 'rgba(255,255,255,0.15)'
                el.style.color = 'var(--ink)'
              }}
            >
              Contact
            </a>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span style={{ display: 'block', width: '22px', height: '1.5px', background: 'var(--ink)', transition: 'all 0.3s ease', transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
            <span style={{ display: 'block', width: '22px', height: '1.5px', background: 'var(--ink)', transition: 'all 0.3s ease', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: '22px', height: '1.5px', background: 'var(--ink)', transition: 'all 0.3s ease', transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 flex flex-col justify-center items-center gap-8 md:hidden"
            style={{ background: '#0D0D0D' }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="font-display text-4xl font-bold"
                style={{ color: 'var(--ink)' }}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
