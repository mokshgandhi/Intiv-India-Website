"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

const caseStories = [
  {
    title: "VTOL Hyperspectral Drone",
    subtitle: "Agriculture & Mining",
    description: "A complete VTOL drone system with hyperspectral imaging capabilities for precision agriculture monitoring and mineral exploration. Defense-ready platform with autonomous navigation.",
    image: "/images/drone-hero.jpg",
    stats: [
      { label: "Flight Time", value: "4+ Hours" },
      { label: "Coverage", value: "500 Hectares" },
      { label: "Resolution", value: "Sub-meter" }
    ],
    tags: ["VTOL", "Hyperspectral", "Autonomous"]
  },
  {
    title: "AI-Driven Healthcare Platform",
    subtitle: "Medical Surveillance",
    description: "An intelligent healthcare monitoring system using computer vision and AI for patient surveillance, vital signs monitoring, and early warning detection in hospital environments.",
    image: "/images/healthcare-ai.jpg",
    stats: [
      { label: "Accuracy", value: "99.2%" },
      { label: "Response", value: "<100ms" },
      { label: "Patients", value: "1000+" }
    ],
    tags: ["AI/ML", "Computer Vision", "Healthcare"]
  },
  {
    title: "Agricultural Robots",
    subtitle: "Agribots",
    description: "Autonomous agricultural robots for precision farming—seeding, weeding, monitoring, and harvesting. Solar-powered, GPS-guided, and built for Indian farm conditions.",
    image: "/images/agribot.jpg",
    stats: [
      { label: "Efficiency", value: "+40%" },
      { label: "Coverage", value: "2 Acres/Hr" },
      { label: "Uptime", value: "18 Hrs" }
    ],
    tags: ["Robotics", "Agriculture", "Autonomous"]
  },
  {
    title: "Autonomous Robotic Systems",
    subtitle: "Industrial Automation",
    description: "Custom autonomous systems for industrial applications—warehouse automation, quality inspection, and material handling with integrated AI decision-making.",
    image: "/images/embedded-systems.jpg",
    stats: [
      { label: "Precision", value: "±0.1mm" },
      { label: "Speed", value: "3x Faster" },
      { label: "ROI", value: "18 Months" }
    ],
    tags: ["Automation", "Industrial", "AI"]
  }
]

export function CaseStoriesSection() {
  return (
    <section id="case-stories" className="py-24 md:py-32 relative overflow-hidden bg-secondary/30">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-6">
            <span className="text-sm font-medium text-primary">Case Stories</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Products We{"'"}ve Built
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            Real systems, real impact. Explore some of the complete products we{"'"}ve 
            engineered and deployed across industries.
          </p>
        </div>

        <div className="space-y-8">
          {caseStories.map((story, index) => (
            <div
              key={story.title}
              className={`group grid lg:grid-cols-2 gap-8 items-center p-6 md:p-8 rounded-3xl bg-card border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <Image
                  src={story.image || "/placeholder.svg"}
                  alt={story.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
                
                {/* Floating badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm border border-border text-xs font-medium text-foreground">
                  {story.subtitle}
                </div>
              </div>
              
              <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {story.description}
                  </p>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {story.stats.map((stat) => (
                    <div key={stat.label} className="text-center p-3 rounded-xl bg-secondary/50">
                      <div className="text-lg md:text-xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {story.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Read more */}
                <button type="button" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline group/link">
                  Read full case study
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
