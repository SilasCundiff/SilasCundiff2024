import { useThree } from '@react-three/fiber'
import { useGesture } from '@use-gesture/react'

import { useCallback, useEffect, useRef, useState } from 'react'
import { DoubleSide, Euler, Vector3, Vector3Tuple, Color } from 'three'
import { Image, MeshPortalMaterial, Text, useFont, useGLTF, useTexture } from '@react-three/drei'
import { useCardDropZoneContext } from '@/lib/contexts/CardDropZoneContext'
import { useSpring, animated, SpringValue } from '@react-spring/three'
import { useCardDraggingContext } from '@/lib/contexts/CardDraggingContext'

import { ProjectData } from '@/lib/hooks/useCardsFromDeckAndHand'
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
          cardScale: hovering ? 1.25 : scale,
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
    // materials.Front.color = new Color(0xffffff)
    console.log('materials', nodes)
  }

  return (
    // @ts-ignore
    <animated.group position={cardPosition} rotation={cardRotation} scale={cardScale} {...bind()} ref={cardRef}>
      <mesh scale={1}>
        <mesh position={[0, 0, 1]} rotation={[0, 0, 0]}>
          {/* @ts-ignore */}
          {isCardActive && (
            <mesh castShadow receiveShadow>
              <ProjectStage projectData={projectData} isCardActive={isCardActive} setIFrameLoaded={setIFrameLoaded} />
            </mesh>
          )}
          {!isCardActive && (
            <group scale={1.5}>
              {/* @ts-ignore */}
              <mesh castShadow receiveShadow geometry={nodes.Plane_2.geometry} material={materials.Front}>
                <mesh position={new Vector3(0, 0, 0.002)}>
                  <Image
                    scale={1}
                    position={[0, 0, 0.01]}
                    // @ts-ignore
                    alt={`image of ${title} website`}
                    url={`./cards/thumbnail-${imageUrl}`}
                  >
                    <planeGeometry args={[2, 1.5, 1]} />
                  </Image>
                </mesh>
              </mesh>

              {/* @ts-ignore */}
              <mesh castShadow receiveShadow geometry={nodes.Plane_1.geometry} material={materials.Borders}>
                <meshStandardMaterial {...materials.Back} map={texture} color='white' />
              </mesh>
              {/* @ts-ignore */}
              <mesh castShadow receiveShadow geometry={nodes.Plane.geometry} material={materials.Back} />

              <Text
                font='/fonts/alagard.ttf'
                fontSize={0.18}
                anchorY={'top-baseline'}
                anchorX={'left'}
                position={new Vector3(-0.88, 0.88, 0.01)}
                outlineColor={'#cb983c'}
                color={'#211f27'}
                outlineWidth={0.03}
              >
                {title.substring(0, 18)}
                {title.length >= 18 ? '...' : ''}
                <meshBasicMaterial color={'#fff'} side={DoubleSide} />
              </Text>
              <Text
                font='/fonts/PressStart2P-Regular.ttf'
                fontSize={0.1}
                maxWidth={1.9}
                anchorY={'top-baseline'}
                anchorX={'left'}
                position={new Vector3(-0.88, -0.95, 0.03)}
                outlineColor={'#cb983c'}
                color={'#211f27'}
                outlineWidth={0.01}
              >
                {description}
                <meshBasicMaterial color={'#fff'} side={DoubleSide} />
              </Text>
            </group>
          )}
        </mesh>
      </mesh>
    </animated.group>
  )
}

useFont.preload('/fonts/PressStart2P-Regular.ttf')
