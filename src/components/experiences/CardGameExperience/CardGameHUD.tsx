import { Hud, Text, useFont } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { Vector3 } from 'three'

export default function CardGameHUD({
  drawPile,
  discardPile,
  handleEndTurn,
}: {
  drawPile: number
  discardPile: number
  handleEndTurn: () => void
}) {
  return (
    <group>
      <group position={new Vector3(5, -3.5, 1)}>
        <group rotation={[0, 0, -0.2]}>
          <mesh>
            <planeGeometry args={[1, 1.25, 1]} />
          </mesh>
          <mesh rotation={[0, 0, 0.16]}>
            <planeGeometry args={[1, 1.25, 1]} />
          </mesh>
          <mesh rotation={[0, 0, 0.08]}>
            <planeGeometry args={[1, 1.25, 1]} />
          </mesh>
          <mesh rotation={[0, 0, -0.12]}>
            <planeGeometry args={[1, 1.25, 1]} />
            <Text font='/fonts/PressStart2P-Regular.ttf' fontSize={0.08} color='black' position={[0, 0.05, 1.01]}>
              Discard Pile
            </Text>
          </mesh>
        </group>
        <Text font='/fonts/PressStart2P-Regular.ttf' position={[0, 1, 1]} fontSize={0.3}>
          {discardPile}
          <meshBasicMaterial color={'#000'} />
        </Text>
      </group>

      <group position={new Vector3(-5, -3.5, 1)}>
        <group rotation={[0, 0, 0.1]}>
          <mesh>
            <planeGeometry args={[1, 1.25, 1]} />
          </mesh>
          <mesh rotation={[0, 0, 0.1]}>
            <planeGeometry args={[1, 1.25, 1]} />
          </mesh>
          <mesh rotation={[0, 0, 0.05]}>
            <planeGeometry args={[1, 1.25, 1]} />
          </mesh>
          <mesh rotation={[0, 0, 0.08]}>
            <planeGeometry args={[1, 1.25, 1]} />
            <Text font='/fonts/PressStart2P-Regular.ttf' fontSize={0.08} color='black' position={[0, 0.11, 1.01]}>
              Draw Pile
            </Text>
          </mesh>
        </group>
        <Text font='/fonts/PressStart2P-Regular.ttf' position={[0, 1, 1]} fontSize={0.3}>
          {drawPile}
          <meshBasicMaterial color={'#000'} />
        </Text>
      </group>
      <group position={new Vector3(5, -4.6, 1)} onClick={handleEndTurn}>
        <mesh>
          <planeGeometry args={[0.99, 0.33, 1]} />
        </mesh>
        <Text
          anchorX={'center'}
          anchorY={'middle'}
          font='/fonts/PressStart2P-Regular.ttf'
          fontSize={0.08}
          color='black'
          position={[0, 0.11, 1.01]}
        >
          End Turn
        </Text>
      </group>
    </group>
  )
}

useFont.preload('/fonts/alagard.ttf')
