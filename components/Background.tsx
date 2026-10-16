export default function Background() {
  return (
    <section id="background" className="background sec cv">
      <span className="numeral" aria-hidden="true">VIII</span>
      <div className="moss moss--l" aria-hidden="true" />
      <div className="ledge ledge--floor" aria-hidden="true" style={{ height: 64 }} />
      <div className="wrap inner">
        <div className="head rv">
          <div className="head__title"><h2 className="h2">Background</h2></div>
          <a className="btn btn--line" href="/Ian_Andujar_Resume.pdf" download>Download resume</a>
        </div>
        <div className="timeline rv">
          <span className="lab">How I got here</span>
          <div className="timeline__scroll">
            <ol>
              <li><span className="tuft" aria-hidden="true" /><span className="bod">Sept 2023</span><span>Start mechatronics at ATHS and dual enrollment at Bergen CC.</span></li>
              <li><span className="bod">2024</span><span>Our drone team takes 6th in New Jersey and qualifies for nationals.</span></li>
              <li><span className="bod">Oct 2024</span><span>Become TSA Club President. 20+ students, several teams.</span></li>
              <li><span className="tuft" aria-hidden="true" /><span className="bod">June 2026</span><span>Lead Researcher on the BCI project at Bergen.</span></li>
              <li><span className="bod">Sept 2026</span><span>Lab Assistant, in charge of the STEM Center&rsquo;s printers.</span></li>
              <li><span className="bod">2026</span><span>Finish Fear &amp; Power. Build two Safari Rescue drones.</span></li>
              <li className="now"><span className="tuft" aria-hidden="true" /><span className="bod">Now</span><span>President of my debate league. Looking for an internship.</span></li>
            </ol>
          </div>
        </div>
        <div className="boxes">
          <div className="box rv">
            <span className="lab">Education</span>
            <div className="entry"><span className="bod">Applied Technology High School</span><span className="muted">Mechatronics major · Sept 2023 to now</span><small>Engineering Design, CAD Modeling, Embedded Systems, Robotics, Manufacturing Processes. Project lead on 6+ engineering projects.</small></div>
            <div className="divider" />
            <div className="entry"><span className="bod">Bergen Community College</span><span className="muted">Dual enrollment · Sept 2023 to now</span></div>
          </div>
          <div className="box rv">
            <div className="cap cap--flip" aria-hidden="true" style={{ right: 14, width: '52%' }} />
            <span className="lab">Skills</span>
            <div className="chips"><span className="chip">AutoCAD</span><span className="chip">Fusion 360</span><span className="chip">Rapid prototyping</span><span className="chip">3D printing</span><span className="chip">Python</span><span className="chip">Microcontrollers</span><span className="chip">PCB design</span><span className="chip">Soldering</span><span className="chip">Embedded systems</span><span className="chip">Betaflight</span><span className="chip">Project management</span><span className="chip">Public speaking</span><span className="chip">Premiere Pro</span><span className="chip">Photoshop</span></div>
          </div>
          <div className="box rv">
            <span className="lab">Also</span>
            <div className="entry"><span className="muted">Certifications</span><b>Autodesk, CAD, NOCTI Engineering</b></div>
            <div className="entry"><span className="muted">Languages</span><b>English and Spanish, both fluent</b></div>
            <div className="entry"><span className="muted">Leadership</span><b>Debate league president, TSA president, Peer Leader</b></div>
          </div>
        </div>
      </div>
    </section>
  )
}
