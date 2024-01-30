import { Euler, Vector3 } from 'three'
import Card from './Card'
import { useDeckAndHandContext } from '@/helpers/contexts/DeckAndHandContext'
import { CARD_HEIGHT, CARD_WIDTH } from '@/helpers/constants'

export default function Hand() {
  const { hand } = useDeckAndHandContext()
  const cardsInHandPositions = [
    new Vector3(-2, -2.4, 1.3),
    new Vector3(-1, -2.15, 1.2),
    new Vector3(0, -2, 1.1),
    new Vector3(1, -2.15, 1.4),
    new Vector3(2, -2.4, 1.5),
  ]
  const cardsInHandRotations = [
    new Euler(0, 0, 0.25),
    new Euler(0, 0, 0.15),
    new Euler(0, 0, 0),
    new Euler(0, 0, -0.15),
    new Euler(0, 0, -0.25),
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
              rotation={cardsInHandRotations[index]}
              cardWidth={CARD_WIDTH}
              cardHeight={CARD_HEIGHT}
            />
          )
        })}
    </group>
  )
}
