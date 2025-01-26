import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Layout from '../../components/Layout'
import MDXContent from '../../components/MDXContent'

interface FrontMatter {
  title: string
  date: string
  excerpt?: string
}

interface BlogPostProps {
  frontMatter: FrontMatter
  mdxSource: MDXRemoteSerializeResult
}

export default function BlogPost({ frontMatter, mdxSource }: BlogPostProps) {
  return (
    <Layout>
      <Head>
        <title>{frontMatter.title} - Berto Mill</title>
      </Head>
      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{frontMatter.title}</h1>
          <time className="text-stone-400">
            {new Date(frontMatter.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </header>
        <MDXContent>
          <MDXRemote {...mdxSource} />
        </MDXContent>
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), 'src/content/blog')
  const filenames = await fs.promises.readdir(postsDirectory)
  
  const paths = await Promise.all(filenames
    .filter(filename => filename.endsWith('.mdx'))
    .map(async filename => ({
      params: {
        slug: filename.replace(/\.mdx$/, '')
      }
    })))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<BlogPostProps> = async ({ params }) => {
  const { slug } = params as { slug: string }
  const filePath = path.join(process.cwd(), 'src/content/blog', `${slug}.mdx`)
  const fileContents = await fs.promises.readFile(filePath, 'utf8')
  
  const { data, content } = matter(fileContents)
  const mdxSource = await serialize(content)
  
  return {
    props: {
      frontMatter: {
        title: data.title,
        date: new Date(data.date).toISOString(),
        excerpt: data.excerpt || null
      },
      mdxSource
    }
  }
} 