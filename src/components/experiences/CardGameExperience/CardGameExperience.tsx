import { useThree } from '@react-three/fiber'
import CardDropZone from './CardDropZone'
import Hand from './Hand'
import CardGameHUD from './CardGameHUD'
import { Card } from '@/lib/hooks/useCardsFromDeckAndHand'
import { PresentationControls } from '@react-three/drei'
import { useCardDraggingContext } from '@/lib/contexts/CardDraggingContext'

export default function CardGameExperience({
  drawPile,
  discardPile,
  handleEndTurn,
  handleLockControls,
  areControlsLocked,
}: {
  drawPile: Card[]
  discardPile: Card[]
  handleEndTurn: () => void
  handleLockControls: () => void
  areControlsLocked: boolean
}) {
  const gameScalingFactor = Math.min(Math.max(window.innerWidth / 1162, 0.5), 1)

  return (
    <>
      <group scale={gameScalingFactor}>
        <CardDropZone />
        <Hand />
        <CardGameHUD
          drawPile={drawPile}
          discardPile={discardPile}
          handleEndTurn={handleEndTurn}
          handleLockControls={handleLockControls}
          areControlsLocked={areControlsLocked}
        />
      </group>
    </>
  )
}
