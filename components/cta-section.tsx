"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-primary text-primary-foreground">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "60px 60px"
        }}
      />
      
      {/* Tricolor accent at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-saffron via-white to-india-green" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-balance leading-tight">
            {"Let's"} Build the Future.{" "}
            <span className="opacity-80">Together.</span>{" "}
            <span className="opacity-60">In India.</span>
          </h2>
          
          <p className="text-lg md:text-xl opacity-80 leading-relaxed mb-10 max-w-2xl mx-auto text-pretty">
            Have an idea that needs engineering excellence? {"Let's"} turn your vision 
            into a complete, deployable product. NDA-protected. IP-safe. Made in India.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 gap-2 group px-8"
            >
              Build with Intiv India
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 gap-2 bg-transparent"
            >
              Schedule a Call
            </Button>
          </div>
          
          {/* Contact info */}
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            <a href="mailto:hello@intivindia.com" className="flex items-center gap-2 text-sm hover:opacity-100 transition-opacity">
              <Mail className="w-4 h-4" />
              hello@intivindia.com
            </a>
            <a href="tel:+919876543210" className="flex items-center gap-2 text-sm hover:opacity-100 transition-opacity">
              <Phone className="w-4 h-4" />
              +91 98765 43210
            </a>
            <span className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4" />
              Ahmedabad, India
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
