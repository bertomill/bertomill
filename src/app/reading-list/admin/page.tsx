'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addBook } from '@/lib/books.client';
import type { NewBook } from '@/lib/books';

const defaultColors = [
  'bg-[#2a4858]',
  'bg-[#8b4513]',
  'bg-[#556b2f]',
  'bg-[#800020]',
  'bg-[#4a4a4a]',
];

export default function AdminBooks() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const tagsString = formData.get('tags') as string;
    const tags = tagsString.split(',').map(tag => tag.trim());

    const book: NewBook = {
      title: formData.get('title') as string,
      author: formData.get('author') as string,
      year_read: parseInt(formData.get('year_read') as string),
      rating: parseInt(formData.get('rating') as string),
      review: formData.get('review') as string,
      tags,
      color: formData.get('color') as string,
    };

    try {
      await addBook(book);
      router.refresh();
      (event.target as HTMLFormElement).reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen pt-32 pb-12 px-8 md:pl-[240px]">
      <div className="max-w-2xl mx-auto space-y-12">
        <div className="flex flex-col items-start gap-8">
          <h1 className="text-4xl font-mono uppercase tracking-tight">
            Add New Book
          </h1>
          <p className="text-[#A1A1AA] font-mono uppercase tracking-wider text-sm">
            Add a new book to your reading list
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-mono uppercase text-[#A1A1AA]">Title</span>
              <input
                type="text"
                name="title"
                required
                className="mt-1 block w-full rounded-md border border-[#2f2f2f] bg-[#1a1a1a] px-3 py-2 text-[#e4e4e7] focus:border-[#3f3f3f] focus:outline-none font-mono"
              />
            </label>

            <label className="block">
              <span className="text-sm font-mono uppercase text-[#A1A1AA]">Author</span>
              <input
                type="text"
                name="author"
                required
                className="mt-1 block w-full rounded-md border border-[#2f2f2f] bg-[#1a1a1a] px-3 py-2 text-[#e4e4e7] focus:border-[#3f3f3f] focus:outline-none font-mono"
              />
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-mono uppercase text-[#A1A1AA]">Year Read</span>
                <input
                  type="number"
                  name="year_read"
                  required
                  min="1900"
                  max="2100"
                  defaultValue={new Date().getFullYear()}
                  className="mt-1 block w-full rounded-md border border-[#2f2f2f] bg-[#1a1a1a] px-3 py-2 text-[#e4e4e7] focus:border-[#3f3f3f] focus:outline-none font-mono"
                />
              </label>

              <label className="block">
                <span className="text-sm font-mono uppercase text-[#A1A1AA]">Rating</span>
                <select
                  name="rating"
                  required
                  className="mt-1 block w-full rounded-md border border-[#2f2f2f] bg-[#1a1a1a] px-3 py-2 text-[#e4e4e7] focus:border-[#3f3f3f] focus:outline-none font-mono"
                >
                  {[1, 2, 3, 4, 5].map(rating => (
                    <option key={rating} value={rating}>
                      {'★'.repeat(rating)}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-mono uppercase text-[#A1A1AA]">Review</span>
              <textarea
                name="review"
                rows={3}
                className="mt-1 block w-full rounded-md border border-[#2f2f2f] bg-[#1a1a1a] px-3 py-2 text-[#e4e4e7] focus:border-[#3f3f3f] focus:outline-none font-mono"
              />
            </label>

            <label className="block">
              <span className="text-sm font-mono uppercase text-[#A1A1AA]">Tags (comma-separated)</span>
              <input
                type="text"
                name="tags"
                placeholder="e.g. Programming, Science Fiction, Psychology"
                className="mt-1 block w-full rounded-md border border-[#2f2f2f] bg-[#1a1a1a] px-3 py-2 text-[#e4e4e7] focus:border-[#3f3f3f] focus:outline-none font-mono"
              />
            </label>

            <label className="block">
              <span className="text-sm font-mono uppercase text-[#A1A1AA]">Color</span>
              <select
                name="color"
                required
                defaultValue={defaultColors[0]}
                className="mt-1 block w-full rounded-md border border-[#2f2f2f] bg-[#1a1a1a] px-3 py-2 text-[#e4e4e7] focus:border-[#3f3f3f] focus:outline-none font-mono"
              >
                {defaultColors.map((color, index) => (
                  <option key={color} value={color}>
                    Color {index + 1}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {error && (
            <p className="text-red-500 font-mono text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[#2f2f2f] px-4 py-2 text-[#e4e4e7] hover:bg-[#3f3f3f] focus:outline-none disabled:opacity-50 font-mono uppercase tracking-wider"
          >
            {loading ? 'Adding...' : 'Add Book'}
          </button>
        </form>
      </div>
    </main>
  );
}
