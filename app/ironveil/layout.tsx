import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IronVeil Research',
  description: 'Independent research at the intersection of engineering, defense, and financial intelligence.',
}

export default function IronVeilLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Strip the portfolio grid/grain — IronVeil is its own visual system */}
      <style>{`
        body::before, body::after { display: none !important; }
        body { background: #07090C !important; }
      `}</style>
      {children}
    </>
  )
}
