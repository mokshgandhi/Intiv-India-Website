"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"
import { useReducedMotionSafe } from "@/components/story/motion-provider"
import { steps } from "@/lib/content"
import { cn } from "@/lib/utils"
import { CurtainImage, MaskLines } from "./motion-bits"
import { Texture } from "./textures"

type Step = (typeof steps)[number]

// Each stage gets a visual from the product world; ideation is still an idea, so it gets none.
const visuals: ({ src: string; alt: string } | null)[] = [
  null,
  { src: "/images/ai-platform.jpg", alt: "Software architecture panels being designed" },
  { src: "/images/embedded-systems.jpg", alt: "Custom circuit board built by the Intiv team" },
  { src: "/images/healthcare-ai.jpg", alt: "Monitoring dashboards used during system validation" },
  { src: "/images/drone-hero.jpg", alt: "Drone deployed over farmland" },
  { src: "/images/agribot.jpg", alt: "A fleet of agribots working a field" },
]

const STACK_OFFSET = 14 // px each card sits below the one before it, so the stack edges show

function StepCard({
  step,
  index,
  total,
  progress,
  reduce,
}: {
  step: Step
  index: number
  total: number
  progress: MotionValue<number>
  reduce: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const visual = visuals[index]
  const depth = total - 1 - index

  // Arrival: the card tilts up into place as it rises to the top of the stack.
  const { scrollYProgress: arrive } = useScroll({ target: cardRef, offset: ["start end", "start 0.3"] })
  const rotateX = useTransform(arrive, [0, 1], [12, 0])

  // Buried: once the next cards cover it, it recedes into the stack.
  const scale = useTransform(progress, [(index + 0.5) / total, 1], [1, 1 - depth * 0.04], { clamp: true })
  const shade = useTransform(progress, [(index + 0.6) / total, (index + 1.4) / total], [0, 0.07 + depth * 0.012], {
    clamp: true,
  })

  // Reading progress while this card is on top.
  const read = useTransform(progress, [index / total, (index + 1) / total], [0, 1], { clamp: true })

  return (
    <li
      className="sticky mb-[16vh] last:mb-0"
      style={{ top: `calc(var(--stack-top) + ${index * STACK_OFFSET}px)`, zIndex: index + 1 }}
    >
      <motion.div
        ref={cardRef}
        className="relative origin-top overflow-hidden rounded-[24px] border border-ink/[0.07] bg-white shadow-[0_-18px_50px_-30px_rgba(11,38,64,0.35)] will-change-transform"
        style={reduce ? undefined : { scale, rotateX, transformPerspective: 1400 }}
      >
        <div className="grid gap-5 p-4 sm:p-5 md:h-[min(56vh,440px)] md:grid-cols-2 md:gap-8 md:p-6">
          {/* Visual */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-[16px] md:order-2 md:aspect-auto md:h-full">
            {visual ? (
              <CurtainImage className="absolute inset-0 overflow-hidden rounded-[16px] bg-mist">
                <Image src={visual.src} alt={visual.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw" className="object-cover" />
              </CurtainImage>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center rounded-[16px] bg-saffron/[0.09]">
                <motion.span
                  initial={{ scale: 0.7, rotate: -12, opacity: 0 }}
                  whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                >
                  <step.icon className="size-24 text-saffron md:size-32" strokeWidth={1} aria-hidden />
                </motion.span>
              </div>
            )}
          </div>

          {/* Copy */}
          <div className="flex flex-col md:order-1 md:justify-between md:py-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium tabular-nums text-muted-foreground">
                {String(index + 1).padStart(2, "0")} of {String(total).padStart(2, "0")}
              </span>
              <motion.span
                initial={{ rotate: -30, opacity: 0 }}
                whileInView={{ rotate: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex size-11 items-center justify-center rounded-full bg-ink/[0.05]"
              >
                <step.icon className="size-5 text-saffron" strokeWidth={1.75} aria-hidden />
              </motion.span>
            </div>

            <div className="mt-5 md:mt-0">
              <h3 className="text-3xl font-semibold tracking-[-0.03em] text-ink md:text-5xl">
                <MaskLines lines={[step.title]} />
              </h3>
              <p className="mt-3 max-w-[42ch] text-base leading-relaxed text-ink-soft md:mt-4 md:text-lg">
                {step.description}
              </p>
            </div>
          </div>
        </div>

        {/* Reading progress for the card on top */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-ink/[0.05]">
          <motion.div className="h-full origin-left bg-saffron" style={{ scaleX: reduce ? 1 : read }} />
        </div>

        {/* Shade as it is buried under later cards */}
        {!reduce && (
          <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-ink" style={{ opacity: shade }} />
        )}
      </motion.div>
    </li>
  )
}

export function HowWeWork() {
  const listRef = useRef<HTMLOListElement>(null)
  const [active, setActive] = useState(0)
  const reduce = useReducedMotionSafe()
  const total = steps.length

  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.3", "end end"] })
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(total - 1, Math.max(0, Math.floor(p * total)))
    setActive((prev) => (prev === next ? prev : next))
  })

  const scrollToStep = (i: number) => {
    const list = listRef.current
    if (!list) return
    const top = list.getBoundingClientRect().top + window.scrollY
    const start = top - window.innerHeight * 0.3
    const end = top + list.offsetHeight - window.innerHeight
    window.scrollTo({ top: start + ((i + 0.15) / total) * (end - start), behavior: reduce ? "auto" : "smooth" })
  }

  return (
    <section id="how-we-work" className="relative isolate py-24 md:py-32">
      <Texture variant="grid" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-12 lg:gap-10">
        {/* Pinned story map */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 className="text-4xl font-semibold leading-[1.08] tracking-tight text-ink md:text-6xl">
              <MaskLines lines={["From idea", "to impact."]} />
            </h2>
            <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-ink-soft">
              One team carries your product through every stage, so nothing is lost in a hand-off.
            </p>

            <nav aria-label="Process stages" className="relative mt-12 hidden lg:block">
              <div aria-hidden className="absolute bottom-3 left-[7px] top-3 w-[2px] rounded-full bg-border" />
              <motion.div
                aria-hidden
                className="absolute bottom-3 left-[7px] top-3 w-[2px] origin-top rounded-full bg-saffron"
                style={{ scaleY: reduce ? 1 : fill }}
              />
              <ul className="relative space-y-1">
                {steps.map((step, i) => (
                  <li key={step.title}>
                    <button
                      type="button"
                      onClick={() => scrollToStep(i)}
                      aria-current={active === i ? "step" : undefined}
                      className="group flex w-full items-center gap-5 py-2 text-left"
                    >
                      <span
                        className={cn(
                          "size-4 shrink-0 rounded-full border-2 transition-[background-color,border-color,transform] duration-300",
                          i <= active ? "border-saffron bg-saffron" : "border-border bg-background group-hover:border-ink/40",
                          active === i && "scale-125"
                        )}
                      />
                      <span
                        className={cn(
                          "text-lg transition-[color,transform] duration-300",
                          active === i
                            ? "translate-x-1 font-semibold text-ink"
                            : "text-muted-foreground group-hover:translate-x-0.5 group-hover:text-ink"
                        )}
                      >
                        {step.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* The stack: each stage slides up and settles on top of the last */}
        <ol
          ref={listRef}
          aria-label="Our process"
          className="pb-[6vh] [--stack-top:5rem] md:[--stack-top:6.5rem] lg:col-span-8 lg:[--stack-top:7rem]"
        >
          {steps.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} total={total} progress={scrollYProgress} reduce={reduce} />
          ))}
        </ol>
      </div>
    </section>
  )
}
