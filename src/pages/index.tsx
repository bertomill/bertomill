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
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-4">
              <h1 className="text-4xl font-bold">
                Hi, I&apos;m Berto Mill
              </h1>
              <p className="text-lg text-stone-400">
                I&apos;m a consultant and developer specializing in AI applications. Welcome to my corner of the web where I share my projects, thoughts, and interests.
              </p>
            </div>
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-emerald-500/20">
              <Image
                src="/Berto Headshot.jpeg"
                alt="Berto Mill"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Featured Projects Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-medium flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-emerald-500" />
                Featured Projects
              </h2>
              <Link 
                href="/fintech-radar" 
                className="flex items-center gap-2 text-emerald-500 hover:text-emerald-400 transition-colors"
              >
                Try Fintech Radar
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {featuredProjects.map((project) => (
                <div key={project.title} className="group">
                  <div className="h-full radix-card p-4 space-y-4 hover:border-emerald-500/50 transition-colors">
                    <div className="relative aspect-video rounded-lg overflow-hidden border border-stone-800">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium">{project.title}</h3>
                      <p className="mt-2 text-sm text-stone-400">{project.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-500"
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
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PenTool className="w-6 h-6 text-emerald-500" />
                <h2 className="text-2xl font-medium">Latest Articles</h2>
              </div>
              <Link href="/blog" className="text-sm text-emerald-500 hover:text-emerald-400 transition-colors flex items-center gap-1">
                Read more
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {featuredArticles.map((article) => (
                <Link
                  key={article.link}
                  href={`/blog/${encodeURIComponent(article.link.split('?')[0].split('/').pop() || '')}`}
                  className="block group"
                >
                  <article className="h-full radix-card overflow-hidden hover:border-emerald-500/50 transition-colors">
                    {article.image && (
                      <div className="relative aspect-[16/9] border-b border-stone-800">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-medium group-hover:text-emerald-500 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <ArrowUpRight className="w-5 h-5 text-stone-500 group-hover:text-emerald-500 transition-colors flex-shrink-0" />
                      </div>

                      <p className="text-sm text-stone-400 line-clamp-2">
                        {article.contentSnippet}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {article.categories.slice(0, 2).map((category) => (
                          <span
                            key={category}
                            className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/10 text-emerald-500"
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
          <div className="grid gap-6 md:grid-cols-2">
            {/* Blog Card */}
            <Link href="/blog" className="group">
              <div className="h-full radix-card p-6 space-y-4 hover:border-emerald-500/50 transition-colors">
                <div className="flex items-center gap-2">
                  <PenTool className="w-5 h-5 text-emerald-500" />
                  <h2 className="text-xl font-medium">Blog</h2>
                </div>
                <p className="text-stone-400">
                  Read about my thoughts and experiences.
                </p>
              </div>
            </Link>

            {/* About Card */}
            <Link href="/about" className="group">
              <div className="h-full radix-card p-6 space-y-4 hover:border-emerald-500/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                  <h2 className="text-xl font-medium">About</h2>
                </div>
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