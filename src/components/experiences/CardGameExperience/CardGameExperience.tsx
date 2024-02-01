'use client'

import { useThree } from '@react-three/fiber'
import CardDropZone from './CardDropZone'
import Hand from './Hand'

export default function CardGameExperience() {
  const viewport = useThree((state) => state.viewport)
  const gameScalingFactor = Math.min(Math.max(window.innerWidth / 1300, 0.5), 1.2)
  console.log('gameScalingFactor', gameScalingFactor, viewport)

  return (
    <>
      <group scale={gameScalingFactor}>
        <CardDropZone />
        {/* ! this mesh prevents the bounds from becoming too small in the case of a browser resize while the last card in the hand is in the drop zone. It can likely be removed once the new card positions are in place. */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[10, 2.5, 1]} />
          <meshBasicMaterial color='#fff' opacity={0.0} transparent />
        </mesh>
        <Hand />
      </group>
    </>
  )
}
