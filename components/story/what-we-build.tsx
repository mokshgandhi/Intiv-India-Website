import Image from "next/image"
import { systems } from "@/lib/content"
import { cn } from "@/lib/utils"
import { Reveal } from "./reveal"
import { CurtainImage } from "./motion-bits"
import { Texture } from "./textures"

type System = (typeof systems)[number]

function SystemText({ system, large = false }: { system: System; large?: boolean }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <system.icon className="size-5 text-saffron" strokeWidth={1.75} aria-hidden />
        <h3 className={cn("font-semibold tracking-tight text-ink", large ? "text-2xl md:text-3xl" : "text-xl md:text-2xl")}>
          {system.title}
        </h3>
      </div>
      <p className="mt-3 max-w-[52ch] leading-relaxed text-ink-soft">{system.description}</p>
      <p className="mt-4 text-sm text-muted-foreground">{system.tags.join(", ")}</p>
    </div>
  )
}

function Photo({ system, className, sizes }: { system: System; className?: string; sizes: string }) {
  return (
    <CurtainImage className={cn("group relative overflow-hidden rounded-[20px] bg-mist", className)}>
      <Image
        src={system.image}
        alt={system.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
      />
    </CurtainImage>
  )
}

export function WhatWeBuild() {
  const [drones, software, robotics, embedded] = systems

  return (
    <section id="what-we-build" className="relative isolate overflow-hidden bg-mist/60 py-24 md:py-32">
      <Texture variant="contours" />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-ink md:text-6xl">
            Complete systems, not components.
          </h2>
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-ink-soft">
            Hardware, software and everything in between, integrated and ready for real-world deployment.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-6 gap-y-12 md:mt-16 md:grid-cols-2 md:gap-x-8 md:gap-y-14 lg:grid-cols-12">
          {/* Lead discipline: tall image */}
          <Reveal className="md:col-span-2 lg:col-span-7 lg:row-span-2">
            <Photo system={drones} className="aspect-[4/3] lg:aspect-auto lg:h-[620px]" sizes="(min-width: 1024px) 58vw, 100vw" />
            <div className="mt-6">
              <SystemText system={drones} large />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <Photo system={software} className="aspect-[16/10]" sizes="(min-width: 1024px) 40vw, 100vw" />
            <div className="mt-6">
              <SystemText system={software} />
            </div>
          </Reveal>

          <Reveal delay={0.16} className="lg:col-span-5">
            <Photo system={robotics} className="aspect-[16/10]" sizes="(min-width: 1024px) 40vw, 100vw" />
            <div className="mt-6">
              <SystemText system={robotics} />
            </div>
          </Reveal>

          {/* Full-width closing row breaks the column rhythm */}
          <Reveal className="grid items-center gap-6 rounded-[20px] bg-white p-4 sm:p-5 md:col-span-2 md:grid-cols-2 md:gap-8 md:p-6 lg:col-span-12">
            <Photo system={embedded} className="aspect-[16/10]" sizes="(min-width: 768px) 45vw, 100vw" />
            <div className="md:px-6">
              <SystemText system={embedded} large />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
