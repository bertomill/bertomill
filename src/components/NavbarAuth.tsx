import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { User } from '@supabase/supabase-js'

export default function NavbarAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active session and subscribe to auth changes
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
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