import Head from 'next/head'
import Layout from '@/components/Layout'
import Image from 'next/image'
import Link from 'next/link'
import { GetStaticProps } from 'next'
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

interface HomeProps {
  featuredProjects: Project[]
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

  return {
    props: {
      featuredProjects
    },
    revalidate: 3600
  }
}

export default function Home({ featuredProjects }: HomeProps) {
  return (
    <Layout>
      <Head>
        <title>Berto Mill</title>
        <meta name="description" content="AI Developer & Consultant" />
      </Head>

      <GradientBackground />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-black to-black" />
        </div>
        
        <div className="relative z-10 w-full">
          <div className="max-w-[90%] mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2 }}
              className="space-y-8"
            >
              <motion.h1 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="text-8xl md:text-[12rem] font-light tracking-tight leading-none"
              >
                2025
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.6 }}
                className="text-xl md:text-3xl font-light tracking-wide text-emerald-500 max-w-2xl"
              >
                SHAPING TOMORROW&apos;S TECHNOLOGY TODAY THROUGH CUTTING-EDGE AI INNOVATION
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Diagonal Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-stone-950 transform -skew-y-3 origin-left" />
      </section>

      {/* Projects Section */}
      <section className="relative bg-stone-950 py-32">
        <div className="max-w-[90%] mx-auto">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-7xl font-light tracking-tight mb-24"
          >
            FEATURED
            <br />
            PROJECTS
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-16">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className="group"
              >
                <Link href={project.link}>
                  <div className="space-y-6">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 to-black/50 group-hover:opacity-50 transition-opacity duration-300" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <div className="space-y-4">
                          <p className="text-gray-300 tracking-wide">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-4 py-1 text-sm border border-white/20 text-gray-300 backdrop-blur-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-light tracking-wider group-hover:text-emerald-500 transition-colors duration-300">
                      {project.title.toUpperCase()}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Diagonal Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-black transform skew-y-3 origin-left" />
      </section>

      <Script
        src="https://platform.linkedin.com/badges/js/profile.js"
        strategy="lazyOnload"
        async
        defer
      />
    </Layout>
  )
}