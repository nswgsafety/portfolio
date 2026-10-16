export default function Builds() {
  return (
    <section id="builds" className="builds sec cv">
      <span className="numeral" aria-hidden="true">V</span>
      <div className="moss moss--l" aria-hidden="true" />
      <div className="moss moss--cr" aria-hidden="true" />
      <div className="ledge ledge--floor" aria-hidden="true" style={{ height: 56 }} />
      <div className="wrap case inner">
        <div className="head rv">
          <div className="head__title"><span className="lab">More builds</span><h2 className="h2">On the <span className="it" style={{ color: 'var(--moss-ink)' }}>bench</span></h2></div>
        </div>
        <div className="builds__grid">
          <article className="bench rv">
            <div className="bench__vis bench__vis--pcb" data-dark data-loop>
              <svg viewBox="0 0 320 230" width="100%" height="100%" role="img" aria-label="Illustration of the EEG board layout: ADS1299 front end, ESP32-S3 module, USB-C and battery connectors">
                <rect x="34" y="14" width="252" height="190" rx="12" fill="#2F3A1A" stroke="#55692F" strokeWidth="2" />
                <g fill="#12110F" stroke="#C9A85A" strokeWidth="2"><circle cx="50" cy="30" r="6" /><circle cx="270" cy="30" r="6" /><circle cx="50" cy="188" r="6" /><circle cx="270" cy="188" r="6" /></g>
                <g fill="none" stroke="#C9A85A" strokeWidth="1.6" opacity=".7">
                  <path d="M56 72 H70 L84 64" /><path d="M56 84 H72 L84 78" /><path d="M56 96 H74 L84 92" /><path d="M56 108 H74 L84 106" /><path d="M56 120 H72 L84 120" />
                  <path d="M154 74 H172 L182 66 H190" /><path d="M154 88 H190" /><path d="M154 102 H172 L190 116" />
                  <path d="M119 126 V150 H150 L160 166 H196" /><path d="M164 196 V182 L180 166" /><path d="M239 172 V150" />
                </g>
                <path className="sig" d="M56 96 H74 L84 92" fill="none" stroke="#D3DB8F" strokeWidth="2.4" />
                <path className="sig" d="M154 88 H190" fill="none" stroke="#D3DB8F" strokeWidth="2.4" style={{ animationDelay: '-1.2s' }} />
                <rect x="40" y="60" width="16" height="72" rx="2" fill="#F5F1E8" />
                <rect x="84" y="56" width="70" height="70" fill="none" stroke="#C9A85A" strokeWidth="5" strokeDasharray="2 3" />
                <rect x="90" y="62" width="58" height="58" rx="2" fill="#1A1916" />
                <text x="119" y="94" textAnchor="middle" fontSize="9" fontFamily="Syne, sans-serif" fontWeight="700" fill="#A9A293">ADS1299</text>
                <rect x="190" y="46" width="80" height="96" rx="3" fill="#CFC8B9" /><rect x="190" y="46" width="80" height="20" rx="3" fill="#A9A293" />
                <text x="230" y="102" textAnchor="middle" fontSize="9" fontFamily="Syne, sans-serif" fontWeight="700" fill="#3A372F">ESP32-S3</text>
                <rect x="146" y="194" width="36" height="14" rx="5" fill="#A9A293" /><rect x="226" y="172" width="26" height="18" rx="2" fill="#F5F1E8" />
                <g fill="#C9A85A"><rect x="104" y="140" width="8" height="4" /><rect x="126" y="140" width="8" height="4" /><rect x="200" y="152" width="4" height="8" /></g>
                <text x="34" y="226" fontSize="10" fontFamily="Syne, sans-serif" fontWeight="700" letterSpacing="1.5" fill="#A9A293">32 × 42 MM · 4 LAYERS · 8 CH</text>
              </svg>
            </div>
            <div className="bench__body">
              <span className="lab">In design · BCIAMP1</span>
              <h3>8-channel EEG board</h3>
              <p>My own acquisition board for the BCI. A TI ADS1299 digitizes eight electrodes and streams them to an ESP32-S3, on a battery-powered 32 × 42 mm, 4-layer board. The goal is OpenBCI Cyton-level function, smaller and cheaper.</p>
              <div className="chips"><span className="chip">KiCad</span><span className="chip">ADS1299</span><span className="chip">ESP32-S3</span></div>
            </div>
          </article>
          <article className="bench rv">
            <div className="cap cap--flip" aria-hidden="true" style={{ right: 16, width: '44%' }} />
            <div className="bench__vis bench__vis--code" data-loop>
              <svg viewBox="0 0 300 170" style={{ width: '84%', height: 'auto' }} role="img" aria-label="A barcode with a scan line passing over it">
                <path d="M18 20h6v110h-6zM31 20h3v110h-3zM47 20h3v110h-3zM60 20h6v110h-6zM73 20h3v110h-3zM83 20h9v110h-9zM102 20h3v110h-3zM112 20h6v110h-6zM131 20h3v110h-3zM141 20h6v110h-6zM154 20h3v110h-3zM167 20h3v110h-3zM183 20h6v110h-6zM196 20h3v110h-3zM209 20h3v110h-3zM219 20h9v110h-9zM235 20h6v110h-6zM248 20h3v110h-3zM261 20h9v110h-9z" fill="#1A1916" />
                <rect className="scan" x="14" y="22" width="272" height="2.5" fill="#D9773F" />
                <text x="150" y="160" textAnchor="middle" fontSize="11" fontFamily="Syne, sans-serif" fontWeight="700" letterSpacing="3" fill="#5C574B">SCAN IN · SCAN OUT</text>
              </svg>
              <div className="tuft tuft--flip" aria-hidden="true" style={{ right: -8, bottom: 0, width: 120 }} />
            </div>
            <div className="bench__body">
              <span className="lab">Building</span>
              <h3>Barcode inventory system</h3>
              <p>Scan an item out and back in, or scan a category and pick what to take. It keeps track of what&rsquo;s running low on its own, so nobody has to count shelves.</p>
              <div className="chips"><span className="chip">Barcode scanning</span><span className="chip">Inventory</span><span className="chip">Labels</span></div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
