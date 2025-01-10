import Link from 'next/link'
import { useEffect, useState } from 'react'
import { 
  Sparkles, 
  Dumbbell, 
  BookOpen, 
  Clapperboard,
  Sun,
  Moon,
  Menu,
  Home,
  PenTool,
} from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200">
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar bg-stone-900/95 backdrop-blur fixed top-0 z-50 border-b border-stone-800">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost text-stone-300 hover:text-stone-100">
                <Menu className="w-6 h-6" />
              </label>
            </div> 
            <div className="flex-1 px-2 mx-2">
              <Link href="/" className="text-xl font-medium flex items-center gap-2 text-stone-100 hover:text-emerald-400 transition-colors">
                <Home className="w-6 h-6" />
                Berto Mill
              </Link>
            </div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal gap-2">
                <li>
                  <Link href="/projects" className="px-4 py-2 text-stone-300 hover:text-emerald-400 transition-colors flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/fitness" className="px-4 py-2 text-stone-300 hover:text-emerald-400 transition-colors flex items-center gap-2">
                    <Dumbbell className="w-5 h-5" />
                    Fitness
                  </Link>
                </li>
                <li>
                  <Link href="/books" className="px-4 py-2 text-stone-300 hover:text-emerald-400 transition-colors flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Books
                  </Link>
                </li>
                <li>
                  <Link href="/tv-shows" className="px-4 py-2 text-stone-300 hover:text-emerald-400 transition-colors flex items-center gap-2">
                    <Clapperboard className="w-5 h-5" />
                    TV Shows
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="px-4 py-2 text-stone-300 hover:text-emerald-400 transition-colors flex items-center gap-2">
                    <PenTool className="w-5 h-5" />
                    Tell Day Blog
                  </Link>
                </li>
              </ul>
            </div>
            <button 
              className="btn btn-ghost btn-circle text-stone-300 hover:text-emerald-400"
              onClick={toggleDarkMode}
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
          
          {/* Main content */}
          <main className="container mx-auto px-4 pt-24 pb-12">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-stone-800 bg-stone-900/50">
            <div className="container mx-auto py-8 px-4 text-center text-stone-400">
              <p>Built with ❤️ using Next.js, Tailwind CSS, and daisyUI</p>
            </div>
          </footer>
        </div> 

        {/* Sidebar content for mobile */}
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label> 
          <ul className="menu p-4 w-80 h-full bg-stone-900 border-r border-stone-800">
            <li className="mb-4">
              <Link href="/" className="text-xl font-medium flex items-center gap-2 text-stone-100 hover:text-emerald-400">
                <Home className="w-6 h-6" />
                Berto Mill
              </Link>
            </li>
            <li>
              <Link href="/projects" className="text-stone-300 hover:text-emerald-400 transition-colors flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Projects
              </Link>
            </li>
            <li>
              <Link href="/fitness" className="text-stone-300 hover:text-emerald-400 transition-colors flex items-center gap-2">
                <Dumbbell className="w-5 h-5" />
                Fitness
              </Link>
            </li>
            <li>
              <Link href="/books" className="text-stone-300 hover:text-emerald-400 transition-colors flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Books
              </Link>
            </li>
            <li>
              <Link href="/tv-shows" className="text-stone-300 hover:text-emerald-400 transition-colors flex items-center gap-2">
                <Clapperboard className="w-5 h-5" />
                TV Shows
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-stone-300 hover:text-emerald-400 transition-colors flex items-center gap-2">
                <PenTool className="w-5 h-5" />
                Tell Day Blog
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
} 