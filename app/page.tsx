'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
const Loader = dynamic(() => import('@/components/Loader'), { ssr: false })
const Scene3D = dynamic(() => import('@/components/Scene3D'), { ssr: false })
import Scene3DBoundary from '@/components/Scene3DBoundary'
import AmbientOrbs from '@/components/AmbientOrbs'
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
        {/* Persistent 3D layer — must be a sibling of <main> inside the SAME
            stacking context, or main's z-index has nothing valid to compare
            against and the canvas can end up painting over everything.
            Wrapped in an error boundary: a WebGL/GLTF failure here must
            never be able to take down the entire page. */}
        <Scene3DBoundary>
          <Scene3D />
        </Scene3DBoundary>
        <Cursor />
        <Nav />
        <main style={{ position: 'relative', zIndex: 2 }}>
          <Hero />
          <Work />

          {/* ── Manifesto quote ── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9 }}
            style={{
              background: 'var(--white)',
              padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 96px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderTop: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <AmbientOrbs variant="olive" />
            <blockquote style={{ maxWidth: '720px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <span className="diamond-divider" style={{ margin: '0 auto 28px', display: 'block' }} />
              <p
                className="font-display"
                style={{
                  fontSize: 'clamp(24px, 3.4vw, 42px)',
                  color: 'var(--ink)',
                  lineHeight: 1.5,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                  marginBottom: '24px',
                }}
              >
                &ldquo;Engineering is how I make a{' '}
                <span style={{ color: 'var(--accent-gold)' }}>difference.</span>&rdquo;
              </p>
              <footer
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '11px',
                  color: 'var(--muted)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                Ian Andujar
              </footer>
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
