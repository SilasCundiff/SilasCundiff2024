import { Canvas } from '@react-three/fiber'
import CardGameExperience from '../experiences/CardGameExperience/CardGameExperience'
import { useEffect, useState } from 'react'
import { Bounds } from '@react-three/drei'

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

export default function CardGameCanvas() {
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
    <div className='relative h-svh max-h-[calc(100svh-96px)] w-full'>
      <Canvas resize={{ scroll: false }} orthographic dpr={[1, 2]} camera={{ position: [0, 0, 10], zoom: 100 }}>
        <Bounds fit clip observe margin={1.2} maxDuration={1}>
          <CardGameExperience hand={hand} />
        </Bounds>
      </Canvas>
      <div className=''>
        <button
          onClick={discardHandAndDrawFive}
          className='eightbit-btn pointer-events-auto px-4 py-2 font-pressStart text-sm text-white'
        >
          End turn
        </button>
      </div>
      <div className='pointer-events-none z-0 flex size-full items-end justify-center space-x-4 pb-4'>
        <div className='font-pressStart text-white'>Draw Pile: {drawPile.length}</div>
        <div className='font-pressStart text-white'>Discard Pile: {discardPile.length}</div>
      </div>
    </div>
  )
}
