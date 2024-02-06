import { Text, useFont, useGLTF, useTexture } from '@react-three/drei'
import { use, useEffect, useRef } from 'react'
import { DoubleSide, Vector3 } from 'three'

export default function CardGameHUD({
  drawPile,
  discardPile,
  handleEndTurn,
}: {
  drawPile: []
  discardPile: []
  handleEndTurn: () => void
}) {
  const { nodes, materials } = useGLTF('/models/card.glb')
  const texture = useTexture(`img/project-image.png`)
  const discardTexture = useTexture(`img/logo.png`)

  return (
    <group>
      <group position={new Vector3(5, -4.5, 1)}>
        <group rotation={[0, 0, -0.2]}>
          {discardPile.map((card, i) => {
            return (
              <mesh key={i} position={[0, 0, 1.01 + i * 0.01]} rotation={[0, 0, Math.random() * 0.4 - 0.2]}>
                <mesh castShadow receiveShadow geometry={nodes.Plane.geometry}>
                  <meshStandardMaterial {...materials.Front} map={texture} color='white' />
                </mesh>
                <mesh castShadow receiveShadow geometry={nodes.Plane_1.geometry} material={materials.Borders} />
                <mesh castShadow receiveShadow geometry={nodes.Plane_2.geometry} material={materials.Back} />
              </mesh>
            )
          })}
          <mesh position={[0, 0, 1]} rotation={[0, 0, 0.2]}>
            <mesh castShadow receiveShadow geometry={nodes.Plane.geometry}>
              <meshStandardMaterial {...materials.Front} map={discardTexture} color='white' />
            </mesh>
            <mesh castShadow receiveShadow geometry={nodes.Plane_1.geometry} material={materials.Borders} />
            <mesh castShadow receiveShadow geometry={nodes.Plane_2.geometry} material={materials.Back} />
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
          {/* <mesh position={[0, 0, 1.01]}>
            <planeGeometry args={[1, 1.25, 1]} />
            <meshBasicMaterial color={'#2e484f'} side={DoubleSide} />
          </mesh>
          <mesh position={[0, 0, 1.02]} rotation={[0, 0, 0.1]}>
            <planeGeometry args={[1, 1.25, 1]} />
            <meshBasicMaterial color={'#ff0'} side={DoubleSide} />
          </mesh>
          <mesh position={[0, 0, 1.03]} rotation={[0, 0, 0.05]}>
            <planeGeometry args={[1, 1.25, 1]} />
            <meshBasicMaterial color={'#f0f'} side={DoubleSide} />
          </mesh>
          <mesh position={[0, 0, 1.04]} rotation={[0, 0, 0.08]}>
            <planeGeometry args={[1, 1.25, 1]} />
            <meshBasicMaterial color={'#f00'} side={DoubleSide} />
          </mesh> */}
          {drawPile.map((card, i) => {
            return (
              <mesh key={i} position={[0, 0, 1.01 + i * 0.01]} rotation={[0, 0, Math.random() * 0.2 - 0.1]}>
                <mesh castShadow receiveShadow geometry={nodes.Plane.geometry}>
                  <meshStandardMaterial {...materials.Front} map={texture} color='white' />
                </mesh>
                <mesh castShadow receiveShadow geometry={nodes.Plane_1.geometry} material={materials.Borders} />
                <mesh castShadow receiveShadow geometry={nodes.Plane_2.geometry} material={materials.Back} />
              </mesh>
            )
          })}
          <mesh position={[0, 0, 1]} rotation={[0, 0, -0.1]}>
            <mesh castShadow receiveShadow geometry={nodes.Plane.geometry}>
              <meshStandardMaterial {...materials.Front} map={discardTexture} color='white' />
            </mesh>
            <mesh castShadow receiveShadow geometry={nodes.Plane_1.geometry} material={materials.Borders} />
            <mesh castShadow receiveShadow geometry={nodes.Plane_2.geometry} material={materials.Back} />
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
      <group position={new Vector3(5, -5.6, 1)} onClick={handleEndTurn}>
        <mesh>
          <planeGeometry args={[0.99, 0.33, 1]} />
          <meshBasicMaterial color={'#55e'} side={DoubleSide} />
        </mesh>
        <Text
          anchorX={'center'}
          anchorY={'middle'}
          font='/fonts/PressStart2P-Regular.ttf'
          fontSize={0.1}
          position={[0, 0, 0.01]}
          outlineColor={'#000'}
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
