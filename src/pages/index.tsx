import Head from 'next/head'
import Layout from '@/components/Layout'
import { GetStaticProps } from 'next'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import GradientBackground from '@/components/GradientBackground'
import Link from 'next/link'
import Image from 'next/image'

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

const captions = [
  { text: "AI is not just about technology", time: 0 },
  { text: "It's about enhancing human capabilities", time: 2 },
  { text: "Making our world more connected", time: 4 },
  { text: "And our future brighter", time: 6 }
]

export default function Home({ featuredProjects }: HomeProps) {
  const [currentCaption, setCurrentCaption] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCaption((prev) => (prev + 1) % captions.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <Head>
        <title>Berto Mill</title>
        <meta name="description" content="Personal website of Berto Mill" />
      </Head>

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden">
          <GradientBackground />
          
          <div className="relative z-10 w-full">
            <div className="max-w-[90%] mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <motion.h1 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2 }}
                  className="text-8xl md:text-[12rem] font-light tracking-tight leading-none"
                >
                  2025
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  className="text-2xl md:text-3xl font-light tracking-wide text-emerald-500 max-w-2xl"
                >
                  SHAPING TOMORROW&apos;S TECHNOLOGY TODAY THROUGH CUTTING-EDGE AI INNOVATION
                </motion.p>
              </div>
              
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-stone-900/50 border border-stone-800">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/ZkLOBKFFJ2Y?autoplay=1&mute=1&loop=1&playlist=ZkLOBKFFJ2Y&modestbranding=1&cc_load_policy=1&cc_lang_pref=en"
                  title="AI Innovation Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="border-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
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

        <section className="space-y-6">
          <h2 className="text-2xl font-light text-stone-200">About Me</h2>
          <div className="aspect-video w-full max-w-2xl rounded-2xl overflow-hidden bg-stone-900">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/VPN4P6zAquo?start=32&end=52&rel=0"
              title="Berto Mill - Ivey MSc Experience"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="border-0"
            />
          </div>
          <p className="text-stone-400 leading-relaxed max-w-2xl">
            I completed my MSc at Ivey Business School, where I focused on the intersection of technology and business.
            My research explores how AI can enhance human capabilities while maintaining the essential human element in our interactions.
          </p>
        </section>
      </main>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const featuredProjects: Project[] = [
    {
      title: "Canadian Financial News Tracker",
      description: "AI-powered application that tracks and analyzes financial news",
      image: "/cdn-Bank-Tracker.png",
      link: "/projects/canadian-financial-news-tracker",
      technologies: ["TypeScript", "Python", "Next.js", "OpenAI"]
    }
    // Add more projects as needed
  ]

  return {
    props: {
      featuredProjects
    }
  }
}