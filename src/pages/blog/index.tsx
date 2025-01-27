import { Calendar } from 'lucide-react'
import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/Layout'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface Post {
  slug: string
  frontMatter: {
    title: string
    date: string
    excerpt?: string
  }
}

interface BlogProps {
  posts: Post[]
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'src/content/blog')
  const filenames = fs.readdirSync(postsDirectory)
  
  const posts = filenames.map(filename => {
    const filePath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)
    
    return {
      slug: filename.replace('.mdx', ''),
      frontMatter: {
        ...data,
        date: new Date(data.date).toISOString()
      }
    }
  })

  return {
    props: {
      posts: posts.sort((a, b) => 
        new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime()
      )
    },
    revalidate: 3600
  }
}

export default function Blog({ posts }: BlogProps) {
  return (
    <Layout>
      <Head>
        <title>Blog | Berto Mill</title>
        <meta name="description" content="Read my latest blog posts about technology, development, and more." />
      </Head>

      <main className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <h1 className="text-3xl font-medium">Blog</h1>
          
          <div className="grid gap-8">
            {posts.map((post) => (
              <Link 
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block p-6 rounded-lg hover:bg-editor-bg/50 transition-colors"
              >
                <article className="space-y-2">
                  <h2 className="text-2xl font-medium text-editor-text">
                    {post.frontMatter.title}
                  </h2>
                  <div className="flex items-center gap-2 text-editor-comment">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.frontMatter.date}>
                      {new Date(post.frontMatter.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  {post.frontMatter.excerpt && (
                    <p className="text-editor-comment">{post.frontMatter.excerpt}</p>
                  )}
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  )
}