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
  console.log(texture)
  texture.flipY = true
  texture.offset.x = 0.1
  return (
    // @ts-ignore
    <mesh position={position} rotation={rotation}>
      {/* @ts-ignore */}
      {/* @ts-ignore */}
      <mesh castShadow receiveShadow geometry={nodes.Plane_1.geometry} material={materials.Borders}>
        <meshStandardMaterial {...materials.Back} map={texture} color='white' />
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.Plane.geometry} material={materials.Back} />
      {/* @ts-ignore */}
      <mesh castShadow receiveShadow geometry={nodes.Plane_2.geometry} material={materials.Front} />
    </mesh>
  )
}
