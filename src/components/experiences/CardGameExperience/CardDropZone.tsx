import { useCardDropZoneContext } from '@/helpers/contexts/CardDropZoneContext'
import { Html } from '@react-three/drei'
import { CARD_HEIGHT, CARD_WIDTH } from '@/helpers/constants'

export default function CardDropZone() {
  const { cardDropZonePosition } = useCardDropZoneContext()
  return (
    <mesh position={cardDropZonePosition}>
      <planeGeometry args={[CARD_WIDTH, CARD_HEIGHT, 1]} />
      <meshBasicMaterial color='#000' opacity={0.3} transparent={true} />
      <Html center zIndexRange={[-1, 0]}>
        <p className='max-w-[4ch] select-none font-pressStart text-[8px] text-white md:text-[8px]'>Card Drop Zone</p>
      </Html>
    </mesh>
  )
}
