import type { Metadata } from 'next'
import './globals.css'
import SecretTerminal from '@/components/SecretTerminal'

export const metadata: Metadata = {
  metadataBase: new URL('https://ianandujar.com'),
  title: 'Ian Andujar — Engineering Student',
  description: 'Portfolio of Ian Andujar, engineering student, builder, and creative technologist.',
  openGraph: {
    title: 'Ian Andujar',
    description: 'Engineering Student · Builder · Creative Technologist',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ian Andujar',
    description: 'Engineering Student · Builder · Creative Technologist',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-color-scheme="light" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        <SecretTerminal />
        {children}
      </body>
    </html>
  )
}
