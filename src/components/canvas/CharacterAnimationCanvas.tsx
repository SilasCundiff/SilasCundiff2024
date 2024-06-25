import { Canvas } from '@react-three/fiber'
import CharacterAnimationExperience from '../experiences/CharacterAnimationExperience/CharacterAnimationExperience'

export default function CharacterAnimationCanvas() {
  return (
    <Canvas className='w-full h-full' camera={{ position: [0, 0, 10], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <CharacterAnimationExperience />
    </Canvas>
  )
}
