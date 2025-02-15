import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from './database.types'

export const createClient = async (cookieStore: ReturnType<typeof cookies>) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables. Check .env.local')
  }

  return createServerClient<Database>(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        async get(name: string) {
          try {
            const cookie = await cookieStore.get(name)
            return cookie?.value
          } catch (error) {
            console.error(`Error getting cookie ${name}:`, error)
            return undefined
          }
        },
        set(name: string, value: string, options: CookieOptions) {
          // In server components, we can only read cookies
          // We'll handle cookie setting in client components or API routes
        },
        remove(name: string, options: CookieOptions) {
          // In server components, we can only read cookies
          // We'll handle cookie removal in client components or API routes
        },
      },
    }
  )
}
