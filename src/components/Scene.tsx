import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import * as THREE from 'three'

export default function Scene() {
  const { scene } = useThree()

  useEffect(() => {
    scene.background = new THREE.Color('#0a0b11')
  }, [scene])

  return null
} 