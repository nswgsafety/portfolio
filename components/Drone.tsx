export default function Drone() {
  return (
    <section id="drone" className="drone sec cv">
      <span className="numeral" aria-hidden="true">IV</span>
      <div className="moss moss--hang" aria-hidden="true" />
      <div className="moss moss--r" aria-hidden="true" />
      <div className="wrap case inner">
        <div className="two two--loose">
          <div className="block rv" style={{ gap: 22 }}>
            <span className="lab">Plate IV · UAV</span>
            <h2 className="h2 h2--case">Two drones, one claw, <span className="it">a maze full of animals</span></h2>
            <p className="read lede">In TSA&rsquo;s 2026 Safari Rescue challenge, you fly through a maze, find model animals, and pick them up with a claw. Our team built two identical quadcopters from parts, so a pilot can switch drones without relearning anything.</p>
            <p className="read">I did the soldering, designed the printed parts, tuned the flight controller, and flew as primary pilot.</p>
            <div className="kpis">
              <div><strong className="ink">6th</strong><span>in NJ, 2024</span></div>
              <div><strong>$1,027</strong><span>total build budget</span></div>
              <div><strong>10+ hrs</strong><span>stick time per pilot</span></div>
            </div>
          </div>
          <figure className="photos rv">
            <div className="ph ph--1"><img src="/img/claw-frame.webp" alt="Three-finger claw next to the drone frame, servo wire attached" width={978} height={1200} loading="lazy" decoding="async" /></div>
            <div className="ph ph--2"><img src="/img/drone-claw.webp" alt="Claw mounted under the drone with blue tri-blade propellers" width={1200} height={1120} loading="lazy" decoding="async" /></div>
            <div className="ph ph--3"><img src="/img/frame-top.webp" alt="Bare TBS Source One carbon fiber frame, top view" width={1154} height={1200} loading="lazy" decoding="async" /></div>
            <figcaption className="lab">Fig. 1&ndash;3 · Claw, assembled drone, bare frame</figcaption>
          </figure>
        </div>

        <div className="block">
          <h3 className="h3 rv">The build</h3>
          <div className="builds">
            <div className="build rv"><img src="/img/side-profile.webp" alt="Side view of the frame with standoffs, motors and wiring" width={1200} height={768} loading="lazy" decoding="async" /><div><span className="lab">01 · Frame + electronics</span><p>Carbon fiber sandwich frame. The ESC sits on soft-mount grommets right under the flight controller, which keeps high-current wiring short and centered.</p></div></div>
            <div className="build rv"><img src="/img/claw-frame.webp" alt="Gear-driven three-finger claw" width={978} height={1200} loading="lazy" decoding="async" /><div><span className="lab">02 · The claw</span><p>One servo turns a center gear that closes all three fingers. It holds objects up to about 60 mm across, tested with 20&ndash;80 g foam animals. Mapped to its own switch on AUX 3.</p></div></div>
            <div className="build rv"><img src="/img/landing-gear.webp" alt="3D printed A-frame landing gear leg" width={1200} height={1120} loading="lazy" decoding="async" /><div><span className="lab">03 · Landing gear</span><p>Printed PLA A-frames with 5.4 in of clearance. The claw hangs between the legs, so the drone can land while still holding an animal.</p></div></div>
          </div>
        </div>

        <div className="two two--narrow">
          <div className="panel panel--dark rv">
            <span className="panel__title">Specs (each drone)</span>
            <div className="specs">
              <div><span className="lab">Frame</span><span>TBS Source One V5, 5 in carbon fiber</span></div>
              <div><span className="lab">Flight ctrl</span><span>T-Motor F7 (STM32F722, MPU-6000)</span></div>
              <div><span className="lab">ESC</span><span>T-Motor F55A PRO II 4-in-1, bidirectional DShot300</span></div>
              <div><span className="lab">Motors</span><span>EMAX ECO II 2207 × 4</span></div>
              <div><span className="lab">Battery</span><span>Lumenier 1300 mAh 6S</span></div>
              <div><span className="lab">Firmware</span><span>Betaflight 4.4</span></div>
              <div><span className="lab">Weight</span><span>~620 g with battery</span></div>
              <div><span className="lab">Payload</span><span>~150 g</span></div>
              <div><span className="lab">Flight time</span><span>5&ndash;6 min loaded</span></div>
            </div>
          </div>
          <div className="panel panel--light rv">
            <span className="panel__title">What went wrong, and the fix</span>
            <div className="lesson"><strong>Gyro noise made the PIDs erratic.</strong><span>Soft-mounted the stack and turned on RPM-based notch filtering. Blackbox logs came back clean.</span></div>
            <div className="lesson"><strong>A loose wire hit a prop and cut the receiver antenna.</strong><span>Rebuilt the harness with shorter leads and tied everything to the frame.</span></div>
            <div className="lesson"><strong>The claw opened every time the drone armed.</strong><span>It was on the wrong AUX channel. Moved it to AUX 3 with its own switch.</span></div>
            <div className="lesson"><strong>The first landing legs flexed too much.</strong><span>Replaced straight legs with a stiffer, lighter printed A-frame.</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}
