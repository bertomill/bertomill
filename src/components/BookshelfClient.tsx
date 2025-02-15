'use client';

import { useState } from 'react';
import Bookshelf from './Bookshelf';
import BookDetails from './BookDetails';
import { Book } from '@/lib/books';

interface BookshelfClientProps {
  books: Book[];
}

export default function BookshelfClient({ books }: BookshelfClientProps) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <>
      <Bookshelf 
        books={books} 
        onBookClick={setSelectedBook}
        highlightedBookId={selectedBook?.id}
      />
      <div className="mt-12">
        <BookDetails book={selectedBook} />
      </div>
    </>
  );
}
