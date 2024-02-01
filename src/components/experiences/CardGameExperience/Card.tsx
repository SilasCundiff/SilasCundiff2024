import { useThree } from '@react-three/fiber'
import { useGesture } from '@use-gesture/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Euler, Vector3, Vector3Tuple } from 'three'
import { Text, useFont } from '@react-three/drei'
import { useCardDropZoneContext } from '@/helpers/contexts/CardDropZoneContext'
import { useSpring, animated, SpringValue } from '@react-spring/three'

type CardProps = {
  cardId: string
  color: string
  index: number
  cardWidth: number
  cardHeight: number
  position: SpringValue<Vector3Tuple>
  rotation: Euler
}

export default function Card({ cardId, index, color, cardWidth, cardHeight, position, rotation }: CardProps) {
  const { cardInDropZone, setCardInDropZone, cardDropZonePosition, cardDropZoneRotation } = useCardDropZoneContext()
  const [isCardActive, setIsCardActive] = useState(false)
  const { viewport } = useThree()
  const cardRef = useRef<any>(null)

  const [{ cardPosition, cardRotation, cardScale }, api] = useSpring(() => ({
    from: {
      cardPosition: position,
      cardRotation: rotation,
      cardScale: 0.5,
    },
    to: {
      cardPosition: position,
      cardRotation: rotation,
      cardScale: 1,
    },
    config: {
      mass: 1,
      tension: 170,
      friction: 26,
    },
    immediate: true,
  }))

  const checkOverlap = useCallback(() => {
    const cardPos = cardRef.current?.position
    const dropZonePos = cardDropZonePosition
    const distance = cardPos?.distanceTo(dropZonePos)

    if (!distance) return false
    return distance <= 2.75
  }, [cardRef, cardDropZonePosition])

  const bind = useGesture(
    {
      onDrag: ({ down, event }) => {
        event.stopPropagation()
        // @ts-ignore
        let newPosition: SpringValue<Vector3Tuple> = new Vector3(event.point.x, event.point.y, 1.8)
        let newRotation: Euler = rotation

        if (down) {
          newPosition = newPosition
          newRotation = new Euler(0, 0, 0)
        } else if (checkOverlap()) {
          if (!isCardActive) {
            setCardInDropZone(cardId)
          }
          // @ts-ignore
          newPosition = [cardDropZonePosition.x, cardDropZonePosition.y, 1.8]
          newRotation = cardDropZoneRotation
        } else {
          newPosition = position
          newRotation = rotation
          setCardInDropZone(null)
        }
        api.start({
          cardPosition: newPosition,
          cardRotation: newRotation,
          immediate: true,
        })
      },
      onHover: ({ hovering, event }) => {
        event.stopPropagation()
        api.start({
          cardScale: hovering ? 1.1 : 1,
        })
      },
    },
    {
      drag: {
        bounds: {
          left: -viewport.width / 2,
          right: viewport.width / 2,
          top: -viewport.height / 2,
          bottom: viewport.height / 2,
        },
      },
    },
  )

  // Swaps out the active card when a new card is dragged over the drop zone while it has a card already
  useEffect(() => {
    if (position.id === 26) {
      console.log('position', position.animation)
    }
    if (cardInDropZone === cardId) {
      if (checkOverlap()) {
        setIsCardActive(true)
      }
    } else {
      setIsCardActive(false)
      let newPosition: Vector3 | SpringValue<Vector3Tuple> = position
      api.start({
        cardPosition: newPosition,
        cardRotation: rotation,
      })
    }
  }, [cardInDropZone, cardId, api, position, rotation, checkOverlap])

  return (
    // @ts-ignore
    <animated.group position={cardPosition} rotation={cardRotation} scale={cardScale} {...bind()} ref={cardRef}>
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
        position={new Vector3(0, 0, 0.01)}
      >
        {cardId}
        <meshBasicMaterial color={'#000'} />
      </Text>
    </animated.group>
  )
}

useFont.preload('/fonts/PressStart2P-Regular.ttf')
