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
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 30000)
    })

    const chatPromise = async (): Promise<ChatResponse> => {
      try {
        console.log('Starting chat process...')
        const { messages } = req.body
        console.log('Latest message:', messages[messages.length - 1].content)

        const retryOperation = async <T>(
          operation: () => Promise<T>,
          maxRetries = 3
        ): Promise<T> => {
          for (let i = 0; i < maxRetries; i++) {
            try {
              return await operation()
            } catch (error) {
              if (i === maxRetries - 1) throw error
              await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)))
            }
          }
          throw new Error('Operation failed after retries')
        }

        if (!messages || !Array.isArray(messages)) {
          return { error: 'Messages array is required' }
        }

        // Create embedding
        console.log('Creating embedding...')
        const embeddings = new OpenAIEmbeddings({
          openAIApiKey: process.env.OPENAI_API_KEY,
        })
        
        const queryEmbedding = await retryOperation(() => 
          embeddings.embedQuery(messages[messages.length - 1].content)
        )
        console.log('Embedding created successfully')

        const pc = new Pinecone({
          apiKey: process.env.PINECONE_API_KEY!
        })

        const index = pc.index(process.env.PINECONE_INDEX!)
        
        const results = await retryOperation(async () => {
          try {
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
          } catch (error) {
            console.error('Pinecone query error:', error)
            throw error
          }
        })
        console.log('Pinecone query successful, matches:', results.matches?.length || 0)

        const relevantContent = results.matches?.map(match => match.metadata?.text).join('\n\n')
        
        // Generate OpenAI response
        console.log('Generating OpenAI response...')
        const completion = await retryOperation(async () => {
          try {
            // If no relevant content found, use a fallback prompt
            const systemContent = relevantContent 
              ? `You are Berto Mill's AI assistant. You help answer questions about Berto's work, projects, and experience. 
                 Use the following content to inform your answers, and if you don't know something, be honest about it:
                 ${relevantContent}`
              : `You are Berto Mill's AI assistant. You help answer questions about Berto's work, projects, and experience. 
                 I don't have specific information about this topic, so please be honest about limitations.`

            const response = await openai.chat.completions.create({
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

            if (!response.choices || response.choices.length === 0) {
              throw new Error('No response from OpenAI')
            }

            return response
          } catch (error) {
            console.error('OpenAI completion error:', error)
            throw error
          }
        })
        console.log('OpenAI response generated successfully')

        // First, let's check if we have a valid response
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

    const result = await Promise.race([
      chatPromise(),
      timeoutPromise
    ]) as ChatResponse

    if (result.error) {
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