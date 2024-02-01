import { Canvas } from '@react-three/fiber'
import CardGameExperience from '../experiences/CardGameExperience/CardGameExperience'
import { CardDraggingContextProvider } from '@/helpers/contexts/CardDraggingContext'
import { CardDropZoneContextProvider } from '@/helpers/contexts/CardDropZoneContext'
import { Bounds, useFont } from '@react-three/drei'
import useCardsFromDeckAndHand from '@/helpers/hooks/useCardsFromDeckAndHand'
import DeckAndHandContextProvider, { DeckAndHandContext } from '@/helpers/contexts/DeckAndHandContext'
import { useCardDropZoneContext } from '@/helpers/contexts/CardDropZoneContext'

export default function CardGameCanvas() {
  const { hand, drawPile, discardPile, drawUntilHandIsFull } = useCardsFromDeckAndHand()
  const { cardInDropZone, setCardInDropZone } = useCardDropZoneContext()

  const handleEndTurn = () => {
    setCardInDropZone(null)
    drawUntilHandIsFull()
  }

  const handleClearActiveCard = () => {
    setCardInDropZone(null)
  }

  return (
    <div className='relative h-svh md:max-h-[calc(100svh-96px)] w-full my-auto'>
      <DeckAndHandContextProvider hand={hand}>
        <Canvas
          className='pointer-events-none visible'
          resize={{ scroll: false }}
          orthographic
          dpr={[1, 2]}
          camera={{ position: [0, 0, 10], zoom: 100 }}
        >
          {/* <Bounds fit clip observe margin={1}> */}
          {/* <color attach='background' args={['#fee']} /> */}
          <CardDraggingContextProvider>
            <CardDropZoneContextProvider>
              <CardGameExperience />
            </CardDropZoneContextProvider>
          </CardDraggingContextProvider>
          {/* </Bounds> */}
        </Canvas>
        <div className='absolute bottom-0 container mx-auto pointer-events-none'>
          <button
            onClick={handleEndTurn}
            className='eightbit-btn pointer-events-auto px-4 py-2 font-pressStart text-sm text-white'
          >
            End turn
          </button>
          <button
            onClick={handleClearActiveCard}
            className='eightbit-btn pointer-events-auto px-4 py-2 font-pressStart text-sm text-white'
          >
            Clear Active Card
          </button>
        </div>
        <div className='pointer-events-none inset-0 z-0 absolute flex size-full items-end justify-center space-x-4 pb-4'>
          <div className='font-pressStart text-white'>Draw Pile: {drawPile.length}</div>
          <div className='font-pressStart text-white'>Discard Pile: {discardPile.length}</div>
        </div>
      </DeckAndHandContextProvider>
    </div>
  )
}

useFont.preload('/fonts/alagard.ttf')
