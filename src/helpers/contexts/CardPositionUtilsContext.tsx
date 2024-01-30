import React, { createContext, useContext, useState } from 'react'
import { Vector3 } from 'three'

type CardPositionUtilsContextType = {
  isCardBeingDragged: boolean
  cardBeingDragged: string | null
  setIsCardBeingDragged: (isDragging: boolean) => void
  setCardBeingDragged: (cardId: string) => void
  cardInDropZone: string | null
  setCardInDropZone: (cardId: string | null) => void
  cardDropZonePosition: Vector3
  cardsInHandPositions: Vector3[]
}

export const CardPositionUtilsContext = createContext<CardPositionUtilsContextType>({
  isCardBeingDragged: false,
  cardBeingDragged: null,
  setIsCardBeingDragged: (isDragging: boolean) => {},
  setCardBeingDragged: (cardId: string) => {},
  cardInDropZone: null,
  setCardInDropZone: (cardId: string | null) => {},
  cardDropZonePosition: new Vector3(0, 0, 0),
  cardsInHandPositions: [],
})

export default function CardPositionUtilsContextProvider({ children }: { children: React.ReactNode }) {
  const [isCardBeingDragged, setIsCardBeingDragged] = useState(false)
  const [cardBeingDragged, setCardBeingDragged] = useState<string | null>(null)
  const [cardInDropZone, setCardInDropZone] = useState<string | null>(null)
  const cardDropZonePosition = new Vector3(-4, 1, 0.01)
  const cardsInHandPositions = [
    new Vector3(-4, -2, 1.3),
    new Vector3(-2, -2, 1.2),
    new Vector3(0, -2, 1.1),
    new Vector3(2, -2, 1.4),
    new Vector3(4, -2, 1.5),
  ]

  return (
    <CardPositionUtilsContext.Provider
      value={{
        isCardBeingDragged,
        cardBeingDragged,
        setIsCardBeingDragged,
        setCardBeingDragged,
        cardInDropZone,
        setCardInDropZone,
        cardDropZonePosition,
        cardsInHandPositions,
      }}
    >
      {children}
    </CardPositionUtilsContext.Provider>
  )
}

export const useCardPositionUtilsContext = () => {
  const context = useContext(CardPositionUtilsContext)
  if (context === null) {
    throw new Error('useCardPositionUtilsContext must be used within a CardPositionUtilsContextProvider')
  }
  return context
}
