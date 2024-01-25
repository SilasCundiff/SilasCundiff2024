import { useFrame, useThree } from '@react-three/fiber'
import { useGesture } from '@use-gesture/react'
import { use, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Vector2, Vector3 } from 'three'
import { DraggingContext, CardContext } from './CardGameExperience'
import { gsap } from 'gsap'
import { useBounds } from '@react-three/drei'
import { debounce } from 'lodash'

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
  const api = useBounds()

  useFrame((state) => {
    aspect.current = size.width / viewport.width
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
    return distance <= 1.5
  }, [realTimePositionRef, cardDropZonePosition])

  const bind = useGesture(
    {
      onDrag: ({ offset: [x, y], event }) => {
        event.stopPropagation()

        // Adjust this to the actual offset of your canvas from the top of the screen
        const yOffset = 96

        // Convert screen coordinates to NDC
        const ndcX = (x / size.width) * 2 - 1
        const ndcY = -(y / size.height) * 2 + 1

        // Convert NDC to world coordinates
        const newPos = new Vector3(ndcX, ndcY, 0).unproject(camera)
        newPos.z = 1.01
        newPos.y += yOffset
        console.log('Dragged', newPos)
        realTimePositionRef.current = newPos
        setIsDragging(true)
      },
      onDragEnd: ({ offset: [x, y], event }) => {
        event.stopPropagation()
        console.log('Drag ended', realTimePositionRef.current, cardDropZonePosition)
        if (checkOverlap()) {
          if (!isCardActive) {
            setActiveCard(cardId)
            realTimePositionRef.current = cardDropZonePosition
          } else if (isCardActive) {
            realTimePositionRef.current = cardDropZonePosition
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

          const yOffset = screenSize.y * 0.75 // Adjust this based on cursor position on the card

          const screenPosition = cardRef.current.position.clone().project(camera)
          const x = ((screenPosition.x + 1) / 2) * size.width
          const y = (-(screenPosition.y - 1) / 2) * size.height + yOffset

          return [x, y]
        },
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

  //update aspect ratio
  useEffect(() => {
    aspect.current = size.width / viewport.width
  }, [size, viewport])

  useEffect(() => {
    console.log('Size:', size)
    console.log('Viewport:', viewport)
    console.log('Aspect Ratio:', aspect.current)
  }, [size, viewport])

  return (
    // @ts-ignore
    <mesh position={realTimePositionRef.current} {...bind()} ref={cardRef}>
      <planeGeometry args={[cardWidth, cardHeight, 1]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}
