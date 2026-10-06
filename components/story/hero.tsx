"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react"
import { Button } from "@/components/ui/button"
import { useReducedMotionSafe } from "./motion-provider"
import { MaskLines } from "./motion-bits"
import { ArrowSlide, Magnetic } from "./micro"
import { Texture } from "./textures"

const ease = [0.16, 1, 0.3, 1] as const
const HERO_SRC = "/images/drone-hero.jpg"
const HERO_ALT = "Intiv's white VTOL hyperspectral drone hovering over crop rows at sunrise"

function Headline() {
  return (
    <h1 className="text-[clamp(2.3rem,10.5vw,2.6rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink sm:text-6xl lg:text-[4.1rem] xl:text-[4.6rem]">
      <MaskLines
        lines={[
          "From raw ideas",
          <>
            to <span className="text-saffron">real</span> products.
          </>,
        ]}
        delay={0.15}
        stagger={0.12}
      />
    </h1>
  )
}

function Intro({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <Headline />
      <motion.p
        initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, delay: 0.55, ease }}
        className="mt-5 max-w-[32rem] text-[17px] md:mt-7 md:text-lg leading-relaxed text-ink-soft md:text-xl"
      >
        Complete systems, from software and AI to drones, robots and hardware. Made in India, built for the world.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.7, ease }}
        className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:gap-3 md:mt-10"
      >
        <Magnetic className="w-full sm:w-auto">
          <Button asChild size="lg" className="group w-full bg-ink text-white hover:bg-ink/90 sm:w-auto">
            <Link href="/partner">
              Partner with us
              <ArrowSlide />
            </Link>
          </Button>
        </Magnetic>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="border-ink/15 bg-white text-ink shadow-none hover:border-ink/30 hover:bg-mist hover:text-ink"
        >
          <Link href="#what-we-build">See the work</Link>
        </Button>
      </motion.div>
      {children}
    </>
  )
}

/** Static composition used for reduced motion. */
function StaticHero() {
  return (
    <section className="relative isolate flex min-h-[100dvh] items-center pb-12 pt-24 md:pb-16 md:pt-28">
      <Texture variant="sunrise" />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <Intro />
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-mist lg:aspect-square">
          <Image src={HERO_SRC} alt={HERO_ALT} fill priority sizes="100vw" className="object-cover" />
        </div>
      </div>
    </section>
  )
}

/**
 * The focal moment of the site. The hero pins while the drone photo opens from its frame
 * to full-bleed (clip-path + FLIP transform, no layout animation), the intro lifts away,
 * and the brand line rises over the image before the story continues.
 */
