import { NextResponse } from 'next/server';
import { getAIResponse } from '@/lib/ai';
import { getBooks } from '@/lib/books';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const books = await getBooks();
    const response = await getAIResponse(message, books);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
