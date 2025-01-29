import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

export default function ConsultingSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const consultingStory = [
    {
      image: '/consulting-1.JPG',
      text: '🏆 Exciting moment! Our team won first place in CIBC&apos;s innovation competition!'
    },
    {
      image: '/consulting-2.JPG',
      text: '🎯 Here we are, pitching how blockchain could revolutionize banking - such a fun challenge!'
    },
    {
      image: '/consulting-3.JPG',
      text: '🔮 The tricky part? Imagining banking 5 years into the future - but we love dreaming big!'
    },
    {
      image: '/consulting-4.JPG',
      text: '💡 Fielding questions about international transfers and tech - putting our knowledge to the test!'
    }
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
            Working as a consultant has been an incredible journey! I love helping organizations embrace new technologies 
            and find innovative solutions. It&apos;s amazing to see how combining technical expertise with strategic thinking 
            can create real impact. 🚀
          </motion.p>

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Connecting Arrows */}
            {hoveredIndex !== null && hoveredIndex < 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-1/2 left-0 w-full h-0 z-20 pointer-events-none"
                style={{
                  transform: 'translateY(-50%)'
                }}
              >
                <svg
                  className="w-full h-8"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                    d="M0,10 H100"
                    stroke="#8B9D7D"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                  />
                  <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    d="M90,5 L100,10 L90,15"
                    stroke="#8B9D7D"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </motion.div>
            )}

            {consultingStory.map((item, index) => (
              <motion.div
                key={item.image}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative aspect-[4/3] rounded-xl overflow-hidden group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div 
                  className={`absolute inset-0 transition-opacity duration-300 z-10 
                    ${hoveredIndex === index ? 'bg-black/75' : 'bg-black/30 group-hover:bg-black/50'}`} 
                />
                
                <Image
                  src={item.image}
                  alt={`Consulting experience ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover Text */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0, y: hoveredIndex === index ? 0 : 20 }}
                  className="absolute inset-0 z-20 p-6 flex items-center justify-center"
                >
                  <p className="text-white text-center font-handwriting text-2xl md:text-3xl leading-relaxed drop-shadow-lg tracking-wide">
                    {item.text}
                  </p>
                </motion.div>

                {/* Step Number */}
                <div className="absolute top-3 left-3 z-30 w-10 h-10 rounded-full bg-black/80 flex items-center justify-center shadow-lg border border-[#8B9D7D]">
                  <span className="text-white font-handwriting text-xl">{index + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
