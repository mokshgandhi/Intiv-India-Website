"use client"

import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { contact } from "@/lib/content"
import { Reveal } from "./reveal"
import { MaskLines } from "./motion-bits"
import { ArrowSlide, CopyButton, Magnetic } from "./micro"
import { Texture } from "./textures"

export function Epilogue() {
  return (
    <section aria-labelledby="vision-heading" className="relative isolate pb-24 md:pb-32">
      <Texture variant="sunrise-low" />
      <div className="mx-auto max-w-4xl px-5 pt-16 text-center md:px-8 md:pt-20">
        <h2 id="vision-heading" className="text-4xl font-semibold leading-[1.06] tracking-[-0.035em] text-ink md:text-7xl">
          <MaskLines
            lines={["Let's build the future.", <span key="l2" className="text-saffron">Together. In India.</span>]}
            stagger={0.14}
          />
        </h2>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-[58ch] text-lg leading-relaxed text-ink-soft md:text-xl">
            We envision an India where every innovator has access to world-class product engineering, where ideas
            never die for lack of execution, and where Made in India means global excellence.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-10 flex justify-center">
          <Magnetic>
            <Button asChild size="lg" className="group bg-ink text-white hover:bg-ink/90">
              <Link href="/partner">
                Partner with us
                <ArrowSlide />
              </Link>
            </Button>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.25}>
          <ul className="mt-12 flex flex-col items-center gap-x-8 gap-y-1 text-ink-soft sm:flex-row sm:flex-wrap sm:justify-center md:mt-14">
            <li className="inline-flex items-center gap-2">
              <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 py-2.5 hover:text-ink">
                <Mail className="size-4" strokeWidth={1.75} aria-hidden />
                {contact.email}
              </a>
              <CopyButton value={contact.email} label="email address" />
            </li>
            {contact.phones.map((phone) => (
              <li key={phone.href}>
                <a href={phone.href} className="inline-flex items-center gap-2 py-2.5 hover:text-ink">
                  <Phone className="size-4" strokeWidth={1.75} aria-hidden />
                  {phone.label}
                </a>
              </li>
            ))}
            <li className="inline-flex items-center gap-2 py-2.5">
              <MapPin className="size-4" strokeWidth={1.75} aria-hidden />
              {contact.city}
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
