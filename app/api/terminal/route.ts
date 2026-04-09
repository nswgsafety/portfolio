import { NextRequest, NextResponse } from 'next/server'

// ── Types ─────────────────────────────────────────────────────────────────────
interface LogEntry {
  username: string
  timestamp: string
  ip: string
  ua: string
  success: boolean
  admin: boolean
}

// Module-level log — persists between warm invocations on the same serverless
// instance. Resets on cold starts / redeployments. Fine for an easter egg.
const accessLog: LogEntry[] = []
const MAX_LOG = 200

// ── POST /api/terminal ────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({})) as {
    action?: string
    username?: string
    password?: string
    token?: string
    ua?: string
  }
  const { action, username = '', password = '', token = '', ua = '' } = body

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  const adminUser = process.env.ADMIN_USERNAME ?? ''
  const adminPass = process.env.ADMIN_PASSWORD ?? ''

  // ── action: login ──────────────────────────────────────────────────────────
  if (action === 'login') {
    const isAdminUser = adminUser !== '' && username === adminUser

    if (isAdminUser) {
      // Admin: password required
      if (!password) {
        return NextResponse.json({ ok: false, requiresPassword: true })
      }
      const correct = password === adminPass
      accessLog.unshift({
        username,
        timestamp: new Date().toISOString(),
        ip,
        ua: ua.slice(0, 200),
        success: correct,
        admin: true,
      })
      if (accessLog.length > MAX_LOG) accessLog.pop()

      if (!correct) {
        return NextResponse.json(
          { ok: false, error: 'ACCESS_DENIED' },
          { status: 401 },
        )
      }
      // Token = base64(adminUser:timestamp) — verified in /logs action
      const tok = Buffer.from(`${adminUser}:${Date.now()}`).toString('base64')
      return NextResponse.json({ ok: true, isAdmin: true, token: tok })
    }

    // Non-admin: always let through, just log
    accessLog.unshift({
      username: username || 'anonymous',
      timestamp: new Date().toISOString(),
      ip,
      ua: ua.slice(0, 200),
      success: true,
      admin: false,
    })
    if (accessLog.length > MAX_LOG) accessLog.pop()
    return NextResponse.json({ ok: true, isAdmin: false, token: null })
  }

  // ── action: logs ───────────────────────────────────────────────────────────
  if (action === 'logs') {
    try {
      const decoded = Buffer.from(token, 'base64').toString()
      const colonIdx = decoded.lastIndexOf(':')
      const u = decoded.slice(0, colonIdx)
      const ts = parseInt(decoded.slice(colonIdx + 1), 10)
      const valid =
        u === adminUser &&
        adminUser !== '' &&
        !isNaN(ts) &&
        Date.now() - ts < 24 * 60 * 60 * 1000 // 24h expiry
      if (!valid) {
        return NextResponse.json({ ok: false, error: 'UNAUTHORIZED' }, { status: 401 })
      }
    } catch {
      return NextResponse.json({ ok: false, error: 'UNAUTHORIZED' }, { status: 401 })
    }
    return NextResponse.json({ ok: true, logs: accessLog })
  }

  return NextResponse.json({ ok: false, error: 'UNKNOWN_ACTION' }, { status: 400 })
}
