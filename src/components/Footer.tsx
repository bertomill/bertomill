import Link from 'next/link'
import Image from 'next/image'
import { Github, Linkedin, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#1a1b26] border-t border-[#414868]/20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo/Brand */}
          <div className="text-center md:text-left">
            <Link href="/" className="text-xl font-light tracking-[0.2em] text-[#c0caf5]">
              BERTO MILL
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/bertomill"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a9b1d6] hover:text-[#7aa2f7] transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/bertomill"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a9b1d6] hover:text-[#7aa2f7] transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/mill_berto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a9b1d6] hover:text-[#7aa2f7] transition-colors duration-300"
              aria-label="X (formerly Twitter)"
            >
              <div className="w-5 h-5 relative">
                <Image 
                  src="/x_logo.svg"
                  alt="X Logo"
                  fill
                  className="object-contain opacity-80 hover:opacity-100"
                />
              </div>
            </a>
            <a
              href="https://www.youtube.com/@BertoVMill"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a9b1d6] hover:text-[#7aa2f7] transition-colors duration-300"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/bertomill/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a9b1d6] hover:text-[#7aa2f7] transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-[#a9b1d6] text-sm">
            © {new Date().getFullYear()} Berto Mill
          </div>
        </div>
      </div>
    </footer>
  )
} 