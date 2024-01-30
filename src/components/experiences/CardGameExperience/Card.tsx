import { useFrame, useThree } from '@react-three/fiber'
import { useGesture } from '@use-gesture/react'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Euler, Vector3 } from 'three'
import { gsap } from 'gsap'
import { Text, useFont } from '@react-three/drei'
import { useCardDropZoneContext } from '@/helpers/contexts/CardDropZoneContext'
import { useCardDraggingContext } from '@/helpers/contexts/CardDraggingContext'

export default function Card({
  cardId,
  color,
  position,
  rotation,
  cardWidth,
  cardHeight,
  ...props
}: {
  cardId: string
  color: string
  position: Vector3
  rotation: Euler
  cardWidth: number
  cardHeight: number
}) {
  const { cardInDropZone, setCardInDropZone, cardDropZonePosition, cardDropZoneRotation } = useCardDropZoneContext()
  const { isCardBeingDragged, setIsCardBeingDragged } = useCardDraggingContext()
  const [isCardActive, setIsCardActive] = useState(false)
  const { size, viewport } = useThree()
  const aspect = useRef(size.width / viewport.width)
  const cardRef = useRef<any>(null)
  const realTimePositionRef = useRef<Vector3 | null>(position)
  const originalPosition = useRef<Vector3 | null>(position)
  const realTimeRotationRef = useRef<Euler | null>(rotation)
  const originalRotation = useRef<Euler | null>(rotation)
  console.log('realTimeRotationRef.current', originalRotation.current, cardId)

  useFrame((_state) => {
    if (cardRef.current && realTimePositionRef.current) {
      cardRef.current.position.x = realTimePositionRef.current.x
      cardRef.current.position.y = realTimePositionRef.current.y
      cardRef.current.position.z = realTimePositionRef.current.z
    }
    if (cardRef.current && realTimeRotationRef.current) {
      cardRef.current.rotation.x = realTimeRotationRef.current.x
      cardRef.current.rotation.y = realTimeRotationRef.current.y
      cardRef.current.rotation.z = realTimeRotationRef.current.z
    }
  })

  const checkOverlap = useCallback(() => {
    const cardPos = realTimePositionRef.current
    const dropZonePos = cardDropZonePosition
    const distance = cardPos?.distanceTo(dropZonePos)

    if (!distance) return false

    return distance <= 2.75
  }, [realTimePositionRef, cardDropZonePosition])

  const bind = useGesture(
    {
      onDrag: ({ event }) => {
        event.stopPropagation()
        setIsCardBeingDragged(true)
        // @ts-ignore
        realTimePositionRef.current = new Vector3(event.point.x, event.point.y, 2)
        const newRotation = new Euler(0, 0, 0)
        gsap.to(realTimeRotationRef.current, {
          x: newRotation.x,
          y: newRotation.y,
          z: newRotation.z,
          duration: 0.2,
          ease: 'power1.out',
        })
      },
      onDragEnd: ({ event }) => {
        event.stopPropagation()
        const zOffset = 0.1
        setIsCardBeingDragged(false)
        if (checkOverlap()) {
          if (!isCardActive) {
            setCardInDropZone(cardId)
          }
          gsap.to(realTimePositionRef.current, { ...cardDropZonePosition.clone().setZ(zOffset), duration: 0.2 })
          gsap.to(realTimeRotationRef.current, { ...cardDropZoneRotation.clone(), duration: 0.2 })
        } else if (!checkOverlap()) {
          setCardInDropZone(cardInDropZone === cardId ? null : cardInDropZone)
          gsap.to(realTimePositionRef.current, { ...originalPosition.current, duration: 0.2 })
          gsap.to(realTimeRotationRef.current, { ...originalRotation.current, duration: 0.2 })
        }
      },
      onHover: ({ active, event }) => {
        event.stopPropagation()
        if (isCardBeingDragged) return
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
      drag: {},
    },
  )

  // Swaps out the active card when a new card is dragged over the drop zone while it has a card already
  useEffect(() => {
    if (cardInDropZone === cardId) {
      if (checkOverlap()) {
        setIsCardActive(true)
      }
    } else {
      setIsCardActive(false)
      gsap.to(realTimePositionRef.current, { ...originalPosition.current, duration: 0.2 })
      gsap.to(realTimeRotationRef.current, { ...originalRotation.current, duration: 0.2 })
    }
  }, [cardInDropZone, cardId, originalPosition, originalRotation, checkOverlap])

  //update aspect ratio to fix weird card cursor offset misalignment
  useEffect(() => {
    aspect.current = size.width / viewport.width
  }, [size, viewport])

  // Animate card to it's hand position on mount
  useEffect(() => {}, [])

  return (
    // @ts-ignore
    <group position={realTimePositionRef.current} rotation={realTimeRotationRef.current} {...bind()} ref={cardRef}>
      <mesh>
        <planeGeometry args={[cardWidth, cardHeight, 1]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <Text
        font='/fonts/PressStart2P-Regular.ttf'
        fontSize={0.1}
        maxWidth={0.9}
        anchorY={'middle'}
        anchorX={'center'}
        position={new Vector3(0, 0, 0.1)}
      >
        {cardId}
        <meshBasicMaterial color={'#000'} />
      </Text>
    </group>
  )
}

useFont.preload('/fonts/PressStart2P-Regular.ttf')
