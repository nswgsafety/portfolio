import EEGWaveforms from '@/components/EEGWaveforms'
import Loader from '@/components/Loader'
import SiteEffects from '@/components/SiteEffects'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Work from '@/components/Work'
import BCI from '@/components/BCI'
import Drone from '@/components/Drone'
import Builds from '@/components/Builds'
import Debate from '@/components/Debate'
import Philosophy from '@/components/Philosophy'
import Background from '@/components/Background'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <div className="fly" aria-hidden="true" />
      <Loader />
      <div className="grain" aria-hidden="true" />
      <EEGWaveforms />

      <main id="main">
        <div className="sec">
          <div className="moss moss--l" aria-hidden="true" />
          <div className="moss moss--cr" aria-hidden="true" />
          <Header />
          <Hero />
          <div className="ledge ledge--floor" aria-hidden="true" style={{ height: 56 }} />
        </div>

        <Work />
        <BCI />
        <Drone />
        <Builds />
        <Debate />
        <Philosophy />
        <Background />
        <Contact />
      </main>

      <Footer />
      <SiteEffects />
    </>
  )
}
