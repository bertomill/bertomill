import Head from 'next/head'
import Layout from '@/components/Layout'
import Image from 'next/image'
import { BookOpen, Clapperboard, User } from 'lucide-react'

// Add this interface for books
interface Book {
  title: string
  author: string
  description: string
}

export default function About() {
  const favoriteBooks: Book[] = [
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      description: "An inspiring story that teaches about pursuing your true path and understanding life's deeper meanings."
    },
    {
      title: "The Talent Code",
      author: "Daniel Coyle",
      description: "A fascinating breakdown of how athletes and high performers systematically build and develop talent."
    },
    {
      title: "The Score Takes Care of Itself",
      author: "Bill Walsh",
      description: "Invaluable insights into how high-performance teams prepare and maintain exceptional standards."
    },
    {
      title: "The World I See",
      author: "Fei-Fei Li",
      description: "A compelling perspective into one of the great AI minds and her visionary approach to the field."
    },
    {
      title: "The Almanack of Naval",
      author: "Eric Jorgenson",
      description: "A straightforward collection of clear, actionable lessons and wisdom from Naval Ravikant."
    }
  ]

  return (
    <Layout>
      <Head>
        <title>About - Berto Mill</title>
        <meta name="description" content="Learn more about my professional background and personal interests" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 space-y-16">
        {/* About Me Section */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 space-y-6">
              <h1 className="text-3xl font-medium flex items-center gap-2">
                <User className="w-6 h-6 text-emerald-500" />
                About Me
              </h1>
              <div className="space-y-4 text-stone-400">
                <p className="text-lg leading-relaxed">
                  I am a consultant and developer in the technology space. I have three years of experience in helping companies of all sizes implement technology. I also develop AI applications.
                </p>
                <p className="text-lg leading-relaxed">
                  Outside of work, I am a fitness enthusiast and enjoy running, lifting weights, and playing sports such as football and squash.
                </p>
              </div>
            </div>
            <div className="relative w-full md:w-72 aspect-video rounded-xl overflow-hidden border-2 border-emerald-500/20 shadow-lg">
              <Image
                src="/Berto Mill Conference.png"
                alt="Berto Mill at Conference"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Reading List Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-medium flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-500" />
            Reading List
          </h2>
          <p className="text-stone-400">
            Here are some of my favorite books that have shaped my thinking and perspective:
          </p>
          <div className="grid gap-6">
            {favoriteBooks.map((book, index) => (
              <div key={book.title} className="radix-card p-4 space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-emerald-500 font-medium">{index + 1}.</span>
                  <h3 className="text-lg font-medium text-stone-100">
                    {book.title}
                    <span className="text-stone-400 text-sm ml-2">by {book.author}</span>
                  </h3>
                </div>
                <p className="text-stone-400 text-sm pl-6">
                  {book.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* TV Shows Section */}
        <section className="space-y-6 pb-16">
          <h2 className="text-2xl font-medium flex items-center gap-2">
            <Clapperboard className="w-6 h-6 text-emerald-500" />
            TV Shows
          </h2>
          <p className="text-stone-400">
            Explore my favorite series and current watching recommendations.
          </p>
        </section>
      </div>
    </Layout>
  )
} 