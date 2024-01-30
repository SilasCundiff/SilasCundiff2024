import { Vector3 } from 'three'
import Card from './Card'
import { useDeckAndHandContext } from '@/helpers/contexts/DeckAndHandContext'

export default function Hand({
  cardPositions,
  size: { cardWidth = 1.75, cardHeight = 2.5 },
}: {
  cardPositions: Vector3[]
  size: { cardWidth: number; cardHeight: number }
}) {
  const { hand } = useDeckAndHandContext()
  return (
    <group>
      {hand &&
        hand.map(({ id, color }, index) => {
          const cardPosition = cardPositions[index]
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
