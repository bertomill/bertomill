import { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { name, email, move } = req.body

    await resend.emails.send({
      from: 'Scrabble Game <scrabble@bertomill.com>',
      to: 'bertmill19@gmail.com',
      subject: '🎲 New Scrabble Move!',
      html: `
        <h2>Someone wants to play Scrabble!</h2>
        <p><strong>Player:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>First Move:</strong> ${move}</p>
      `
    })

    res.status(200).json({ message: 'Move submitted successfully' })
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({ message: 'Failed to submit move' })
  }
} 