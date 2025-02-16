'use client';

import { useState } from 'react';
import { Book } from '@/lib/books';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BookDetailsProps {
  book: Book | null;
}

export default function BookDetails({ book }: BookDetailsProps) {
  const [showFullImage, setShowFullImage] = useState(false);
  
  if (!book) return null;

  return (
    <section className="space-y-6 md:space-y-8">
      <h2 className="text-xl md:text-2xl font-mono uppercase tracking-tight">Book Details</h2>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1a1a1a] rounded-lg p-4 md:p-6 space-y-6"
      >
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {book.cover_image && (
            <motion.div
              className="relative w-full h-[300px] md:h-[400px] cursor-pointer overflow-hidden rounded-lg"
              onClick={() => setShowFullImage(true)}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-teal-500/20 to-yellow-500/20 mix-blend-overlay" />
              <Image
                src={book.cover_image}
                alt={`Cover of ${book.title}`}
                className="rounded-lg object-contain transition-transform duration-300"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>
          )}
          
          <div className="flex-1 space-y-4">
            <motion.h2 
              className="text-2xl md:text-3xl font-bold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {book.title}
            </motion.h2>
            
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-[#a1a1aa]">by</span>
              <span className="text-white">{book.author}</span>
            </motion.div>

            <div className="flex items-center mt-2 md:mt-3">
              <span className="text-xs md:text-sm text-[#a1a1aa] font-mono">
                Read in {book.year_read}
              </span>
              <div className="ml-3 flex">
                {[...Array(book.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>
            </div>

            {book.tags.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {book.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 md:py-1 bg-[#27272a] rounded-full text-xs font-mono text-[#a1a1aa]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {book.review && (
              <div className="mt-4 text-[#e4e4e7] font-mono text-xs md:text-sm whitespace-pre-wrap">
                {book.review}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Full Image Modal */}
      {showFullImage && book.cover_image && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setShowFullImage(false)}
        >
          <div className="relative w-full max-w-lg md:max-w-2xl">
            <Image
              src={book.cover_image}
              alt={`Cover of ${book.title}`}
              className="w-full h-auto max-h-[80vh] md:max-h-[90vh] object-contain rounded-lg"
              fill
              sizes="100vw"
              priority
            />
            <button
              onClick={() => setShowFullImage(false)}
              className="absolute top-2 right-2 md:top-4 md:right-4 text-white hover:text-gray-300 p-2"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
