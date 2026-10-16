'use client'

import { useState } from 'react'

// When .no-loader is set (skip case, applied before paint by the inline head
// script), CSS alone hides this via `.no-loader .loader { display: none }` —
// no JS needed for that path. We only need JS to unmount after the real
// play-through finishes, via onAnimationEnd.
export default function Loader() {
  const [removed, setRemoved] = useState(false)

  if (removed) return null

  return (
    <div
      className="loader"
      aria-hidden="true"
      onAnimationEnd={(e) => {
        if (e.animationName === 'lift') setRemoved(true)
      }}
    >
      <div className="clump loader__corner loader__corner--bl" />
      <div className="clump loader__corner loader__corner--tr" />
      <div className="loader__inner">
        <span className="lab muted">Portfolio · 2026</span>
        <div className="loader__word">
          <span className="loader__ghost">Andujar</span>
          {/* HANDOFF rule 2: name stays solid ink/bone, never moss-filled — omit .moss-text here */}
          <span className="loader__fill">Andujar</span>
        </div>
        <span className="lab loader__count" />
      </div>
    </div>
  )
}
