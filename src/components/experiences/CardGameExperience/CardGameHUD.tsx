import { Text, useFont, useGLTF, useTexture } from '@react-three/drei'
import { DoubleSide, Vector3 } from 'three'
import { Card } from '@/lib/hooks/useCardsFromDeckAndHand'
import DrawDiscardCard from './DrawDiscardCard'

export default function CardGameHUD({
  drawPile,
  discardPile,
  handleEndTurn,
  handleLockControls,
  areControlsLocked,
}: {
  drawPile: Card[]
  discardPile: Card[]
  handleEndTurn: () => void
  handleLockControls: () => void
  areControlsLocked: boolean
}) {
  const { nodes, materials } = useGLTF('/models/card.glb')
  const texture = useTexture(`img/project-image.png`)
  const discardTexture = useTexture(`img/project-image.png`)

  return (
    <group>
      <group position={new Vector3(5, -4.5, 1)}>
        <group rotation={[0, 0, -0.2]}>
          {discardPile.map((card, i) => {
            return (
              <DrawDiscardCard
                key={i}
                position={[0, 0, 1.01 + i * 0.01]}
                rotation={[0, 0, Math.random() * 0.4 - 0.2]}
                materials={materials}
                nodes={nodes}
              />
            )
          })}
          <mesh position={[0, 0, 1]} rotation={[0, 0, 0.2]}>
            {/* @ts-ignore */}
            <mesh castShadow receiveShadow geometry={nodes.Plane_1.geometry}>
              <meshStandardMaterial {...materials.Back} map={texture} color='white' />
            </mesh>
            {/* @ts-ignore */}
            <mesh castShadow receiveShadow geometry={nodes.Plane.geometry} material={materials.Back} />
            {/* @ts-ignore */}
            <mesh castShadow receiveShadow geometry={nodes.Plane_2.geometry} material={materials.Front} />
          </mesh>
          <mesh position={[0, 0, 0.2]} rotation={[0, 0, 0.2]}>
            <Text
              font='/fonts/PressStart2P-Regular.ttf'
              fontSize={0.1}
              position={[0, 0.05, 1]}
              outlineColor={'#000'}
              outlineWidth={0.02}
            >
              Discard Pile
              <meshBasicMaterial color={'#fff'} side={DoubleSide} />
            </Text>
          </mesh>
        </group>
        <Text
          font='/fonts/PressStart2P-Regular.ttf'
          position={[0, 1, 1]}
          fontSize={0.3}
          outlineColor={'#000'}
          outlineWidth={0.05}
        >
          {discardPile.length}
          <meshBasicMaterial color={'#fff'} side={DoubleSide} />
        </Text>
      </group>

      <group position={new Vector3(-5, -4.5, 1)}>
        <group rotation={[0, 0, 0.1]}>
          {drawPile.map((card, i) => {
            return (
              <DrawDiscardCard
                key={i}
                position={[0, 0, 1.01 + i * 0.01]}
                rotation={[0, 0, Math.random() * 0.2 - 0.1]}
                materials={materials}
                nodes={nodes}
              />
            )
          })}
          <mesh position={[0, 0, 1]} rotation={[0, 0, -0.1]}>
            {/* @ts-ignore */}
            <mesh castShadow receiveShadow geometry={nodes.Plane_1.geometry}>
              <meshStandardMaterial {...materials.Back} map={texture} color='white' />
            </mesh>
            {/* @ts-ignore */}
            <mesh castShadow receiveShadow geometry={nodes.Plane.geometry} material={materials.Back} />
            {/* @ts-ignore */}
            <mesh castShadow receiveShadow geometry={nodes.Plane_2.geometry} material={materials.Front} />
          </mesh>
          <mesh position={[0, -0.05, 0.2]} rotation={[0, 0, -0.1]}>
            <Text
              font='/fonts/PressStart2P-Regular.ttf'
              fontSize={0.1}
              position={[0, 0.11, 1.01]}
              outlineColor={'#000'}
              outlineWidth={0.02}
            >
              Draw Pile
              <meshBasicMaterial color={'#fff'} side={DoubleSide} />
            </Text>
          </mesh>
        </group>
        <Text
          font='/fonts/PressStart2P-Regular.ttf'
          position={[0, 1, 1]}
          fontSize={0.3}
          outlineColor={'#000'}
          outlineWidth={0.05}
        >
          {drawPile.length}
          <meshBasicMaterial color={'#fff'} side={DoubleSide} />
        </Text>
      </group>
      <group position={new Vector3(-5, -7.25, 1)} onClick={handleLockControls}>
        <mesh>
          <planeGeometry args={[3.33, 0.66, 1]} />
          <meshBasicMaterial color={'#55e'} side={DoubleSide} />
        </mesh>
        <Text
          anchorX={'center'}
          anchorY={'middle'}
          font='/fonts/PressStart2P-Regular.ttf'
          fontSize={0.2}
          position={[0, 0, 0.01]}
          outlineColor={'#000'}
          outlineWidth={0.02}
        >
          {areControlsLocked ? 'Unlock Controls' : 'Lock Controls'}
          <meshBasicMaterial color={'#fff'} side={DoubleSide} />
        </Text>
      </group>
      <group position={new Vector3(5, -7.25, 1)} onClick={handleEndTurn}>
        <mesh>
          <planeGeometry args={[1.99, 0.66, 1]} />
          <meshBasicMaterial color={'#20d3c8'} side={DoubleSide} />
        </mesh>
        <Text
          anchorX={'center'}
          anchorY={'middle'}
          font='/fonts/PressStart2P-Regular.ttf'
          fontSize={0.2}
          position={[0, 0, 0.01]}
          outlineColor={'#211f27'}
          outlineWidth={0.02}
        >
          End Turn
          <meshBasicMaterial color={'#fff'} side={DoubleSide} />
        </Text>
      </group>
    </group>
  )
}

useFont.preload('/fonts/alagard.ttf')
