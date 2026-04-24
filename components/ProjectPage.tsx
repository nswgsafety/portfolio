'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User } from 'lucide-react'
import Link from 'next/link'
import type { ProjectDetail } from '@/lib/projects'

export default function ProjectPage({ project }: { project: ProjectDetail }) {
  const statusColor =
    project.status === 'Completed' ? '#C8F050' :
    project.status === 'In Progress' ? project.color :
    '#3DBBFF'

  const coverImage = project.images[0]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--white)', color: 'var(--ink)' }}>

      {/* ── Back nav ─────────────────────────────────────────────────── */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '20px 0', background: 'rgba(10,10,10,0.88)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="section-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link
            href="/#work"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'DM Mono, monospace', fontSize: '12px', letterSpacing: '0.06em', color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s ease' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-coral)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            <ArrowLeft size={14} /> Back to Portfolio
          </Link>
          <span className="font-display font-bold" style={{ fontSize: '16px', color: 'var(--ink)' }}>
            Ian<span style={{ color: 'var(--accent-coral)' }}>.</span>
          </span>
        </div>
      </div>

      {/* ── Cover image ──────────────────────────────────────────────── */}
      <div style={{ paddingTop: '72px' }}>
        {coverImage ? (
          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            style={{ width: '100%', height: 'clamp(200px, 45vw, 70vh)', overflow: 'hidden', background: '#111' }}
          >
            <img
              src={coverImage}
              alt={project.title}
              style={{
                width: '100%', height: '100%',
                objectFit: coverImage.endsWith('.svg') ? 'contain' : 'cover',
                objectPosition: 'center', display: 'block',
                background: coverImage.endsWith('.svg') ? '#0D0D0D' : undefined,
              }}
            />
          </motion.div>
        ) : (
          <div style={{ width: '100%', height: '40vh', background: `linear-gradient(135deg, ${project.color}18 0%, #111 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: project.color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>No image available</span>
          </div>
        )}
      </div>

      {/* ── Overview ─────────────────────────────────────────────────── */}
      <div className="section-inner" style={{ paddingTop: '72px', paddingBottom: '100px' }}>

        {/* Status + year row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', marginBottom: '24px' }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'DM Mono, monospace', fontSize: '11px', color: statusColor }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: statusColor, boxShadow: `0 0 8px ${statusColor}80`, display: 'inline-block' }} />
            {project.status}
          </span>
          <span style={{ width: '1px', height: '14px', background: 'var(--border)' }} />
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{project.year}</span>
          <span style={{ width: '1px', height: '14px', background: 'var(--border)' }} />
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: project.color }}>{project.subtitle}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display font-black"
          style={{ fontSize: 'clamp(40px, 7vw, 88px)', letterSpacing: '-0.03em', lineHeight: 0.95, color: 'var(--ink)', marginBottom: '28px' }}
        >
          {project.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          style={{ maxWidth: '680px', fontSize: 'clamp(16px, 1.8vw, 19px)', lineHeight: 1.8, color: 'var(--muted)', fontWeight: 300, marginBottom: '48px' }}
        >
          {project.longDescription}
        </motion.p>

        {/* Content grid: highlights + meta */}
        <div className="project-info-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '48px' }}>

          {/* Key Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{ borderRadius: '16px', padding: '32px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}
          >
            <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px' }}>
              Key Highlights
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none' }}>
              {project.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.06 }}
                  style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--ink)', lineHeight: 1.55 }}
                >
                  <span style={{ color: project.color, flexShrink: 0, fontWeight: 700 }}>✦</span>
                  {h}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Project Info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ borderRadius: '16px', padding: '32px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}
          >
            <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px' }}>
              Project Info
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <User size={13} style={{ color: 'var(--muted)', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'var(--muted)', marginBottom: '3px' }}>Role</p>
                  <p style={{ fontSize: '14px', color: 'var(--ink)', fontWeight: 500 }}>{project.role}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Clock size={13} style={{ color: 'var(--muted)', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'var(--muted)', marginBottom: '3px' }}>Timeline</p>
                  <p style={{ fontSize: '14px', color: 'var(--ink)', fontWeight: 500 }}>{project.timeline}</p>
                </div>
              </div>
              <div style={{ height: '1px', background: 'var(--border)' }} />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {project.tags.map(t => (
                  <span key={t} className="tag" style={{ color: project.color, borderColor: project.color + '40' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sections */}
        {project.sections.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.07 }}
            style={{ marginBottom: '40px', paddingBottom: '40px', borderBottom: i < project.sections.length - 1 ? '1px solid var(--border)' : 'none' }}
          >
            <h2 style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: project.color, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '14px' }}>
              {s.heading}
            </h2>
            <p style={{ fontSize: 'clamp(15px, 1.6vw, 17px)', lineHeight: 1.85, color: 'var(--muted)', fontWeight: 300, maxWidth: '740px' }}>
              {s.body}
            </p>
          </motion.div>
        ))}

        {/* Image gallery */}
        {project.images.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ marginTop: '64px', marginBottom: '48px' }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '20px' }}>
              <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Project Gallery
              </p>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: project.color }}>
                {project.images.length - 1} images
              </span>
            </div>

            {/* First featured pair full-width */}
            {project.images.length >= 3 && (
              <div className="gallery-pair" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                {project.images.slice(1, 3).map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: i * 0.08 }}
                    style={{ borderRadius: '12px', overflow: 'hidden', aspectRatio: '16/10', border: '1px solid var(--border)', background: '#111' }}
                  >
                    <img src={src} alt={`${project.title} ${i + 2}`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Remaining images in 3-col grid */}
            {project.images.length > 3 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px' }}>
                {project.images.slice(3).map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.05 }}
                    style={{ borderRadius: '10px', overflow: 'hidden', aspectRatio: '4/3', border: '1px solid var(--border)', background: '#111' }}
                  >
                    <img src={src} alt={`${project.title} ${i + 4}`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* ── Bottom nav ───────────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid var(--border)', padding: '40px 0' }}>
        <div className="section-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link
            href="/#work"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'DM Mono, monospace', fontSize: '12px', color: 'var(--muted)', textDecoration: 'none', letterSpacing: '0.06em', transition: 'color 0.2s ease' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-coral)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            <ArrowLeft size={13} /> All Projects
          </Link>
          <Link
            href="/#contact"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: project.color, color: 'white', padding: '12px 24px', borderRadius: '100px', fontFamily: 'DM Mono, monospace', fontSize: '12px', textDecoration: 'none', letterSpacing: '0.05em' }}
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  )
}
