import { motion } from 'framer-motion'
import Image from 'next/image'

export default function StartupSection() {
  const startupImages = [
    '/startup-1.jpg',
    '/startup-2.jpg',
    '/startup-3.jpg',
    '/startup-4.jpg'
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
          Startups
        </motion.h2>

        <div className="space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[#a9b1d6] leading-relaxed max-w-3xl text-lg"
          >
            Nothing energizes me more than building something new with my friends! The startup journey is 
            where innovation meets passion, and every day brings the thrill of creating solutions that could 
            change how we work and live.
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {startupImages.map((image, index) => (
              <motion.div
                key={image}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative aspect-[4/3] rounded-xl overflow-hidden group"
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-opacity duration-300" />
                <Image
                  src={image}
                  alt={`Startup experience ${index + 1}`}
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
