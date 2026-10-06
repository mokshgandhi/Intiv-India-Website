"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useReducedMotionSafe } from "@/components/story/motion-provider"
import { Texture } from "./textures"

const text =
  "Every day, brilliant ideas are born in India's labs, classrooms and garages. Too many never leave the whiteboard. Not for lack of talent, but for lack of a team that can build them end to end."

function Word({
  children,
  progress,
  range,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  )
}

/** The problem Intiv exists to solve, read one word at a time as you scroll. */
export function Prologue() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotionSafe()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.45"] })
  const words = text.split(" ")

  return (
    <section aria-label="Why Intiv exists" className="relative isolate py-28 md:py-40">
      <Texture variant="dots" />
      <div ref={ref} className="mx-auto max-w-5xl px-5 md:px-8">
        <p className="text-3xl font-medium leading-[1.25] tracking-tight text-ink md:text-5xl md:leading-[1.18]">
          {reduce
            ? text
            : words.map((word, i) => (
                <Word
                  key={`${word}-${i}`}
                  progress={scrollYProgress}
                  range={[i / words.length, (i + 1) / words.length]}
                >
                  {word}
                </Word>
              ))}
        </p>
        <p className="mt-10 text-3xl font-semibold tracking-tight text-saffron-ink md:text-5xl">
          So we became that team.
        </p>
      </div>
    </section>
  )
}
