export default function Home() {
  return (
    <main
      style={{
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '24px',
        background: 'var(--white)',
      }}
    >
      <h1
        className="font-display"
        style={{
          fontSize: 'clamp(40px, 8vw, 88px)',
          fontWeight: 400,
          color: 'var(--ink)',
          letterSpacing: '-0.02em',
        }}
      >
        Under Construction<span style={{ color: 'var(--accent-gold)' }}>.</span>
      </h1>
    </main>
  )
}
