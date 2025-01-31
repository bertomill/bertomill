import Head from 'next/head'
import Layout from '@/components/Layout'
import Image from 'next/image'
import { Sparkles, ExternalLink, Github } from 'lucide-react'

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  features: string[]
  demoUrl?: string
  githubUrl?: string
}

export default function Projects() {
  const projects: Project[] = [
    {
      title: "Blog Buddies",
      description: "An app to help you read and write blogs with AI. The platform leverages artificial intelligence to enhance the blogging experience, making content creation and consumption more efficient and engaging.",
      image: "/blog-buddies.png",
      technologies: ["React", "OpenAI", "Python", "Java", "Supabase", "SQL", "GitHub", "Next.js", "TailwindCSS"],
      features: [
        "AI-powered blog writing assistance",
        "Smart content recommendations",
        "Automated content analysis",
        "Interactive writing interface",
        "Database integration with Supabase",
        "Modern, responsive design"
      ],
      demoUrl: "https://blogbuddies.vercel.app/",
      githubUrl: "https://github.com/bertomill/blog-buddy"
    },
    {
      title: "News Tracker",
      description: "An AI-powered application that tracks and analyzes news updates from major Canadian financial institutions. The system uses advanced AI to score and summarize financial news, providing real-time insights for users.",
      image: "/news_tracker.png",
      technologies: ["TypeScript", "Python", "Next.js 14", "OpenAI API", "PostgreSQL", "Vercel", "Puppeteer", "TailwindCSS"],
      features: [
        "Real-time news tracking from major Canadian banks (RBC, TD, BMO, Scotia, CIBC)",
        "AI-powered scoring system (0-100%) for news relevance",
        "Automated news summarization using OpenAI's GPT models",
        "Interactive filtering and bank selection",
        "Responsive dashboard interface",
        "Automated web scraping with Puppeteer"
      ],
      demoUrl: "https://canadian-financial-news-tracker.vercel.app/",
      githubUrl: "https://github.com/bertomill/Canadian-Financial-News-Tracker"
    },
    {
      title: "Fintech Radar",
      description: "An AI-powered fintech news analysis platform that quickly distills and analyzes innovation trends in the financial industry. The application helps users stay ahead of fintech developments by providing concise, AI-generated insights.",
      image: "/Fintech Radar.png",
      technologies: ["TypeScript", "Next.js 14", "OpenAI API", "PostgreSQL", "Vercel", "TailwindCSS", "Puppeteer", "daisyUI"],
      features: [
        "Real-time fintech news aggregation",
        "AI-powered trend analysis",
        "Automated insight generation",
        "Interactive visualization dashboard",
        "Custom filtering and categorization",
        "Daily email digests"
      ],
      demoUrl: "https://fintech-radar.vercel.app",
      githubUrl: "https://github.com/bertomill/fintech-radar"
    }
  ]

  return (
    <Layout>
      <Head>
        <title>Projects - Berto Mill</title>
        <meta name="description" content="Explore my AI applications and development projects" />
      </Head>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-12">
          <div>
            <h1 className="text-3xl font-medium flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-emerald-500" />
              AI Projects
            </h1>
            <p className="mt-4 text-lg text-stone-400">
              Here are my AI applications that solve real-world problems using cutting-edge technology.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div key={project.title} className="group">
                <article className="h-full radix-card overflow-hidden hover:border-emerald-500/50 transition-colors">
                  <div className="relative aspect-[16/9] border-b border-stone-800">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-xl font-medium group-hover:text-emerald-500 transition-colors">
                        {project.title}
                      </h2>
                      <div className="flex gap-2">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-stone-800 rounded-lg transition-colors"
                          >
                            <ExternalLink className="w-4 h-4 text-emerald-500" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-stone-800 rounded-lg transition-colors"
                          >
                            <Github className="w-4 h-4 text-stone-400 hover:text-stone-100" />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-stone-400 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/10 text-emerald-500"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/10 text-emerald-500">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>

                    <ul className="text-sm text-stone-400 space-y-1">
                      {project.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-emerald-500" />
                          {feature}
                        </li>
                      ))}
                      {project.features.length > 3 && (
                        <li className="text-stone-500 text-xs">
                          +{project.features.length - 3} more features
                        </li>
                      )}
                    </ul>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
} 