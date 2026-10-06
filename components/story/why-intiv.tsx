"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useInView } from "motion/react"
import { Check } from "lucide-react"
import { reasons } from "@/lib/content"
import { cn } from "@/lib/utils"
import { useReducedMotionSafe } from "./motion-provider"
import { MaskLines } from "./motion-bits"
import { Texture } from "./textures"

type Reason = (typeof reasons)[number]

const ease = [0.16, 1, 0.3, 1] as const
const DWELL_MS = 6500

/** The showcase panel for one reason. */
function ReasonPanel({ reason, index, compact = false }: { reason: Reason; index: number; compact?: boolean }) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-[24px] bg-ink text-white",
        compact ? "p-6" : "h-full p-10 xl:p-12"
      )}
    >
      {/* Survey lines, inverted for the navy surface */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.22] invert"
        style={{
          backgroundImage: 'url("/textures/contours-b.svg")',
          backgroundSize: "1200px 1200px",
          maskImage: "radial-gradient(90% 80% at 100% 0%, #000 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(90% 80% at 100% 0%, #000 20%, transparent 80%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ backgroundImage: "radial-gradient(60% 55% at 90% 100%, rgba(232,98,44,0.28), transparent 70%)" }}
      />

      {/* Giant line icon */}
      <motion.div
        aria-hidden
        className={cn("absolute text-white/[0.09]", compact ? "-right-6 -top-6" : "-right-8 -top-8")}
        initial={{ scale: 0.85, rotate: -8, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease }}
      >
        <reason.icon className={compact ? "size-40" : "size-72"} strokeWidth={0.75} />
      </motion.div>

      <div className={cn("relative flex h-full flex-col", !compact && "justify-between")}>
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="flex size-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-inset ring-white/15"
        >
          <reason.icon className="size-7 text-saffron" strokeWidth={1.6} aria-hidden />
        </motion.span>

        <div className={compact ? "mt-8" : "mt-16"}>
          {!compact && (
            <p className="text-sm font-medium tabular-nums text-white/55">
              {String(index + 1).padStart(2, "0")} / {String(reasons.length).padStart(2, "0")}
            </p>
          )}
          {!compact && (
            <h3 className="mt-3 max-w-[16ch] text-4xl font-semibold leading-[1.05] tracking-[-0.03em] xl:text-5xl">
              <MaskLines lines={[reason.title]} stagger={0.08} />
            </h3>
          )}
          <motion.p
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
            className={cn("max-w-[44ch] leading-relaxed text-white/80", compact ? "text-base" : "mt-5 text-lg")}
          >
            {reason.description}
          </motion.p>
          <ul className={cn("flex flex-wrap gap-2", compact ? "mt-5" : "mt-8")}>
            {reason.highlights.map((h, i) => (
              <motion.li
                key={h}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.22 + i * 0.07, ease }}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.08] px-3.5 py-1.5 text-sm text-white ring-1 ring-inset ring-white/10"
              >
                <Check className="size-3.5 text-saffron" strokeWidth={2.5} aria-hidden />
                {h}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function WhyIntiv() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [autoplay, setAutoplay] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const inView = useInView(sectionRef, { amount: 0.4 })
  const reduce = useReducedMotionSafe()

  // Auto-advance only on hover-capable desktops, while visible, not paused, not reduced motion.
  useEffect(() => {
    setAutoplay(window.matchMedia("(min-width: 1024px) and (hover: hover)").matches)
  }, [])
  const running = autoplay && inView && !paused && !reduce

  useEffect(() => {
    if (!running) return
    const t = setTimeout(() => setActive((a) => (a + 1) % reasons.length), DWELL_MS)
    return () => clearTimeout(t)
  }, [running, active])

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const last = reasons.length - 1
    let next: number | null = null
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = i === last ? 0 : i + 1
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = i === 0 ? last : i - 1
    if (e.key === "Home") next = 0
    if (e.key === "End") next = last
    if (next !== null) {
      e.preventDefault()
      setActive(next)
      tabRefs.current[next]?.focus()
    }
  }

  return (
    <section ref={sectionRef} id="why-intiv" className="relative isolate overflow-hidden bg-ink/[0.03] py-24 md:py-32">
      <Texture variant="dots" mask="radial-gradient(60% 70% at 0% 100%, #000 10%, transparent 75%)" />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-ink md:text-6xl">
          <MaskLines lines={["Why teams build", "with Intiv."]} />
        </h2>

        <div
          className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12 lg:gap-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* Index */}
          <div role="tablist" aria-orientation="vertical" aria-label="Reasons to build with Intiv" className="lg:col-span-5">
            {reasons.map((reason, i) => {
              const isActive = i === active
              return (
                <div key={reason.title} className="border-t border-ink/10 last:border-b">
                  <button
                    ref={(el) => {
                      tabRefs.current[i] = el
                    }}
                    role="tab"
                    id={`why-tab-${i}`}
                    aria-selected={isActive}
                    aria-controls="why-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className="group relative flex w-full items-center gap-5 py-5 text-left md:py-6"
                  >
                    {/* Dwell progress for the active reason */}
                    <span aria-hidden className="absolute -top-px left-0 h-[2px] w-full overflow-hidden">
                      {isActive && (
                        <motion.span
                          key={`${active}-${running}`}
                          className="block h-full origin-left bg-saffron"
                          initial={{ scaleX: running ? 0 : 1 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: running ? DWELL_MS / 1000 : 0.3, ease: "linear" }}
                        />
                      )}
                    </span>
                    <span
                      className={cn(
                        "w-7 shrink-0 text-sm font-medium tabular-nums transition-colors duration-300",
                        isActive ? "text-saffron-ink" : "text-muted-foreground"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "flex-1 text-xl font-semibold tracking-tight transition-[color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:text-2xl",
                        isActive ? "translate-x-1 text-ink" : "text-ink/45 group-hover:translate-x-1 group-hover:text-ink/80"
                      )}
                    >
                      {reason.title}
                    </span>
                    <reason.icon
                      aria-hidden
                      strokeWidth={1.6}
                      className={cn(
                        "size-5 shrink-0 transition-[color,transform,opacity] duration-500",
                        isActive ? "rotate-0 text-saffron opacity-100" : "-rotate-12 text-ink opacity-0 group-hover:opacity-40"
                      )}
                    />
                  </button>

                  {/* Mobile / tablet: the panel opens inline */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="inline"
                        className="overflow-hidden lg:hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease }}
                      >
                        <div className="pb-6">
                          <ReasonPanel reason={reason} index={i} compact />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          {/* Desktop showcase */}
          <div
            id="why-panel"
            role="tabpanel"
            aria-labelledby={`why-tab-${active}`}
            className="hidden lg:col-span-7 lg:block lg:h-[500px]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                className="h-full"
                initial={{ opacity: 0, clipPath: "inset(0 0 8% 0 round 24px)", filter: "blur(6px)" }}
                animate={{ opacity: 1, clipPath: "inset(0 0 0% 0 round 24px)", filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(6px)", transition: { duration: 0.22 } }}
                transition={{ duration: 0.6, ease }}
              >
                <ReasonPanel reason={reasons[active]} index={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
