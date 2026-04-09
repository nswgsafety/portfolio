import type { Metadata } from 'next'
import './globals.css'
import BackgroundParticles from '@/components/BackgroundParticles'
import SecretTerminal from '@/components/SecretTerminal'

export const metadata: Metadata = {
  title: 'Ian Andujar — Engineering Student',
  description: 'Portfolio of Ian Andujar, engineering student, builder, and creative technologist.',
  openGraph: {
    title: 'Ian Andujar',
    description: 'Engineering Student · Builder · Creative Technologist',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-color-scheme="dark" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        <BackgroundParticles />
        <SecretTerminal />
        {children}
      </body>
    </html>
  )
}
