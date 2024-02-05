import { useThree } from '@react-three/fiber'
import { useGesture } from '@use-gesture/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import THREE, { DoubleSide, Euler, NoBlending, Vector3, Vector3Tuple } from 'three'
import { Bounds, Html, MeshPortalMaterial, Text, useFont } from '@react-three/drei'
import { useCardDropZoneContext } from '@/helpers/contexts/CardDropZoneContext'
import { useSpring, animated, SpringValue } from '@react-spring/three'
import { useCardDraggingContext } from '@/helpers/contexts/CardDraggingContext'

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
  const [isCardBeingDragged, setIsCardBeingDragged] = useState(false)

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
      onDrag: ({ down, event, active }) => {
        if (isCardActive) return
        setIsCardBeingDragged(active)
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
        <planeGeometry
          args={[
            cardInDropZone === cardId ? cardWidth * 5 : cardWidth,
            cardInDropZone === cardId ? cardHeight * 1.5 : cardHeight,
            1,
          ]}
        />
        <MeshPortalMaterial>
          <ProjectStage isCardActive={isCardActive} />
        </MeshPortalMaterial>
      </mesh>
    </animated.group>
  )
}

useFont.preload('/fonts/PressStart2P-Regular.ttf')

const ProjectStage = ({ isCardActive }: { isCardActive: boolean }) => {
  const [z, setZ] = useState(0)
  const viewport = useThree((state) => state.viewport)
  const distanceFactor = Math.min(Math.max(window.innerWidth / 1900, 1), 1.5)
  const [loading, setLoading] = useState(true)

  return (
    <>
      {isCardActive ? (
        <mesh>
          <Html transform prepend zIndexRange={[0, 0]} distanceFactor={distanceFactor * 2.5}>
            <div className='bg-white max-h-32 max-w-full p-4 font-pressStart rounded-t-md'>
              <h2 className='text-4xl text-black font-alagard mb-2'>Zenify</h2>
              <p className='text-xs mb-2'>
                An audio visualizer that uses the Spotify API to create a unique experience for each song.
              </p>
              <p className='text-xs'>React | Nextjs | ThreeJs | SpotifyAPI | SpotifyWebSDK</p>
            </div>
            {loading ? (
              <div className='project-iframe-loading text-4xl text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                loading
              </div>
            ) : null}
            (
            <iframe
              className=''
              src='https://zenify.silascundiff.com'
              onLoad={() => {
                setLoading(false)
              }}
              frameBorder='0'
              style={{ verticalAlign: 'top' }}
              width={560 * 2}
              height={315 * 2}
            />
            )
          </Html>
        </mesh>
      ) : (
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[10, 10, 1]} />
          <meshBasicMaterial color='#000' />
          <Text
            font='/fonts/PressStart2P-Regular.ttf'
            fontSize={0.1}
            maxWidth={0.5}
            anchorY={'middle'}
            anchorX={'center'}
            position={new Vector3(0, 0, 0.01)}
          >
            Card Drop Zone
            <meshBasicMaterial color={'#fff'} />
          </Text>
        </mesh>
      )}
    </>
  )
}
