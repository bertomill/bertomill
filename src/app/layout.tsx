import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Berto Mill',
  description: 'AI Developer & Consultant',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0a0a0a] text-[#e4e4e7]`}>
        <div className="film-grain opacity-[0.15]" />
        <div className="film-scratches opacity-[0.08]" />
        <div className="vignette opacity-[0.25]" />
        <Navigation />
        {children}
      </body>
    </html>
  )
}
