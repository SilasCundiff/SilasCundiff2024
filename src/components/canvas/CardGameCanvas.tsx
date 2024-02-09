'use client'
import { Canvas } from '@react-three/fiber'
import CardGameExperience from '../experiences/CardGameExperience/CardGameExperience'

import {
  Bounds,
  Environment,
  Hud,
  OrbitControls,
  OrthographicCamera,
  PresentationControls,
  Text,
  useFont,
} from '@react-three/drei'
import { useCardDropZoneContext } from '@/helpers/contexts/CardDropZoneContext'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDeckAndHandContext } from '@/helpers/contexts/DeckAndHandContext'
import { useCardDraggingContext } from '@/helpers/contexts/CardDraggingContext'

export default function CardGameCanvas() {
  const { hand, drawPile, discardPile, drawUntilHandIsFull } = useDeckAndHandContext()
  const { cardInDropZone, setCardInDropZone } = useCardDropZoneContext()
  const { isCardBeingDragged } = useCardDraggingContext()
  const [isControlsLocked, setIsControlsLocked] = useState(false)

  const canvasRef = useRef()
  const bodyRef = useRef()
  useLayoutEffect(() => {
    // @ts-ignore
    canvasRef.current.parentNode.style.position = 'absolute'
    // @ts-ignore
    canvasRef.current.parentNode.style.zIndex = 3
  }, [])

  useEffect(() => {
    // @ts-ignore
    bodyRef.current = document.querySelector('.cardGameRoot')
  }, [])

  const handleEndTurn = () => {
    setCardInDropZone(null)
    drawUntilHandIsFull()
  }

  const handleLockControls = () => {
    setIsControlsLocked(!isControlsLocked)
  }

  return (
    <div className='cardGameRoot relative h-svh md:max-h-[calc(100svh-96px)] w-full my-auto'>
      <Canvas
        // @ts-ignore
        ref={canvasRef}
        eventSource={bodyRef && bodyRef.current}
        resize={{ scroll: false }}
        orthographic
        dpr={[1, 2]}
        camera={{ position: [0, 0, 10], zoom: 100 }}
      >
        <Bounds clip fit observe>
          <CardGameExperience
            drawPile={drawPile}
            discardPile={discardPile}
            handleEndTurn={handleEndTurn}
            handleLockControls={handleLockControls}
          />
        </Bounds>
        <Environment preset='sunset' />
        {/* lights */}
        <ambientLight intensity={1.5} />
        <OrbitControls
          makeDefault
          enabled={!isCardBeingDragged}
          enableDamping
          minZoom={40}
          maxZoom={130}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          minAzimuthAngle={-Math.PI / 4}
        />
      </Canvas>
    </div>
  )
}

useFont.preload('/fonts/alagard.ttf')
