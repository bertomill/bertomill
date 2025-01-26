import { Pinecone } from '@pinecone-database/pinecone'
import { config } from 'dotenv'

// Load environment variables from .env.local
config({ path: '.env.local' })

if (!process.env.PINECONE_API_KEY) {
  throw new Error('Missing PINECONE_API_KEY environment variable')
}

if (!process.env.PINECONE_ENVIRONMENT) {
  throw new Error('Missing PINECONE_ENVIRONMENT environment variable')
}

if (!process.env.PINECONE_INDEX) {
  throw new Error('Missing PINECONE_INDEX environment variable')
}

async function deleteVectors() {
  console.log('Initializing Pinecone...')
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!
  })

  const index = pc.index(process.env.PINECONE_INDEX!)

  console.log('Deleting all vectors...')
  await index.deleteAll()
  
  console.log('Done! All vectors have been deleted.')
  
  console.log('Checking index stats...')
  const stats = await index.describeIndexStats()
  console.log(stats)
}

deleteVectors().catch(console.error) 