import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Scene from './Scene'

export default function HeroAnimation() {
  return (
    <div className="absolute inset-0 z-0 opacity-90">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
} 