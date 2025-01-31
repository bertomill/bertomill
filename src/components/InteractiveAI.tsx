import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { X } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  sources?: string[]
  suggestions?: string[]
}

const serviceStatus = {
  openai: true,
  pinecone: true
}

export default function InteractiveAI() {
  const mountedRef = useRef(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const latestMessageRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const initialSuggestions = [
    "Tell me about your projects",
    "What's your background?",
    "What technologies do you use?",
    "Tell me about your education"
  ]

  useEffect(() => {
    if (mountedRef.current) return
    mountedRef.current = true

    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [router.pathname])

  const scrollToLatestMessage = () => {
    if (latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  useEffect(() => {
    scrollToLatestMessage()
  }, [messages])

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return

    const userMessage = message.trim()
    setMessage('')
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    
    setIsLoading(true)
    setIsTyping(true)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }]
        }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.message,
        sources: data.sources,
        suggestions: data.suggestions
      }])

      // Update service status on successful response
      serviceStatus.openai = true
      serviceStatus.pinecone = true

    } catch (error) {
      console.error('Chat API Error:', error)
      
      // Update service status on error
      serviceStatus.openai = false
      serviceStatus.pinecone = false

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: error.name === 'AbortError' 
          ? "I apologize, but the request timed out. This might be because:\n\n" +
            "1. The server is experiencing high load\n" +
            "2. The connection is unstable\n" +
            "3. The service is temporarily unavailable\n\n" +
            "Please try again in a moment."
          : "I apologize, but I'm having trouble connecting to the server right now. Please try again in a moment.",
        suggestions: ["Try again", "What else can you tell me?"]
      }])
    } finally {
      setIsLoading(false)
      setIsTyping(false)
    }
  }

  // Also add a useEffect to check API health on mount
  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        const response = await fetch('/api/health')
        if (!response.ok) {
          throw new Error('API health check failed')
        }
        const data = await response.json()
        serviceStatus.openai = data.openai
        serviceStatus.pinecone = data.pinecone
      } catch (error) {
        console.error('API Health Check Error:', error)
        serviceStatus.openai = false
        serviceStatus.pinecone = false
      }
    }

    checkApiHealth()
  }, [])

  return (
    <div className="fixed bottom-10 right-6 z-[9999] w-[90vw] md:w-[400px]">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut"
              }
            }}
            className="relative"
          >
            {/* Chat Toggle Button */}
            <div 
              className="flex items-start gap-2 md:gap-3 cursor-pointer relative group"
              onClick={() => setIsChatOpen(!isChatOpen)}
            >
              {/* Avatar with enhanced styling */}
              <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#7aa2f7]/20 to-[#bb9af7]/20 rounded-full blur-lg" />
                <Image
                  src="/bmavatar.png"
                  alt="AI Assistant"
                  fill
                  className="object-contain rounded-full relative z-10"
                  priority
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-gradient-to-tr from-[#7aa2f7] to-[#bb9af7] rounded-full flex items-center justify-center ring-2 ring-[#1a1b26] z-20">
                  <span className="text-[8px] md:text-[10px] font-bold text-[#1a1b26]">
                    AI
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {/* Service Status Bar - Now above message */}
                <div className="flex items-center gap-2 px-2">
                  {/* OpenAI Status */}
                  <div className="relative w-5 h-5">
                    <div className="absolute inset-0">
                      <svg className="w-full h-full" viewBox="0 0 24 24">
                        {/* Background circle - increase strokeWidth */}
                        <circle
                          className="text-[#414868]/20"
                          strokeWidth="3"
                          stroke="currentColor"
                          fill="none"
                          r="10"
                          cx="12"
                          cy="12"
                        />
                        {/* Animated circle - increase strokeWidth */}
                        <circle
                          className="text-[#414868]"
                          strokeWidth="3"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          r="10"
                          cx="12"
                          cy="12"
                          style={{
                            strokeDasharray: '63',
                            strokeDashoffset: '63',
                            transformOrigin: 'center',
                            transform: 'rotate(-90deg)',
                            animation: serviceStatus.openai ? 'loadCircle 2s ease-out forwards' : 'none'
                          }}
                        />
                      </svg>
                      <div className="absolute inset-[2px] rounded-full overflow-hidden">
                        <Image
                          src="/openai.png"
                          alt="OpenAI"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pinecone Status */}
                  <div className="relative w-5 h-5">
                    <div className="absolute inset-0">
                      <svg className="w-full h-full" viewBox="0 0 24 24">
                        {/* Background circle - increase strokeWidth */}
                        <circle
                          className="text-[#414868]/20"
                          strokeWidth="3"
                          stroke="currentColor"
                          fill="none"
                          r="10"
                          cx="12"
                          cy="12"
                        />
                        {/* Animated circle - increase strokeWidth */}
                        <circle
                          className="text-[#414868]"
                          strokeWidth="3"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          r="10"
                          cx="12"
                          cy="12"
                          style={{
                            strokeDasharray: '63',
                            strokeDashoffset: '63',
                            transformOrigin: 'center',
                            transform: 'rotate(-90deg)',
                            animation: serviceStatus.pinecone ? 'loadCircle 2s ease-out forwards' : 'none',
                            animationDelay: '0.8s'
                          }}
                        />
                      </svg>
                      <div className="absolute inset-[2px] rounded-full overflow-hidden">
                        <Image
                          src="/pinecone.png"
                          alt="Pinecone"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message bubble with enhanced styling */}
                <div className="bg-gradient-to-r from-[#1a1b26]/95 to-[#24283b]/95 backdrop-blur-md px-4 py-2.5 rounded-2xl rounded-tl-sm shadow-lg border border-white/5 group-hover:border-[#7aa2f7]/20 transition-all duration-300">
                  <p className="text-white/90 text-sm md:text-base font-serif">
                    Hey! Ask me anything about Berto&apos;s work
                  </p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            {isChatOpen && (
              <div className="relative mt-3">
                {/* Add Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsChatOpen(false)
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-[#414868] rounded-full flex items-center justify-center hover:bg-[#414868]/80 transition-colors shadow-md z-10"
                >
                  <X className="w-3 h-3 text-white" />
                </button>

                <div className="space-y-3 max-h-[60vh] md:max-h-[50vh] overflow-y-auto p-3 rounded-2xl bg-[#1a1b26]/95 backdrop-blur-sm shadow-lg">
                  {/* Show initial suggestions if no messages yet */}
                  {messages.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-wrap gap-2 p-2"
                    >
                      {initialSuggestions.map((suggestion, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setMessage(suggestion)
                            handleSendMessage()
                          }}
                          className="text-xs px-3 py-1.5 rounded-full bg-[#414868] text-[#7aa2f7] hover:bg-[#414868]/80 transition-colors shadow-sm whitespace-nowrap"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </motion.div>
                  )}

                  {messages.map((msg, index) => (
                    <motion.div 
                      key={index}
                      ref={index === messages.length - 1 ? latestMessageRef : null}
                      className={`flex items-start gap-2 ${
                        msg.role === 'user' ? 'justify-end' : ''
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {msg.role === 'assistant' && (
                        <div className="relative w-8 h-8 md:w-10 md:h-10 shrink-0">
                          <Image
                            src="/bmavatar.png"
                            alt="AI Assistant"
                            fill
                            className="object-contain rounded-full"
                            priority
                          />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-[#7aa2f7] rounded-full flex items-center justify-center ring-2 ring-[#1a1b26]">
                            <span className="text-[6px] md:text-[8px] font-bold text-[#1a1b26]">
                              AI
                            </span>
                          </div>
                        </div>
                      )}
                      <div className={`max-w-[85%] ${
                        msg.role === 'assistant' 
                          ? 'bg-[#24283b] rounded-2xl rounded-tl-sm' 
                          : 'bg-[#7aa2f7] rounded-2xl rounded-tr-sm'
                      } px-4 py-2.5 shadow-md`}>
                        {msg.role === 'assistant' && msg.sources && msg.sources.length > 0 && (
                          <div className="mb-1.5 text-[10px] text-[#7aa2f7] italic">
                            Sources: {msg.sources.map(source => source.replace(/\.[^/.]+$/, '')).join(', ')}
                          </div>
                        )}
                        <p className="text-white/90 text-sm font-serif">
                          {msg.content}
                        </p>
                        
                        {msg.role === 'assistant' && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {(msg.suggestions || [
                              "Tell me more about that",
                              "What else can you share?",
                              "How does that work?",
                              "Any examples?"
                            ]).map((suggestion, i) => (
                              <button
                                key={i}
                                onClick={() => {
                                  setMessage(suggestion)
                                  handleSendMessage()
                                }}
                                className="text-xs px-3 py-1.5 rounded-full bg-[#414868] text-[#7aa2f7] hover:bg-[#414868]/80 transition-colors shadow-sm whitespace-nowrap"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div 
                      className="flex items-start gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="relative w-8 h-8 md:w-10 md:h-10 shrink-0">
                        <Image
                          src="/bmavatar.png"
                          alt="AI Assistant"
                          fill
                          className="object-contain rounded-full"
                          priority
                        />
                      </div>
                      <div className="bg-[#24283b] px-4 py-2.5 rounded-2xl rounded-tl-sm shadow-md">
                        <div className="flex gap-1">
                          <motion.div
                            className="w-1.5 h-1.5 bg-white/50 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                          <motion.div
                            className="w-1.5 h-1.5 bg-white/50 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-1.5 h-1.5 bg-white/50 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Input Field */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 mt-2 bg-[#1a1b26]/95 p-2 rounded-xl backdrop-blur-sm shadow-lg"
                >
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 bg-[#24283b] rounded-full px-4 py-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-[#7aa2f7] shadow-inner"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading}
                    className="bg-[#7aa2f7] text-white rounded-full p-2 hover:bg-[#7aa2f7]/80 transition-colors disabled:opacity-50 shadow-md"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
