import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX } from 'react-icons/hi'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function InteractiveAI() {
  const [isVisible, setIsVisible] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Show the avatar after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Reset visibility when route changes
  useEffect(() => {
    setIsVisible(true)
  }, [router.pathname])

  return (
    <div className="fixed bottom-8 right-8 z-50 pointer-events-none">
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
              className="relative cursor-pointer pointer-events-auto group"
              onClick={() => setIsChatOpen(true)}
            >
              {/* Speech Bubble */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -left-64 top-6 w-60"
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
                  className="absolute bottom-full right-0 mb-4 w-96 bg-stone-900 rounded-xl shadow-2xl border border-[#8B9D7D]/20 overflow-hidden pointer-events-auto"
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

                  {/* Chat Messages */}
                  <div className="h-96 overflow-y-auto p-4">
                    <div className="space-y-4">
                      <motion.div 
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {/* Avatar in chat with creative shape */}
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
                        
                        <div className="flex-1 bg-[#4A5D41]/10 rounded-lg p-3 border border-[#8B9D7D]/20">
                          <p className="text-white/90 text-sm tracking-wide">
                            Hi! I&apos;m your AI assistant. I can help you learn more about Berto&apos;s work, projects, and experience.
                            What would you like to know?
                          </p>
                        </div>
                      </motion.div>
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
                        placeholder="Type your message..."
                        className="flex-1 bg-[#4A5D41]/10 text-white placeholder-white/50 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B9D7D]/50"
                      />
                      <button
                        onClick={() => {
                          // Handle message send
                          setMessage('')
                        }}
                        className="px-4 py-2 bg-[#8B9D7D] text-white rounded-lg hover:bg-[#4A5D41] transition-colors font-light tracking-wide"
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
