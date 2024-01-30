import { useCallback, useEffect, useState } from 'react'

export type Card = {
  id: string
  color: string
  imageUrl: string
  title: string
  description: string
}

// an array of cards
export type DeckOfCards = Array<Card>
export type Hand = Array<Card>

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

  console.log('hand in hook', hand, 'draw', drawPile, 'discard', discardPile)

  return {
    hand,
    drawPile,
    discardPile,
    drawUntilHandIsFull,
  }
}

export default useCardsFromDeckAndHand
