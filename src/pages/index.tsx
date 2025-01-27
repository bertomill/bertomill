import Head from 'next/head'
import Layout from '@/components/Layout'
import Image from 'next/image'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import Parser from 'rss-parser'
import Script from 'next/script'
import { motion } from 'framer-motion'
import GradientBackground from '@/components/GradientBackground'

interface Project {
  title: string
  description: string
  image: string
  link: string
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
      link: "/projects/canadian-financial-news-tracker",
      technologies: ["TypeScript", "Python", "Next.js", "OpenAI", "PostgreSQL", "Vercel"]
    },
    {
      title: "Fintech Radar",
      description: "AI-powered fintech news analysis platform that quickly distills and analyzes innovation trends in the financial industry.",
      image: "/Fintech Radar.png",
      link: "/projects/fintech-radar",
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
    const feed = await parser.parseURL('https://bertomill.medium.com/feed')
    
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

      <GradientBackground />
      
      <div className="min-h-screen flex flex-col justify-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 px-6 lg:px-8 max-w-6xl mx-auto"
        >
          <div className="mx-auto max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl font-bold tracking-tight text-white sm:text-8xl mb-8"
            >
              Hi, I&apos;m Berto Mill
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-gray-300 leading-8 mb-12"
            >
              I&apos;m a consultant and developer specializing in AI applications. Welcome to my corner of the web where I share my projects, thoughts, and interests.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex gap-4"
            >
              <Link 
                href="/projects"
                className="rounded-lg px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors"
              >
                View Projects
              </Link>
              <Link
                href="/blog"
                className="rounded-lg px-6 py-3 border border-gray-600 hover:border-emerald-500 text-gray-300 hover:text-emerald-500 font-medium transition-colors"
              >
                Read Blog
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 hidden lg:block"
        >
          <div className="relative w-96 h-96">
            <Image
              src="/profile.jpg"
              alt="Berto Mill"
              fill
              className="rounded-full object-cover"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(16, 185, 129, 0.2))'
              }}
            />
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="py-24 px-6 lg:px-8"
      >
        <h2 className="text-4xl font-bold mb-12 text-white">Featured Projects</h2>
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
      </motion.div>

      <Script
        src="https://platform.linkedin.com/badges/js/profile.js"
        strategy="lazyOnload"
        async
        defer
      />
    </Layout>
  )
}