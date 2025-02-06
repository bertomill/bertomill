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
    <div className="min-h-screen bg-[#030303] text-white flex">
      <div className="film-grain" />
      <div className="film-scratches" />
      <div className="vignette" />
      <Navbar />
      
      <div className="flex-1 md:ml-[200px]">
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="container mx-auto px-6 md:px-8 py-8 md:py-12">
          {children}
        </main>

        <Footer />
        <Analytics />
        <SpeedInsights />
      </div>
    </div>
  )
}