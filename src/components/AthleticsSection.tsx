import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function AthleticsSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isHovering, setIsHovering] = useState(false)

  const athleticsImages = [
    { src: "/B&D_Stadium.png", alt: "Western University Football Stadium" },
    { src: "/Berto_Runout.png", alt: "Game Day Runout" },
    { src: "/BMWalk.png", alt: "Walking onto the Field", drawing: "/bmball.png" }
  ]

  return (
    <section className="relative bg-[#0c0c0c] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="retro-text grainy text-xl md:text-3xl tracking-[0.2em] uppercase mb-8 text-[#94a3b8]"
        >
          Athletics
        </motion.h2>

        <div className="max-w-2xl mb-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-[#e4e4e7] grainy leading-relaxed text-sm md:text-base"
          >
            Beyond technology, I&apos;m passionate about athletics and team sports. 
            During my time at Western University, I had the privilege of being 
            part of the football program, where I learned valuable lessons about 
            leadership, dedication, and teamwork.
          </motion.p>
        </div>

        {/* Image Gallery */}
        <div className="grid md:grid-cols-3 gap-4 relative z-10 mt-4">
          {athleticsImages.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: index * 0.2 }}
              className="relative cursor-pointer group"
              onClick={() => setSelectedImage(image.src)}
              onMouseEnter={() => index === 2 && setIsHovering(true)}
              onMouseLeave={() => index === 2 && setIsHovering(false)}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              {index === 2 && image.drawing && (
                <>
                  <div 
                    className={`absolute transition-opacity duration-300 overflow-visible ${
                      isHovering ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      left: '-10%',
                      top: '-15%',
                      width: '120%',
                      height: '130%',
                      zIndex: 10
                    }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={image.drawing}
                        alt="Drawing version"
                        fill
                        className="object-cover scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectPosition: '35% center' }}
                      />
                    </div>
                  </div>
                  <div 
                    className={`absolute transition-opacity duration-300 ${
                      isHovering ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      right: '-3rem',
                      bottom: '1rem',
                      zIndex: 20,
                      transform: 'rotate(90deg)',
                      transformOrigin: 'bottom right'
                    }}
                  >
                    <p className="text-white/80 text-xs font-mono tracking-wider">
                      Drawing by Prachi Hambir
                    </p>
                  </div>
                </>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A5D41]/30 to-transparent rounded-lg" />
              <div className="absolute -bottom-2 -right-2 bg-[#8B9D7D]/10 w-full h-full rounded-lg -z-10" />
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

      {/* Diagonal Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-stone-950 transform skew-y-3 origin-left -z-10" />
    </section>
  )
}
