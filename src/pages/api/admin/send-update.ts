import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import { sendUpdateEmail } from '@/utils/email'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if user is authenticated and authorized
  const session = await getServerSession(req, res, authOptions)
  if (!session || session.user?.email !== process.env.ALLOWED_EMAIL) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { subject, content } = req.body

  try {
    // Get all subscribers
    const { data: subscribers, error } = await supabase
      .from('subscribers')
      .select('email')

    if (error) throw error

    const emails = subscribers.map(sub => sub.email)
    
    // Send the update
    const result = await sendUpdateEmail(emails, subject, content)
    
    if (!result.success) throw result.error

    return res.status(200).json({ message: 'Update sent successfully' })
  } catch (error) {
    console.error('Error sending update:', error)
    return res.status(500).json({ error: 'Failed to send update' })
  }
} 