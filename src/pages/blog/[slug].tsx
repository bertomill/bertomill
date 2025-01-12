import Head from 'next/head'
import Layout from '../../components/Layout'
import { GetStaticProps, GetStaticPaths } from 'next'
import Parser from 'rss-parser'
import { Calendar } from 'lucide-react'
import Image from 'next/image'

interface Post {
  title: string
  link: string
  pubDate: string
  content: string
  categories: string[]
  creator: string
  image: string | null
  slug: string
}

interface PostPageProps {
  post: Post
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const parser = new Parser()
    const feed = await parser.parseURL('https://medium.com/@robertmill/feed')
    
    const paths = feed.items.map(item => {
      // Extract slug from Medium URL (remove query parameters and get the last segment)
      const slug = item.link?.split('?')[0].split('/').pop() || ''
      console.log('Generated path for:', item.title, 'with slug:', slug)
      return {
        params: { slug }
      }
    })

    return {
      paths,
      fallback: 'blocking'
    }
  } catch (error) {
    console.error('Error fetching paths:', error)
    return {
      paths: [],
      fallback: 'blocking'
    }
  }
}

export const getStaticProps: GetStaticProps<PostPageProps> = async ({ params }) => {
  try {
    const parser = new Parser({
      customFields: {
        item: ['content:encoded']
      }
    })
    const feed = await parser.parseURL('https://medium.com/@robertmill/feed')
    
    const post = feed.items.find(item => {
      // Match slug by removing query parameters and getting the last segment
      const itemSlug = item.link?.split('?')[0].split('/').pop() || ''
      console.log('Comparing slugs:', itemSlug, params?.slug)
      return itemSlug === params?.slug
    })

    if (!post) {
      return {
        notFound: true
      }
    }

    // Extract image from content
    let image = null
    const content = post['content:encoded'] as string
    
    if (content) {
      const figureMatch = content.match(/<figure>.*?<img.*?src="([^"]+)".*?<\/figure>/)
      if (figureMatch) {
        image = figureMatch[1]
      } else {
        const imgMatch = content.match(/<img.*?src="([^"]+)".*?>/)
        if (imgMatch) {
          image = imgMatch[1]
        }
      }
      
      if (image) {
        image = image.replace(/\/max\/\d+\//, '/max/1600/')
      }
    }

    // Clean up the content
    const cleanContent = content
      .replace(/<figure>.*?<\/figure>/, '') // Remove the first image (we'll display it separately)
      .replace(/<img[^>]+src="([^">]+)"[^>]*>/g, (match, src) => {
        // Replace remaining img tags with next/image compatible markup
        return `<div class="relative aspect-[2/1] my-8">
          <img src="${src}" class="object-cover" style="width: 100%; height: 100%;" />
        </div>`
      })
      .replace(/<a\s+href="([^"]+)"([^>]*)>/g, (match, href, rest) => {
        // Add target="_blank" and rel="noopener noreferrer" to all links
        return `<a href="${href}" target="_blank" rel="noopener noreferrer"${rest}>`
      })

    return {
      props: {
        post: {
          title: post.title || '',
          link: post.link || '',
          pubDate: post.pubDate || new Date().toISOString(),
          content: cleanContent,
          categories: post.categories || [],
          creator: post.creator || '',
          image,
          slug: params?.slug as string
        }
      },
      revalidate: 3600
    }
  } catch (error) {
    console.error('Error fetching post:', error)
    return {
      notFound: true
    }
  }
}

export default function PostPage({ post }: PostPageProps) {
  return (
    <Layout>
      <Head>
        <title>{post.title} - Berto Mill</title>
        <meta name="description" content={post.title} />
      </Head>

      <article className="max-w-3xl mx-auto px-4 py-8">
        <header className="space-y-8">
          <h1 className="text-4xl font-bold">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-stone-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.pubDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            {post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <span
                    key={category}
                    className="px-2 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-500"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}
          </div>

          {post.image && (
            <div className="relative aspect-[2/1] rounded-xl overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>

        <div 
          className="prose prose-invert prose-emerald max-w-none mt-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </Layout>
  )
} 