import { OpenAIEmbeddings } from '@langchain/openai'
import { Pinecone } from '@pinecone-database/pinecone'
import { config } from 'dotenv'

// Load environment variables from .env.local
config({ path: '.env.local' })

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

async function queryContent() {
  console.log('Initializing Pinecone...')
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!
  })

  const index = pc.index(process.env.PINECONE_INDEX!)

  console.log('Fetching all vectors...')
  const results = await index.query({
    vector: Array(1536).fill(0), // Zero vector to match all documents
    topK: 10000,
    includeValues: false,
    includeMetadata: true
  })

  console.log('\nAll vectors in the index:')
  results.matches?.forEach((match, i) => {
    const text = match.metadata?.text as string
    console.log(`\n${i + 1}. ID: ${match.id}`)
    console.log(`Source: ${match.metadata?.source}`)
    console.log(`Type: ${match.metadata?.type}`)
    if (text) {
      console.log(`Text preview: ${text.substring(0, 100)}...`)
    }
  })
}

queryContent().catch(console.error) 