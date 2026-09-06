'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, useGLTF } from '@react-three/drei'
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

function heroScrollT(): number {
  const heroEl = document.getElementById('hero')
  const heroHeight = heroEl?.offsetHeight || window.innerHeight
  return THREE.MathUtils.clamp(window.scrollY / heroHeight, 0, 1.6)
}

/**
 * GLB files aren't modeled at a consistent scale (a rocket vs. a drone vs. a
 * satellite can differ by orders of magnitude in raw units). Recenter each
 * model on its own bounding-box center and return a scale factor that fits
 * its longest axis to `targetSize` world units, so a single camera/lighting
 * rig works for all of them without the camera ending up inside the mesh.
 */
function useFittedScene(url: string, targetSize: number) {
  const { scene } = useGLTF(url)
  return useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    scene.position.set(-center.x, -center.y, -center.z)
    return { scene, scale: targetSize / maxDim }
  }, [scene, targetSize])
}

function FalconHeavy() {
  const { scene, scale } = useFittedScene('/models/falcon_heavy.glb', 4.8)
  const ref = useRef<THREE.Group>(null!)

  useFrame(() => {
    if (!ref.current) return
    const t = heroScrollT()
    const exit = smoothstep(0.05, 1.15, t)

    ref.current.position.set(0, -0.6 + exit * 6.5, -exit * 4.5)
    ref.current.rotation.set(-0.03, 0.65 + t * 0.5, exit * 0.4)
    ref.current.scale.setScalar(scale * THREE.MathUtils.lerp(1, 0.42, exit))
    ref.current.visible = t < 1.55
  })

  return (
    <group ref={ref}>
      <primitive object={scene} />
    </group>
  )
}

interface DockedModelProps {
  id: string
  url: string
  side: 1 | -1
  targetSize: number
}

function DockedModel({ id, url, side, targetSize }: DockedModelProps) {
  const { scene, scale } = useFittedScene(url, targetSize)
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
    ref.current.position.set(THREE.MathUtils.lerp(side * 4.5, side * 1.8, enter), 0, 0)
    ref.current.rotation.y = state.clock.elapsedTime * 0.22 + side
    ref.current.scale.setScalar(Math.max(scale * presence, 0.0001))
  })

  return (
    <group ref={ref}>
      <primitive object={scene} />
    </group>
  )
}

function Rig() {
  return (
    <>
      <Environment preset="sunset" background={false} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 8, 5]} color="#F3D9A8" intensity={1.4} />
      <Suspense fallback={null}>
        <FalconHeavy />
      </Suspense>
      <Suspense fallback={null}>
        <DockedModel id="building" url="/models/anduril_altius_700m.glb" side={1} targetSize={2.2} />
      </Suspense>
      <Suspense fallback={null}>
        <DockedModel id="vision" url="/models/satelite.glb" side={-1} targetSize={1.8} />
      </Suspense>
    </>
  )
}

useGLTF.preload('/models/falcon_heavy.glb')
useGLTF.preload('/models/anduril_altius_700m.glb')
useGLTF.preload('/models/satelite.glb')

const SKY_GRADIENT = 'linear-gradient(180deg, var(--dusk-deep) 0%, var(--dusk-mid) 45%, var(--dusk-warm) 78%, var(--dusk-glow) 100%)'
const HAZE_GRADIENT = 'linear-gradient(to top, var(--dusk-deep) 0%, rgba(60,42,30,0.55) 35%, transparent 100%)'

export default function Scene3D() {
  const [enabled, setEnabled] = useState(true)
  const skyRef = useRef<HTMLDivElement>(null)
  const hazeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)')
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Background sky + foreground haze are DOM layers (not WebGL) so they only
  // ever apply to the hero — they fade out well before Building/Vision, whose
  // own opaque backgrounds mask the canvas the rest of the time.
  useEffect(() => {
    let raf: number
    function tick() {
      const t = heroScrollT()
      const fade = 1 - smoothstep(0.15, 1.05, t)
      if (skyRef.current) skyRef.current.style.opacity = String(fade)
      if (hazeRef.current) hazeRef.current.style.opacity = String(fade)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  if (!enabled) return null

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }} aria-hidden>
      {/* Background */}
      <div ref={skyRef} style={{ position: 'absolute', inset: 0, background: SKY_GRADIENT }} />

      {/* Model */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 35 }}
        dpr={[1, 1.6]}
        gl={{ alpha: true, antialias: true }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Rig />
      </Canvas>

      {/* Foreground — crops the base of the model to sell the depth */}
      <div
        ref={hazeRef}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '38%', background: HAZE_GRADIENT }}
      />
    </div>
  )
}
