import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import BrotherGuessHeatmap from './BrotherGuessHeatmap'

export default function StartupSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
  const firstImageRef = useRef<HTMLDivElement>(null)

  // Update image size when window resizes
  useEffect(() => {
    const updateSize = () => {
      if (firstImageRef.current) {
        const rect = firstImageRef.current.getBoundingClientRect()
        setImageSize({ width: rect.width, height: rect.height })
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const startupStory = [
    {
      image: '/startup-1.jpg',
      text: '⚡ These people are my energy plugs! Side note - can you guess who my brother is? 😄'
    },
    {
      image: '/startup-2.jpg',
      text: '🚀 It&apos;s amazing the level of support you can provide a company with the leverage of software!'
    },
    {
      image: '/startup-3.jpg',
      text: '🔨 Always learning more - this time carpentry? Why not!'
    },
    {
      image: '/startup-4.jpg',
      text: '🎯 Going to conferences with buddies is fun - learning and laughing together!'
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
          STARTUPS
        </motion.h2>

        <div className="space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-stone-400 leading-relaxed max-w-3xl text-lg"
          >
            Nothing energizes me more than building something new with my friends! The startup journey is 
            where innovation meets passion, and every day brings the thrill of creating solutions that could 
            change how we work and live. ✨
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

            {startupStory.map((item, index) => (
              <motion.div
                key={item.image}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative aspect-[4/3] rounded-xl overflow-hidden group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                ref={index === 0 ? firstImageRef : undefined}
              >
                <div 
                  className={`absolute inset-0 transition-opacity duration-300 z-10 
                    ${hoveredIndex === index ? 'bg-black/75' : 'bg-black/30 group-hover:bg-black/50'}`} 
                />
                
                <Image
                  src={item.image}
                  alt={`Startup experience ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Brother Guess Heatmap for first image */}
                {index === 0 && (
                  <div className="absolute inset-0 z-20">
                    <BrotherGuessHeatmap
                      imageWidth={imageSize.width}
                      imageHeight={imageSize.height}
                      isActive={hoveredIndex === 0}
                    />
                  </div>
                )}

                {/* Hover Text (only show for non-first images) */}
                {index !== 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: hoveredIndex === index ? 1 : 0, y: hoveredIndex === index ? 0 : 20 }}
                    className="absolute inset-0 z-20 p-6 flex items-center justify-center"
                  >
                    <p className="text-white text-center font-handwriting text-2xl md:text-3xl leading-relaxed drop-shadow-lg tracking-wide">
                      {item.text}
                    </p>
                  </motion.div>
                )}

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
