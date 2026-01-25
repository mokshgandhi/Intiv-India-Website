"use client"

import { GraduationCap, Rocket, Building, Landmark, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const collaborators = [
  {
    icon: GraduationCap,
    title: "Universities & Research Labs",
    description: "Partner with incubation cells and research labs to bring academic innovations to market.",
    items: ["Incubation Support", "Research Collaboration", "Idea Labs"]
  },
  {
    icon: Rocket,
    title: "Startups & Founders",
    description: "Turn your startup vision into production-ready products with our engineering expertise.",
    items: ["MVP Development", "Scale Engineering", "Technical Co-founding"]
  },
  {
    icon: Building,
    title: "Enterprises",
    description: "Rapid product engineering for corporations seeking innovation and new product lines.",
    items: ["R&D Partnership", "Product Innovation", "System Integration"]
  },
  {
    icon: Landmark,
    title: "Government Programs",
    description: "Supporting national innovation initiatives and defense modernization efforts.",
    items: ["SSIP", "Seed Funds", "Defense Projects"]
  }
]

const programs = [
  "Hackathons",
  "Ideathons",
  "Incubation",
  "Student Startup & Innovation Policy",
  "Seed Funds",
  "Idea Labs"
]

export function CollaborationSection() {
  return (
    <section id="collaboration" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-border mb-6">
            <span className="text-sm font-medium text-primary">Collaboration</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            University & Startup Collaboration
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            From campus innovation to market-ready products. We bridge the gap between 
            ideas and impact through structured collaboration programs.
          </p>
        </div>

        {/* Programs banner */}
        <div className="mb-16 overflow-hidden rounded-2xl bg-card border border-border p-1">
          <div className="flex flex-wrap justify-center gap-2 p-4">
            {programs.map((program) => (
              <span
                key={program}
                className="px-4 py-2 rounded-full text-sm font-medium bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
              >
                {program}
              </span>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {collaborators.map((collab, index) => (
            <div
              key={collab.title}
              className="group p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/30 hover:bg-card transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <collab.icon className="w-7 h-7 text-primary" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-3">{collab.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{collab.description}</p>
              
              <div className="space-y-2">
                {collab.items.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 rounded-3xl bg-gradient-to-br from-primary/5 via-card to-primary/5 border border-border">
            <div className="text-center sm:text-left">
              <div className="text-2xl font-bold text-foreground mb-2">
                Ready to collaborate?
              </div>
              <div className="text-muted-foreground">
                {"Let's"} transform your innovation into reality
              </div>
            </div>

            <Link href="/contact">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 group"
              >
                Start a Conversation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
