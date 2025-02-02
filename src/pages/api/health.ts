import { NextApiRequest, NextApiResponse } from 'next'
import { OpenAI } from 'openai'
import { Pinecone } from '@pinecone-database/pinecone'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const status = {
    openai: false,
    pinecone: false
  }

  try {
    // Check OpenAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
    await openai.models.list()
    status.openai = true
  } catch (error) {
    console.error('OpenAI health check failed:', error)
  }

  try {
    // Check Pinecone
    const pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!
    })
    const index = pc.index(process.env.PINECONE_INDEX!)
    await index.describeIndexStats()
    status.pinecone = true
  } catch (error) {
    console.error('Pinecone health check failed:', error)
  }

  res.status(200).json(status)
} 