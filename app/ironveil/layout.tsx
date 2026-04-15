import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IronVeil Research',
  description: 'Independent research at the intersection of engineering, defense, and financial intelligence.',
  openGraph: {
    title: 'IronVeil Research',
    description: 'A private research organization producing independent analysis on advanced engineering, defense technology, and financial intelligence.',
    url: 'https://ianandujar.com/ironveil',
    siteName: 'IronVeil Research',
    type: 'website',
    images: [
      {
        url: '/og-ironveil.png',
        width: 1200,
        height: 630,
        alt: 'IronVeil Research — Engineering · Defense · Intelligence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IronVeil Research',
    description: 'Independent analysis on advanced engineering, defense technology, and financial intelligence.',
    images: ['/og-ironveil.png'],
  },
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
