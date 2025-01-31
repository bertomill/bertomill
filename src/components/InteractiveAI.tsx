import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return

    const userMessage = message.trim()
    setMessage('')
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    
    setIsLoading(true)
    setIsTyping(true)
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
      setIsTyping(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9999] w-[400px]">
      <AnimatePresence>
        {isVisible && (
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
            className="relative"
          >
            {/* Messages Container */}
            <div className="flex flex-col gap-4 px-4">
              {/* Initial Message - Made Clickable */}
              <div 
                className="flex items-start gap-3 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setIsChatOpen(true)}
              >
                <div className="relative w-12 h-12 shrink-0">
                  <Image
                    src="/bmavatar.png"
                    alt="AI Assistant"
                    fill
                    className="object-contain rounded-full"
                    priority
                  />
                </div>
                <div className="bg-[#303030] px-4 py-2 rounded-2xl rounded-tl-sm">
                  <p className="text-white/90 text-base font-serif">
                    Hey! Ask me anything about Berto&apos;s work
                  </p>
                  {!isChatOpen && (
                    <p className="text-[#7aa2f7] text-sm mt-1 italic">
                      Click to start chatting →
                    </p>
                  )}
                </div>
              </div>

              {/* Chat Messages */}
              <AnimatePresence>
                {isChatOpen && (
                  <div className="relative">
                    <div className="space-y-4 max-h-[40vh] overflow-y-auto p-2 rounded-xl bg-black/20 backdrop-blur-sm scrollbar-thin scrollbar-thumb-[#414868] scrollbar-track-transparent">
                      {messages.map((msg, index) => (
                        <motion.div 
                          key={index}
                          className={`flex items-start gap-3 ${
                            msg.role === 'user' ? 'justify-end' : ''
                          }`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {msg.role === 'assistant' && (
                            <div className="relative w-12 h-12 shrink-0">
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
                            <p className="text-white/90 text-base font-serif">
                              {msg.content}
                            </p>
                          </div>
                        </motion.div>
                      ))}

                      {/* Typing Indicator */}
                      {isTyping && (
                        <motion.div 
                          className="flex items-start gap-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <div className="relative w-12 h-12 shrink-0">
                            <Image
                              src="/bmavatar.png"
                              alt="AI Assistant"
                              fill
                              className="object-contain rounded-full"
                              priority
                            />
                          </div>
                          <div className="bg-[#303030] px-4 py-2 rounded-2xl rounded-tl-sm">
                            <div className="flex gap-1">
                              <motion.div
                                className="w-2 h-2 bg-white/50 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                              />
                              <motion.div
                                className="w-2 h-2 bg-white/50 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                              />
                              <motion.div
                                className="w-2 h-2 bg-white/50 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                      <div ref={messagesEndRef} className="h-1" />
                    </div>

                    {/* Input Field - Positioned outside scroll container */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-2 mt-2 bg-[#1a1b26]/80 p-2 rounded-xl backdrop-blur-sm"
                    >
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 bg-[#303030] rounded-full px-4 py-2 text-base text-white/90 focus:outline-none focus:ring-2 focus:ring-[#0084ff]"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={isLoading}
                        className="bg-[#0084ff] text-white rounded-full p-2 hover:bg-[#0084ff]/80 transition-colors disabled:opacity-50"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
