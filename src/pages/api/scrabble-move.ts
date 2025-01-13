import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { name, email, move } = req.body

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: 'bertmill19@gmail.com', // Your email
      subject: '🎲 New Scrabble Move!',
      html: `
        <h2>Someone wants to play Scrabble!</h2>
        <p><strong>Player:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>First Move:</strong> ${move}</p>
      `,
    })

    res.status(200).json({ message: 'Move submitted successfully' })
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({ message: 'Failed to submit move' })
  }
} 