import Head from 'next/head'
import Layout from '../components/Layout'
import { ExternalLink, Github, Sparkles, Database, Bot } from 'lucide-react'

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
    image: "/CNFT.jpeg"
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
                  <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-stone-800">
                    <div className="relative aspect-video md:aspect-square">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                
                {/* Content */}
                <div className="flex-1 p-6 space-y-4">
                  <div>
                    <h2 className="text-2xl font-medium text-stone-100">{project.title}</h2>
                    <p className="mt-2 text-stone-400 leading-relaxed">{project.description}</p>
                  </div>
                  
                  {/* Technologies */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium flex items-center gap-2 text-stone-300">
                      <Database className="w-4 h-4" /> Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex} 
                          className="px-2 py-1 text-xs rounded-full bg-emerald-900/30 text-emerald-300 border border-emerald-800/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium flex items-center gap-2 text-stone-300">
                      <Bot className="w-4 h-4" /> Key Features
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-stone-400 text-sm">
                      {project.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-stone-600 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="radix-button"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="radix-button radix-button-primary"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
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