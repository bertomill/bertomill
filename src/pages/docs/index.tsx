import { Calendar } from 'lucide-react'
import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/Layout'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface Doc {
  slug: string
  frontMatter: {
    title: string
    date: string
    excerpt?: string
  }
}

interface DocsProps {
  docs: Doc[]
}

export async function getStaticProps() {
  const docsDirectory = path.join(process.cwd(), 'src/content/docs') 
  const filenames = fs.readdirSync(docsDirectory)
  
  const docs = filenames.map(filename => {
    const filePath = path.join(docsDirectory, filename)
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
      docs: docs.sort((a, b) => 
        new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime()
      )
    },
    revalidate: 3600
  }
}

export default function Docs({ docs }: DocsProps) {
  return (
    <Layout>
      <Head>
        <title>Documentation | Berto Mill</title>
        <meta name="description" content="Documentation and information about me and my work." />
      </Head>

      <main className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <h1 className="text-3xl font-medium">Documentation</h1>
          
          <div className="grid gap-8">
            {docs.map((doc) => (
              <Link 
                key={doc.slug}
                href={`/docs/${doc.slug}`}
                className="block p-6 rounded-lg hover:bg-editor-bg/50 transition-colors"
              >
                <article className="space-y-2">
                  <h2 className="text-2xl font-medium text-editor-text">
                    {doc.frontMatter.title}
                  </h2>
                  <div className="flex items-center gap-2 text-editor-comment">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={doc.frontMatter.date}>
                      {new Date(doc.frontMatter.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  {doc.frontMatter.excerpt && (
                    <p className="text-editor-comment">{doc.frontMatter.excerpt}</p>
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
