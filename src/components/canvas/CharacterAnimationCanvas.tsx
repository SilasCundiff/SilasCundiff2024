import { Canvas } from '@react-three/fiber'
import CharacterAnimationExperience from '../experiences/CharacterAnimationExperience/CharacterAnimationExperience'
import { Stats } from '@react-three/drei'

export default function CharacterAnimationCanvas() {
  return (
    <Canvas className='w-full h-full inventory-character-border' camera={{ position: [0, 0, 10], fov: 50 }}>
      <CharacterAnimationExperience />
      <Stats />
    </Canvas>
  )
}
