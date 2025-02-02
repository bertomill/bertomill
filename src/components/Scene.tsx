import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

export default function Scene() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.02
    meshRef.current.rotation.y = time * 0.03
  })

  return (
    <>
      <color attach="background" args={['#080910']} />
      <ambientLight intensity={0.2} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.4}
        color="#5a6494"
      />
      <directionalLight 
        position={[-5, -5, -5]} 
        intensity={0.15}
        color="#7aa2f7"
      />
      <pointLight 
        position={[0, 3, 0]} 
        intensity={0.15}
        color="#bb9af7"
      />
      
      <Float
        speed={0.8}
        rotationIntensity={0.4}
        floatIntensity={0.8}
        floatingRange={[-0.03, 0.03]}
      >
        <Sphere 
          ref={meshRef} 
          args={[1.4, 256, 256]}
          scale={1.2}
        >
          <MeshDistortMaterial
            color="#24283b"
            attach="material"
            distort={0.2}
            speed={1}
            roughness={0.75}
            metalness={0.25}
            emissive="#7aa2f7"
            emissiveIntensity={0.15}
            envMapIntensity={0.6}
            clearcoat={0.15}
            clearcoatRoughness={0.8}
            opacity={0.92}
            transparent
            wireframe={true}
            wireframeLinewidth={0.15}
            wireframeLineJoin="round"
          />
        </Sphere>
      </Float>

      <fog attach="fog" args={['#080910', 6, 25]} />
    </>
  )
} 