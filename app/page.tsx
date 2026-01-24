import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { WhatWeBuildSection } from "@/components/what-we-build-section"
import { HowWeWorkSection } from "@/components/how-we-work-section"
import { WhyIntivSection } from "@/components/why-intiv-section"
import { CollaborationSection } from "@/components/collaboration-section"
import { CaseStoriesSection } from "@/components/case-stories-section"
import { VisionSection } from "@/components/vision-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WhatWeBuildSection />
      <HowWeWorkSection />
      <WhyIntivSection />
      <CollaborationSection />
      <CaseStoriesSection />
      <VisionSection />
      <CTASection />
      <Footer />
    </main>
  )
}
