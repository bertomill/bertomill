import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import { Sparkles, Dumbbell, BookOpen, Clapperboard, PenTool } from 'lucide-react'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Berto Mill - Personal Website</title>
        <meta name="description" content="Welcome to my personal website where I share my interests and projects" />
      </Head>

      <div className="max-w-4xl mx-auto space-y-12 px-4">
        <section className="space-y-4">
          <h1 className="text-4xl font-bold">Welcome!</h1>
          <p className="text-xl text-stone-400">
            Here&apos;s what I&apos;m passionate about...
          </p>
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

          <Link href="/fitness" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
            <div className="card-body">
              <Dumbbell className="w-8 h-8 mb-4" />
              <h2 className="card-title">Fitness Journey</h2>
              <p className="opacity-75">Tracking my workouts, sharing tips, and documenting my fitness transformation.</p>
            </div>
          </Link>

          <Link href="/books" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
            <div className="card-body">
              <BookOpen className="w-8 h-8 mb-4" />
              <h2 className="card-title">Reading List</h2>
              <p className="opacity-75">Discover the books that are shaping my thoughts and perspectives.</p>
            </div>
          </Link>

          <Link href="/tv-shows" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
            <div className="card-body">
              <Clapperboard className="w-8 h-8 mb-4" />
              <h2 className="card-title">TV Shows</h2>
              <p className="opacity-75">Explore my favorite series and current watching recommendations.</p>
            </div>
          </Link>

          <Link href="/blog" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
            <div className="card-body">
              <PenTool className="w-8 h-8 mb-4" />
              <h2 className="card-title">Tell Day</h2>
              <p className="opacity-75">My daily thoughts, learnings, and experiences in AI development and life.</p>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  )
} 