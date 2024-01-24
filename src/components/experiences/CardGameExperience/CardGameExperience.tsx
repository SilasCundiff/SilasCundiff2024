'use client'
import Card from './Card'
import { createContext, useCallback, useState } from 'react'
import CardDropZone from './CardDropZone'
import Hand from './Hand'

export const DraggingContext = createContext({
  isDragging: false,
  setIsDragging: (isDragging: boolean) => {},
})

export const CardContext = createContext({
  activeCard: null,
  setActiveCard: (id: string | null) => {},
  cardDropZonePosition: [0, 0, 0],
})

const tempCardMap = [
  { id: 'card-1', color: '#ff0', positions: [0, -2, 0] },
  { id: 'card-2', color: '#f00', positions: [-2, -2, 0] },
  { id: 'card-3', color: '#f0f', positions: [-4, -2, 0] },
  { id: 'card-4', color: '#0ff', positions: [2, -2, 0] },
  { id: 'card-5', color: '#0f0', positions: [4, -2, 0] },
]

export default function CardGameExperience() {
  const [isDragging, setIsDragging] = useState(false)
  const [activeCard, setActiveCard] = useState<string | null>(null)
  // The position of the drop zone, defining it here so it can be updated based on window size later
  const cardDropZonePosition = [-2.5, 1, 0]

  const handleSetActiveCard = useCallback((id: string | null) => {
    setActiveCard(id)
  }, [])

  return (
    <>
      <CardContext.Provider value={{ activeCard, setActiveCard, cardDropZonePosition }}>
        <DraggingContext.Provider value={{ isDragging, setIsDragging }}>
          <CardDropZone />
          <Hand currentHand={tempCardMap} />
        </DraggingContext.Provider>
      </CardContext.Provider>
    </>
  )
}
