import { NextApiRequest, NextApiResponse } from 'next'
import { OpenAI } from 'openai'
import { Pinecone } from '@pinecone-database/pinecone'
import { OpenAIEmbeddings } from '@langchain/openai'

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

const requiredEnvVars = {
  'OPENAI_API_KEY': process.env.OPENAI_API_KEY,
  'PINECONE_API_KEY': process.env.PINECONE_API_KEY,
  'PINECONE_ENVIRONMENT': process.env.PINECONE_ENVIRONMENT,
  'PINECONE_INDEX': process.env.PINECONE_INDEX
}

const missingEnvVars = Object.entries(requiredEnvVars)
  .filter(([, value]) => !value)
  .map(([key]) => key)

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`)
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
      // @ts-expect-error Pinecone types are outdated but this property is required
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
      message: completion.choices[0].message?.content || '',
      sources: queryResponse.matches
        ?.map(match => match.metadata?.source)
        .filter((source): source is string => typeof source === 'string') || []
    })

  } catch (error) {
    const typedError = error as RetryError
    console.error('Chat API Error:', {
      error: typedError,
      message: typedError.message || 'Unknown error',
      status: typedError.status,
      code: typedError.code,
      stack: typedError.stack,
      envVarsSet: {
        openai: !!process.env.OPENAI_API_KEY,
        pineconeKey: !!process.env.PINECONE_API_KEY,
        pineconeEnv: !!process.env.PINECONE_ENVIRONMENT,
        pineconeIndex: !!process.env.PINECONE_INDEX
      }
    })
    
    // More specific error messages
    if (typedError instanceof Error) {
      if (typedError.message.includes('Pinecone')) {
        return res.status(500).json({
          error: 'Database connection error',
          message: 'Unable to access the knowledge base. Please try again.'
        })
      }
      if (typedError.message.includes('OpenAI')) {
        return res.status(500).json({
          error: 'AI service error',
          message: 'The AI service is currently unavailable. Please try again.'
        })
      }
      if (typedError.message.includes('environment')) {
        return res.status(500).json({
          error: 'Configuration error',
          message: 'The service is not properly configured. Please contact support.'
        })
      }
    }

    return res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong. Please try again.'
    })
  }
}