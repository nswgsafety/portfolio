'use client'

import { useEffect, useRef, useState } from 'react'

export default function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
    } catch {
      location.href = 'mailto:' + email
      return
    }
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 1800)
  }

  return (
    <button className="btn btn--lichen" type="button" aria-live="polite" onClick={handleClick}>
      {copied ? 'Copied' : 'Copy email'}
    </button>
  )
}
