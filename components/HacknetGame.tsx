'use client'

import { useState, useRef, useEffect } from 'react'

// ── Dimensions ───────────────────────────────────────────────────────────────
const MAP_W     = 310
const CONTENT_H = 400
const HACKNET_W = 860

// ── Types ────────────────────────────────────────────────────────────────────
type NodeType = 'router' | 'server' | 'database' | 'firewall' | 'workstation'
type NodeState = 'hidden' | 'discovered' | 'probed' | 'cracked'
type MiniGameType = 'decrypt' | 'crack' | 'inject' | 'ctf'

interface HFile {
  name: string
  content: string
  classified: boolean
  crown?: boolean
  value: number
  encrypted?: boolean
}

interface Challenge {
  type: 'decrypt' | 'crack' | 'inject'
  poolIdx: number
  reward: number
}

interface HNode {
  id: string
  ip: string
  hostname: string
  type: NodeType
  sec: number
  vulns: string[]
  files: HFile[]
  linked: string[]
  state: NodeState
  isHoneypot?: boolean
  isVault?: boolean
  isPivot?: boolean
  challenge?: Challenge
  backdoor?: boolean
}

interface HNet {
  subnet: string
  nodes: Record<string, HNode>
  order: string[]
  current: string
  loot: string[]
}

interface HLine {
  id: number
  type: 'cmd' | 'out' | 'err' | 'sys' | 'warn' | 'ok'
  text: string
}

interface MiniGame {
  type: MiniGameType
  title: string
  encoded?: string
  hint?: string
  answer?: string
  hash?: string
  algorithm?: string
  hashHint?: string
  choices?: string[]
  correctIdx?: number
  queryTemplate?: string
  injectChoices?: string[]
  injectCorrect?: number
  injectHint?: string
  ctfHint?: string
  reward: number
  nodeId: string
  attemptsLeft?: number
}

// ── Upgrades ─────────────────────────────────────────────────────────────────
const UPGRADES: Record<string, { id: string; name: string; desc: string; cost: number; requires?: string }> = {
  exploit_boost:  { id: 'exploit_boost',  name: 'EXPLOIT_MODULE v2', desc: '+20% exploit success rate',           cost: 500 },
  exploit_boost2: { id: 'exploit_boost2', name: 'EXPLOIT_MODULE v3', desc: '+40% exploit success rate (total)',   cost: 1200, requires: 'exploit_boost' },
  exploit_boost3: { id: 'exploit_boost3', name: 'EXPLOIT_MODULE v4', desc: '+60% exploit success (total), instant', cost: 2000, requires: 'exploit_boost2' },
  deep_probe:     { id: 'deep_probe',     name: 'DEEP_SCAN',         desc: 'Probe reveals all vulns + honeypot',  cost: 300 },
  wide_scan:      { id: 'wide_scan',      name: 'SCANNER_PRO',       desc: 'Scan reaches 2 hops',                cost: 450 },
  ghost_protocol: { id: 'ghost_protocol', name: 'GHOST_PROTOCOL',    desc: 'Honeypots do not trigger alerts',     cost: 700 },
  fast_exfil:     { id: 'fast_exfil',     name: 'FAST_EXFIL',        desc: 'Exfiltration is instant',             cost: 400 },
  market_access:  { id: 'market_access',  name: 'MARKET_ACCESS',     desc: 'Sell files for +50% value',           cost: 600 },
  vault_breaker:  { id: 'vault_breaker',  name: 'VAULT_BREAKER',     desc: 'Skip vault decryption puzzles',       cost: 800 },
  neural_mapper:  { id: 'neural_mapper',  name: 'NEURAL_MAPPER',     desc: 'Probe reveals partial file listing',  cost: 650 },
  tracer_sense:   { id: 'tracer_sense',   name: 'TRACER_SENSE',      desc: 'See tracer position on the map',      cost: 350 },
  signal_jammer:  { id: 'signal_jammer',  name: 'SIGNAL_JAMMER',     desc: 'Alert drops 1 level after 60s idle',  cost: 900 },
}

// ── Base (defensive) upgrades ─────────────────────────────────────────────────
const BASE_UPGRADES: Record<string, { id: string; name: string; desc: string; cost: number }> = {
  vpn_hop:     { id: 'vpn_hop',     name: 'VPN_HOP',      desc: 'Tracer moves 35% slower',                  cost: 400 },
  decoy_nodes: { id: 'decoy_nodes', name: 'DECOY_NODES',  desc: '30% chance tracer hits dead end per hop',  cost: 600 },
  firewall_v2: { id: 'firewall_v2', name: 'FIREWALL_v2',  desc: 'Exploits never raise alert on success',    cost: 500 },
  proxy_chain: { id: 'proxy_chain', name: 'PROXY_CHAIN',  desc: 'Tracer resets to start when you reboot',   cost: 750 },
  kill_switch: { id: 'kill_switch', name: 'KILL_SWITCH',  desc: 'One-time instant remote tracer kill',      cost: 900 },
}

// ── Mini-game pools ──────────────────────────────────────────────────────────
const DECRYPT_POOL = [
  { encoded: '48 61 63 6b 74 68 65 50 6c 61 6e 65 74 21', hint: 'Hex → ASCII (space-separated bytes)', answer: 'HackthePlanet!', reward: 400 },
  { encoded: 'SYNT{ebg_guvegrra_rnfl}', hint: 'ROT-13 decode this string', answer: 'FLAG{rot_thirteen_easy}', reward: 350 },
  { encoded: 'RkxBR3tiNjRfaXNfZnVufQ==', hint: 'Base64 decode', answer: 'FLAG{b64_is_fun}', reward: 380 },
  { encoded: '01000110 01001100 01000001 01000111 01111011 01100010 01101001 01101110 01111101', hint: 'Binary → ASCII (8-bit groups)', answer: 'FLAG{bin}', reward: 420 },
  { encoded: '}terces_eht_dnif{GALF', hint: 'Something is reversed here...', answer: 'FLAG{find_the_secret}', reward: 300 },
  { encoded: '&#71;&#72;&#79;&#83;&#84;&#78;&#69;&#84;', hint: 'Decode HTML character entities', answer: 'GHOSTNET', reward: 460 },
  { encoded: '0x47 0x52 0x45 0x45 0x4e 0x48 0x41 0x54', hint: 'Hex values → ASCII (0x prefix, space separated)', answer: 'GREENHAT', reward: 440 },
  { encoded: 'Ymxhel9pdF9pcw==', hint: 'Base64 → plain text', answer: 'blaz_it_is', reward: 390 },
]

const CRACK_POOL = [
  { hash: '5f4dcc3b5aa765d61d8327deb882cf99', algorithm: 'MD5', hashHint: '8 chars, extremely common password', choices: ['password', 'letmein', 'qwerty123', 'hunter2'], correctIdx: 0, reward: 450 },
  { hash: 'e10adc3949ba59abbe56e057f20f883e', algorithm: 'MD5', hashHint: '6 digits, most common numeric pin', choices: ['111111', '123456', '654321', '000000'], correctIdx: 1, reward: 350 },
  { hash: '7c4a8d09ca3762af61e59520943dc26494f8941b', algorithm: 'SHA-1', hashHint: 'top-row keyboard pattern', choices: ['qwerty', '12345678', 'abc123', 'iloveyou'], correctIdx: 0, reward: 500 },
  { hash: 'd-3ad-b33f-hunter2-md5', algorithm: 'MD5', hashHint: 'famous IRC password — obscured by *s', choices: ['hunter2', 'correcthorsebatterystaple', 'Tr0ub4dor&3', 'solarwinds123'], correctIdx: 0, reward: 400 },
  { hash: 'aab3238922bcc25a6f606eb525ffdc56', algorithm: 'MD5', hashHint: 'single digit number above 1', choices: ['1', '2', '3', '0'], correctIdx: 2, reward: 300 },
  { hash: '21232f297a57a5a743894a0e4a801fc3', algorithm: 'MD5', hashHint: '5 chars — classic default credential', choices: ['admin', 'root', 'guest', 'user'], correctIdx: 0, reward: 480 },
]

