'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react'
import Link from 'next/link'

// ── Types ──────────────────────────────────────────────────────────────────────
export interface Project {
  title: string
  subtitle?: string
  description: string
  tags: string[]
  color: string        // accent color
  year: string
  slug?: string        // links to /projects/[slug]
  github?: string
  live?: string
  image?: string       // optional image url
}

// ── Variant A – Minimal Card (default grid) ───────────────────────────────────
export function CardMinimal({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
      whileHover={{ y: -4 }}
      className="glass-card"
      style={{
        borderRadius: '16px',
        padding: '32px',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = `0 20px 60px -12px ${project.color}33, 0 0 0 1px rgba(255,255,255,0.6), inset 0 1px 0 rgba(255,255,255,0.9)`
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = ''
      }}
    >
      {/* Color bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: project.color }} />

      <div className="flex items-start justify-between mb-6">
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: project.color + '18',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: project.color }} />
        </div>
        <span className="font-mono-custom" style={{ fontSize: '11px', color: 'var(--muted)' }}>{project.year}</span>
      </div>

      <h3 className="font-display font-bold mb-1" style={{ fontSize: '22px', color: 'var(--ink)', lineHeight: 1.2 }}>
        {project.title}
      </h3>
      {project.subtitle && (
        <p className="font-mono-custom mb-3" style={{ fontSize: '12px', color: project.color, letterSpacing: '0.04em' }}>
          {project.subtitle}
        </p>
      )}
      <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--muted)', marginBottom: '24px' }}>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map(t => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontFamily: 'DM Mono, monospace', color: 'var(--muted)' }}
            className="link-underline"
          >
            <Github size={13} /> Code
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontFamily: 'DM Mono, monospace', color: 'var(--ink)' }}
            className="link-underline"
          >
            <ExternalLink size={13} /> Live
          </a>
        )}
        {project.slug ? (
          <Link href={`/projects/${project.slug}`} style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', border: `1px solid ${project.color}`, background: project.color + '12' }}>
            <ArrowUpRight size={14} style={{ color: project.color }} />
          </Link>
        ) : (
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--border)' }}>
            <ArrowUpRight size={14} style={{ color: 'var(--muted)' }} />
          </div>
        )}
      </div>
      {project.slug && (
        <Link href={`/projects/${project.slug}`} style={{ position: 'absolute', inset: 0, zIndex: 1 }} aria-label={`View ${project.title}`} />
      )}
    </motion.article>
  )
}

// ── Variant B – Featured Full-Width ───────────────────────────────────────────
export function CardFeatured({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
      className="glass-card featured-card"
      style={{
        borderRadius: '20px',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '360px',
        cursor: 'pointer',
      }}
    >
      {/* Left: content */}
      <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="tag" style={{ borderColor: project.color, color: project.color }}>Featured</span>
            <span className="font-mono-custom" style={{ fontSize: '11px', color: 'var(--muted)' }}>{project.year}</span>
          </div>
          <h3 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(28px, 3vw, 42px)', color: 'var(--ink)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="font-mono-custom mb-4" style={{ fontSize: '12px', color: project.color, letterSpacing: '0.04em' }}>
              {project.subtitle}
            </p>
          )}
          <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'var(--muted)', maxWidth: '380px' }}>
            {project.description}
          </p>
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
          <div className="flex gap-4">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontFamily: 'DM Mono, monospace', color: 'var(--muted)' }}
                className="link-underline"
              ><Github size={13} /> Code</a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: project.color, color: 'white',
                  padding: '10px 20px', borderRadius: '100px',
                  fontSize: '12px', fontFamily: 'DM Mono, monospace', letterSpacing: '0.04em',
                }}
              >Live Demo <ArrowUpRight size={13} /></a>
            )}
          </div>
        </div>
      </div>

      {/* Right: visual */}
      <div
        style={{
          background: `linear-gradient(135deg, ${project.color}15 0%, ${project.color}30 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {project.image ? (
          <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '24px',
                background: project.color,
                margin: '0 auto 16px',
                opacity: 0.8,
              }}
            />
            <p className="font-mono-custom" style={{ fontSize: '11px', color: project.color, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {project.subtitle || 'Project Preview'}
            </p>
          </div>
        )}
        {/* Corner label */}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            background: 'white',
            padding: '6px 12px',
            borderRadius: '100px',
            fontSize: '11px',
            fontFamily: 'DM Mono, monospace',
            color: 'var(--ink)',
            letterSpacing: '0.04em',
          }}
        >
          {project.year}
        </div>
      </div>

      {project.slug && (
        <Link href={`/projects/${project.slug}`} style={{ position: 'absolute', inset: 0, zIndex: 2 }} aria-label={`View ${project.title}`} />
      )}
    </motion.article>
  )
}

// ── Variant C – Mosaic / Compact ──────────────────────────────────────────────
export function CardMosaic({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 1, 0.5, 1] }}
      whileHover={{ scale: 1.02 }}
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${project.color}20 0%, ${project.color}08 100%)`,
          border: '1px solid ' + project.color + '30',
          borderRadius: '16px',
        }}
      />

      <div style={{ position: 'relative', padding: '28px' }}>
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono-custom" style={{ fontSize: '10px', color: project.color, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {project.year}
          </span>
          <ArrowUpRight size={14} style={{ color: project.color }} />
        </div>

        <h3 className="font-display font-bold mb-2" style={{ fontSize: '20px', color: 'var(--ink)', lineHeight: 1.2 }}>
          {project.title}
        </h3>
        <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--muted)', marginBottom: '20px' }}>
          {project.description.slice(0, 100)}{project.description.length > 100 ? '…' : ''}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map(t => (
            <span
              key={t}
              style={{
                display: 'inline-flex',
                padding: '2px 8px',
                borderRadius: '100px',
                background: project.color + '20',
                color: project.color,
                fontSize: '10px',
                fontFamily: 'DM Mono, monospace',
                letterSpacing: '0.05em',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      {project.slug && (
        <Link href={`/projects/${project.slug}`} style={{ position: 'absolute', inset: 0, zIndex: 2 }} aria-label={`View ${project.title}`} />
      )}
    </motion.article>
  )
}
