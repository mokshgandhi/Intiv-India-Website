"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react"
import { useReducedMotionSafe } from "@/components/story/motion-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "About", id: "about" },
  { name: "What We Build", id: "what-we-build" },
  { name: "How We Work", id: "how-we-work" },
  { name: "Why Intiv", id: "why-intiv" },
  { name: "Collaboration", id: "collaboration" },
]

export function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const reduce = useReducedMotionSafe()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)

  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 24
    setIsScrolled((prev) => (prev === next ? prev : next))
  })

  // Highlight the chapter the reader is currently in (home page only).
  useEffect(() => {
    if (!isHome) return
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [isHome])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  const solid = isScrolled || !isHome || isMobileMenuOpen

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300",
        solid
          ? "border-b border-border/80 bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] md:h-[72px] md:px-8"
      >
        <Link href="/" className="-my-3 flex items-center py-3" aria-label="Intiv India home">
          <Image
            src="/images/logo-intiv.svg"
            alt="Intiv India"
            width={160}
            height={23}
            className="h-[18px] w-auto md:h-5"
            priority
          />
        </Link>

        <ul className="hidden items-center gap-7 xl:flex">
          {navItems.map((item) => {
            const isActive = isHome && activeId === item.id
            return (
              <li key={item.id}>
                <Link
                  href={`/#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "group/nav relative py-2 text-[15px] transition-colors",
                    isActive ? "text-ink" : "text-muted-foreground hover:text-ink"
                  )}
                >
                  {item.name}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 -bottom-0.5 h-[2px] origin-left rounded-full bg-saffron transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0 opacity-40 group-hover/nav:scale-x-100"
                    )}
                  />
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="hidden items-center gap-2 xl:flex">
          <Button asChild variant="ghost" className="text-ink hover:bg-mist hover:text-ink">
            <Link href="/contact">Contact</Link>
          </Button>
          <Button asChild className="bg-ink text-white hover:bg-ink/90">
            <Link href="/partner">Partner with us</Link>
          </Button>
        </div>

        <button
          type="button"
          className="-mr-2 flex size-11 items-center justify-center rounded-full text-ink xl:hidden"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <span aria-hidden className="relative block h-3.5 w-6">
            <span
              className={cn(
                "absolute left-0 top-0 h-[1.75px] w-6 rounded-full bg-ink transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isMobileMenuOpen && "translate-y-[6px] rotate-45"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-[6px] h-[1.75px] w-6 rounded-full bg-ink transition-[opacity,transform] duration-200",
                isMobileMenuOpen && "scale-x-0 opacity-0"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-3 h-[1.75px] w-6 rounded-full bg-ink transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isMobileMenuOpen && "-translate-y-[6px] -rotate-45"
              )}
            />
          </span>
        </button>
      </nav>

      {/* Reading progress through the story */}
      {isHome && !reduce && (
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-saffron"
          style={{ scaleX: progress }}
        />
      )}

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-border bg-background pb-[env(safe-area-inset-bottom)] xl:hidden"
          >
            <ul className="mx-auto flex max-w-7xl flex-col px-5 py-4">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.12 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={`/#${item.id}`}
                    className="flex items-center justify-between py-3.5 text-[1.65rem] font-medium tracking-tight text-ink active:text-saffron-ink"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                    <span aria-hidden className={cn("size-2 rounded-full", isHome && activeId === item.id ? "bg-saffron" : "bg-transparent")} />
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-border px-5 py-6"
            >
              <Button asChild size="lg" className="bg-ink text-white hover:bg-ink/90">
                <Link href="/partner" onClick={() => setIsMobileMenuOpen(false)}>
                  Partner with us
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-ink/20 bg-white text-ink hover:bg-mist hover:text-ink">
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  Contact
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
