import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, X, Bell, Loader2 } from 'lucide-react'

interface SubscribeProps {
  onClose?: () => void
}

export default function Subscribe({ onClose }: SubscribeProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

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
      
      if (onClose) {
        setTimeout(onClose, 2000)
      }
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-gradient-to-b from-[#1a1b26] to-[#1a1b26]/95 backdrop-blur-xl p-8 rounded-2xl border border-[#414868]/30 relative shadow-2xl"
    >
      {/* Close button */}
      {onClose && (
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#a9b1d6] hover:text-[#7aa2f7] hover:bg-[#414868]/10 transition-all duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="w-5 h-5" />
        </motion.button>
      )}

      {/* Icon and Title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-[#7aa2f7]/10 text-[#7aa2f7]">
          <Bell className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-medium text-[#c0caf5]">
            Stay Updated
          </h3>
          <p className="text-sm text-[#a9b1d6]">
            Get notified about new content and features
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full bg-[#24283b]/50 text-[#c0caf5] rounded-xl px-4 py-3 pr-12
                     border border-[#414868]/30 focus:border-[#7aa2f7]/50
                     placeholder:text-[#a9b1d6]/50
                     focus:outline-none focus:ring-2 focus:ring-[#7aa2f7]/20
                     transition-all duration-200"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="absolute right-2 top-1/2 -translate-y-1/2 
                     p-2 rounded-lg bg-[#7aa2f7] text-white
                     hover:bg-[#7aa2f7]/90 
                     disabled:opacity-50 disabled:hover:bg-[#7aa2f7]
                     transition-all duration-200
                     group-hover:translate-x-0.5"
          >
            {status === 'loading' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`rounded-lg p-3 text-sm ${
                status === 'success' 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  )
} 