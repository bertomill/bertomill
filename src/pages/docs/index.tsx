import { useEffect, useState } from 'react'
import DocsLayout from '@/components/DocsLayout'
import Subscribe from '@/components/Subscribe'
import { motion } from 'framer-motion'

interface Doc {
  text: string
  source: string
  category: string
  id: string
}

interface GroupedDocs {
  [key: string]: Doc[]
}

export default function DocsPage() {
  const [docs, setDocs] = useState<GroupedDocs>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const response = await fetch('/api/docs')
        if (!response.ok) throw new Error('Failed to fetch docs')
        const data = await response.json()
        setDocs(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load docs')
      } finally {
        setLoading(false)
      }
    }

    fetchDocs()
  }, [])

  useEffect(() => {
    // After docs are loaded, check for hash and scroll
    if (!loading && window.location.hash) {
      const id = window.location.hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
          // Optional: Add highlight effect
          element.classList.add('ring-2', 'ring-[#7aa2f7]')
          setTimeout(() => {
            element.classList.remove('ring-2', 'ring-[#7aa2f7]')
          }, 2000)
        }, 100)
      }
    }
  }, [loading, docs])

  return (
    <DocsLayout>
      {loading ? (
        <div className="text-[#a9b1d6]">Loading documentation...</div>
      ) : error ? (
        <div className="text-red-400">{error}</div>
      ) : (
        <div className="space-y-12">
          {Object.entries(docs).map(([category, documents]) => (
            <section key={category} className="space-y-6">
              <h2 className="text-2xl text-[#bb9af7] mb-6">{category}</h2>
              <div className="space-y-4">
                {documents.map((doc, index) => (
                  <motion.div
                    key={index}
                    id={doc.source}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#1a1b26] p-6 rounded-lg border border-[#414868]/30"
                  >
                    <div className="text-[#a9b1d6] leading-relaxed">
                      {doc.text}
                    </div>
                    <div className="mt-4 text-sm text-[#7aa2f7]">
                      Source: {doc.source}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <section className="py-20">
        <Subscribe />
      </section>
    </DocsLayout>
  )
}