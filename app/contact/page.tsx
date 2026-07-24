"use client"

import React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@intivindia.in",
    href: "mailto:info@intivindia.in"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 94282 46611, +91 91737 47119",
    href: "tel:+919428246611, tel:+919173747119"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Ahmedabad, India",
    href: "#"
  }
]

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
      const response = await fetch("https://formsubmit.co/ajax/intivindia@gmail.com", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      })

      const data = await response.json().catch(() => null)

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
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-saffron/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            {/* Tricolor accent */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-1">
                <div className="w-8 h-0.5 rounded-full bg-saffron" />
                <div className="w-8 h-0.5 rounded-full bg-muted" />
                <div className="w-8 h-0.5 rounded-full bg-india-green" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              {"Let's Build "}
              <span className="text-primary">Something Extraordinary</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Have a product idea? Want to collaborate? Or just want to say hello? 
              {"We'd"} love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-6">Get in Touch</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Whether {"you're"} a startup with a groundbreaking idea, a university looking to collaborate, 
                or an enterprise seeking innovation, {"we're"} here to help turn your vision into reality.
              </p>
              
              <div className="space-y-6 mb-12">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium text-foreground">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
              
              {/* Trust badges */}
              <div className="p-6 rounded-xl bg-secondary/50 border border-border">
                <h3 className="font-medium text-foreground mb-4">Our Commitment</h3>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card text-xs font-medium text-secondary-foreground border border-border">
                    <div className="w-2 h-2 rounded-full bg-india-green" />
                    NDA Protected
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card text-xs font-medium text-secondary-foreground border border-border">
                    <div className="w-2 h-2 rounded-full bg-saffron" />
                    IP Safe
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card text-xs font-medium text-secondary-foreground border border-border">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    24-48h Response
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-india-green/10 flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-india-green" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">Message Sent!</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Thank you for reaching out. Our team will get back to you within 24-48 hours.
                  </p>
                  <Button 
                    className="mt-8 bg-transparent" 
                    variant="outline"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
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

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" name="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" name="lastName" placeholder="Doe" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="john@company.com" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company / Organization</Label>
                    <Input id="company" name="company" placeholder="Your company name" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" name="subject" placeholder="How can we help?" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      name="message"
                      placeholder="Tell us about your project or inquiry..." 
                      className="min-h-[150px] resize-none"
                      required
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-destructive">{error}</p>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
