'use client'

import { useEffect, useRef } from 'react'

export default function YearSpan() {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const year = String(new Date().getFullYear())
    if (ref.current && ref.current.textContent !== year) ref.current.textContent = year
  }, [])

  return <span ref={ref}>2026</span>
}
