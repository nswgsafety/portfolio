'use client'

import { useState } from 'react'

interface Motion {
  motion: string
  frame: string
  prop: [string, string][]
  opp: [string, string][]
}

// Verbatim from Ian's case files — do not edit the copy.
const DEBATE: Motion[] = [
  {
    motion: 'The United States should prioritize military action over diplomatic engagement in combating Latin American drug cartels.',
    frame: 'Judge by what actually weakens cartel operations. Cartels are violent, non-diplomatic actors, so effectiveness is the standard, not how much diplomacy happens.',
    prop: [
      ['Cartels don’t negotiate.', 'They answer force with force. The DEA calls CJNG one of the most violent criminal organizations in the world.'],
      ['Targeted force has worked before.', 'Joint JSOC and DEA operations helped take apart the Medellín and Cali cartels in the 1990s.'],
      ['Today’s effort is too small to matter.', 'Reuters describes U.S. targeting help as “limited and episodic.” Prioritizing it would use tools the U.S. already has.'],
    ],
    opp: [
      ['Killing leaders creates vacuums.', 'CJNG grew out of the gaps left when Sinaloa commanders were removed. Something worse fills the space.'],
      ['It would wreck cooperation with Mexico.', 'Mexico has called proposed U.S. intervention a violation of sovereignty. Losing them means losing intel and extraditions.'],
      ['Civilians end up in the crossfire.', 'The Culiacán operations in 2019 and 2023 turned into city-wide gunfights around civilians.'],
    ],
  },
  {
    motion: 'The United States federal government should require technology companies to provide lawful access to encrypted communications.',
    frame: 'Does lawful access meaningfully help stop serious crime without eliminating encryption?',
    prop: [
      ['Default encryption makes warrants useless.', 'The FBI calls them “warrant-proof spaces.” A court order means nothing if no one can open the data.'],
      ['Targeted access isn’t mass surveillance.', 'Phone carriers already support lawful wiretaps under CALEA. The UK’s Investigatory Powers Act keeps encryption legal.'],
      ['Companies chose to lock themselves out.', 'That’s a design decision, not a law of physics, so it can be regulated.'],
    ],
    opp: [
      ['Any door in is a door for everyone.', 'WannaCry ran on leaked NSA tools. Salt Typhoon hackers got into lawful-intercept systems inside U.S. telecoms.'],
      ['Encryption protects journalists and dissidents.', 'Amnesty, the UN Special Rapporteur and RSF all call it essential for free speech.'],
      ['Mandates centralize data.', 'To comply, companies would have to keep keys they don’t hold today. One breach then exposes millions.'],
    ],
  },
  {
    motion: 'American hegemony does more harm than good for global stability.',
    frame: 'The legitimacy test: judge hegemony by measurable outcomes for people, not by the hegemon’s stated intentions.',
    prop: [
      ['The U.S. bends the rules it enforces.', 'It hasn’t ratified UNCLOS or the Rome Statute, and Iraq in 2003 bypassed the Security Council.'],
      ['Decline makes the handoff dangerous.', 'Power transitions are historically the most unstable periods: arms races, proxy wars, miscalculation.'],
      ['The system pulls value from poorer countries.', 'Dollar dominance and IMF austerity conditions favor creditors over local populations.'],
    ],
    opp: [
      ['It keeps the lights on for everyone.', 'Open sea lanes, alliances and institutions came with the longest great-power peace on record.'],
      ['The alternatives are worse.', 'China and Russia offer coercion, not consent. Multipolar eras ended in WWI and WWII.'],
      ['Decline is the real destabilizer.', 'Doubts about U.S. commitment line up with more aggression from rivals.'],
    ],
  },
]

const MOTION_LABELS = ['Foreign policy', 'Technology', 'Global order']
const MOTION_TITLES = [
  'Military action vs. diplomacy on cartels',
  'Lawful access to encrypted messages',
  'American hegemony and global stability',
]

export default function Debate() {
  const [motionIndex, setMotionIndex] = useState(0)
  const [side, setSide] = useState<'prop' | 'opp'>('prop')
  const d = DEBATE[motionIndex]
  const contentions = d[side]

  return (
    <section id="debate" className="debate sec" data-dark>
      <span className="numeral numeral--dark" aria-hidden="true">VI</span>
      <div className="moss moss--l" aria-hidden="true" />
      <div className="moss moss--cr" aria-hidden="true" />
      <div className="wrap case inner">
        <div className="intro rv">
          <div className="intro__title">
            <span className="lab copper">Debate</span>
            <h2>I love <span className="it copper">an argument.</span></h2>
          </div>
          <div className="block" style={{ gap: 16 }}>
            <p className="read lede soft">I&rsquo;m president of my debate league. On the floor I mostly improvise. The prep is where rounds get won: I set a frame, build every contention on both sides, and back each one with evidence.</p>
            <p className="read muted">Below are three motions from my case files. Pick one, pick a side.</p>
          </div>
        </div>

        <ol className="ares rv">
          <li><span className="bod">F</span><strong>Frame</strong><span>Set the standard the judge should use before arguing anything.</span></li>
          <li><span className="bod">A</span><strong>Assertion</strong><span>The claim, in one line.</span></li>
          <li><span className="bod">R</span><strong>Reasoning</strong><span>Why the claim is true.</span></li>
          <li><span className="bod">E</span><strong>Evidence</strong><span>Sources: DEA, Reuters, CISA, National Academies.</span></li>
          <li><span className="bod">S</span><strong>Significance</strong><span>Why it should decide the round.</span></li>
        </ol>

        <div className="arena rv">
          <div className="motions">
            <span className="lab muted">Motion</span>
            {MOTION_LABELS.map((label, i) => (
              <button
                key={i}
                className="tab"
                type="button"
                data-motion={i}
                aria-pressed={motionIndex === i}
                onClick={() => setMotionIndex(i)}
              >
                <span className="lab">{label}</span><strong>{MOTION_TITLES[i]}</strong>
              </button>
            ))}
          </div>
          <div className="board" data-side={side} aria-live="polite">
            <div className="cap cap--flip" aria-hidden="true" style={{ right: 18, width: '34%' }} />
            <div className="board__top">
              <span className="board__motion">&ldquo;{d.motion}&rdquo;</span>
              <div className="switch" role="group" aria-label="Side">
                <button type="button" data-side="prop" aria-pressed={side === 'prop'} onClick={() => setSide('prop')}>PROP</button>
                <button type="button" data-side="opp" aria-pressed={side === 'opp'} onClick={() => setSide('opp')}>OPP</button>
              </div>
            </div>
            {side === 'prop' && (
              <div className="frame"><span className="lab">Frame</span><span>{d.frame}</span></div>
            )}
            <ol className="contentions">
              {contentions.map(([title, body], i) => (
                <li key={`${motionIndex}-${side}-${i}`}>
                  <span className="bod">{i + 1}</span>
                  <div><strong>{title}</strong><span>{body}</span></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
