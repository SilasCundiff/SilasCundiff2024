'use client'
import { Canvas } from '@react-three/fiber'
import CardGameExperience from './CardGameExperience'

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
import { use, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDeckAndHandContext } from '@/helpers/contexts/DeckAndHandContext'
import { useCardDraggingContext } from '@/helpers/contexts/CardDraggingContext'

export default function CardGameCanvas() {
  const { hand, drawPile, discardPile, drawUntilHandIsFull } = useDeckAndHandContext()
  const { cardInDropZone, setCardInDropZone } = useCardDropZoneContext()
  const { isCardBeingDragged } = useCardDraggingContext()
  const [areControlsLocked, setAreControlsLocked] = useState(true)
  const [disableControls, setDisableControls] = useState(true)

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

  useEffect(() => {
    if (isCardBeingDragged && !areControlsLocked) {
      setDisableControls(true)
    } else if (areControlsLocked && !isCardBeingDragged) {
      setDisableControls(true)
    } else {
      setDisableControls(false)
    }
  }, [isCardBeingDragged, areControlsLocked])

  const handleEndTurn = () => {
    setCardInDropZone(null)
    drawUntilHandIsFull()
  }

  const handleLockControls = () => {
    setAreControlsLocked(!areControlsLocked)
  }

  return (
    <div className='cardGameRoot relative h-svh md:max-h-[calc(90svh-180px)] mt-16 w-full my-auto'>
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
            areControlsLocked={areControlsLocked}
          />
        </Bounds>
        <Environment
          background={false} // can be true, false or "only" (which only sets the background) (default: false) // optional blur factor between 0 and 1 (default: 0, only works with three 0.146 and up)
          files={['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']}
          path='/'
          preset='warehouse'
          scene={undefined} // adds the ability to pass a custom THREE.Scene, can also be a ref
          encoding={undefined} // adds the ability to pass a custom THREE.TextureEncoding (default: THREE.sRGBEncoding for an array of files and THREE.LinearEncoding for a single texture)
        />

        <OrbitControls
          makeDefault
          enabled={!disableControls}
          enableDamping
          minZoom={30}
          maxZoom={100}
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
