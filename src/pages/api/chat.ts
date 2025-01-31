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
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 30000)
    })

    const chatPromise = async () => {
      const { messages } = req.body

      const retryOperation = async (operation: () => Promise<any>, maxRetries = 3) => {
        for (let i = 0; i < maxRetries; i++) {
          try {
            return await operation()
          } catch (error) {
            if (i === maxRetries - 1) throw error
            await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)))
          }
        }
      }

      if (!messages || !Array.isArray(messages)) {
        return { error: 'Messages array is required' }
      }

      try {
        const embeddings = new OpenAIEmbeddings({
          openAIApiKey: process.env.OPENAI_API_KEY,
        })
        
        const queryEmbedding = await retryOperation(() => 
          embeddings.embedQuery(messages[messages.length - 1].content)
        )

        const pc = new Pinecone({
          apiKey: process.env.PINECONE_API_KEY!
        })

        const index = pc.index(process.env.PINECONE_INDEX!)
        
        const results = await retryOperation(() => 
          index.query({
            vector: queryEmbedding,
            topK: 3,
            includeValues: false,
            includeMetadata: true
          })
        )

        const relevantContent = results.matches?.map(match => match.metadata?.text).join('\n\n')
        
        const completion = await retryOperation(() => 
          openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
              {
                role: 'system',
                content: `You are Berto Mill's AI assistant. You help answer questions about Berto's work, projects, and experience. 
Use the following content to inform your answers, and if you don't know something, be honest about it:

${relevantContent}

Keep your responses friendly and conversational, but professional.`
              },
              ...messages
            ],
            temperature: 0.7,
            max_tokens: 500
          })
        )

        return {
          message: completion.choices[0].message.content,
          sources: results.matches?.map(match => match.metadata?.source)
        }
      } catch (error) {
        console.error('Specific operation error:', error)
        throw error
      }
    }

    const result = await Promise.race([
      chatPromise(),
      timeoutPromise
    ])

    if (result.error) {
      return res.status(400).json(result)
    }

    return res.status(200).json(result)
  } catch (err) {
    console.error('Chat API Error:', err)
    const isTimeout = err.message === 'Request timeout'
    const status = isTimeout ? 504 : 500
    
    return res.status(status).json({ 
      error: err.message || 'Internal server error',
      message: isTimeout 
        ? "The request took too long to process. Please try a shorter message or try again later."
        : "I'm having trouble connecting right now. Please try again in a moment."
    })
  }
}