'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Book {
  title: string;
  author: string;
  yearRead: number;
  rating: number;
  review?: string;
  tags: string[];
  color?: string;
  id?: string;
}

interface BookshelfProps {
  books: Book[];
  onBookClick: (book: Book) => void;
  highlightedBookId?: string;
}

const defaultColors = [
  'bg-[#2a4858]', // Deep blue
  'bg-[#8b4513]', // Saddle brown
  'bg-[#556b2f]', // Olive
  'bg-[#800020]', // Burgundy
  'bg-[#4a4a4a]', // Charcoal
];

export default function Bookshelf({ books, onBookClick, highlightedBookId }: BookshelfProps) {
  const [hoveredBook, setHoveredBook] = useState<number | null>(null);

  return (
    <div className="w-full">
      {/* Bookshelf rows */}
      {Array.from({ length: Math.ceil(books.length / 6) }).map((_, shelfIndex) => (
        <div key={shelfIndex} className="mb-8">
          {/* Wooden shelf background */}
          <div className="relative">
            {/* Books */}
            <div className="flex gap-4 p-4 items-end">
              {books.slice(shelfIndex * 6, (shelfIndex + 1) * 6).map((book, index) => {
                const absoluteIndex = shelfIndex * 6 + index;
                const isHovered = hoveredBook === absoluteIndex;
                const isHighlighted = book.id === highlightedBookId;
                const color = book.color || defaultColors[absoluteIndex % defaultColors.length];

                return (
                  <motion.div
                    key={absoluteIndex}
                    className={`relative cursor-pointer ${color} rounded-sm shadow-lg ${
                      isHighlighted ? 'ring-2 ring-[#3b82f6] ring-offset-2 ring-offset-[#1a1a1a]' : ''
                    }`}
                    style={{
                      height: '180px',
                      width: '40px',
                      transformOrigin: 'bottom',
                    }}
                    whileHover={{ scale: 1.05, rotateZ: -5 }}
                    animate={isHighlighted ? { y: -10 } : { y: 0 }}
                    onHoverStart={() => setHoveredBook(absoluteIndex)}
                    onHoverEnd={() => setHoveredBook(null)}
                    onClick={() => onBookClick(book)}
                  >
                    {/* Book spine texture and details */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
                    <div className="absolute top-0 left-0 w-[2px] h-full bg-black/20"></div>
                    <div className="absolute top-0 right-0 w-[1px] h-full bg-white/10"></div>
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-white/10"></div>
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black/20"></div>
                    
                    {/* Book ridges */}
                    <div className="absolute top-4 left-0 w-full h-[1px] bg-black/10"></div>
                    <div className="absolute bottom-4 left-0 w-full h-[1px] bg-black/10"></div>

                    {/* Book title (vertical) */}
                    <div 
                      className="absolute top-0 left-0 w-full h-full flex items-center justify-center origin-center -rotate-90"
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <span 
                          className="text-white/90 text-[10px] font-medium tracking-wider uppercase px-4 truncate max-w-[160px] text-center"
                          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                        >
                          {book.title.split(' ').slice(0, 3).join(' ')}
                          {book.title.split(' ').length > 3 ? '...' : ''}
                        </span>
                        <span 
                          className="text-white/60 text-[8px] font-medium tracking-wider uppercase"
                          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                        >
                          {book.author.split(',')[0]}
                        </span>
                      </div>
                    </div>

                    {/* Small decorative lines near spine edges */}
                    <div className="absolute top-2 left-1 w-[1px] h-[8px] bg-white/20"></div>
                    <div className="absolute top-2 right-1 w-[1px] h-[8px] bg-white/20"></div>
                    <div className="absolute bottom-2 left-1 w-[1px] h-[8px] bg-white/20"></div>
                    <div className="absolute bottom-2 right-1 w-[1px] h-[8px] bg-white/20"></div>

                    {/* Book preview on hover */}
                    {isHovered && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full z-50 w-64 p-4 bg-[#1f1f1f] rounded-lg border border-[#2f2f2f] shadow-xl">
                        <h3 className="text-lg font-semibold text-[#e4e4e7] mb-1 line-clamp-2">{book.title}</h3>
                        <p className="text-sm text-[#a1a1aa] mb-2 line-clamp-1">by {book.author}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#a1a1aa]">Read in {book.yearRead}</span>
                          <div className="flex">
                            {[...Array(book.rating)].map((_, i) => (
                              <span key={i} className="text-yellow-400">★</span>
                            ))}
                          </div>
                        </div>
                        {book.tags.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {book.tags.slice(0, 2).map((tag, i) => (
                              <span 
                                key={i}
                                className="px-1.5 py-0.5 text-xs bg-[#2f2f2f] text-[#a1a1aa] rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Wooden shelf */}
            <div className="h-4 w-full bg-gradient-to-b from-[#3d2b1f] to-[#2a1f16] rounded-b-sm shadow-md"></div>
            <div className="h-2 w-full bg-[#1a140e] rounded-b-sm"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
