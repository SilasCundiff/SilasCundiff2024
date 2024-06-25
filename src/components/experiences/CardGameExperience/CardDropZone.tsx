import { useCardDropZoneContext } from '@/lib/contexts/CardDropZoneContext'
import { Text } from '@react-three/drei'
import { CARD_HEIGHT, CARD_WIDTH } from '@/lib/constants'
import { DoubleSide, FrontSide, Vector3 } from 'three'

export default function CardDropZone() {
  const { cardDropZonePosition, cardInDropZone } = useCardDropZoneContext()
  return (
    <mesh position={cardDropZonePosition}>
      <planeGeometry args={[CARD_WIDTH * 5, CARD_HEIGHT * 2, 1]} />
      <meshBasicMaterial
        color='#6c6469'
        opacity={cardInDropZone ? 0.0 : 0.4}
        transparent={true}
        side={cardInDropZone ? FrontSide : DoubleSide}
      />
      <Text
        font='/fonts/PressStart2P-Regular.ttf'
        fontSize={0.1}
        maxWidth={0.5}
        anchorY={'middle'}
        anchorX={'center'}
        position={new Vector3(0, 0, 0.01)}
      >
        Card Drop Zone
        <meshBasicMaterial
          color={'#fff'}
          opacity={cardInDropZone ? 0.0 : 1}
          transparent={true}
          side={cardInDropZone ? FrontSide : DoubleSide}
        />
      </Text>
    </mesh>
  )
}
