import { useContext } from 'react'
import { CardContext } from './CardGameExperience'

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
      <meshBasicMaterial color='#000' />
    </mesh>
  )
}
