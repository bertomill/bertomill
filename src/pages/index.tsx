import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/Layout'
import { Sparkles, Dumbbell, BookOpen, Clapperboard, PenTool, User } from 'lucide-react'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Berto Mill - Personal Website</title>
        <meta name="description" content="Welcome to my personal website where I share my interests and projects" />
      </Head>

      <div className="max-w-4xl mx-auto space-y-12 px-4">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent">
            <div className="absolute inset-0 bg-[radial-gradient(#0f766e_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
          </div>

          <div className="relative flex flex-col md:flex-row items-center gap-8 py-12 px-4 max-w-4xl mx-auto">
            <div className="relative w-40 h-40 rounded-2xl overflow-hidden border-2 border-emerald-500/20 shadow-lg shadow-emerald-500/10 bg-stone-950/50 backdrop-blur-sm">
              <Image
                src="/Berto Headshot.jpeg"
                alt="Berto Mill"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <h1 className="text-4xl font-bold">Welcome!</h1>
              <p className="text-xl text-stone-400">
                I&apos;m Berto Mill, an AI application developer passionate about building innovative solutions.
                Here&apos;s what I&apos;m working on...
              </p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/projects" className="radix-card p-6 space-y-4 hover:bg-stone-800/50">
            <h2 className="text-2xl font-medium flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-emerald-500" />
              AI Projects
            </h2>
            <p className="text-stone-400">
              Explore my AI applications that I&apos;ve built to solve real-world problems.
            </p>
          </Link>

          <Link href="/blog" className="radix-card p-6 space-y-4 hover:bg-stone-800/50">
            <h2 className="text-2xl font-medium flex items-center gap-2">
              <PenTool className="w-6 h-6 text-emerald-500" />
              Tell Day Blog
            </h2>
            <p className="text-stone-400">
              My daily thoughts, learnings, and experiences in AI development and life.
            </p>
          </Link>

          <Link href="/about" className="radix-card p-6 space-y-4 hover:bg-stone-800/50 md:col-span-2">
            <h2 className="text-2xl font-medium flex items-center gap-2">
              <User className="w-6 h-6 text-emerald-500" />
              About Me
            </h2>
            <p className="text-stone-400">
              Learn more about my interests in fitness, books, and entertainment.
            </p>
          </Link>
        </div>
      </div>
    </Layout>
  )
} 