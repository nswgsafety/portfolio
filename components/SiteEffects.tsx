'use client'

import { useEffect } from 'react'

// Port of main.js's page-wide behaviors that aren't owned by a single
// component: scroll-reveal IO fallback, loop-pausing, and the firefly cursor.
// (Loader removal lives in Loader.tsx; the debate explorer and copy-email
// button are now real React components with their own state.)
export default function SiteEffects() {
  useEffect(() => {
    const root = document.documentElement
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasIO = 'IntersectionObserver' in window
    const cleanups: Array<() => void> = []

    // Scroll reveals: native CSS where supported, IntersectionObserver fallback (Firefox).
    if (hasIO && !reduce && !CSS.supports('animation-timeline: view()')) {
      root.classList.add('io')
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target) }
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
      )
      document.querySelectorAll('.rv').forEach((el) => io.observe(el))
      cleanups.push(() => io.disconnect())
    }

    // Pause looping animations off-screen and when the tab is hidden.
    if (hasIO) {
      const loops = new IntersectionObserver((entries) => {
        for (const e of entries) e.target.classList.toggle('paused', !e.isIntersecting)
      })
      document.querySelectorAll('[data-loop]').forEach((el) => loops.observe(el))
      cleanups.push(() => loops.disconnect())
    }
    const onVisibility = () => root.classList.toggle('paused', document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    cleanups.push(() => document.removeEventListener('visibilitychange', onVisibility))

    // Firefly cursor: follows the mouse, glows only over dark areas. Fine-pointer desktop only.
    const fly = document.querySelector<HTMLElement>('.fly')
    if (fly && !reduce && matchMedia('(hover: hover) and (pointer: fine)').matches) {
      let x = 0, y = 0, dark = false, raf = 0
      const paint = () => {
        raf = 0
        fly.style.transform = `translate3d(${x}px, ${y}px, 0)`
        fly.style.opacity = dark ? '1' : '0'
      }
      const onMove = (e: PointerEvent) => {
        x = e.clientX; y = e.clientY
        dark = !!(e.target instanceof Element && e.target.closest('[data-dark]'))
        if (!raf) raf = requestAnimationFrame(paint)
      }
      const onLeave = () => { fly.style.opacity = '0' }
      document.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('pointerleave', onLeave)
      cleanups.push(() => {
        document.removeEventListener('pointermove', onMove)
        document.removeEventListener('pointerleave', onLeave)
      })
    }

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return null
}
