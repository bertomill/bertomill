import { NextApiRequest, NextApiResponse } from 'next'
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { messages } = req.body

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' })
    }

    const latestMessage = messages[messages.length - 1].content

    // Create embedding for the query
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    })
    
    const queryEmbedding = await embeddings.embedQuery(latestMessage)

    // Initialize Pinecone
    const pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!
    })

    const index = pc.index(process.env.PINECONE_INDEX!)

    // Query Pinecone
    const results = await index.query({
      vector: queryEmbedding,
      topK: 3,
      includeValues: false,
      includeMetadata: true
    })

    // Use OpenAI to generate a response based on the relevant content
    const relevantContent = results.matches?.map(match => match.metadata?.text).join('\n\n')
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are Berto Mill's AI assistant. You help answer questions about Berto's work, projects, and experience. 
Use the following content to inform your answers, and if you don't know something, be honest about it:

${relevantContent}

Keep your responses friendly and conversational, but professional. Use emojis sparingly if at all.`
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500
    })

    return res.status(200).json({
      message: completion.choices[0].message.content,
      sources: results.matches?.map(match => match.metadata?.source)
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}