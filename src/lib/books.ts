import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { Database } from '@/lib/supabase/database.types';

export type Book = Database['public']['Tables']['books']['Row'];
export type NewBook = Database['public']['Tables']['books']['Insert'];

export async function getBooks(): Promise<Book[]> {
  try {
    console.log('Fetching books...');
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);
    
    const { data: books, error } = await supabase
      .from('books')
      .select('*')
      .order('year_read', { ascending: false });

    if (error) {
      console.error('Error fetching books:', error);
      return [];
    }

    if (!books) {
      console.log('No books found');
      return [];
    }

    console.log('Books fetched:', books.length);
    return books;
  } catch (error) {
    console.error('Error in getBooks:', error);
    return [];  
  }
}

export async function addBook(book: NewBook) {
  try {
    console.log('Adding book...');
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    
    const { data, error } = await supabase
      .from('books')
      .insert(book)
      .select()
      .single();

    if (error) {
      console.error('Error adding book:', error);
      throw error;
    }

    console.log('Book added:', data);
    return data;
  } catch (error) {
    console.error('Error in addBook:', error);
    throw error;
  }
}

export async function updateBook(id: string, book: Partial<NewBook>) {
  try {
    console.log('Updating book...');
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    
    const { data, error } = await supabase
      .from('books')
      .update(book)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating book:', error);
      throw error;
    }

    console.log('Book updated:', data);
    return data;
  } catch (error) {
    console.error('Error in updateBook:', error);
    throw error;
  }
}

export async function deleteBook(id: string) {
  try {
    console.log('Deleting book...');
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    
    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting book:', error);
      throw error;
    }

    console.log('Book deleted:', id);
  } catch (error) {
    console.error('Error in deleteBook:', error);
    throw error;
  }
}
