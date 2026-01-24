"use client"

import { Sparkles } from "lucide-react"

export function VisionSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      {/* Decorative elements */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.85 0.08 240) 0%, transparent 70%)" }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Our Vision</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-8 text-balance leading-tight">
            Powering {"India's"}{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-saffron via-foreground to-india-green bg-clip-text text-transparent">
                Product Revolution
              </span>
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 text-pretty max-w-3xl mx-auto">
            We envision an India where every innovator has access to world-class 
            product engineering—where ideas {"don't"} die for lack of execution, 
            and where {"'Made in India'"} means global excellence.
          </p>
          
          {/* Tricolor accent */}
          <div className="flex justify-center items-center gap-4">
            <div className="h-1 w-24 rounded-full bg-gradient-to-r from-transparent to-saffron" />
            <div className="h-2 w-2 rounded-full bg-foreground" />
            <div className="h-1 w-24 rounded-full bg-gradient-to-l from-transparent to-india-green" />
          </div>
        </div>
      </div>
    </section>
  )
}
