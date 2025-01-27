import { Calendar, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Parser from 'rss-parser'
import Layout from '../../components/Layout'

interface LocalPost {
  slug: string
  frontMatter: {
    title: string
    date: string
    excerpt?: string
  }
}

interface MediumPost {
  title: string
  link: string
  date: string
  content: string
  image?: string
}

interface BlogProps {
  localPosts: LocalPost[]
  mediumPosts: MediumPost[]
}

// Add configuration for external images
const imageLoader = ({ src }: { src: string }) => {
  return src
}

export async function getStaticProps() {
  // Get local MDX posts
  const postsDirectory = path.join(process.cwd(), 'src/content/blog')
  const filenames = fs.readdirSync(postsDirectory)
  
  const localPosts = filenames.map(filename => {
    const filePath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)
    
    return {
      slug: filename.replace('.mdx', ''),
      frontMatter: {
        ...data,
        date: new Date(data.date).toISOString() // Convert date to ISO string for serialization
      }
    }
  })

  // Get Medium posts
  let mediumPosts = [];
  try {
    const parser = new Parser({
      timeout: 5000, // 5 second timeout
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BertoMillWebsite/1.0; +https://bertomill.com)'
      }
    });
    
    const mediumFeed = await parser.parseURL('https://medium.com/feed/@bertomill');
    
    mediumPosts = mediumFeed.items.map(item => {
      // Extract the first image from the content if available
      const imageMatch = item['content:encoded']?.match(/<img[^>]+src="([^">]+)"/)?.[1];
      
      return {
        title: item.title || '',
        link: item.link || '',
        date: new Date(item.pubDate || '').toISOString(),
        content: item.contentSnippet || '',
        image: imageMatch || item.enclosure?.url || null
      };
    }).sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.warn('Failed to fetch Medium posts:', error);
    // Continue with empty medium posts
  }

  // Return props with local posts and any medium posts we managed to fetch
  return {
    props: {
      localPosts: localPosts.sort((a, b) => 
        new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime()
      ),
      mediumPosts
    },
    // Revalidate every hour
    revalidate: 3600
  };
}

export default function Blog({ localPosts, mediumPosts }: BlogProps) {
  return (
    <Layout>
      <Head>
        <title>Blog | Berto Mill</title>
        <meta name="description" content="Blog posts and articles by Berto Mill" />
      </Head>
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        
        <div className="space-y-8">
          {/* Local MDX Posts */}
          {localPosts.map(post => (
            <article key={post.slug} className="border-b border-stone-200 dark:border-stone-700 pb-8">
              <Link href={`/blog/${post.slug}`} className="group">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-semibold group-hover:text-emerald-500 transition-colors">
                    {post.frontMatter.title}
                  </h2>
                  <span className="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-full">
                    Personal Blog
                  </span>
                </div>
                <div className="flex items-center text-stone-500 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  <time>{new Date(post.frontMatter.date).toLocaleDateString()}</time>
                </div>
                {post.frontMatter.excerpt && (
                  <p className="text-stone-600 dark:text-stone-400">{post.frontMatter.excerpt}</p>
                )}
              </Link>
            </article>
          ))}

          {/* Medium Posts */}
          {mediumPosts.map(post => (
            <article key={post.link} className="border-b border-stone-200 dark:border-stone-700 pb-8">
              <Link href={`/blog/medium/${encodeURIComponent(post.link)}`} className="group">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-semibold group-hover:text-emerald-500 transition-colors">
                    {post.title}
                  </h2>
                  <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-500 rounded-full flex items-center">
                    Medium <ExternalLink className="w-3 h-3 ml-1" />
                  </span>
                </div>
                <div className="flex items-center text-stone-500 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  <time>{new Date(post.date).toLocaleDateString()}</time>
                </div>
                {post.image && (
                  <div className="mb-4 overflow-hidden rounded-lg relative h-48">
                    <Image 
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      loader={imageLoader}
                      unoptimized
                    />
                  </div>
                )}
                <p className="text-stone-600 dark:text-stone-400">{post.content}</p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  )
} 