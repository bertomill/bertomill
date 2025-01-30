import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BrotherGuessHeatmapProps {
  imageWidth: number
  imageHeight: number
  isActive: boolean
}

interface Guess {
  x: number
  y: number
  isCorrect: boolean
}

interface HeatmapCell {
  x: number
  y: number
  intensity: number
  isCorrect: boolean
}

export default function BrotherGuessHeatmap({
  imageWidth,
  imageHeight,
  isActive
}: BrotherGuessHeatmapProps) {
  const [guesses, setGuesses] = useState<Guess[]>([])
  const [hasGuessed, setHasGuessed] = useState(false)
  const [message, setMessage] = useState('Can you guess who my brother is? Click anywhere to make your guess! 🤔')
  const [heatmapData, setHeatmapData] = useState<HeatmapCell[]>([])
  const cellSize = 20 // Size of each heatmap cell in pixels

  // Fetch existing guesses
  useEffect(() => {
    if (isActive) {
      fetch('/api/brother-guess')
        .then(res => res.json())
        .then(data => {
          setGuesses(data.guesses)
          generateHeatmap(data.guesses)
        })
    }
  }, [isActive])

  // Generate heatmap data from guesses
  const generateHeatmap = useCallback((currentGuesses: Guess[] = guesses) => {
    const cells: { [key: string]: HeatmapCell } = {}
    
    currentGuesses.forEach(guess => {
      const cellX = Math.floor(guess.x / (100 / Math.floor(imageWidth / cellSize)))
      const cellY = Math.floor(guess.y / (100 / Math.floor(imageHeight / cellSize)))
      const key = `${cellX}-${cellY}`
      
      if (!cells[key]) {
        cells[key] = {
          x: cellX * cellSize,
          y: cellY * cellSize,
          intensity: 0,
          isCorrect: guess.isCorrect
        }
      }
      cells[key].intensity++
    })

    const maxIntensity = Math.max(...Object.values(cells).map(cell => cell.intensity))
    const heatmapCells = Object.values(cells).map(cell => ({
      ...cell,
      intensity: Math.log(cell.intensity + 1) / Math.log(maxIntensity + 1)
    }))

    setHeatmapData(heatmapCells)
  }, [guesses, imageWidth, imageHeight, cellSize])

  const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (hasGuessed) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    try {
      const response = await fetch('/api/brother-guess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ x, y })
      })

      const data = await response.json()
      
      if (data.success) {
        setHasGuessed(true)
        const newGuess = data.guess
        setGuesses(prev => [...prev, newGuess])
        generateHeatmap([...guesses, newGuess])
        setMessage(
          newGuess.isCorrect
            ? `🎉 You got it! That's my brother in the gray shirt! ${data.stats.accuracy}% of people found him.`
            : `Not quite! My brother is the one in the gray shirt (third from left). ${data.stats.accuracy}% of ${data.stats.total} people found him!`
        )
      }
    } catch (error) {
      console.error('Error saving guess:', error)
    }
  }

  useEffect(() => {
    generateHeatmap()
  }, [generateHeatmap])

  return (
    <div
      className="relative w-full h-full cursor-crosshair"
      onClick={handleClick}
    >
      {/* Initial message before guessing */}
      {!hasGuessed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-4 left-0 right-0 text-center"
        >
          <div className="inline-block bg-black/80 text-white px-6 py-3 rounded-lg font-handwriting text-2xl">
            {message}
          </div>
        </motion.div>
      )}

      {/* Heatmap overlay (only shown after guessing) */}
      <AnimatePresence>
        {hasGuessed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 pointer-events-none"
          >
            {heatmapData.map((cell, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.01 }}
                className="absolute rounded-lg"
                style={{
                  left: cell.x,
                  top: cell.y,
                  width: cellSize,
                  height: cellSize,
                  backgroundColor: cell.isCorrect 
                    ? `rgba(34, 197, 94, ${Math.min(cell.intensity * 0.5, 0.7)})` // Green with max 0.7 opacity
                    : `rgba(234, 179, 8, ${Math.min(cell.intensity * 0.5, 0.7)})`, // Yellow with max 0.7 opacity
                  transition: 'background-color 0.3s ease'
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result message after guessing */}
      <AnimatePresence>
        {hasGuessed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-4 left-0 right-0 text-center"
          >
            <div className="inline-block bg-black/80 text-white px-4 py-2 rounded-lg font-handwriting text-lg">
              {message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
