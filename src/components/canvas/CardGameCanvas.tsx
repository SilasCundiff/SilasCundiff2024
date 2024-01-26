import { Canvas } from '@react-three/fiber'
import CardGameExperience from '../experiences/CardGameExperience/CardGameExperience'
import { Bounds } from '@react-three/drei'

const interpolateFunc2 = (t: number) => -t * t * t + t * t + t

export default function CardGameCanvas() {
  return (
    <div className='container mx-auto h-svh w-full'>
      <Canvas resize={{ scroll: false }} orthographic dpr={[1, 2]} camera={{ position: [0, 0, 10], zoom: 100 }}>
        <Bounds fit clip observe margin={1.2} maxDuration={1} interpolateFunc={interpolateFunc2}>
          <CardGameExperience />
        </Bounds>
      </Canvas>
    </div>
  )
}
