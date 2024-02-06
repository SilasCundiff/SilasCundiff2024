import { Hud, Text, useFont } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { Vector3 } from 'three'

export default function CardGameHUD({ drawPile, discardPile }: { drawPile: number; discardPile: number }) {
  return (
    <group>
      {/* <OrbitControls makeDefault enabled={!isCardBeingDragged} /> */}
      {/* <Hud renderPriority={1}> */}
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
            <Text fontSize={0.1} color='black' position={[0, 0, 1.01]}>
              Discard Pile
            </Text>
          </mesh>
        </group>
        <Text position={[0, 1, 1]} fontSize={0.5}>
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
            <Text fontSize={0.1} color='black' position={[0, 0, 1.01]}>
              Draw Pile
            </Text>
          </mesh>
        </group>
        <Text position={[0, 1, 1]} fontSize={0.5}>
          {drawPile}
          <meshBasicMaterial color={'#000'} />
        </Text>
      </group>
      {/* </Hud> */}
    </group>
  )
}

useFont.preload('/fonts/alagard.ttf')
