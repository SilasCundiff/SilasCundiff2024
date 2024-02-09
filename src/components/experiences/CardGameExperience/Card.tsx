import { useThree } from '@react-three/fiber'
import { useGesture } from '@use-gesture/react'
import { useSpringRef, useTransition } from '@react-spring/three'
import { useCallback, useEffect, useRef, useState } from 'react'
import THREE, { DoubleSide, Euler, NoBlending, Vector3, Vector3Tuple, Color } from 'three'
import { Html, Image, MeshPortalMaterial, Text, useFont, useGLTF, useTexture } from '@react-three/drei'
import { useCardDropZoneContext } from '@/helpers/contexts/CardDropZoneContext'
import { useSpring, animated, SpringValue } from '@react-spring/three'
import { useCardDraggingContext } from '@/helpers/contexts/CardDraggingContext'
import { faChrome, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ProjectData } from '@/helpers/hooks/useCardsFromDeckAndHand'

type CardProps = {
  position: SpringValue<Vector3Tuple>
  rotation: Euler
  scale: number
  cardId: string
  projectData: ProjectData
}

export default function Card({ cardId, position, rotation, scale, projectData }: CardProps) {
  const { cardInDropZone, setCardInDropZone, cardDropZonePosition, cardDropZoneRotation } = useCardDropZoneContext()
  const [isCardActive, setIsCardActive] = useState(false)
  const { viewport } = useThree()
  const cardRef = useRef<any>(null)
  const { setIsCardBeingDragged } = useCardDraggingContext()
  const { nodes, materials } = useGLTF('/models/card.glb')
  const texture = useTexture(`img/project-image.png`)
  const discardTexture = useTexture(`img/logo.png`)
  const [iFrameLoaded, setIFrameLoaded] = useState(false)
  const { title, description, disableIframe, imageUrl, roles, siteUrl, githubUrl, techStack } = projectData

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
  }, [cardInDropZone, cardId, api, position, rotation, checkOverlap, scale])

  if (materials) {
    materials.Borders.color = new Color(0x05375f)
  }

  return (
    // @ts-ignore
    <animated.group position={cardPosition} rotation={cardRotation} scale={cardScale} {...bind()} ref={cardRef}>
      <mesh scale={1.5}>
        <mesh position={[0, 0, 1]} rotation={[0, 0, 0]}>
          {/* @ts-ignore */}
          <mesh castShadow receiveShadow geometry={nodes.Plane.geometry}>
            {isCardActive && (
              <group>
                {(iFrameLoaded || disableIframe) && (
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
                    <Text
                      font='/fonts/PressStart2P-Regular.ttf'
                      fontSize={0.08}
                      maxWidth={3.5}
                      anchorY={'top-baseline'}
                      anchorX={'center'}
                      position={new Vector3(0, 0.15, 0.03)}
                      outlineColor={'#000'}
                      outlineWidth={0.03}
                      textAlign='center'
                      lineHeight={2}
                    >
                      My roles:{' '}
                      {roles?.map((role, i, { length }) => {
                        return role + (i !== length - 1 ? ', ' : '')
                      })}
                      <meshBasicMaterial color={'#fff'} side={DoubleSide} />
                    </Text>
                    <Text
                      font='/fonts/PressStart2P-Regular.ttf'
                      fontSize={0.08}
                      maxWidth={3}
                      anchorY={'top-baseline'}
                      anchorX={'center'}
                      position={new Vector3(0, -0.5, 0.03)}
                      outlineColor={'#000'}
                      outlineWidth={0.03}
                      textAlign='center'
                      lineHeight={2}
                    >
                      Tech stack:{' '}
                      {techStack?.map((tech, i, { length }) => {
                        return tech + (i !== length - 1 ? ', ' : '')
                      })}
                      <meshBasicMaterial color={'#fff'} side={DoubleSide} />
                    </Text>
                  </group>
                )}
                {!iFrameLoaded && !disableIframe && (
                  <Text
                    font='/fonts/PressStart2P-Regular.ttf'
                    fontSize={0.28}
                    maxWidth={3}
                    anchorY={'top-baseline'}
                    anchorX={'center'}
                    position={new Vector3(0, -1, 1)}
                    outlineColor={'#000'}
                    outlineWidth={0.03}
                    textAlign='center'
                    lineHeight={2}
                  >
                    loading...
                    <meshBasicMaterial color={'#fff'} side={DoubleSide} />
                  </Text>
                )}
              </group>
            )}
            <MeshPortalMaterial side={DoubleSide}>
              <ProjectStage projectData={projectData} isCardActive={isCardActive} setIFrameLoaded={setIFrameLoaded} />
            </MeshPortalMaterial>
          </mesh>
          {!isCardActive && (
            <group>
              {/* @ts-ignore */}
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
            // @ts-ignore
            <mesh castShadow receiveShadow geometry={nodes.Plane_2.geometry}>
              <meshStandardMaterial color='black' />
            </mesh>
          )}
        </mesh>
      </mesh>
    </animated.group>
  )
}

