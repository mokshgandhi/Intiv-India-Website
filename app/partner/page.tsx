"use client"

import React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Reveal } from "@/components/story/reveal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Texture } from "@/components/story/textures"
import {
  GraduationCap,
  Rocket,
  Building2,
  Landmark,
  Check,
  Loader2,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowSlide, DrawnCheck, FormError } from "@/components/story/micro"

const partnerTypes = [
  {
    id: "university",
    icon: GraduationCap,
    title: "University / Research",
    description: "Joint R&D, student projects, innovation labs and tech transfer programs.",
    benefits: ["Co-funded research", "Student internships", "Lab partnerships", "Patent collaboration"]
  },
  {
    id: "startup",
    icon: Rocket,
    title: "Startup",
    description: "Turn your idea into a product with full engineering support and rapid prototyping.",
    benefits: ["Equity partnerships", "Technical co-founding", "MVP development", "Investor-ready demos"]
  },
  {
    id: "enterprise",
    icon: Building2,
    title: "Enterprise",
    description: "White-label solutions, custom engineering and innovation partnerships.",
    benefits: ["White-label products", "Dedicated teams", "IP ownership", "Long-term contracts"]
  },
  {
    id: "government",
    icon: Landmark,
    title: "Government / PSU",
    description: "Mission-critical systems, defense tech and public sector innovation.",
    benefits: ["DPIIT registered", "Make in India", "Security cleared", "Compliance ready"]
  }
]

const capabilities = [
  "Software & AI platforms",
  "Drone systems (VTOL / fixed-wing)",
  "Robotics & automation",
  "Embedded & IoT systems",
]

const selectClass =
  "h-12 w-full cursor-pointer rounded-xl border border-input bg-white px-4 text-base text-ink outline-none transition-[box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"

