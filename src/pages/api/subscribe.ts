import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  try {
    const { error } = await supabase
      .from('subscribers')
      .insert([{ email, subscribed_at: new Date() }])

    if (error) throw error

    return res.status(200).json({ message: 'Successfully subscribed!' })
  } catch (error) {
    console.error('Subscription error:', error)
    return res.status(500).json({ error: 'Error subscribing. Please try again.' })
  }
} 