export default function Work() {
  return (
    <section id="work" className="sec" style={{ borderTop: '1px solid var(--rule)' }}>
      <span className="numeral" aria-hidden="true">II</span>
      <div className="moss moss--r" aria-hidden="true" />
      <div className="moss moss--cl" aria-hidden="true" />
      <div className="wrap work inner">
        <div className="head rv">
          <div className="head__title"><span className="lab">Plate II · Now</span><h2 className="h2">What I&rsquo;m working on</h2></div>
          <p style={{ maxWidth: 360 }}>Four things, all still going. Three have full write-ups further down.</p>
        </div>
        <div className="cards">
          <article className="card card--slab" data-dark style={{ ['--i' as string]: 0 }}>
            <div className="card__body">
              <span className="lab muted">01 · Research · June 2026 to now</span>
              <div className="card__text">
                <h3>EEG brain-computer interface</h3>
                <p className="read">A small neural network that spots movement in brain signals. It runs entirely on an ESP32 and drives a five-servo robotic hand over radio. I&rsquo;m the lead researcher, working with David Meyer.</p>
                <a className="cta lichen" href="#bci">Read the case study <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M7 2v10M7 12l-4-4M7 12l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
              </div>
            </div>
            <div className="channels" data-loop aria-hidden="true">
              <div className="channel"><span className="lab">CH1</span><svg viewBox="0 0 284 80" preserveAspectRatio="none"><g className="wave"><use href="#w1" stroke="#D3DB8F" /></g></svg></div>
              <div className="channel"><span className="lab">CH2</span><svg viewBox="0 0 284 80" preserveAspectRatio="none"><g className="wave wave--slow"><use href="#w1" stroke="#D9773F" /></g></svg></div>
              <div className="channel"><span className="lab">CH3</span><svg viewBox="0 0 284 80" preserveAspectRatio="none"><g className="wave"><use href="#w1" stroke="#ECE6D8" /></g></svg></div>
              <div className="channel"><span className="lab">CH4</span><svg viewBox="0 0 284 80" preserveAspectRatio="none"><g className="wave wave--slow"><use href="#w1" stroke="#8BA04E" /></g></svg></div>
            </div>
          </article>

          <article className="card card--paper" style={{ ['--i' as string]: 1 }}>
            <div className="card__body">
              <span className="lab">02 · Lab · Sept 2026 to now</span>
              <div className="card__text">
                <h3>STEM Research Center lab</h3>
                <p className="read">I&rsquo;m the lab assistant in charge of every 3D printer in the STEM Research Center at Bergen, plus the resin printer. I help college students and faculty with their research, and I&rsquo;m part of how the center decides which machines and supplies to buy.</p>
                <div className="chips"><span className="chip chip--light">FDM printing</span><span className="chip chip--light">Resin printing</span><span className="chip chip--light">Purchasing</span></div>
              </div>
            </div>
            <div className="print" data-loop aria-hidden="true">
              <div className="print__row"><span className="lab">01</span><span className="print__rail"><span className="print__bar" style={{ left: 0, right: 0, background: '#8BA04E', animationDelay: '0s' }} /></span></div>
              <div className="print__row"><span className="lab">02</span><span className="print__rail"><span className="print__bar" style={{ left: '6%', right: '18%', background: '#D9773F', animationDelay: '.32s' }} /></span></div>
              <div className="print__row"><span className="lab">03</span><span className="print__rail"><span className="print__bar" style={{ left: '12%', right: '12%', background: '#12110F', animationDelay: '.64s' }} /></span></div>
              <div className="print__row"><span className="lab">04</span><span className="print__rail"><span className="print__bar" style={{ left: 0, right: '6%', background: '#5C574B', animationDelay: '.96s' }} /></span></div>
              <div className="print__row"><span className="lab">05</span><span className="print__rail"><span className="print__bar" style={{ left: '6%', right: 0, background: '#8BA04E', animationDelay: '1.28s' }} /></span></div>
              <div className="print__row"><span className="lab">06</span><span className="print__rail"><span className="print__bar" style={{ left: '12%', right: '18%', background: '#D9773F', animationDelay: '1.6s' }} /></span></div>
              <div className="print__row"><span className="lab">07</span><span className="print__rail"><span className="print__bar" style={{ left: 0, right: '12%', background: '#12110F', animationDelay: '1.92s' }} /></span></div>
              <div className="print__row"><span className="lab">08</span><span className="print__rail"><span className="print__bar" style={{ left: '6%', right: '6%', background: '#5C574B', animationDelay: '2.24s' }} /></span></div>
              <div className="print__row"><span className="lab">09</span><span className="print__rail"><span className="print__bar" style={{ left: '12%', right: 0, background: '#8BA04E', animationDelay: '2.56s' }} /></span></div>
              <div className="print__row"><span className="lab">10</span><span className="print__rail"><span className="print__bar" style={{ left: 0, right: '18%', background: '#D9773F', animationDelay: '2.88s' }} /></span></div>
            </div>
          </article>

          <article className="card card--paper" style={{ ['--i' as string]: 2 }}>
            <div className="card__body">
              <span className="lab">03 · TSA · Oct 2024 to now</span>
              <div className="card__text">
                <h3>TSA club and drone team</h3>
                <p className="read">I lead my school&rsquo;s 20+ student TSA chapter. Our drone team placed 6th in New Jersey in 2024 and qualified for nationals. This year we built two drones with a claw for the Safari Rescue challenge.</p>
                <a className="cta" style={{ color: 'var(--moss-ink)' }} href="#drone">Read the case study <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M7 2v10M7 12l-4-4M7 12l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
              </div>
            </div>
            <div className="card__photo">
              <img src="/img/drone-claw.webp" alt="Drone with claw attached, blue propellers installed" width={1200} height={1120} loading="lazy" decoding="async" />
            </div>
          </article>

          <article className="card card--copper" style={{ ['--i' as string]: 3 }}>
            <div className="card__body">
              <span className="lab">04 · Debate · President</span>
              <div className="card__text">
                <h3>Debate league</h3>
                <p className="read">I&rsquo;m president of my debate league and I love it more than almost anything on this page. I build both sides of every motion, then mostly improvise once I&rsquo;m on the floor.</p>
                <a className="cta" href="#debate">Pick a side <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M7 2v10M7 12l-4-4M7 12l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
              </div>
            </div>
            <div className="sides" data-dark aria-hidden="true">
              <span className="ledge" style={{ display: 'block', left: 0, right: 0, bottom: 0, height: 44 }} />
              <div><span className="lab lichen">Prop</span><span className="bod">For.</span></div>
              <div><span className="lab copper">Opp</span><span className="bod">Against.</span></div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
