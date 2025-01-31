import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

export default function ConsultingSection() {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null)

  const consultingImages = [
    '/consulting-1.JPG',
    '/consulting-2.JPG',
    '/consulting-3.JPG',
    '/consulting-4.JPG'
  ]

  return (
    <section className="relative bg-[#16161e] py-32">
      <div className="max-w-[90%] mx-auto">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-2xl md:text-4xl tracking-[0.2em] uppercase mb-24 text-[#bb9af7]"
        >
          Consulting
        </motion.h2>

        <div className="space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[#a9b1d6] leading-relaxed max-w-3xl text-lg"
          >
            Working as a consultant has been an incredible journey! I love helping organizations embrace new technologies 
            and find innovative solutions. It&apos;s amazing to see how combining technical expertise with strategic thinking 
            can create real impact.
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {consultingImages.map((image, index) => (
              <motion.div
                key={image}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: clickedIndex === index ? 1.05 : 1
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  scale: { duration: 0.2 }
                }}
                onClick={() => setClickedIndex(index === clickedIndex ? null : index)}
                className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-opacity duration-300" />
                <Image
                  src={image}
                  alt={`Consulting experience ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
