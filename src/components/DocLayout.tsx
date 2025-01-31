import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, ChevronDown } from 'lucide-react'

interface DocSection {
  title: string
  slug: string
  items?: DocSection[]
}

interface DocLayoutProps {
  children: React.ReactNode
  sections: DocSection[]
  currentDoc: string
}

export default function DocLayout({ children, sections, currentDoc }: DocLayoutProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const toggleSection = (slug: string) => {
    setExpandedSections(prev => 
      prev.includes(slug) 
        ? prev.filter(s => s !== slug)
        : [...prev, slug]
    )
  }

  const renderSection = (section: DocSection, depth = 0) => {
    const isExpanded = expandedSections.includes(section.slug)
    const isActive = currentDoc === section.slug
    
    return (
      <div key={section.slug} className="w-full">
        <div 
          className={`flex items-center gap-2 px-4 py-2 hover:bg-[#1a1b26] rounded-lg cursor-pointer ${
            isActive ? 'text-[#7aa2f7]' : 'text-[#a9b1d6]'
          }`}
          style={{ paddingLeft: `${depth * 1.5 + 1}rem` }}
          onClick={() => section.items ? toggleSection(section.slug) : null}
        >
          {section.items && (
            <div className="w-4 h-4 flex items-center justify-center">
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
          )}
          <Link href={`/docs/${section.slug}`} className="flex-1">
            {section.title}
          </Link>
        </div>
        
        {section.items && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {section.items.map(item => renderSection(item, depth + 1))}
          </motion.div>
        )}
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      {/* Documentation Sidebar */}
      <div className="w-64 border-r border-[#414868]/30 p-4 space-y-2 overflow-y-auto">
        {sections.map(section => renderSection(section))}
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-4xl mx-auto px-8 py-12">
        {children}
      </div>
    </div>
  )
} 