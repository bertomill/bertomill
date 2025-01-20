import Head from 'next/head'
import Layout from '../components/Layout'
import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, ArrowRight, PenTool, ArrowUpRight } from 'lucide-react'
import { GetStaticProps } from 'next'
import Parser from 'rss-parser'

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
}

interface Article {
  title: string
  link: string
  pubDate: string
  contentSnippet: string
  image: string | null
  categories: string[]
}

interface HomeProps {
  featuredProjects: Project[]
  featuredArticles: Article[]
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  // Featured projects data
  const featuredProjects: Project[] = [
    {
      title: "Canadian Financial News Tracker",
      description: "AI-powered application that tracks and analyzes news updates from major Canadian financial institutions.",
      image: "/Cdn-Bank-Tracker.png",
      technologies: ["TypeScript", "Python", "Next.js", "OpenAI", "PostgreSQL", "Vercel"]
    },
    {
      title: "Fintech Radar",
      description: "AI-powered fintech news analysis platform that quickly distills and analyzes innovation trends in the financial industry.",
      image: "/Fintech Radar.png",
      technologies: ["TypeScript", "Next.js", "OpenAI", "PostgreSQL", "Vercel"]
    }
  ]

  // Fetch Medium articles
  try {
    const parser = new Parser({
      customFields: {
        item: ['content:encoded']
      }
    })
    const feed = await parser.parseURL('https://medium.com/@robertmill/feed')
    
    const featuredArticles = feed.items.slice(0, 2).map(item => {
      // Try to extract image from content:encoded field
      let image = null;
      const content = item['content:encoded'] as string
      
      if (content) {
        // First try to find the first figure image (usually the main article image)
        const figureMatch = content.match(/<figure>.*?<img.*?src="([^"]+)".*?<\/figure>/)
        if (figureMatch) {
          image = figureMatch[1]
          console.log('Found figure image:', image)
        }
        
        // If no figure image, try to find any image
        if (!image) {
          const imgMatch = content.match(/<img.*?src="([^"]+)".*?>/)
          if (imgMatch) {
            image = imgMatch[1]
            console.log('Found regular image:', image)
          }
        }
        
        // Clean up image URL
        if (image) {
          // Remove size parameters but keep essential query params
          image = image.replace(/\/max\/\d+\//, '/max/1600/')
          console.log('Final image URL:', image)
        }
      }

      const cleanSnippet = (item.contentSnippet || '')
        .replace(/<[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 150) + '...'

      return {
        title: item.title || '',
        link: item.link || '',
        pubDate: item.pubDate || new Date().toISOString(),
        contentSnippet: cleanSnippet,
        image,
        categories: item.categories || []
      }
    })

    return {
      props: {
        featuredProjects,
        featuredArticles
      },
      revalidate: 3600
    }
  } catch (error) {
    console.error('Error fetching articles:', error)
    return {
      props: {
        featuredProjects,
        featuredArticles: []
      },
      revalidate: 60
    }
  }
}

export default function Home({ featuredProjects, featuredArticles }: HomeProps) {
  return (
    <Layout>
      <Head>
        <title>Berto Mill</title>
        <meta name="description" content="Welcome to my personal website" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-24">
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-16 pt-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-6xl font-medium tracking-tight">
                Hi, I'm Berto Mill
              </h1>
              <p className="text-lg text-stone-400 max-w-xl leading-relaxed">
                I'm a consultant and developer specializing in AI applications. Welcome to my corner of the web where I share my projects, thoughts, and interests.
              </p>
            </div>
            <div className="relative shrink-0">
              <Image
                src="/Berto Headshot.jpeg"
                alt="Berto Mill"
                width={200}
                height={200}
                className="rounded-2xl object-cover"
                priority
              />
            </div>
          </div>

          {/* Featured Projects Section */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-medium tracking-tight">Featured Projects</h2>
              <Link 
                href="/projects" 
                className="text-sm text-stone-400 hover:text-white transition-colors"
              >
                View all projects →
              </Link>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {featuredProjects.map((project) => (
                <div key={project.title} className="group">
                  <div className="space-y-4">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-900">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{project.title}</h3>
                      <p className="mt-2 text-sm text-stone-400">{project.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs text-stone-400 rounded-full bg-stone-900"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Articles Section */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-medium tracking-tight">Latest Articles</h2>
              <Link 
                href="/blog" 
                className="text-sm text-stone-400 hover:text-white transition-colors"
              >
                Read more →
              </Link>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {featuredArticles.map((article) => (
                <Link
                  key={article.link}
                  href={`/blog/${encodeURIComponent(article.link.split('?')[0].split('/').pop() || '')}`}
                  className="block group"
                >
                  <article className="space-y-4">
                    {article.image && (
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-900">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium group-hover:text-stone-400 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-stone-400 line-clamp-2">
                        {article.contentSnippet}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {article.categories.slice(0, 2).map((category) => (
                          <span
                            key={category}
                            className="px-3 py-1 text-xs text-stone-400 rounded-full bg-stone-900"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>

          {/* Navigation Cards */}
          <div className="grid gap-8 md:grid-cols-2">
            <Link href="/blog" className="group">
              <div className="p-8 rounded-2xl bg-stone-900 hover:bg-stone-800 transition-colors">
                <h2 className="text-xl font-medium mb-2">Blog</h2>
                <p className="text-stone-400">
                  Read about my thoughts and experiences.
                </p>
              </div>
            </Link>
            <Link href="/about" className="group">
              <div className="p-8 rounded-2xl bg-stone-900 hover:bg-stone-800 transition-colors">
                <h2 className="text-xl font-medium mb-2">About</h2>
                <p className="text-stone-400">
                  Learn more about my interests in fitness, books, and TV shows.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}