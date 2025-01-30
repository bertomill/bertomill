import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/neon'

// Define the "brother zone" coordinates for the third person from left (in gray shirt)
const BROTHER_ZONE = {
  minX: 55,  // Third person from left
  maxX: 75,  // Wider zone to account for his whole body
  minY: 10,  // Higher up to include his head
  maxY: 80,  // Lower to include his torso
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { x, y } = req.body

      // Check if the guess is correct
      const isCorrect = 
        x >= BROTHER_ZONE.minX && 
        x <= BROTHER_ZONE.maxX && 
        y >= BROTHER_ZONE.minY && 
        y <= BROTHER_ZONE.maxY

      // Save the guess
      const guess = await prisma.brotherGuess.create({
        data: {
          x,
          y,
          isCorrect,
        },
      })

      // Get aggregated stats
      const totalGuesses = await prisma.brotherGuess.count()
      const correctGuesses = await prisma.brotherGuess.count({
        where: { isCorrect: true },
      })

      return res.status(200).json({
        success: true,
        guess,
        stats: {
          total: totalGuesses,
          correct: correctGuesses,
          accuracy: Math.round((correctGuesses / totalGuesses) * 100),
        },
      })
    } catch (error) {
      console.error('Error saving guess:', error)
      return res.status(500).json({ error: 'Failed to save guess' })
    }
  }

  if (req.method === 'GET') {
    try {
      // Get all guesses for the heatmap
      const guesses = await prisma.brotherGuess.findMany({
        select: {
          x: true,
          y: true,
          isCorrect: true,
        },
      })

      return res.status(200).json({ guesses })
    } catch (error) {
      console.error('Error fetching guesses:', error)
      return res.status(500).json({ error: 'Failed to fetch guesses' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
