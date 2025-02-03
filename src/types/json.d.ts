declare module '*.json' {
  // Define a more specific type for Lottie animations
  interface LottieAnimation {
    v: string
    fr: number
    ip: number
    op: number
    w: number
    h: number
    nm: string
    ddd: number
    assets: any[]
    layers: any[]
  }
  const value: LottieAnimation
  export default value
} 