const INJECT_POOL = [
  {
    queryTemplate: "SELECT * FROM users WHERE username='[?]' AND password='...'",
    injectHint: "Terminate the username string and comment out the password check. Goal: log in as admin.",
    injectChoices: ["admin'--", "' OR '1'='1", "admin; DROP TABLE users--", "1 UNION SELECT * FROM users"],
    injectCorrect: 0,
    reward: 550,
  },
  {
    queryTemplate: "SELECT id FROM accounts WHERE pin=[?] AND user_id=42",
    injectHint: "No quotes needed — it's an integer field. Make the WHERE clause always true.",
    injectChoices: ["1 OR 1=1", "'; DELETE FROM accounts--", "NULL", "1; EXEC xp_cmdshell('whoami')"],
    injectCorrect: 0,
    reward: 500,
  },
  {
    queryTemplate: "UPDATE users SET role='user' WHERE id=[?]",
    injectHint: "Escalate ALL users to admin in a single injected statement.",
    injectChoices: ["1 OR 1=1", "0; UPDATE users SET role='admin' WHERE 1=1--", "42", "NULL OR role='admin'"],
    injectCorrect: 1,
    reward: 600,
  },
  {
    queryTemplate: "SELECT notes FROM diary WHERE owner='[?]' ORDER BY date",
    injectHint: "Use UNION to read a different table's contents instead.",
    injectChoices: ["' UNION SELECT passwd FROM shadow--", "' OR 1=1--", "admin'#", "' AND sleep(5)--"],
    injectCorrect: 0,
    reward: 650,
  },
  {
    queryTemplate: "DELETE FROM sessions WHERE token='[?]'",
    injectHint: "Don't delete one session — delete ALL sessions for maximum disruption.",
    injectChoices: ["x' OR '1'='1", "' OR 1=1--", "NULL", "x'; DELETE FROM sessions WHERE '1'='1"],
    injectCorrect: 3,
    reward: 700,
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────
const rand = (n: number) => Math.floor(Math.random() * n)

function randomHex(len: number): string {
  return Array.from({ length: len }, () => Math.floor(Math.random() * 16).toString(16)).join('')
}

function fileValue(file: HFile, nodeSec: number): number {
  if (!file.classified) return 0
  if (file.crown) return 2000
  return Math.floor(150 + nodeSec * 100 + Math.random() * 150)
}

function effectiveChance(sec: number, ups: Set<string>): number {
  let base = [100, 78, 52, 28, 10][Math.min(sec - 1, 4)]
  if (ups.has('exploit_boost'))  base += 20
  if (ups.has('exploit_boost2')) base += 20
  if (ups.has('exploit_boost3')) base += 20
  return Math.min(99, base)
}

function alertColor(level: number): string {
  if (level === 0) return 'rgba(201,164,85,0.5)'
  if (level === 1) return 'rgba(234,179,8,0.8)'
  if (level === 2) return 'rgba(249,115,22,0.9)'
  return '#ef4444'
}

function alertLabel(level: number): string {
  return ['CLEAR', 'LOW', 'HIGH', 'CRITICAL'][level] ?? 'CRITICAL'
}

// ── Node symbol helpers ───────────────────────────────────────────────────────
function nodeSymbol(n: HNode): string {
  if (n.isHoneypot) return '⚠'
  if (n.state === 'cracked') return '◉'
  if (n.state === 'probed' || n.state === 'discovered') return '◈'
  return '○'
}

function nodeStrokeColor(n: HNode): string {
  if (n.isHoneypot) return '#f97316'
  if (n.isVault) return '#a78bfa'
  if (n.isPivot) return '#38bdf8'
  if (n.state === 'cracked') return '#22C55E'
  if (n.state === 'probed')  return '#eab308'
  if (n.state === 'discovered') return 'rgba(201,164,85,0.45)'
  return 'rgba(201,164,85,0.1)'
}

function nodeFillColor(n: HNode): string {
  if (n.isHoneypot) return 'rgba(249,115,22,0.12)'
  if (n.isVault) return 'rgba(167,139,250,0.10)'
  if (n.isPivot) return 'rgba(56,189,248,0.10)'
  if (n.state === 'cracked') return 'rgba(201,164,85,0.18)'
  if (n.state === 'probed')  return 'rgba(234,179,8,0.12)'
  if (n.state === 'discovered') return 'rgba(201,164,85,0.05)'
  return 'rgba(201,164,85,0.02)'
}

function secColor(s: number): string {
  if (s <= 1) return '#22C55E'
  if (s <= 2) return '#4ade80'
  if (s <= 3) return '#eab308'
  if (s <= 4) return '#f97316'
  return '#ef4444'
}

// ── File pools ────────────────────────────────────────────────────────────────
const HOSTNAMES = [
  'gateway', 'mail-srv', 'db-primary', 'auth-srv', 'admin-panel',
  'backup-srv', 'monitor', 'vpn-gate', 'proxy', 'dev-box',
  'ci-server', 'log-agg', 'payroll-db', 'secret-vault',
]
const VULNS = [
  'CVE-2024-1337: buffer overflow in sshd',
  'CVE-2024-2048: SQL injection via login form',
  'CVE-2023-9981: auth bypass — null session cookie',
  'default credentials (admin:admin123)',
  'CVE-2024-5501: RCE via Java deserialization',
  'CVE-2024-0012: path traversal in file upload',
  'unencrypted FTP service running on port 21',
  'CVE-2023-44487: HTTP/2 rapid reset attack',
  'CVE-2024-3094: XZ utils backdoor (affected binary)',
  'open SNMP community string "public"',
  'CVE-2023-20198: Cisco IOS-XE web UI exploit',
  'outdated OpenSSL 1.0.1 (heartbleed-adjacent)',
]

const FILE_POOLS: Record<string, Omit<HFile, 'value'>[]> = {
  database: [
    { name: 'users.db',         classified: true,  content: 'USER TABLE: 4,821 records\nSHA-256 hashed passwords (salted)\nPII: email, name, DOB, credit card (last 4)' },
    { name: 'transactions.log', classified: true,  content: '2024-11-14 09:23  txn_id=A9F23  $14,200.00\n2024-11-14 09:31  txn_id=B01F3  $8,750.50\n[+2,341 more entries redacted]' },
    { name: 'schema.sql',       classified: false, content: 'CREATE TABLE users (id INT PRIMARY KEY, email VARCHAR(255), passwd_hash VARCHAR(64));\nCREATE TABLE sessions (token VARCHAR(128), uid INT, expires BIGINT);' },
    { name: 'backup.sh',        classified: false, content: '#!/bin/bash\nmysqldump -u root -p$DB_PASS prod_db > /backup/$(date +%Y%m%d).sql\ncron: 0 4 * * *' },
  ],
  router: [
    { name: 'network_map.txt',    classified: false, content: 'SUBNET: __SUBNET__.0/24\nGATEWAY: __SUBNET__.1\nDNS: __SUBNET__.1, 8.8.8.8\nVLANs: 10 (internal), 20 (dmz), 99 (mgmt)' },
    { name: 'firewall_rules.conf', classified: true,  content: 'ALLOW 443 → ANY\nALLOW 22  → __SUBNET__.0/24\nDROP  23  → ANY\nALLOW 3306 → __SUBNET__.4\n[CLASSIFIED RULE #14 REDACTED]' },
    { name: 'access.log',          classified: false, content: '__SUBNET__.9  → DENIED  (port 22, bad key)\n__SUBNET__.14 → ALLOWED (port 443)\n185.x.x.x    → DROPPED (port scan detected)' },
  ],
  server: [
    { name: 'config.env',  classified: true,  content: 'DB_HOST=__SUBNET__.4\nDB_USER=app_user\nDB_PASS=[REDACTED]\nSECRET_KEY=[REDACTED]\nENV=production' },
    { name: 'deploy.sh',   classified: false, content: '#!/bin/bash\ngit pull origin main\ndocker-compose build --no-cache\ndocker-compose up -d' },
    { name: 'app.log',     classified: false, content: '[INFO]  Server started on :8080\n[WARN]  DB connection pool exhausted\n[ERROR] JWT secret mismatch — 3 failed auths' },
  ],
  firewall: [
    { name: 'policy.conf',   classified: false, content: 'DEFAULT POLICY: DROP\nZONE internal → external: ALLOW 80,443,53\nZONE mgmt: ALLOW 22 FROM __SUBNET__.1 ONLY' },
    { name: 'incidents.log', classified: true,  content: '2024-11-09: port scan 185.x.x.x — BLOCKED\n2024-11-11: SSH brute force (347 attempts) — BLOCKED\n2024-11-13: data exfil attempt (500MB outbound) — FLAGGED' },
  ],
  workstation: [
    { name: 'notes.txt',       classified: false, content: 'TODO: rotate DB passwords (2 weeks overdue!)\nMeeting Mon 3pm — Q4 budget review\nDO NOT commit .env to git!!!' },
    { name: 'credentials.bak', classified: true,  content: 'SSH key passphrase: hunter2  ← CHANGE THIS\nAdmin panel: admin / P@ssw0rd123 (TEMP)\nDB read-only: readonly / readonly' },
    { name: '.bash_history',   classified: false, content: 'ssh admin@__SUBNET__.2\nscp classified.zip user@__SUBNET__.9:/tmp/\nrm -rf ~/.bash_history  # oops too late' },
  ],
}

function genFiles(type: string, subnet: string): HFile[] {
  const pool = FILE_POOLS[type] || FILE_POOLS.server
  const count = 2 + rand(2)
  return pool.slice(0, count).map(f => ({
    ...f,
    value: 0, // computed later
    content: f.content.replace(/__SUBNET__/g, subnet),
  }))
}

// ── Network generation ────────────────────────────────────────────────────────
function genNetwork(): HNet {
  const a = rand(254) + 1, b = rand(254) + 1
  const subnet = `10.${a}.${b}`
  const count = 10 + rand(4)  // 10-13 nodes
  const types: NodeType[] = ['router', 'server', 'database', 'firewall', 'workstation']
  const hostPool = [...HOSTNAMES].sort(() => Math.random() - 0.5)

  const nodes: Record<string, HNode> = {}
  const order: string[] = []

  for (let i = 0; i < count; i++) {
    const id = `n${i}`
    const type: NodeType = i === 0 ? 'router' : types[rand(types.length)]
    const sec = i === 0 ? 1 : Math.max(1, Math.min(5, 1 + Math.floor(i / 3) + rand(2)))
    const vulnCount = Math.max(1, 5 - sec + rand(2))
    const vulns = [...VULNS].sort(() => Math.random() - 0.5).slice(0, vulnCount)
    nodes[id] = {
      id, ip: `${subnet}.${i + 1}`,
      hostname: hostPool[i] || `node-${i}`,
      type, sec, vulns,
      files: genFiles(type, subnet),
      linked: [],
      state: i === 0 ? 'cracked' : i < 3 ? 'discovered' : 'hidden',
    }
    order.push(id)
  }

  // Chain topology
  for (let i = 0; i < count - 1; i++) {
    nodes[order[i]].linked.push(order[i + 1])
    nodes[order[i + 1]].linked.push(order[i])
  }
  // Random cross-links
  for (let i = 0; i < Math.floor(count / 3); i++) {
    const ai = rand(count), bi = rand(count)
    if (ai !== bi && !nodes[order[ai]].linked.includes(order[bi])) {
      nodes[order[ai]].linked.push(order[bi])
      nodes[order[bi]].linked.push(order[ai])
    }
  }

  // Designate honeypot: low-sec, tempting type
  const honeypotCandidates = order.filter(id => id !== 'n0' && nodes[id].sec <= 2 && ['server','workstation'].includes(nodes[id].type))
  if (honeypotCandidates.length > 0) {
    const hid = honeypotCandidates[rand(honeypotCandidates.length)]
    nodes[hid].isHoneypot = true
  }

  // Designate vaults (1-2 database nodes)
  const vaultCandidates = order.filter(id => nodes[id].type === 'database')
  const vaultCount = Math.min(2, vaultCandidates.length)
  for (let i = 0; i < vaultCount; i++) {
    nodes[vaultCandidates[i]].isVault = true
    nodes[vaultCandidates[i]].sec = Math.max(nodes[vaultCandidates[i]].sec, 3)
    // Encrypt files
    nodes[vaultCandidates[i]].files = nodes[vaultCandidates[i]].files.map(f =>
      f.classified ? { ...f, encrypted: true } : f
    )
    // Assign decrypt challenge
    const poolIdx = rand(DECRYPT_POOL.length)
    nodes[vaultCandidates[i]].challenge = { type: 'decrypt', poolIdx, reward: DECRYPT_POOL[poolIdx].reward }
  }

  // Designate pivot (mid-high sec)
  const pivotCandidates = order.filter(id => !nodes[id].isHoneypot && !nodes[id].isVault && nodes[id].sec >= 2 && nodes[id].sec <= 4)
  if (pivotCandidates.length > 0) {
    const pid = pivotCandidates[rand(pivotCandidates.length)]
    nodes[pid].isPivot = true
  }

  // Add crack challenges to some non-vault, non-honeypot nodes
  const crackCandidates = order.filter(id => !nodes[id].isVault && !nodes[id].isHoneypot && !nodes[id].isPivot && nodes[id].sec >= 2)
  if (crackCandidates.length > 0) {
    const cid = crackCandidates[rand(crackCandidates.length)]
    const poolIdx = rand(CRACK_POOL.length)
    nodes[cid].challenge = { type: 'crack', poolIdx, reward: CRACK_POOL[poolIdx].reward }
  }

  // Add inject challenges to database nodes without vault
  const injectCandidates = order.filter(id => nodes[id].type === 'database' && !nodes[id].isVault)
  for (const iid of injectCandidates) {
    const poolIdx = rand(INJECT_POOL.length)
    if (!nodes[iid].challenge) {
      nodes[iid].challenge = { type: 'inject', poolIdx, reward: INJECT_POOL[poolIdx].reward }
    }
  }

  // Crown jewel on hardest node
  const hardestId = order.reduce((a, b) => nodes[a].sec >= nodes[b].sec ? a : b)
  nodes[hardestId].files.push({
    name: 'crown_jewel.enc',
    classified: true, crown: true, value: 2000,
    content: '[CLASSIFICATION: ULTRA SECRET]\n\nOPERATION GHOSTNET — PHASE 3 COMPLETE\n\nAll target nodes compromised.\nData exfiltrated successfully.\n\n> MISSION ACCOMPLISHED, OPERATOR.',
  })

  // Pre-compute file values
  for (const node of Object.values(nodes)) {
    for (const f of node.files) {
      if (f.classified && f.value === 0) {
        f.value = fileValue(f, node.sec)
      }
    }
  }

  return { subnet, nodes, order, current: order[0], loot: [] }
}

// ── SVG layout ────────────────────────────────────────────────────────────────
function layoutNodes(net: HNet, W: number, H: number): Record<string, { x: number; y: number }> {
  const levels: Record<string, number> = {}
  const entry = net.order[0]
  const queue = [entry]
  levels[entry] = 0
  while (queue.length) {
    const id = queue.shift()!
    for (const nid of net.nodes[id].linked) {
      if (levels[nid] === undefined) {
        levels[nid] = levels[id] + 1
        queue.push(nid)
      }
    }
  }
  net.order.forEach((id, i) => { if (levels[id] === undefined) levels[id] = i })

  const byLevel: Record<number, string[]> = {}
  for (const [id, lvl] of Object.entries(levels)) {
    if (!byLevel[lvl]) byLevel[lvl] = []
    byLevel[lvl].push(id)
  }
  const maxLevel = Math.max(...Object.keys(byLevel).map(Number))
  const positions: Record<string, { x: number; y: number }> = {}

  for (const [lvlStr, ids] of Object.entries(byLevel)) {
    const lvl = parseInt(lvlStr)
    const x = 32 + (maxLevel === 0 ? W * 0.5 : (lvl / maxLevel) * (W - 64))
    ids.forEach((id, i) => {
      const y = (H / (ids.length + 1)) * (i + 1)
      positions[id] = { x, y }
    })
  }
  return positions
}

// ── Style constants ───────────────────────────────────────────────────────────
const MONO: React.CSSProperties = { fontFamily: '"DM Mono", monospace' }
const LC: Record<string, string> = {
  cmd:  '#22C55E',
  out:  'rgba(201,164,85,0.7)',
  err:  '#ef4444',
  sys:  'rgba(201,164,85,0.38)',
  warn: '#eab308',
  ok:   '#4ade80',
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function HacknetGame({ onExit }: { onExit: () => void }) {
  const [net,          setNet]          = useState<HNet>(() => genNetwork())
  const [log,          setLog]          = useState<HLine[]>([])
  const [input,        setInput]        = useState('')
  const [panel,        setPanel]        = useState<'map' | 'files' | 'shop' | 'base'>('map')
  const [won,          setWon]          = useState(false)
  const [history,      setHistory]      = useState<string[]>([])
  const histIdxRef = useRef(-1)
  const [credits,      setCredits]      = useState(50)
  const [upgrades,     setUpgrades]     = useState<Set<string>>(new Set())
  const [minigame,     setMinigame]     = useState<MiniGame | null>(null)
  const [alertLevel,   setAlertLevel]   = useState(0)
  const [ctfMode,      setCTFMode]      = useState(false)
  const [ctfFlag,      setCTFFlag]      = useState('')
  const [ctfSolved,    setCTFSolved]    = useState(false)
  const [alertCountdown, setAlertCountdown] = useState<number | null>(null)
  const [soldFiles,    setSoldFiles]    = useState<Set<string>>(new Set())
  const [mgInput,      setMgInput]      = useState('')  // mini-game text input
  const [tracerActive, setTracerActive] = useState(false)
  const [tracerNode,   setTracerNode]   = useState<string | null>(null)
  const [tracerPct,    setTracerPct]    = useState(0)   // 0-100 progress to next hop
  const [baseUpgrades, setBaseUpgrades] = useState<Set<string>>(new Set())
  const [killSwitchUsed, setKillSwitchUsed] = useState(false)

  const logRef       = useRef<HTMLDivElement>(null)
  const inputRef     = useRef<HTMLInputElement>(null)
  const mgInputRef   = useRef<HTMLInputElement>(null)
  const lid          = useRef(0)
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const tracerRef    = useRef<ReturnType<typeof setInterval> | null>(null)
  const tracerNodeRef = useRef<string | null>(null)
  const netRef        = useRef<HNet | null>(null)

  const mkL = (type: HLine['type'], text: string): HLine => ({ id: lid.current++, type, text })

  function addLog(...ls: HLine[]) {
    setLog(prev => [...prev, ...ls])
  }

  function laterLog(items: Array<[string, HLine['type'], number]>) {
    items.forEach(([text, type, ms]) => {
      setTimeout(() => setLog(prev => [...prev, { id: lid.current++, type, text }]), ms)
    })
  }

  // Auto-scroll log
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [log])

  // Alert level 3 countdown
  useEffect(() => {
    if (alertLevel === 3 && alertCountdown === null) {
      setTimeout(() => setAlertCountdown(60), 0)
      countdownRef.current = setInterval(() => {
        setAlertCountdown(prev => {
          if (prev === null || prev <= 1) {
            if (countdownRef.current) clearInterval(countdownRef.current)
            // Force reboot
            setTimeout(() => {
              setLog(prev => [...prev,
                { id: lid.current++, type: 'err', text: '█ CONNECTION TERMINATED — SIGNAL TRACED' },
                { id: lid.current++, type: 'err', text: '█ REROUTING THROUGH BACKUP NODE...' },
                { id: lid.current++, type: 'sys', text: 'Reinitializing network...' },
              ])
              const newNet = genNetwork()
              setNet(newNet)
              setAlertLevel(0)
              setAlertCountdown(null)
              setSoldFiles(new Set())
              setCTFMode(false)
              setCTFFlag('')
              setCTFSolved(false)
              setMinigame(null)
            }, 500)
            return null
          }
          return prev - 1
        })
      }, 1000)
    } else if (alertLevel < 3) {
      if (countdownRef.current) {
        clearInterval(countdownRef.current)
        countdownRef.current = null
      }
      setTimeout(() => setAlertCountdown(null), 0)
    }
    return () => {
      if (alertLevel < 3 && countdownRef.current) {
        clearInterval(countdownRef.current)
      }
    }
  }, [alertLevel]) // eslint-disable-line react-hooks/exhaustive-deps

  // Keep netRef in sync so tracer interval can read latest net
  useEffect(() => { netRef.current = net }, [net])

  // Tracer bot — activates at alert 2+ or 4+ nodes cracked
  useEffect(() => {
    const crackedCount = net.order.filter(id => net.nodes[id].state === 'cracked').length
    if ((alertLevel >= 2 || crackedCount >= 4) && !tracerActive && !won) {
      const candidates = net.order.filter(id => id !== net.current && id !== net.order[0])
      if (candidates.length === 0) return
      const startId = candidates[rand(candidates.length)]
      tracerNodeRef.current = startId
      setTimeout(() => {
        setTracerNode(startId)
        setTracerActive(true)
        setTracerPct(0)
        setLog(p => [...p,
          { id: lid.current++, type: 'err', text: '◉ COUNTER-INTEL BOT DETECTED — tracing your signal...' },
          { id: lid.current++, type: 'warn', text: '  Navigate to its node and run: kill tracer' },
          { id: lid.current++, type: 'warn', text: '  Or buy BASE defenses to slow it down.' },
        ])
      }, 0)
    }
  }, [alertLevel, net.order.length, won]) // eslint-disable-line react-hooks/exhaustive-deps

  // Tracer tick interval
  useEffect(() => {
    if (!tracerActive) {
      if (tracerRef.current) { clearInterval(tracerRef.current); tracerRef.current = null }
      return
    }
    const baseDelay = baseUpgrades.has('vpn_hop') ? 2800 : 1800
    tracerRef.current = setInterval(() => {
      setTracerPct(prev => {
        const next = prev + (baseUpgrades.has('vpn_hop') ? 8 : 14)
        if (next < 100) return next

        // Advance tracer one hop toward player
        const currentNet = netRef.current
        if (!currentNet) return 0
        const tNode = tracerNodeRef.current
        if (!tNode) return 0

        // Decoy: 30% chance to skip
        if (baseUpgrades.has('decoy_nodes') && Math.random() < 0.30) {
          setTimeout(() => setLog(p => [...p, { id: lid.current++, type: 'sys', text: '  [tracer] Hit decoy node — rerouting...' }]), 0)
          return 0
        }

        // BFS from tNode toward player's current node, take one step
        const target = currentNet.current
        let firstStep = tNode
        const visited = new Set<string>([tNode])
        const bfsQ: string[] = [tNode]
        const prev2: Record<string, string> = {}
        outer: while (bfsQ.length) {
          const n = bfsQ.shift()!
          for (const nb of currentNet.nodes[n]?.linked ?? []) {
            if (!visited.has(nb)) {
              visited.add(nb)
              prev2[nb] = n
              if (nb === target) break outer
              bfsQ.push(nb)
            }
          }
        }
        // Walk back from target to find step after tNode
        let cur2 = target
        while (prev2[cur2] && prev2[cur2] !== tNode) cur2 = prev2[cur2]
        firstStep = prev2[cur2] === tNode ? cur2 : tNode

        tracerNodeRef.current = firstStep
        setTracerNode(firstStep)

        if (firstStep === target) {
          // Tracer reached player
          clearInterval(tracerRef.current!)
          tracerRef.current = null
          setTimeout(() => {
            setLog(p => [...p,
              { id: lid.current++, type: 'err', text: '████ TRACED — COUNTER-INTEL BOT FOUND YOU ████' },
              { id: lid.current++, type: 'err', text: '  Your IP has been logged. Connection terminated.' },
              { id: lid.current++, type: 'sys', text: '  Reinitializing network...' },
            ])
            setTimeout(() => {
              setNet(genNetwork())
              setAlertLevel(0)
              setAlertCountdown(null)
              setSoldFiles(new Set())
              setCTFMode(false)
              setCTFFlag('')
              setCTFSolved(false)
              setMinigame(null)
              setTracerActive(false)
              setTracerNode(null)
              tracerNodeRef.current = null
              setTracerPct(0)
            }, 1200)
          }, 100)
        } else {
          setTimeout(() => setLog(p => [...p, { id: lid.current++, type: 'warn', text: `  [tracer] Moving through network... (${firstStep})` }]), 0)
        }
        return 0
      })
    }, baseDelay)
    return () => { if (tracerRef.current) { clearInterval(tracerRef.current); tracerRef.current = null } }
  }, [tracerActive, baseUpgrades])

  // Boot message
  useEffect(() => {
    const n0 = net.nodes[net.order[0]]
    laterLog([
      ['╔══════════════════════════════════════════════════════╗', 'sys', 0],
      ['║   HACKNET v2.0  ·  ANONYMOUS ROUTING ACTIVE          ║', 'sys', 60],
      ['╚══════════════════════════════════════════════════════╝', 'sys', 120],
      [`  NETWORK SCAN COMPLETE: ${net.subnet}.0/24`, 'out', 300],
      [`  NODES DETECTED:  ${net.order.length}`, 'out', 450],
      [`  ENTRY POINT:     ${n0.ip} [${n0.hostname}]  SEC:${n0.sec}`, 'out', 600],
      ['  type "help" for commands  ·  click nodes on map to connect', 'sys', 800],
      ['  WARNING: honeypots detected in network. Use DEEP_SCAN or proceed carefully.', 'warn', 950],
      ['', 'sys', 1050],
    ])
    setTimeout(() => inputRef.current?.focus(), 1100)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Alert helpers ─────────────────────────────────────────────────────────
  function raiseAlert(amount: number, reason: string) {
    setAlertLevel(prev => {
      const next = Math.min(3, prev + amount)
      if (next > prev) {
        const colors: HLine['type'][] = ['sys', 'warn', 'warn', 'err']
        setTimeout(() => setLog(p => [...p, { id: lid.current++, type: colors[next] ?? 'err', text: `⚠ ALERT RAISED [${alertLabel(next)}]: ${reason}` }]), 0)
      }
      return next
    })
  }

  // ── Pivot: reveal hidden subnet ───────────────────────────────────────────
  function triggerPivot(pivotNode: HNode) {
    setNet(prev => {
      const newNodes = { ...prev.nodes }
      const newOrder = [...prev.order]
      const subnetB = rand(254) + 1
      const hiddenSubnet = `10.${subnetB}.99`

      for (let i = 0; i < 3; i++) {
        const hid = `pivot_n${i}`
        const sec = 3 + rand(2)
        const type: NodeType = ['server', 'database', 'firewall'][i % 3] as NodeType
        const files = genFiles(type, hiddenSubnet)
        for (const f of files) {
          if (f.classified) f.value = fileValue(f, sec)
        }
        newNodes[hid] = {
          id: hid,
          ip: `${hiddenSubnet}.${100 + i}`,
          hostname: `subnet-${['alpha', 'beta', 'gamma'][i]}`,
          type, sec, vulns: [...VULNS].sort(() => Math.random() - 0.5).slice(0, 2),
          files,
          linked: [pivotNode.id, ...(i > 0 ? [`pivot_n${i - 1}`] : [])],
          state: 'discovered',
        }
        if (!newNodes[pivotNode.id].linked.includes(hid)) {
          newNodes[pivotNode.id] = { ...newNodes[pivotNode.id], linked: [...newNodes[pivotNode.id].linked, hid] }
        }
        newOrder.push(hid)
      }

      return { ...prev, nodes: newNodes, order: newOrder }
    })

    laterLog([
      ['', 'sys', 50],
      ['██ PIVOT ESTABLISHED ███████████████████████████████', 'ok', 100],
      ['   NEW SUBNET ACCESSIBLE: 10.x.99.100-102', 'ok', 200],
      ['   3 nodes added to network — check MAP', 'out', 350],
      ['████████████████████████████████████████████████████', 'ok', 400],
    ])
  }

  // ── CTF mode ──────────────────────────────────────────────────────────────
  function startCTF() {
    if (ctfMode) { addLog(mkL('warn', 'CTF mode already active. Use: submit FLAG{...}')); return }
    const flag = `FLAG{op_${randomHex(10)}}`
    const crackedNodes = net.order.filter(id => net.nodes[id].state === 'cracked' && id !== net.order[0])
    const targetId = crackedNodes.length > 0 ? crackedNodes[rand(crackedNodes.length)] : net.order[rand(net.order.length)]
    const targetNode = net.nodes[targetId]
    // Hide flag in a file
    setNet(prev => {
      const updated = { ...prev.nodes[targetId] }
      updated.files = [...updated.files, {
        name: 'secret.txt',
        classified: false,
        value: 0,
        content: `[ENCRYPTED COMMS LOG]\nAuthor: unit-7\nDate: classified\n\nThe package is secure. Confirmation code: ${flag}\n\nDestroy after reading.`,
      }]
      return { ...prev, nodes: { ...prev.nodes, [targetId]: updated } }
    })
    setCTFFlag(flag)
    setCTFMode(true)

    laterLog([
      ['', 'sys', 0],
      ['╔════════════════════════════════════════════════╗', 'ok', 50],
      ['║  CTF MISSION INITIATED                          ║', 'ok', 100],
      ['╠════════════════════════════════════════════════╣', 'ok', 150],
      ['║  Objective: Find the FLAG hidden in the net     ║', 'out', 200],
      ['║  Method: scan, probe, exploit, connect, cat     ║', 'out', 250],
      ['║  Submit: submit FLAG{...}                       ║', 'out', 300],
      ['║  Reward: 1000cr + OPERATOR ELITE rank           ║', 'ok', 350],
      ['╚════════════════════════════════════════════════╝', 'ok', 400],
      [`  INTEL: Target node is near ${targetNode.ip} [${targetNode.hostname}]`, 'warn', 500],
    ])
  }

  // ── Mini-game launcher ───────────────────────────────────────────────────
  function launchMinigame(mg: MiniGame) {
    setMinigame({ ...mg, attemptsLeft: mg.type === 'decrypt' ? 3 : 1 })
    setMgInput('')
    setTimeout(() => mgInputRef.current?.focus(), 100)
  }

  function resolveMinigame(success: boolean, reward: number) {
    setMinigame(null)
    setMgInput('')
    if (success) {
      setCredits(c => c + reward)
      laterLog([
        ['', 'sys', 0],
        [`✓ CHALLENGE COMPLETE — +${reward}cr awarded`, 'ok', 50],
      ])
    } else {
      laterLog([
        ['', 'sys', 0],
        ['✗ CHALLENGE FAILED — no reward', 'err', 50],
      ])
    }
    setTimeout(() => inputRef.current?.focus(), 150)
  }

  function handleMgSubmit() {
    if (!minigame) return
    if (minigame.type === 'decrypt') {
      const correct = minigame.answer?.toLowerCase() === mgInput.trim().toLowerCase()
      if (correct) {
        resolveMinigame(true, minigame.reward)
      } else {
        const left = (minigame.attemptsLeft ?? 1) - 1
        if (left <= 0) {
          addLog(mkL('err', `✗ Incorrect. No attempts remaining. Answer was: ${minigame.answer}`))
          resolveMinigame(false, 0)
        } else {
          setMinigame(m => m ? { ...m, attemptsLeft: left } : null)
          addLog(mkL('warn', `✗ Incorrect. ${left} attempt${left === 1 ? '' : 's'} remaining.`))
        }
      }
    }
  }

  function handleMgChoice(idx: number) {
    if (!minigame) return
    if (minigame.type === 'crack') {
      const correct = idx === minigame.correctIdx
      resolveMinigame(correct, correct ? minigame.reward : 0)
    } else if (minigame.type === 'inject') {
      const correct = idx === minigame.injectCorrect
      resolveMinigame(correct, correct ? minigame.reward : 0)
    }
  }

  function handleMgSkip() {
    if (!minigame || !upgrades.has('vault_breaker')) return
    const half = Math.floor(minigame.reward / 2)
    setCredits(c => c + half)
    addLog(mkL('warn', `VAULT_BREAKER — bypassed challenge. +${half}cr (half reward)`))
    setMinigame(null)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  // ── Command handler ───────────────────────────────────────────────────────
  function runCmd(raw: string) {
    const parts = raw.trim().split(/\s+/)
    const cmd   = parts[0].toLowerCase()
    const arg   = parts.slice(1).join(' ')

    if (cmd) {
      addLog(mkL('cmd', `${net.nodes[net.current].hostname}$ ${raw}`))
      setHistory(h => [raw, ...h.filter(x => x !== raw)].slice(0, 50))
      histIdxRef.current = -1
    }

    const cur = net.nodes[net.current]

    // ── help ──────────────────────────────────────────────────────────────
    if (cmd === 'help') {
      addLog(
        mkL('sys', '  ╔═══════════════════════════════════════════════╗'),
        mkL('sys', '  ║  HACKNET v2.0 COMMANDS                         ║'),
        mkL('sys', '  ╠═══════════════════════════════════════════════╣'),
        mkL('out', '  ║  scan / nmap         discover nodes            ║'),
        mkL('out', '  ║  probe <ip|host>     analyze target            ║'),
        mkL('out', '  ║  exploit <ip>        crack node                ║'),
        mkL('out', '  ║  connect / ssh <ip>  connect to cracked node   ║'),
        mkL('out', '  ║  ls                  list files                ║'),
        mkL('out', '  ║  cat <file>          read file                 ║'),
        mkL('out', '  ║  exfil <file>        steal classified file     ║'),
        mkL('out', '  ║  crack               launch crack challenge    ║'),
        mkL('out', '  ║  inject              launch SQL injection      ║'),
        mkL('out', '  ║  decrypt <file>      launch decrypt challenge  ║'),
        mkL('out', '  ║  sell <file|all>     sell loot for credits     ║'),
        mkL('out', '  ║  shop                view upgrade market       ║'),
        mkL('out', '  ║  buy <id>            purchase upgrade          ║'),
        mkL('out', '  ║  cover               reduce alert (-300cr)     ║'),
        mkL('out', '  ║  status              credits/upgrades/loot     ║'),
        mkL('out', '  ║  nodes               list all known nodes      ║'),
        mkL('out', '  ║  pivot               reveal hidden subnet      ║'),
        mkL('out', '  ║  backdoor            install persistence       ║'),
        mkL('out', '  ║  ctf                 start CTF mission         ║'),
        mkL('out', '  ║  submit <flag>       submit CTF flag           ║'),
        mkL('out', '  ║  kill tracer         destroy the tracer bot    ║'),
        mkL('out', '  ║  base                view/buy base defenses    ║'),
        mkL('out', '  ║  reboot              reset network             ║'),
        mkL('out', '  ║  exit / quit         leave hacknet             ║'),
        mkL('sys', '  ╚═══════════════════════════════════════════════╝'),
      )
      return
    }

    // ── scan ──────────────────────────────────────────────────────────────
    if (cmd === 'scan' || cmd === 'nmap') {
      const hopLimit = upgrades.has('wide_scan') ? 2 : 1
      laterLog([
        [`[*] Initiating network scan from ${cur.ip}...`, 'out', 0],
        [`[*] Hop limit: ${hopLimit}`, 'out', 150],
      ])
      setNet(prev => {
        const updated = { ...prev.nodes }
        const discovered: string[] = []
        const toCheck = [prev.current]
        const visited = new Set([prev.current])

        for (let hop = 0; hop < hopLimit; hop++) {
          const nextLayer: string[] = []
          for (const nid of toCheck) {
            for (const linked of updated[nid].linked) {
              if (!visited.has(linked)) {
                visited.add(linked)
                nextLayer.push(linked)
                if (updated[linked].state === 'hidden') {
                  updated[linked] = { ...updated[linked], state: 'discovered' }
                  discovered.push(updated[linked].ip)
                }
              }
            }
          }
          toCheck.length = 0
          toCheck.push(...nextLayer)
        }

        if (discovered.length > 0) {
          laterLog(discovered.map((ip, i) => [`  [+] DISCOVERED: ${ip}`, 'ok', 300 + i * 100]))
        } else {
          setTimeout(() => setLog(p => [...p, mkL('out', '  [=] No new nodes found')]), 300)
        }
        return { ...prev, nodes: updated }
      })
      return
    }

    // ── probe ─────────────────────────────────────────────────────────────
    if (cmd === 'probe') {
      const target = net.order.find(id =>
        net.nodes[id].ip === arg || net.nodes[id].hostname === arg
      )
      if (!target) { addLog(mkL('err', `probe: target not found: ${arg}`)); return }
      const t = net.nodes[target]
      if (t.state === 'hidden') { addLog(mkL('err', 'probe: target not discovered yet')); return }

      const deepScan = upgrades.has('deep_probe')
      const vulnsToShow = deepScan ? t.vulns : t.vulns.slice(0, Math.ceil(t.vulns.length / 2))

      laterLog([
        [`[*] Probing ${t.ip} [${t.hostname}]...`, 'out', 0],
        [`    TYPE:    ${t.type.toUpperCase()}`, 'out', 200],
        [`    SEC:     ${t.sec}/5`, 'out', 300],
        [`    VULNS:   ${vulnsToShow.length} identified`, 'out', 400],
        ...vulnsToShow.map((v, i): [string, HLine['type'], number] => [`    [!] ${v}`, 'warn', 500 + i * 80]),
        ...(deepScan && t.isHoneypot ? [['    ⚠ WARNING: HONEYPOT DETECTED', 'err', 500 + vulnsToShow.length * 80] as [string, HLine['type'], number]] : []),
        ...(deepScan && t.isVault    ? [['    ◈ NOTE: VAULT NODE — files are encrypted', 'warn', 550 + vulnsToShow.length * 80] as [string, HLine['type'], number]] : []),
        ...(deepScan && t.isPivot    ? [['    ◈ NOTE: PIVOT NODE — may reveal subnet', 'warn', 600 + vulnsToShow.length * 80] as [string, HLine['type'], number]] : []),
        ...(upgrades.has('neural_mapper') ? t.files.map((f, i): [string, HLine['type'], number] => [`    [NM] ${f.name}${f.classified ? ' [CLASSIFIED]' : ''}${f.encrypted ? ' [ENC]' : ''}`, 'sys', 700 + vulnsToShow.length * 80 + i * 60]) : []),
      ])

      setNet(prev => ({
        ...prev,
        nodes: { ...prev.nodes, [target]: { ...t, state: t.state === 'discovered' ? 'probed' : t.state } },
      }))
      return
    }

    // ── exploit ───────────────────────────────────────────────────────────
    if (cmd === 'exploit') {
      const target = net.order.find(id =>
        net.nodes[id].ip === arg || net.nodes[id].hostname === arg || arg === ''
      )
      const tId = arg === '' ? cur.id : target
      if (!tId) { addLog(mkL('err', `exploit: target not found: ${arg}`)); return }
      const t = net.nodes[tId]
      if (t.state === 'cracked') { addLog(mkL('ok', `${t.hostname}: already cracked`)); return }
      if (t.state === 'hidden')  { addLog(mkL('err', 'exploit: target not discovered')); return }

      const chance = effectiveChance(t.sec, upgrades)

      laterLog([
        [`[*] Exploiting ${t.ip} [${t.hostname}]  SEC:${t.sec}  chance:${chance}%`, 'out', 0],
        ['[*] Launching payload sequence...', 'out', 200],
      ])

      const delay = upgrades.has('exploit_boost3') ? 0 : 700
      setTimeout(() => {
        const roll = rand(100)
        const success = roll < chance

        if (success) {
          setNet(prev => ({
            ...prev,
            nodes: { ...prev.nodes, [tId]: { ...t, state: 'cracked' } },
          }))
          laterLog([
            ['[+] PAYLOAD DELIVERED — authentication bypassed', 'ok', 0],
            [`[+] ROOT ACCESS GRANTED: ${t.hostname}`, 'ok', 150],
            [`[+] SEC:${t.sec} node cracked — ${t.files.length} files available`, 'ok', 300],
          ])

          // Check win condition
          if (t.files.some(f => f.crown)) {
            setTimeout(() => setWon(true), 600)
          }

          // Honeypot trigger
          if (t.isHoneypot && !upgrades.has('ghost_protocol')) {
            setTimeout(() => raiseAlert(2, 'HONEYPOT TRIGGERED'), 400)
          }
        } else {
          laterLog([
            ['[-] EXPLOIT FAILED — intrusion detected', 'err', 0],
            [`[-] ${t.hostname} logged connection attempt`, 'err', 150],
          ])
          // firewall_v2: no alert on success (already handled), but still alert on fail
          if (t.sec >= 4) raiseAlert(1, `Failed exploit on high-sec node ${t.hostname}`)
        }
      }, delay)
      return
    }

    // ── connect / ssh ─────────────────────────────────────────────────────
    if (cmd === 'connect' || cmd === 'ssh') {
      const target = net.order.find(id =>
        net.nodes[id].ip === arg || net.nodes[id].hostname === arg
      )
      if (!target) { addLog(mkL('err', `connect: host not found: ${arg}`)); return }
      const t = net.nodes[target]
      if (t.state !== 'cracked') { addLog(mkL('err', `connect: ${t.hostname} is not cracked yet`)); return }

      const delay = t.backdoor ? 0 : 400
      setTimeout(() => {
        setNet(prev => ({ ...prev, current: target }))
        addLog(mkL('ok', `Connected → ${t.ip} [${t.hostname}]  SEC:${t.sec}`))
      }, delay)
      return
    }

    // ── ls ────────────────────────────────────────────────────────────────
    if (cmd === 'ls') {
      addLog(mkL('out', `  ${cur.ip} [${cur.hostname}] — ${cur.files.length} file(s):`))
      cur.files.forEach(f => {
        const enc = f.encrypted ? ' [ENCRYPTED]' : ''
        const val = f.classified ? ` (~${f.value}cr)` : ''
        const tag = f.classified ? (f.crown ? ' [CROWN]' : ' [CLASSIFIED]') : ''
        addLog(mkL(f.classified ? 'warn' : 'out', `    ${f.name}${enc}${tag}${val}`))
      })
      return
    }

    // ── cat ───────────────────────────────────────────────────────────────
    if (cmd === 'cat') {
      const file = cur.files.find(f => f.name === arg)
      if (!file) { addLog(mkL('err', `cat: ${arg}: No such file`)); return }
      if (file.encrypted) {
        addLog(mkL('warn', `[ENCRYPTED] ${arg} — use: decrypt ${arg}`))
        return
      }
      addLog(
        mkL('sys', `  ┌── ${arg} ──`),
        ...file.content.split('\n').map(l => mkL('out', `  │ ${l}`)),
        mkL('sys', '  └──'),
      )
      // CTF flag check
      if (ctfMode && !ctfSolved && file.content.includes(ctfFlag)) {
        setTimeout(() => addLog(mkL('ok', '  ☆ FLAG VISIBLE IN FILE — use: submit <flag>')), 200)
      }
      return
    }

    // ── exfil ─────────────────────────────────────────────────────────────
    if (cmd === 'exfil') {
      const file = cur.files.find(f => f.name === arg)
      if (!file) { addLog(mkL('err', `exfil: ${arg}: No such file`)); return }
      if (!file.classified) { addLog(mkL('warn', 'exfil: file is not classified — no value')); return }
      if (file.encrypted) { addLog(mkL('warn', `exfil: ${arg} is encrypted — decrypt first`)); return }
      if (net.loot.includes(arg)) { addLog(mkL('warn', `exfil: ${arg} already in loot`)); return }

      const delay = upgrades.has('fast_exfil') ? 0 : 600
      laterLog([
        [`[*] Exfiltrating ${arg}...`, 'out', 0],
        ...(upgrades.has('fast_exfil') ? [] : [['[*] Tunneling data through proxy...', 'out', 200] as [string, HLine['type'], number]]),
      ])
      setTimeout(() => {
        setNet(prev => ({ ...prev, loot: [...prev.loot, arg] }))
        addLog(mkL('ok', `[+] ${arg} exfiltrated — ${file.value}cr when sold`))
        if (file.crown) setTimeout(() => setWon(true), 300)
      }, delay)
      return
    }

    // ── crack challenge ───────────────────────────────────────────────────
    if (cmd === 'crack') {
      if (!cur.challenge || cur.challenge.type !== 'crack') {
        addLog(mkL('err', 'crack: no crack challenge available on this node'))
        return
      }
      const pool = CRACK_POOL[cur.challenge.poolIdx]
      launchMinigame({
        type: 'crack',
        title: 'HASH CRACKING STATION',
        hash: pool.hash,
        algorithm: pool.algorithm,
        hashHint: pool.hashHint,
        choices: pool.choices,
        correctIdx: pool.correctIdx,
        reward: pool.reward,
        nodeId: cur.id,
      })
      return
    }

    // ── inject challenge ──────────────────────────────────────────────────
    if (cmd === 'inject') {
      if (!cur.challenge || cur.challenge.type !== 'inject') {
        addLog(mkL('err', 'inject: no SQL injection challenge available on this node'))
        return
      }
      const pool = INJECT_POOL[cur.challenge.poolIdx]
      launchMinigame({
        type: 'inject',
        title: 'SQL INJECTION CONSOLE',
        queryTemplate: pool.queryTemplate,
        injectHint: pool.injectHint,
        injectChoices: pool.injectChoices,
        injectCorrect: pool.injectCorrect,
        reward: pool.reward,
        nodeId: cur.id,
      })
      return
    }

    // ── decrypt file ──────────────────────────────────────────────────────
    if (cmd === 'decrypt') {
      const file = cur.files.find(f => f.name === arg)
      if (!file) { addLog(mkL('err', `decrypt: ${arg}: No such file`)); return }
      if (!file.encrypted) { addLog(mkL('warn', `decrypt: ${arg} is not encrypted`)); return }

      if (!cur.challenge || cur.challenge.type !== 'decrypt') {
        // Generic vault_breaker bypass
        if (upgrades.has('vault_breaker')) {
          setNet(prev => {
            const updated = { ...prev.nodes[cur.id] }
            updated.files = updated.files.map(f => f.name === arg ? { ...f, encrypted: false } : f)
            return { ...prev, nodes: { ...prev.nodes, [cur.id]: updated } }
          })
          addLog(mkL('ok', `VAULT_BREAKER — ${arg} decrypted (no challenge required)`))
        } else {
          addLog(mkL('err', 'decrypt: no decryption challenge configured — need VAULT_BREAKER upgrade'))
        }
        return
      }

      const pool = DECRYPT_POOL[cur.challenge.poolIdx]
      launchMinigame({
        type: 'decrypt',
        title: 'DECRYPTION CHALLENGE',
        encoded: pool.encoded,
        hint: pool.hint,
        answer: pool.answer,
        reward: pool.reward,
        nodeId: cur.id,
        attemptsLeft: 3,
      })
      return
    }

    // ── sell ──────────────────────────────────────────────────────────────
    if (cmd === 'sell') {
      const mult = upgrades.has('market_access') ? 1.5 : 1.0
      if (arg === 'all') {
        const toSell = net.loot.filter(name => !soldFiles.has(name))
        if (toSell.length === 0) { addLog(mkL('warn', 'sell: no unsold files in loot')); return }
        let total = 0
        const newSold = new Set(soldFiles)
        for (const name of toSell) {
          const file = Object.values(net.nodes).flatMap(n => n.files).find(f => f.name === name)
          if (file) {
            const val = Math.floor(file.value * mult)
            total += val
            newSold.add(name)
          }
        }
        setSoldFiles(newSold)
        setCredits(c => c + total)
        addLog(mkL('ok', `[+] Sold ${toSell.length} file(s) for ${total}cr total${mult > 1 ? ' (MARKET_ACCESS +50%)' : ''}`))
        return
      }
      if (!net.loot.includes(arg)) { addLog(mkL('err', `sell: ${arg} not in loot — exfil first`)); return }
      if (soldFiles.has(arg)) { addLog(mkL('warn', `sell: ${arg} already sold`)); return }
      const file = Object.values(net.nodes).flatMap(n => n.files).find(f => f.name === arg)
      if (!file) { addLog(mkL('err', `sell: file data not found`)); return }
      const val = Math.floor(file.value * mult)
      setSoldFiles(s => new Set([...s, arg]))
      setCredits(c => c + val)
      addLog(mkL('ok', `[+] Sold ${arg} for ${val}cr${mult > 1 ? ' (MARKET_ACCESS +50%)' : ''}`))
      return
    }

    // ── shop ──────────────────────────────────────────────────────────────
    if (cmd === 'shop') {
      addLog(
        mkL('sys', '  ╔═══════════════════════════════════╗'),
        mkL('sys', '  ║  OPERATOR MARKET                   ║'),
        mkL('sys', '  ╠═══════════════════════════════════╣'),
        mkL('out', `  ║  Credits: ${credits}cr`.padEnd(36) + '║'),
        mkL('sys', '  ╠═══════════════════════════════════╣'),
      )
      for (const upg of Object.values(UPGRADES)) {
        const owned = upgrades.has(upg.id)
        const locked = upg.requires && !upgrades.has(upg.requires)
        const status = owned ? '[OWNED]' : locked ? '[LOCKED]' : `[${upg.cost}cr]`
        const type: HLine['type'] = owned ? 'ok' : locked ? 'sys' : credits >= upg.cost ? 'out' : 'warn'
        addLog(mkL(type, `  ║  ${status.padEnd(8)} ${upg.name.padEnd(20)} — ${upg.desc}`))
      }
      addLog(mkL('sys', '  ╚═══════════════════════════════════╝'))
      addLog(mkL('sys', '  Use: buy <id>  (e.g. buy exploit_boost)'))
      return
    }

    // ── buy ───────────────────────────────────────────────────────────────
    if (cmd === 'buy') {
      const upg = UPGRADES[arg]
      if (!upg) { addLog(mkL('err', `buy: unknown upgrade: ${arg}`)); return }
      if (upgrades.has(arg)) { addLog(mkL('warn', `buy: ${upg.name} already owned`)); return }
      if (upg.requires && !upgrades.has(upg.requires)) {
        addLog(mkL('err', `buy: requires ${UPGRADES[upg.requires]?.name || upg.requires} first`))
        return
      }
      if (credits < upg.cost) {
        addLog(mkL('err', `buy: insufficient credits (need ${upg.cost}cr, have ${credits}cr)`))
        return
      }
      setCredits(c => c - upg.cost)
      setUpgrades(s => new Set([...s, arg]))
      addLog(mkL('ok', `[+] PURCHASED: ${upg.name} — ${upg.desc}`))
      return
    }

    // ── cover ─────────────────────────────────────────────────────────────
    if (cmd === 'cover') {
      if (alertLevel === 0) { addLog(mkL('out', 'cover: alert level already CLEAR')); return }
      if (credits < 300) { addLog(mkL('err', `cover: insufficient credits (need 300cr, have ${credits}cr)`)); return }
      setCredits(c => c - 300)
      setAlertLevel(a => Math.max(0, a - 1))
      addLog(mkL('ok', '[+] COVER TRACKS — alert level reduced. -300cr'))
      return
    }

    // ── status ────────────────────────────────────────────────────────────
    if (cmd === 'status') {
      const cracked = net.order.filter(id => net.nodes[id].state === 'cracked').length
      const lootVal = net.loot.reduce((acc, name) => {
        const f = Object.values(net.nodes).flatMap(n => n.files).find(ff => ff.name === name)
        return acc + (f?.value ?? 0)
      }, 0)
      const soldVal = [...soldFiles].reduce((acc, name) => {
        const f = Object.values(net.nodes).flatMap(n => n.files).find(ff => ff.name === name)
        return acc + (f?.value ?? 0)
      }, 0)
      addLog(
        mkL('sys', '  ┌── OPERATOR STATUS ──────────────────────'),
        mkL('out', `  │  Credits:   ${credits}cr`),
        mkL('out', `  │  Alert:     ${alertLabel(alertLevel)} (${alertLevel}/3)`),
        mkL('out', `  │  Nodes:     ${cracked}/${net.order.length} cracked`),
        mkL('out', `  │  Loot:      ${net.loot.length} files (~${lootVal}cr unsold)`),
        mkL('out', `  │  Sold:      ${soldFiles.size} files (${soldVal}cr earned)`),
        mkL('out', `  │  Upgrades:  ${upgrades.size > 0 ? [...upgrades].join(', ') : 'none'}`),
        mkL(ctfMode && !ctfSolved ? 'warn' : 'sys', `  │  CTF:       ${ctfMode ? (ctfSolved ? 'SOLVED' : 'ACTIVE') : 'inactive'}`),
        mkL('sys', '  └─────────────────────────────────────────'),
      )
      return
    }

    // ── nodes ─────────────────────────────────────────────────────────────
    if (cmd === 'nodes') {
      const known = net.order.filter(id => net.nodes[id].state !== 'hidden')
      addLog(mkL('sys', '  ┌── KNOWN NODES ──────────────────────────────────'))
      for (const id of known) {
        const n = net.nodes[id]
        const tags = [n.isHoneypot ? '⚠HONEY' : '', n.isVault ? '◈VAULT' : '', n.isPivot ? '◈PIVOT' : ''].filter(Boolean).join(' ')
        const cur2 = id === net.current ? ' ←' : ''
        addLog(mkL(n.state === 'cracked' ? 'ok' : 'out',
          `  │  ${n.ip.padEnd(16)} [${n.hostname.padEnd(14)}] SEC:${n.sec} ${n.state.toUpperCase().padEnd(10)} ${tags}${cur2}`
        ))
      }
      addLog(mkL('sys', '  └─────────────────────────────────────────────────'))
      return
    }

    // ── pivot ─────────────────────────────────────────────────────────────
    if (cmd === 'pivot') {
      if (!cur.isPivot) { addLog(mkL('err', 'pivot: current node is not a pivot node')); return }
      if (cur.state !== 'cracked') { addLog(mkL('err', 'pivot: node must be cracked first')); return }
      triggerPivot(cur)
      return
    }

    // ── backdoor ──────────────────────────────────────────────────────────
    if (cmd === 'backdoor') {
      if (cur.state !== 'cracked') { addLog(mkL('err', 'backdoor: must be on a cracked node')); return }
      if (cur.backdoor) { addLog(mkL('ok', 'backdoor: persistence already installed')); return }
      if (credits < 150) { addLog(mkL('err', 'backdoor: need 150cr')); return }
      setCredits(c => c - 150)
      setNet(prev => ({
        ...prev,
        nodes: { ...prev.nodes, [cur.id]: { ...cur, backdoor: true } },
      }))
      addLog(mkL('ok', `[+] BACKDOOR installed on ${cur.hostname} — future connects are instant. -150cr`))
      return
    }

    // ── ctf ───────────────────────────────────────────────────────────────
    if (cmd === 'ctf') {
      startCTF()
      return
    }

    // ── submit ────────────────────────────────────────────────────────────
    if (cmd === 'submit') {
      if (!ctfMode) { addLog(mkL('err', 'submit: CTF mode not active — use: ctf')); return }
      if (ctfSolved) { addLog(mkL('ok', 'CTF already solved. Congrats, operator.')); return }
      if (arg === ctfFlag) {
        setCTFSolved(true)
        setCredits(c => c + 1000)
        laterLog([
          ['', 'sys', 0],
          ['╔════════════════════════════════════════════════╗', 'ok', 50],
          ['║  ★  CTF FLAG ACCEPTED — MISSION COMPLETE  ★   ║', 'ok', 100],
          ['║  +1000cr  ·  OPERATOR ELITE status earned      ║', 'ok', 200],
          ['╚════════════════════════════════════════════════╝', 'ok', 300],
        ])
      } else {
        addLog(mkL('err', `submit: incorrect flag. Keep searching.`))
      }
      return
    }

    // ── kill tracer ───────────────────────────────────────────────────────
    if (cmd === 'kill' && arg === 'tracer') {
      if (!tracerActive) { addLog(mkL('out', 'kill: no active tracer bot')); return }

      // Kill switch: remote kill anywhere (one-time)
      if (baseUpgrades.has('kill_switch') && !killSwitchUsed) {
        setKillSwitchUsed(true)
        setTracerActive(false)
        setTracerNode(null)
        tracerNodeRef.current = null
        setTracerPct(0)
        setAlertLevel(a => Math.max(0, a - 1))
        laterLog([
          ['[+] KILL_SWITCH activated — tracer destroyed remotely!', 'ok', 0],
          ['[+] Alert level reduced.', 'ok', 100],
        ])
        return
      }

      if (cur.id !== tracerNode) {
        addLog(mkL('err', `kill: tracer is not on this node (it's at ${tracerNode ? net.nodes[tracerNode]?.hostname ?? tracerNode : '?'})`))
        addLog(mkL('warn', '  Navigate to its node first, then run: kill tracer'))
        return
      }
      setTracerActive(false)
      setTracerNode(null)
      tracerNodeRef.current = null
      setTracerPct(0)
      setAlertLevel(0)
      setAlertCountdown(null)
      laterLog([
        ['', 'sys', 0],
        ['╔════════════════════════════════════════════════╗', 'ok', 50],
        ['║  ◉ TRACER BOT NEUTRALIZED — SIGNAL CLEARED     ║', 'ok', 100],
        ['║  Alert level reset to CLEAR.                    ║', 'ok', 180],
        ['╚════════════════════════════════════════════════╝', 'ok', 240],
      ])
      return
    }

    // ── base buy ──────────────────────────────────────────────────────────
    if (cmd === 'base') {
      if (arg === '') {
        addLog(
          mkL('sys', '  ╔═══════════════════════════════════════════════╗'),
          mkL('sys', '  ║  BASE DEFENSE UPGRADES                         ║'),
          mkL('sys', '  ╠═══════════════════════════════════════════════╣'),
          mkL('out', `  ║  Credits: ${credits}cr`.padEnd(48) + '║'),
          mkL('sys', '  ╠═══════════════════════════════════════════════╣'),
        )
        for (const upg of Object.values(BASE_UPGRADES)) {
          const owned = baseUpgrades.has(upg.id)
          const status = owned ? '[OWNED]' : `[${upg.cost}cr]`
          const t: HLine['type'] = owned ? 'ok' : credits >= upg.cost ? 'out' : 'warn'
          addLog(mkL(t, `  ║  ${status.padEnd(8)} ${upg.name.padEnd(16)} — ${upg.desc}`))
        }
        addLog(mkL('sys', '  ╚═══════════════════════════════════════════════╝'))
        addLog(mkL('sys', '  Use: base buy <id>  (e.g. base buy vpn_hop)'))
        return
      }
      if (arg.startsWith('buy ')) {
        const bid = arg.slice(4).trim()
        const upg = BASE_UPGRADES[bid]
        if (!upg) { addLog(mkL('err', `base buy: unknown upgrade: ${bid}`)); return }
        if (baseUpgrades.has(bid)) { addLog(mkL('warn', `base buy: ${upg.name} already owned`)); return }
        if (credits < upg.cost) { addLog(mkL('err', `base buy: need ${upg.cost}cr, have ${credits}cr`)); return }
        setCredits(c => c - upg.cost)
        setBaseUpgrades(s => new Set([...s, bid]))
        addLog(mkL('ok', `[+] BASE UPGRADE: ${upg.name} — ${upg.desc}`))
        return
      }
      addLog(mkL('err', 'base: unknown subcommand. Try: base  or  base buy <id>'))
      return
    }

    // ── reboot ────────────────────────────────────────────────────────────
    if (cmd === 'reboot') {
      laterLog([
        ['[*] Rebooting network connection...', 'warn', 0],
        ['[*] Purging session data...', 'warn', 200],
        ['[*] Reinitializing...', 'warn', 400],
      ])
      setTimeout(() => {
        const newNet = genNetwork()
        setNet(newNet)
        setAlertLevel(0)
        setAlertCountdown(null)
        setSoldFiles(new Set())
        setCTFMode(false)
        setCTFFlag('')
        setCTFSolved(false)
        setMinigame(null)
        setWon(false)
        setTracerActive(false)
        setTracerNode(null)
        tracerNodeRef.current = null
        setTracerPct(0)
        addLog(mkL('ok', '[+] Network reinitialized.'))
      }, 600)
      return
    }

    // ── exit / quit ───────────────────────────────────────────────────────
    if (cmd === 'exit' || cmd === 'quit') {
      onExit()
      return
    }

    if (cmd) addLog(mkL('err', `command not found: ${cmd}  (type "help")`))
  }

  // ── Key handlers ──────────────────────────────────────────────────────────
  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      runCmd(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(histIdxRef.current + 1, history.length - 1)
      histIdxRef.current = next
      setInput(history[next] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(histIdxRef.current - 1, -1)
      histIdxRef.current = next
      setInput(next === -1 ? '' : history[next] ?? '')
    }
  }

  // ── Computed helpers ──────────────────────────────────────────────────────
  const cur = net.nodes[net.current]
  const crackedCount = net.order.filter(id => net.nodes[id].state === 'cracked').length
  const secBar = '█'.repeat(cur.sec) + '░'.repeat(5 - cur.sec)
  const aColor = alertColor(alertLevel)
  const aLabel = alertLabel(alertLevel)

  // ── SVG map layout ────────────────────────────────────────────────────────
  const SVG_H = CONTENT_H - 2
  const positions = layoutNodes(net, MAP_W - 8, SVG_H - 2)

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      style={{ ...MONO, background: '#050905', color: '#22C55E', width: HACKNET_W, display: 'flex', flexDirection: 'column', fontSize: 11 }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* ── Status bar ── */}
      <div style={{
        background: 'rgba(201,164,85,0.07)', borderBottom: '1px solid rgba(201,164,85,0.18)',
        padding: '3px 10px', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', fontSize: 10,
      }}>
        <span style={{ color: '#22C55E' }}>◈ {cur.ip}</span>
        <span style={{ color: 'rgba(201,164,85,0.6)' }}>[{cur.hostname}]</span>
        <span>SEC: <span style={{ color: secColor(cur.sec) }}>{secBar}</span></span>
        <span style={{ color: 'rgba(201,164,85,0.5)' }}>{crackedCount}/{net.order.length} nodes</span>
        <span>LOOT: <span style={{ color: '#4ade80' }}>{net.loot.length}</span></span>
        <span style={{ color: '#4ade80' }}>{credits}cr</span>
        <span style={{ color: aColor, fontWeight: alertLevel === 3 ? 700 : 400, animation: alertLevel === 3 ? 'pulse 0.8s infinite' : 'none' }}>
          ALERT: {aLabel}
          {alertCountdown !== null && <span style={{ color: '#ef4444' }}> [{alertCountdown}s]</span>}
        </span>
        {ctfMode && !ctfSolved && <span style={{ color: '#eab308' }}>[CTF MODE]</span>}
        {ctfSolved && <span style={{ color: '#22C55E' }}>[CTF ✓]</span>}
        {tracerActive && (
          <span style={{ color: '#ef4444', fontWeight: 700, animation: 'pulse 0.6s infinite' }}>
            ◉ TRACER {tracerPct}%
            {upgrades.has('tracer_sense') && tracerNode && net.nodes[tracerNode] && ` @${net.nodes[tracerNode].hostname}`}
          </span>
        )}
        <span style={{ marginLeft: 'auto', cursor: 'pointer', color: 'rgba(201,164,85,0.4)' }} onClick={e => { e.stopPropagation(); onExit() }}>✕</span>
      </div>

      {/* ── Main area ── */}
      <div style={{ display: 'flex', height: CONTENT_H }}>

        {/* ── Left panel ── */}
        <div style={{ width: MAP_W, borderRight: '1px solid rgba(201,164,85,0.15)', display: 'flex', flexDirection: 'column' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(201,164,85,0.15)' }}>
            {(['map', 'files', 'shop', 'base'] as const).map(p => (
              <button
                key={p}
                onClick={e => { e.stopPropagation(); setPanel(p) }}
                style={{
                  flex: 1, background: panel === p ? 'rgba(201,164,85,0.12)' : 'transparent',
                  border: 'none', borderRight: '1px solid rgba(201,164,85,0.1)',
                  color: p === 'base' && tracerActive ? '#ef4444'
                       : panel === p ? '#22C55E' : 'rgba(201,164,85,0.4)',
                  ...MONO, fontSize: 9, padding: '4px 0', cursor: 'pointer', letterSpacing: 1,
                }}
              >
                {p === 'base' && tracerActive ? '⚠BASE' : p.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Panel content */}
          <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>

            {/* MAP */}
            {panel === 'map' && (
              <svg width={MAP_W - 8} height={SVG_H} style={{ display: 'block' }}>
                {/* Edges */}
                {net.order.map(id => net.nodes[id].linked.filter(b => b > id).map(bid => {
                  const a = positions[id], bb = positions[bid]
                  if (!a || !bb) return null
                  const na = net.nodes[id], nb = net.nodes[bid]
                  const vis = na.state !== 'hidden' && nb.state !== 'hidden'
                  return (
                    <line key={`${id}-${bid}`}
                      x1={a.x} y1={a.y} x2={bb.x} y2={bb.y}
                      stroke={vis ? 'rgba(201,164,85,0.22)' : 'rgba(201,164,85,0.05)'}
                      strokeWidth={1} strokeDasharray={vis ? '0' : '3,4'}
                    />
                  )
                }))}
                {/* Nodes */}
                {net.order.map(id => {
                  const n = net.nodes[id]
                  const pos = positions[id]
                  if (!pos) return null
                  const isCurrent = id === net.current
                  const stroke = nodeStrokeColor(n)
                  const fill = nodeFillColor(n)
                  const sym = nodeSymbol(n)
                  const pivot = n.isPivot && n.state !== 'cracked' ? 'rgba(56,189,248,0.5)' : undefined
                  return (
                    <g key={id}
                      style={{ cursor: n.state !== 'hidden' ? 'pointer' : 'default' }}
                      onClick={e => {
                        e.stopPropagation()
                        if (n.state === 'hidden') return
                        if (n.state === 'cracked') {
                          runCmd(`connect ${n.ip}`)
                        } else {
                          runCmd(`probe ${n.ip}`)
                        }
                      }}
                    >
                      {isCurrent && (
                        <circle cx={pos.x} cy={pos.y} r={14} fill="none" stroke={stroke} strokeWidth={1} opacity={0.3} strokeDasharray="3,3" />
                      )}
                      {pivot && (
                        <circle cx={pos.x} cy={pos.y} r={12} fill="none" stroke={pivot} strokeWidth={1} opacity={0.6} />
                      )}
                      <circle cx={pos.x} cy={pos.y} r={9} fill={fill} stroke={stroke} strokeWidth={isCurrent ? 1.5 : 1} />
                      <text x={pos.x} y={pos.y + 4} textAnchor="middle" fontSize={9}
                        fill={n.state === 'hidden' ? 'rgba(201,164,85,0.15)' : stroke}
                        style={{ userSelect: 'none' }}
                      >{sym}</text>
                      {n.state !== 'hidden' && (
                        <text x={pos.x} y={pos.y + 20} textAnchor="middle" fontSize={7}
                          fill="rgba(201,164,85,0.5)" style={{ userSelect: 'none' }}
                        >{n.hostname.slice(0, 10)}</text>
                      )}
                      {n.state !== 'hidden' && (
                        <text x={pos.x} y={pos.y - 13} textAnchor="middle" fontSize={7}
                          fill={secColor(n.sec)} style={{ userSelect: 'none' }}
                        >{`S${n.sec}`}</text>
                      )}
                    </g>
                  )
                })}
                {/* Tracer overlay */}
                {tracerActive && tracerNode && positions[tracerNode] && (upgrades.has('tracer_sense') || tracerNode === net.current) && (() => {
                  const tp = positions[tracerNode]
                  return (
                    <g>
                      <circle cx={tp.x} cy={tp.y} r={16} fill="none" stroke="#ef4444" strokeWidth={1.5} opacity={0.5} strokeDasharray="2,3" />
                      <circle cx={tp.x} cy={tp.y} r={10} fill="rgba(239,68,68,0.18)" stroke="#ef4444" strokeWidth={1.5} />
                      <text x={tp.x} y={tp.y + 4} textAnchor="middle" fontSize={9} fill="#ef4444" style={{ userSelect: 'none' }}>◉</text>
                      <text x={tp.x} y={tp.y - 17} textAnchor="middle" fontSize={7} fill="#ef4444" style={{ userSelect: 'none' }}>BOT</text>
                    </g>
                  )
                })()}
                {/* Legend */}
                <text x={4} y={SVG_H - 22} fontSize={7} fill="rgba(201,164,85,0.3)">◉=cracked ◈=known ○=hidden</text>
                <text x={4} y={SVG_H - 12} fontSize={7} fill="rgba(201,164,85,0.3)">⚠=honeypot ◈purple=vault ◈blue=pivot</text>
              </svg>
            )}

            {/* FILES */}
            {panel === 'files' && (
              <div style={{ padding: 8, overflowY: 'auto', height: '100%', boxSizing: 'border-box' }}>
                <div style={{ color: 'rgba(201,164,85,0.5)', fontSize: 9, marginBottom: 6 }}>
                  LOOT ({net.loot.length} files)
                </div>
                {net.loot.length === 0 && (
                  <div style={{ color: 'rgba(201,164,85,0.3)', fontSize: 10 }}>No files exfiltrated yet.</div>
                )}
                {net.loot.map(name => {
                  const file = Object.values(net.nodes).flatMap(n => n.files).find(f => f.name === name)
                  const sold = soldFiles.has(name)
                  return (
                    <div key={name} style={{
                      marginBottom: 4, padding: '3px 6px',
                      background: sold ? 'rgba(201,164,85,0.04)' : 'rgba(201,164,85,0.08)',
                      border: `1px solid rgba(201,164,85,${sold ? 0.1 : 0.2})`,
                      color: sold ? 'rgba(201,164,85,0.3)' : '#22C55E',
                      fontSize: 10, cursor: sold ? 'default' : 'pointer',
                    }}
                      onClick={e => { e.stopPropagation(); if (!sold) runCmd(`sell ${name}`) }}
                    >
                      {name} {file ? `— ${file.value}cr` : ''} {sold ? '[SOLD]' : '[click to sell]'}
                    </div>
                  )
                })}
                {net.loot.length > 0 && (
                  <div style={{ marginTop: 8 }}>
                    <button onClick={e => { e.stopPropagation(); runCmd('sell all') }}
                      style={{
                        background: 'rgba(201,164,85,0.12)', border: '1px solid rgba(201,164,85,0.3)',
                        color: '#22C55E', ...MONO, fontSize: 10, padding: '3px 10px', cursor: 'pointer', width: '100%',
                      }}>
                      SELL ALL
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* BASE */}
            {panel === 'base' && (
              <div style={{ padding: 8, overflowY: 'auto', height: '100%', boxSizing: 'border-box' }}>
                <div style={{ color: 'rgba(201,164,85,0.5)', fontSize: 9, marginBottom: 4 }}>BASE DEFENSES</div>
                <div style={{ color: '#4ade80', fontSize: 10, marginBottom: 6 }}>Credits: {credits}cr</div>

                {/* Tracer status */}
                {tracerActive ? (
                  <div style={{ marginBottom: 8, padding: '5px 7px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.4)', fontSize: 9 }}>
                    <div style={{ color: '#ef4444', fontWeight: 700, marginBottom: 2 }}>◉ TRACER BOT ACTIVE</div>
                    <div style={{ color: 'rgba(239,68,68,0.7)' }}>Progress to next hop: {tracerPct}%</div>
                    {upgrades.has('tracer_sense') && tracerNode && net.nodes[tracerNode] && (
                      <div style={{ color: 'rgba(239,68,68,0.7)' }}>Location: {net.nodes[tracerNode].hostname}</div>
                    )}
                    <div style={{ color: 'rgba(201,164,85,0.5)', marginTop: 3 }}>Run: kill tracer (when on its node)</div>
                  </div>
                ) : (
                  <div style={{ marginBottom: 8, padding: '4px 7px', background: 'rgba(201,164,85,0.06)', border: '1px solid rgba(201,164,85,0.15)', fontSize: 9, color: 'rgba(201,164,85,0.4)' }}>
                    No active tracer. Appears at alert≥2 or 4+ cracked nodes.
                  </div>
                )}

                {/* Base upgrade tiles */}
                {Object.values(BASE_UPGRADES).map(upg => {
                  const owned = baseUpgrades.has(upg.id)
                  const canAfford = credits >= upg.cost
                  const isKillSwitch = upg.id === 'kill_switch'
                  const used = isKillSwitch && killSwitchUsed
                  const bg = owned ? 'rgba(201,164,85,0.12)' : canAfford ? 'rgba(201,164,85,0.07)' : 'rgba(201,164,85,0.03)'
                  const borderColor = owned ? 'rgba(201,164,85,0.3)' : 'rgba(201,164,85,0.15)'
                  return (
                    <div key={upg.id} style={{ marginBottom: 5, padding: '5px 7px', background: bg, border: `1px solid ${borderColor}`, cursor: (!owned && canAfford) ? 'pointer' : 'default' }}
                      onClick={e => { e.stopPropagation(); if (!owned && canAfford) runCmd(`base buy ${upg.id}`) }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                        <span style={{ color: used ? '#ef4444' : owned ? '#4ade80' : '#22C55E', fontSize: 10 }}>{upg.name}</span>
                        <span style={{ fontSize: 9, color: used ? '#ef4444' : owned ? '#4ade80' : canAfford ? '#eab308' : '#ef4444' }}>
                          {used ? 'USED' : owned ? 'ACTIVE' : `${upg.cost}cr`}
                        </span>
                      </div>
                      <div style={{ fontSize: 9, color: 'rgba(201,164,85,0.45)' }}>{upg.desc}</div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* SHOP */}
            {panel === 'shop' && (
              <div style={{ padding: 8, overflowY: 'auto', height: '100%', boxSizing: 'border-box' }}>
                <div style={{ color: 'rgba(201,164,85,0.5)', fontSize: 9, marginBottom: 4 }}>OPERATOR MARKET</div>
                <div style={{ color: '#4ade80', fontSize: 10, marginBottom: 8 }}>Credits: {credits}cr</div>
                {Object.values(UPGRADES).map(upg => {
                  const owned = upgrades.has(upg.id)
                  const locked = !!(upg.requires && !upgrades.has(upg.requires))
                  const canAfford = credits >= upg.cost
                  let bg = 'rgba(201,164,85,0.06)'
                  let borderColor = 'rgba(201,164,85,0.15)'
                  let textColor = 'rgba(201,164,85,0.5)'
                  if (owned) { bg = 'rgba(201,164,85,0.12)'; borderColor = 'rgba(201,164,85,0.3)'; textColor = '#4ade80' }
                  else if (!locked && canAfford) { bg = 'rgba(201,164,85,0.08)'; borderColor = 'rgba(201,164,85,0.25)'; textColor = '#22C55E' }
                  return (
                    <div key={upg.id} style={{
                      marginBottom: 5, padding: '5px 7px',
                      background: bg, border: `1px solid ${borderColor}`,
                      cursor: (!owned && !locked && canAfford) ? 'pointer' : 'default',
                    }}
                      onClick={e => { e.stopPropagation(); if (!owned && !locked) runCmd(`buy ${upg.id}`) }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                        <span style={{ color: textColor, fontSize: 10 }}>{upg.name}</span>
                        <span style={{ fontSize: 9, color: owned ? '#4ade80' : locked ? 'rgba(201,164,85,0.3)' : canAfford ? '#eab308' : '#ef4444' }}>
                          {owned ? 'OWNED' : locked ? 'LOCKED' : `${upg.cost}cr`}
                        </span>
                      </div>
                      <div style={{ fontSize: 9, color: 'rgba(201,164,85,0.45)' }}>{upg.desc}</div>
                      {locked && upg.requires && (
                        <div style={{ fontSize: 8, color: 'rgba(201,164,85,0.3)', marginTop: 2 }}>
                          Requires: {UPGRADES[upg.requires]?.name}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── Right panel (log + mini-game) ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

          {/* CTF banner */}
          {ctfMode && !ctfSolved && (
            <div style={{
              background: 'rgba(234,179,8,0.08)', borderBottom: '1px solid rgba(234,179,8,0.2)',
              padding: '2px 8px', fontSize: 9, color: '#eab308',
            }}>
              ★ CTF MISSION ACTIVE — find the FLAG hidden in the network. Submit with: submit FLAG{'{...}'}
            </div>
          )}
          {ctfSolved && (
            <div style={{
              background: 'rgba(201,164,85,0.1)', borderBottom: '1px solid rgba(201,164,85,0.3)',
              padding: '2px 8px', fontSize: 9, color: '#4ade80',
            }}>
              ★ CTF SOLVED — OPERATOR ELITE. Well played.
            </div>
          )}

          {/* Mini-game overlay */}
          {minigame && (
            <div style={{
              position: 'absolute', inset: 0, zIndex: 10,
              background: 'rgba(5,9,5,0.97)', border: '1px solid rgba(201,164,85,0.3)',
              display: 'flex', flexDirection: 'column', padding: 16, overflowY: 'auto',
            }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ color: '#22C55E', fontSize: 12, marginBottom: 10, letterSpacing: 2 }}>
                ◈ {minigame.title}
              </div>
              <div style={{ color: 'rgba(201,164,85,0.5)', fontSize: 9, marginBottom: 8 }}>
                Reward: <span style={{ color: '#4ade80' }}>{minigame.reward}cr</span>
              </div>

              {/* DECRYPT */}
              {minigame.type === 'decrypt' && (
                <>
                  <div style={{ background: 'rgba(201,164,85,0.07)', border: '1px solid rgba(201,164,85,0.2)', padding: 10, marginBottom: 8, fontFamily: 'monospace', fontSize: 11, color: '#eab308', wordBreak: 'break-all' }}>
                    {minigame.encoded}
                  </div>
                  <div style={{ color: 'rgba(201,164,85,0.6)', fontSize: 10, marginBottom: 12 }}>
                    Hint: {minigame.hint}
                  </div>
                  <div style={{ color: 'rgba(201,164,85,0.4)', fontSize: 9, marginBottom: 8 }}>
                    Attempts remaining: {minigame.attemptsLeft}
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <input
                      ref={mgInputRef}
                      autoFocus
                      value={mgInput}
                      onChange={e => setMgInput(e.target.value)}
                      onKeyDown={e => { e.stopPropagation(); if (e.key === 'Enter') handleMgSubmit() }}
                      onClick={e => e.stopPropagation()}
                      placeholder="Enter decoded answer..."
                      style={{
                        flex: 1, background: 'rgba(201,164,85,0.07)', border: '1px solid rgba(201,164,85,0.3)',
                        color: '#22C55E', ...MONO, fontSize: 11, padding: '6px 10px', outline: 'none',
                      }}
                    />
                    <button onClick={handleMgSubmit} style={mgBtnStyle('#22C55E')}>SUBMIT</button>
                    {upgrades.has('vault_breaker') && (
                      <button onClick={handleMgSkip} style={mgBtnStyle('#eab308')}>SKIP½</button>
                    )}
                  </div>
                </>
              )}

              {/* CRACK */}
              {minigame.type === 'crack' && (
                <>
                  <div style={{ marginBottom: 6, fontSize: 9, color: 'rgba(201,164,85,0.5)' }}>
                    Algorithm: <span style={{ color: '#eab308' }}>{minigame.algorithm}</span>
                  </div>
                  <div style={{ background: 'rgba(201,164,85,0.07)', border: '1px solid rgba(201,164,85,0.2)', padding: 10, marginBottom: 8, fontFamily: 'monospace', fontSize: 10, color: '#eab308', wordBreak: 'break-all' }}>
                    {minigame.hash}
                  </div>
                  <div style={{ color: 'rgba(201,164,85,0.6)', fontSize: 10, marginBottom: 12 }}>
                    Hint: {minigame.hashHint}
                  </div>
                  <div style={{ color: 'rgba(201,164,85,0.4)', fontSize: 9, marginBottom: 8 }}>Select the matching plaintext:</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {minigame.choices?.map((choice, i) => (
                      <button key={i} onClick={() => handleMgChoice(i)} style={mgChoiceStyle()}>
                        [{String.fromCharCode(65 + i)}] {choice}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* INJECT */}
              {minigame.type === 'inject' && (
                <>
                  <div style={{ background: 'rgba(201,164,85,0.07)', border: '1px solid rgba(201,164,85,0.2)', padding: 10, marginBottom: 8, fontFamily: 'monospace', fontSize: 10, color: '#eab308', wordBreak: 'break-all' }}>
                    {minigame.queryTemplate}
                  </div>
                  <div style={{ color: 'rgba(201,164,85,0.6)', fontSize: 10, marginBottom: 12 }}>
                    {minigame.injectHint}
                  </div>
                  <div style={{ color: 'rgba(201,164,85,0.4)', fontSize: 9, marginBottom: 8 }}>Select your injection payload:</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {minigame.injectChoices?.map((choice, i) => (
                      <button key={i} onClick={() => handleMgChoice(i)} style={mgChoiceStyle()}>
                        [{String.fromCharCode(65 + i)}] {choice}
                      </button>
                    ))}
                  </div>
                </>
              )}

              <button onClick={() => { setMinigame(null); setTimeout(() => inputRef.current?.focus(), 100) }}
                style={{ marginTop: 14, background: 'transparent', border: '1px solid rgba(201,164,85,0.2)', color: 'rgba(201,164,85,0.4)', ...MONO, fontSize: 10, padding: '3px 10px', cursor: 'pointer', alignSelf: 'flex-start' }}>
                ABORT
              </button>
            </div>
          )}

          {/* Win overlay */}
          {won && (
            <div style={{
              position: 'absolute', inset: 0, zIndex: 20,
              background: 'rgba(5,9,5,0.96)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ color: '#22C55E', fontSize: 14, letterSpacing: 3, marginBottom: 8 }}>
                ██ MISSION ACCOMPLISHED ██
              </div>
              <div style={{ color: 'rgba(201,164,85,0.6)', fontSize: 10, marginBottom: 16 }}>
                Crown jewel exfiltrated. Network compromised.
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={e => { e.stopPropagation(); setWon(false); const n = genNetwork(); setNet(n); setAlertLevel(0); setAlertCountdown(null); setSoldFiles(new Set()); setCTFMode(false); setCTFSolved(false); setCredits(50); setUpgrades(new Set()); setTracerActive(false); setTracerNode(null); tracerNodeRef.current = null; setTracerPct(0); setBaseUpgrades(new Set()); setKillSwitchUsed(false) }}
                  style={mgBtnStyle('#22C55E')}>NEW NETWORK</button>
                <button onClick={e => { e.stopPropagation(); onExit() }} style={mgBtnStyle('#ef4444')}>EXIT</button>
              </div>
            </div>
          )}

          {/* Log output */}
          <div ref={logRef} style={{ flex: 1, overflowY: 'auto', padding: '6px 10px', fontSize: 10, lineHeight: 1.55 }}>
            {log.map(l => (
              <div key={l.id} style={{ color: LC[l.type], whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                {l.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ borderTop: '1px solid rgba(201,164,85,0.15)', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: 'rgba(201,164,85,0.5)', fontSize: 10 }}>{cur.hostname}$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                color: '#22C55E', ...MONO, fontSize: 10, caretColor: '#22C55E',
              }}
              autoComplete="off" spellCheck={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Mini-game button styles ────────────────────────────────────────────────────
function mgBtnStyle(color: string): React.CSSProperties {
  return {
    background: `rgba(${color === '#22C55E' ? '34,197,94' : color === '#eab308' ? '234,179,8' : '239,68,68'},0.1)`,
    border: `1px solid ${color}`,
    color, fontFamily: '"DM Mono", monospace', fontSize: 10,
    padding: '4px 12px', cursor: 'pointer',
  }
}

function mgChoiceStyle(): React.CSSProperties {
  return {
    background: 'rgba(201,164,85,0.06)', border: '1px solid rgba(201,164,85,0.25)',
    color: '#22C55E', fontFamily: '"DM Mono", monospace', fontSize: 11,
    padding: '10px 14px', cursor: 'pointer', textAlign: 'left',
    transition: 'background 0.1s',
  }
}
