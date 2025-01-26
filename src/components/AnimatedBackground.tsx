import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
      {/* Main sphere */}
      <motion.div
        className="absolute w-[600px] h-[600px]"
        style={{
          background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0) 70%)',
          filter: 'blur(60px)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Secondary sphere */}
      <motion.div
        className="absolute w-[400px] h-[400px]"
        style={{
          background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0) 70%)',
          filter: 'blur(40px)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          x: mousePosition.x * -0.5,
          y: mousePosition.y * -0.5,
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />

      {/* Accent spheres */}
      <motion.div
        className="absolute w-[200px] h-[200px]"
        style={{
          background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0) 70%)',
          filter: 'blur(30px)',
          top: '30%',
          left: '30%',
          x: mousePosition.x * 0.3,
          y: mousePosition.y * 0.3,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </div>
  )
} 