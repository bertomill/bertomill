import Head from 'next/head'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <Layout>
      <Head>
        <title>Page Not Found - Berto Mill</title>
        <meta name="description" content="The page you're looking for could not be found." />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-6xl font-bold text-emerald-500">404</h1>
        <p className="mt-4 text-xl text-stone-400">
          The page you&apos;re looking for could not be found.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-8 px-4 py-2 text-sm bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </Layout>
  )
} 