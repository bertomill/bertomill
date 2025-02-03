import { useRef } from 'react'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
// Change require to import
import ragAnimation from '../../public/animations/rag-animation.json'

export default function DocsHero() {
  // Add ref for Lottie control
  const lottieRef = useRef<LottieRefCurrentProps>(null)

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
      <div className="flex-1 space-y-4">
        <h1 className="text-4xl font-serif text-[#c0caf5]">Documentation</h1>
        <p className="text-[#a9b1d6] text-lg">
          Explore detailed documentation about my work, projects, and background.
        </p>
      </div>
      <div className="w-full md:w-1/2 max-w-[300px]">
        <Lottie 
          lottieRef={lottieRef}
          animationData={ragAnimation}
          loop={true}
          autoplay={true}
          className="w-full h-full"
          onMouseEnter={() => {
            if (lottieRef.current) {
              lottieRef.current.setSpeed(2)
            }
          }}
          onMouseLeave={() => {
            if (lottieRef.current) {
              lottieRef.current.setSpeed(1)
            }
          }}
        />
      </div>
    </div>
  )
} 