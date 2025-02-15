'use client';

import { useState } from 'react';
import { Book } from '@/lib/books';

interface BookDetailsProps {
  book: Book | null;
}

export default function BookDetails({ book }: BookDetailsProps) {
  const [showFullImage, setShowFullImage] = useState(false);
  
  if (!book) return null;

  return (
    <section className="space-y-6 md:space-y-8">
      <h2 className="text-xl md:text-2xl font-mono uppercase tracking-tight">Book Details</h2>
      <div className="p-4 md:p-6 bg-[#1a1a1a] rounded-lg border border-[#2f2f2f]">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6 mb-4">
          <div className="flex gap-4 md:gap-6">
            {book.cover_image && (
              <div 
                className="relative w-20 h-30 md:w-24 md:h-36 shrink-0 cursor-pointer"
                onClick={() => setShowFullImage(true)}
              >
                <img 
                  src={book.cover_image} 
                  alt={`Cover of ${book.title}`}
                  className="w-full h-full object-cover rounded-lg hover:opacity-90 transition-opacity"
                />
              </div>
            )}
            <div className="min-w-0">
              <h3 className="text-lg md:text-xl font-mono uppercase tracking-tight truncate">
                {book.title}
              </h3>
              <p className="text-[#a1a1aa] mt-1 font-mono text-xs md:text-sm truncate">
                by {book.author}
              </p>
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
            </div>
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

      {/* Full Image Modal */}
      {showFullImage && book.cover_image && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setShowFullImage(false)}
        >
          <div className="relative w-full max-w-lg md:max-w-2xl">
            <img
              src={book.cover_image}
              alt={`Cover of ${book.title}`}
              className="w-full h-auto max-h-[80vh] md:max-h-[90vh] object-contain rounded-lg"
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
