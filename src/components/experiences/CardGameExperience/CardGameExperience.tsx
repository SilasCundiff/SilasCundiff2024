'use client'
import CardDropZone from './CardDropZone'
import Hand from './Hand'
import CardPositionUtilsContextProvider from '@/helpers/contexts/CardPositionUtilsContext'

export default function CardGameExperience() {
  return (
    <>
      <CardPositionUtilsContextProvider>
        <CardDropZone size={{ cardWidth: 1.75, cardHeight: 2.5 }} />
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[6, 2.5, 1]} />
          <meshBasicMaterial color='#00f' opacity={0.5} transparent />
        </mesh>
        <Hand size={{ cardWidth: 1.75, cardHeight: 2.5 }} />
      </CardPositionUtilsContextProvider>
    </>
  )
}
