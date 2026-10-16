export default function BCI() {
  return (
    <section id="bci" className="bci sec cv" data-dark>
      <span className="numeral numeral--dark" aria-hidden="true">III</span>
      <div className="moss moss--l" aria-hidden="true" />
      <div className="moss moss--cr" aria-hidden="true" />
      <div className="wrap case inner">
        <div className="intro rv">
          <div className="intro__title">
            <span className="lab lichen">Plate III · Research</span>
            <h2 className="h2 h2--case">Reading movement from brain signals, <span className="it">on a microcontroller</span></h2>
            <span className="muted">With David Meyer · Bergen Community College STEM Research Center</span>
          </div>
          <p className="read lede soft">Most brain-computer interfaces only work in a lab. They need clinical amplifiers and send brain data to the cloud to process it. We wanted to see how much of that we could cut. So we trained a small neural network to tell when someone moves, rewrote it in C, and ran it entirely on an ESP32 that controls a robotic hand.</p>
        </div>

        <div className="stats">
          <div className="stat rv"><strong className="lichen">0.90</strong>AUC for move vs rest, within subject</div>
          <div className="stat rv"><strong>9<small> of 21</small></strong>subjects met every deployment target</div>
          <div className="stat rv"><strong>99%</strong>of movements detected by the trigger</div>
          <div className="stat rv"><strong>29%</strong>of the ESP32&rsquo;s RAM used by the decoder</div>
        </div>

        <div className="block">
          <h3 className="h3 rv">How it works</h3>
          <ol className="steps">
            <li className="rv"><span className="bod">i.</span><strong>16 EEG channels</strong><span>Over the motor cortex, matched to what an OpenBCI board records.</span></li>
            <li className="rv"><span className="bod">ii.</span><strong>Clean + slice</strong><span>Band-pass 1–40 Hz, downsample to 128 Hz, cut into 250 ms windows.</span></li>
            <li className="rv"><span className="bod">iii.</span><strong>EEGNet decoder</strong><span>A compact CNN, trained per person and calibrated across sessions.</span></li>
            <li className="rv"><span className="bod">iv.</span><strong>Runs on an ESP32</strong><span>Ported to C. About 4 decisions a second, no cloud.</span></li>
            <li className="rv"><span className="bod">v.</span><strong>Smooth + trigger</strong><span>Moving average plus two thresholds, so noise doesn&rsquo;t fire the hand.</span></li>
            <li className="rv"><span className="bod">vi.</span><strong>Robotic hand</strong><span>A second ESP32 gets the command over ESP-NOW and moves five servos.</span></li>
          </ol>
        </div>

        <div className="two">
          <figure className="panel rv">
            <figcaption><span className="panel__title">The network beat both classical methods</span>Move vs rest, within subject. AUC from 0 to 1, dashed line is chance (0.5).</figcaption>
            <div className="bars">
              <div className="row" title="Riemannian: AUC 0.79"><span>Riemannian</span><span className="track"><span className="fill" style={{ ['--v' as string]: '79%' }} /></span><span>0.79</span></div>
              <div className="row" title="FBCSP + LDA: AUC 0.79"><span>FBCSP + LDA</span><span className="track"><span className="fill" style={{ ['--v' as string]: '79%' }} /></span><span>0.79</span></div>
              <div className="row" title="EEGNet: AUC 0.90"><span>EEGNet (ours)</span><span className="track"><span className="fill fill--lichen" style={{ ['--v' as string]: '90%' }} /></span><span>0.90</span></div>
            </div>
            <p>Two unrelated classical decoders landed on the same 0.79. That tells us the extra 0.11 came from what EEGNet learned, not from something in the data.</p>
          </figure>
          <figure className="panel rv">
            <figcaption><span className="panel__title">Real sessions are harder. We report that number anyway.</span>Same model, tested on a later session than it trained on.</figcaption>
            <div className="bars">
              <div className="row" title="Same session: AUC 0.90"><span>Same session</span><span className="track"><span className="fill" style={{ ['--v' as string]: '90%' }} /></span><span>0.90</span></div>
              <div className="row" title="New session, cold: AUC 0.70"><span>New session, cold</span><span className="track"><span className="fill fill--copper" style={{ ['--v' as string]: '70%' }} /></span><span>0.70</span></div>
              <div className="row" title="New session, aligned: AUC 0.77"><span>New session, aligned</span><span className="track"><span className="fill fill--lichen" style={{ ['--v' as string]: '77%' }} /></span><span>0.77</span></div>
            </div>
            <p>A cold transfer dropped to 0.70. Aligning each session&rsquo;s data and recalibrating per person brought it back to 0.77.</p>
          </figure>
        </div>

        <div className="two two--loose">
          <div className="block rv" style={{ gap: 20 }}>
            <span className="lab copper">The pivot</span>
            <h3 className="h3">Finger-level control <span className="it">hit a wall</span></h3>
            <p className="read soft">The original goal was to tell which finger moved. No subject got past about 0.60. The pattern was the interesting part: fingers that sit far apart on the hand were easier to separate than neighbors. That points at the 16-electrode layout, not the model. Three different decoders all hit the same ceiling.</p>
            <p className="read soft">So we switched to move vs rest. For a device someone actually uses, one reliable trigger beats four unreliable ones.</p>
          </div>
          <figure className="panel panel--basalt rv">
            <figcaption>Within-subject AUC per finger pair. Dashed line is chance.</figcaption>
            <div className="bars bars--tight">
              <div className="row"><span>Thumb · Pinky</span><span className="track"><span className="fill fill--pumice" style={{ ['--v' as string]: '60%' }} /></span><span>0.60</span></div>
              <div className="row"><span>Index · Pinky</span><span className="track"><span className="fill fill--pumice" style={{ ['--v' as string]: '59%' }} /></span><span>0.59</span></div>
              <div className="row"><span>Thumb · Middle</span><span className="track"><span className="fill fill--pumice" style={{ ['--v' as string]: '57%' }} /></span><span>0.57</span></div>
              <div className="row"><span>Middle · Pinky</span><span className="track"><span className="fill fill--pumice" style={{ ['--v' as string]: '56%' }} /></span><span>0.56</span></div>
              <div className="row"><span>Thumb · Index</span><span className="track"><span className="fill fill--pumice" style={{ ['--v' as string]: '53%' }} /></span><span>0.53</span></div>
              <div className="row"><span>Index · Middle</span><span className="track"><span className="fill fill--pumice" style={{ ['--v' as string]: '52%' }} /></span><span>0.52</span></div>
            </div>
          </figure>
        </div>

        <div className="two two--narrow">
          <div className="panel rv">
            <span className="panel__title">Who it works for</span>
            <div className="funnel">
              <div><span>Subjects enrolled</span><strong>21</strong></div>
              <div><span>Responders across sessions</span><strong>11</strong></div>
              <div><span>Ready to deploy</span><strong>9</strong></div>
            </div>
            <p>About half of people don&rsquo;t produce a strong enough motor signal for this kind of BCI. That&rsquo;s a known trait in the research, not a bug. So the device screens each person at setup and tells them up front, instead of handing them something that fails.</p>
          </div>
          <div className="panel rv">
            <span className="panel__title">Fitting it on the chip</span>
            <ul className="ticks">
              <li>Rewrote the trained network in C with its weights stored as constant arrays.</li>
              <li>Folded each batch-norm layer into one multiply-add per channel.</li>
              <li>Matched the reference model&rsquo;s output to within 1 × 10⁻⁸.</li>
              <li>The first layer needed 158 kB. I restructured the forward pass to keep peak memory under 100 kB, with no external RAM.</li>
              <li>Added a per-frame checksum after a fast serial link started corrupting windows.</li>
              <li>A second ESP32 receives open/close commands over ESP-NOW and drives five servos.</li>
            </ul>
          </div>
        </div>

        <div className="foot rv">
          <p className="read soft"><strong style={{ color: 'var(--bone)' }}>Next:</strong> an amplifier front end for live EEG, more electrodes over the hand, and a dataset recorded for finger-level decoding.</p>
          <a className="btn btn--ghost" href="/bci-paper.pdf">Read the full paper <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
        </div>
      </div>
    </section>
  )
}
