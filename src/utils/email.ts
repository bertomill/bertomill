import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendUpdateEmail(subscribers: string[], subject: string, content: string) {
  try {
    await resend.emails.send({
      from: 'Berto Mill <updates@bertomill.com>',
      to: 'updates@bertomill.com', // Add a default recipient
      bcc: subscribers, // Send to all subscribers as BCC
      subject: subject,
      html: content,
    })
    return { success: true }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error: 'Failed to send email' }
  }
} 