import { Calendar } from 'lucide-react'
import Head from 'next/head'
import Layout from '../../components/Layout'
import Parser from 'rss-parser'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface MediumPost {
  title: string
  link: string
  pubDate: string
  categories?: string[]
  content?: string
  contentSnippet?: string
  thumbnail?: string
}

interface BlogProps {
  posts: MediumPost[]
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

function extractFirstImage(content: string): string | undefined {
  const imgRegex = /<img[^>]+src="([^">]+)"/
  const match = content.match(imgRegex)
  return match ? match[1] : undefined
}

function createExcerpt(content: string, length: number = 200): string {
  // Remove HTML tags and get plain text
  const text = content.replace(/<[^>]*>/g, '')
  // Get first n characters
  return text.slice(0, length) + (text.length > length ? '...' : '')
}

export async function getStaticProps() {
  const parser = new Parser({
    customFields: {
      item: ['content:encoded']
    }
  })
  const MEDIUM_RSS_URL = 'https://medium.com/feed/@bertomill'
  
  try {
    const feed = await parser.parseURL(MEDIUM_RSS_URL)
    const posts = feed.items.map(item => {
      const content = item['content:encoded'] as string
      return {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        categories: item.categories,
        content: content,
        contentSnippet: createExcerpt(content),
        thumbnail: extractFirstImage(content)
      }
    })

    return {
      props: {
        posts
      },
      revalidate: 3600
    }
  } catch (error) {
    console.error('Error fetching Medium posts:', error)
    return {
      props: {
        posts: []
      }
    }
  }
}

export default function Blog({ posts }: BlogProps) {
  const featuredPost = posts[0]
  const remainingPosts = posts.slice(1)

  return (
    <Layout>
      <Head>
        <title>Blog | Berto Mill</title>
        <meta name="description" content="Read my latest blog posts from Medium" />
      </Head>

      <main className="min-h-screen py-20 relative">
        {/* Organic background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-stone-200">
              <animate attributeName="d" dur="20s" repeatCount="indefinite"
                values="M0,50 Q25,30 50,50 T100,50;
                        M0,50 Q25,70 50,50 T100,50;
                        M0,50 Q25,30 50,50 T100,50" />
            </path>
            <path d="M0,30 Q25,50 50,30 T100,30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-stone-200">
              <animate attributeName="d" dur="25s" repeatCount="indefinite"
                values="M0,30 Q25,50 50,30 T100,30;
                        M0,30 Q25,10 50,30 T100,30;
                        M0,30 Q25,50 50,30 T100,30" />
            </path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-normal mb-16 text-stone-100 relative"
          >
            Featured Articles
            <div className="absolute -bottom-4 left-0 w-24 h-1 bg-emerald-500/20 rounded-full"></div>
          </motion.h1>

          {featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-20"
            >
              <a
                href={featuredPost.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <article className="grid md:grid-cols-2 gap-8 p-8 rounded-3xl bg-gradient-to-br from-stone-900/50 to-stone-800/30 hover:from-stone-800/50 hover:to-stone-700/30 transition-all duration-500 border border-stone-800">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <h2 className="text-3xl font-normal text-stone-100 group-hover:text-emerald-400 transition-colors">
                        {featuredPost.title}
                      </h2>
                      <div className="flex items-center gap-2 text-stone-400">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={featuredPost.pubDate} className="font-light">
                          {new Date(featuredPost.pubDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                      </div>
                    </div>
                    <p className="text-stone-400 line-clamp-3 font-light leading-relaxed">
                      {featuredPost.contentSnippet}
                    </p>
                    {featuredPost.categories && featuredPost.categories.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {featuredPost.categories.map(category => (
                          <span 
                            key={category} 
                            className="px-4 py-1 text-sm rounded-full bg-emerald-900/20 text-emerald-400/90 border border-emerald-800/30 font-light"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {featuredPost.thumbnail && (
                    <div className="relative hidden md:block w-full h-full min-h-[300px] rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                      <Image
                        src={featuredPost.thumbnail}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                </article>
              </a>
            </motion.div>
          )}

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 gap-8"
          >
            {remainingPosts.map((post) => (
              <motion.div key={post.link} variants={item}>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full"
                >
                  <article className="h-full p-6 rounded-2xl bg-gradient-to-br from-stone-900/50 to-stone-800/30 hover:from-stone-800/50 hover:to-stone-700/30 transition-all duration-500 border border-stone-800">
                    {post.thumbnail && (
                      <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                        <Image
                          src={post.thumbnail}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h2 className="text-2xl font-normal text-stone-100 group-hover:text-emerald-400 transition-colors">
                          {post.title}
                        </h2>
                        <div className="flex items-center gap-2 text-stone-400">
                          <Calendar className="w-4 h-4" />
                          <time dateTime={post.pubDate} className="font-light">
                            {new Date(post.pubDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </time>
                        </div>
                      </div>
                      <p className="text-stone-400 line-clamp-3 font-light leading-relaxed">
                        {post.contentSnippet}
                      </p>
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex gap-2 flex-wrap">
                          {post.categories.map(category => (
                            <span 
                              key={category} 
                              className="px-4 py-1 text-sm rounded-full bg-emerald-900/20 text-emerald-400/90 border border-emerald-800/30 font-light"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </Layout>
  )
}