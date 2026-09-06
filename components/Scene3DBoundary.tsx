'use client'

import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

/**
 * WebGL/GLTF failures (unsupported browser, blocked asset, context loss)
 * must never be allowed to crash the whole page. Anything under here that
 * throws just disappears — the rest of the site keeps working.
 */
export default class Scene3DBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error('[Scene3D] disabled after render error:', error)
  }

  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}
