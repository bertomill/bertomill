import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function addAntifragile() {
  try {
    const book = {
      title: "Antifragile: Things That Gain From Disorder",
      author: "Nassim Nicholas Taleb",
      year_read: 2024,
      rating: 5,
      tags: ["philosophy", "complexity", "risk", "systems"],
      review: "A profound exploration of systems that benefit from volatility and stress. Taleb introduces the concept of antifragility - going beyond mere robustness to actually improve under pressure. The ideas in this book have deeply influenced my thinking about resilience and adaptability in both technology and life."
    };

    const { data, error } = await supabase
      .from('books')
      .insert(book)
      .select()
      .single();

    if (error) {
      throw error;
    }

    console.log('Successfully added Antifragile:', data);
  } catch (error) {
    console.error('Failed to add Antifragile:', error);
  }
}

addAntifragile();
