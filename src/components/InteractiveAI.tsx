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
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Animated Avatar Container */}
            <motion.div
              initial={{ x: 200, rotate: -10, scale: 0.8 }}
              animate={{ 
                x: 0, 
                rotate: 0, 
                scale: 1,
                transition: {
                  type: "spring",
                  duration: 1.2,
                  bounce: 0.4
                }
              }}
              whileHover={{ 
                y: -5,
                rotate: -5,
                transition: { duration: 0.2 }
              }}
              exit={{ x: 200, rotate: 10, scale: 0.8 }}
              className="relative cursor-pointer group"
              onClick={() => setIsChatOpen(true)}
            >
              {/* Speech Bubble */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -left-64 top-6 w-60 select-none"
              >
                <div className="relative">
                  {/* Background shapes */}
                  <div className="absolute inset-0 bg-[#4A5D41]/10 rounded-lg transform rotate-1" />
                  <div className="absolute inset-0 bg-white/5 rounded-lg transform -rotate-1" />
                  
                  {/* Main bubble */}
                  <div className="relative bg-[#8B9D7D] rounded-lg p-3 transform hover:scale-105 transition-transform">
                    <p className="text-sm font-light tracking-wide text-white/90">
                      Hey! Ask me anything about Berto&apos;s work
                    </p>
                    
                    {/* Custom arrow */}
                    <div className="absolute -right-6 top-1/2 transform -translate-y-1/2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path 
                          d="M0 0L20 12L0 24V0Z" 
                          fill="#8B9D7D"
                          className="drop-shadow-lg"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Avatar Container with Creative Shape */}
              <div className="relative w-24 h-24">
                {/* Background shapes */}
                <motion.div 
                  className="absolute inset-0 bg-[#4A5D41]/20 rounded-2xl"
                  animate={{ rotate: [6, 12, 6] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute inset-0 bg-white/10 rounded-2xl"
                  animate={{ rotate: [-3, 3, -3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Avatar Image */}
                <motion.div 
                  className="relative w-full h-full rounded-2xl overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src="/Berto_Avatar.png"
                    alt="AI Assistant"
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Chat Interface */}
            <AnimatePresence>
              {isChatOpen && (
                <motion.div
                  initial={{ opacity: 0, x: 20, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: 20, y: 20 }}
                  transition={{ type: "spring", damping: 20 }}
                  className="absolute bottom-full right-0 mb-4 w-96 bg-stone-900 rounded-xl shadow-2xl border border-[#8B9D7D]/20 overflow-hidden"
                >
                  {/* Chat Header */}
                  <motion.div 
                    className="flex items-center justify-between px-4 py-3 bg-[#4A5D41]/10 border-b border-[#8B9D7D]/20"
                    initial={{ backgroundColor: "rgba(74, 93, 65, 0)" }}
                    animate={{ backgroundColor: "rgba(74, 93, 65, 0.1)" }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-[#8B9D7D] font-light tracking-wide">Chat with Berto&apos;s AI Assistant</span>
                    <button
                      onClick={() => setIsChatOpen(false)}
                      className="text-[#8B9D7D]/70 hover:text-[#8B9D7D] transition-colors"
                    >
                      <HiX size={24} />
                    </button>
                  </motion.div>

                  {/* Service Loading Indicators */}
                  <div className="px-4 py-2 bg-[#1a1b26] border-b border-[#414868]/20">
                    <div className="flex items-center justify-center gap-6">
                      {/* Pinecone */}
                      <motion.div 
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="relative w-8 h-8">
                          <motion.div 
                            className={`absolute inset-0 rounded-full border-2 ${
                              loadingStates.pinecone ? 'border-green-400' : 'border-[#7aa2f7]'
                            }`}
                            initial={false}
                            animate={loadingStates.pinecone ? 
                              { borderColor: '#4ade80' } : 
                              { rotate: 360 }
                            }
                            transition={loadingStates.pinecone ? 
                              { duration: 0.3 } : 
                              { duration: 2, repeat: Infinity, ease: "linear" }
                            }
                          />
                          <div className="absolute inset-[2px] rounded-full overflow-hidden bg-[#1a1b26]">
                            <div className="absolute inset-1 rounded-full overflow-hidden">
                              <Image
                                src="/pinecone.png"
                                alt="Pinecone"
                                fill
                                className={`object-contain transition-opacity duration-300 rounded-full ${
                                  loadingStates.pinecone ? 'opacity-100' : 'opacity-50'
                                }`}
                              />
                            </div>
                          </div>
                          {loadingStates.pinecone && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute inset-0 flex items-center justify-center"
                            >
                              <HiCheck className="text-green-400 text-lg z-10" />
                            </motion.div>
                          )}
                        </div>
                        <span className="text-xs text-[#7aa2f7]">Pinecone</span>
                      </motion.div>

                      {/* OpenAI */}
                      <motion.div 
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="relative w-8 h-8">
                          <motion.div 
                            className={`absolute inset-0 rounded-full border-2 ${
                              loadingStates.openai ? 'border-green-400' : 'border-[#7aa2f7]'
                            }`}
                            initial={false}
                            animate={loadingStates.openai ? 
                              { borderColor: '#4ade80' } : 
                              { rotate: 360 }
                            }
                            transition={loadingStates.openai ? 
                              { duration: 0.3 } : 
                              { duration: 2, repeat: Infinity, ease: "linear" }
                            }
                          />
                          <div className="absolute inset-[2px] rounded-full overflow-hidden bg-[#1a1b26]">
                            <div className="absolute inset-1 rounded-full overflow-hidden">
                              <Image
                                src="/openai.png"
                                alt="OpenAI"
                                fill
                                className={`object-contain transition-opacity duration-300 rounded-full ${
                                  loadingStates.openai ? 'opacity-100' : 'opacity-50'
                                }`}
                              />
                            </div>
                          </div>
                          {loadingStates.openai && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute inset-0 flex items-center justify-center"
                            >
                              <HiCheck className="text-green-400 text-lg z-10" />
                            </motion.div>
                          )}
                        </div>
                        <span className="text-xs text-[#7aa2f7]">OpenAI</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="h-96 overflow-y-auto p-4">
                    <div className="space-y-4">
                      {messages.map((msg, index) => (
                        <motion.div 
                          key={index}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {msg.role === 'assistant' && (
                            <div className="relative w-8 h-8">
                              <motion.div 
                                className="absolute inset-0 bg-[#4A5D41]/20 rounded-lg"
                                animate={{ rotate: [6, 12, 6] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                              />
                              <motion.div 
                                className="absolute inset-0 bg-white/10 rounded-lg"
                                animate={{ rotate: [-3, 3, -3] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                              />
                              <div className="relative w-full h-full rounded-lg overflow-hidden">
                                <Image
                                  src="/Berto_Avatar.png"
                                  alt="AI Assistant"
                                  fill
                                  className="object-contain"
                                  priority
                                />
                              </div>
                            </div>
                          )}
                          
                          <div className={`flex-1 rounded-lg p-3 ${
                            msg.role === 'assistant' 
                              ? 'bg-[#4A5D41]/10 border border-[#8B9D7D]/20' 
                              : 'bg-[#8B9D7D]/20 ml-11'
                          }`}>
                            <p className="text-white/90 text-sm tracking-wide">
                              {msg.content}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                      
                      {isLoading && (
                        <motion.div 
                          className="flex items-start gap-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <div className="relative w-8 h-8">
                            <motion.div 
                              className="absolute inset-0 bg-[#4A5D41]/20 rounded-lg"
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                          </div>
                          <div className="flex-1 bg-[#4A5D41]/10 rounded-lg p-3 border border-[#8B9D7D]/20">
                            <p className="text-white/90 text-sm tracking-wide">
                              Thinking...
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Input Area */}
                  <motion.div 
                    className="p-4 border-t border-[#8B9D7D]/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                        placeholder="Type your message..."
                        className="flex-1 bg-[#4A5D41]/10 text-white placeholder-white/50 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B9D7D]/50"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={isLoading}
                        className={`px-4 py-2 bg-[#8B9D7D] text-white rounded-lg transition-colors font-light tracking-wide ${
                          isLoading 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:bg-[#4A5D41]'
                        }`}
                      >
                        Send
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
