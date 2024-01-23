import { useThree } from '@react-three/fiber'
import { useGesture } from '@use-gesture/react'
import { useContext, useState } from 'react'
import { Vector3 } from 'three'
import { DraggingContext } from './CardGameExperience'

export default function Card({ color, positions = [0, -2, 0] }: { color: string; positions: number[] }) {
  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width
  const [position, setPosition] = useState(positions)
  const { isDragging, setIsDragging } = useContext(DraggingContext)
  const [originalPosition, setOriginalPosition] = useState(position)
  const cardWidth = 1.75
  const cardHeight = 2.5

  const bind = useGesture(
    {
      onDrag: ({ offset: [x, y], event }) => {
        event.stopPropagation()
        const [, , z] = position
        setPosition([x / aspect, -y / aspect, z])
        setIsDragging(true)
      },
      onDragEnd: ({ event }) => {
        event.stopPropagation()
        setPosition(originalPosition)
        setIsDragging(false)
      },
      onHover: ({ active, event }) => {
        event.stopPropagation()
        if (!isDragging) {
          const [x, y, z] = position
          setPosition([x, active ? y + 0.25 : originalPosition[1], z])
        }
      },
    },
    {
      drag: {
        from: () => [position[0] * aspect, -position[1] * aspect],
        bounds: {
          left: -window.innerWidth / 2 + cardWidth / 2,
          right: window.innerWidth / 2 - cardWidth / 2,
          top: -window.innerHeight / 2 + cardHeight / 2,
          bottom: window.innerHeight / 2 - cardHeight / 2,
        },
      },
    },
  )

  const positionVector = new Vector3(position[0], position[1], position[2])

  return (
    //
    <mesh position={positionVector} {...bind()}>
      <planeGeometry args={[cardWidth, cardHeight, 1]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}
