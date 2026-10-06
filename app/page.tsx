import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/story/hero"
import { Prologue } from "@/components/story/prologue"
import { About } from "@/components/story/about"
import { WhatWeBuild } from "@/components/story/what-we-build"
import { HowWeWork } from "@/components/story/how-we-work"
import { WhyIntiv } from "@/components/story/why-intiv"
import { Collaboration } from "@/components/story/collaboration"
import { Epilogue } from "@/components/story/epilogue"

/*
  The home page reads as one story:
  the promise (hero) -> the problem (prologue) -> who we are -> what we build ->
  how we work -> why us -> who we build with -> the vision and invitation.
*/
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Prologue />
        <About />
        <WhatWeBuild />
        <HowWeWork />
        <WhyIntiv />
        <Collaboration />
        <Epilogue />
      </main>
      <Footer />
    </>
  )
}
