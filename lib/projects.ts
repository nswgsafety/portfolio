export interface ProjectDetail {
  slug: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  tags: string[]
  color: string
  year: string
  status: 'Completed' | 'In Progress' | 'Ongoing'
  github?: string
  live?: string
  images: string[]           // drop your image paths here when ready
  highlights: string[]       // key achievements / specs
  role: string
  timeline: string
  sections: {
    heading: string
    body: string
  }[]
}

export const projects: ProjectDetail[] = [
  {
    slug: 'fpv-competition-drone',
    title: 'FPV Competition Drone',
    subtitle: '2026 TSA Safari Rescue · Custom UAV Build',
    description: 'Built two custom FPV quadcopters for the 2026 TSA Safari Rescue competition. The challenge requires piloting UAVs through an obstacle course, locating simulated animals, and retrieving them with a custom claw mechanism.',
    longDescription: 'A fully custom FPV drone developed from scratch as team lead of a 6-member UAV team. Every component — from the carbon fiber frame to the 3D-printed motor mounts — was designed, fabricated, and tuned in-house.',
    tags: ['Fusion 360', 'Betaflight', '3D Printing', 'Embedded Systems', 'Precision Soldering', 'TBS Source One V5', 'T-Motor F7', 'EMAX ECO II 2207'],
    color: '#FF4D2E',
    year: '2026',
    status: 'Completed',
    role: 'Team Lead · Primary Pilot · Systems Engineer',
    timeline: 'Sept 2023 — March 2024',
    images: [],
    highlights: [
      '2026 TSA Safari Rescue competition',
      'Built two identical quadcopters for redundancy',
      'TBS Source One V5 carbon fiber frames',
      'T-Motor F7 flight controllers with Betaflight firmware',
      'EMAX ECO II 2207 brushless motors on 5-inch props',
      'Custom 3D-printed A-frame landing gear in PLA',
      'XT60 power connectors hand-soldered',
      'Claw mechanism for animal retrieval task',
    ],
    sections: [
      {
        heading: 'The Challenge',
        body: 'The 2026 TSA Safari Rescue event requires teams to pilot FPV quadcopters through an obstacle course, locate simulated animals, and retrieve them using a custom claw mechanism. Two identical drones were built for redundancy — ensuring competition-day reliability regardless of pre-flight damage.',
      },
      {
        heading: 'Design & Engineering',
        body: 'Both quadcopters are built on TBS Source One V5 carbon fiber frames, powered by T-Motor F7 flight controllers running Betaflight firmware, and driven by EMAX ECO II 2207 brushless motors on 5-inch props. PID tuning was iterated across dozens of test flights to achieve stable, responsive control through the obstacle course.',
      },
      {
        heading: 'Build Process',
        body: 'Assembly involved precision soldering of ESC stacks, motor leads, and XT60 power connectors — all hand-soldered to minimize weight and failure points. Custom 3D-printed A-frame landing gear was designed in PLA to provide stable ground clearance for the claw retrieval mechanism.',
      },
      {
        heading: 'Competition & Outcome',
        body: 'Both drones were completed and flown at the 2026 TSA Safari Rescue competition. Building two redundant platforms ensured the team had a competition-ready aircraft regardless of pre-flight incidents — a direct lesson learned from the 2024 season.',
      },
    ],
  },
  {
    slug: 'robotic-wrist-module',
    title: 'Robotic Wrist Module',
    subtitle: 'Bergen Community College — STEM Research Center',
    description: 'Engineering a 3-DOF wrist module for the BCC Robotic Arm Project that replicates all natural movements of the human wrist.',
    longDescription: 'An ongoing research and fabrication project at Bergen Community College\'s STEM Center. The goal is to design a compact wrist module with full flexion/extension, radial/ulnar deviation, and pronation/supination — matching the full kinematic range of the human wrist.',
    tags: ['Onshape', 'Servo Systems', 'Biomechanics', 'Rapid Prototyping', 'Research'],
    color: '#8B5CF6',
    year: '2025–Present',
    status: 'In Progress',
    role: 'Research Volunteer · Mechanical Designer',
    timeline: 'Sept 2025 — Present',
    images: [],
    highlights: [
      'Full 3-DOF wrist kinematics (flexion/extension, deviation, pronation)',
      'Servo alternative research for optimized torque-to-weight ratio',
      'Battery component analysis for power efficiency',
      'Onshape CAD modeling with iterative prototype testing',
      'Collaboration with BCC faculty and research team',
    ],
    sections: [
      {
        heading: 'Project Background',
        body: 'The BCC STEM Research Center\'s Robotic Arm Project aims to produce a biomimetic arm capable of replicating human dexterity. The wrist module is a critical subassembly — it must transmit force from the forearm to the hand while allowing multi-axis rotation without losing structural integrity.',
      },
      {
        heading: 'Design Goals',
        body: 'The module must replicate three independent axes of wrist motion: flexion/extension (palm up/down), radial/ulnar deviation (side to side), and pronation/supination (rotation). All three must operate simultaneously and independently, controlled by lightweight servo actuators within a compact envelope.',
      },
      {
        heading: 'Current Progress',
        body: 'Initial CAD models have been produced in Onshape, with the first physical prototypes in fabrication. Servo selection is being evaluated against torque requirements at full extension load. Battery research has identified candidate lithium polymer configurations that meet runtime targets without exceeding the arm\'s weight budget.',
      },
      {
        heading: 'Next Steps',
        body: 'Complete manufacturing of the first fully-assembled wrist prototype, conduct range-of-motion testing across all three axes, and document results for the research team. Integration with the elbow subassembly is planned once the wrist module passes load validation.',
      },
    ],
  },
  {
    slug: 'aths-tsa-website',
    title: 'ATHS TSA Club Website',
    subtitle: 'Club President Initiative · 2025',
    description: 'Launched the official ATHS TSA Club website to grow visibility, attract corporate sponsors, and document the club\'s engineering work.',
    longDescription: 'As elected club president, one of the first initiatives was creating a professional online presence for the ATHS TSA chapter — giving sponsors, students, and faculty a central hub to follow the club\'s projects, competitions, and opportunities.',
    tags: ['Web Development', 'Project Management', 'Leadership', 'Design'],
    color: '#3DBBFF',
    year: '2025',
    status: 'Ongoing',
    role: 'Project Lead · President',
    timeline: 'Jan 2025 — Present',
    images: [],
    highlights: [
      'First official web presence for the ATHS TSA chapter',
      'Supports corporate sponsorship outreach program',
      'Showcases 20+ student members and ongoing projects',
      'Increased recruitment and funding visibility',
    ],
    sections: [
      {
        heading: 'Why It Was Needed',
        body: 'The ATHS TSA chapter lacked any online presence, making it difficult to communicate with potential sponsors, recruit new members, or showcase the technical work being done. Without a public-facing platform, the club\'s funding opportunities were limited to word-of-mouth and in-school resources.',
      },
      {
        heading: 'What Was Built',
        body: 'A clean, professional site documenting the club\'s mission, current projects, competition history, and team. The site serves as the primary touch point for corporate sponsors evaluating whether to fund the club\'s engineering programs and competition entries.',
      },
      {
        heading: 'Impact',
        body: 'The website anchors the club\'s first formal corporate sponsorship pipeline, which is actively being developed. It has increased awareness of the TSA program within the school and created a platform for students to showcase their engineering work to colleges and employers.',
      },
    ],
  },
  {
    slug: 'cad-portfolio',
    title: 'CAD Design Portfolio',
    subtitle: 'Fusion 360 · AutoCAD · Onshape',
    description: 'A growing collection of precision mechanical models built across multiple CAD platforms — from drone frames to robotic assemblies.',
    longDescription: 'CAD modeling has been a core part of every engineering project. This portfolio captures standalone design work across Fusion 360, AutoCAD, and Onshape — ranging from competition hardware to explorative mechanical concepts.',
    tags: ['Fusion 360', 'AutoCAD', 'Onshape', 'Blender', 'Mechanical Design'],
    color: '#C8F050',
    year: '2023–Present',
    status: 'Ongoing',
    role: 'Designer',
    timeline: '2023 — Present',
    images: [],
    highlights: [
      'Drone frames optimized for aerodynamics and weight',
      'Custom motor mounts and brackets for competition hardware',
      'Wrist module kinematics modeling in Onshape',
      'Explorative mechanical linkage and gear studies',
    ],
    sections: [
      {
        heading: 'Tools & Approach',
        body: 'Fusion 360 is the primary tool for parametric mechanical design and simulation. AutoCAD handles precision 2D drafting and technical drawings. Onshape is used for collaborative work at the BCC STEM Center. Blender is used for concept visualization and rendering.',
      },
      {
        heading: 'Notable Models',
        body: 'The FPV drone frame assembly remains the most complex model to date — fully parametric with configurable motor spacing, arm length, and stack mounting patterns. More recently, the robotic wrist module has introduced multi-body kinematic design to the workflow.',
      },
      {
        heading: 'What\'s Next',
        body: 'Expanding into simulation-driven design — using Fusion 360\'s stress analysis and generative design tools to validate structural decisions before fabrication. Also exploring export pipelines for direct integration with 3D printing slicers.',
      },
    ],
  },
  {
    slug: '3d-print-experiments',
    title: '3D Print Lab',
    subtitle: 'FDM · Rapid Prototyping · Material Testing',
    description: 'Iterative rapid prototyping experiments pushing FDM printing toward engineering-grade applications — not just desktop trinkets.',
    longDescription: 'Every fabrication project starts with a prototype. This is a collection of 3D printing work focused on functional engineering parts: structural brackets, tolerance-fit mechanical assemblies, and material selection studies for load-bearing applications.',
    tags: ['3D Printing', 'FDM', 'PETG', 'PLA', 'Rapid Prototyping', 'Slicer Optimization'],
    color: '#F59E0B',
    year: '2023–Present',
    status: 'Ongoing',
    role: 'Fabricator · Designer',
    timeline: '2023 — Present',
    images: [],
    highlights: [
      'Custom drone components in PETG for impact resistance',
      'Tolerance-fit mechanical joints for robotic assemblies',
      'Multi-material prints for functional prototypes',
      'Slicer profile optimization for structural layer adhesion',
    ],
    sections: [
      {
        heading: 'Philosophy',
        body: 'Most 3D printing guides are written for decorative parts. The focus here is always functional — parts that need to survive vibration, impact, and load. That means getting serious about material selection, slicer settings, orientation, and infill strategy.',
      },
      {
        heading: 'Key Learnings',
        body: 'PETG outperforms PLA in nearly every structural application — better impact resistance, higher heat deflection, and less brittleness under cyclic stress. Print orientation matters more than infill percentage for tensile strength. Layer adhesion is the failure mode, not material bulk.',
      },
      {
        heading: 'Current Work',
        body: 'Developing wrist module prototypes for the BCC robotic arm — iterating on joint geometry, wall thickness, and press-fit tolerances. Each print cycle produces dimensional data that feeds back into the Onshape model.',
      },
    ],
  },
  {
    slug: 'arduino-projects',
    title: 'Arduino & Embedded Systems',
    subtitle: 'Arduino IDE · Sensors · Motor Control',
    description: 'A series of embedded systems builds — from sensor arrays and telemetry systems to motor control and real-time feedback loops.',
    longDescription: 'Embedded systems are at the heart of every mechanical project. This collection documents Arduino-based builds ranging from simple sensor reads to multi-axis motor control systems used in competition hardware.',
    tags: ['Arduino IDE', 'C++', 'Sensors', 'Motor Control', 'Telemetry', 'Embedded Systems'],
    color: '#FF4D2E',
    year: '2023–Present',
    status: 'Ongoing',
    role: 'Embedded Engineer',
    timeline: '2023 — Present',
    images: [],
    highlights: [
      'Flight controller tuning and firmware configuration (Betaflight)',
      'ESC calibration and motor control via PWM',
      'Sensor integration: IMU, barometer, GPS modules',
      'Real-time telemetry logging during flight tests',
    ],
    sections: [
      {
        heading: 'Background',
        body: 'Programming embedded systems is what ties mechanical engineering to real-world behavior. The Arduino ecosystem was the entry point — low barrier, massive community, and enough horsepower for most prototyping tasks. C++ for performance-critical loops, Python for rapid sensor testing.',
      },
      {
        heading: 'Drone Systems',
        body: 'The FPV drone project required deep work with flight controller firmware — configuring Betaflight PID loops, calibrating ESCs via PWM signal ranges, mapping RC channels, and tuning motor mixing for our specific frame geometry. All telemetry was logged via blackbox and analyzed post-flight.',
      },
      {
        heading: 'Robotic Applications',
        body: 'Current work involves servo control for the wrist module — mapping degree-of-freedom targets to PWM duty cycles, testing torque at various supply voltages, and experimenting with feedback control via potentiometer position sensing.',
      },
    ],
  },
  {
    slug: 'engineering-notebook',
    title: 'Engineering Notebook (ESN)',
    subtitle: 'ATHS · Documentation of Engineering Process',
    description: 'A semester-long engineering notebook documenting the full design, iteration, and testing process across multiple engineering challenges — from slingshot mechanisms to conveyor systems.',
    longDescription: 'The Engineering Student Notebook (ESN) captures the complete thought process behind engineering work: brainstorming, calculations, prototype iterations, test results, and lessons learned. Documented across a full semester starting September 2024.',
    tags: ['Documentation', 'Engineering Design', 'Prototyping', 'CAD', 'Systems Thinking'],
    color: '#3DBBFF',
    year: '2024–2025',
    status: 'Completed' as const,
    role: 'Engineer · Designer · Documentarian',
    timeline: 'Sept 2024 — Present',
    images: [
      '/source-material/engineering-notebooks/esn-notebook-page-01.png',
      '/source-material/engineering-notebooks/esn-notebook-page-03.png',
      '/source-material/engineering-notebooks/esn-notebook-page-10.png',
    ],
    highlights: [
      'Full design-build-test documentation cycle',
      'Multiple mechanisms: slingshot, conveyor belt, speed multiplier',
      'Calculations, diagrams, and iteration logs',
      'Pythagoras theorem applied to 3D print geometry calculations',
      'Component research: motors, sensors, servo systems',
    ],
    sections: [
      {
        heading: 'What It Is',
        body: 'The ESN is the full engineering paper trail — not just what was built, but how decisions were made. Every brainstorm, every failed prototype, every recalculation is captured. This is what real engineering process looks like before the polished deliverable.',
      },
      {
        heading: 'Projects Documented',
        body: 'The notebook covers multiple engineering challenges including a slingshot mechanism with servo-controlled release, a conveyor belt system with a trapdoor launcher, and a speed multiplier system with ultrasonic sensor activation. Each project went through multiple design iterations.',
      },
      {
        heading: 'Engineering Rigor',
        body: 'Every mechanism includes component selection rationale, timeline planning, safety considerations, and dimensional calculations. The Pythagorean theorem was applied to determine exact ramp dimensions for 3D printing. This level of documentation is the baseline for professional engineering work.',
      },
    ],
  },
]

export function getProject(slug: string): ProjectDetail | undefined {
  return projects.find(p => p.slug === slug)
}
