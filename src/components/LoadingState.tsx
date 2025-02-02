import { DotLottieReact } from '@lottiefiles/dotlottie-react'

export default function LoadingState() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#1a1b26]/80 backdrop-blur-sm z-50">
      <div className="w-[100px] h-[100px]">
        <DotLottieReact
          src="https://lottie.host/3e5d2404-833d-4acd-866a-7aad846e0d7a/e6SrP6CQM1.lottie"
          loop
          autoplay
          className="w-full h-full"
        />
      </div>
    </div>
  )
} 