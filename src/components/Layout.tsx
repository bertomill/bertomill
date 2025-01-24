import Link from 'next/link'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [router.asPath])

  if (!mounted) {
    return null
  }

  const isActive = (path: string) => router.pathname === path

  return (
    <div className="min-h-screen bg-stone-950 text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-stone-900 bg-stone-950/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="text-lg font-medium hover:text-stone-400 transition-colors">
              Berto Mill
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link 
                href="/projects" 
                className={`text-sm ${isActive('/projects') ? 'text-white' : 'text-stone-400'} hover:text-white transition-colors`}
              >
                Projects
              </Link>
              <Link 
                href="/blog" 
                className={`text-sm ${isActive('/blog') ? 'text-white' : 'text-stone-400'} hover:text-white transition-colors`}
              >
                Blog
              </Link>
              <Link 
                href="/about" 
                className={`text-sm ${isActive('/about') ? 'text-white' : 'text-stone-400'} hover:text-white transition-colors`}
              >
                About
              </Link>
              <Link 
                href="/scrabble" 
                className={`text-sm ${isActive('/scrabble') ? 'text-white' : 'text-stone-400'} hover:text-white transition-colors`}
              >
                Play Scrabble
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-stone-400 hover:text-white transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-400 hover:text-white transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-16 left-0 right-0 border-b border-stone-900 bg-stone-950 transform transition-all duration-200 ${
            mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="px-4 py-6 space-y-6">
            <Link
              href="/projects"
              className={`block text-sm ${
                isActive('/projects') ? 'text-white' : 'text-stone-400'
              } hover:text-white transition-colors`}
            >
              Projects
            </Link>
            <Link
              href="/blog"
              className={`block text-sm ${
                isActive('/blog') ? 'text-white' : 'text-stone-400'
              } hover:text-white transition-colors`}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className={`block text-sm ${
                isActive('/about') ? 'text-white' : 'text-stone-400'
              } hover:text-white transition-colors`}
            >
              About
            </Link>
            <Link
              href="/scrabble"
              className={`block text-sm ${
                isActive('/scrabble') ? 'text-white' : 'text-stone-400'
              } hover:text-white transition-colors`}
            >
              Play Scrabble
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24">{children}</main>
    </div>
  )
}