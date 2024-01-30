import React, { createContext, useContext, useState } from 'react'
import { Vector3 } from 'three'

type CardDropZoneContextType = {
  cardInDropZone: string | null
  setCardInDropZone: (cardId: string | null) => void
  cardDropZonePosition: Vector3
}

export const CardDropZoneContextType = createContext<CardDropZoneContextType>({
  cardInDropZone: null,
  setCardInDropZone: (cardId: string | null) => {},
  cardDropZonePosition: new Vector3(0, 0, 0),
})

export const CardDropZoneContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cardInDropZone, setCardInDropZone] = useState<string | null>(null)
  const cardDropZonePosition = new Vector3(-4, 1, 0.01)

  return (
    <CardDropZoneContextType.Provider
      value={{
        cardInDropZone,
        setCardInDropZone,
        cardDropZonePosition,
      }}
    >
      {children}
    </CardDropZoneContextType.Provider>
  )
}

export const useCardDropZoneContext = () => {
  const context = useContext(CardDropZoneContextType)
  if (context === null) {
    throw new Error('useCardDropZoneContext must be used within a CardDropZoneContextProvider')
  }
  return context
}
