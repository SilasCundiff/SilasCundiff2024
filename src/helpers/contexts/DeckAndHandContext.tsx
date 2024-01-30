'use client'
import useCardsFromDeckAndHand, { Card } from '../hooks/useCardsFromDeckAndHand'
import { createContext, useContext } from 'react'

export type DeckAndHandContextType = {
  hand: Card[]
  drawPile: Card[]
  discardPile: Card[]
  drawUntilHandIsFull: () => void
}

export const DeckAndHandContext = createContext<DeckAndHandContextType | null>(null)

export default function DeckAndHandContextProvider({ children }: { children: React.ReactNode }) {
  const { hand, drawPile, discardPile, drawUntilHandIsFull } = useCardsFromDeckAndHand()

  return (
    <DeckAndHandContext.Provider value={{ hand, drawPile, discardPile, drawUntilHandIsFull }}>
      {children}
    </DeckAndHandContext.Provider>
  )
}

export const useDeckAndHandContext = () => {
  const context = useContext(DeckAndHandContext)
  if (context === null) {
    throw new Error('useDeckAndHand must be used within a DeckAndHandContextProvider')
  }
  return context
}
