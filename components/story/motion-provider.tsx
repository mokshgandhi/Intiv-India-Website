"use client"

import { useEffect, useState } from "react"
import { MotionConfig } from "motion/react"

/** Skips transform animations for visitors who ask for reduced motion (opacity fades remain). */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

/**
 * Hydration-safe reduced-motion flag. Always `false` on the server and the first client
 * render, then reflects the user's preference. Use it for scroll-linked effects only;
 * entrance animations are handled by <MotionProvider>.
 */
export function useReducedMotionSafe() {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduce(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return reduce
}
