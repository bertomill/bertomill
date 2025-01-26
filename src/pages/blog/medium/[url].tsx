import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Layout from '../../../components/Layout'
import { Calendar } from 'lucide-react'
import Image from 'next/image'

interface MediumPostProps {
  title: string
  content: string
  date: string
  author: string
  image: string | null
}

// Add configuration for external images
const imageLoader = ({ src }: { src: string }) => {
  return src
}

export const getServerSideProps: GetServerSideProps<MediumPostProps> = async ({ params }) => {
  const url = decodeURIComponent(params?.url as string)
  
  try {
    // Fetch the Medium post content
    const response = await fetch(url)
    const xml = await response.text()
    
    // Find the relevant item in the RSS feed
    const itemMatch = xml.match(/<item>[\s\S]*?<title>\s*<!\[CDATA\[(.*?)\]\]>[\s\S]*?<\/item>/i)
    const contentMatch = xml.match(/<content:encoded>\s*<!\[CDATA\[(.*?)\]\]>/is)
    const authorMatch = xml.match(/<dc:creator>\s*<!\[CDATA\[(.*?)\]\]>/i)
    const dateMatch = xml.match(/<pubDate>(.*?)<\/pubDate>/i)
    
    // Extract the first image from content if available
    const imageMatch = contentMatch?.[1].match(/<img[^>]+src="([^">]+)"/i)
    
    // Clean up the content by removing unnecessary tags and adding styling
    const content = contentMatch ? contentMatch[1]
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      // Preserve paragraph and heading formatting
      .replace(/<p[^>]*>/gi, '<p class="mb-4">')
      .replace(/<h2[^>]*>/gi, '<h2 class="text-2xl font-semibold mt-8 mb-4">')
      .replace(/<h3[^>]*>/gi, '<h3 class="text-xl font-medium mt-6 mb-3">')
      // Preserve links
      .replace(/<a\b/gi, '<a class="text-emerald-500 hover:text-emerald-600 transition-colors"')
      // Remove Medium-specific classes and data attributes
      .replace(/\sclass="[^"]*"/g, '')
      .replace(/\sdata-[^=]*="[^"]*"/g, '')
      : ''

    // Format the date
    const date = dateMatch?.[1] 
      ? new Date(dateMatch[1]).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : new Date().toLocaleDateString()

    // Get the title from the item match
    const title = itemMatch?.[1]?.trim()

    return {
      props: {
        title: title || 'Untitled Post',
        content: content,
        date: date,
        author: authorMatch?.[1]?.trim() || 'Unknown Author',
        image: imageMatch?.[1] || null
      }
    }
  } catch (error) {
    console.error('Error fetching Medium post:', error)
    return {
      notFound: true
    }
  }
}

export default function MediumPost({ title, content, date, author, image }: MediumPostProps) {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <div className="flex items-center gap-4 text-stone-500 mb-8">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {date}
          </div>
          <div>By {author}</div>
        </div>
        {image && (
          <div className="relative w-full h-64 mb-8">
            <Image 
              src={image}
              alt=""
              fill
              className="rounded-lg object-cover"
              loader={imageLoader}
              unoptimized
            />
          </div>
        )}
        <div 
          className="prose prose-stone dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: content }} 
        />
      </div>
    </Layout>
  )
} 