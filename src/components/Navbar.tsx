import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Github, Linkedin, Instagram, Youtube, Twitter, Menu, X, Bell } from 'lucide-react'
import Subscribe from './Subscribe'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showSubscribe, setShowSubscribe] = useState(false)
  const router = useRouter()
  const isActive = (path: string) => router.pathname === path

  const navLinks = [
    { href: '/blog', label: 'BLOG' },
    { href: '/projects', label: 'PROJECTS' },
    { href: '/docs', label: 'DOCS' },
    { href: '/about', label: 'ABOUT' },
  ]

  const socialLinks = [
    { href: 'https://github.com/bertomill', icon: Github, label: 'GitHub' },
    { href: 'https://linkedin.com/in/bertomill', icon: Linkedin, label: 'LinkedIn' },
    { href: 'https://twitter.com/mill_berto', icon: Twitter, label: 'Twitter' },
    { href: 'https://youtube.com/@BertoVMill', icon: Youtube, label: 'YouTube' },
    { href: 'https://instagram.com/bertomill', icon: Instagram, label: 'Instagram' },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 text-[#a9b1d6] hover:text-[#7aa2f7] transition-colors duration-300"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Desktop Sidebar */}
      <nav className={`
        fixed top-0 left-0 h-screen w-[200px] bg-[#1a1b26] border-r border-[#414868]/20 p-8 flex flex-col
        transform transition-transform duration-300 ease-in-out
        md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <Link href="/" className="text-xl font-light tracking-[0.2em] text-[#c0caf5] mb-12">
          BERTO<br />MILL
        </Link>

        {/* Main Navigation */}
        <div className="flex flex-col space-y-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className={`${
                isActive(href)
                  ? 'text-[#7aa2f7]'
                  : 'text-[#a9b1d6] hover:text-[#7aa2f7]'
              } transition-colors duration-300 tracking-wider`}
            >
              {label}
            </Link>
          ))}

          {/* Subscribe Button - Now part of the navigation list */}
          <motion.button
            onClick={() => setShowSubscribe(true)}
            className="group flex items-center gap-2 text-[#a9b1d6] hover:text-[#7aa2f7] transition-all duration-300 tracking-wider"
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <Bell className="w-4 h-4" />
              <motion.div
                className="absolute -top-1 -right-1 w-2 h-2 bg-[#7aa2f7] rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.8, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            <span>SUBSCRIBE</span>
          </motion.button>
        </div>

        {/* Social Links */}
        <div className="mt-auto flex flex-col space-y-4">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a9b1d6] hover:text-[#7aa2f7] transition-colors duration-300"
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </nav>

      {/* Subscribe Modal */}
      <AnimatePresence>
        {showSubscribe && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSubscribe(false)}
          >
            <motion.div 
              className="w-full max-w-md"
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <Subscribe onClose={() => setShowSubscribe(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
} 