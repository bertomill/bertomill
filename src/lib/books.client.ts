import { Book, NewBook } from './books';

export async function addBook(book: NewBook): Promise<Book> {
  const response = await fetch('/api/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to add book');
  }

  return response.json();
}

export async function getBooks(): Promise<Book[]> {
  const response = await fetch('/api/books');
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch books');
  }

  return response.json();
}
