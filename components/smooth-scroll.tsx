'use client'

import { useEffect } from 'react'

export default function SmoothScroll() {
  useEffect(() => {
    let lenis: any

    import('lenis').then((mod) => {
      const Lenis = mod.default
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    })

    return () => {
      lenis?.destroy()
    }
  }, [])

  return null
}
