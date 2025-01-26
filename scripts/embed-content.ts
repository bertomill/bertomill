import { OpenAIEmbeddings } from '@langchain/openai'
import { Document } from '@langchain/core/documents'
import { Pinecone } from '@pinecone-database/pinecone'
import { config } from 'dotenv'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

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

// Function to generate a deterministic ID based on source and content
function generateId(source: string, content: string): string {
  const hash = crypto.createHash('md5').update(`${source}:${content}`).digest('hex')
  return hash.substring(0, 8) // Use first 8 characters of hash
}

async function collectContent() {
  const content: Document[] = []
  
  // Read blog posts
  const postsDir = path.join(process.cwd(), 'src/content/blog')
  const postFiles = fs.readdirSync(postsDir)
  
  for (const file of postFiles) {
    if (file.endsWith('.mdx')) {
      const filePath = path.join(postsDir, file)
      const text = fs.readFileSync(filePath, 'utf-8')
      content.push(new Document({
        pageContent: text,
        metadata: { source: `blog/${file}`, type: 'blog' }
      }))
    }
  }

  // Add about section content
  const aboutContent = `
    Berto Mill is a software engineer and entrepreneur based in San Francisco.
    He is passionate about building products that help people learn and grow.
    He currently works on personal projects and writes about technology, entrepreneurship, and personal growth.
  `.trim()
  
  content.push(new Document({
    pageContent: aboutContent,
    metadata: { source: 'about', type: 'profile' }
  }))

  return content
}

async function embedContent() {
  console.log('Collecting content...')
  const docs = await collectContent()
  
  console.log('Creating embeddings...')
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  })

  console.log('Initializing Pinecone...')
  const pc = new Pinecone()

  const index = pc.index(process.env.PINECONE_INDEX!)

  console.log('Storing vectors in Pinecone...')
  for (const doc of docs) {
    const embedding = await embeddings.embedQuery(doc.pageContent)
    const id = generateId(doc.metadata.source, doc.pageContent)
    
    await index.upsert([{
      id,
      values: embedding,
      metadata: {
        text: doc.pageContent,
        source: doc.metadata.source,
        type: doc.metadata.type
      }
    }])
  }
  
  console.log('Done!')
  
  console.log('Checking index stats...')
  const stats = await index.describeIndexStats()
  console.log(stats)
}

embedContent().catch(console.error) 