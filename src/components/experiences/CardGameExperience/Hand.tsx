import { Vector3 } from 'three'
import Card from './Card'
import { useDeckAndHandContext } from '@/helpers/contexts/DeckAndHandContext'
import { CARD_HEIGHT, CARD_WIDTH } from '@/helpers/constants'

export default function Hand() {
  const { hand } = useDeckAndHandContext()
  const cardsInHandPositions = [
    new Vector3(-4, -2, 1.3),
    new Vector3(-2, -2, 1.2),
    new Vector3(0, -2, 1.1),
    new Vector3(2, -2, 1.4),
    new Vector3(4, -2, 1.5),
  ]

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
              cardWidth={CARD_WIDTH}
              cardHeight={CARD_HEIGHT}
            />
          )
        })}
    </group>
  )
}
