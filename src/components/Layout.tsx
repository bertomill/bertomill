import { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X, Github, Linkedin, Instagram, Youtube } from 'lucide-react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Head from 'next/head'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const router = useRouter()

  useEffect(() => {
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
        <link 
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap" 
          rel="stylesheet"
        />
      </Head>
      <div className="min-h-screen bg-[#1a1b26] text-[#c0caf5] font-serif">
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
                    href="/about"
                    className={`transition-colors duration-300 ${
                      router.pathname.startsWith('/about')
                        ? 'text-[#7aa2f7]'
                        : 'text-[#a9b1d6] hover:text-[#7aa2f7]'
                    }`}
                  >
                    ABOUT
                  </Link>
                </div>

                <div className="mt-auto px-6 pb-8">
                  {/* Social Links */}
                  <div className="flex items-center justify-start gap-4 flex-wrap">
                    <a
                      href="https://github.com/bertomill"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#a9b1d6] hover:text-[#7aa2f7] transition-colors duration-300"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href="https://linkedin.com/in/bertomill"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#a9b1d6] hover:text-[#7aa2f7] transition-colors duration-300"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="https://x.com/mill_berto"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#a9b1d6] hover:text-[#7aa2f7] transition-colors duration-300 block"
                      aria-label="X (formerly Twitter)"
                    >
                      <div className="w-5 h-5 relative">
                        <Image 
                          src="/x_logo.svg"
                          alt="X Logo"
                          fill
                          className="object-contain [&>*]:fill-current opacity-80 hover:opacity-100"
                        />
                      </div>
                    </a>
                    <a
                      href="https://www.youtube.com/@BertoVMill"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#a9b1d6] hover:text-[#7aa2f7] transition-colors duration-300"
                      aria-label="YouTube"
                    >
                      <Youtube className="w-5 h-5" />
                    </a>
                    <a
                      href="https://www.instagram.com/bertomill/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#a9b1d6] hover:text-[#7aa2f7] transition-colors duration-300"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="https://www.tiktok.com/@berto.mill"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#a9b1d6] hover:text-[#7aa2f7] transition-colors duration-300"
                      aria-label="TikTok"
                    >
                      <svg 
                        className="w-5 h-5" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="md:pl-48 pl-0">{children}</main>

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