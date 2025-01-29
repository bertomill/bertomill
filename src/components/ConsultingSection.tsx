import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ConsultingSection() {
  const consultingImages = [
    '/consulting-1.JPG',
    '/consulting-2.JPG',
    '/consulting-3.JPG',
    '/consulting-4.JPG'
  ]

  return (
    <section className="relative bg-stone-950 py-32">
      <div className="max-w-[90%] mx-auto">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-7xl font-light tracking-tight mb-12"
        >
          CONSULTING
        </motion.h2>

        <div className="space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-stone-400 leading-relaxed max-w-3xl text-lg"
          >
            As a consultant, I&apos;ve had the opportunity to work with diverse organizations, 
            helping them navigate digital transformation and implement AI solutions. My approach combines 
            technical expertise with strategic business insights to deliver impactful results.
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {consultingImages.map((image, index) => (
              <motion.div
                key={image}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative aspect-[4/3] rounded-xl overflow-hidden group"
              >
                <div className="absolute inset-0 bg-[#4A5D41]/20 group-hover:bg-[#4A5D41]/0 transition-colors duration-300 z-10" />
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
