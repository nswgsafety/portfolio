'use client'

import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, useGLTF, Html, useProgress } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import TypewriterText from './TypewriterText'

interface FleetItem {
  id: string
  label: string
  org: string
  file: string
  color: string
  category: 'PROPULSION' | 'DEFENSE' | 'SYSTEMS'
}

const fleet: FleetItem[] = [
  { id: 'falcon-heavy', label: 'Falcon Heavy',        org: 'SPACEX',   file: '/models/falcon_heavy.glb',                                     color: '#3DBBFF', category: 'PROPULSION' },
  { id: 'mars',         label: 'Mars',                 org: 'DEEP_SPACE', file: '/models/mars.glb',                                          color: '#FF4D2E', category: 'PROPULSION' },
  { id: 'altius',       label: 'ALTIUS 700M',          org: 'ANDURIL',  file: '/models/anduril_altius_700m.glb',                              color: '#22C55E', category: 'DEFENSE' },
  { id: 'f22',          label: 'F-22 Raptor',          org: 'USAF',     file: '/models/f22_raptor_free.glb',                                  color: '#8B5CF6', category: 'DEFENSE' },
  { id: 'f35',          label: 'F-35 Lightning II',    org: 'USAF',     file: '/models/f-35_lightning_ii_-_fighter_jet_-_free.glb',           color: '#8B5CF6', category: 'DEFENSE' },
  { id: 'yf23',         label: 'YF-23 Black Widow II', org: 'USAF',     file: '/models/yf-23_black_widow_ii_-_fighter_jet_-_free.glb',        color: '#8B5CF6', category: 'DEFENSE' },
  { id: 'b2',           label: 'B-2 Spirit',           org: 'USAF',     file: '/models/northrop_grumman_b-2_spirit_-_free.glb',              color: '#8B5CF6', category: 'DEFENSE' },
  { id: 'satellite',    label: 'Satellite',            org: 'ORBITAL',  file: '/models/satelite.glb',                                         color: '#C8F050', category: 'SYSTEMS' },
  { id: 'brain',        label: 'Neural Systems',       org: 'BIOMECH',  file: '/models/brain.glb',                                            color: '#F59E0B', category: 'SYSTEMS' },
]

const MONO: React.CSSProperties = { fontFamily: 'DM Mono, monospace' }

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

function CanvasLoader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div style={{ ...MONO, fontSize: 11, color: '#22C55E', letterSpacing: '0.14em', whiteSpace: 'nowrap' }}>
        LOADING_MODEL // {Math.round(progress)}%
      </div>
    </Html>
  )
}

export default function HardwareViewer() {
  const [active, setActive] = useState<FleetItem>(fleet[0])
  const categories: FleetItem['category'][] = ['PROPULSION', 'DEFENSE', 'SYSTEMS']

  return (
    <section id="hardware" style={{ padding: 'clamp(80px, 10vw, 140px) 0', background: '#0A0A0A' }}>
      <div className="section-inner">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '48px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <span style={{ ...MONO, fontSize: '10px', letterSpacing: '0.12em', color: 'var(--accent-coral)' }}>[03]</span>
            <TypewriterText text="// HARDWARE_REFERENCE" speed={55} style={{ ...MONO, fontSize: '10px', letterSpacing: '0.14em', color: 'var(--muted)' }} />
          </div>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(40px, 6vw, 76px)', fontWeight: 400, color: 'var(--ink)', letterSpacing: '-0.035em', lineHeight: 1 }}
          >
            The systems that{' '}
            <em style={{ color: 'var(--accent-coral)', fontStyle: 'italic' }}>drive me.</em>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            border: '1px solid rgba(255,248,240,0.08)',
            borderLeft: `2px solid ${active.color}`,
            borderRadius: '3px',
            overflow: 'hidden',
            background: 'rgba(255,248,240,0.02)',
          }}
        >
          {/* Terminal chrome bar */}
          <div style={{
            padding: '9px 20px',
            background: active.color + '0E',
            borderBottom: `1px solid ${active.color}25`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="live-dot" style={{ background: active.color, boxShadow: `0 0 6px ${active.color}` }} />
              <span style={{ ...MONO, fontSize: '9px', color: active.color, letterSpacing: '0.14em' }}>
                [{active.org}]
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={active.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ ...MONO, fontSize: '9px', color: 'var(--ink)', letterSpacing: '0.08em' }}
                >
                  {active.label}
                </motion.span>
              </AnimatePresence>
            </div>
            <span style={{ ...MONO, fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.08em' }}>
              DRAG TO ORBIT · SCROLL TO ZOOM
            </span>
          </div>

          {/* Viewport */}
          <div style={{ height: 'clamp(360px, 52vw, 560px)', position: 'relative' }}>
            <Canvas
              key={active.id}
              camera={{ fov: 40, position: [4, 2, 6] }}
              dpr={[1, 1.8]}
              style={{ background: '#050505' }}
            >
              <Suspense fallback={<CanvasLoader />}>
                <Stage environment="city" intensity={0.5} adjustCamera={1.3}>
                  <Model url={active.file} />
                </Stage>
              </Suspense>
              <OrbitControls makeDefault autoRotate autoRotateSpeed={0.7} enableZoom enablePan={false} />
            </Canvas>

            {/* Coordinate readout overlay */}
            <div style={{ position: 'absolute', bottom: '14px', left: '18px', ...MONO, fontSize: '9px', color: 'rgba(255,248,240,0.3)', letterSpacing: '0.08em', pointerEvents: 'none' }}>
              MODEL_ID: {active.id.toUpperCase()}
            </div>
          </div>

          {/* Fleet picker */}
          <div style={{ padding: '18px 20px 22px', borderTop: '1px solid var(--border)' }}>
            {categories.map(cat => (
              <div key={cat} style={{ marginBottom: '12px' }}>
                <span style={{ ...MONO, fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.12em', marginRight: '14px' }}>
                  {cat}
                </span>
                {fleet.filter(f => f.category === cat).map(f => (
                  <button
                    key={f.id}
                    onClick={() => setActive(f)}
                    style={{
                      ...MONO, fontSize: '10px', letterSpacing: '0.06em',
                      padding: '6px 12px', margin: '3px 6px 3px 0',
                      borderRadius: '2px', cursor: 'pointer',
                      border: `1px solid ${active.id === f.id ? f.color : 'rgba(255,248,240,0.1)'}`,
                      background: active.id === f.id ? `${f.color}18` : 'transparent',
                      color: active.id === f.id ? f.color : 'var(--muted)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
