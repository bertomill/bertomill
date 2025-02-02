import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAI } from 'openai'
import { OpenAIEmbeddings } from '@langchain/openai'
import { Pinecone } from '@pinecone-database/pinecone'

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
})

export const config = {
  api: {
    responseLimit: false,
    bodyParser: {
      sizeLimit: '1mb',
    },
    externalResolver: true,
  },
}

// First, let's define the response type
type ChatResponse = {
  message?: string;
  sources?: string[];
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    // Add request validation
    if (!process.env.OPENAI_API_KEY || !process.env.PINECONE_API_KEY || !process.env.PINECONE_INDEX) {
      console.error('Missing environment variables')
      return res.status(500).json({ 
        error: 'Server configuration error',
        message: "I'm having trouble connecting to my knowledge base. Please try again later."
      })
    }

    const chatPromise = async () => {
      try {
        console.log('Starting chat process...')
        const { messages } = req.body

        if (!messages || !Array.isArray(messages)) {
          return { error: 'Invalid message format' }
        }

        // Improved retry logic
        const retryOperation = async <T>(
          operation: () => Promise<T>,
          maxRetries = 3,
          delay = 1000
        ): Promise<T> => {
          let lastError: any
          
          for (let i = 0; i < maxRetries; i++) {
            try {
              return await operation()
            } catch (error) {
              console.error(`Attempt ${i + 1} failed:`, error)
              lastError = error
              if (i < maxRetries - 1) {
                await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)))
              }
            }
          }
          throw lastError
        }

        // Create embedding with better error handling
        console.log('Creating embedding...')
        const embeddings = new OpenAIEmbeddings({
          openAIApiKey: process.env.OPENAI_API_KEY,
          configuration: {
            timeout: 10000 // 10 second timeout
          }
        })
        
        let queryEmbedding
        try {
          queryEmbedding = await retryOperation(() => 
            embeddings.embedQuery(messages[messages.length - 1].content)
          )
          console.log('Embedding created successfully')
        } catch (error) {
          console.error('Embedding creation failed:', error)
          throw new Error('Failed to process your message')
        }

        // Initialize Pinecone with better error handling
        const pc = new Pinecone({
          apiKey: process.env.PINECONE_API_KEY!,
          timeout: 10000 // 10 second timeout
        })

        const index = pc.index(process.env.PINECONE_INDEX!)
        
        // Query Pinecone with better error handling
        let results
        try {
          results = await retryOperation(async () => {
            const queryResponse = await index.query({
              vector: queryEmbedding,
              topK: 3,
              includeValues: false,
              includeMetadata: true
            })
            
            if (!queryResponse.matches || queryResponse.matches.length === 0) {
              console.log('No matches found in Pinecone')
              return {
                matches: [],
                namespace: ''
              }
            }
            
            return queryResponse
          })
          console.log('Pinecone query successful, matches:', results.matches?.length || 0)
        } catch (error) {
          console.error('Pinecone query failed:', error)
          throw new Error('Unable to access knowledge base')
        }

        const relevantContent = results.matches?.map(match => match.metadata?.text).join('\n\n')
        
        // Generate OpenAI response with better error handling
        console.log('Generating OpenAI response...')
        let completion
        try {
          completion = await retryOperation(async () => {
            const systemContent = relevantContent 
              ? `You are Berto Mill's AI assistant. You help answer questions about Berto's work, projects, and experience. 
                 Use the following content to inform your answers, and if you don't know something, be honest about it:
                 ${relevantContent}`
              : `You are Berto Mill's AI assistant. You help answer questions about Berto's work, projects, and experience. 
                 I don't have specific information about this topic, so please be honest about limitations.`

            return await openai.chat.completions.create({
              model: 'gpt-4',
              messages: [
                {
                  role: 'system',
                  content: systemContent
                },
                ...messages
              ],
              temperature: 0.7,
              max_tokens: 500
            })
          })
          console.log('OpenAI response generated successfully')
        } catch (error) {
          console.error('OpenAI completion failed:', error)
          throw new Error('Failed to generate response')
        }

        if (!completion.choices[0]?.message?.content) {
          return {
            error: 'No valid response content from OpenAI',
            message: "I apologize, but I couldn't generate a response. Please try again."
          }
        }

        return {
          message: completion.choices[0].message.content,
          sources: results.matches
            ?.map(match => match.metadata?.source)
            .filter((source): source is string => typeof source === 'string') || []
        }
      } catch (error) {
        console.error('Chat process error:', error)
        throw error
      }
    }

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 15000)
    })

    const result = await Promise.race([
      chatPromise(),
      timeoutPromise
    ])

    if ('error' in result) {
      return res.status(400).json(result)
    }

    return res.status(200).json(result)
  } catch (err) {
    console.error('Chat API Error:', err)
    const isTimeout = err instanceof Error && err.message === 'Request timeout'
    const status = isTimeout ? 504 : 500
    
    return res.status(status).json({ 
      error: err instanceof Error ? err.message : 'Internal server error',
      message: isTimeout 
        ? "The request took too long to process. Please try a shorter message or try again later."
        : "I'm having trouble connecting right now. Please try again in a moment."
    })
  }
}