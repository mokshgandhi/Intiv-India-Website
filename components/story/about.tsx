import { values } from "@/lib/content"
import { Reveal } from "./reveal"
import { DrawLine } from "./motion-bits"

export function About() {
  return (
    <section id="about" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-ink md:text-6xl">
            Complete system builders, not just designers or software vendors.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-[62ch] text-lg leading-relaxed text-ink-soft">
            Intiv India turns raw ideas into real-world, deployable products. We engineer and deliver full
            software platforms, AI systems, complete drone systems, robotics, embedded electronics and
            manufacturing-ready hardware.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {values.map((value, i) => (
            <div key={value.title}>
              <DrawLine className="h-[2px] bg-ink/80" delay={i * 0.12} />
              <Reveal delay={0.35 + i * 0.12} y={16} className="pt-6">
                <value.icon className="size-6 text-saffron" strokeWidth={1.75} aria-hidden />
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">{value.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{value.description}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
