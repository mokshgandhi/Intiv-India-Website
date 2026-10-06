"use client"

import { useEffect, useRef, useState } from "react"
import { animate, motion, useInView } from "motion/react"
import { useReducedMotionSafe } from "./motion-provider"

const ease = [0.16, 1, 0.3, 1] as const

/**
 * Lines that rise out of a clipping mask, in sequence.
 * Content stays readable without JS because the mask only hides overflow.
 */
export function MaskLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  as: Tag = "span",
}: {
  lines: React.ReactNode[]
  className?: string
  lineClassName?: string
  delay?: number
  stagger?: number
  as?: "span" | "div"
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  return (
    <span ref={ref} className={className}>
      {lines.map((line, i) => (
        <Tag key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : undefined}
            transition={{ duration: 1, delay: delay + i * stagger, ease }}
          >
            {line}
          </motion.span>
        </Tag>
      ))}
    </span>
  )
}

/** A hairline that draws itself from the left when it enters the viewport. */
export function DrawLine({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      aria-hidden
      className={`origin-left ${className ?? ""}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 1.1, delay, ease }}
    />
  )
}

/** A photo frame that opens like a curtain (clip-path) while the image settles from a slight zoom. */
export function CurtainImage({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(18% 0% 0% 0% round 20px)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 20px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.2, delay, ease }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.14 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.6, delay, ease }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/**
 * Counts the numeric part of a stat ("4+ hrs", "99.2%", "±0.1 mm") up from zero once visible.
 * Values without a number ("Sub-meter") render as-is. The final value is server-rendered.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotionSafe()
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/)
  const [display, setDisplay] = useState(value)

  // Start from zero on the client so the count never flashes the final value first.
  useEffect(() => {
    if (!match) return
    if (reduce) setDisplay(value)
    else if (!inView) setDisplay(`${match[1]}${(0).toFixed(match[2].split(".")[1]?.length ?? 0)}${match[3]}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, value])

  useEffect(() => {
    if (!match || !inView || reduce) return
    const [, prefix, num, suffix] = match
    const target = parseFloat(num)
    const decimals = num.includes(".") ? num.split(".")[1].length : 0
    const controls = animate(0, target, {
      duration: 1.6,
      ease,
      onUpdate: (v) => setDisplay(`${prefix}${v.toFixed(decimals)}${suffix}`),
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value])

  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden>{display}</span>
    </span>
  )
}
