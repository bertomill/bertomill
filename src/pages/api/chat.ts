import { NextApiRequest, NextApiResponse } from 'next'
import { OpenAI } from 'openai'
import { Pinecone } from '@pinecone-database/pinecone'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable')
}

if (!process.env.PINECONE_API_KEY) {
  throw new Error('Missing PINECONE_API_KEY environment variable')
}

if (!process.env.PINECONE_ENVIRONMENT) {
  throw new Error('Missing PINECONE_ENVIRONMENT environment variable')
}

if (!process.env.PINECONE_INDEX) {
  throw new Error('Missing PINECONE_INDEX environment variable')
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 30000, // 30 second timeout
})

export const config = {
  maxDuration: 60, // Set max duration to 60 seconds
  api: {
    responseLimit: false,
    bodyParser: {
      sizeLimit: '1mb',
    },
    externalResolver: true,
  },
}

interface ChatResponse {
  message?: string;
  error?: string;
  sources?: string[];
}

type RetryError = Error & {
  status?: number;
  code?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatResponse>
) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Validate environment variables
    if (!process.env.OPENAI_API_KEY || !process.env.PINECONE_API_KEY || !process.env.PINECONE_INDEX) {
      throw new Error('Missing required environment variables')
    }

    const { messages } = req.body
    if (!messages?.length) {
      return res.status(400).json({ error: 'No messages provided' })
    }

    // Initialize Pinecone with error handling
    const pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
      environment: process.env.PINECONE_ENVIRONMENT!
    })

    const index = pc.index(process.env.PINECONE_INDEX!)

    // Create embeddings
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    })

    const queryEmbedding = await embeddings.embedQuery(messages[messages.length - 1].content)

    // Query Pinecone
    const queryResponse = await index.query({
      vector: queryEmbedding,
      topK: 3,
      includeMetadata: true
    })

    const relevantContent = queryResponse.matches
      ?.map(match => match.metadata?.text)
      .filter(Boolean)
      .join('\n\n')

    // Generate response with context
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are Berto Mill's AI assistant. Use this context to answer questions about Berto's projects:\n${relevantContent}`
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500
    })

    return res.status(200).json({
      message: completion.choices[0].message.content,
      sources: queryResponse.matches
        ?.map(match => match.metadata?.source)
        .filter(Boolean)
    })

  } catch (error) {
    console.error('Chat API Error:', error)
    
    // Specific error handling
    if (error instanceof Error) {
      if (error.message.includes('timeout')) {
        return res.status(504).json({
          error: 'Request timed out',
          message: 'The request took too long. Please try again.'
        })
      }
      
      if (error.message.includes('rate limit')) {
        return res.status(429).json({
          error: 'Rate limit exceeded',
          message: 'Too many requests. Please wait a moment and try again.'
        })
      }
    }

    return res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong. Please try again.'
    })
  }
}