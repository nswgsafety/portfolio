export default function Philosophy() {
  return (
    <section id="philosophy" className="philosophy sec cv">
      <span className="numeral" aria-hidden="true">VII</span>
      <div className="moss moss--r" aria-hidden="true" />
      <div className="moss moss--cl" aria-hidden="true" />
      <div className="wrap philosophy__grid inner">
        <div className="philosophy__copy rv">
          <span className="lab">Philosophy</span>
          <h2>Fear <span className="it">&amp;</span> Power</h2>
          <p className="read">I wrote a paper about what drives people. My argument is that fear comes first. I don&rsquo;t mean fear as a feeling. I mean the basic setup every living thing has for avoiding its own destruction. Power is whatever we build in response: strength, knowledge, friendships, laws, religions, whole civilizations.</p>
          <p className="read">I tested the idea against eight thinkers, answered the six strongest objections I could find, and wrote down where it stops working.</p>
          <div className="chips"><span className="chip">Plato</span><span className="chip">Machiavelli</span><span className="chip">Hobbes</span><span className="chip">Nietzsche</span><span className="chip">Adler</span><span className="chip">Dostoyevsky</span><span className="chip">Becker</span><span className="chip">Zlotnick</span></div>
          <a className="btn btn--ink" href="/fear-and-power.html">Read the paper <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
        </div>
        <a className="paper rv" href="/fear-and-power.html" aria-label="Open the Fear and Power paper">
          <div className="sheet sheet--back moss-bg" aria-hidden="true" />
          <div className="sheet sheet--front">
            <div className="sheet__head">
              <span className="lab">De · Philosophia</span>
              <span className="sheet__title">Fear<br /><span>&amp;</span><br />Power</span>
              <span className="sheet__rule" />
              <span className="sheet__sub">On the irreducible architecture of motivation, from the cellular to the civilizational.</span>
            </div>
            <ol className="toc">
              <li><span>I. The Ground State</span><span>3</span></li>
              <li><span>II. Power</span><span>5</span></li>
              <li><span>III. The Convergence</span><span>7</span></li>
              <li><span>IV. The Macro Architecture</span><span>9</span></li>
              <li><span>V. The Objections</span><span>11</span></li>
              <li><span>VI. The Honest Limits</span><span>13</span></li>
            </ol>
            <span className="lab sheet__by">Ian Andujar · 2026</span>
          </div>
        </a>
      </div>
      <blockquote className="wrap pull inner rv">
        <p>&ldquo;Power over oneself is the only form of power that does not require another person to lose.&rdquo;</p>
        <cite className="lab" style={{ fontStyle: 'normal' }}>From the conclusion of Fear &amp; Power</cite>
      </blockquote>
    </section>
  )
}
