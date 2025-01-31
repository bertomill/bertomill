import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  alt: string
}

export default function ImageModal({ isOpen, onClose, imageSrc, alt }: ImageModalProps) {
  console.log('Modal props:', { isOpen, imageSrc })  // Debug log
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute -top-4 -right-4 z-10 p-2 bg-[#414868] rounded-full hover:bg-[#414868]/80 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
            <div className="relative w-full max-w-4xl aspect-[16/9] rounded-lg overflow-hidden">
              <Image
                src={imageSrc}
                alt={alt}
                fill
                className="object-contain"
                quality={100}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 