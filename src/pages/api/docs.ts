import type { NextApiRequest, NextApiResponse } from 'next'
import { Pinecone } from '@pinecone-database/pinecone'

interface Doc {
  text: string
  source: string
  category: string
  id: string
}

interface GroupedDocs {
  [key: string]: Doc[]
}

interface ErrorResponse {
  error: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GroupedDocs | ErrorResponse>
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
    const docs: Doc[] = (queryResponse.matches || [])
      .filter(match => match.metadata && typeof match.metadata.text === 'string' && typeof match.metadata.source === 'string')
      .map(match => ({
        text: match.metadata!.text as string,
        source: match.metadata!.source as string,
        category: (typeof match.metadata!.category === 'string' ? match.metadata!.category : 'General'),
        id: match.id
      }))

    // Group by category/source
    const groupedDocs = docs.reduce<GroupedDocs>((acc, doc) => {
      const key = doc.category
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(doc)
      return acc
    }, {})

    return res.status(200).json(groupedDocs)
  } catch (error) {
    console.error('Error fetching docs:', error)
    return res.status(500).json({ error: 'Failed to fetch docs' })
  }
} 