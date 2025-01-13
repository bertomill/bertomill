import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'

interface BookForm {
  title: string
  author: string
  description: string
}

interface ExtendedSession {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
    isAdmin?: boolean
  }
}

export default function AdminBooks() {
  const router = useRouter()
  const { data: session, status } = useSession() as { data: ExtendedSession | null, status: string }
  const [form, setForm] = useState<BookForm>({
    title: '',
    author: '',
    description: ''
  })

  useEffect(() => {
    if (status === 'loading') return

    if (!session?.user?.isAdmin) {
      router.push('/')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <p>Loading...</p>
        </div>
      </Layout>
    )
  }

  if (!session?.user?.isAdmin) {
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      if (response.ok) {
        setForm({
          title: '',
          author: '',
          description: ''
        })
        alert('Book added successfully!')
      } else {
        throw new Error('Failed to add book')
      }
    } catch (error) {
      console.error('Error adding book:', error)
      alert('Failed to add book. Please try again.')
    }
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Add New Book</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-2 rounded-lg bg-stone-900 border border-stone-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-medium mb-2">
              Author
            </label>
            <input
              type="text"
              id="author"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              className="w-full p-2 rounded-lg bg-stone-900 border border-stone-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              className="w-full p-2 rounded-lg bg-stone-900 border border-stone-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Add Book
          </button>
        </form>
      </div>
    </Layout>
  )
} 