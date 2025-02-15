import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

const books = [
  {
    title: 'The Pragmatic Programmer',
    author: 'David Thomas, Andrew Hunt',
    year_read: 2024,
    rating: 5,
    review: 'A classic that has aged remarkably well. The principles about DRY, orthogonality, and tracer bullets are timeless.',
    tags: ['programming', 'software engineering', 'career'],
    color: 'bg-[#2a4858]',
  },
  {
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    year_read: 2023,
    rating: 5,
    review: 'Deep dive into distributed systems. Changed how I think about data consistency and system architecture.',
    tags: ['distributed systems', 'databases', 'architecture'],
    color: 'bg-[#8b4513]',
  },
  {
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    year_read: 2023,
    rating: 4,
    review: 'Fascinating hard sci-fi with a great balance of scientific detail and engaging storytelling.',
    tags: ['science fiction', 'space', 'physics'],
    color: 'bg-[#556b2f]',
  },
  {
    title: 'The Manager\'s Path',
    author: 'Camille Fournier',
    year_read: 2023,
    rating: 5,
    review: 'Excellent roadmap for engineering leadership, from tech lead to CTO.',
    tags: ['leadership', 'career', 'management'],
    color: 'bg-[#800020]',
  },
  {
    title: 'Building a Second Brain',
    author: 'Tiago Forte',
    year_read: 2024,
    rating: 4,
    review: 'Practical system for organizing digital information and turning it into creative output.',
    tags: ['productivity', 'knowledge management', 'creativity'],
    color: 'bg-[#4a4a4a]',
  },
];

async function seedBooks() {
  try {
    // Clear existing books
    const { error: deleteError } = await supabase
      .from('books')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all rows

    if (deleteError) {
      throw deleteError;
    }

    // Insert new books
    const { data, error } = await supabase
      .from('books')
      .insert(books)
      .select();

    if (error) {
      throw error;
    }

    console.log('Successfully seeded books:', data.length);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding books:', error);
    process.exit(1);
  }
}

seedBooks();
