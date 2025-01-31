import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX, HiCheck } from 'react-icons/hi'
import { useRouter } from 'next/router'
import Image from 'next/image'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function InteractiveAI() {
  const [isVisible, setIsVisible] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your AI assistant. I can help you learn more about Berto's work, projects, and experience. What would you like to know?"
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [loadingStates, setLoadingStates] = useState({
    pinecone: false,
    openai: false
  })
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    setIsVisible(true)
  }, [router.pathname])

  // Handle loading states when chat opens
  useEffect(() => {
    if (isChatOpen) {
      // Slower Pinecone loading
      setTimeout(() => {
        setLoadingStates(prev => ({ ...prev, pinecone: true }))
      }, 2000)
      
      // Slower OpenAI loading
      setTimeout(() => {
        setLoadingStates(prev => ({ ...prev, openai: true }))
      }, 3500)
    }
  }, [isChatOpen])

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return

    const userMessage = message.trim()
    setMessage('')
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    
    setIsLoading(true)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }]
        }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()
      
      // Add AI response to chat
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment." 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="absolute bottom-0 left-0 z-[100]">
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Animated Avatar Container */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                transition: {
                  type: "spring",
                  duration: 1.2,
                  bounce: 0.4
                }
              }}
              className="relative cursor-pointer"
              onClick={() => setIsChatOpen(true)}
            >
              {/* Initial Message with Avatar */}
              <div className="flex items-start gap-3">
                <div className="relative w-12 h-12">
                  <motion.div 
                    className="relative w-full h-full rounded-full overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src="/bmavatar.png"
                      alt="AI Assistant"
                      fill
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </div>

                {/* Initial Message Bubble - iPhone Style */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="relative max-w-[80%]"
                >
                  <div className="bg-[#303030] px-4 py-2 rounded-2xl rounded-tl-sm">
                    <p className="text-white/90 text-sm">
                      Hey! Ask me anything about Berto&apos;s work
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Chat Messages - iPhone Style */}
              <AnimatePresence>
                {isChatOpen && (
                  <div className="mt-4 space-y-3">
                    {messages.map((msg, index) => (
                      <motion.div 
                        key={index}
                        className={`flex items-start gap-3 ${
                          msg.role === 'user' ? 'justify-end' : ''
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {msg.role === 'assistant' && (
                          <div className="relative w-12 h-12">
                            <Image
                              src="/bmavatar.png"
                              alt="AI Assistant"
                              fill
                              className="object-contain rounded-full"
                              priority
                            />
                          </div>
                        )}
                        
                        <div className={`max-w-[80%] ${
                          msg.role === 'assistant' 
                            ? 'bg-[#303030] rounded-2xl rounded-tl-sm' 
                            : 'bg-[#0084ff] rounded-2xl rounded-tr-sm'
                        } px-4 py-2`}>
                          <p className="text-white/90 text-sm">
                            {msg.content}
                          </p>
                        </div>
                      </motion.div>
                    ))}

                    {/* Message Input */}
                    <div className="mt-4 flex gap-2">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 bg-[#303030] rounded-full px-4 py-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-[#0084ff]"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={isLoading}
                        className="bg-[#0084ff] text-white rounded-full p-2 hover:bg-[#0084ff]/80 transition-colors"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
