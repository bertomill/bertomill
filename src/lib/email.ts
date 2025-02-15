import { Resend } from 'resend';
import { render } from '@react-email/render';
import { NewsletterTemplate } from '@/emails/NewsletterTemplate';
import { NewsletterEmail } from '@/emails/NewsletterEmail'; // Added import statement
import { supabase } from './supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function getActiveSubscribers() {
  try {
    const { data: subscribers, error } = await supabase
      .from('subscribers')
      .select('email')
      .eq('active', true);

    if (error) {
      console.error('Error fetching subscribers:', error);
      return [];
    }
    
    return subscribers?.map(sub => sub.email) || [];
  } catch (error) {
    console.error('Error in getActiveSubscribers:', error);
    return [];
  }
}

interface SendNewsletterParams {
  subject: string;
  content: string;
  previewText?: string;
  testEmail?: string;
}

export async function sendNewsletter({
  subject,
  content,
  previewText,
  testEmail,
}: SendNewsletterParams) {
  try {
    // If test email is provided, only send to that email
    const to = testEmail ? [testEmail] : await getActiveSubscribers();
    
    // For test mode, we don't need to check subscribers
    if (!testEmail && to.length === 0) {
      throw new Error('No active subscribers found');
    }

    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    console.log('Attempting to send email with config:', {
      to,
      subject,
      from: 'Berto Mill <onboarding@resend.dev>'
    });

    const data = await resend.emails.send({
      from: 'Berto Mill <onboarding@resend.dev>',
      reply_to: 'bertovmill@gmail.com',
      to,
      subject,
      react: NewsletterEmail({ 
        title: subject,
        content,
        date,
      }),
      text: content, // Fallback plain text version
    });

    console.log('Email sent successfully:', data);
    return data;
  } catch (error: any) {
    console.error('Detailed error in sendNewsletter:', {
      error,
      message: error.message,
      response: error.response,
      stack: error.stack
    });
    throw error;
  }
}
