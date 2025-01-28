import { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import NavbarAuth from './NavbarAuth'
import Head from 'next/head'
import { useRouter } from 'next/router'
import InteractiveAI from './InteractiveAI'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <div className="min-h-screen bg-[#1C1917] text-stone-200">
        {/* Vertical Navigation */}
        <nav className="fixed left-0 top-0 h-full w-48 bg-[#1C1917] z-50 border-r border-[#4A5D41]/20">
          <div className="h-full flex flex-col py-12">
            <Link href="/" className="text-center text-xl font-light tracking-[0.2em] px-6 mb-16">
              BERTO
              <br />
              MILL
            </Link>
            
            <div className="flex flex-col gap-8 px-6 text-sm tracking-widest">
              <Link 
                href="/blog" 
                className={`transition-colors duration-300 ${
                  router.pathname.startsWith('/blog') 
                    ? 'text-[#8B9D7D]' 
                    : 'text-stone-400 hover:text-[#8B9D7D]'
                }`}
              >
                BLOG
              </Link>
              <Link 
                href="/docs"
                className={`transition-colors duration-300 ${
                  router.pathname.startsWith('/docs')
                    ? 'text-[#8B9D7D]'
                    : 'text-stone-400 hover:text-[#8B9D7D]'
                }`}
              >
                DOCS
              </Link>
              <Link 
                href="/projects"
                className={`transition-colors duration-300 ${
                  router.pathname.startsWith('/projects')
                    ? 'text-[#8B9D7D]'
                    : 'text-stone-400 hover:text-[#8B9D7D]'
                }`}
              >
                PROJECTS
              </Link>
              <Link 
                href="/about"
                className={`transition-colors duration-300 ${
                  router.pathname.startsWith('/about')
                    ? 'text-[#8B9D7D]'
                    : 'text-stone-400 hover:text-[#8B9D7D]'
                }`}
              >
                ABOUT
              </Link>
              <NavbarAuth />
            </div>

            <div className="mt-auto px-6 pb-8">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="hover:text-emerald-500 transition-colors duration-300"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>
          </div>
        </nav>
        <main className="pl-48">{children}</main>
        <InteractiveAI />
      </div>
    </>
  )
}