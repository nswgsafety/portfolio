export default function Hero() {
  return (
    <section id="top" className="wrap hero inner" aria-label="Intro">
      <div className="hero__copy">
        <h1 className="in" style={{ ['--d0' as string]: '.05s' }}><span className="first">Ian</span><span className="last">Andujar</span></h1>
        <p className="read in" style={{ ['--d0' as string]: '.2s' }}>I&rsquo;m a mechatronics student at Applied Technology High School and Bergen Community College. I lead an EEG research project that moves a robotic hand, build competition drones with my TSA team, run a lab full of 3D printers, and I&rsquo;m president of my debate league.</p>
        <div className="actions in" style={{ ['--d0' as string]: '.28s' }}>
          <a className="btn btn--ink" href="#work">See my work
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M7 2v10M7 12l-4-4M7 12l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          <a className="btn btn--line" href="#debate">Pick a side with me</a>
        </div>
      </div>

      <div className="stack" data-loop aria-label="Featured: debate, BCI research, TSA drone">
        <div className="plate plate--a">
          <span className="lab">Debate</span>
          <div className="plate__col"><span className="plate__big">Prop<br />or Opp?</span><span style={{ fontSize: 15, fontWeight: 500 }}>President of my debate league</span></div>
        </div>
        <div className="plate plate--b">
          <span className="lab muted">Research</span>
          <svg viewBox="0 0 284 80" width="100%" style={{ overflow: 'hidden' }} aria-hidden="true">
            <g className="wave"><use href="#w1" stroke="#D3DB8F" /></g>
            <g className="wave wave--slow"><use href="#w2" stroke="#D9773F" /></g>
          </svg>
          <div className="plate__col"><span className="plate__title">Brain-computer interface</span><span className="muted" style={{ fontSize: 15 }}>Lead Researcher, Bergen CC</span></div>
        </div>
        <div className="plate plate--c">
          <img src="/img/drone-claw.webp" alt="Team-built quadcopter with a three-finger claw and blue propellers" width={1200} height={1120} fetchPriority="high" />
          <span className="lab plate__tag">TSA drone · 2026</span>
          <span className="plate__note"><strong className="lichen">6th in NJ</strong> in 2024. Qualified for nationals.</span>
        </div>
      </div>
    </section>
  )
}
