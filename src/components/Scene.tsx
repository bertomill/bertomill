import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

export default function Scene() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const { scene } = useThree()

  useEffect(() => {
    scene.background = new THREE.Color('#0a0b11')
  }, [scene])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.02
    meshRef.current.rotation.y = time * 0.03
  })

  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.3}
        color="#414868" 
      />
      <directionalLight 
        position={[-5, -5, -5]} 
        intensity={0.1}
        color="#565f89" 
      />
      <pointLight 
        position={[0, 3, 0]} 
        intensity={0.1}
        color="#7aa2f7" 
      />
      
      <Float
        speed={0.8}
        rotationIntensity={0.4}
        floatIntensity={0.8}
        floatingRange={[-0.03, 0.03]}
      >
        <Sphere 
          ref={meshRef} 
          args={[1.4, 512, 512]}
          scale={1.2}
        >
          <MeshDistortMaterial
            color="#1a1b26"
            attach="material"
            distort={0.2}
            speed={1}
            roughness={0.65}
            metalness={0.35}
            emissive="#394b70"
            emissiveIntensity={0.12}
            envMapIntensity={0.5}
            clearcoat={0.2}
            clearcoatRoughness={0.8}
            opacity={0.95}
            transparent
            wireframe={false}
            flatShading={false}
          />
        </Sphere>
      </Float>

      <fog attach="fog" args={['#0a0b11', 7, 30]} />
    </>
  )
} 