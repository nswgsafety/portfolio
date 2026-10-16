import type { Metadata, Viewport } from 'next'
import { Bodoni_Moda, Syne, Instrument_Sans } from 'next/font/google'
import './globals.css'

// Self-hosted at build time by next/font — no runtime request to Google Fonts,
// no render-blocking <link>, automatic font-display: swap.
const bodoniModa = Bodoni_Moda({
  subsets: ['latin'],
  weight: 'variable',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-label',
  display: 'swap',
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ianandujar.com'),
  title: 'Ian Andujar',
  description: 'Ian Andujar is a mechatronics student in New Jersey: EEG brain-computer interface research, competition drones, a 3D printing lab, and debate.',
  openGraph: {
    type: 'website',
    url: 'https://ianandujar.com/',
    title: 'Ian Andujar',
    description: 'BCI research, competition drones, a 3D printing lab, and debate.',
    images: ['https://ianandujar.com/og.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    canonical: 'https://ianandujar.com/',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#12110F',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodoniModa.variable} ${syne.variable} ${instrumentSans.variable}`}>
      <head>
        {/* Show the loader once per session; skip it for reduced motion. Must run before paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem('ia-seen')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('no-loader');sessionStorage.setItem('ia-seen','1');}catch(e){}`,
          }}
        />
        {/* Detect low-RAM / low-core / data-saver devices and flag them before
            paint, so the expensive mix-blend-mode grain layer, the loader's
            one-time animation, and every decorative infinite loop animation
            never render in the first place instead of flashing on then
            getting paused. deviceMemory and the Network Information API are
            Chromium-only — this is a best-effort signal, not a guarantee,
            and fails safe (does nothing) everywhere it's unsupported. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var n=navigator,dm=n.deviceMemory,hc=n.hardwareConcurrency,c=n.connection,sd=c&&c.saveData,slow=c&&/2g/.test(c.effectiveType||'');if((dm&&dm<=4)||(hc&&hc<=2)||sd||slow){document.documentElement.classList.add('low-power','no-loader');}}catch(e){}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
