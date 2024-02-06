import { useThree } from '@react-three/fiber'
import { useGesture } from '@use-gesture/react'
import { useSpringRef, useTransition } from '@react-spring/three'
import { useCallback, useEffect, useRef, useState } from 'react'
import THREE, { DoubleSide, Euler, NoBlending, Vector3, Vector3Tuple } from 'three'
import { Bounds, Html, Image, MeshPortalMaterial, Text, useFont, useGLTF, useTexture } from '@react-three/drei'
import { useCardDropZoneContext } from '@/helpers/contexts/CardDropZoneContext'
import { useSpring, animated, SpringValue } from '@react-spring/three'
import { useCardDraggingContext } from '@/helpers/contexts/CardDraggingContext'
import { faChrome, faGitSquare, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Font } from 'three-stdlib'

type CardProps = {
  cardId: string
  color: string
  index: number
  cardWidth: number
  cardHeight: number
  position: SpringValue<Vector3Tuple>
  rotation: Euler
  scale: number
  // project data
  imageUrl: string
  title: string
  description: string
  siteUrl: string
  techStack?: string[]
}

export default function Card({
  cardId,
  index,
  color,
  cardWidth,
  cardHeight,
  position,
  rotation,
  scale,
  title,
  description,
  imageUrl,
  siteUrl,
  techStack,
}: CardProps) {
  const { cardInDropZone, setCardInDropZone, cardDropZonePosition, cardDropZoneRotation } = useCardDropZoneContext()
  const [isCardActive, setIsCardActive] = useState(false)
  const { viewport } = useThree()
  const cardRef = useRef<any>(null)
  const { setIsCardBeingDragged } = useCardDraggingContext()
  const { nodes, materials } = useGLTF('/models/card.glb')
  const texture = useTexture(`cards/react.jpg`)
  const discardTexture = useTexture(`img/logo.png`)

  const [{ cardPosition, cardRotation, cardScale }, api] = useSpring(() => ({
    from: {
      cardPosition: position,
      cardRotation: rotation,
      cardScale: 0.5,
    },
    to: {
      cardPosition: position,
      cardRotation: rotation,
      cardScale: scale,
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
        event.stopPropagation()
        if (isCardActive) return
        setIsCardBeingDragged(active)
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
          cardScale: hovering ? 1.1 : scale,
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
        cardScale: scale,
      })
    }
  }, [cardInDropZone, cardId, api, position, rotation, checkOverlap])

  return (
    // @ts-ignore
    <animated.group position={cardPosition} rotation={cardRotation} scale={cardScale} {...bind()} ref={cardRef}>
      <mesh scale={1.5}>
        <mesh position={[0, 0, 1]} rotation={[0, 0, 0]}>
          <mesh castShadow receiveShadow geometry={nodes.Plane.geometry}>
            {isCardActive && (
              <group>
                <Text
                  font='/fonts/alagard.ttf'
                  fontSize={0.3}
                  maxWidth={5}
                  anchorY={'top-baseline'}
                  anchorX={'center'}
                  position={new Vector3(0, 0.75, 0.01)}
                  outlineColor={'#000'}
                  outlineWidth={0.03}
                  textAlign='center'
                >
                  {title}
                  <meshBasicMaterial color={'#fff'} side={DoubleSide} />
                </Text>
                <Text
                  font='/fonts/PressStart2P-Regular.ttf'
                  fontSize={0.1}
                  maxWidth={5}
                  anchorY={'top-baseline'}
                  anchorX={'center'}
                  position={new Vector3(0, 0.5, 0.03)}
                  outlineColor={'#000'}
                  outlineWidth={0.03}
                  textAlign='center'
                >
                  {description}
                  <meshBasicMaterial color={'#fff'} side={DoubleSide} />
                </Text>
              </group>
            )}
            <MeshPortalMaterial side={DoubleSide}>
              <ProjectStage
                isCardActive={isCardActive}
                title={title}
                description={description}
                techStack={techStack}
                siteUrl={siteUrl}
                imageUrl={imageUrl}
              />
            </MeshPortalMaterial>
          </mesh>
          {!isCardActive && (
            <group>
              <mesh castShadow receiveShadow geometry={nodes.Plane_1.geometry} material={materials.Borders} />
              <Text
                font='/fonts/alagard.ttf'
                fontSize={0.125}
                maxWidth={0.9}
                anchorY={'top-baseline'}
                anchorX={'left'}
                position={new Vector3(-0.4, 0.5, 0.01)}
                outlineColor={'#000'}
                outlineWidth={0.03}
              >
                {title}
                <meshBasicMaterial color={'#fff'} side={DoubleSide} />
              </Text>
              <Text
                font='/fonts/PressStart2P-Regular.ttf'
                fontSize={0.04}
                maxWidth={0.85}
                anchorY={'top-baseline'}
                anchorX={'left'}
                position={new Vector3(-0.4, -0.4, 0.03)}
                outlineColor={'#000'}
                outlineWidth={0.02}
              >
                {description}
                <meshBasicMaterial color={'#fff'} side={DoubleSide} />
              </Text>
            </group>
          )}
          {!isCardActive && (
            <mesh castShadow receiveShadow geometry={nodes.Plane_2.geometry} material={materials.Back} />
          )}
        </mesh>
      </mesh>
    </animated.group>
  )
}

