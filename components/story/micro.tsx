"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react"
import { ArrowRight, Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { useReducedMotionSafe } from "./motion-provider"

/**
 * Arrow that slides out to the right and back in from the left on hover.
 * Place inside an element with the `group` class (buttons already carry it).
 */
export function ArrowSlide({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("relative inline-flex size-4 overflow-hidden", className)}>
      <ArrowRight
        strokeWidth={1.75}
        className="absolute inset-0 size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[140%]"
      />
      <ArrowRight
        strokeWidth={1.75}
        className="absolute inset-0 size-4 -translate-x-[140%] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
      />
    </span>
  )
}

/** Subtle pull toward the cursor for primary CTAs. Mouse/trackpad only; off for reduced motion. */
export function Magnetic({ children, strength = 0.12, className }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotionSafe()
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 22, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 260, damping: 22, mass: 0.4 })

  useEffect(() => {
    setEnabled(window.matchMedia("(hover: hover) and (pointer: fine)").matches)
  }, [])

  const active = enabled && !reduce

  return (
    <motion.div
      ref={ref}
      className={cn("inline-flex", className)}
      style={active ? { x: sx, y: sy } : undefined}
      onPointerMove={(e) => {
        if (!active || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        const clamp = (v: number) => Math.max(-8, Math.min(8, v))
        x.set(clamp((e.clientX - (r.left + r.width / 2)) * strength))
        y.set(clamp((e.clientY - (r.top + r.height / 2)) * strength))
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

/** Copies a value (e.g. the email address) with inline, announced feedback. */
export function CopyButton({ value, label, className }: { value: string; label: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(t)
  }, [copied])

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value)
          setCopied(true)
        } catch {
          window.location.href = `mailto:${value}`
        }
      }}
      className={cn(
        "inline-flex h-10 min-w-[5.5rem] items-center justify-center gap-1.5 rounded-full border border-ink/12 bg-white px-3 text-sm font-medium text-ink transition-[background-color,border-color,transform] duration-200 hover:border-ink/25 hover:bg-mist active:scale-[0.96]",
        className
      )}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="done"
            className="inline-flex items-center gap-1.5 text-india-green"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            <Check className="size-3.5" strokeWidth={2.5} aria-hidden />
            Copied
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            className="inline-flex items-center gap-1.5"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            <Copy className="size-3.5" strokeWidth={1.75} aria-hidden />
            Copy
          </motion.span>
        )}
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  )
}

/** Success mark that draws itself: the ring, then the tick. */
export function DrawnCheck({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 52 52" className={cn("size-12 text-india-green", className)} aria-hidden>
      <motion.circle
        cx="26"
        cy="26"
        r="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M15 27 l7.5 7.5 L37 19"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  )
}

/** Error line that nudges once when it appears, so the failure is noticed. */
export function FormError({ message }: { message: string | null }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          role="alert"
          className="rounded-xl border border-destructive/20 bg-destructive/[0.05] px-4 py-3 text-sm text-destructive"
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: [0, -6, 6, -3, 3, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  )
}
