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
import { contact } from "@/lib/content"
import { Texture } from "@/components/story/textures"
import { Mail, Phone, MapPin, Loader2 } from "lucide-react"
import { ArrowSlide, CopyButton, DrawnCheck, FormError } from "@/components/story/micro"

export default function ContactPage() {
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

  return (
    <>
      <Navbar />
      <main id="main" className="relative isolate pt-16 md:pt-[72px]">
        <Texture variant="sunrise" className="h-[90vh]" />
        <section className="py-12 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-12 lg:gap-10">
            {/* The invitation */}
            <div className="lg:col-span-5">
              <Reveal>
                <h1 className="text-[clamp(2.4rem,10vw,3rem)] font-semibold leading-[1.04] tracking-tight text-ink md:text-6xl">
                  Every product starts with a <span className="text-saffron">conversation.</span>
                </h1>
                <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-ink-soft">
                  A startup with a bold idea, a university ready to collaborate, or an enterprise looking for a
                  new product line. Tell us where you are and we will take it from there.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <ul className="mt-10 space-y-5 md:mt-12 md:space-y-6">
                  <li className="flex gap-4">
                    <Mail className="mt-1 size-5 shrink-0 text-saffron" strokeWidth={1.75} aria-hidden />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <a href={`mailto:${contact.email}`} className="py-1.5 text-lg font-medium text-ink hover:underline">
                          {contact.email}
                        </a>
                        <CopyButton value={contact.email} label="email address" />
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <Phone className="mt-1 size-5 shrink-0 text-saffron" strokeWidth={1.75} aria-hidden />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <div className="flex flex-col">
                        {contact.phones.map((phone) => (
                          <a key={phone.href} href={phone.href} className="py-1.5 text-lg font-medium text-ink hover:underline">
                            {phone.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <MapPin className="mt-1 size-5 shrink-0 text-saffron" strokeWidth={1.75} aria-hidden />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-lg font-medium text-ink">{contact.city}</p>
                    </div>
                  </li>
                </ul>

                <p className="mt-12 border-t border-border pt-6 text-muted-foreground">
                  NDA protected. IP safe. We reply within 24 to 48 hours.
                </p>
              </Reveal>
            </div>

            {/* Contact Form */}
            <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
              <div className="rounded-[20px] border border-border bg-white p-6 shadow-[0_24px_60px_-36px_rgba(11,38,64,0.35)] md:p-10">
                {isSubmitted ? (
                  <div role="status" className="flex flex-col items-start py-10">
                    <DrawnCheck />
                    <h2 className="mt-6 text-3xl font-semibold tracking-tight text-ink">Message sent.</h2>
                    <p className="mt-3 max-w-sm leading-relaxed text-ink-soft">
                      Thank you for reaching out. Our team will get back to you within 24 to 48 hours.
                    </p>
                    <Button
                      className="mt-8 border-ink/15 bg-white text-ink hover:bg-mist hover:text-ink"
                      variant="outline"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* FormSubmit config fields */}
                    <input type="hidden" name="_subject" value="New Contact Form Submission - IntivIndia" />
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
                        <Label htmlFor="firstName" className="text-ink transition-colors group-focus-within/field:text-saffron-ink">First name</Label>
                        <Input id="firstName" name="firstName" placeholder="Aarav" autoComplete="given-name" required />
                      </div>
                      <div className="group/field space-y-2">
                        <Label htmlFor="lastName" className="text-ink transition-colors group-focus-within/field:text-saffron-ink">Last name</Label>
                        <Input id="lastName" name="lastName" placeholder="Mehta" autoComplete="family-name" required />
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="group/field space-y-2">
                        <Label htmlFor="email" className="text-ink transition-colors group-focus-within/field:text-saffron-ink">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="aarav@company.in" autoComplete="email" spellCheck={false} required />
                      </div>
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
                    </div>

                    <div className="group/field space-y-2">
                      <Label htmlFor="company" className="text-ink transition-colors group-focus-within/field:text-saffron-ink">Company or organization</Label>
                      <Input id="company" name="company" placeholder="Optional" autoComplete="organization" />
                    </div>

                    <div className="group/field space-y-2">
                      <Label htmlFor="subject" className="text-ink transition-colors group-focus-within/field:text-saffron-ink">Subject</Label>
                      <Input id="subject" name="subject" placeholder="How can we help…" required />
                    </div>

                    <div className="group/field space-y-2">
                      <Label htmlFor="message" className="text-ink transition-colors group-focus-within/field:text-saffron-ink">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your project or inquiry…"
                        className="min-h-[150px] resize-none"
                        required
                      />
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
                          Sending…
                        </>
                      ) : (
                        <>
                          Send message
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
