import Head from 'next/head'
import Layout from '../../components/Layout'
import Link from 'next/link'
import { PenTool } from 'lucide-react'

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readingTime: string
}

const posts: BlogPost[] = [
  {
    slug: 'welcome-to-tell-day',
    title: 'Welcome to Tell Day Blog',
    excerpt: 'A place where I share my thoughts and experiences...',
    date: new Date().toISOString(),
    readingTime: '2 min read'
  }
]

export default function Blog() {
  return (
    <Layout>
      <Head>
        <title>Tell Day Blog - Berto Mill</title>
        <meta name="description" content="My daily thoughts and experiences" />
      </Head>

      <div className="max-w-4xl mx-auto space-y-8 px-4">
        <div className="space-y-4">
          <h1 className="text-3xl font-medium flex items-center gap-2">
            <PenTool className="w-6 h-6 text-emerald-500" />
            Tell Day Blog
          </h1>
          <p className="text-lg text-stone-400">
            Sharing my daily thoughts and experiences
          </p>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block"
            >
              <article className="radix-card p-6 space-y-4 hover:bg-stone-800/50">
                <h2 className="text-2xl font-medium text-stone-100">{post.title}</h2>
                <p className="text-stone-400">{post.excerpt}</p>
                <div className="text-sm text-stone-500">
                  <time>{new Date(post.date).toLocaleDateString()}</time>
                  <span className="mx-2">·</span>
                  <span>{post.readingTime}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
} 