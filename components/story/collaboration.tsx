import { collaborators, programs } from "@/lib/content"
import { cn } from "@/lib/utils"
import { Reveal } from "./reveal"

const tileTones = [
  "bg-white",
  "bg-saffron/[0.08]",
  "bg-ink/[0.05]",
  "bg-india-green/[0.07]",
]

export function Collaboration() {
  return (
    <section id="collaboration" className="overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-ink md:text-6xl">
            From campus innovation to market-ready products.
          </h2>
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-ink-soft">
            We bridge the gap between ideas and impact through structured collaboration with universities,
            founders, enterprises and government.
          </p>
        </Reveal>
      </div>

      {/* Programs we run and support */}
      <div className="mt-14 border-y border-border py-6" aria-label="Programs">
        <div className="flex w-max animate-marquee gap-8 md:gap-12 whitespace-nowrap pr-12">
          {[...programs, ...programs].map((program, i) => (
            <span
              key={`${program}-${i}`}
              aria-hidden={i >= programs.length}
              className="text-2xl font-medium tracking-tight text-ink/70 md:text-3xl"
            >
              {program}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-7xl px-5 md:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {collaborators.map((collab, i) => (
            <Reveal key={collab.title} delay={(i % 2) * 0.08} className="h-full">
              <div
                className={cn(
                  "group h-full rounded-[20px] border border-ink/[0.06] p-7 transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-ink/12 hover:shadow-[0_28px_60px_-36px_rgba(11,38,64,0.4)] md:p-10",
                  tileTones[i]
                )}
              >
              <collab.icon className="size-7 text-ink transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-8 text-2xl font-semibold tracking-tight text-ink">{collab.title}</h3>
              <p className="mt-3 max-w-[46ch] leading-relaxed text-ink-soft">{collab.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {collab.items.map((item) => (
                  <li key={item} className="rounded-full border border-ink/10 bg-white/70 px-3.5 py-1.5 text-sm text-ink">
                    {item}
                  </li>
                ))}
              </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
