import { useThree } from '@react-three/fiber'
import { useGesture } from '@use-gesture/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Euler, Vector3, Vector3Tuple } from 'three'
import { Html, Text, useFont } from '@react-three/drei'
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
        if (isCardActive) return
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
          newPosition = [cardDropZonePosition.x, cardDropZonePosition.y, 1.2]
          newRotation = cardDropZoneRotation
        } else {
          newPosition = position
          newRotation = rotation
          if (cardInDropZone === cardId) {
            setCardInDropZone(null)
          }
        }
        api.start({
          cardPosition: newPosition,
          cardRotation: newRotation,
          immediate: true,
        })
      },
      onHover: ({ hovering, event }) => {
        event.stopPropagation()
        if (isCardActive) return
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

  useEffect(() => {
    if (cardInDropZone === cardId) {
      console.log('cardRef', cardRef.current)
    }
  }, [cardInDropZone, cardId])

  return (
    // @ts-ignore
    <animated.group position={cardPosition} rotation={cardRotation} scale={cardScale} {...bind()} ref={cardRef}>
      <mesh>
        <planeGeometry
          args={[
            cardInDropZone === cardId ? cardWidth * 5 : cardWidth,
            cardInDropZone === cardId ? cardHeight * 1.5 : cardHeight,
            1,
          ]}
        />
        <meshBasicMaterial color={color} />
      </mesh>
      {cardInDropZone !== cardId && (
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
      )}
      {cardInDropZone === cardId && (
        <Html prepend zIndexRange={[0, 0]} transform distanceFactor={3} position={[0, 0, 0.1]}>
          <div className='bg-white'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src='/img/jungle_bg/grasses.png'
              alt='image'
              className='w-full max-h-full absolute inset-0 z-0 object-cover'
            />
            <div className='text-white bg-slate-900/20 text-2xl z-0 relative flex flex-col'>
              <h2>Project Info</h2> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis tempora at rerum
              <div>
                blanditiis ratione totam eos temporibus consequuntur! Corrupti asperiores repellendus dolor sapiente eum
                consequuntur reprehenderit in cupiditate omnis sint. Odit nostrum nam recusandae vitae possimus illo
                minus nulla dicta, accusamus, culpa, at temporibus. Quos impedit explicabo id esse numquam natus! Unde
                sLaudantium, nam blanditiis repellendus odit aut commodi modi ut corrupti dolores eligendi porro
                perspiciatis incidunt quidem fugiat, suscipit doloribus. Eveniet ipsa ullam tempora consequatur minus,
                sed mollitia sapiente earum eum laboriosam soluta atque, hic nisi nobis architecto. Unde doloremque
                praesentium atque voluptatem ducimus qui veniam pariatur labore voluptas quaerat?
              </div>
              <a target='_blank' href='https://silascundiff.com' className='pointer-event-auto bg-red-500 p-2'>
                this is a button
              </a>
            </div>
          </div>
        </Html>
      )}
    </animated.group>
  )
}

useFont.preload('/fonts/PressStart2P-Regular.ttf')

const ProjectStage = () => {}
