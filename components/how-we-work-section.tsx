"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Lightbulb, PenTool, Wrench, FlaskConical, Rocket, TrendingUp } from "lucide-react"

const steps = [
  { 
    number: "01", 
    title: "Ideation", 
    icon: Lightbulb,
    description: "We start by deeply understanding your vision. Through collaborative workshops, we define the problem, explore possibilities, and crystallize the product direction."
  },
  { 
    number: "02", 
    title: "Design", 
    icon: PenTool,
    description: "Our architects craft the technical blueprint - system design, component architecture, and user experience flows that balance innovation with feasibility."
  },
  { 
    number: "03", 
    title: "Build", 
    icon: Wrench,
    description: "Cross-functional teams bring designs to life with agile sprints, continuous integration, and engineering excellence - whether software, hardware, or both."
  },
  { 
    number: "04", 
    title: "Validate", 
    icon: FlaskConical,
    description: "Rigorous testing across all dimensions - functional, performance, security, and user acceptance - ensures your product meets the highest standards."
  },
  { 
    number: "05", 
    title: "Deploy", 
    icon: Rocket,
    description: "We handle production deployment, documentation, and knowledge transfer, ensuring your team is equipped to take full ownership."
  },
  { 
    number: "06", 
    title: "Scale", 
    icon: TrendingUp,
    description: "Post-launch support, optimization, and scaling strategies help your product grow from MVP to market leader."
  },
]

export function HowWeWorkSection() {
  const [activeStep, setActiveStep] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      className="py-24 md:py-32 relative overflow-hidden bg-secondary/30"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Our Process</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold text-foreground tracking-tight mb-4 text-balance">
            From Idea to Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A proven methodology that transforms ambitious concepts into market-ready products
          </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-5xl mx-auto">
          {/* Progress Track */}
          <div className="relative mb-12">
            {/* Background Track - behind nodes */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-border z-0" />
            
            {/* Animated Progress - behind nodes */}
            <div
              className="absolute top-6 left-0 h-0.5 bg-gradient-to-r from-saffron via-primary to-india-green transition-all duration-700 ease-out z-0"
              style={{ width: `${((activeStep) / (steps.length - 1)) * 100}%` }}
            />

            {/* Step Nodes - above the line */}
            <div className="relative flex justify-between z-10">
              {steps.map((step, index) => {
                const isActive = index === activeStep
                const isPast = index < activeStep
                const Icon = step.icon

                return (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => setActiveStep(index)}
                    className="group flex flex-col items-center"
                  >
                    {/* Node Circle - solid background to cover the line */}
                    <div
                      className={cn(
                        "relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border-2",
                        isActive
                          ? "bg-primary border-primary scale-110 shadow-lg shadow-primary/20"
                          : isPast
                            ? "bg-secondary border-primary/30"
                            : "bg-secondary border-border group-hover:border-primary/30"
                      )}
                    >
                      <Icon 
                        className={cn(
                          "w-5 h-5 transition-colors duration-300",
                          isActive 
                            ? "text-primary-foreground" 
                            : isPast 
                              ? "text-primary" 
                              : "text-muted-foreground group-hover:text-foreground"
                        )} 
                      />
                      {isActive && (
                        <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-30" />
                      )}
                    </div>

                    {/* Step Number & Title */}
                    <div className="mt-4 text-center">
                      <div className={cn(
                        "text-xs font-mono transition-colors duration-300",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )}>
                        {step.number}
                      </div>
                      <div className={cn(
                        "text-sm font-medium mt-1 transition-all duration-300",
                        isActive ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {step.title}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Active Step Description Card */}
          <div className="relative">
            <div 
              key={activeStep}
              className="bg-card border border-border rounded-2xl p-8 md:p-10 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Large Step Number */}
                <div className="flex-shrink-0">
                  <div className="text-7xl md:text-8xl font-extralight text-primary/10 leading-none select-none">
                    {steps[activeStep].number}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    {(() => {
                      const Icon = steps[activeStep].icon
                      return <Icon className="w-6 h-6 text-primary" />
                    })()}
                    <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
                      {steps[activeStep].title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {steps[activeStep].description}
                  </p>
                </div>
              </div>

              {/* Tricolor accent line at bottom */}
              <div className="absolute bottom-0 left-8 right-8 h-0.5 rounded-full overflow-hidden">
                <div className="flex h-full">
                  <div className="flex-1 bg-saffron" />
                  <div className="flex-1 bg-background" />
                  <div className="flex-1 bg-india-green" />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots (Mobile) */}
          <div className="flex items-center justify-center gap-2 mt-8 md:hidden">
            {steps.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveStep(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === activeStep 
                    ? "bg-primary w-6" 
                    : "bg-border hover:bg-muted-foreground"
                )}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
