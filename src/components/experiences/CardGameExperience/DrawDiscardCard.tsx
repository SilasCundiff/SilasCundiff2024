import { useTexture } from '@react-three/drei'

export default function DrawDiscardCard({
  position,
  rotation,
  materials,
  nodes,
}: {
  position: number[]
  rotation: number[]
  materials: any
  nodes: any
}) {
  const texture = useTexture(`img/project-image.png`)

  return (
    // @ts-ignore
    <mesh position={position} rotation={rotation}>
      {/* @ts-ignore */}
      <mesh castShadow receiveShadow geometry={nodes.Plane.geometry}>
        <meshStandardMaterial {...materials.Front} map={texture} color='white' />
      </mesh>
      {/* @ts-ignore */}
      <mesh castShadow receiveShadow geometry={nodes.Plane_1.geometry} material={materials.Borders} />
      {/* @ts-ignore */}
      <mesh castShadow receiveShadow geometry={nodes.Plane_2.geometry} material={materials.Back} />
    </mesh>
  )
}
