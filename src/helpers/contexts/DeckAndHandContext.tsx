'use client'
import useCardsFromDeckAndHand, { Card } from '../hooks/useCardsFromDeckAndHand'
import { createContext, useContext, useEffect, useState } from 'react'

export type DeckAndHandContextType = {
  hand: Card[]
}

export const DeckAndHandContext = createContext<DeckAndHandContextType | null>(null)

export default function DeckAndHandContextProvider({ children, hand }: { children: React.ReactNode; hand: Card[] }) {
  return <DeckAndHandContext.Provider value={{ hand }}>{children}</DeckAndHandContext.Provider>
}

export const useDeckAndHandContext = () => {
  const context = useContext(DeckAndHandContext)
  if (context === null) {
    throw new Error('useDeckAndHand must be used within a DeckAndHandContextProvider')
  }
  return context
}
