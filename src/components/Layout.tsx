import { ReactNode } from 'react'
import Link from 'next/link'
import { Sun, Moon, Gamepad } from 'lucide-react'
import { useTheme } from 'next-themes'
import ChatInterface from './ChatInterface'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-950 dark:text-stone-50">
      <nav className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-stone-900/10 dark:border-stone-50/[0.06] bg-white/75 dark:bg-stone-950/75 supports-backdrop-blur:bg-white/60">
        <div className="max-w-7xl mx-auto">
          <div className="p-4 flex items-center justify-between">
            <Link href="/" className="text-lg font-medium">
              Berto Mill
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/blog" className="text-stone-400 hover:text-white transition-colors">
                Blog
              </Link>
              <Link href="/projects" className="text-stone-400 hover:text-white transition-colors">
                Projects
              </Link>
              <Link href="/scrabble" className="flex items-center gap-1 text-stone-400 hover:text-white transition-colors">
                <Gamepad className="w-4 h-4" />
                Play Scrabble
              </Link>
              <Link href="/about" className="text-stone-400 hover:text-white transition-colors">
                About
              </Link>
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
          </div>
        </div>
      </nav>
      <main>{children}</main>
      <ChatInterface />
    </div>
  )
}