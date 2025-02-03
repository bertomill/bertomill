import { NextApiRequest, NextApiResponse } from 'next'
import { Pinecone } from '@pinecone-database/pinecone'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!
    })

    const index = pc.index(process.env.PINECONE_INDEX!)
    
    // Fetch all vectors with metadata
    const queryResponse = await index.query({
      vector: new Array(1536).fill(0), // Dummy vector to fetch all
      topK: 100,
      includeMetadata: true
    })

    // Extract and organize the documents
    const docs = queryResponse.matches?.map(match => ({
      text: match.metadata?.text,
      source: match.metadata?.source,
      category: match.metadata?.category || 'General'
    })).filter(doc => doc.text && doc.source) || []

    // Group by category/source
    const groupedDocs = docs.reduce((acc, doc) => {
      const key = doc.category
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(doc)
      return acc
    }, {} as Record<string, typeof docs>)

    return res.status(200).json(groupedDocs)
  } catch (error) {
    console.error('Error fetching docs:', error)
    return res.status(500).json({ error: 'Failed to fetch docs' })
  }
} 