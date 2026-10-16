import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      style={{
        background: 'var(--limestone)',
        color: 'var(--ink)',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '24px',
        gap: 28,
      }}
    >
      <span className="lab muted">Not found</span>
      <h1
        style={{
          fontFamily: 'var(--display)',
          fontStyle: 'italic',
          fontWeight: 800,
          fontSize: 'clamp(96px, 20vw, 180px)',
          lineHeight: 0.9,
          letterSpacing: '-0.03em',
          color: 'var(--moss-ink)',
        }}
      >
        404
      </h1>
      <p className="read" style={{ maxWidth: 420, color: 'var(--ash)' }}>
        This page wandered off somewhere between the drone shop and the debate floor. Let&rsquo;s get you back.
      </p>
      <Link className="btn btn--ink" href="/">Back to the portfolio</Link>
    </div>
  )
}
