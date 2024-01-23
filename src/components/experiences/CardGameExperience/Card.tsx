import { useThree } from '@react-three/fiber'
import { useGesture } from '@use-gesture/react'
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Vector3 } from 'three'
import { DraggingContext, CardContext } from './CardGameExperience'
import { gsap } from 'gsap'

export default function Card({
  cardId,
  color,
  positions = [0, -2, 0],
}: {
  cardId: string
  color: string
  positions: number[]
}) {
  const { isDragging, setIsDragging } = useContext(DraggingContext)
  const { activeCard, setActiveCard, cardDropZonePosition } = useContext(CardContext)
  const [isCardActive, setIsCardActive] = useState(false)
  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width
  const [position, setPosition] = useState(positions)
  const realTimePosition = useRef(positions)
  const [originalPosition, setOriginalPosition] = useState(position)
  const cardWidth = 1.75
  const cardHeight = 2.5

  const checkOverlap = useCallback(() => {
    const cardPos = new Vector3(...realTimePosition.current)
    const dropZonePos = new Vector3(...cardDropZonePosition)
    const distance = cardPos.distanceTo(dropZonePos)
    return distance <= 1.5
  }, [realTimePosition, cardDropZonePosition])

  const bind = useGesture(
    {
      onDrag: ({ offset: [x, y], event }) => {
        event.stopPropagation()
        const [, , z] = position
        setPosition([x / aspect, -y / aspect, z])
        setIsDragging(true)
      },
      onDragEnd: ({ offset: [x, y], event }) => {
        event.stopPropagation()
        const [, , z] = position
        realTimePosition.current = [x / aspect, -y / aspect, z]
        if (checkOverlap()) {
          if (!isCardActive) {
            setActiveCard(cardId)
            setPosition(cardDropZonePosition)
          } else if (isCardActive) {
            setPosition(cardDropZonePosition)
          }
        } else if (!checkOverlap()) {
          setActiveCard(activeCard === cardId ? null : activeCard)
          setPosition(originalPosition)
        }
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

  useEffect(() => {
    if (activeCard === cardId) {
      if (checkOverlap()) {
        setIsCardActive(true)
      }
    } else {
      setIsCardActive(false)
      setPosition(originalPosition)
    }
  }, [activeCard, cardId, originalPosition, checkOverlap])

  return (
    // @ts-ignore
    <mesh position={positionVector} {...bind()}>
      <planeGeometry args={[cardWidth, cardHeight, 1]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}
