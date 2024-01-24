'use client'

import { createContext, useCallback, useEffect, useState } from 'react'
import CardDropZone from './CardDropZone'
import Hand from './Hand'

import { Vector3 } from 'three'
import { useThree } from '@react-three/fiber'

export const DraggingContext = createContext({
  isDragging: false,
  setIsDragging: (isDragging: boolean) => {},
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

const cardHandPositions = [
  new Vector3(0, -2, 0),
  new Vector3(-2, -2, 0),
  new Vector3(-4, -2, 0),
  new Vector3(2, -2, 0),
  new Vector3(4, -2, 0),
]

const cardDropZonePosition = new Vector3(-2.5, 1, 0)

export default function CardGameExperience() {
  const [isDragging, setIsDragging] = useState(false)
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const [cardSize, setCardSize] = useState({ cardWidth: 0, cardHeight: 0 })
  const { size } = useThree()

  // calculate the card sizes, they should be a ratio of 2 wide : 3 tall
  const calculateCardSizeOnCanvasResize = useCallback(() => {
    let cardWidth = size.width / 5
    console.log(cardWidth)
    let cardHeight = cardWidth * 1.5 // 2:3 aspect ratio

    if (cardWidth > size.width / 5) {
      cardWidth = size.width / 5
      cardHeight = cardWidth * 1.5
    }
    if (cardHeight > size.height / 5) {
      cardHeight = size.height / 5
      cardWidth = cardHeight / 1.5
    }

    cardWidth = cardWidth / 100
    cardHeight = cardHeight / 100
    return { cardWidth, cardHeight }
  }, [size])

  // Calculate the card size on the first render
  useEffect(() => {
    setCardSize(calculateCardSizeOnCanvasResize())
  }, [calculateCardSizeOnCanvasResize])
  console.log('card size', cardSize)
  console.log('cardHandPositions', cardHandPositions)

  return (
    <>
      <CardContext.Provider value={{ activeCard, setActiveCard, cardDropZonePosition }}>
        <DraggingContext.Provider value={{ isDragging, setIsDragging }}>
          <CardDropZone size={cardSize} />
          <Hand size={cardSize} currentHand={tempCardMap} cardPositions={cardHandPositions} />
        </DraggingContext.Provider>
      </CardContext.Provider>
    </>
  )
}
