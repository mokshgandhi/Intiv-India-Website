"use client"

import Link from "next/link"
import Image from "next/image"
import { Linkedin, Twitter, Youtube, Github } from "lucide-react"

const footerLinks = {
  company: [
    { name: "About Us", href: "/#about" },
    { name: "Our Team", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "/contact" }
  ],
  services: [
    { name: "Software & AI", href: "#what-we-build" },
    { name: "Drone Systems", href: "#what-we-build" },
    { name: "Robotics", href: "#what-we-build" },
    { name: "Embedded Systems", href: "#what-we-build" }
  ],
  collaborate: [
    { name: "Universities", href: "#collaboration" },
    { name: "Startups", href: "#collaboration" },
    { name: "Enterprises", href: "#collaboration" },
    { name: "Government", href: "#collaboration" }
  ],
  resources: [
    { name: "Case Stories", href: "#case-stories" },
    { name: "Blog", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "FAQs", href: "#" }
  ]
}

const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
  { name: "GitHub", icon: Github, href: "#" }
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo-intiv.png"
                alt="Intiv India"
                width={160}
                height={45}
                className="h-10 w-auto"
              />
            </Link>
            
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-sm">
              {"India's"} elite product engineering partner. From raw ideas to real products. 
              NDA-protected. IP-safe. Made in India. Built for the World.
            </p>
            
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Collaborate</h4>
            <ul className="space-y-3">
              {footerLinks.collaborate.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span>© 2026 Intiv India. All rights reserved.</span>
              <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
            </div>
            
            {/* Trust badges */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                <div className="w-2 h-2 rounded-full bg-india-green" />
                NDA Protected
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                <div className="w-2 h-2 rounded-full bg-saffron" />
                IP Safe
              </div>
            </div>
          </div>
          
          {/* Tricolor accent */}
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2">
              <div className="w-16 h-0.5 rounded-full bg-saffron" />
              <div className="w-16 h-0.5 rounded-full bg-muted" />
              <div className="w-16 h-0.5 rounded-full bg-india-green" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
