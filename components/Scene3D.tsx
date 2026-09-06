'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x))
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0))
  return t * t * (3 - 2 * t)
}

/** ~0 while section is below the viewport, ~1 once it has scrolled fully past the top. */
function sectionProgress(id: string): number | null {
  const el = document.getElementById(id)
  if (!el) return null
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight
  return (vh - rect.top) / (rect.height + vh)
}

function FalconHeavy() {
  const { scene } = useGLTF('/models/falcon_heavy.glb')
  const ref = useRef<THREE.Group>(null!)

  useFrame(() => {
    if (!ref.current) return
    const heroEl = document.getElementById('hero')
    const heroHeight = heroEl?.offsetHeight || window.innerHeight
    const t = THREE.MathUtils.clamp(window.scrollY / heroHeight, 0, 1.6)
    const exit = smoothstep(0.05, 1.15, t)

    ref.current.position.set(0, -1 + exit * 11, -exit * 6)
    ref.current.rotation.set(0, 0.2 + t * 0.5, exit * 0.4)
    ref.current.scale.setScalar(THREE.MathUtils.lerp(1.05, 0.4, exit))
    ref.current.visible = t < 1.55
  })

  return <primitive ref={ref} object={scene} />
}

interface DockedModelProps {
  id: string
  url: string
  side: 1 | -1
  baseScale: number
}

function DockedModel({ id, url, side, baseScale }: DockedModelProps) {
  const { scene } = useGLTF(url)
  const ref = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (!ref.current) return
    const p = sectionProgress(id)
    if (p === null) {
      ref.current.visible = false
      return
    }
    const enter = smoothstep(0.06, 0.36, p)
    const exit = smoothstep(0.72, 1.02, p)
    const presence = clamp01(enter - exit)

    ref.current.visible = presence > 0.02
    ref.current.position.set(THREE.MathUtils.lerp(side * 5.5, side * 2.4, enter), 0, 0)
    ref.current.rotation.y = state.clock.elapsedTime * 0.22 + side
    ref.current.scale.setScalar(Math.max(baseScale * presence, 0.0001))
  })

  return <primitive ref={ref} object={scene} />
}

function Rig() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[6, 8, 5]} intensity={1.3} />
      <directionalLight position={[-6, -3, -4]} intensity={0.4} />
      <Suspense fallback={null}>
        <FalconHeavy />
      </Suspense>
      <Suspense fallback={null}>
        <DockedModel id="building" url="/models/anduril_altius_700m.glb" side={1} baseScale={1.4} />
      </Suspense>
      <Suspense fallback={null}>
        <DockedModel id="vision" url="/models/satelite.glb" side={-1} baseScale={1.1} />
      </Suspense>
    </>
  )
}

useGLTF.preload('/models/falcon_heavy.glb')
useGLTF.preload('/models/anduril_altius_700m.glb')
useGLTF.preload('/models/satelite.glb')

export default function Scene3D() {
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)')
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  if (!enabled) return null

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }} aria-hidden>
      <Canvas camera={{ position: [0, 0, 8], fov: 35 }} dpr={[1, 1.6]} gl={{ alpha: true, antialias: true }}>
        <Rig />
      </Canvas>
    </div>
  )
}
