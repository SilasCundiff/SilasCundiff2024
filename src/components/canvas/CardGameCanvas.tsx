'use client'
import { Canvas } from '@react-three/fiber'
import CardGameExperience from '../experiences/CardGameExperience/CardGameExperience'

import { Bounds, useFont } from '@react-three/drei'
import useCardsFromDeckAndHand from '@/helpers/hooks/useCardsFromDeckAndHand'
import { useCardDropZoneContext } from '@/helpers/contexts/CardDropZoneContext'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { useDeckAndHandContext } from '@/helpers/contexts/DeckAndHandContext'

export default function CardGameCanvas() {
  const { hand, drawPile, discardPile, drawUntilHandIsFull } = useDeckAndHandContext()
  const { cardInDropZone, setCardInDropZone } = useCardDropZoneContext()
  const canvasRef = useRef()
  const bodyRef = useRef()
  useLayoutEffect(() => {
    // @ts-ignore
    canvasRef.current.parentNode.style.position = 'absolute'
    // @ts-ignore
    canvasRef.current.parentNode.style.zIndex = 3
  }, [])

  useEffect(() => {
    // @ts-ignore
    bodyRef.current = document.querySelector('.cardGameRoot')
  }, [])

  const handleEndTurn = () => {
    setCardInDropZone(null)
    console.log('end turn', cardInDropZone)
    drawUntilHandIsFull()
  }

  const handleClearActiveCard = () => {
    setCardInDropZone(null)
  }

  return (
    <div className='cardGameRoot relative h-svh md:max-h-[calc(100svh-96px)] w-full my-auto'>
      <Canvas
        // @ts-ignore
        ref={canvasRef}
        eventSource={bodyRef && bodyRef.current}
        resize={{ scroll: false }}
        orthographic
        dpr={[1, 2]}
        camera={{ position: [0, 0, 10], zoom: 100 }}
      >
        <CardGameExperience />
      </Canvas>
      <div className='absolute bottom-0 container mx-auto pointer-events-none z-20'>
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
    </div>
  )
}

useFont.preload('/fonts/alagard.ttf')
