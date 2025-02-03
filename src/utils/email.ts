import { Resend } from 'resend'

const resend = new Resend(process.env.EMAIL_SERVER_PASSWORD)

export async function sendUpdateEmail(subscribers: string[], subject: string, content: string) {
  try {
    await resend.emails.send({
      from: 'Berto Mill <updates@bertomill.com>',
      bcc: subscribers, // Send to all subscribers as BCC
      subject: subject,
      html: content,
    })
    return { success: true }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error }
  }
} 