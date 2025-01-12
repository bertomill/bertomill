import Head from 'next/head'
import Layout from '../../components/Layout'
import { PenTool, Calendar, ArrowUpRight } from 'lucide-react'
import { GetStaticProps } from 'next'
import Parser from 'rss-parser'
import Image from 'next/image'
import Link from 'next/link'

interface Post {
  title: string
  link: string
  pubDate: string
  contentSnippet: string
  categories: string[]
  creator: string
  image: string | null
}

interface BlogProps {
  posts: Post[]
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const parser = new Parser({
      customFields: {
        item: ['content:encoded']
      }
    })
    const feed = await parser.parseURL('https://medium.com/@robertmill/feed')
    
    const posts = feed.items.map(item => {
      // Log the full content for debugging
      console.log('Article content:', item['content:encoded'])
      
      // Try to extract image from content:encoded field
      let image = null;
      const content = item['content:encoded'] as string
      
      if (content) {
        // First try to find the first figure image (usually the main article image)
        const figureMatch = content.match(/<figure>.*?<img.*?src="([^"]+)".*?<\/figure>/)
        if (figureMatch) {
          image = figureMatch[1]
          console.log('Found figure image:', image)
        }
        
        // If no figure image, try to find any image
        if (!image) {
          const imgMatch = content.match(/<img.*?src="([^"]+)".*?>/)
          if (imgMatch) {
            image = imgMatch[1]
            console.log('Found regular image:', image)
          }
        }
        
        // Clean up image URL
        if (image) {
          // Remove size parameters but keep essential query params
          image = image.replace(/\/max\/\d+\//, '/max/1600/')
          console.log('Final image URL:', image)
        }
      }

      // Clean up content snippet
      const cleanSnippet = (item.contentSnippet || '')
        .replace(/<[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim()

      return {
        title: item.title || '',
        link: item.link || '',
        pubDate: item.pubDate || new Date().toISOString(),
        contentSnippet: cleanSnippet,
        categories: item.categories || [],
        creator: item.creator || '',
        image
      }
    })

    return {
      props: {
        posts
      },
      revalidate: 3600
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return {
      props: {
        posts: []
      },
      revalidate: 60
    }
  }
}

export default function Blog({ posts }: BlogProps) {
  return (
    <Layout>
      <Head>
        <title>Blog - Berto Mill</title>
        <meta name="description" content="Read my latest thoughts and experiences on technology, AI, and more." />
      </Head>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-12">
          <div>
            <h1 className="text-3xl font-medium flex items-center gap-2">
              <PenTool className="w-6 h-6 text-emerald-500" />
              Blog
            </h1>
            <p className="mt-4 text-lg text-stone-400">
              My thoughts and experiences on technology, AI, and more. Originally published on Medium.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.link}
                href={`/blog/${encodeURIComponent(post.link.split('?')[0].split('/').pop() || '')}`}
                className="block group cursor-pointer"
                onClick={(e) => {
                  console.log('Clicked article:', post.title);
                  console.log('Link:', post.link);
                  console.log('Generated slug:', post.link.split('?')[0].split('/').pop());
                }}
              >
                <article className="h-full radix-card overflow-hidden hover:border-emerald-500/50 transition-colors">
                  {post.image && (
                    <div className="relative aspect-[16/9] border-b border-stone-800">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-lg font-medium group-hover:text-emerald-500 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <ArrowUpRight className="w-5 h-5 text-stone-500 group-hover:text-emerald-500 transition-colors flex-shrink-0" />
                    </div>

                    <p className="text-sm text-stone-400 line-clamp-2">
                      {post.contentSnippet}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 text-sm text-stone-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.pubDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      {post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {post.categories.slice(0, 2).map((category) => (
                            <span
                              key={category}
                              className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/10 text-emerald-500"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
} 