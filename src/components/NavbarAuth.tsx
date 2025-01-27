import { useEffect, useState } from 'react'
import Link from 'next/link'
import { User } from '@supabase/supabase-js'
import dynamic from 'next/dynamic'

// Client-side only component
const NavbarAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initSupabase = async () => {
      const { supabase } = await import('@/lib/supabase')
      
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null)
      })

      return () => subscription.unsubscribe()
    }

    initSupabase()
  }, [])

  const handleSignOut = async () => {
    const { supabase } = await import('@/lib/supabase')
    await supabase.auth.signOut()
  }

  if (loading) {
    return null // Don't show anything while loading
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <Link 
          href="/admin"
          className="text-stone-400 hover:text-white transition-colors"
        >
          Admin
        </Link>
        <button
          onClick={handleSignOut}
          className="text-stone-400 hover:text-white transition-colors"
        >
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <Link
      href="/login"
      className="text-stone-400 hover:text-white transition-colors"
    >
      Sign In
    </Link>
  )
}

// Export as a client-side only component
export default dynamic(() => Promise.resolve(NavbarAuth), {
  ssr: false
}) 