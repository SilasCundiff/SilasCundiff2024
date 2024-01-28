import { useContext } from 'react'
import { CardContext } from './CardGameExperience'
import { Html } from '@react-three/drei'

export default function CardDropZone({
  size = {
    cardWidth: 1.75,
    cardHeight: 2.5,
  },
}) {
  const { cardDropZonePosition } = useContext(CardContext)
  return (
    <mesh position={cardDropZonePosition}>
      <planeGeometry args={[size.cardWidth, size.cardHeight, 1]} />
      <meshBasicMaterial color='#000' opacity={0.3} transparent={true} />
      <Html center zIndexRange={[-1, 0]}>
        <p className='max-w-[4ch] select-none font-pressStart text-[8px] text-white md:text-[8px]'>Card Drop Zone</p>
      </Html>
    </mesh>
  )
}
