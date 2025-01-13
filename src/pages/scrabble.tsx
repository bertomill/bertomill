import Head from 'next/head'
import Layout from '../components/Layout'
import { useState } from 'react'
import { GameController } from 'lucide-react'

export default function Scrabble() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [firstMove, setFirstMove] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/scrabble-move', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          move: firstMove,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        throw new Error('Failed to submit move')
      }
    } catch (error) {
      console.error('Error submitting move:', error)
      alert('Failed to submit move. Please try again.')
    }
  }

  return (
    <Layout>
      <Head>
        <title>Play Scrabble - Berto Mill</title>
        <meta name="description" content="Challenge me to a game of Scrabble" />
      </Head>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-medium flex items-center justify-center gap-2">
              <GameController className="w-8 h-8 text-emerald-500" />
              Play Scrabble with Me
            </h1>
            <p className="mt-4 text-lg text-stone-400">
              Make your first move and I'll respond within 24 hours!
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-stone-900 border border-stone-800 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-stone-900 border border-stone-800 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="move" className="block text-sm font-medium mb-2">
                  First Move (e.g., "HELLO at H8 across")
                </label>
                <input
                  type="text"
                  id="move"
                  value={firstMove}
                  onChange={(e) => setFirstMove(e.target.value)}
                  className="w-full px-4 py-2 bg-stone-900 border border-stone-800 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Make Move
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="text-emerald-500 text-xl font-medium">
                Move submitted successfully!
              </div>
              <p className="text-stone-400">
                I'll review your move and respond via email within 24 hours.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
} 