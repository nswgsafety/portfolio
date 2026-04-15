import { NextRequest, NextResponse } from 'next/server'

const FORMSPREE_URL = 'https://formspree.io/f/xlgadwje'

export async function POST(req: NextRequest) {
  const { name, org, msg, timestamp } = await req.json()

  if (!name || !msg) {
    return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
  }

  try {
    const res = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name,
        organization: org || 'Not provided',
        message:      msg,
        timestamp:    timestamp || new Date().toISOString(),
        _subject:     `IronVeil Research — Inquiry from ${name}${org ? ` (${org})` : ''}`,
      }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      return NextResponse.json({ ok: false, error: err }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: 'Network error' }, { status: 500 })
  }
}
