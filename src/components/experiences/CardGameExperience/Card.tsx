import { useFrame, useThree } from '@react-three/fiber'
import { useGesture } from '@use-gesture/react'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Vector2, Vector3 } from 'three'
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
  const { size, viewport, camera } = useThree()
  const aspect = useRef(size.width / viewport.width)
  const realTimePositionRef = useRef<Vector3 | null>(position)
  const cardRef = useRef<any>(null)
  const originalPosition = useRef<Vector3 | null>(position)

  useFrame((state) => {
    aspect.current = size.width / viewport.width
    if (cardRef.current) {
      cardRef.current.position.x = realTimePositionRef.current.x
      cardRef.current.position.y = realTimePositionRef.current.y
      cardRef.current.position.z = realTimePositionRef.current.z
    }
  })

  // used to check if the currently dragged card overlaps with the card drop zone
  const checkOverlap = useCallback(() => {
    const cardPos = realTimePositionRef.current
    const dropZonePos = cardDropZonePosition
    const distance = cardPos.distanceTo(dropZonePos)
    return distance <= 2
  }, [realTimePositionRef, cardDropZonePosition])

  const bind = useGesture(
    {
      onDrag: ({ offset: [x, y], event }) => {
        event.stopPropagation()

        // used to adjust the card's position to the cursor after resizing
        const yOffset = 96

        const ndcX = (x / size.width) * 2 - 1
        const ndcY = -(y / size.height) * 2 + 1

        const newPos = new Vector3(ndcX, ndcY, 0).unproject(camera)
        newPos.z = 1.01
        newPos.y += yOffset
        realTimePositionRef.current = newPos
        setIsDragging(true)
      },
      onDragEnd: ({ offset: [x, y], event }) => {
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
      },
      onHover: ({ active }: { active: boolean; event: {} }) => {
        if ((active && activeCard !== cardId) || !isDragging) {
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
        from: () => {
          const corner1 = new Vector3(-cardWidth / 2, -cardHeight / 2, 0)
            .applyMatrix4(cardRef.current.matrixWorld)
            .project(camera)
          const corner2 = new Vector3(cardWidth / 2, cardHeight / 2, 0)
            .applyMatrix4(cardRef.current.matrixWorld)
            .project(camera)

          const screenCorner1 = new Vector2(((corner1.x + 1) / 2) * size.width, (-(corner1.y - 1) / 2) * size.height)
          const screenCorner2 = new Vector2(((corner2.x + 1) / 2) * size.width, (-(corner2.y - 1) / 2) * size.height)

          const screenSize = screenCorner2.sub(screenCorner1)

          const yOffset = screenSize.y * 0.75 // Used to adjust the card's position to the cursor after resizing

          const screenPosition = cardRef.current.position.clone().project(camera)
          const x = ((screenPosition.x + 1) / 2) * size.width
          const y = (-(screenPosition.y - 1) / 2) * size.height + yOffset

          return [x, y]
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
