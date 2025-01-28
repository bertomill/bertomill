import Image from 'next/image'
import { motion } from 'framer-motion'

export default function AthleticsSection() {
  return (
    <section className="relative bg-[#1C1917] py-32">
      <div className="max-w-[80%] mx-auto">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-7xl font-light tracking-tight mb-12"
        >
          ATHLETICS
        </motion.h2>

        <div className="max-w-2xl mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-xl text-stone-300 leading-relaxed"
          >
            Beyond technology, I'm passionate about athletics and team sports. 
            During my time at Western University, I had the privilege of being 
            part of the football program, where I learned valuable lessons about 
            leadership, dedication, and teamwork.
          </motion.p>
        </div>

        {/* Image Gallery */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Stadium Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/B&D_Stadium.png"
                alt="Western University Football Stadium"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A5D41]/30 to-transparent" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[#8B9D7D]/10 w-full h-full rounded-lg -z-10" />
          </motion.div>

          {/* Runout Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/Berto_Runout.png"
                alt="Game Day Runout"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A5D41]/30 to-transparent" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[#8B9D7D]/10 w-full h-full rounded-lg -z-10" />
          </motion.div>

          {/* BMWalk Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/BMWalk.png"
                alt="Walking onto the Field"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A5D41]/30 to-transparent" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[#8B9D7D]/10 w-full h-full rounded-lg -z-10" />
          </motion.div>
        </div>
      </div>

      {/* Diagonal Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-stone-950 transform skew-y-3 origin-left" />
    </section>
  )
}
