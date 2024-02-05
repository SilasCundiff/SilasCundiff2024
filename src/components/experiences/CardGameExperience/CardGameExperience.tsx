'use client'

import { useThree } from '@react-three/fiber'
import CardDropZone from './CardDropZone'
import Hand from './Hand'

export default function CardGameExperience() {
  const viewport = useThree((state) => state.viewport)
  const gameScalingFactor = Math.min(Math.max(window.innerWidth / 1900, 0.65), 1.1)

  return (
    <>
      <group scale={gameScalingFactor}>
        <CardDropZone />
        <Hand />
      </group>
    </>
  )
}
