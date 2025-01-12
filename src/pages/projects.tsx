import Head from 'next/head'
import Layout from '../components/Layout'
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
      title: "Canadian Financial News Tracker",
      description: "An AI-powered application that tracks and analyzes news updates from major Canadian financial institutions. The system uses advanced AI to score and summarize financial news, providing real-time insights for users.",
      image: "/Cdn-Bank-Tracker.png",
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

      <div className="max-w-4xl mx-auto px-4 py-8">
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

          <div className="space-y-16">
            {projects.map((project) => (
              <div key={project.title} className="space-y-6">
                <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-emerald-500/20">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-2xl font-medium">{project.title}</h2>
                    <div className="flex gap-3">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 text-sm bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 text-sm border border-stone-800 text-stone-400 rounded-lg hover:text-stone-100 hover:border-stone-700 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          View Code
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-stone-400">{project.description}</p>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm rounded-full bg-emerald-500/10 text-emerald-500"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Key Features</h3>
                    <ul className="grid md:grid-cols-2 gap-2 text-stone-400">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
} 