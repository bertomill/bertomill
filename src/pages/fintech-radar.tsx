import Head from 'next/head'
import Layout from '../components/Layout'
import { Search, Grid, TrendingUp, Zap } from 'lucide-react'

export default function FintechRadar() {
  return (
    <Layout>
      <Head>
        <title>Fintech Radar</title>
        <meta name="description" content="Stay ahead of emerging financial technologies and trends" />
      </Head>

      <div className="max-w-6xl mx-auto px-4">
        {/* AI Technology Analysis Section */}
        <div className="py-8 space-y-6">
          <h1 className="text-4xl font-bold text-center">Fintech Radar</h1>
          <p className="text-lg text-stone-400 text-center max-w-2xl mx-auto">
            Stay ahead of emerging financial technologies and trends
          </p>
          
          <div className="max-w-2xl mx-auto mt-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Ask about any fintech technology..."
                className="w-full px-4 py-3 bg-stone-900 border border-stone-800 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors text-white"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors">
                Analyze
              </button>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="grid gap-6 md:grid-cols-3 py-12">
          <div className="radix-card p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Grid className="w-6 h-6 text-emerald-500" />
              <h2 className="text-xl font-medium">Technology Radar</h2>
            </div>
            <p className="text-stone-400">
              Track emerging technologies in the financial sector
            </p>
          </div>

          <div className="radix-card p-6 space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-500" />
              <h2 className="text-xl font-medium">Market Trends</h2>
            </div>
            <p className="text-stone-400">
              Analysis of current market movements and predictions
            </p>
          </div>

          <div className="radix-card p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-emerald-500" />
              <h2 className="text-xl font-medium">Innovation Insights</h2>
            </div>
            <p className="text-stone-400">
              Deep dives into innovative financial solutions
            </p>
          </div>
        </div>

        {/* News Feed Section */}
        <div className="py-12">
          <h2 className="text-2xl font-medium mb-6">Latest Insights</h2>
          <div className="grid gap-6">
            {/* News items would go here */}
          </div>
        </div>
      </div>
    </Layout>
  )
} 