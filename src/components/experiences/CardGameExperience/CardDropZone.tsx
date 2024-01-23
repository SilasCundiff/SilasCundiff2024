import { useContext } from 'react'
import { CardContext } from './CardGameExperience'
import { Vector3 } from 'three'

export default function CardDropZone() {
  const { cardDropZonePosition } = useContext(CardContext)
  return (
    <mesh position={new Vector3(cardDropZonePosition[0], cardDropZonePosition[1], cardDropZonePosition[2])}>
      <planeGeometry args={[1.75, 2.5, 1]} />
      <meshBasicMaterial color='#000' />
    </mesh>
  )
}
