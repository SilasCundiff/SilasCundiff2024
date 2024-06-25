import { Canvas } from '@react-three/fiber'
import CharacterAnimationExperience from './CharacterAnimationExperience'
import { Stats } from '@react-three/drei'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function CharacterAnimationCanvas() {
  const [AnimationPaused, setAnimationPaused] = useState(true)
  return (
    <>
      <Canvas className='w-full h-full inventory-character-border' camera={{ position: [0, 0, 10], fov: 50 }}>
        <CharacterAnimationExperience AnimationPaused={AnimationPaused} />
        {/* <Stats /> */}
      </Canvas>
      <Button
        variant={'ghost'}
        className='absolute bottom-0 bg-inventorySlot rounded-sm left-1/2 w-full max-w-[calc(100%-32px)] translate-x-[-50%] mb-2 mx-auto text-white hover:text-goldInventory font-alagard px-1 h-6 pt-1 pb-0 text-sm hover:bg-inventorySlot/90'
        onClick={() => setAnimationPaused(!AnimationPaused)}
      >
        {AnimationPaused ? 'Play' : 'Pause'}
      </Button>
    </>
  )
}
