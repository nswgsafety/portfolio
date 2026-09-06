'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const LINES = [
  '> INITIALIZING DIAGNOSTIC SCAN...',
  '> ROUTE TABLE LOOKUP: FAILED',
  '> SIGNAL TRACE: NULL REFERENCE',
  '> REQUESTING FALLBACK COORDINATES...',
  '> ERROR_CODE: 404 — TARGET NOT FOUND',
]

export default function NotFound() {
  const [visible, setVisible] = useState<number[]>([])

  useEffect(() => {
    LINES.forEach((_, i) => {
      setTimeout(() => setVisible(v => [...v, i]), i * 340 + 200)
    })
  }, [])

  return (
    <div style={{
      background: '#07090C', color: '#C8D4E0', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: '"DM Mono", monospace', overflowX: 'hidden',
    }}>
      {/* grid */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(74,127,165,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(74,127,165,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px', maxWidth: 600 }}>

        {/* glitch 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: 'clamp(100px, 20vw, 160px)', fontWeight: 900, fontStyle: 'italic',
            lineHeight: 1, letterSpacing: '-0.04em', color: '#E8EEF4',
            textShadow: '2px 0 0 rgba(74,127,165,0.5), -2px 0 0 rgba(184,116,26,0.4)',
            marginBottom: 8,
          }}
        >
          4<span style={{ color: '#4A7FA5' }}>0</span>4
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ fontSize: '8px', letterSpacing: '0.3em', color: '#4A7FA5', marginBottom: 40 }}
        >
          SIGNAL LOST — COORDINATE NOT FOUND
        </motion.div>

        {/* terminal lines */}
        <div style={{
          background: '#0D1017', border: '1px solid #1C2433',
          padding: '20px 24px', textAlign: 'left', marginBottom: 40,
          fontSize: '11px', letterSpacing: '0.06em', lineHeight: 2,
        }}>
          {LINES.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={visible.includes(i) ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.2 }}
              style={{
                color: line.includes('ERROR') ? '#8B2020'
                  : line.includes('FAILED') || line.includes('NULL') ? '#B8741A'
                  : '#5A6A7E',
              }}
            >
              {line}
              {i === LINES.length - 1 && visible.includes(i) && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  style={{ marginLeft: 4, color: '#4A7FA5' }}
                >▌</motion.span>
              )}
            </motion.div>
          ))}
        </div>

        {/* nav links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.4 }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link
            href="/"
            style={{
              border: '1px solid rgba(74,127,165,0.4)', color: '#6BA0C8',
              padding: '10px 28px', textDecoration: 'none', fontSize: '9px',
              letterSpacing: '0.2em', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(74,127,165,0.1)'; e.currentTarget.style.borderColor = '#4A7FA5' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(74,127,165,0.4)' }}
          >
            ← RETURN TO PORTFOLIO
          </Link>
        </motion.div>

      </div>
    </div>
  )
}
