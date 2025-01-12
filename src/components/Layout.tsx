import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Sun, Moon, User } from 'lucide-react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface ExtendedSession {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
    isAdmin?: boolean
  }
  expires: string
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-stone-800 bg-stone-950/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-lg font-medium">
                Berto Mill
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link
                  href="/projects"
                  className="text-sm text-stone-400 hover:text-stone-100 transition-colors"
                >
                  Projects
                </Link>
                <Link
                  href="/blog"
                  className="text-sm text-stone-400 hover:text-stone-100 transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="/about"
                  className="text-sm text-stone-400 hover:text-stone-100 transition-colors"
                >
                  About
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 hover:bg-stone-800/50 rounded-lg transition-colors"
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
        </div>
      </nav>
      <main className="pt-24">{children}</main>
    </div>
  )
} 