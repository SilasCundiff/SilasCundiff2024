import { Canvas } from '@react-three/fiber'
import CardGameExperience from '../experiences/CardGameExperience/CardGameExperience'

import { Bounds, useFont } from '@react-three/drei'
import useCardsFromDeckAndHand from '@/helpers/hooks/useCardsFromDeckAndHand'
import DeckAndHandContextProvider, { DeckAndHandContext } from '@/helpers/contexts/DeckAndHandContext'
import { useContext } from 'react'

export default function CardGameCanvas() {
  const { hand, drawPile, discardPile, drawUntilHandIsFull } = useCardsFromDeckAndHand()
  console.log('hand', drawPile, discardPile)

  return (
    <div className='relative h-svh max-h-[calc(100svh-96px)] w-full'>
      <DeckAndHandContextProvider hand={hand}>
        <Canvas resize={{ scroll: false }} orthographic dpr={[1, 2]} camera={{ position: [0, 0, 10], zoom: 100 }}>
          <Bounds fit clip observe margin={1}>
            <CardGameExperience />
          </Bounds>
        </Canvas>
        <div className='absolute bottom-0'>
          <button
            onClick={() => drawUntilHandIsFull()}
            className='eightbit-btn pointer-events-auto px-4 py-2 font-pressStart text-sm text-white'
          >
            End turn
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
