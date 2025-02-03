import { ReactNode, useRef } from 'react'
import Layout from './Layout'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import ragAnimation from '@/public/animations/rag-animation.json'

interface DocsLayoutProps {
  children: ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null)

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

        {/* Main content */}
        {children}
      </div>
    </Layout>
  )
} 