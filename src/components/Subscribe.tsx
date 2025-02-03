import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

export default function Subscribe() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error)

      setStatus('success')
      setMessage('Thanks for subscribing! 🎉')
      setEmail('')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  return (
    <div id="subscribe-section" className="w-full max-w-md mx-auto">
      <div className="bg-[#1a1b26] p-6 rounded-xl border border-[#414868]/30">
        <h3 className="text-xl font-medium text-[#7aa2f7] mb-2">
          Stay Updated
        </h3>
        <p className="text-sm text-[#a9b1d6] mb-4">
          Subscribe to get notified about new tutorials, applications, and articles.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-[#24283b] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7aa2f7]"
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#7aa2f7] text-white p-1.5 rounded-md hover:bg-[#7aa2f7]/80 transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {message && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-sm ${
                status === 'success' ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {message}
            </motion.p>
          )}
        </form>
      </div>
    </div>
  )
} 