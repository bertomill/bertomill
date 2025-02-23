import Head from 'next/head'
import Layout from '@/components/Layout'
import { GetStaticProps } from 'next'
import { motion } from 'framer-motion'
import GradientBackground from '@/components/GradientBackground'
import Link from 'next/link'
import Image from 'next/image'
import AthleticsSection from '@/components/AthleticsSection'
import ConsultingSection from '@/components/ConsultingSection'
import StartupSection from '@/components/StartupSection'
import InteractiveAI from '@/components/InteractiveAI'
import { useState, useEffect, useRef } from 'react'
import type { AnimationItem } from 'lottie-web'
import HeroAnimation from '@/components/HeroAnimation'
import LogoAnimation from '@/components/LogoAnimation'
import Subscribe from '@/components/Subscribe'

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

export default function Home({ featuredProjects }: HomeProps) {
  const [videoPlaying, setVideoPlaying] = useState(false)
  const lottieContainer = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    let anim: AnimationItem | null = null;
    const loadLottie = async () => {
      if (lottieContainer.current) {
        const lottie = (await import('lottie-web')).default;
        anim = lottie.loadAnimation({
          container: lottieContainer.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "https://lottie.host/559060b7-879b-40e2-9c2c-c0c2c5c7c7c7/your-animation-id.json"
        });
      }
    };

    loadLottie();

    // Cleanup function
    return () => {
      if (anim) {
        anim.destroy();
      }
    };
  }, []);

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Layout>
      <Head>
        <title>Berto Mill</title>
        <meta name="description" content="Personal website of Berto Mill" />
      </Head>

      {mounted && <InteractiveAI />}

      <main className="min-h-screen font-serif bg-[#080808]">
        {/* Hero Section */}
        <section className="relative min-h-screen w-full flex items-center">
          <GradientBackground />
          <HeroAnimation />
          
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
            <div className="w-full flex flex-col md:grid md:grid-cols-2 gap-12 items-center">
              <div className="w-full space-y-6 md:space-y-8 text-center md:text-left">
                <motion.p
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2 }}
                  className="retro-text grainy text-sm sm:text-base md:text-lg tracking-[0.15em] uppercase text-[#94a3b8] max-w-2xl mx-auto md:mx-0"
                >
                  Innovation Consultant and Application Developer passionate about building products and services that help people achieve their ambitions
                </motion.p>
              </div>
              <div className="relative w-full flex justify-center items-center">
                <LogoAnimation />
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="relative bg-[#0c0c0c] w-full py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-6 mb-8">
              <motion.h2 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="retro-text grainy text-xl md:text-3xl tracking-[0.2em] uppercase text-[#94a3b8]"
              >
                Featured
                <br />
                Projects
              </motion.h2>
              
              <div ref={lottieContainer} className="w-24 h-24" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
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
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        
                        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-[#1a1b26] to-transparent">
                          <div className="space-y-4">
                            <p className="text-[#a9b1d6] tracking-wide">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-3">
                              {project.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-4 py-1 text-sm border border-[#414868] text-[#7aa2f7] backdrop-blur-sm bg-[#1a1b26]/80"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <h3 className="text-xl tracking-wider text-[#c0caf5] group-hover:text-[#7aa2f7] transition-colors duration-300">
                        {project.title.toUpperCase()}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative bg-[#16161e] py-12">
          <div className="w-full">
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="retro-text grainy text-xl md:text-3xl tracking-[0.2em] uppercase mb-8 text-[#94a3b8]"
            >
              Education
            </motion.h2>

            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="max-w-2xl"
              >
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-[#1a1b26] border border-[#414868]/30 relative">
                  {!videoPlaying ? (
                    <div 
                      className="relative w-full h-full cursor-pointer"
                      onClick={() => setVideoPlaying(true)}
                    >
                      <Image
                        src="/ivey-msc-thumbnail.jpg"
                        alt="Berto Mill speaking about Ivey MSc experience"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/VPN4P6zAquo?start=41&autoplay=1&modestbranding=1&cc_load_policy=1&cc_lang_pref=en"
                      title="Berto Mill - Ivey MSc Experience"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="border-0"
                    />
                  )}
                </div>
                <p className="mt-3 text-[#a9b1d6] leading-relaxed text-sm md:text-base">
                  I completed my MSc at Ivey Business School, where I focused on the intersection of technology and business.
                  My research explores how AI can enhance human capabilities while maintaining the essential human element in our interactions.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <ConsultingSection />
        <StartupSection />
        <AthleticsSection />

        <section className="py-20">
          <Subscribe />
        </section>
      </main>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const featuredProjects: Project[] = [
    {
      title: "Levery",
      description: "AI that works with your data. Connect apps, documents and databases instantly with no training or uploads required.",
      image: "/levery_project.png",
      link: "https://levery.vercel.app/",
      technologies: ["AI", "Next.js", "TypeScript", "Tailwind CSS", "Vercel"]
    },
    {
      title: "Canadian Financial News Tracker",
      description: "AI-powered application that tracks and analyzes financial news",
      image: "/cdn-bank-tracker.png",
      link: "/projects/canadian-financial-news-tracker",
      technologies: ["TypeScript", "Python", "Next.js", "OpenAI"]
    }
  ]

  return {
    props: {
      featuredProjects
    }
  }
}