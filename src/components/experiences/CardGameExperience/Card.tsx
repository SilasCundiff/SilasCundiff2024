import { useFrame, useThree } from '@react-three/fiber'
import { useGesture } from '@use-gesture/react'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Vector3 } from 'three'
import { DraggingContext, CardContext } from './CardGameExperience'
import { gsap } from 'gsap'

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
  const { isDragging, setIsDragging } = useContext(DraggingContext)
  const { activeCard, setActiveCard, cardDropZonePosition } = useContext(CardContext)
  const [isCardActive, setIsCardActive] = useState(false)
  const { size, viewport } = useThree()
  const aspect = useRef(size.width / viewport.width)
  const realTimePositionRef = useRef<Vector3 | null>(position)
  const cardRef = useRef<any>(null)
  const originalPosition = useRef<Vector3 | null>(position)

  useFrame((state) => {
    if (cardRef.current) {
      cardRef.current.position.x = realTimePositionRef.current.x
      cardRef.current.position.y = realTimePositionRef.current.y
      cardRef.current.position.z = realTimePositionRef.current.z
    }
  })

  const checkOverlap = useCallback(() => {
    const cardPos = realTimePositionRef.current
    const dropZonePos = cardDropZonePosition
    const distance = cardPos.distanceTo(dropZonePos)

    return distance <= 2.75
  }, [realTimePositionRef, cardDropZonePosition])

  const bind = useGesture(
    {
      onDrag: ({ event }) => {
        setIsDragging(true)
        realTimePositionRef.current = new Vector3(event.point.x, event.point.y, 2)
      },
      onDragEnd: ({ event }) => {
        event.stopPropagation()
        const zOffset = 0.1
        if (checkOverlap()) {
          if (!isCardActive) {
            setActiveCard(cardId)
            gsap.to(realTimePositionRef.current, { ...cardDropZonePosition.clone().setZ(zOffset), duration: 0.2 })
          } else if (isCardActive) {
            gsap.to(realTimePositionRef.current, { ...cardDropZonePosition.clone().setZ(zOffset), duration: 0.2 })
          }
        } else if (!checkOverlap()) {
          setActiveCard(activeCard === cardId ? null : activeCard)
          gsap.to(realTimePositionRef.current, { ...originalPosition.current, duration: 0.2 })
        }
        setIsDragging(false)
      },
      onHover: ({ active, event }) => {
        event.stopPropagation()
        if (isDragging) return
        if (active) {
          gsap.to(cardRef.current.position, { z: 1.1, duration: 0.1 })
          gsap.to(cardRef.current.scale, { x: 1.1, y: 1.1, duration: 0.1 })
        } else {
          gsap.to(cardRef.current.position, { z: 1, duration: 0.1 })
          gsap.to(cardRef.current.scale, { x: 1, y: 1, duration: 0.1 })
        }
      },
    },
    {
      drag: {
        filterTaps: true,
        bounds(state) {
          console.log(state)
          return {
            left: 0,
            right: size.width,
            top: 0,
            bottom: size.height,
          }
        },
      },
    },
  )

  // checks if the card is active, and if it is, moves it to the drop zone, otherwise moves it back to its original position
  useEffect(() => {
    if (activeCard === cardId) {
      if (checkOverlap()) {
        setIsCardActive(true)
      }
    } else {
      setIsCardActive(false)
      gsap.to(realTimePositionRef.current, { ...originalPosition.current, duration: 0.2 })
    }
  }, [activeCard, cardId, originalPosition, checkOverlap])

  //update aspect ratio to fix weird card cursor offset misalignment
  useEffect(() => {
    aspect.current = size.width / viewport.width
  }, [size, viewport])

  return (
    // @ts-ignore
    <mesh position={realTimePositionRef.current} {...bind()} ref={cardRef}>
      <planeGeometry args={[cardWidth, cardHeight, 1]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}
