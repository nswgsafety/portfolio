'use client'

import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

interface Props {
  text: string
  speed?: number              // ms per character (default 35)
  delay?: number              // ms before starting (default 0)
  style?: React.CSSProperties
  className?: string
  cursor?: boolean            // show blinking cursor while typing (default true)
  triggerOnView?: boolean     // auto-start when scrolled into view (default true)
  started?: boolean           // manual trigger — used when triggerOnView=false
  onComplete?: () => void
}

export default function TypewriterText({
  text,
  speed = 35,
  delay = 0,
  style,
  className,
  cursor = true,
  triggerOnView = true,
  started,
  onComplete,
}: Props) {
  const [chars, setChars] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const shouldStart = triggerOnView ? isInView : (started ?? false)
  const done = chars >= text.length

  useEffect(() => {
    if (!shouldStart) return
    setChars(0)
    let intervalId: ReturnType<typeof setInterval>
    const timeoutId = setTimeout(() => {
      let i = 0
      intervalId = setInterval(() => {
        i++
        setChars(i)
        if (i >= text.length) {
          clearInterval(intervalId)
          onComplete?.()
        }
      }, speed)
    }, delay)
    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [shouldStart]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span ref={ref} className={className} style={style}>
      {text.slice(0, chars)}
      {cursor && !done && (
        <span className="terminal-cursor" style={{ marginLeft: '1px' }} />
      )}
    </span>
  )
}
