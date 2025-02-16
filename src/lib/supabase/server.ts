import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from './database.types'

export const createClient = () => {
  const cookieStore = cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables. Check .env.local')
  }

  return createServerClient<Database>(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        async get(key) {
          return cookieStore.get(key)?.value;
        },
        set(key, value, options) {
          cookieStore.set(key, value, options);
        },
        remove(key, options) {
          cookieStore.set(key, '', { ...options, maxAge: 0 });
        },
      },
    }
  )
}
