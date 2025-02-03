import { ReactNode, useEffect, useState } from 'react'
import Layout from './Layout'
import dynamic from 'next/dynamic'
import type { LottieRefCurrentProps } from 'lottie-react'
import { useRef } from 'react'

// Dynamically import Lottie component with SSR disabled
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

interface LottieAnimation {
  v: string
  fr: number
  ip: number
  op: number
  w: number
  h: number
  nm: string
  ddd: number
  assets: unknown[]
  layers: unknown[]
}

interface DocsLayoutProps {
  children: ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const [animation, setAnimation] = useState<LottieAnimation | null>(null)

  useEffect(() => {
    // Import animation only on client side
    import('../../public/animations/rag-animation.json').then(module => {
      setAnimation(module.default)
    })
  }, [])

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-8 py-12 pb-[200px]">
        {/* Hero section with Lottie */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
          <div className="flex-1">
            <h1 className="text-4xl font-serif text-[#c0caf5] mb-4">Documentation</h1>
            <p className="text-[#a9b1d6] text-lg">
              Explore detailed documentation about my work, projects, and background.
            </p>
          </div>
          <div className="w-full md:w-1/2 max-w-[300px]">
            {animation && (
              <Lottie 
                lottieRef={lottieRef}
                animationData={animation}
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
            )}
          </div>
        </div>

        {/* Main content */}
        {children}
      </div>
    </Layout>
  )
} 