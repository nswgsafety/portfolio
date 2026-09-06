'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HacknetGame from './HacknetGame'

// ── Constants ──────────────────────────────────────────────────────────────
const ACCESS_CODE = '2031'
const WIN_W       = 520
const WIN_W_HN    = 860    // hacknet window width

const SC = 26, SR = 18, SZ = 20
const SCW = SC * SZ        // 520
const SCH = SR * SZ        // 360

const MONO: React.CSSProperties = { fontFamily: '"DM Mono", monospace' }

// ── TicTacToe ─────────────────────────────────────────────────────────────
const TTT_WINS = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

function tttWinner(b: string[]): 'X' | 'O' | 'draw' | null {
  for (const [a, b2, c] of TTT_WINS)
    if (b[a] && b[a] === b[b2] && b[a] === b[c]) return b[a] as 'X' | 'O'
  return b.every(Boolean) ? 'draw' : null
}
function minimax(b: string[], isMax: boolean): number {
  const r = tttWinner(b)
  if (r === 'O') return 10; if (r === 'X') return -10; if (r === 'draw') return 0
  const scores: number[] = []
  b.forEach((c, i) => { if (!c) { const nb = [...b]; nb[i] = isMax ? 'O' : 'X'; scores.push(minimax(nb, !isMax)) } })
  return isMax ? Math.max(...scores) : Math.min(...scores)
}
function bestAI(b: string[]): number {
  let best = -Infinity, idx = 0
  b.forEach((c, i) => { if (!c) { const nb = [...b]; nb[i] = 'O'; const s = minimax(nb, false); if (s > best) { best = s; idx = i } } })
  return idx
}

// ── Types ─────────────────────────────────────────────────────────────────
type Phase  = 'idle' | 'username' | 'adminpass' | 'pin' | 'denied' | 'granted' | 'terminal'
type SubApp = 'snake' | 'tictactoe' | 'notepad' | 'credits' | 'cool' | 'hacknet' | 'pong' | null
type Dir    = 'U' | 'D' | 'L' | 'R'
interface Pt      { x: number; y: number }
interface Line    { id: number; type: 'cmd' | 'out' | 'err' | 'sys'; text: string }
interface Session {
  id:     number
  name:   string
  lines:  Line[]
  sub:    SubApp
  input:  string
  pos:    { x: number; y: number }
  zOrder: number
}

const SINIT: Pt[] = [{ x: 13, y: 9 }, { x: 12, y: 9 }, { x: 11, y: 9 }]
const rand = (n: number) => Math.floor(Math.random() * n)

function snakeFood(sn: Pt[]): Pt {
  let p: Pt
  do { p = { x: rand(SC), y: rand(SR) } } while (sn.some(s => s.x === p.x && s.y === p.y))
  return p
}

const MATRIX_CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ0110ハヒフヘホマミムメモ'

const HELP_LINES = [
  '  ┌─────────────────────────────────────────────────┐',
  '  │  AVAILABLE COMMANDS                              │',
  '  ├─────────────────────────────────────────────────┤',
  '  │  /help         list all commands                 │',
  '  │  /whoami       operator dossier                  │',
  '  │  /neofetch     system info                       │',
  '  │  /ls           list directory                    │',
  '  │  /ping         ping target system                │',
  '  │  /scan         run system diagnostic             │',
  '  │  /hack         ...                               │',
  '  │  /fortune      random transmission               │',
  '  │  /sudo         try it                            │',
  '  ├─────────────────────────────────────────────────┤',
  '  │  /snake        play snake                        │',
  '  │  /pong         play pong vs AI                   │',
  '  │  /tictactoe    play tic-tac-toe vs AI            │',
  '  │  /notepad      open notepad                      │',
  '  │  /credits      view credits                      │',
  '  │  /cool         classified visual feed            │',
  '  │  /hacknet      network hacking simulation        │',
  '  ├─────────────────────────────────────────────────┤',
  '  │  /new          open new window                   │',
  '  │  /version      show deployed build info          │',
  '  │  /clear        clear terminal                    │',
  '  │  /exit         close this window                 │',
  '  └─────────────────────────────────────────────────┘',
]

const FORTUNES = [
  '"The best way to predict the future is to invent it." — Alan Kay',
  '"Engineering is the closest thing to magic that exists in the world."',
  '"Move fast. Break the right things."',
  '"Defense is where civilization\'s most important engineering happens."',
  '"If it ain\'t broke, you\'re not pushing hard enough."',
  '"The engineers of tomorrow are the alchemists of the future."',
  '"Ship it. Then make it better."',
  '"Without data, you\'re just another person with an opinion." — W. Edwards Deming',
]

const CREDITS = [
  '  ╔══════════════════════════════════════════════╗',
  '  ║  CLASSIFIED: PROJECT MANIFEST                 ║',
  '  ╠══════════════════════════════════════════════╣',
  '  ║  OPERATOR      Ian Andujar                    ║',
  '  ║  ROLE          Engineering Student · Builder  ║',
  '  ╠══════════════════════════════════════════════╣',
  '  ║  AI PARTNER    Claude Sonnet (Anthropic)      ║',
  '  ║                claude.ai/code                 ║',
  '  ╠══════════════════════════════════════════════╣',
  '  ║  STACK         Next.js · TypeScript           ║',
  '  ║                Framer Motion · Canvas 2D      ║',
  '  ╠══════════════════════════════════════════════╣',
  '  ║  TARGET        Anduril Industries             ║',
  '  ║  ETA           2029 – 2031                    ║',
  '  ╚══════════════════════════════════════════════╝',
]

const LINE_COLOR: Record<Line['type'], string> = {
  cmd: '#22C55E',
  out: 'rgba(201,164,85,0.65)',
  err: '#ef4444',
  sys: 'rgba(201,164,85,0.32)',
}

