import { Canvas } from '@react-three/fiber'
import CardGameExperience from '../experiences/CardGameExperience/CardGameExperience'
import { Bounds, OrthographicCamera, PerspectiveCamera, useBounds } from '@react-three/drei'
import { useEffect } from 'react'
const interpolateFunc2 = (t: number) => -t * t * t + t * t + t

export default function CardGameCanvas() {
  const bounds = useBounds()

  useEffect(() => {
    if (!bounds) return
    bounds.refresh().reset().clip().fit()
    console.log(bounds)
  }, [bounds])

  return (
    <div className='container mx-auto h-svh w-full bg-red-500'>
      <Canvas resize={{ scroll: false }} orthographic dpr={[1, 2]} camera={{ position: [0, 0, 10], zoom: 100 }}>
        <Bounds fit clip observe margin={1} maxDuration={1} interpolateFunc={interpolateFunc2}>
          <CardGameExperience />
        </Bounds>
      </Canvas>
    </div>
  )
}