useFont.preload('/fonts/PressStart2P-Regular.ttf')

const ProjectStage = ({
  isCardActive,
  title,
  description,
  techStack = [],
  siteUrl,
  imageUrl = './img/project-image.png',
}: {
  isCardActive: boolean
  title: string
  description: string
  techStack?: string[]
  siteUrl: string
  imageUrl?: string
}) => {
  const [z, setZ] = useState(0)
  const viewport = useThree((state) => state.viewport)
  const distanceFactor = Math.min(Math.max(window.innerWidth / 1900, 0.9), 1.5)
  const [loading, setLoading] = useState(true)

  return (
    <>
      <mesh>
        {/* <planeGeometry args={[10, 10, 1]} /> */}
        {isCardActive ? (
          <group>
            <Html transform prepend zIndexRange={[0, 0]} distanceFactor={distanceFactor * 2.5}>
              <iframe
                className='rounded-lg border-4 border-teal-200'
                src={siteUrl}
                onLoad={() => {
                  setLoading(false)
                }}
                frameBorder='0'
                style={{ verticalAlign: 'top' }}
                width={560 * 2}
                height={315 * 2}
              />
            </Html>
            <Html position={[-3 * distanceFactor, -2.35 * distanceFactor, 0]} transform>
              <div className='flex  rounded-sm space-x-1'>
                <a
                  className='text-white bg-black/30 rounded-full flex p-0.5 hover:text-slate-200'
                  href={siteUrl}
                  target='_blank'
                >
                  <FontAwesomeIcon icon={faChrome} height={48} width={16} />
                </a>
                <a
                  className='text-white bg-black/30 rounded-full flex p-0.5 hover:text-slate-200'
                  href={siteUrl}
                  target='_blank'
                >
                  <FontAwesomeIcon icon={faGithub} height={48} width={16} />
                </a>
              </div>
            </Html>
            {/* <Text
              font='/fonts/alagard.ttf'
              fontSize={0.2}
              maxWidth={0.9}
              anchorY={'top-baseline'}
              anchorX={'center'}
              position={new Vector3(0, 0.5, 1)}
              outlineColor={'#000'}
              outlineWidth={0.03}
            >
              {title}
              <meshBasicMaterial color={'#fff'} side={DoubleSide} />
            </Text>
            <Text
              font='/fonts/PressStart2P-Regular.ttf'
              fontSize={0.1}
              maxWidth={5}
              anchorY={'top-baseline'}
              anchorX={'center'}
              position={new Vector3(-0.75, -2.5, 1)}
              outlineColor={'#000'}
              outlineWidth={0.03}
            >
              {description}
              <meshBasicMaterial color={'#fff'} side={DoubleSide} />
            </Text> */}
          </group>
        ) : (
          <>
            <Image scale={3} position={[0, 0, 0.01]} url={imageUrl} />
            <mesh position={new Vector3(0, 0, 0.02)}>
              <planeGeometry args={[10, 10, 1]} />
              <meshBasicMaterial color='#000' opacity={0.5} transparent={true} side={DoubleSide} />
            </mesh>
          </>
        )}
      </mesh>
    </>
  )
}