// ── Component ──────────────────────────────────────────────────────────────
export default function SecretTerminal() {

  // ── Phase ─────────────────────────────────────────────────────────────
  const [phase,          setPhase]         = useState<Phase>('idle')
  const [pin,            setPin]           = useState('')
  const [denied,         setDenied]        = useState('')
  const [usernameInput,  setUsernameInput] = useState('')
  const [adminPassInput, setAdminPassInput]= useState('')
  const [authError,      setAuthError]     = useState('')
  const [isAdmin,        setIsAdmin]       = useState(false)
  const [adminToken,     setAdminToken]    = useState('')
  const [loggedUser,     setLoggedUser]    = useState('')
  const isAdminRef    = useRef(false)
  const adminTokenRef = useRef('')
  const usernameRef   = useRef<HTMLInputElement>(null)
  const adminPassRef  = useRef<HTMLInputElement>(null)

  // ── Multi-window sessions ─────────────────────────────────────────────
  const [sessions,     setSessions]     = useState<Session[]>([])
  const [activeSessId, setActiveSessId] = useState(1)
  const activeSessIdRef = useRef(1)
  const sessIdCtr       = useRef(2)
  const maxZOrder       = useRef(1)

  // ── Shared game display state ─────────────────────────────────────────
  const [sScore, setSScore] = useState(0)
  const [sHi,    setSHi]    = useState(0)
  const [sDead,  setSDead]  = useState(false)
  const [sPause, setSPause] = useState(false)
  const [ttt,    setTtt]    = useState<string[]>(Array(9).fill(''))
  const [tttMsg, setTttMsg] = useState<string | null>(null)
  const [noteText, setNoteText] = useState('')

  // ── Refs ──────────────────────────────────────────────────────────────
  const lid       = useRef(0)
  const tries     = useRef(0)
  const inputRefs = useRef<Record<number, HTMLInputElement | null>>({})
  const scrollRefs = useRef<Record<number, HTMLDivElement | null>>({})

  // Drag
  const dragging = useRef<{ sessId: number; startX: number; startY: number; ox: number; oy: number } | null>(null)

  // Snake
  const snakeCvs = useRef<HTMLCanvasElement>(null)
  const snakeRaf = useRef(0)
  const snakeRef = useRef([...SINIT.map(p => ({ ...p }))])
  const dirRef   = useRef<Dir>('R')
  const ndirRef  = useRef<Dir>('R')
  const foodRef  = useRef(snakeFood(SINIT))
  const scoreRef = useRef(0)
  const hiRef    = useRef(0)
  const deadRef  = useRef(false)
  const pauseRef = useRef(false)
  const spdRef   = useRef(140)
  const ltRef    = useRef(0)

  // Cool
  const coolCvs  = useRef<HTMLCanvasElement>(null)
  const coolRaf  = useRef(0)
  const dropsRef = useRef<number[]>([])

  // TicTacToe
  const aiThink  = useRef(false)

  // Pong
  const pongCvs    = useRef<HTMLCanvasElement>(null)
  const pongRaf    = useRef(0)
  const pongBall   = useRef({ x: SCW / 2, y: SCH / 2, vx: 5, vy: 2 })
  const pongPL     = useRef(SCH / 2 - 35)
  const pongPR     = useRef(SCH / 2 - 35)
  const pongSL     = useRef(0)
  const pongSR     = useRef(0)
  const pongSpeed  = useRef(5)
  const pongKeys   = useRef<Set<string>>(new Set())
  const [pongScore,  setPongScore]  = useState<[number, number]>([0, 0])
  const [pongWinner, setPongWinner] = useState<'YOU' | 'AI' | null>(null)

  // ── Derived ───────────────────────────────────────────────────────────
  const snakeVisible = sessions.some(s => s.sub === 'snake')
  const coolVisible  = sessions.some(s => s.sub === 'cool')
  const pongVisible  = sessions.some(s => s.sub === 'pong')

  // ── Helpers ───────────────────────────────────────────────────────────
  const mkL = (type: Line['type'], text: string): Line => ({ id: lid.current++, type, text })

  function setActiveSessIdSync(id: number) {
    activeSessIdRef.current = id
    setActiveSessId(id)
  }

  function updateSessInput(sessId: number, val: string) {
    setSessions(prev => prev.map(s => s.id === sessId ? { ...s, input: val } : s))
  }

  function bringToFront(sessId: number) {
    maxZOrder.current++
    const z = maxZOrder.current
    setSessions(prev => prev.map(s => s.id === sessId ? { ...s, zOrder: z } : s))
    setActiveSessIdSync(sessId)
  }

  function addSession() {
    const id = sessIdCtr.current++
    maxZOrder.current++
    const base = sessions.find(s => s.id === activeSessIdRef.current) || sessions[sessions.length - 1]
    const newPos = base
      ? { x: Math.min(base.pos.x + 40, window.innerWidth - WIN_W - 20), y: Math.min(base.pos.y + 40, window.innerHeight - 300) }
      : { x: 120, y: 120 }
    const newSess: Session = {
      id, name: `sess-${id}`,
      lines: [mkL('sys', '  New session opened. Type /help for commands.')],
      sub: null, input: '',
      pos: newPos, zOrder: maxZOrder.current,
    }
    setSessions(prev => [...prev, newSess])
    setActiveSessIdSync(id)
    setTimeout(() => inputRefs.current[id]?.focus(), 80)
  }

  function closeSession(sessId: number) {
    setSessions(prev => {
      if (prev.length <= 1) { close(); return prev }
      const next = prev.filter(s => s.id !== sessId)
      if (sessId === activeSessIdRef.current) {
        const fallback = next[next.length - 1]
        setActiveSessIdSync(fallback.id)
        setTimeout(() => inputRefs.current[fallback.id]?.focus(), 80)
      }
      return next
    })
  }

  function close() {
    cancelAnimationFrame(snakeRaf.current)
    cancelAnimationFrame(coolRaf.current)
    cancelAnimationFrame(pongRaf.current)
    setPhase('idle')
    setSessions([])
    setActiveSessIdSync(1)
    sessIdCtr.current = 2
    maxZOrder.current = 1
    setPin('')
    setUsernameInput(''); setAdminPassInput(''); setAuthError('')
    setIsAdmin(false); setAdminToken(''); setLoggedUser('')
    isAdminRef.current = false; adminTokenRef.current = ''
    setSDead(false); setSPause(false); setSScore(0)
  }

  function exitSubForSess(sessId: number) {
    cancelAnimationFrame(snakeRaf.current)
    cancelAnimationFrame(coolRaf.current)
    cancelAnimationFrame(pongRaf.current)
    pongKeys.current.clear()
    setSDead(false); setSPause(false); setSScore(0)
    setSessions(prev => prev.map(s => s.id === sessId ? { ...s, sub: null } : s))
    if (sessId === activeSessIdRef.current) {
      setTimeout(() => inputRefs.current[sessId]?.focus(), 80)
    }
  }

  // ── Auto-scroll ───────────────────────────────────────────────────────
  useEffect(() => {
    sessions.forEach(s => {
      const el = scrollRefs.current[s.id]
      if (el) el.scrollTop = el.scrollHeight
    })
  }, [sessions])

  // ── Console clue ──────────────────────────────────────────────────────
  useEffect(() => {
    const g = 'color:#22C55E;font-family:monospace;font-size:11px;line-height:1.8;'
    const b = 'color:#4ade80;font-family:monospace;font-size:12px;font-weight:bold;line-height:1.8;'
    console.log('%c╔════════════════════════════════════════════╗', b)
    console.log('%c║   CLASSIFIED SYSTEM DETECTED                ║', b)
    console.log('%c║   HINT: THE YEAR THE MISSION ENDS           ║', g)
    console.log('%c║   FIND THE TERMINAL. ENTER THE CODE.        ║', g)
    console.log('%c╚════════════════════════════════════════════╝', b)
  }, [])

  // ── PIN keyboard ──────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'pin') return
    const h = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') setPin(p => p.length < 4 ? p + e.key : p)
      else if (e.key === 'Backspace') setPin(p => p.slice(0, -1))
      else if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (pin.length === 4 && phase === 'pin') checkPin(pin)
  }, [pin]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Username submission ────────────────────────────────────────────────
  async function submitUsername() {
    const u = usernameInput.trim()
    if (!u) return
    setAuthError('')
    try {
      const res = await fetch('/api/terminal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', username: u, password: '', ua: navigator.userAgent }),
      })
      const data = await res.json()
      if (data.requiresPassword) {
        setPhase('adminpass')
      } else {
        setLoggedUser(u)
        setPhase('pin')
      }
    } catch {
      // If API fails (local dev without server), just continue
      setLoggedUser(u)
      setPhase('pin')
    }
  }

  // ── Admin password submission ──────────────────────────────────────────
  async function submitAdminPass() {
    const u = usernameInput.trim()
    const p = adminPassInput
    if (!p) return
    setAuthError('')
    try {
      const res = await fetch('/api/terminal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', username: u, password: p, ua: navigator.userAgent }),
      })
      const data = await res.json()
      if (data.ok) {
        isAdminRef.current = true
        adminTokenRef.current = data.token ?? ''
        setIsAdmin(true)
        setAdminToken(data.token ?? '')
        setLoggedUser(u)
        setAdminPassInput('')
        setPhase('pin')
      } else {
        setAuthError('ACCESS_DENIED — invalid credentials')
        setAdminPassInput('')
      }
    } catch {
      setAuthError('CONNECTION_ERROR — try again')
      setAdminPassInput('')
    }
  }

  function checkPin(code: string) {
    if (code === ACCESS_CODE) {
      setPhase('granted')
      setTimeout(() => {
        const cx = Math.max(20, window.innerWidth / 2 - WIN_W / 2)
        const cy = Math.max(20, window.innerHeight / 2 - 200)
        const user = loggedUser || 'OPERATOR'
        const adminLine = isAdminRef.current
          ? mkL('sys', '  ADMIN_MODE_ACTIVE — type /logs to view access log')
          : mkL('sys', `  Welcome, ${user.toUpperCase()}.`)
        setSessions([{
          id: 1, name: 'main',
          lines: [
            mkL('sys', '  CLASSIFIED_ACCESS_TERMINAL v2.0'),
            adminLine,
            mkL('sys', '  Type /help to see all commands.'),
            mkL('sys', ''),
          ],
          sub: null, input: '',
          pos: { x: cx, y: cy }, zOrder: 1,
        }])
        setActiveSessIdSync(1)
        setPhase('terminal')
      }, 1900)
    } else {
      const msgs = ['CLEARANCE_CODE_INVALID', 'ACCESS_DENIED', 'SECURITY_ALERT_TRIGGERED', 'FINAL_WARNING']
      setDenied(msgs[Math.min(tries.current, msgs.length - 1)])
      tries.current++
      setPhase('denied'); setPin('')
      setTimeout(() => setPhase('pin'), 1500)
    }
  }

  // ESC on non-terminal phases
  useEffect(() => {
    if (phase === 'idle' || phase === 'terminal' || phase === 'pin') return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps

  // Focus inputs when phases appear
  useEffect(() => {
    if (phase === 'username')  setTimeout(() => usernameRef.current?.focus(), 80)
    if (phase === 'adminpass') setTimeout(() => adminPassRef.current?.focus(), 80)
  }, [phase])

  // ── Drag logic ────────────────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return
      const { sessId, startX, startY, ox, oy } = dragging.current
      setSessions(prev => prev.map(s =>
        s.id === sessId ? { ...s, pos: { x: ox + e.clientX - startX, y: oy + e.clientY - startY } } : s
      ))
    }
    const onUp = () => { dragging.current = null }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  function startDrag(e: React.MouseEvent, sessId: number) {
    const sess = sessions.find(s => s.id === sessId)
    if (!sess) return
    e.preventDefault()
    dragging.current = { sessId, startX: e.clientX, startY: e.clientY, ox: sess.pos.x, oy: sess.pos.y }
    bringToFront(sessId)
  }

  // ── Command runner (per session) ──────────────────────────────────────
  function runCmdForSess(sessId: number, raw: string) {
    const c = raw.trim().toLowerCase()

    const addLines = (...ls: Line[]) => {
      setSessions(prev => prev.map(s => s.id === sessId ? { ...s, lines: [...s.lines, ...ls] } : s))
    }
    const later = (items: Array<[string, Line['type'], number]>) => {
      items.forEach(([text, type, ms]) => {
        setTimeout(() => setSessions(prev => prev.map(s =>
          s.id === sessId ? { ...s, lines: [...s.lines, { id: lid.current++, type, text }] } : s
        )), ms)
      })
    }
    const setSub = (val: SubApp) => {
      setSessions(prev => prev.map(s => s.id === sessId ? { ...s, sub: val } : s))
    }

    if (c) addLines(mkL('cmd', `> ${raw}`))

    if (c === '/help') {
      addLines(...HELP_LINES.map(t => mkL('out', t)))

    } else if (c === '/version') {
      const sha  = process.env.NEXT_PUBLIC_BUILD_SHA  ?? 'local'
      const msg  = process.env.NEXT_PUBLIC_BUILD_MSG  ?? 'dev build'
      const time = process.env.NEXT_PUBLIC_BUILD_TIME ?? 'unknown'
      const short = sha === 'local' ? 'local' : sha.slice(0, 7)
      addLines(
        mkL('sys', '  ┌─────────────────────────────────────────────┐'),
        mkL('out', '  │  BUILD INFO                                  │'),
        mkL('sys', '  ├─────────────────────────────────────────────┤'),
        mkL('out', `  │  commit  : ${short.padEnd(33)}│`),
        mkL('out', `  │  message : ${msg.slice(0, 33).padEnd(33)}│`),
        mkL('out', `  │  built   : ${time.slice(0, 33).padEnd(33)}│`),
        mkL('sys', '  └─────────────────────────────────────────────┘'),
      )

    } else if (c === '/logs') {
      if (!isAdminRef.current) {
        addLines(mkL('err', '  ACCESS_DENIED — insufficient clearance'))
      } else {
        addLines(mkL('sys', '  Fetching access log...'))
        fetch('/api/terminal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'logs', token: adminTokenRef.current }),
        })
          .then(r => r.json())
          .then(data => {
            if (!data.ok) {
              setSessions(prev => prev.map(s => s.id === sessId ? { ...s, lines: [...s.lines, { id: lid.current++, type: 'err', text: `  ERROR: ${data.error}` }] } : s))
              return
            }
            const entries = data.logs as Array<{ username: string; timestamp: string; ip: string; ua: string; success: boolean; admin: boolean }>
            const newLines: Line[] = [
              { id: lid.current++, type: 'sys', text: `  ┌── ACCESS LOG (${entries.length} entries) ──────────────────────` },
            ]
            if (entries.length === 0) {
              newLines.push({ id: lid.current++, type: 'out', text: '  │  No entries yet.' })
            } else {
              for (const e of entries) {
                const ts = new Date(e.timestamp).toLocaleString()
                const status = e.success ? '✓' : '✗'
                const tag = e.admin ? ' [ADMIN]' : ''
                newLines.push({ id: lid.current++, type: e.success ? 'out' : 'err', text: `  │  ${status} ${e.username}${tag}  ${ts}  ${e.ip}` })
                newLines.push({ id: lid.current++, type: 'sys', text: `  │     UA: ${e.ua.slice(0, 60)}` })
              }
            }
            newLines.push({ id: lid.current++, type: 'sys', text: '  └──────────────────────────────────────────────────────────' })
            setSessions(prev => prev.map(s => s.id === sessId ? { ...s, lines: [...s.lines, ...newLines] } : s))
          })
          .catch(() => {
            setSessions(prev => prev.map(s => s.id === sessId ? { ...s, lines: [...s.lines, { id: lid.current++, type: 'err', text: '  NETWORK_ERROR — could not fetch logs' }] } : s))
          })
      }

    } else if (c === '/clear') {
      setSessions(prev => prev.map(s => s.id === sessId ? { ...s, lines: [] } : s))

    } else if (c === '/exit') {
      later([
        ['  CLOSING_SESSION...', 'out', 0],
        ['  OPERATOR_LOGGED_OUT', 'out', 400],
        ['  GOODBYE, IAN_ANDUJAR', 'sys', 700],
      ])
      setTimeout(() => closeSession(sessId), 1400)

    } else if (c === '/whoami') {
      addLines(
        mkL('out', '  ┌─────────────────────────────────────────┐'),
        mkL('out', '  │  OPERATOR_DOSSIER                        │'),
        mkL('out', '  ├─────────────────────────────────────────┤'),
        mkL('out', '  │  NAME       IAN_ANDUJAR                  │'),
        mkL('out', '  │  CLEARANCE  LEVEL_5 — CLASSIFIED         │'),
        mkL('out', '  │  ROLE       ENGINEERING_STUDENT          │'),
        mkL('out', '  │  SKILLS     SYSTEMS · ROBOTICS · CAD     │'),
        mkL('out', '  │  BASE       PARAMUS, NJ                  │'),
        mkL('out', '  │  TARGET     ANDURIL_INDUSTRIES           │'),
        mkL('out', '  │  STATUS     IN_PURSUIT                   │'),
        mkL('out', '  │  ETA        2029 – 2031                  │'),
        mkL('out', '  └─────────────────────────────────────────┘'),
      )

    } else if (c === '/neofetch') {
      const uptime = Math.floor((Date.now() - performance.timeOrigin) / 1000)
      addLines(
        mkL('out', ''),
        mkL('out', '  ian@classified'),
        mkL('out', '  ─────────────────────────────────────────'),
        mkL('out', `  OS        Anduril OS (simulated)`),
        mkL('out', `  TERMINAL  classified-terminal v2.0`),
        mkL('out', `  UPTIME    ${uptime}s (this session)`),
        mkL('out', `  SHELL     /bin/ambition`),
        mkL('out', `  DE        framer-motion + canvas 2d`),
        mkL('out', `  CPU       human brain @ max_clock`),
        mkL('out', `  TARGET    Anduril Industries`),
        mkL('out', `  ETA       2029 – 2031`),
        mkL('out', '  ─────────────────────────────────────────'),
        mkL('out', '  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■'),
        mkL('out', ''),
      )

    } else if (c === '/ls') {
      addLines(
        mkL('out', '  total 7'),
        mkL('out', '  drwxr-x---  ian  classified  projects/'),
        mkL('out', '  drwxr-x---  ian  classified  classified/'),
        mkL('out', '  -rw-r--r--  ian  ian         resume.pdf'),
        mkL('out', '  -rw-r--r--  ian  ian         goals.md'),
        mkL('out', '  -rw-r-----  ian  classified  mission_brief.enc'),
        mkL('out', '  -r--------  ian  ian         [REDACTED].key'),
      )

    } else if (c === '/fortune') {
      const quote = FORTUNES[Math.floor(Math.random() * FORTUNES.length)]
      addLines(
        mkL('sys', '  ── TRANSMISSION ─────────────────────────'),
        mkL('out', `  ${quote}`),
        mkL('sys', '  ──────────────────────────────────────────'),
      )

    } else if (c === '/sudo') {
      later([
        ['  [sudo] password for operator: ••••••••', 'out', 0],
        ['  sudo: NICE_TRY', 'err', 800],
        ['  CLEARANCE_LEVEL_INSUFFICIENT', 'err', 1100],
        ['  INCIDENT_LOGGED. REPORTING_TO_HQ...', 'err', 1400],
      ])

    } else if (c === '/ping') {
      const ip = '104.21.88.47'
      later([
        [`  PING anduril.com (${ip}) 56 bytes of data.`, 'out', 0],
        [`  64 bytes: icmp_seq=0 ttl=55 time=12.4 ms`, 'out', 420],
        [`  64 bytes: icmp_seq=1 ttl=55 time=11.8 ms`, 'out', 840],
        [`  64 bytes: icmp_seq=2 ttl=55 time=13.1 ms`, 'out', 1260],
        [`  64 bytes: icmp_seq=3 ttl=55 time=12.6 ms`, 'out', 1680],
        [`  ── ping statistics ──────────────────────`, 'sys', 2000],
        [`  4 packets tx, 4 rx, 0.0% loss, avg 12.5 ms`, 'out', 2100],
        [`  TARGET_REACHABLE ✓`, 'out', 2300],
      ])

    } else if (c === '/scan') {
      later([
        ['  INITIATING_SYSTEM_SCAN...', 'out', 0],
        ['  [◈] network_interfaces ........  OK', 'out', 350],
        ['  [◈] process_table .............  OK', 'out', 650],
        ['  [◈] security_modules ..........  OK', 'out', 950],
        ['  [◈] clearance_records .........  OK', 'out', 1250],
        ['  [◈] threat_assessment .........  OK', 'out', 1550],
        ['  ─────────────────────────────────────', 'sys', 1800],
        ['  RESULT    ALL_SYSTEMS_NOMINAL', 'out', 1900],
        ['  THREATS   NONE_DETECTED', 'out', 2000],
        ['  STATUS    OPERATOR_CLEARANCE_VERIFIED', 'out', 2150],
      ])

    } else if (c === '/hack') {
      later([
        ['  INITIATING_SEQUENCE...', 'out', 0],
        ['  [+] locating target infrastructure...', 'out', 380],
        ['  [+] bypassing perimeter firewall...', 'out', 720],
        ['  [+] firewall bypassed', 'out', 980],
        ['  [+] injecting payload...', 'out', 1250],
        ['  [+] escalating privileges...', 'out', 1580],
        ['  [+] cracking 2048-bit encryption...', 'out', 1900],
        ['  [!] ROOT_ACCESS_OBTAINED', 'err', 2500],
        ['  [!] WELCOME TO THE GRID, OPERATOR', 'err', 2800],
        ['  ████████████████████████████████ 100%', 'out', 3100],
        ['  ACCESS_LEVEL: UNRESTRICTED', 'out', 3400],
      ])

    } else if (c === '/snake') {
      addLines(mkL('out', '  LAUNCHING SNAKE...'))
      setTimeout(() => { resetSnake(); setSub('snake') }, 300)

    } else if (c === '/pong') {
      addLines(mkL('out', '  LAUNCHING PONG...'), mkL('sys', '  W/S or ↑↓ to move · first to 7 wins'))
      setTimeout(() => setSub('pong'), 300)

    } else if (c === '/tictactoe') {
      addLines(mkL('out', '  LAUNCHING TIC-TAC-TOE...'))
      setTimeout(() => { setTtt(Array(9).fill('')); setTttMsg(null); aiThink.current = false; setSub('tictactoe') }, 300)

    } else if (c === '/notepad') {
      addLines(mkL('out', '  LAUNCHING NOTEPAD...'))
      setTimeout(() => setSub('notepad'), 300)

    } else if (c === '/credits') {
      addLines(mkL('out', '  LOADING CREDITS...'))
      setTimeout(() => setSub('credits'), 300)

    } else if (c === '/cool') {
      addLines(mkL('out', '  INITIATING CLASSIFIED VISUAL FEED...'))
      setTimeout(() => setSub('cool'), 300)

    } else if (c === '/hacknet') {
      addLines(mkL('out', '  LAUNCHING HACKNET SIMULATION...'))
      setTimeout(() => setSub('hacknet'), 300)

    } else if (c === '/new') {
      addLines(mkL('out', '  SPAWNING NEW WINDOW...'))
      setTimeout(() => addSession(), 300)

    } else if (c === '') {
      // noop
    } else {
      addLines(
        mkL('err', `  command not found: ${c}`),
        mkL('err', `  type /help for available commands`),
      )
    }
  }

  // ── Snake ─────────────────────────────────────────────────────────────
  function resetSnake() {
    snakeRef.current = [...SINIT.map(p => ({ ...p }))]
    dirRef.current = 'R'; ndirRef.current = 'R'
    foodRef.current = snakeFood(SINIT)
    scoreRef.current = 0; deadRef.current = false
    pauseRef.current = false; spdRef.current = 140; ltRef.current = 0
    setSScore(0); setSDead(false); setSPause(false)
  }

  useEffect(() => {
    if (!snakeVisible) return
    const canvas = snakeCvs.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    function frame(ts: number) {
      if (!deadRef.current && !pauseRef.current && ts - ltRef.current >= spdRef.current) {
        ltRef.current = ts
        const h = snakeRef.current[0]
        const d = (dirRef.current = ndirRef.current)
        let nx = h.x + (d === 'R' ? 1 : d === 'L' ? -1 : 0)
        let ny = h.y + (d === 'D' ? 1 : d === 'U' ? -1 : 0)
        nx = (nx + SC) % SC; ny = (ny + SR) % SR
        if (snakeRef.current.slice(1).some(s => s.x === nx && s.y === ny)) {
          deadRef.current = true
          if (scoreRef.current > hiRef.current) hiRef.current = scoreRef.current
          setSDead(true); setSHi(hiRef.current)
        } else {
          const ate = nx === foodRef.current.x && ny === foodRef.current.y
          const ns  = [{ x: nx, y: ny }, ...snakeRef.current]
          if (!ate) ns.pop()
          snakeRef.current = ns
          if (ate) { scoreRef.current += 10; setSScore(scoreRef.current); foodRef.current = snakeFood(ns); spdRef.current = Math.max(55, spdRef.current - 2) }
        }
      }
      ctx.fillStyle = '#050905'; ctx.fillRect(0, 0, SCW, SCH)
      ctx.strokeStyle = 'rgba(201,164,85,0.06)'; ctx.lineWidth = 0.5
      for (let x = 0; x <= SC; x++) { ctx.beginPath(); ctx.moveTo(x * SZ, 0); ctx.lineTo(x * SZ, SCH); ctx.stroke() }
      for (let y = 0; y <= SR; y++) { ctx.beginPath(); ctx.moveTo(0, y * SZ); ctx.lineTo(SCW, y * SZ); ctx.stroke() }
      const f = foodRef.current; const pls = Math.sin(ts * 0.003) * 0.3 + 0.7
      const fx = f.x * SZ + SZ / 2, fy = f.y * SZ + SZ / 2
      ctx.shadowColor = '#22C55E'; ctx.shadowBlur = 10 * pls; ctx.fillStyle = `rgba(201,164,85,${pls.toFixed(2)})`
      ctx.beginPath(); ctx.arc(fx, fy, SZ * 0.3, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0
      const sn = snakeRef.current
      sn.forEach((seg, i) => {
        const isHead = i === 0; const alpha = isHead ? 1 : Math.max(0.2, 1 - (i / sn.length) * 0.78)
        ctx.shadowBlur = isHead ? 14 : 0; ctx.shadowColor = '#22C55E'
        ctx.fillStyle = isHead ? '#4ade80' : `rgba(201,164,85,${alpha.toFixed(2)})`
        const m = isHead ? 1 : 2; ctx.fillRect(seg.x * SZ + m, seg.y * SZ + m, SZ - m * 2, SZ - m * 2)
        if (isHead) {
          ctx.shadowBlur = 0; ctx.fillStyle = '#050905'
          const bx = seg.x * SZ, by = seg.y * SZ, dd = dirRef.current
          if (dd === 'R') { ctx.fillRect(bx + 13, by + 5, 3, 3); ctx.fillRect(bx + 13, by + 12, 3, 3) }
          if (dd === 'L') { ctx.fillRect(bx + 4,  by + 5, 3, 3); ctx.fillRect(bx + 4,  by + 12, 3, 3) }
          if (dd === 'U') { ctx.fillRect(bx + 5,  by + 4, 3, 3); ctx.fillRect(bx + 12, by + 4,  3, 3) }
          if (dd === 'D') { ctx.fillRect(bx + 5,  by + 14,3, 3); ctx.fillRect(bx + 12, by + 14, 3, 3) }
        }
      })
      ctx.shadowBlur = 0
      if (deadRef.current) {
        ctx.fillStyle = 'rgba(5,9,5,0.9)'; ctx.fillRect(0, 0, SCW, SCH); ctx.textAlign = 'center'
        ctx.fillStyle = '#22C55E'; ctx.font = 'bold 14px "DM Mono",monospace'; ctx.fillText('// GAME_OVER', SCW / 2, SCH / 2 - 30)
        ctx.fillStyle = 'rgba(201,164,85,0.5)'; ctx.font = '11px "DM Mono",monospace'
        ctx.fillText(`SCORE: ${scoreRef.current.toString().padStart(3,'0')}   HI: ${hiRef.current.toString().padStart(3,'0')}`, SCW / 2, SCH / 2 - 4)
        ctx.fillStyle = '#22C55E'; ctx.fillText('[ENTER] RESTART   [ESC] BACK', SCW / 2, SCH / 2 + 26)
      }
      if (pauseRef.current && !deadRef.current) {
        ctx.fillStyle = 'rgba(5,9,5,0.78)'; ctx.fillRect(0, 0, SCW, SCH); ctx.textAlign = 'center'; ctx.fillStyle = '#22C55E'
        ctx.font = '12px "DM Mono",monospace'; ctx.fillText('// PAUSED', SCW / 2, SCH / 2)
        ctx.fillStyle = 'rgba(201,164,85,0.35)'; ctx.font = '9px "DM Mono",monospace'; ctx.fillText('[P] RESUME   [ESC] BACK', SCW / 2, SCH / 2 + 22)
      }
      snakeRaf.current = requestAnimationFrame(frame)
    }
    snakeRaf.current = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(snakeRaf.current)
  }, [snakeVisible]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!snakeVisible) return
    const snakeSessId = sessions.find(s => s.sub === 'snake')?.id
    const h = (e: KeyboardEvent) => {
      const d = dirRef.current
      if (e.key === 'ArrowUp'    || e.key === 'w' || e.key === 'W') { if (d !== 'D') ndirRef.current = 'U' }
      if (e.key === 'ArrowDown'  || e.key === 's' || e.key === 'S') { if (d !== 'U') ndirRef.current = 'D' }
      if (e.key === 'ArrowLeft'  || e.key === 'a' || e.key === 'A') { if (d !== 'R') ndirRef.current = 'L' }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') { if (d !== 'L') ndirRef.current = 'R' }
      if (e.key === 'p' || e.key === 'P') { pauseRef.current = !pauseRef.current; setSPause(pauseRef.current) }
      if (e.key === 'Enter' && deadRef.current) resetSnake()
      if (e.key === 'Escape' && snakeSessId !== undefined) exitSubForSess(snakeSessId)
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) e.preventDefault()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [snakeVisible, sessions]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Cool / matrix rain ────────────────────────────────────────────────
  useEffect(() => {
    if (!coolVisible) return
    const canvas = coolCvs.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const W = canvas.width, H = canvas.height
    const cols = Math.floor(W / 14)
    dropsRef.current = Array(cols).fill(0).map(() => -Math.floor(Math.random() * H / 14))

    function drawCool(ts: number) {
      ctx.fillStyle = 'rgba(5,9,5,0.1)'; ctx.fillRect(0, 0, W, H)
      ctx.font = '13px "DM Mono", monospace'
      dropsRef.current.forEach((y, i) => {
        const ch = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
        const x  = i * 14 + 7
        ctx.fillStyle = '#4ade80'; ctx.fillText(ch, x - 6, y * 14)
        ctx.fillStyle = 'rgba(201,164,85,0.5)'; if (y > 1) ctx.fillText(MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)], x - 6, (y - 1) * 14)
        ctx.fillStyle = 'rgba(201,164,85,0.18)'; if (y > 2) ctx.fillText(MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)], x - 6, (y - 2) * 14)
        dropsRef.current[i]++
        if (dropsRef.current[i] * 14 > H && Math.random() > 0.975) dropsRef.current[i] = 0
      })
      const blink = Math.sin(ts * 0.005) > 0
      ctx.fillStyle = 'rgba(5,9,5,0.82)'; ctx.fillRect(W / 2 - 178, H / 2 - 38, 356, 76)
      ctx.strokeStyle = 'rgba(201,164,85,0.45)'; ctx.lineWidth = 1; ctx.strokeRect(W / 2 - 178, H / 2 - 38, 356, 76)
      ctx.textAlign = 'center'
      ctx.fillStyle = blink ? '#4ade80' : 'rgba(201,164,85,0.55)'; ctx.font = 'bold 14px "DM Mono", monospace'; ctx.fillText('// CLASSIFIED //', W / 2, H / 2 - 12)
      ctx.fillStyle = 'rgba(201,164,85,0.6)'; ctx.font = '10px "DM Mono", monospace'; ctx.fillText('OPERATOR: IAN_ANDUJAR  ·  TARGET: ANDURIL_INDUSTRIES', W / 2, H / 2 + 12)
      ctx.fillStyle = 'rgba(201,164,85,0.3)'; ctx.font = '9px "DM Mono", monospace'; ctx.fillText(`SESSION_UPTIME: ${Math.floor(ts / 1000).toString().padStart(6, '0')}s`, W / 2, H / 2 + 30)
      coolRaf.current = requestAnimationFrame(drawCool)
    }
    coolRaf.current = requestAnimationFrame(drawCool)
    return () => cancelAnimationFrame(coolRaf.current)
  }, [coolVisible])

  // ── Pong game loop ────────────────────────────────────────────────────
  useEffect(() => {
    if (!pongVisible) return
    const canvas = pongCvs.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const PW = 12, PH = 70, BR = 7, PSPD = 5, ASPD = 4, WIN = 7

    function resetBall(dir: 1 | -1) {
      pongBall.current = { x: SCW / 2, y: SCH / 2, vx: dir * pongSpeed.current, vy: (Math.random() * 4 - 2) }
      pongSpeed.current = 5
    }

    pongBall.current = { x: SCW / 2, y: SCH / 2, vx: 5, vy: 2 }
    pongPL.current = SCH / 2 - 35
    pongPR.current = SCH / 2 - 35
    pongSL.current = 0; pongSR.current = 0
    pongSpeed.current = 5
    setPongScore([0, 0]); setPongWinner(null)

    function loop() {
      const b = pongBall.current
      b.x += b.vx; b.y += b.vy

      // Wall bounce
      if (b.y - BR <= 0)    { b.y = BR;        b.vy = Math.abs(b.vy) }
      if (b.y + BR >= SCH)  { b.y = SCH - BR;  b.vy = -Math.abs(b.vy) }

      // Player input
      if (pongKeys.current.has('w') || pongKeys.current.has('arrowup'))
        pongPL.current = Math.max(0, pongPL.current - PSPD)
      if (pongKeys.current.has('s') || pongKeys.current.has('arrowdown'))
        pongPL.current = Math.min(SCH - PH, pongPL.current + PSPD)

      // AI tracking
      const aiCenter = pongPR.current + PH / 2
      if (aiCenter < b.y - 4) pongPR.current = Math.min(SCH - PH, pongPR.current + ASPD)
      if (aiCenter > b.y + 4) pongPR.current = Math.max(0, pongPR.current - ASPD)

      // Left paddle hit
      if (b.x - BR <= PW + 8 && b.y >= pongPL.current && b.y <= pongPL.current + PH && b.vx < 0) {
        pongSpeed.current = Math.min(pongSpeed.current + 0.4, 14)
        b.vx = Math.abs(b.vx) + 0.3
        b.vy += (b.y - (pongPL.current + PH / 2)) * 0.1
        b.x = PW + 8 + BR
      }
      // Right paddle hit
      if (b.x + BR >= SCW - PW - 8 && b.y >= pongPR.current && b.y <= pongPR.current + PH && b.vx > 0) {
        pongSpeed.current = Math.min(pongSpeed.current + 0.4, 14)
        b.vx = -(Math.abs(b.vx) + 0.3)
        b.vy += (b.y - (pongPR.current + PH / 2)) * 0.1
        b.x = SCW - PW - 8 - BR
      }
      b.vy = Math.max(-10, Math.min(10, b.vy))

      // Scoring
      if (b.x < 0) {
        pongSR.current++
        setPongScore([pongSL.current, pongSR.current])
        if (pongSR.current >= WIN) { setPongWinner('AI'); return }
        resetBall(1)
      }
      if (b.x > SCW) {
        pongSL.current++
        setPongScore([pongSL.current, pongSR.current])
        if (pongSL.current >= WIN) { setPongWinner('YOU'); return }
        resetBall(-1)
      }

      // Draw
      ctx.fillStyle = '#050905'
      ctx.fillRect(0, 0, SCW, SCH)

      ctx.setLineDash([6, 8])
      ctx.strokeStyle = 'rgba(201,164,85,0.1)'
      ctx.lineWidth = 1
      ctx.beginPath(); ctx.moveTo(SCW / 2, 0); ctx.lineTo(SCW / 2, SCH); ctx.stroke()
      ctx.setLineDash([])

      ctx.font = '32px "DM Mono",monospace'
      ctx.fillStyle = 'rgba(201,164,85,0.22)'
      ctx.textAlign = 'center'
      ctx.fillText(String(pongSL.current), SCW / 2 - 90, 48)
      ctx.fillText(String(pongSR.current), SCW / 2 + 90, 48)
      ctx.font = '8px "DM Mono",monospace'
      ctx.fillText('YOU', SCW / 2 - 90, 62)
      ctx.fillText('AI', SCW / 2 + 90, 62)

      ctx.fillStyle = '#22C55E'
      ctx.fillRect(8, pongPL.current, PW, PH)
      ctx.fillStyle = 'rgba(201,164,85,0.5)'
      ctx.fillRect(SCW - PW - 8, pongPR.current, PW, PH)

      const grd = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, 18)
      grd.addColorStop(0, 'rgba(201,164,85,0.35)')
      grd.addColorStop(1, 'rgba(201,164,85,0)')
      ctx.beginPath(); ctx.arc(b.x, b.y, 18, 0, Math.PI * 2)
      ctx.fillStyle = grd; ctx.fill()
      ctx.beginPath(); ctx.arc(b.x, b.y, BR, 0, Math.PI * 2)
      ctx.fillStyle = '#22C55E'; ctx.fill()

      ctx.font = '8px "DM Mono",monospace'
      ctx.fillStyle = 'rgba(201,164,85,0.18)'
      ctx.textAlign = 'left'
      ctx.fillText('W/S or ↑↓ to move · first to 7 wins', 10, SCH - 8)

      pongRaf.current = requestAnimationFrame(loop)
    }
    pongRaf.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(pongRaf.current)
  }, [pongVisible]) // eslint-disable-line react-hooks/exhaustive-deps

  // Pong key handler
  useEffect(() => {
    if (!pongVisible) return
    const down = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      if (['w', 's', 'arrowup', 'arrowdown'].includes(k)) { e.preventDefault(); pongKeys.current.add(k) }
    }
    const up = (e: KeyboardEvent) => pongKeys.current.delete(e.key.toLowerCase())
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); pongKeys.current.clear() }
  }, [pongVisible])

  // ── TicTacToe ─────────────────────────────────────────────────────────
  function tttPlay(idx: number) {
    if (ttt[idx] || tttMsg || aiThink.current) return
    const nb = [...ttt]; nb[idx] = 'X'
    const r1 = tttWinner(nb)
    if (r1) { setTtt(nb); setTttMsg(r1 === 'draw' ? 'DRAW — TIE GAME' : 'YOU WIN — IMPRESSIVE'); return }
    aiThink.current = true; setTtt(nb)
    setTimeout(() => {
      const ai = bestAI(nb); nb[ai] = 'O'; const r2 = tttWinner(nb)
      setTtt([...nb]); if (r2) setTttMsg(r2 === 'draw' ? 'DRAW — TIE GAME' : 'AI WINS — RESISTANCE_FUTILE')
      aiThink.current = false
    }, 180)
  }

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Trigger button ──────────────────────────────────────────────── */}
      <button
        onClick={() => { tries.current = 0; setPin(''); setUsernameInput(''); setAdminPassInput(''); setAuthError(''); setPhase('username') }}
        aria-hidden="true"
        style={{
          position: 'fixed', bottom: 14, right: 14,
          background: 'none',
          border: '1px solid rgba(201,164,85,0.2)',
          padding: '5px 11px', cursor: 'pointer', zIndex: 9998,
          color: 'rgba(201,164,85,0.4)', fontSize: '8px',
          letterSpacing: '0.14em', opacity: 0.22,
          transition: 'all 0.35s ease', borderRadius: 0, ...MONO,
        }}
        onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = '#22C55E'; e.currentTarget.style.borderColor = 'rgba(201,164,85,0.6)' }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '0.22'; e.currentTarget.style.color = 'rgba(201,164,85,0.4)'; e.currentTarget.style.borderColor = 'rgba(201,164,85,0.2)' }}
      >
        ◈ ACCESS
      </button>

      <AnimatePresence>
        {phase !== 'idle' && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 99990,
              background: 'rgba(2,5,2,0.93)',
            }}
            onClick={e => { if (e.target === e.currentTarget && phase !== 'terminal') close() }}
          >

            {/* ── Username phase ───────────────────────────────────────────── */}
            {phase === 'username' && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <motion.div
                  key="username-modal"
                  initial={{ opacity: 0, scale: 0.97, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: 14 }}
                  transition={{ duration: 0.2 }}
                  style={{ background: '#050905', border: '1px solid rgba(201,164,85,0.2)', boxShadow: '0 0 80px rgba(201,164,85,0.06)', width: WIN_W, ...MONO }}
                >
                  <div style={{ padding: '9px 14px', borderBottom: '1px solid rgba(201,164,85,0.1)', background: 'rgba(201,164,85,0.025)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      {[0,1,2].map(i => <div key={i} onClick={i === 0 ? close : undefined} style={{ width: 8, height: 8, borderRadius: '50%', background: i === 0 ? '#ff5f57' : 'rgba(201,164,85,0.14)', cursor: i === 0 ? 'pointer' : 'default' }} />)}
                    </div>
                    <span style={{ fontSize: '9px', color: 'rgba(201,164,85,0.35)', letterSpacing: '0.14em', marginLeft: 10 }}>CLASSIFIED_ACCESS_TERMINAL v2.0</span>
                  </div>
                  <div style={{ padding: '36px 46px' }}>
                    <div style={{ fontSize: '10px', color: 'rgba(201,164,85,0.3)', letterSpacing: '0.12em', marginBottom: '24px' }}>{'>'} IDENTIFICATION_REQUIRED</div>
                    <div style={{ fontSize: '10px', color: 'rgba(201,164,85,0.55)', letterSpacing: '0.1em', marginBottom: '14px' }}>ENTER_USERNAME:</div>
                    <input
                      ref={usernameRef}
                      value={usernameInput}
                      onChange={e => setUsernameInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') submitUsername(); if (e.key === 'Escape') close() }}
                      autoComplete="off"
                      spellCheck={false}
                      style={{
                        width: '100%', boxSizing: 'border-box',
                        background: 'rgba(201,164,85,0.04)', border: '1px solid rgba(201,164,85,0.3)',
                        color: '#22C55E', ...MONO, fontSize: '14px', padding: '10px 14px',
                        outline: 'none', letterSpacing: '0.05em',
                      }}
                    />
                    <div style={{ marginTop: '18px', display: 'flex', gap: 10 }}>
                      <button onClick={submitUsername} style={{ background: 'rgba(201,164,85,0.08)', border: '1px solid rgba(201,164,85,0.35)', color: '#22C55E', ...MONO, fontSize: '10px', padding: '7px 20px', cursor: 'pointer', letterSpacing: '0.1em' }}>CONFIRM</button>
                      <button onClick={close} style={{ background: 'transparent', border: '1px solid rgba(201,164,85,0.15)', color: 'rgba(201,164,85,0.35)', ...MONO, fontSize: '10px', padding: '7px 20px', cursor: 'pointer', letterSpacing: '0.1em' }}>ABORT</button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* ── Admin password phase ─────────────────────────────────────── */}
            {phase === 'adminpass' && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <motion.div
                  key="adminpass-modal"
                  initial={{ opacity: 0, scale: 0.97, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: 14 }}
                  transition={{ duration: 0.2 }}
                  style={{ background: '#050905', border: '1px solid rgba(201,164,85,0.2)', boxShadow: '0 0 80px rgba(201,164,85,0.06)', width: WIN_W, ...MONO }}
                >
                  <div style={{ padding: '9px 14px', borderBottom: '1px solid rgba(201,164,85,0.1)', background: 'rgba(201,164,85,0.025)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      {[0,1,2].map(i => <div key={i} onClick={i === 0 ? close : undefined} style={{ width: 8, height: 8, borderRadius: '50%', background: i === 0 ? '#ff5f57' : 'rgba(201,164,85,0.14)', cursor: i === 0 ? 'pointer' : 'default' }} />)}
                    </div>
                    <span style={{ fontSize: '9px', color: 'rgba(201,164,85,0.35)', letterSpacing: '0.14em', marginLeft: 10 }}>CLASSIFIED_ACCESS_TERMINAL v2.0</span>
                  </div>
                  <div style={{ padding: '36px 46px' }}>
                    <div style={{ fontSize: '10px', color: 'rgba(201,164,85,0.3)', letterSpacing: '0.12em', marginBottom: '24px' }}>{'>'} ELEVATED_CLEARANCE_REQUIRED</div>
                    <div style={{ fontSize: '10px', color: 'rgba(201,164,85,0.55)', letterSpacing: '0.1em', marginBottom: '4px' }}>USER: <span style={{ color: '#22C55E' }}>{usernameInput}</span></div>
                    <div style={{ fontSize: '10px', color: 'rgba(201,164,85,0.55)', letterSpacing: '0.1em', marginBottom: '14px', marginTop: '14px' }}>ENTER_PASSWORD:</div>
                    <input
                      ref={adminPassRef}
                      type="password"
                      value={adminPassInput}
                      onChange={e => setAdminPassInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') submitAdminPass(); if (e.key === 'Escape') close() }}
                      autoComplete="off"
                      style={{
                        width: '100%', boxSizing: 'border-box',
                        background: 'rgba(201,164,85,0.04)', border: '1px solid rgba(201,164,85,0.3)',
                        color: '#22C55E', ...MONO, fontSize: '14px', padding: '10px 14px',
                        outline: 'none', letterSpacing: '0.2em',
                      }}
                    />
                    <AnimatePresence>
                      {authError && (
                        <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                          style={{ marginTop: 10, fontSize: '10px', color: '#ef4444', letterSpacing: '0.1em' }}>
                          {authError}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div style={{ marginTop: '18px', display: 'flex', gap: 10 }}>
                      <button onClick={submitAdminPass} style={{ background: 'rgba(201,164,85,0.08)', border: '1px solid rgba(201,164,85,0.35)', color: '#22C55E', ...MONO, fontSize: '10px', padding: '7px 20px', cursor: 'pointer', letterSpacing: '0.1em' }}>AUTHENTICATE</button>
                      <button onClick={close} style={{ background: 'transparent', border: '1px solid rgba(201,164,85,0.15)', color: 'rgba(201,164,85,0.35)', ...MONO, fontSize: '10px', padding: '7px 20px', cursor: 'pointer', letterSpacing: '0.1em' }}>ABORT</button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* ── PIN / boot phases (centered) ────────────────────────────── */}
            {(phase === 'pin' || phase === 'denied' || phase === 'granted') && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <motion.div
                  key="modal"
                  initial={{ opacity: 0, scale: 0.97, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: 14 }}
                  transition={{ duration: 0.2 }}
                  style={{ background: '#050905', border: '1px solid rgba(201,164,85,0.2)', boxShadow: '0 0 80px rgba(201,164,85,0.06)', width: WIN_W, ...MONO }}
                >
                  {/* Chrome */}
                  <div style={{ padding: '9px 14px', borderBottom: '1px solid rgba(201,164,85,0.1)', background: 'rgba(201,164,85,0.025)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      {[0, 1, 2].map(i => (
                        <div key={i} onClick={i === 0 ? close : undefined} style={{ width: 8, height: 8, borderRadius: '50%', background: i === 0 ? '#ff5f57' : 'rgba(201,164,85,0.14)', cursor: i === 0 ? 'pointer' : 'default' }} />
                      ))}
                    </div>
                    <span style={{ fontSize: '9px', color: 'rgba(201,164,85,0.35)', letterSpacing: '0.14em', marginLeft: 10 }}>CLASSIFIED_ACCESS_TERMINAL v2.0</span>
                  </div>

                  {(phase === 'pin' || phase === 'denied') && (
                    <div style={{ padding: '36px 46px' }}>
                      <div style={{ fontSize: '10px', color: 'rgba(201,164,85,0.3)', letterSpacing: '0.12em', marginBottom: '24px' }}>{'>'} CLEARANCE_REQUIRED</div>
                      <div style={{ fontSize: '10px', color: 'rgba(201,164,85,0.55)', letterSpacing: '0.1em', marginBottom: '14px' }}>ENTER_ACCESS_CODE:</div>
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
                        {[0, 1, 2, 3].map(i => (
                          <div key={i} style={{ width: 54, height: 68, border: `1px solid ${pin.length > i ? 'rgba(201,164,85,0.6)' : i === pin.length ? 'rgba(201,164,85,0.38)' : 'rgba(201,164,85,0.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#22C55E', background: pin.length > i ? 'rgba(201,164,85,0.06)' : 'transparent', transition: 'border-color 0.15s ease, background 0.15s ease' }}>
                            {pin.length > i ? '●' : ''}
                          </div>
                        ))}
                      </div>
                      <AnimatePresence>
                        {phase === 'denied' && (
                          <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                            style={{ fontSize: '10px', color: '#ef4444', letterSpacing: '0.1em', marginBottom: '14px' }}>
                            {'> '}{denied}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div style={{ fontSize: '8px', color: 'rgba(201,164,85,0.18)', letterSpacing: '0.08em', marginTop: '20px', lineHeight: 2 }}>
                        [TYPE 4-DIGIT CODE]  ·  [ESC] ABORT<br />
                        <span style={{ color: 'rgba(201,164,85,0.1)' }}>{'// HINT: FINAL YEAR FROM MISSION_OBJECTIVES'}</span>
                      </div>
                    </div>
                  )}

                  {phase === 'granted' && (
                    <div style={{ padding: '36px 46px' }}>
                      {['> VERIFYING_CLEARANCE_CODE...', '> IDENTITY_CONFIRMED', '> INITIALIZING_TERMINAL...', '> WELCOME, OPERATOR_ANDUJAR'].map((line, i) => (
                        <motion.div key={line} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.38, duration: 0.3 }}
                          style={{ fontSize: '11px', letterSpacing: '0.1em', marginBottom: '10px', color: i === 3 ? '#4ade80' : 'rgba(201,164,85,0.55)' }}>
                          {line}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            )}

            {/* ── Terminal windows ─────────────────────────────────────────── */}
            {phase === 'terminal' && sessions.map(sess => {
              const sessW = sess.sub === 'hacknet' ? WIN_W_HN : WIN_W
              const isActive = sess.id === activeSessId

              return (
                <motion.div
                  key={sess.id}
                  initial={{ opacity: 0, scale: 0.96, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 10 }}
                  transition={{ duration: 0.18 }}
                  onClick={() => bringToFront(sess.id)}
                  style={{
                    position: 'absolute',
                    left: sess.pos.x, top: sess.pos.y,
                    width: sessW,
                    zIndex: sess.zOrder,
                    background: '#050905',
                    border: `1px solid ${isActive ? 'rgba(201,164,85,0.3)' : 'rgba(201,164,85,0.12)'}`,
                    boxShadow: isActive ? '0 8px 48px rgba(201,164,85,0.08)' : '0 4px 24px rgba(0,0,0,0.4)',
                    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                    ...MONO,
                  }}
                >
                  {/* ── Chrome bar (draggable) ─────────────────────────────── */}
                  <div
                    onMouseDown={e => startDrag(e, sess.id)}
                    style={{
                      padding: '9px 14px',
                      borderBottom: '1px solid rgba(201,164,85,0.1)',
                      background: 'rgba(201,164,85,0.025)',
                      display: 'flex', alignItems: 'center', gap: '6px',
                      cursor: 'grab', userSelect: 'none',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <div onClick={e => { e.stopPropagation(); closeSession(sess.id) }}
                        style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57', cursor: 'pointer' }} />
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(201,164,85,0.14)' }} />
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(201,164,85,0.14)' }} />
                    </div>
                    <span style={{ fontSize: '9px', color: 'rgba(201,164,85,0.35)', letterSpacing: '0.14em', marginLeft: 10 }}>
                      {sess.sub === 'hacknet' ? 'HACKNET — NETWORK_SIM' : `CLASSIFIED_TERMINAL — ${sess.name}`}
                    </span>
                    {sess.sub === 'snake' && (
                      <span style={{ marginLeft: 'auto', fontSize: '9px', color: 'rgba(201,164,85,0.45)', letterSpacing: '0.08em' }}>
                        SCORE:{sScore.toString().padStart(3, '0')} · HI:{sHi.toString().padStart(3, '0')}
                      </span>
                    )}
                    {sess.sub === 'pong' && (
                      <span style={{ marginLeft: 'auto', fontSize: '9px', color: 'rgba(201,164,85,0.45)', letterSpacing: '0.08em' }}>
                        YOU {pongScore[0]} · AI {pongScore[1]}
                      </span>
                    )}
                    {sessions.length > 1 && sess.sub !== 'snake' && (
                      <button
                        onClick={e => { e.stopPropagation(); addSession() }}
                        style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'rgba(201,164,85,0.3)', fontSize: '14px', cursor: 'pointer', padding: '0 2px', lineHeight: 1 }}
                        title="New window"
                      >+</button>
                    )}
                  </div>

                  {/* ── Sub-app breadcrumb ─────────────────────────────────── */}
                  {sess.sub !== null && (
                    <div style={{ padding: '6px 14px', borderBottom: '1px solid rgba(201,164,85,0.08)', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '9px', color: 'rgba(201,164,85,0.38)', letterSpacing: '0.1em' }}>
                      <span>~/terminal/{sess.sub}</span>
                      <button onClick={() => exitSubForSess(sess.id)} style={{ marginLeft: 'auto', background: 'none', border: '1px solid rgba(201,164,85,0.22)', color: 'rgba(201,164,85,0.5)', padding: '3px 10px', fontSize: '8px', cursor: 'pointer', letterSpacing: '0.1em', borderRadius: 0, ...MONO }}>
                        ← BACK
                      </button>
                    </div>
                  )}

                  {/* ── Terminal history + input ───────────────────────────── */}
                  {sess.sub === null && (
                    <AnimatePresence mode="wait">
                      <motion.div key="term" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}>
                        <div ref={el => { scrollRefs.current[sess.id] = el }} style={{ height: 290, overflowY: 'auto', padding: '14px 16px', scrollbarWidth: 'thin' }}>
                          {sess.lines.map(l => (
                            <div key={l.id} style={{ fontSize: '11px', lineHeight: 1.75, whiteSpace: 'pre', color: LINE_COLOR[l.type], letterSpacing: '0.03em' }}>
                              {l.text}
                            </div>
                          ))}
                        </div>
                        <div style={{ borderTop: '1px solid rgba(201,164,85,0.08)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '11px', color: 'rgba(201,164,85,0.5)' }}>{'>'}</span>
                          <input
                            ref={el => { inputRefs.current[sess.id] = el }}
                            value={sess.input}
                            onChange={e => updateSessInput(sess.id, e.target.value)}
                            onKeyDown={e => {
                              if (e.key === 'Enter') { runCmdForSess(sess.id, sess.input); updateSessInput(sess.id, '') }
                              else if (e.key === 'Escape') close()
                            }}
                            onFocus={() => bringToFront(sess.id)}
                            spellCheck={false}
                            autoComplete="off"
                            style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: '11px', color: '#22C55E', caretColor: '#22C55E', letterSpacing: '0.04em', ...MONO }}
                          />
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  )}

                  {/* ── Snake ─────────────────────────────────────────────── */}
                  {sess.sub === 'snake' && (
                    <div>
                      <canvas ref={snakeCvs} width={SCW} height={SCH} style={{ display: 'block' }} />
                      <div style={{ padding: '8px 14px', borderTop: '1px solid rgba(201,164,85,0.07)', display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: 'rgba(201,164,85,0.28)', letterSpacing: '0.1em' }}>
                        <span>WASD / ARROWS  ·  P PAUSE  ·  ESC BACK</span>
                        {sPause && !sDead && <span style={{ color: '#22C55E' }}>// PAUSED</span>}
                        {sDead && <span style={{ color: 'rgba(201,164,85,0.5)' }}>[ENTER] RESTART</span>}
                      </div>
                    </div>
                  )}

                  {/* ── TicTacToe ─────────────────────────────────────────── */}
                  {sess.sub === 'tictactoe' && (
                    <motion.div key="ttt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '24px 28px' }}>
                      <div style={{ fontSize: '9px', color: 'rgba(201,164,85,0.4)', letterSpacing: '0.1em', marginBottom: '20px' }}>YOU ARE X  ·  AI IS O  ·  CLICK TO PLAY</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 22, maxWidth: 270 }}>
                        {ttt.map((cell, i) => (
                          <button key={i} onClick={() => tttPlay(i)} style={{ height: 80, background: cell ? 'rgba(201,164,85,0.05)' : 'rgba(201,164,85,0.02)', border: `1px solid ${cell ? 'rgba(201,164,85,0.4)' : 'rgba(201,164,85,0.1)'}`, color: cell === 'X' ? '#4ade80' : cell === 'O' ? 'rgba(201,164,85,0.5)' : 'transparent', fontSize: '32px', cursor: (!cell && !tttMsg) ? 'pointer' : 'default', transition: 'all 0.15s', borderRadius: 0, ...MONO }}>
                            {cell || '·'}
                          </button>
                        ))}
                      </div>
                      {tttMsg && <div style={{ fontSize: '10px', color: '#22C55E', letterSpacing: '0.1em', marginBottom: 14 }}>{'> '}{tttMsg}</div>}
                      <button onClick={() => { setTtt(Array(9).fill('')); setTttMsg(null); aiThink.current = false }} style={{ background: 'none', border: '1px solid rgba(201,164,85,0.25)', color: 'rgba(201,164,85,0.55)', padding: '6px 18px', fontSize: '9px', cursor: 'pointer', letterSpacing: '0.1em', borderRadius: 0, ...MONO }}>
                        RESTART
                      </button>
                    </motion.div>
                  )}

                  {/* ── Notepad ───────────────────────────────────────────── */}
                  {sess.sub === 'notepad' && (
                    <motion.div key="notepad" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div style={{ padding: '8px 14px', fontSize: '8px', color: 'rgba(201,164,85,0.25)', letterSpacing: '0.1em', borderBottom: '1px solid rgba(201,164,85,0.06)' }}>
                        NOTEPAD_MODE — use BACK to return
                      </div>
                      <textarea autoFocus value={noteText} onChange={e => setNoteText(e.target.value)} spellCheck={false} placeholder={'// start typing...\n'}
                        style={{ width: '100%', height: 290, background: 'transparent', border: 'none', outline: 'none', color: '#22C55E', fontSize: '12px', padding: '14px 16px', resize: 'none', lineHeight: 1.75, caretColor: '#22C55E', ...MONO }} />
                      <div style={{ padding: '6px 14px', borderTop: '1px solid rgba(201,164,85,0.07)', fontSize: '8px', color: 'rgba(201,164,85,0.25)', letterSpacing: '0.08em', display: 'flex', gap: 20 }}>
                        <span>{noteText.length} chars</span>
                        <span>{noteText.split('\n').length} lines</span>
                      </div>
                    </motion.div>
                  )}

                  {/* ── Credits ───────────────────────────────────────────── */}
                  {sess.sub === 'credits' && (
                    <motion.div key="credits" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '24px 14px' }}>
                      {CREDITS.map((line, i) => (
                        <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06, duration: 0.25 }}
                          style={{ fontSize: '10px', lineHeight: 1.55, whiteSpace: 'pre', color: [1, 6, 10, 13].includes(i) ? '#4ade80' : 'rgba(201,164,85,0.6)' }}>
                          {line}
                        </motion.div>
                      ))}
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
                        style={{ fontSize: '8px', color: 'rgba(201,164,85,0.2)', letterSpacing: '0.1em', marginTop: 14, paddingLeft: 14 }}>
                        [ESC] OR BACK TO RETURN
                      </motion.div>
                    </motion.div>
                  )}

                  {/* ── Cool ──────────────────────────────────────────────── */}
                  {sess.sub === 'cool' && (
                    <motion.div key="cool" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <canvas ref={coolCvs} width={WIN_W} height={320} style={{ display: 'block' }} />
                      <div style={{ padding: '8px 14px', borderTop: '1px solid rgba(201,164,85,0.07)', fontSize: '8px', color: 'rgba(201,164,85,0.25)', letterSpacing: '0.1em' }}>
                        CLASSIFIED_VISUAL_FEED · LIVE · [ESC] BACK
                      </div>
                    </motion.div>
                  )}

                  {/* ── Pong ──────────────────────────────────────────────── */}
                  {sess.sub === 'pong' && (
                    <motion.div key="pong" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'relative' }}>
                      <canvas ref={pongCvs} width={SCW} height={SCH} style={{ display: 'block' }} />
                      {pongWinner && (
                        <div style={{
                          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                          alignItems: 'center', justifyContent: 'center', background: 'rgba(5,9,5,0.88)',
                          fontFamily: '"DM Mono",monospace',
                        }}>
                          <div style={{ fontSize: 22, color: pongWinner === 'YOU' ? '#22C55E' : '#ef4444', letterSpacing: 3, marginBottom: 10 }}>
                            {pongWinner === 'YOU' ? '▶ YOU WIN' : '◉ AI WINS'}
                          </div>
                          <div style={{ fontSize: 11, color: 'rgba(201,164,85,0.5)', marginBottom: 20 }}>
                            {pongScore[0]} — {pongScore[1]}
                          </div>
                          <button
                            onClick={() => { setPongWinner(null); setPongScore([0,0]); /* loop restarts via pongVisible effect reset */ exitSubForSess(sess.id); setTimeout(() => { const s = sessions.find(x => x.id === sess.id); if (s) {} }, 50) }}
                            style={{ background: 'rgba(201,164,85,0.1)', border: '1px solid rgba(201,164,85,0.4)', color: '#22C55E', fontFamily: '"DM Mono",monospace', fontSize: 10, padding: '6px 20px', cursor: 'pointer', letterSpacing: 2 }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,164,85,0.2)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(201,164,85,0.1)'}
                          >
                            PLAY AGAIN
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* ── Hacknet ───────────────────────────────────────────── */}
                  {sess.sub === 'hacknet' && (
                    <HacknetGame onExit={() => exitSubForSess(sess.id)} />
                  )}

                </motion.div>
              )
            })}

            {/* ── Close overlay hint (terminal phase) ─────────────────────── */}
            {phase === 'terminal' && (
              <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', fontSize: '8px', color: 'rgba(201,164,85,0.2)', letterSpacing: '0.14em', pointerEvents: 'none' }}>
                DRAG TITLE BAR TO MOVE  ·  /new FOR NEW WINDOW  ·  × TO CLOSE
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
