import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X } from 'lucide-react'

export default function StartupSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const startupImages = [
    { src: '/startup-1.jpg', alt: "Startup Team Meeting" },
    { src: '/startup-2.jpg', alt: "Product Development" },
    { src: '/startup-3.jpg', alt: "Team Collaboration" },
    { src: '/startup-4.jpg', alt: "Startup Event" }
  ]

  return (
    <section className="relative bg-[#16161e] py-12">
      <div className="max-w-[90%] mx-auto">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-xl md:text-3xl tracking-[0.2em] uppercase mb-8 text-[#bb9af7]"
        >
          Startups
        </motion.h2>

        <div className="space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[#a9b1d6] leading-relaxed text-sm md:text-base max-w-3xl"
          >
            Nothing energizes me more than building something new with my friends! The startup journey is 
            where innovation meets passion, and every day brings the thrill of creating solutions that could 
            change how we work and live.
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {startupImages.map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => setSelectedImage(image.src)}
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-opacity duration-300" />
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Image Popup */}
        <AnimatePresence>
          {selectedImage && (
            <div 
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <div 
                className="relative max-w-4xl w-full aspect-[4/3]"
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-4 -right-4 z-10 p-2 bg-[#414868] rounded-full hover:bg-[#414868]/80 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
                <Image
                  src={selectedImage}
                  alt="Enlarged view"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
