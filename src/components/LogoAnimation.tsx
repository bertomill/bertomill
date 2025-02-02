import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { useRef } from 'react'

export default function LogoAnimation() {
  const lottieRef = useRef(null)

  return (
    <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
      <DotLottieReact
        ref={lottieRef}
        src="https://lottie.host/3e5d2404-833d-4acd-866a-7aad846e0d7a/e6SrP6CQM1.lottie"
        loop
        autoplay
        className="w-full h-full"
        style={{
          filter: 'drop-shadow(0px 0px 10px rgba(122, 162, 247, 0.2))'
        }}
      />
    </div>
  )
} 