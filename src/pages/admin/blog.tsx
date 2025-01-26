import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '../../components/Layout'
import { Calendar, Edit, LogOut, Plus } from 'lucide-react'
import Link from 'next/link'
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

interface AdminBlogProps {
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
    }
  }
}

export default function AdminBlog({ posts }: AdminBlogProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-emerald-500"></div>
        </div>
      </Layout>
    )
  }

  if (!session) {
    return null
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Manage Blog Posts</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
            <Link
              href="/admin/blog/new"
              className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              New Post
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          {posts.map(post => (
            <div
              key={post.slug}
              className="flex items-center justify-between p-4 bg-white dark:bg-stone-800 rounded-lg shadow-sm"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">{post.frontMatter.title}</h2>
                <div className="flex items-center text-stone-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  <time>{new Date(post.frontMatter.date).toLocaleDateString()}</time>
                </div>
              </div>
              <Link
                href={`/admin/blog/edit/${post.slug}`}
                className="flex items-center gap-2 text-emerald-500 hover:text-emerald-600"
              >
                <Edit className="w-5 h-5" />
                Edit
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
} 