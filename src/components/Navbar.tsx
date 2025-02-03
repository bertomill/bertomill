import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Github, Linkedin, Instagram, Youtube, Twitter, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
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

      {/* Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
} 