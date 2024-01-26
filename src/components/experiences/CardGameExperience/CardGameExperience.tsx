'use client'

import { createContext, use, useEffect, useState } from 'react'
import CardDropZone from './CardDropZone'
import Hand from './Hand'

import { Vector3 } from 'three'
import { Text, useBounds } from '@react-three/drei'

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

const tempCardMap = [
  { id: 'card-1', color: '#ff0' },
  { id: 'card-2', color: '#f00' },
  { id: 'card-3', color: '#f0f' },
  { id: 'card-4', color: '#0ff' },
  { id: 'card-5', color: '#0f0' },
]

const deckOfCards = [
  { id: 'card-1', color: '#FBBF24', imageUrl: 'url1', title: 'Title 1', description: 'Description 1' },
  { id: 'card-2', color: '#EF4444', imageUrl: 'url2', title: 'Title 2', description: 'Description 2' },
  { id: 'card-3', color: '#10B981', imageUrl: 'url3', title: 'Title 3', description: 'Description 3' },
  { id: 'card-4', color: '#3B82F6', imageUrl: 'url4', title: 'Title 4', description: 'Description 4' },
  { id: 'card-5', color: '#6D28D9', imageUrl: 'url5', title: 'Title 5', description: 'Description 5' },
  { id: 'card-6', color: '#F472B6', imageUrl: 'url6', title: 'Title 6', description: 'Description 6' },
  { id: 'card-7', color: '#6366F1', imageUrl: 'url7', title: 'Title 7', description: 'Description 7' },
  { id: 'card-8', color: '#EC4899', imageUrl: 'url8', title: 'Title 8', description: 'Description 8' },
  { id: 'card-9', color: '#F59E0B', imageUrl: 'url9', title: 'Title 9', description: 'Description 9' },
  { id: 'card-10', color: '#D97706', imageUrl: 'url10', title: 'Title 10', description: 'Description 10' },
  { id: 'card-11', color: '#EF4444', imageUrl: 'url11', title: 'Title 11', description: 'Description 11' },
  { id: 'card-12', color: '#93C5FD', imageUrl: 'url12', title: 'Title 12', description: 'Description 12' },
  { id: 'card-13', color: '#A78BFA', imageUrl: 'url13', title: 'Title 13', description: 'Description 13' },
  { id: 'card-14', color: '#FBCFE8', imageUrl: 'url14', title: 'Title 14', description: 'Description 14' },
  { id: 'card-15', color: '#FDE68A', imageUrl: 'url15', title: 'Title 15', description: 'Description 15' },
  { id: 'card-16', color: '#DB2777', imageUrl: 'url16', title: 'Title 16', description: 'Description 16' },
]

const cardHandPositions = [
  new Vector3(0, -2, 1.1),
  new Vector3(-2, -2, 1.2),
  new Vector3(-4, -2, 1.3),
  new Vector3(2, -2, 1.4),
  new Vector3(4, -2, 1.5),
]

const cardDropZonePosition = new Vector3(-4, 1, 0.01)

export default function CardGameExperience() {
  const [isDragging, setIsDragging] = useState(false)
  const [currentlyDraggingCard, setCurrentlyDraggingCard] = useState(null)
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const [hand, setHand] = useState([])
  const [drawPile, setDrawPile] = useState(deckOfCards)
  const [discardPile, setDiscardPile] = useState([])

  // draw the initial hand, which is 5 cards
  useEffect(() => {
    // only draw if the hand is empty and the draw pile has cards
    if (hand.length > 0 || drawPile.length === 0) return

    setHand(drawPile.slice(0, 5))
    setDrawPile(drawPile.slice(5))
  }, [])

  // draw a card from the draw pile
  const discardHandAndDrawFive = () => {
    if (drawPile.length === 0) return

    setDiscardPile([...discardPile, ...hand])
    setHand(drawPile.slice(0, 5))
    setDrawPile(drawPile.slice(5))

    console.log('discardPile', discardPile, hand)
  }

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
      {/* create a basic mesh to act as a button */}
      <mesh
        position={[4, -4, 0]}
        onClick={() => {
          discardHandAndDrawFive()
        }}
      >
        <planeGeometry args={[1, 0.5, 1]} />
        <meshBasicMaterial color='#00f' />
      </mesh>
    </>
  )
}
