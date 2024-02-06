'use client'

import { useThree } from '@react-three/fiber'
import CardDropZone from './CardDropZone'
import Hand from './Hand'
import CardGameHUD from './CardGameHUD'

export default function CardGameExperience({ drawPile, discardPile }: { drawPile: number; discardPile: number }) {
  const viewport = useThree((state) => state.viewport)
  const gameScalingFactor = Math.min(Math.max(window.innerWidth / 1900, 0.65), 1.1)

  return (
    <>
      <group scale={gameScalingFactor}>
        <CardDropZone />
        <Hand />
        <CardGameHUD drawPile={drawPile} discardPile={discardPile} />
      </group>
    </>
  )
}
