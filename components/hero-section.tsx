"use client"

import React from "react"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const { clientX, clientY } = e
      const { width, height, left, top } = heroRef.current.getBoundingClientRect()
      const x = (clientX - left) / width - 0.5
      const y = (clientY - top) / height - 0.5
      
      heroRef.current.style.setProperty("--mouse-x", `${x * 20}px`)
      heroRef.current.style.setProperty("--mouse-y", `${y * 20}px`)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{ "--mouse-x": "0px", "--mouse-y": "0px" } as React.CSSProperties}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/30 to-background" />
      <div 
        className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.85 0.08 240) 0%, transparent 70%)" }}
      />
      <div 
        className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.85 0.08 240) 0%, transparent 70%)" }}
      />
      
      {/* Tricolor accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-saffron via-white to-india-green" />

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "60px 60px"
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-border">
              <span className="w-2 h-2 rounded-full bg-india-green animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">
                {"India's Elite Product Engineering Partner"}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight text-balance">
              From Raw Ideas to{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary via-primary to-saffron bg-clip-text text-transparent">
                  Real Products
                </span>
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-primary/10 -skew-x-3" />
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed text-pretty">
              Design. Engineer. Build. Deploy.{" "}
              <span className="font-semibold text-foreground">Made in India. Built for the World.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 group px-8">
                Build with Intiv India
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2 group bg-transparent">
                <Play className="w-4 h-4" />
                Watch Our Story
              </Button>
            </div>

            <div className="flex items-center gap-8 justify-center lg:justify-start pt-4">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground">50+</div>
                <div className="text-sm text-muted-foreground">Products Built</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">IP Protection</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground">Made in</div>
                <div className="text-sm text-muted-foreground">India</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div 
              className="relative aspect-square max-w-lg mx-auto transition-transform duration-300"
              style={{ transform: "translate(var(--mouse-x), var(--mouse-y))" }}
            >
              {/* Glassmorphism card with image */}
              <div className="absolute inset-4 rounded-3xl bg-card/40 backdrop-blur-xl border border-border/50 shadow-2xl overflow-hidden">
                <Image
                  src="/images/drone-hero.jpg"
                  alt="VTOL Drone System"
                  fill
                  className="object-cover opacity-90"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-sm font-medium text-muted-foreground">Featured System</div>
                  <div className="text-lg font-semibold text-foreground">VTOL Hyperspectral Drone</div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-2 -right-2 px-4 py-2 rounded-xl bg-card/80 backdrop-blur-sm border border-border shadow-lg">
                <div className="text-xs font-medium text-muted-foreground">Defense Ready</div>
              </div>
              <div className="absolute -bottom-2 -left-2 px-4 py-2 rounded-xl bg-card/80 backdrop-blur-sm border border-border shadow-lg">
                <div className="text-xs font-medium text-saffron">Atmanirbhar Bharat</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-muted-foreground">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
