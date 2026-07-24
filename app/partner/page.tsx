"use client"

import React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  GraduationCap, 
  Rocket, 
  Building2, 
  Landmark, 
  ArrowRight, 
  CheckCircle,
  Cpu,
  Plane,
  Bot,
  Code
} from "lucide-react"

const partnerTypes = [
  {
    id: "university",
    icon: GraduationCap,
    title: "University / Research",
    description: "Joint R&D, student projects, innovation labs, and tech transfer programs.",
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
    description: "White-label solutions, custom engineering, and innovation partnerships.",
    benefits: ["White-label products", "Dedicated teams", "IP ownership", "Long-term contracts"]
  },
  {
    id: "government",
    icon: Landmark,
    title: "Government / PSU",
    description: "Mission-critical systems, defense tech, and public sector innovation.",
    benefits: ["DPIIT registered", "Make in India", "Security cleared", "Compliance ready"]
  }
]

const capabilities = [
  { icon: Code, label: "Software & AI Platforms" },
  { icon: Plane, label: "Drone Systems (VTOL/Fixed-wing)" },
  { icon: Bot, label: "Robotics & Automation" },
  { icon: Cpu, label: "Embedded & IoT Systems" }
]

export default function PartnerPage() {
  const [selectedType, setSelectedType] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
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
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-40 left-0 w-96 h-96 bg-india-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-saffron/5 rounded-full blur-3xl" />
        
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
              Partner with{" "}
              <span className="text-primary">{"India's"} Elite Engineers</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              From raw ideas to market-ready products. Join the league of innovators building the future with Intiv India.
            </p>
          </div>
          
          {/* Capabilities */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {capabilities.map((cap) => (
              <div 
                key={cap.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-muted-foreground"
              >
                <cap.icon className="w-4 h-4 text-primary" />
                {cap.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-semibold text-foreground text-center mb-10">
            How would you like to partner?
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {partnerTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setSelectedType(type.id)}
                className={`p-6 rounded-2xl border text-left transition-all ${
                  selectedType === type.id
                    ? "bg-primary/5 border-primary shadow-lg"
                    : "bg-card border-border hover:border-primary/30 hover:shadow-md"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  selectedType === type.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/10 text-primary"
                }`}>
                  <type.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{type.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{type.description}</p>
                <ul className="space-y-1.5">
                  {type.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        selectedType === type.id ? "bg-primary" : "bg-muted-foreground/50"
                      }`} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Form */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-india-green/10 flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-india-green" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">Partnership Request Submitted!</h3>
                  <p className="text-muted-foreground max-w-sm mb-2">
                    Thank you for your interest in partnering with Intiv India.
                  </p>
                  <p className="text-muted-foreground max-w-sm">
                    Our partnerships team will review your request and reach out within 48 hours with next steps.
                  </p>
                  <Button 
                    className="mt-8 bg-transparent" 
                    variant="outline"
                    onClick={() => {
                      setIsSubmitted(false)
                      setSelectedType(null)
                    }}
                  >
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-semibold text-foreground mb-2">Start Your Partnership Journey</h3>
                    <p className="text-sm text-muted-foreground">
                      Tell us about yourself and {"we'll"} find the best way to work together.
                    </p>
                  </div>
                  
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

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" placeholder="John Doe" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Work Email</Label>
                        <Input id="email" name="email" type="email" placeholder="john@company.com" required />
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="organization">Organization</Label>
                        <Input id="organization" name="organization" placeholder="Company / University name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Your Role</Label>
                        <Input id="role" name="role" placeholder="e.g. CTO, Professor, Director" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="partnerType">Partnership Type</Label>
                      <select 
                        id="partnerType"
                        name="partnerType"
                        value={selectedType || ""}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        required
                      >
                        <option value="">Select partnership type</option>
                        {partnerTypes.map((type) => (
                          <option key={type.id} value={type.id}>{type.title}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="projectIdea">Project / Partnership Idea</Label>
                      <Textarea 
                        id="projectIdea" 
                        name="projectIdea"
                        placeholder="Describe your project idea, research area, or how you'd like to collaborate with us..." 
                        className="min-h-[120px] resize-none"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timeline">Expected Timeline</Label>
                      <select 
                        id="timeline"
                        name="timeline"
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        <option value="">Select timeline</option>
                        <option value="immediate">Immediate ({"<"} 1 month)</option>
                        <option value="short">Short-term (1-3 months)</option>
                        <option value="medium">Medium-term (3-6 months)</option>
                        <option value="long">Long-term (6+ months)</option>
                      </select>
                    </div>
                    
                    {/* Trust indicators */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-india-green" />
                        NDA Available
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-saffron" />
                        IP Protection
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        48h Response
                      </div>
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
                          Submitting...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Submit Partnership Request
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
