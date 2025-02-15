import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // Only allow the specified admin email to add books
    const allowedEmail = process.env.ALLOWED_EMAIL
    if (!allowedEmail) {
      throw new Error('ALLOWED_EMAIL environment variable not set')
    }

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user || user.email !== allowedEmail) {
      return NextResponse.json(
        { error: 'You must be signed in to manage books.' },
        { status: 401 }
      )
    }

    const book = await request.json()
    const { data, error } = await supabase
      .from('books')
      .insert([
        {
          title: book.title,
          author: book.author,
          year_read: book.year_read,
          rating: book.rating,
          review: book.review,
          tags: book.tags,
          color: book.color,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Error inserting book:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in POST /api/books:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching books:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in GET /api/books:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
