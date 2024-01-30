import React, { createContext, useContext, useState } from 'react'
import { Vector3 } from 'three'

type CardDraggingContextType = {
  isCardBeingDragged: boolean
  cardBeingDragged: string | null
  setIsCardBeingDragged: (isDragging: boolean) => void
  setCardBeingDragged: (cardId: string) => void
}

export const CardDraggingContextType = createContext<CardDraggingContextType>({
  isCardBeingDragged: false,
  cardBeingDragged: null,
  setIsCardBeingDragged: (isDragging: boolean) => {},
  setCardBeingDragged: (cardId: string) => {},
})

export const CardDraggingContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCardBeingDragged, setIsCardBeingDragged] = useState(false)
  const [cardBeingDragged, setCardBeingDragged] = useState<string | null>(null)

  return (
    <CardDraggingContextType.Provider
      value={{
        isCardBeingDragged,
        cardBeingDragged,
        setIsCardBeingDragged,
        setCardBeingDragged,
      }}
    >
      {children}
    </CardDraggingContextType.Provider>
  )
}

export const useCardDraggingContext = () => {
  const context = useContext(CardDraggingContextType)
  if (context === null) {
    throw new Error('useCardDraggingContext must be used within a CardDraggingContextProvider')
  }
  return context
}
