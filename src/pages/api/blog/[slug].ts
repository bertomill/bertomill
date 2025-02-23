import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'
import { PostgrestError } from '@supabase/supabase-js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query

  if (req.method === 'GET') {
    try {
      const { data: post, error: fetchError } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single()

      if (fetchError) throw fetchError

      res.status(200).json(post)
    } catch (err) {
      const error = err as Error | PostgrestError
      res.status(500).json({ 
        message: 'Error fetching post', 
        details: 'message' in error ? error.message : 'Unknown error'
      })
    }
  } else if (req.method === 'PUT') {
    try {
      const { data: updatedPost, error: updateError } = await supabase
        .from('posts')
        .update(req.body)
        .eq('slug', slug)
        .single()

      if (updateError) throw updateError

      res.status(200).json(updatedPost)
    } catch (err) {
      const error = err as Error | PostgrestError
      res.status(500).json({ 
        message: 'Error updating post', 
        details: 'message' in error ? error.message : 'Unknown error'
      })
    }
  } else if (req.method === 'DELETE') {
    try {
      const { data: deletedPost, error: deleteError } = await supabase
        .from('posts')
        .delete()
        .eq('slug', slug)
        .single()

      if (deleteError) throw deleteError

      res.status(200).json(deletedPost)
    } catch (err) {
      const error = err as Error | PostgrestError
      res.status(500).json({ 
        message: 'Error deleting post', 
        details: 'message' in error ? error.message : 'Unknown error'
      })
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
    res.status(405).json({ message: `Method ${req.method} Not Allowed` })
  }
} 