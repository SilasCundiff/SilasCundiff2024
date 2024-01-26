'use client'

import { createContext, useEffect, useState } from 'react'
import CardDropZone from './CardDropZone'
import Hand from './Hand'

import { Vector3 } from 'three'

export const DraggingContext = createContext({
  isDragging: false,
  currentlyDraggingCard: null,
  setIsDragging: (isDragging: boolean) => {},
  setCurrentlyDraggingCard: (cardId: string) => {},
})

export const CardContext = createContext({
  activeCard: null,
  setActiveCard: (id: string | null) => {},
  cardDropZonePosition: new Vector3(0, 0, 0),
})

const cardHandPositions = [
  new Vector3(0, -2, 1.1),
  new Vector3(-2, -2, 1.2),
  new Vector3(-4, -2, 1.3),
  new Vector3(2, -2, 1.4),
  new Vector3(4, -2, 1.5),
]

const cardDropZonePosition = new Vector3(-4, 1, 0.01)

export default function CardGameExperience({ hand }) {
  const [isDragging, setIsDragging] = useState(false)
  const [currentlyDraggingCard, setCurrentlyDraggingCard] = useState(null)
  const [activeCard, setActiveCard] = useState<string | null>(null)

  return (
    <>
      <CardContext.Provider value={{ activeCard, setActiveCard, cardDropZonePosition }}>
        <DraggingContext.Provider
          value={{ isDragging, setIsDragging, currentlyDraggingCard, setCurrentlyDraggingCard }}
        >
          <CardDropZone size={{ cardWidth: 1.75, cardHeight: 2.5 }} />
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[6, 2.5, 1]} />
            <meshBasicMaterial color='#00f' opacity={0.0} transparent />
          </mesh>
          {hand.length > 0 && (
            <Hand size={{ cardWidth: 1.75, cardHeight: 2.5 }} currentHand={hand} cardPositions={cardHandPositions} />
          )}
        </DraggingContext.Provider>
      </CardContext.Provider>
    </>
  )
}
