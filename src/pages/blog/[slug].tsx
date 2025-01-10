import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import Head from 'next/head'

interface BlogPost {
  slug: string
  title: string
  content: string
  date: string
  readingTime: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  // For now, return empty paths until we have actual blog posts
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Type the params properly
  const { slug } = params as { slug: string }
  
  // For now, return dummy data
  return {
    props: {
      post: {
        slug,
        title: 'Sample Blog Post',
        content: 'Content coming soon...',
        date: new Date().toISOString(),
        readingTime: '5 min read'
      } as BlogPost
    }
  }
}

interface Props {
  post: BlogPost
}

export default function BlogPost({ post }: Props) {
  return (
    <Layout>
      <Head>
        <title>{post.title} - Tell Day Blog</title>
      </Head>
      <article className="prose prose-stone dark:prose-invert max-w-3xl mx-auto">
        <h1>{post.title}</h1>
        <div className="text-stone-400">
          <time>{new Date(post.date).toLocaleDateString()}</time>
          <span className="mx-2">·</span>
          <span>{post.readingTime}</span>
        </div>
        <div className="mt-8">{post.content}</div>
      </article>
    </Layout>
  )
} 