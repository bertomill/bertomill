import { ReactNode } from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
}

export default function Layout({ 
  children, 
  title = 'Berto Mill - AI Developer & Consultant',
  description = 'Personal website of Berto Mill, an AI developer and consultant based in Toronto.'
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e4e4e7] flex">
      <div className="film-grain opacity-[0.15]" />
      <div className="film-scratches opacity-[0.08]" />
      <div className="vignette opacity-[0.25]" />
      <Navbar />
      
      <div className="flex-1 ml-0 md:ml-[200px] min-h-screen overflow-x-hidden">
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="w-full min-h-screen px-0 md:px-8">
          {children}
        </main>

        <Footer />
        <Analytics />
        <SpeedInsights />
      </div>
    </div>
  )
}