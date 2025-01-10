import Head from 'next/head'
import Layout from '../../components/Layout'
import { PenTool, Calendar, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

// This will be replaced with actual data fetching
export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: 'getting-started-with-ai-development' } }
    ],
    fallback: false
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  // This will be replaced with actual data fetching
  return {
    props: {
      post: {
        title: 'Getting Started with AI Development',
        content: 'This is the full content of the blog post...',
        date: '2024-01-20',
        readingTime: '5 min read'
      }
    }
  }
}

export default function BlogPost({ post }: any) {
  return (
    <Layout>
      <Head>
        <title>{post.title} - Tell Day</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <article className="max-w-3xl mx-auto">
        <Link href="/blog" className="btn btn-ghost gap-2 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Tell Day
        </Link>

        <div className="prose dark:prose-invert max-w-none">
          <h1>{post.title}</h1>
          
          <div className="flex items-center gap-4 text-sm opacity-75 not-prose">
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

          <div className="mt-8">
            {post.content}
          </div>
        </div>
      </article>
    </Layout>
  )
} 