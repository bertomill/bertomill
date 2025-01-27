import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabase'
import Layout from '@/components/Layout'

export default function Admin() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.replace('/login')
      } else {
        setLoading(false)
      }
    }
    checkUser()
  // Intentionally omitting router from deps to prevent redirect loops
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="animate-pulse text-lg text-stone-400">
            Loading...
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Blog Posts</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your blog posts here.
            </p>
            {/* Add blog management UI here */}
          </div>
        </div>
      </div>
    </Layout>
  )
} 