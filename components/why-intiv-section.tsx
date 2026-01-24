"use client"

import { Check, ShieldCheck, Users, Building2, Award } from "lucide-react"

const reasons = [
  {
    icon: ShieldCheck,
    title: "Complete System Ownership",
    description: "We deliver fully integrated systems—hardware, software, and manufacturing—under one roof. No fragmented vendors.",
    highlights: ["Hardware + Software", "Full Stack", "Manufacturing Ready"]
  },
  {
    icon: Check,
    title: "NDA-First, IP-Safe Collaboration",
    description: "Your intellectual property is sacred. We operate under strict NDAs with complete IP protection. Your innovation stays yours.",
    highlights: ["Strict NDA", "100% IP Protection", "Confidential"]
  },
  {
    icon: Users,
    title: "Multidisciplinary Elite Team",
    description: "Engineers across software, AI, robotics, embedded systems, and manufacturing working as one integrated force.",
    highlights: ["AI/ML Experts", "Hardware Engineers", "System Architects"]
  },
  {
    icon: Building2,
    title: "University–Startup–Industry Bridge",
    description: "We connect academic research with startup innovation and industry scale. From lab to market seamlessly.",
    highlights: ["Research Labs", "Incubation", "Industry Scale"]
  },
  {
    icon: Award,
    title: "Make in India, Global Quality",
    description: "Products engineered with Indian talent, built to compete globally. Atmanirbhar Bharat through deep-tech innovation.",
    highlights: ["Made in India", "Global Standards", "Atmanirbhar"]
  }
]

export function WhyIntivSection() {
  return (
    <section id="why-intiv" className="py-24 md:py-32 relative overflow-hidden bg-secondary/30">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-6">
            <span className="text-sm font-medium text-primary">Why Intiv India</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            {"India's Elite Engineering Partner"}
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            We {"don't"} just build products—we build complete systems that transform industries 
            and empower innovators to achieve their vision.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className={`group p-8 rounded-3xl bg-card border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 ${
                index === reasons.length - 1 ? "lg:col-span-2 lg:max-w-2xl lg:mx-auto" : ""
              }`}
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <reason.icon className="w-7 h-7 text-primary" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-3">{reason.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{reason.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {reason.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                      >
                        <Check className="w-3 h-3 text-india-green" />
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
