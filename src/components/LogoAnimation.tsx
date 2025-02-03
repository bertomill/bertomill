import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import type { LottieComponentProps } from 'lottie-react'
import animationData from '../../public/animations/written-b.json'

// Dynamically import Lottie with SSR disabled
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export default function LogoAnimation() {
  const lottieRef = useRef<any>(null)
  const [isPaused, setIsPaused] = useState(false)

  const handleFrame = (frame: number) => {
    if (frame >= 30 && !isPaused) {
      lottieRef.current?.pause()
      setIsPaused(true)
    }
  }

  return (
    <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
      {typeof window !== 'undefined' && (
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={false}
          autoplay={true}
          onEnterFrame={({ currentFrame }) => handleFrame(currentFrame)}
          className="w-full h-full"
          style={{
            filter: 'drop-shadow(0px 0px 10px rgba(122, 162, 247, 0.2))'
          }}
        />
      )}
    </div>
  )
} 