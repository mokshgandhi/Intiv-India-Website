"use client"

import Image from "next/image"
import { Code, Plane, Bot, Cpu, ArrowUpRight } from "lucide-react"

const systems = [
  {
    icon: Code,
    title: "Software & AI Platforms",
    description: "Full-stack software platforms, AI/ML systems, computer vision, NLP, and intelligent automation solutions.",
    image: "/images/ai-platform.jpg",
    tags: ["AI/ML", "Cloud Platforms", "Data Analytics"]
  },
  {
    icon: Plane,
    title: "Complete Drone Systems",
    description: "VTOL drones, hyperspectral imaging, surveillance systems, and defense-ready aerial platforms.",
    image: "/images/drone-hero.jpg",
    tags: ["VTOL", "Hyperspectral", "Defense-Ready"]
  },
  {
    icon: Bot,
    title: "Robotic Systems",
    description: "Agricultural robots, autonomous machines, vertibots, and intelligent robotic platforms.",
    image: "/images/agribot.jpg",
    tags: ["Agribots", "Autonomous", "Vertibots"]
  },
  {
    icon: Cpu,
    title: "Embedded & Hardware",
    description: "Custom embedded systems, IoT devices, PCB design, and manufacturing-ready hardware products.",
    image: "/images/embedded-systems.jpg",
    tags: ["Embedded", "IoT", "Manufacturing"]
  }
]

export function WhatWeBuildSection() {
  return (
    <section id="what-we-build" className="py-24 md:py-32 relative overflow-hidden bg-secondary/30">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-6">
            <span className="text-sm font-medium text-primary">What We Build</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Complete Systems, Not Components
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            We engineer and deliver fully integrated systems—hardware, software, and everything 
            in between—ready for real-world deployment and scale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {systems.map((system, index) => (
            <div
              key={system.title}
              className="group relative rounded-3xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[16/10] relative overflow-hidden">
                <Image
                  src={system.image || "/placeholder.svg"}
                  alt={system.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              </div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 backdrop-blur-sm border border-border/50 flex items-center justify-center">
                    <system.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <ArrowUpRight className="w-5 h-5 text-foreground" />
                  </div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  {system.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                  {system.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {system.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-secondary/80 text-secondary-foreground border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
