import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X } from 'lucide-react'

export default function ConsultingSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const images = [
    { src: "/consulting-1.JPG", alt: "CIBC Team Photo" },
    { src: "/consulting-2.JPG", alt: "Presentation" },
    { src: "/consulting-3.JPG", alt: "Team at Podium" },
    { src: "/consulting-4.JPG", alt: "Speaking Event" }
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
          Consulting
        </motion.h2>

        <p className="text-[#a9b1d6] leading-relaxed text-sm md:text-base max-w-3xl mb-8">
          Working as a consultant has been an incredible journey! I love helping organizations embrace 
          new technologies and find innovative solutions. It&apos;s amazing to see how combining technical 
          expertise with strategic thinking can create real impact.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.2 }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setSelectedImage(image.src)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          ))}
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
