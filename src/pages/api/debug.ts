import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only available in development
  if (process.env.NODE_ENV !== 'development') {
    return res.status(404).json({ error: 'Not found' })
  }

  const envStatus = {
    openai: !!process.env.OPENAI_API_KEY,
    pineconeKey: !!process.env.PINECONE_API_KEY,
    pineconeEnv: !!process.env.PINECONE_ENVIRONMENT,
    pineconeIndex: !!process.env.PINECONE_INDEX,
    nextAuthUrl: !!process.env.NEXTAUTH_URL,
    nextAuthSecret: !!process.env.NEXTAUTH_SECRET
  }

  return res.status(200).json({
    environment: process.env.NODE_ENV,
    envVarsSet: envStatus
  })
} 