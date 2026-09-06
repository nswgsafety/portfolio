import { NextRequest, NextResponse } from 'next/server'

const FORMSPREE_URL = process.env.FORMSPREE_URL ?? 'https://formspree.io/f/xlgadwje'

export async function POST(req: NextRequest) {
  const { name, email, org, msg, timestamp } = await req.json()

  if (!name || !email || !msg) {
    return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
  }

  try {
    const res = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name,
        email,
        organization: org || 'Not provided',
        message:      msg,
        timestamp:    timestamp || new Date().toISOString(),
        _replyto:     email,
        _subject:     `Portfolio Contact — Inquiry from ${name}${org ? ` (${org})` : ''}`,
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
