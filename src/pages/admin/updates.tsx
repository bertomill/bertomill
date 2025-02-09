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
      <div className="min-h-screen bg-[#0c0c0c] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="retro-text grainy text-xl md:text-3xl tracking-[0.2em] uppercase mb-8 text-[#94a3b8]">
            Send Update to Subscribers
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-[#0a0a0a]/50 rounded-lg p-6 grainy">
              <div className="space-y-4">
                <div>
                  <label className="block text-[#94a3b8] text-sm mb-2 tracking-wide">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#161616] border border-[#2d2d2d] rounded-md px-4 py-2 text-[#e4e4e7] focus:outline-none focus:ring-2 focus:ring-[#94a3b8] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-[#94a3b8] text-sm mb-2 tracking-wide">Content</label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={6}
                    className="w-full bg-[#161616] border border-[#2d2d2d] rounded-md px-4 py-2 text-[#e4e4e7] focus:outline-none focus:ring-2 focus:ring-[#94a3b8] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-2 bg-[#94a3b8] text-[#0a0a0a] rounded-md hover:bg-[#cbd5e1] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Update'}
                </button>
              </div>

              {message && (
                <div className={`mt-4 p-4 rounded-md ${status === 'success' ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'}`}>
                  {message}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
} 