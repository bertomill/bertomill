import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import dynamic from 'next/dynamic'

const Auth = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { supabase } = await import('@/lib/supabase')
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.session) {
        router.push('/admin/newsletter')
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  // Don't render anything on the server side
  if (!mounted) return null

  return (
    <Layout title="Admin Login | Berto Mill">
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-md p-8 mx-4 bg-[#141414] rounded-xl shadow-2xl border border-[#1f1f1f]">
          <h2 className="mb-6 text-2xl font-bold text-center text-[#e4e4e7]">
            Admin Login
          </h2>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#a1a1aa]">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 mt-1 text-sm bg-[#1f1f1f] border border-[#2f2f2f] rounded-md text-[#e4e4e7] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#a1a1aa]">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 mt-1 text-sm bg-[#1f1f1f] border border-[#2f2f2f] rounded-md text-[#e4e4e7] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 text-sm text-red-400 rounded-lg bg-red-400/10">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

// Export as a client-side only component
export default dynamic(() => Promise.resolve(Auth), {
  ssr: false
})