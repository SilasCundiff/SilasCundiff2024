import useCardsFromDeckAndHand from '@/helpers/hooks/useCardsFromDeckAndHand'
import { useCardDropZoneContext } from '@/helpers/contexts/CardDropZoneContext'
import { useDeckAndHandContext } from '@/helpers/contexts/DeckAndHandContext'
import { useEffect, useLayoutEffect, useRef } from 'react'

export default function CardGameUI({
  handleClearActiveCard,
  handleEndTurn,
  drawPile,
  discardPile,
}: {
  handleClearActiveCard: () => void
  handleEndTurn: () => void
  drawPile: number
  discardPile: number
}) {
  return (
    <>
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
      {/* <div className='pointer-events-none inset-0 z-0 absolute flex size-full items-end justify-center space-x-4 pb-4'>
        <div className='font-pressStart text-white'>Draw Pile: {drawPile.length}</div>
        <div className='font-pressStart text-white'>Discard Pile: {discardPile.length}</div>
      </div> */}
    </>
  )
}
