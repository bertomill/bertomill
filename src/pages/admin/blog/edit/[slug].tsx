import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../../../components/Layout'
import { Save } from 'lucide-react'

export default function EditPost() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { slug } = router.query
  const [content, setContent] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    if (slug) {
      fetch(`/api/blog/${slug}`)
        .then(res => res.json())
        .then(data => setContent(data.content))
        .catch(console.error)
    }
  }, [slug])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const res = await fetch(`/api/blog/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      })
      
      if (res.ok) {
        router.push('/admin/blog')
      } else {
        console.error('Failed to save post')
      }
    } catch (error) {
      console.error('Error saving post:', error)
    }
    setIsSaving(false)
  }

  if (status === 'loading') {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-emerald-500"></div>
        </div>
      </Layout>
    )
  }

  if (!session) {
    return null
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Edit Post</h1>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>

        <div className="bg-white dark:bg-stone-800 rounded-lg shadow-sm p-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-[60vh] p-4 bg-transparent focus:outline-none resize-none font-mono"
            placeholder="Write your post in MDX..."
          />
        </div>
      </div>
    </Layout>
  )
} 