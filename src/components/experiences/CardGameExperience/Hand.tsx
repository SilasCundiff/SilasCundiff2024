import { Vector3 } from 'three'
import Card from './Card'

export default function Hand({
  currentHand,
  cardPositions,
  size: { cardWidth = 1.75, cardHeight = 2.5 },
}: {
  currentHand: any[]
  cardPositions: Vector3[]
  size: { cardWidth: number; cardHeight: number }
}) {
  return (
    <group>
      <color args={['#1e1e1e']} attach='background' />
      {currentHand.map(({ id, color }, index) => {
        const cardPosition = cardPositions[index]
        console.log(cardPosition)
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
      <mesh position={[0, -2, -0.1]}>
        <planeGeometry args={[10, 2.5, 1]} />
        <meshBasicMaterial />
      </mesh>
    </group>
  )
}
