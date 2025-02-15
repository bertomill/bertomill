import { EmailTemplate } from '@/emails/WelcomeEmail';
import { Resend } from 'resend';
import * as React from 'react';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['bertovmill@gmail.com'],
      subject: 'Hello world',
      react: EmailTemplate({ firstName: "Berto" }) as React.ReactElement,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
