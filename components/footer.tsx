import Link from "next/link"
import Image from "next/image"
import { contact } from "@/lib/content"
import { Texture } from "@/components/story/textures"

const explore = [
  { name: "About", href: "/#about" },
  { name: "What We Build", href: "/#what-we-build" },
  { name: "How We Work", href: "/#how-we-work" },
  { name: "Why Intiv", href: "/#why-intiv" },
  { name: "Collaboration", href: "/#collaboration" },
]

const workWithUs = [
  { name: "Partner with us", href: "/partner" },
  { name: "Contact", href: "/contact" },
]

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-border bg-white">
      <Texture variant="dots" mask="radial-gradient(50% 80% at 100% 100%, #000 10%, transparent 75%)" />
      <div className="mx-auto max-w-7xl px-5 pb-[max(4rem,env(safe-area-inset-bottom))] pt-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="-my-2 inline-block py-2" aria-label="Intiv India home">
              <Image src="/images/logo-intiv.svg" alt="Intiv India" width={180} height={26} className="h-6 w-auto" />
            </Link>
            <p className="mt-6 max-w-sm leading-relaxed text-muted-foreground">
              {"India's"} product engineering partner. From raw ideas to real products. NDA-protected, IP-safe,
              made in India and built for the world.
            </p>
          </div>

          <nav aria-label="Explore" className="md:col-span-3">
            <h2 className="text-sm font-semibold text-ink">Explore</h2>
            <ul className="mt-3 space-y-0.5">
              {explore.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="link-slide inline-block py-2 text-muted-foreground transition-colors hover:text-ink">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="text-sm font-semibold text-ink">Work with us</h2>
            <ul className="mt-3 space-y-0.5">
              {workWithUs.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="link-slide inline-block py-2 text-muted-foreground transition-colors hover:text-ink">
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <a href={`mailto:${contact.email}`} className="link-slide inline-block py-2 text-muted-foreground transition-colors hover:text-ink">
                  {contact.email}
                </a>
              </li>
              {contact.phones.map((phone) => (
                <li key={phone.href}>
                  <a href={phone.href} className="link-slide inline-block py-2 text-muted-foreground transition-colors hover:text-ink">
                    {phone.label}
                  </a>
                </li>
              ))}
              <li className="py-2 text-muted-foreground">{contact.city}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© 2026 Intiv India. All rights reserved.</p>
          <p>NDA protected. IP safe.</p>
        </div>
      </div>
      {/* Brand signature: the wordmark's tricolor */}
      <div aria-hidden className="flex h-1">
        <div className="flex-1 bg-saffron" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-india-green" />
      </div>
    </footer>
  )
}
