'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import AmbientOrbs from './AmbientOrbs'

interface WorkItem {
  slug: string
  title: string
  category: string
  year: string
  image?: string
}

const GOLD = 'var(--accent-gold)'

const projects: WorkItem[] = [
  { slug: 'fpv-competition-drone', title: 'FPV Competition Drone', category: 'UAV / Hardware', year: '2024' },
]

export default function Work() {
  const [active, setActive] = useState<string | null>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY })
  }, [])

  const activeProject = projects.find(p => p.slug === active)

  return (
    <section
      id="work"
      onMouseMove={handleMouseMove}
      style={{ padding: 'clamp(80px, 10vw, 140px) 0', background: 'var(--white)', position: 'relative', overflow: 'hidden' }}
    >
      <AmbientOrbs variant="olive" />

      {/* Cursor-following preview */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              left: pos.x + 28,
              top: pos.y - 100,
              width: 260,
              height: 170,
              zIndex: 9999,
              pointerEvents: 'none',
              overflow: 'hidden',
              borderRadius: '3px',
              border: `1px solid ${GOLD}40`,
            }}
          >
            {activeProject?.image ? (
              <img
                src={activeProject.image}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
            ) : (
              <div
                style={{
                  width: '100%', height: '100%',
                  background: 'linear-gradient(145deg, rgba(201,164,85,0.14) 0%, rgba(42,32,24,0.9) 100%)',
                  borderLeft: `2px solid ${GOLD}`,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'flex-start', justifyContent: 'flex-end',
                  padding: '16px',
                }}
              >
                <span style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: '10px',
                  color: GOLD, letterSpacing: '0.14em',
                  textTransform: 'uppercase', opacity: 0.9,
                }}>
                  {activeProject?.category}
                </span>
                <span style={{
                  fontFamily: 'Playfair Display, serif', fontSize: '15px',
                  color: 'var(--ink)', marginTop: '4px', fontWeight: 400, lineHeight: 1.2,
                }}>
                  {activeProject?.title}
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="section-inner">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '64px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <span className="diamond-divider" />
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              Work
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <h2
              className="font-display"
              style={{ fontSize: 'clamp(40px, 6vw, 76px)', fontWeight: 400, color: 'var(--ink)', letterSpacing: '-0.035em', lineHeight: 1 }}
            >
              Things I&apos;ve{' '}
              <em style={{ color: 'var(--accent-gold)', fontStyle: 'italic' }}>built.</em>
            </h2>
          </div>
        </motion.div>

        {/* Project list */}
        <div>
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.055 }}
              style={{
                opacity: active && active !== project.slug ? 0.3 : 1,
                transition: 'opacity 0.25s ease',
              }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="work-row"
                onMouseEnter={() => setActive(project.slug)}
                onMouseLeave={() => setActive(null)}
              >
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--muted)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>

                <h3
                  className="work-row-title font-display"
                  style={{ fontSize: 'clamp(22px, 3vw, 38px)', fontWeight: 400, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1 }}
                >
                  {project.title}
                </h3>

                <span
                  className="work-row-category"
                  style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.06em' }}
                >
                  {project.category}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--muted)' }}>
                    {project.year}
                  </span>
                  <ArrowUpRight size={15} className="work-row-arrow" style={{ color: GOLD }} />
                </div>
              </Link>
            </motion.div>
          ))}
          <div style={{ height: '1px', background: 'var(--border)' }} />
        </div>
      </div>
    </section>
  )
}
