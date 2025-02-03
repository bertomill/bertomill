declare module '*.json' {
  interface LottieAsset {
    id: string
    w?: number
    h?: number
    u?: string
    p?: string
    e?: number
  }

  interface LottieLayer {
    ddd: number
    ind: number
    ty: number
    nm: string
    sr: number
    ks: Record<string, unknown>
    ao: number
    ip: number
    op: number
    st: number
    bm: number
  }

  interface LottieAnimation {
    v: string
    fr: number
    ip: number
    op: number
    w: number
    h: number
    nm: string
    ddd: number
    assets: LottieAsset[]
    layers: LottieLayer[]
  }

  const value: LottieAnimation
  export default value
} 