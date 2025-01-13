import Link from 'next/link'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-stone-950 text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-stone-800 bg-stone-950/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-lg font-medium">
              Berto Mill
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/fintech-radar" className="text-stone-400 hover:text-white transition-colors">
                Fintech Radar
              </Link>
              <Link href="/blog" className="text-stone-400 hover:text-white transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-stone-400 hover:text-white transition-colors">
                About
              </Link>
            </div>
          </div>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 hover:bg-stone-800 rounded-lg transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      <main className="pt-24">{children}</main>
    </div>
  )
} 