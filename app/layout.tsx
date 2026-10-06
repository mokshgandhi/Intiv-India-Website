import React from "react"
import type { Metadata, Viewport } from 'next'
import { Outfit, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { MotionProvider } from "@/components/story/motion-provider"
import { PaperGrain } from "@/components/story/textures"
import './globals.css'

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" })

export const metadata: Metadata = {
  title: 'Intiv India | Elite Product Engineering Partner',
  description: 'From raw ideas to real products. India\'s elite product engineering partner building complete software platforms, AI systems, drone systems, robotics, and manufacturing-ready hardware. Made in India, Built for the World.',
  generator: 'Intiv India',
  keywords: ['product engineering', 'drones', 'robotics', 'AI systems', 'embedded systems', 'Made in India', 'deep-tech', 'VTOL', 'agribots'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#fafaf9',
  colorScheme: 'light',
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
        <PaperGrain />
        <Analytics />
      </body>
    </html>
  )
}
