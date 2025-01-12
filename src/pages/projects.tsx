import Head from 'next/head'
import Layout from '../components/Layout'
import { ExternalLink, Github, Sparkles, Database, Bot } from 'lucide-react'
import Image from 'next/image'

interface Project {
  title: string
  description: string
  technologies: string[]
  features: string[]
  liveUrl?: string
  githubUrl?: string
  image?: string
}

const projects: Project[] = [
  {
    title: "Canadian Financial News Tracker",
    description: "An AI-powered application that tracks and analyzes news and updates from major Canadian financial institutions. The system uses advanced AI to score and summarize financial news, providing real-time insights for users.",
    technologies: [
      "TypeScript",
      "Python",
      "Next.js 14",
      "OpenAI API",
      "PostgreSQL",
      "Vercel",
      "Puppeteer",
      "TailwindCSS"
    ],
    features: [
      "Real-time news tracking from major Canadian banks (RBC, TD, BMO, Scotia, CIBC)",
      "AI-powered scoring system (0-100%) for news relevance",
      "Automated news summarization using OpenAI's GPT models",
      "Interactive filtering and bank selection",
      "Responsive dashboard interface",
      "Automated web scraping with Puppeteer"
    ],
    liveUrl: "https://canadian-financial-news-tracker.vercel.app/",
    githubUrl: "https://github.com/bertomill/Canadian-Financial-News-Tracker",
    image: "/Cdn-Bank-Tracker.png"
  },
  {
    title: "Fintech Radar",
    description: "An AI-powered fintech news analysis platform that quickly distills and analyzes innovation trends in the financial industry. The application helps users stay ahead of fintech developments by providing concise, AI-generated insights.",
    technologies: [
      "TypeScript",
      "Next.js 14",
      "OpenAI API",
      "PostgreSQL",
      "Vercel",
      "TailwindCSS",
      "Puppeteer",
      "daisyUI"
    ],
    features: [
      "Real-time fintech news aggregation and analysis",
      "AI-powered trend identification and categorization",
      "Innovation scoring system for fintech developments",
      "Automated summarization of complex financial news",
      "Interactive dashboard with filtering capabilities",
      "Daily digest of key fintech innovations"
    ],
    liveUrl: "https://fintech-radar.vercel.app",
    githubUrl: "https://github.com/bertomill/fintech-radar",
    image: "/Fintech Radar.png"
  }
]

export default function Projects() {
  return (
    <Layout>
      <Head>
        <title>AI Projects - Berto Mill</title>
        <meta name="description" content="Explore my AI applications and projects" />
      </Head>

      <div className="max-w-5xl mx-auto space-y-8 px-4">
        <div className="space-y-4">
          <h1 className="text-3xl font-medium flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-emerald-500" />
            AI Projects
          </h1>
          <p className="text-lg text-stone-400">
            Here are my AI applications that solve real-world problems using cutting-edge technology.
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <div key={index} className="radix-card overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Thumbnail */}
                {project.image && (
                  <div className="md:w-1/2 border-b md:border-b-0 md:border-r border-stone-800 md:min-h-[600px]">
                    <div className="relative h-full">
                      <Image 
                        src={project.image} 
                        alt={project.title} 
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                )}
                
                {/* Content */}
                <div className="flex-1 p-4 space-y-3">
                  <div>
                    <h2 className="text-xl font-medium text-stone-100">{project.title}</h2>
                    <p className="mt-1 text-sm text-stone-400 leading-relaxed">{project.description}</p>
                  </div>
                  
                  {/* Technologies */}
                  <div className="space-y-1.5">
                    <h3 className="text-xs font-medium flex items-center gap-2 text-stone-300">
                      <Database className="w-3 h-3" />
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex} 
                          className="px-1.5 py-0.5 text-xs rounded-full bg-emerald-900/30 text-emerald-300 border border-emerald-800/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-1.5">
                    <h3 className="text-xs font-medium flex items-center gap-2 text-stone-300">
                      <Bot className="w-3 h-3" />
                      Key Features
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-stone-400 text-xs">
                      {project.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-stone-600 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="radix-button text-xs py-1.5"
                      >
                        <Github className="w-3 h-3 mr-1.5" />
                        View Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="radix-button radix-button-primary text-xs py-1.5"
                      >
                        <ExternalLink className="w-3 h-3 mr-1.5" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
} 