export default function PartnerPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch("https://formsubmit.co/ajax/info@intivindia.in", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      })

      if (response.ok) {
        setIsSubmitted(true)
        form.reset()
      } else {
        setError("Something went wrong. Please try again or email us directly.")
      }
    } catch (err) {
      setError("Something went wrong. Please try again or email us directly.")
    } finally {
      setIsLoading(false)
    }
  }

  const choosePath = (id: string) => {
    setSelectedType(id)
    document.getElementById("partner-form")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <>
      <Navbar />
      <main id="main" className="relative isolate pt-16 md:pt-[72px]">
        <Texture variant="sunrise" className="h-[90vh]" />
        {/* Opening */}
        <section className="pb-16 pt-16 md:pb-20 md:pt-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <Reveal>
              <h1 className="max-w-4xl text-[clamp(2.4rem,10vw,3rem)] font-semibold leading-[1.04] tracking-tight text-ink md:text-7xl">
                {"Partner with India's"} <span className="text-saffron">elite engineers.</span>
              </h1>
              <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-ink-soft md:text-xl">
                From raw ideas to market-ready products. Join the innovators building the future with Intiv India.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="mt-10 flex flex-wrap gap-2">
                {capabilities.map((cap) => (
                  <li key={cap} className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm text-ink">
                    {cap}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Choose your path */}
        <section className="relative isolate overflow-hidden border-t border-border bg-mist/60 py-16 md:py-24">
          <Texture variant="contours" />
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-5xl">How would you like to partner?</h2>
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {partnerTypes.map((type, i) => {
                const selected = selectedType === type.id
                return (
                  <Reveal key={type.id} delay={i * 0.06}>
                    <button
                      type="button"
                      onClick={() => choosePath(type.id)}
                      aria-pressed={selected}
                      className={cn(
                        "group flex h-full w-full flex-col rounded-[20px] border p-6 text-left md:p-7 transition-[border-color,box-shadow,transform] duration-300 active:scale-[0.99]",
                        selected
                          ? "border-ink bg-white shadow-[0_24px_60px_-36px_rgba(11,38,64,0.45)]"
                          : "border-ink/[0.06] bg-white hover:-translate-y-0.5 hover:border-ink/25"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <type.icon className="size-7 text-ink" strokeWidth={1.5} aria-hidden />
                        <span
                          className={cn(
                            "flex size-6 items-center justify-center rounded-full border transition-[background-color,border-color,transform] duration-300 group-hover:scale-110",
                            selected ? "border-saffron bg-saffron text-white" : "border-border"
                          )}
                          aria-hidden
                        >
                          <AnimatePresence>
                            {selected && (
                              <motion.span
                                initial={{ scale: 0, rotate: -45 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0 }}
                                transition={{ type: "spring", stiffness: 520, damping: 26 }}
                                className="flex"
                              >
                                <Check className="size-3.5" strokeWidth={2.5} />
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </span>
                      </div>
                      <h3 className="mt-8 text-xl font-semibold tracking-tight text-ink">{type.title}</h3>
                      <p className="mt-2 leading-relaxed text-ink-soft">{type.description}</p>
                      <ul className="mt-6 space-y-2 border-t border-border pt-5">
                        {type.benefits.map((benefit) => (
                          <li key={benefit} className="text-sm text-muted-foreground">
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </button>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* Partnership Form */}
        <section id="partner-form" className="scroll-mt-24 py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-4">
              <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">Start your partnership.</h2>
              <p className="mt-4 max-w-[40ch] leading-relaxed text-ink-soft">
                {"Tell us about yourself and we'll find the best way to work together."}
              </p>
              <ul className="mt-8 space-y-3 text-ink">
                {["NDA available", "IP protection", "Response within 48 hours"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check className="size-4 text-india-green" strokeWidth={2.25} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
              <div className="rounded-[20px] border border-border bg-white p-6 shadow-[0_24px_60px_-36px_rgba(11,38,64,0.35)] md:p-10">
                {isSubmitted ? (
                  <div role="status" className="flex flex-col items-start py-10">
                    <DrawnCheck />
                    <h3 className="mt-6 text-3xl font-semibold tracking-tight text-ink">Request received.</h3>
                    <p className="mt-3 max-w-md leading-relaxed text-ink-soft">
                      Thank you for your interest in partnering with Intiv India. Our partnerships team will review
                      your request and reach out within 48 hours with next steps.
                    </p>
                    <Button
                      className="mt-8 border-ink/15 bg-white text-ink hover:bg-mist hover:text-ink"
                      variant="outline"
                      onClick={() => {
                        setIsSubmitted(false)
                        setSelectedType(null)
                      }}
                    >
                      Submit another request
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* FormSubmit config fields */}
                    <input type="hidden" name="_subject" value="New Partnership Request - IntivIndia" />
                    <input type="hidden" name="_template" value="table" />
                    <input type="hidden" name="_captcha" value="false" />
                    {/* Honeypot field — bots tend to fill this in, humans never see it */}
                    <input
                      type="text"
                      name="_honey"
                      style={{ display: "none" }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="group/field space-y-2">
                        <Label htmlFor="name" className="text-ink transition-colors group-focus-within/field:text-saffron-ink">Full name</Label>
                        <Input id="name" name="name" placeholder="Aarav Mehta" autoComplete="name" required />
                      </div>
                      <div className="group/field space-y-2">
                        <Label htmlFor="email" className="text-ink transition-colors group-focus-within/field:text-saffron-ink">Work email</Label>
                        <Input id="email" name="email" type="email" placeholder="aarav@company.in" autoComplete="email" spellCheck={false} required />
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="group/field space-y-2">
                        <Label htmlFor="organization" className="text-ink transition-colors group-focus-within/field:text-saffron-ink">Organization</Label>
                        <Input id="organization" name="organization" placeholder="Company or university" autoComplete="organization" required />
                      </div>
                      <div className="group/field space-y-2">
                        <Label htmlFor="role" className="text-ink transition-colors group-focus-within/field:text-saffron-ink">Your role</Label>
                        <Input id="role" name="role" placeholder="e.g. CTO, Professor, Director" autoComplete="organization-title" />
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="group/field space-y-2">
                        <Label htmlFor="phone" className="text-ink transition-colors group-focus-within/field:text-saffron-ink">Mobile number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          inputMode="tel"
                          placeholder="+91 98765 43210"
                          autoComplete="tel"
                          pattern="[+]?[0-9 \-]{10,16}"
                          title="Enter a valid mobile number, e.g. +91 98765 43210"
                          required
                        />
                      </div>
                      <div className="group/field space-y-2">
                        <Label htmlFor="partnerType" className="text-ink transition-colors group-focus-within/field:text-saffron-ink">Partnership type</Label>
                        <select
                          id="partnerType"
                          name="partnerType"
                          value={selectedType || ""}
                          onChange={(e) => setSelectedType(e.target.value || null)}
                          className={selectClass}
                          required
                        >
                          <option value="">Select partnership type</option>
                          {partnerTypes.map((type) => (
                            <option key={type.id} value={type.id}>{type.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="group/field space-y-2">
                      <Label htmlFor="projectIdea" className="text-ink transition-colors group-focus-within/field:text-saffron-ink">Project or partnership idea</Label>
                      <Textarea
                        id="projectIdea"
                        name="projectIdea"
                        placeholder="Describe your project idea, research area, or how you'd like to collaborate with us…"
                        className="min-h-[140px] resize-none"
                        required
                      />
                    </div>

                    <div className="group/field space-y-2">
                      <Label htmlFor="timeline" className="text-ink transition-colors group-focus-within/field:text-saffron-ink">Expected timeline</Label>
                      <select id="timeline" name="timeline" className={selectClass}>
                        <option value="">Select timeline</option>
                        <option value="immediate">Immediate ({"<"} 1 month)</option>
                        <option value="short">Short-term (1-3 months)</option>
                        <option value="medium">Medium-term (3-6 months)</option>
                        <option value="long">Long-term (6+ months)</option>
                      </select>
                    </div>

                    <FormError message={error} />

                    <Button
                      type="submit"
                      size="lg"
                      className="group w-full bg-ink text-white hover:bg-ink/90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin" aria-hidden />
                          Submitting…
                        </>
                      ) : (
                        <>
                          Submit partnership request
                          <ArrowSlide />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
