import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import { 
  Code2, 
  Dumbbell, 
  BookOpen, 
  Clapperboard,
  Sparkles,
  PenTool,
} from 'lucide-react'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Berto Mill - AI Developer</title>
        <meta name="description" content="AI Application Developer showcasing projects, fitness journey, books, and entertainment" />
      </Head>

      <div className="space-y-16">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold">
            Hey, I'm Berto Mill
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            I'm an AI Application Developer passionate about building intelligent applications that solve real problems. 
            When I'm not coding, I love staying fit, reading, and discovering great shows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/projects" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
            <div className="card-body">
              <Sparkles className="w-8 h-8 mb-4" />
              <h2 className="card-title">AI Projects</h2>
              <p className="opacity-75">Explore my collection of AI applications and projects, including deployed solutions on Vercel.</p>
            </div>
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