function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] })
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 34, restDelta: 0.0005 })

  // 0 -> 1 as the frame opens to full-bleed.
  const open = useTransform(progress, [0.04, 0.5], [0, 1], { clamp: true })

  // Frame geometry relative to the pinned stage (px). Kept in a ref and applied imperatively,
  // so it takes effect whether it arrives before or after the scroll values.
  const geo = useRef<{
    t: number; r: number; b: number; l: number; x: number; y: number; s: number
    radii: [number, number, number, number] // tl tr br bl, read from the frame so corners match exactly
  } | null>(null)
  const clipPath = useMotionValue("inset(0px 0px 0px 100%)")
  const imgX = useMotionValue(0)
  const imgY = useMotionValue(0)
  const imgScale = useMotionValue(1)
  const layerOpacity = useMotionValue(0)

  const apply = () => {
    const g = geo.current
    if (!g) return
    const o = open.get()
    const k = 1 - o
    const pushIn = 1 + 0.06 * Math.max(0, (progress.get() - 0.5) / 0.5)
    const [tl, tr, br, bl] = g.radii.map((r) => r * k)
    clipPath.set(`inset(${g.t * k}px ${g.r * k}px ${g.b * k}px ${g.l * k}px round ${tl}px ${tr}px ${br}px ${bl}px)`)
    imgX.set(g.x * k)
    imgY.set(g.y * k)
    imgScale.set((g.s + (1 - g.s) * o) * pushIn)
  }
  useMotionValueEvent(open, "change", apply)
  useMotionValueEvent(progress, "change", apply)

  useEffect(() => {
    const measure = () => {
      const stage = stageRef.current?.getBoundingClientRect()
      const frame = frameRef.current?.getBoundingClientRect()
      if (!stage || !frame || frame.width === 0 || !frameRef.current) return
      const cs = getComputedStyle(frameRef.current)
      const radius = (v: string) => parseFloat(v) || 0
      geo.current = {
        radii: [
          radius(cs.borderTopLeftRadius),
          radius(cs.borderTopRightRadius),
          radius(cs.borderBottomRightRadius),
          radius(cs.borderBottomLeftRadius),
        ],
        t: frame.top - stage.top,
        l: frame.left - stage.left,
        r: stage.right - frame.right,
        b: stage.bottom - frame.bottom,
        x: frame.left + frame.width / 2 - (stage.left + stage.width / 2),
        y: frame.top + frame.height / 2 - (stage.top + stage.height / 2),
        s: Math.max(frame.width / stage.width, frame.height / stage.height),
      }
      apply()
      layerOpacity.set(1)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (stageRef.current) ro.observe(stageRef.current)
    if (frameRef.current) ro.observe(frameRef.current)
    return () => ro.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // The framed original sits on top at rest (so the load curtain shows) and hands off to the layer as it opens.
  const frameOpacity = useTransform(open, [0, 0.015], [1, 0])

  // The intro lifts away with a focus pull.
  const introOpacity = useTransform(progress, [0.02, 0.26], [1, 0])
  const introY = useTransform(progress, [0.02, 0.3], [0, -70])
  const introBlurPx = useTransform(progress, [0.02, 0.26], [0, 10])
  const introFilter = useMotionTemplate`blur(${introBlurPx}px)`
  const introPointer = useTransform(progress, (p) => (p > 0.2 ? "none" : "auto"))

  // Scrim for legible type over the photo, then the brand line.
  const scrim = useTransform(progress, [0.42, 0.62], [0, 1])
  const line1 = useTransform(progress, [0.52, 0.68], ["110%", "0%"])
  const line2 = useTransform(progress, [0.58, 0.74], ["110%", "0%"])
  const subOpacity = useTransform(progress, [0.7, 0.82], [0, 1])
  const subY = useTransform(progress, [0.7, 0.82], [16, 0])

  return (
    <section ref={sectionRef} aria-label="Intiv India" className="relative h-[250vh]">
      <div ref={stageRef} className="sticky top-0 isolate h-[100dvh] overflow-hidden">
        <Texture variant="sunrise" />
        <Texture variant="dots" className="lg:right-1/2" mask="radial-gradient(60% 55% at 30% 55%, #000 10%, transparent 75%)" />
        {/* Full-bleed image layer, clipped to the frame at rest */}
        <motion.div aria-hidden className="absolute inset-0 z-10" style={{ clipPath, opacity: layerOpacity }}>
          <motion.div className="absolute inset-0 will-change-transform" style={{ x: imgX, y: imgY, scale: imgScale }}>
            <Image src={HERO_SRC} alt="" fill sizes="100vw" className="object-cover" />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,24,41,0.78)_0%,rgba(6,24,41,0.35)_45%,rgba(6,24,41,0.05)_75%)]"
            style={{ opacity: scrim }}
          />
        </motion.div>

        {/* Resting composition */}
        <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col gap-7 px-5 pb-6 pt-[88px] md:gap-10 md:px-8 md:pb-10 md:pt-28 lg:static lg:grid lg:grid-cols-2 lg:content-center lg:items-center lg:gap-12 lg:pb-0 lg:pt-[72px]">
          <motion.div
            className="relative z-20"
            style={{ opacity: introOpacity, y: introY, filter: introFilter, pointerEvents: introPointer }}
          >
            <Intro />
          </motion.div>

          <motion.div
            ref={frameRef}
            style={{ opacity: frameOpacity }}
            className="relative z-20 min-h-[112px] w-full flex-1 overflow-hidden rounded-[20px] bg-mist shadow-[0_30px_70px_-40px_rgba(11,38,64,0.45)] lg:absolute lg:bottom-5 lg:right-0 lg:top-[84px] lg:h-auto lg:w-[calc(50vw-8px)] lg:flex-none lg:rounded-none lg:rounded-l-[28px] lg:shadow-[-30px_30px_80px_-50px_rgba(11,38,64,0.5)]"
          >
            {/* Server-rendered image for first paint and no-JS; the layer above takes over once measured */}
            <Image src={HERO_SRC} alt={HERO_ALT} fill priority sizes="100vw" className="object-cover" />
            {/* Hairline edge so the pale sky never dissolves into the pale page */}
            <div aria-hidden className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] ring-1 ring-inset ring-ink/10" />
            {/* Curtain that opens on load */}
            <motion.div
              aria-hidden
              className="absolute inset-0 z-30 origin-top bg-background"
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{ duration: 1.3, delay: 0.25, ease: [0.76, 0, 0.24, 1] }}
            />
          </motion.div>
        </div>

        {/* Brand line over the open image */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
          <div className="mx-auto max-w-7xl px-5 pb-[max(10vh,env(safe-area-inset-bottom))] md:px-8 md:pb-[12vh]">
            <p className="text-[clamp(2.6rem,12vw,3rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white sm:text-7xl lg:text-8xl">
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span className="block" style={{ y: line1 }}>
                  Made in India.
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span className="block" style={{ y: line2 }}>
                  Built for the world.
                </motion.span>
              </span>
            </p>
            <motion.p
              className="mt-6 max-w-[36ch] text-lg text-white/85 md:text-xl"
              style={{ opacity: subOpacity, y: subY }}
            >
              Drones, AI, robotics and hardware, engineered end to end.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}

function useShortViewport() {
  const [short, setShort] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(max-height: 560px)")
    const update = () => setShort(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return short
}

export function Hero() {
  const reduce = useReducedMotionSafe()
  const short = useShortViewport()
  return reduce || short ? <StaticHero /> : <CinematicHero />
}
