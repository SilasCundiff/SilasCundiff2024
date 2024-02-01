import { useCardDropZoneContext } from '@/helpers/contexts/CardDropZoneContext'
import { Html, Text } from '@react-three/drei'
import { CARD_HEIGHT, CARD_WIDTH } from '@/helpers/constants'
import { Vector3 } from 'three'

export default function CardDropZone() {
  const { cardDropZonePosition } = useCardDropZoneContext()
  return (
    <mesh position={cardDropZonePosition}>
      <planeGeometry args={[CARD_WIDTH, CARD_HEIGHT, 1]} />
      <meshBasicMaterial color='#000' opacity={0.3} transparent={true} />
      <Text
        font='/fonts/PressStart2P-Regular.ttf'
        fontSize={0.1}
        maxWidth={0.5}
        anchorY={'middle'}
        anchorX={'center'}
        position={new Vector3(0, 0, 0.01)}
      >
        Card Drop Zone
        <meshBasicMaterial color={'#000'} />
      </Text>
    </mesh>
  )
}
