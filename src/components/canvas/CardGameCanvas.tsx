import { Canvas } from '@react-three/fiber'
import CardGameExperience from '../experiences/CardGameExperience/CardGameExperience'

export default function CardGameCanvas() {
  return (
    <Canvas
      className='card-game-canvas'
      camera={{
        fov: 75,
        near: 0.1,
        far: 1000,
        position: [0, 0, 5],
      }}
    >
      <CardGameExperience />
    </Canvas>
  )
}
