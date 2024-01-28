import { Vector3 } from 'three'
import Card from './Card'
import { useBounds } from '@react-three/drei'

export default function Hand({
  currentHand,
  cardPositions,
  size: { cardWidth = 1.75, cardHeight = 2.5 },
}: {
  currentHand: any[]
  cardPositions: Vector3[]
  size: { cardWidth: number; cardHeight: number }
}) {
  const api = useBounds()
  return (
    <group>
      {/* <color args={['#1e1e1e']} attach='background' /> */}
      {currentHand.map(({ id, color }, index) => {
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
      {/* <mesh position={[0, -2, -0.1]}>
        <planeGeometry args={[12, 2.5, 1]} />
        <meshBasicMaterial color={'#000'} opacity={0.4} transparent />
      </mesh> */}
    </group>
  )
}
