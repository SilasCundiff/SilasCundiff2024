import { useFrame, useThree } from '@react-three/fiber'
import { useGesture } from '@use-gesture/react'
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Vector3 } from 'three'
import { DraggingContext, CardContext } from './CardGameExperience'
import { gsap } from 'gsap'
import { useBounds } from '@react-three/drei'

export default function Card({
  cardId,
  color,
  position,
  cardWidth,
  cardHeight,
}: {
  cardId: string
  color: string
  position: Vector3
  cardWidth: number
  cardHeight: number
}) {
  console.log('card rendered', position)
  const { isDragging, setIsDragging } = useContext(DraggingContext)
  const { activeCard, setActiveCard, cardDropZonePosition } = useContext(CardContext)
  const [isCardActive, setIsCardActive] = useState(false)
  const { size, viewport } = useThree()
  const [aspect, setAspect] = useState(size.width / viewport.width)
  const realTimePositionRef = useRef<Vector3 | null>(position)
  const cardRef = useRef<any>(null)
  const originalPosition = useRef<Vector3 | null>(position)

  const checkOverlap = useCallback(() => {
    const cardPos = realTimePositionRef.current
    const dropZonePos = cardDropZonePosition
    const distance = cardPos.distanceTo(dropZonePos)
    return distance <= 1.5
  }, [realTimePositionRef, cardDropZonePosition])

  const bind = useGesture(
    {
      onDrag: ({ offset: [x, y], event }) => {
        // event.stopPropagation()
        const newPos = new Vector3(x / aspect, -y / aspect, 0)

        setIsDragging(true)
        realTimePositionRef.current = newPos
      },
      onDragEnd: ({ offset: [x, y], event }) => {
        event.stopPropagation()
        if (checkOverlap()) {
          if (!isCardActive) {
            setActiveCard(cardId)
            realTimePositionRef.current = cardDropZonePosition
          } else if (isCardActive) {
          }
        } else if (!checkOverlap()) {
          setActiveCard(activeCard === cardId ? null : activeCard)
          realTimePositionRef.current = originalPosition.current
        }
      },
      // onHover: ({ active, event }) => {
      //   event.stopPropagation()
      //   if (!isDragging) {
      //     if (active) {
      //       gsap.to(event.target, { scale: 1.1, duration: 0.1 })
      //     } else {
      //       gsap.to(event.target, { scale: 1, duration: 0.1 })
      //     }
      //   }
      // },
    },
    {
      drag: {
        from: () => [position.x * aspect, -position.y * aspect],
      },
    },
  )

  useEffect(() => {
    if (activeCard === cardId) {
      if (checkOverlap()) {
        setIsCardActive(true)
      }
    } else {
      setIsCardActive(false)
      realTimePositionRef.current = originalPosition.current
    }
  }, [activeCard, cardId, originalPosition, checkOverlap])

  return (
    // @ts-ignore
    <mesh position={realTimePositionRef.current} {...bind()} ref={cardRef}>
      <planeGeometry args={[cardWidth, cardHeight, 1]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}
