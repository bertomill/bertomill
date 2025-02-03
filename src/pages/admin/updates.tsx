import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Layout from '@/components/Layout'

export default function UpdatesAdmin() {
  const { data: session } = useSession()
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/admin/send-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, content })
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error)

      setStatus('success')
      setMessage('Update sent successfully!')
      setSubject('')
      setContent('')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Failed to send update')
    }
  }

  if (!session) {
    return <div>Not authorized</div>
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-medium mb-6">Send Update to Subscribers</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-[#24283b] rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Content (HTML)</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="w-full bg-[#24283b] rounded-lg px-4 py-2"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-[#7aa2f7] text-white px-4 py-2 rounded-lg"
          >
            Send Update
          </button>

          {message && (
            <p className={status === 'success' ? 'text-green-500' : 'text-red-500'}>
              {message}
            </p>
          )}
        </form>
      </div>
    </Layout>
  )
} 