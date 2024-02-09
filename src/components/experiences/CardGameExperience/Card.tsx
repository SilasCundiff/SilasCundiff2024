import { useThree } from '@react-three/fiber'
import { useGesture } from '@use-gesture/react'

import { useCallback, useEffect, useRef, useState } from 'react'
import { DoubleSide, Euler, Vector3, Vector3Tuple, Color } from 'three'
import { MeshPortalMaterial, Text, useFont, useGLTF, useTexture } from '@react-three/drei'
import { useCardDropZoneContext } from '@/helpers/contexts/CardDropZoneContext'
import { useSpring, animated, SpringValue } from '@react-spring/three'
import { useCardDraggingContext } from '@/helpers/contexts/CardDraggingContext'

import { ProjectData } from '@/helpers/hooks/useCardsFromDeckAndHand'
import ProjectStage from './ProjectStage'

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
    // @ts-ignore
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
