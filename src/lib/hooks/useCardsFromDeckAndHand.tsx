import { useCallback, useEffect, useState } from 'react'
import deckOfCards from '../Projects'

export type Card = {
  id: string
  color: string
  projectData?: ProjectData
}

export type ProjectData = {
  imageUrl: string
  title: string
  description: string
  siteUrl?: string
  githubUrl?: string
  techStack?: string[]
  roles?: string[]
  disableIframe?: boolean
}

// an array of cards
export type DeckOfCards = Array<Card>
export type Hand = Array<Card>

// Purely responsible for keeping track of and updating the users hand, draw, and discard piles
const useCardsFromDeckAndHand = () => {
  const [hand, setHand] = useState<Card[]>([])
  const [drawPile, setDrawPile] = useState<DeckOfCards>(deckOfCards)
  const [discardPile, setDiscardPile] = useState<Card[]>([])

  const discardHandAndDrawFive = useCallback(() => {
    const tempDiscardPile = [...discardPile, ...hand]
    const tempDrawPile = [...drawPile]
    const tempHand = [...tempDrawPile.splice(0, 5)]

    setHand(tempHand)
    setDrawPile(tempDrawPile)
    setDiscardPile(tempDiscardPile)
  }, [drawPile, hand, discardPile])

  const drawUntilHandIsFull = useCallback(() => {
    if (drawPile.length < 5) {
      const tempHand = [...drawPile]
      const tempDrawPile = [...discardPile, ...hand]
      const tempDiscardPile: [] = []
      const handLength = 5 - tempHand.length

      for (let i = 0; i < handLength; i++) {
        const card = tempDrawPile.shift()
        card && tempHand.push(card)
      }

      setHand(tempHand)
      setDrawPile(tempDrawPile)
      setDiscardPile(tempDiscardPile)
      return
    }

    discardHandAndDrawFive()
  }, [drawPile, hand, discardPile, discardHandAndDrawFive])

  useEffect(() => {
    if (hand.length < 5) {
      drawUntilHandIsFull()
    }
  }, [drawUntilHandIsFull, hand])

  return {
    hand,
    drawPile,
    discardPile,
    drawUntilHandIsFull,
  }
}

export default useCardsFromDeckAndHand
