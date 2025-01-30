import { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import NavbarAuth from './NavbarAuth'
import Head from 'next/head'
import { useRouter } from 'next/router'
import InteractiveAI from './InteractiveAI'
import { motion, AnimatePresence } from 'framer-motion'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <div className="min-h-screen bg-[#1a1b26] text-[#c0caf5]">
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden fixed top-4 left-4 z-50 p-2 text-[#c0caf5]"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Navigation Sidebar */}
        <AnimatePresence>
          {(isMenuOpen || !isMobile) && (
            <motion.nav 
              initial={{ x: -192 }}
              animate={{ x: 0 }}
              exit={{ x: -192 }}
              transition={{ duration: 0.2 }}
              className="fixed left-0 top-0 h-full w-48 bg-[#1a1b26] z-40 border-r border-[#414868]/20 md:translate-x-0"
            >
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
                        ? 'text-[#7aa2f7]' 
                        : 'text-[#a9b1d6] hover:text-[#7aa2f7]'
                    }`}
                  >
                    BLOG
                  </Link>
                  <Link 
                    href="/docs"
                    className={`transition-colors duration-300 ${
                      router.pathname.startsWith('/docs')
                        ? 'text-[#7aa2f7]'
                        : 'text-[#a9b1d6] hover:text-[#7aa2f7]'
                    }`}
                  >
                    DOCS
                  </Link>
                  <Link 
                    href="/projects"
                    className={`transition-colors duration-300 ${
                      router.pathname.startsWith('/projects')
                        ? 'text-[#7aa2f7]'
                        : 'text-[#a9b1d6] hover:text-[#7aa2f7]'
                    }`}
                  >
                    PROJECTS
                  </Link>
                  <Link 
                    href="/about"
                    className={`transition-colors duration-300 ${
                      router.pathname.startsWith('/about')
                        ? 'text-[#7aa2f7]'
                        : 'text-[#a9b1d6] hover:text-[#7aa2f7]'
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
                      className="hover:text-[#bb9af7] transition-colors duration-300"
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
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="md:pl-48 pl-0">{children}</main>
        <InteractiveAI />

        {/* Overlay for mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="md:hidden fixed inset-0 bg-black/50 z-30"
          />
        )}
      </div>
    </>
  )
}