import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { PenTool, Calendar, Clock, ChevronRight } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  readingTime: string
  slug: string
}

// This will be replaced with actual data from your markdown files or CMS
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with AI Development',
    excerpt: 'My journey into AI development and what I've learned so far...',
    date: '2024-01-20',
    readingTime: '5 min read',
    slug: 'getting-started-with-ai-development'
  },
  // Add more blog posts here
]

export default function Blog() {
  return (
    <Layout>
      <Head>
        <title>Tell Day - Berto Mill</title>
        <meta name="description" content="My daily thoughts and experiences in AI development and life" />
      </Head>

      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold flex items-center gap-2">
            <PenTool className="w-8 h-8" />
            Tell Day
          </h1>
          <p className="text-lg opacity-90">
            Welcome to Tell Day - where I share my daily journey, thoughts, and discoveries.
          </p>
        </div>

        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog/${post.slug}`}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="card-body">
                <h2 className="card-title text-2xl">{post.title}</h2>
                <p className="opacity-75">{post.excerpt}</p>
                <div className="flex items-center gap-4 mt-4 text-sm opacity-75">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readingTime}
                  </span>
                </div>
                <div className="card-actions justify-end mt-4">
                  <span className="text-primary flex items-center gap-1">
                    Read more <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
} 