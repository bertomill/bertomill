import { NextResponse } from 'next/server';
import { sendNewsletter } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { subject, content, previewText, testEmail } = await request.json();

    if (!subject || !content) {
      return NextResponse.json(
        { error: 'Subject and content are required' },
        { status: 400 }
      );
    }

    const results = await sendNewsletter({
      subject,
      content,
      previewText,
      testEmail,
    });

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.error('Newsletter send error:', error);
    return NextResponse.json(
      { error: 'Failed to send newsletter' },
      { status: 500 }
    );
  }
}
