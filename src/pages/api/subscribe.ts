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

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Please provide a valid email address' })
  }

  try {
    // Check if subscriber already exists
    const { data: existingSubscriber } = await supabase
      .from('subscribers')
      .select('id, active')
      .eq('email', email)
      .single()

    if (existingSubscriber) {
      if (existingSubscriber.active) {
        return res.status(400).json({ error: 'You are already subscribed to this list!' })
      } else {
        // Reactivate the subscription
        const { error: updateError } = await supabase
          .from('subscribers')
          .update({ active: true })
          .eq('email', email)

        if (updateError) throw updateError

        return res.status(200).json({ message: 'Your subscription has been reactivated!' })
      }
    }

    // Add new subscriber
    const { error: insertError } = await supabase
      .from('subscribers')
      .insert([{ 
        email, 
        active: true,
        subscribed_at: new Date().toISOString() 
      }])

    if (insertError) throw insertError

    return res.status(200).json({ message: 'Successfully subscribed!' })
  } catch (error) {
    console.error('Subscription error:', error)
    return res.status(500).json({ error: 'Error subscribing. Please try again.' })
  }
}