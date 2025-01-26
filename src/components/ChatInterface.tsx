import { motion } from 'framer-motion'
import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'

export default function ChatInterface() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot', content: string, sources?: string[] }>>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: message }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      })

      const data = await response.json()
      
      if (!response.ok) throw new Error(data.error)

      // Add bot response
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: data.answer,
        sources: data.sources 
      }])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }])
    } finally {
      setIsLoading(false)
      setMessage('')
    }
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={false}
      animate={isChatOpen ? "open" : "closed"}
    >
      <motion.div
        variants={{
          open: { 
            width: "400px",
            height: "500px",
            transition: { type: "spring", stiffness: 300, damping: 30 }
          },
          closed: { 
            width: "auto",
            height: "auto",
            transition: { type: "spring", stiffness: 300, damping: 30 }
          }
        }}
        className="bg-stone-900 rounded-2xl shadow-lg border border-stone-800"
      >
        {isChatOpen ? (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-stone-800 flex justify-between items-center">
              <h3 className="text-lg font-medium">Ask me anything</h3>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1 hover:bg-stone-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((msg, i) => (
                <div key={i} className={`mb-4 ${msg.type === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-3 rounded-lg ${
                    msg.type === 'user' 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-stone-800 text-white'
                  }`}>
                    <p>{msg.content}</p>
                    {msg.sources && (
                      <div className="mt-2 text-sm text-stone-400">
                        Sources: {msg.sources.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-stone-800 text-white p-3 rounded-lg">
                    <span className="animate-pulse">Thinking...</span>
                  </div>
                </div>
              )}
            </div>
            <form onSubmit={handleChatSubmit} className="p-4 border-t border-stone-800">
              <div className="relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        ) : (
          <button
            onClick={() => setIsChatOpen(true)}
            className="p-4 hover:bg-stone-800 rounded-2xl transition-colors flex items-center gap-2"
          >
            <MessageCircle className="w-6 h-6 text-emerald-500" />
            <span>Chat with me</span>
          </button>
        )}
      </motion.div>
    </motion.div>
  )
} 