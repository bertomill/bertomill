import { motion } from 'framer-motion'

export default function GradientAnimation() {
  return (
    <div className="fixed inset-0 -z-10">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 60%)',
            'radial-gradient(circle at 45% 45%, rgba(255, 255, 255, 0.04) 0%, transparent 60%)',
            'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 60%)',
          ],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.02) 0%, transparent 60%)',
            'radial-gradient(circle at 65% 35%, rgba(255, 255, 255, 0.03) 0%, transparent 60%)',
            'radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.02) 0%, transparent 60%)',
          ],
          scale: [1.05, 0.95, 1.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
    </div>
  )
} 
