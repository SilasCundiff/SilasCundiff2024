import { useCallback, useEffect, useState } from 'react'

export type Card = {
  id: string
  color: string
  imageUrl: string
  title: string
  description: string
  siteUrl?: string
  githubUrl?: string
  techStack?: string[]
}

// an array of cards
export type DeckOfCards = Array<Card>
export type Hand = Array<Card>

const deckOfCards = [
  {
    id: 'card-1',
    color: '#FBBF24',
    imageUrl: 'cards/silascundiff.com.png',
    title: 'My old portfolio',
    description: 'A previous portfolio',
    siteUrl: 'https://silascundiff.com',
    techStack: ['React', 'TypeScript', 'Nextjs'],
  },
  {
    id: 'card-2',
    color: '#EF4444',
    imageUrl: 'cards/project-image.png',
    title: 'Zenify',
    description: 'An audio visualizer that uses the Spotify API to create a unique experience for each song',
    siteUrl: 'https://zenify.silascundiff.com',
    techStack: ['React', 'TypeScript', 'Three.js', 'Tailwind CSS', 'SpotifyAPI', 'Vercel', 'Nextjs'],
  },
  {
    id: 'card-3',
    color: '#10B981',
    imageUrl: 'cards/avanos.com.png',
    title: 'Title 3',
    description: 'Description 3',
    siteUrl: 'https://silascundiff.com',
  },
  {
    id: 'card-4',
    color: '#3B82F6',
    imageUrl: 'cards/beacham.com.png',
    title: 'Title 4',
    description: 'Description 4',
    siteUrl: 'https://silascundiff.com',
  },
  {
    id: 'card-5',
    color: '#6D28D9',
    imageUrl: 'cards/project-image.png',
    title: 'Title 5',
    description: 'Description 5',
    siteUrl: 'https://silascundiff.com',
  },
  {
    id: 'card-6',
    color: '#F472B6',
    imageUrl: 'cards/project-image.png',
    title: 'Title 6',
    description: 'Description 6',
    siteUrl: 'https://silascundiff.com',
  },
  {
    id: 'card-7',
    color: '#6366F1',
    imageUrl: 'cards/project-image.png',
    title: 'Title 7',
    description: 'Description 7',
    siteUrl: 'https://silascundiff.com',
  },
  {
    id: 'card-8',
    color: '#EC4899',
    imageUrl: 'cards/project-image.png',
    title: 'Title 8',
    description: 'Description 8',
    siteUrl: 'https://silascundiff.com',
  },
  {
    id: 'card-9',
    color: '#F59E0B',
    imageUrl: 'cards/project-image.png',
    title: 'Title 9',
    description: 'Description 9',
    siteUrl: 'https://silascundiff.com',
  },
  {
    id: 'card-10',
    color: '#D97706',
    imageUrl: 'cards/project-image.png',
    title: 'Title 10',
    description: 'Description 10',
    siteUrl: 'https://silascundiff.com',
  },
  {
    id: 'card-11',
    color: '#EF4444',
    imageUrl: 'cards/project-image.png',
    title: 'Title 11',
    description: 'Description 11',
    siteUrl: 'https://silascundiff.com',
  },
  {
    id: 'card-12',
    color: '#93C5FD',
    imageUrl: 'cards/project-image.png',
    title: 'Title 12',
    description: 'Description 12',
    siteUrl: 'https://silascundiff.com',
  },
  {
    id: 'card-13',
    color: '#A78BFA',
    imageUrl: 'cards/project-image.png',
    title: 'Title 13',
    description: 'Description 13',
    siteUrl: 'https://silascundiff.com',
  },
  {
    id: 'card-14',
    color: '#FBCFE8',
    imageUrl: 'cards/project-image.png',
    title: 'Title 14',
    description: 'Description 14',
    siteUrl: 'https://silascundiff.com',
  },
  {
    id: 'card-15',
    color: '#FDE68A',
    imageUrl: 'cards/project-image.png',
    title: 'Title 15',
    description: 'Description 15',
    siteUrl: 'https://silascundiff.com',
  },
  {
    id: 'card-16',
    color: '#DB2777',
    imageUrl: 'cards/project-image.png',
    title: 'Title 16',
    description: 'Description 16',
    siteUrl: 'https://silascundiff.com',
  },
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

  return {
    hand,
    drawPile,
    discardPile,
    drawUntilHandIsFull,
  }
}

export default useCardsFromDeckAndHand
