import { Suspense } from 'react';
import { getBooks } from '@/lib/books';
import BookshelfClient from '@/components/BookshelfClient';
import LibrarianChat from '@/components/LibrarianChat';

export const dynamic = 'force-dynamic';

export default async function ReadingList() {
  console.log('Fetching books...');
  const books = await getBooks();
  console.log('Books fetched:', books.length);

  return (
    <main className="min-h-screen pt-20 pb-12 px-4 md:px-8 md:pt-32 md:pl-[240px]">
      <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
        <div className="flex flex-col items-start gap-4 md:gap-8">
          <h1 className="text-3xl md:text-4xl font-mono uppercase tracking-tight">
            LIBRARY
          </h1>
          <p className="text-[#A1A1AA] font-mono uppercase tracking-wider text-xs md:text-sm">
            A collection of books I've read, with thoughts and ratings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Library Section */}
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-xl md:text-2xl font-mono uppercase tracking-tight">
              LIBRARY
            </h2>
            <div className="bg-[#1a1a1a] rounded-lg p-4 md:p-8">
              <Suspense fallback={<div>Loading books...</div>}>
                <BookshelfClient books={books} />
              </Suspense>
            </div>
          </div>

          {/* AI Librarian Section */}
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-xl md:text-2xl font-mono uppercase tracking-tight">
              AI LIBRARIAN
            </h2>
            <div className="h-[400px] md:h-[500px]">
              <Suspense fallback={<div>Loading chat...</div>}>
                <LibrarianChat books={books} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
