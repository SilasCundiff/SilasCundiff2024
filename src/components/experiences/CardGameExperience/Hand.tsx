import { Vector3 } from 'three'
import Card from './Card'
import { useDeckAndHandContext } from '@/helpers/contexts/DeckAndHandContext'
import { useCardPositionUtilsContext } from '@/helpers/contexts/CardPositionUtilsContext'

export default function Hand({
  size: { cardWidth = 1.75, cardHeight = 2.5 },
}: {
  size: { cardWidth: number; cardHeight: number }
}) {
  const { hand } = useDeckAndHandContext()
  const { cardsInHandPositions } = useCardPositionUtilsContext()

  return (
    <group>
      {hand &&
        hand.map(({ id, color }, index) => {
          const cardPosition = cardsInHandPositions[index]
          cardPosition.z = 0.01 * index + 0.01 // fix z-fighting
          return (
            <Card
              key={id}
              cardId={id}
              color={color}
              position={cardPosition}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
            />
          )
        })}
    </group>
  )
}
