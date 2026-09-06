'use client'

export default function SectionSideLabel({ index, label, side = 'left' }: { index: string; label: string; side?: 'left' | 'right' }) {
  return (
    <div
      className="section-side-label"
      style={{
        position: 'absolute',
        [side]: 'clamp(8px, 2vw, 28px)',
        top: '50%',
        transform: side === 'left' ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)',
        writingMode: 'vertical-rl',
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '10px',
        letterSpacing: '0.28em',
        color: 'var(--muted)',
        textTransform: 'uppercase',
        opacity: 0.45,
        zIndex: 1,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      {index} &mdash; {label}
    </div>
  )
}
