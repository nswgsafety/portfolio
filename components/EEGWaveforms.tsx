// Two EEG waveform paths, each one 71px period repeated 8x so translateX(-284px)
// loops seamlessly. Rendered once; referenced elsewhere via <use href="#w1/#w2">.
export default function EEGWaveforms() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <path
          id="w1"
          fill="none"
          strokeWidth="2"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          d="M0 22 L14 22 L20 10 L26 36 L31 0 L37 30 L43 18 L50 24 L58 22 L71 22 L85 22 L91 10 L97 36 L102 0 L108 30 L114 18 L121 24 L129 22 L142 22 L156 22 L162 10 L168 36 L173 0 L179 30 L185 18 L192 24 L200 22 L213 22 L227 22 L233 10 L239 36 L244 0 L250 30 L256 18 L263 24 L271 22 L284 22 L298 22 L304 10 L310 36 L315 0 L321 30 L327 18 L334 24 L342 22 L355 22 L369 22 L375 10 L381 36 L386 0 L392 30 L398 18 L405 24 L413 22 L426 22 L440 22 L446 10 L452 36 L457 0 L463 30 L469 18 L476 24 L484 22 L497 22 L511 22 L517 10 L523 36 L528 0 L534 30 L540 18 L547 24 L555 22 L568 22"
        />
        <path
          id="w2"
          fill="none"
          strokeWidth="2"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          d="M0 58 L8 52 L16 63 L24 55 L33 67 L41 48 L50 62 L58 56 L66 61 L71 58 L79 52 L87 63 L95 55 L104 67 L112 48 L121 62 L129 56 L137 61 L142 58 L150 52 L158 63 L166 55 L175 67 L183 48 L192 62 L200 56 L208 61 L213 58 L221 52 L229 63 L237 55 L246 67 L254 48 L263 62 L271 56 L279 61 L284 58 L292 52 L300 63 L308 55 L317 67 L325 48 L334 62 L342 56 L350 61 L355 58 L363 52 L371 63 L379 55 L388 67 L396 48 L405 62 L413 56 L421 61 L426 58 L434 52 L442 63 L450 55 L459 67 L467 48 L476 62 L484 56 L492 61 L497 58 L505 52 L513 63 L521 55 L530 67 L538 48 L547 62 L555 56 L563 61 L568 58"
        />
      </defs>
    </svg>
  )
}
