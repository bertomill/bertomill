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
        className="md:hidden fixed top-4 left-4 z-50 text-[#a9b1d6] hover:text-[#7aa2f7] transition-colors duration-300 bg-[#030303]/80 p-2 rounded-lg backdrop-blur-sm"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Desktop Sidebar / Mobile Menu */}
      <nav className={`
        fixed top-0 left-0 h-screen w-[200px] bg-[#030303] border-r border-[#414868]/10 p-8 flex flex-col
        transform transition-transform duration-300 ease-in-out backdrop-blur-sm
        md:translate-x-0 relative
        ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
        z-40
      `}>
        <div className="film-scratches absolute inset-0 opacity-20" />
        <div className="film-grain absolute inset-0 opacity-10" />
        
        {/* Logo */}
        <Link 
          href="/" 
          className="retro-text text-xl tracking-[0.2em] text-[#c0caf5] mb-12 relative z-10"
          onClick={() => setIsOpen(false)}
        >
          BERTO<br />MILL
        </Link>

        {/* Navigation Links */}
        <div className="space-y-6 mb-12 relative z-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`
                retro-text block text-sm tracking-[0.15em]
                ${isActive(link.href) 
                  ? 'text-[#7aa2f7]' 
                  : 'text-[#a9b1d6] hover:text-[#7aa2f7]'
                } transition-colors duration-300
              `}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Subscribe Button */}
        <button
          onClick={() => {
            setShowSubscribe(true)
            setIsOpen(false)
          }}
          className="retro-text group flex items-center gap-2 text-sm text-[#a9b1d6] hover:text-[#7aa2f7] transition-colors duration-300 mb-12 relative z-10"
        >
          <Bell className="w-4 h-4" />
          SUBSCRIBE
        </button>

        {/* Social Links */}
        <div className="mt-auto space-y-4 relative z-10">
          {socialLinks.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[#a9b1d6] hover:text-[#7aa2f7] transition-colors duration-300"
                aria-label={link.label}
              >
                <Icon className="w-5 h-5" />
              </a>
            )
          })}
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