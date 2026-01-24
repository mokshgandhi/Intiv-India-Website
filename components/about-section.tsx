"use client"

import { useRef } from "react"
import { Target, Globe, Shield, Lightbulb } from "lucide-react"

const values = [
  {
    icon: Target,
    title: "Nation-First Innovation",
    description: "Building India's deep-tech backbone with global engineering standards."
  },
  {
    icon: Globe,
    title: "Global-Grade Quality",
    description: "Products engineered to compete on the world stage, manufactured in India."
  },
  {
    icon: Shield,
    title: "IP-Safe Collaboration",
    description: "Strict NDA policies. Your intellectual property remains 100% yours."
  },
  {
    icon: Lightbulb,
    title: "Complete System Ownership",
    description: "End-to-end product engineering from concept to deployment."
  }
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-border mb-6">
            <span className="text-sm font-medium text-primary">About Intiv India</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            {"Powering India's Product Revolution"}
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            Intiv India is an elite product engineering partner that transforms raw ideas into 
            real-world, deployable products. We are complete system builders—not just designers 
            or software vendors. We engineer and deliver full software platforms, AI systems, 
            complete drone systems, robotic systems, embedded electronics, and manufacturing-ready products.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="group p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Tricolor accent */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-3">
            <div className="w-20 h-1 rounded-full bg-saffron" />
            <div className="w-20 h-1 rounded-full bg-muted" />
            <div className="w-20 h-1 rounded-full bg-india-green" />
          </div>
        </div>
      </div>
    </section>
  )
}