useFont.preload('/fonts/PressStart2P-Regular.ttf')

const ProjectStage = ({
  isCardActive,
  projectData,
  setIFrameLoaded,
}: {
  isCardActive: boolean
  projectData: ProjectData
  setIFrameLoaded: (value: boolean) => void
}) => {
  const [z, setZ] = useState(0)
  const viewport = useThree((state) => state.viewport)
  const distanceFactor = Math.min(Math.max(window.innerWidth / 1900, 0.9), 1.5)
  const { title, description, siteUrl, imageUrl, githubUrl, techStack, roles, disableIframe } = projectData

  return (
    <>
      <mesh>
        {/* <planeGeometry args={[10, 10, 1]} /> */}
        {isCardActive ? (
          <group>
            {disableIframe ? (
              <Html transform prepend zIndexRange={[0, 0]} distanceFactor={distanceFactor * 2.5}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className='max-w-[1100px] max-h-[600px]' src={`./${imageUrl}`} alt={`image of ${title} website`} />
                <span className='font-alagard text-white text-2xl'>Please visit the live site for full demo!</span>
              </Html>
            ) : (
              <group>
                <Html transform prepend zIndexRange={[0, 0]} distanceFactor={distanceFactor * 2.5} className='relative'>
                  <iframe
                    className='rounded-lg border-4 border-teal-200 bg-white'
                    src={siteUrl}
                    frameBorder='0'
                    style={{ verticalAlign: 'top' }}
                    width={560 * 2}
                    height={315 * 2}
                    onLoad={() => {
                      setIFrameLoaded(true)
                    }}
                  />
                  <span className='text-2xl text-white font-alagard'>
                    Please note: Some features may be disabled due to iframe limitations, <br /> visit live site for
                    full functionality
                  </span>
                </Html>
              </group>
            )}
            <Html zIndexRange={[0, 0]} position={[3.05 * distanceFactor, -2.15 * distanceFactor, 0]} transform>
              <div className='flex rounded-sm space-x-1 justify-end bg-black/25 px-1 py-.5'>
                <a
                  className={`text-white rounded-full flex hover:text-slate-200 ${
                    !siteUrl && 'cursor-not-allowed opacity-15 pointer-events-none'
                  }`}
                  href={siteUrl ? siteUrl : ''}
                  target='_blank'
                  title={siteUrl ? 'View live site' : 'Live site not available'}
                  aria-disabled={!siteUrl}
                >
                  <FontAwesomeIcon icon={faChrome} height={48} width={12} />
                </a>

                <a
                  className={`text-white  rounded-full flex  hover:text-slate-200 ${
                    !githubUrl && 'cursor-not-allowed opacity-25 pointer-events-none'
                  }`}
                  title={githubUrl ? 'View on GitHub' : 'Source code not available'}
                  href={githubUrl ? githubUrl : ''}
                  target='_blank'
                  aria-disabled={!githubUrl}
                >
                  <FontAwesomeIcon icon={faGithub} height={12} width={12} />
                </a>
              </div>
            </Html>
          </group>
        ) : (
          <>
            {/* @ts-ignore */}
            <Image scale={3} position={[0, 0, 0.01]} url={`./${imageUrl}`} alt={`image of ${title} website`} />
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
