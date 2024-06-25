import { useFrame, useLoader } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import character from './character-sheet.png'
import characterJson from './character-sheet.json'
import { useAseprite, usePixelTexture } from 'use-spritesheet'
import { AsepriteJson } from 'use-spritesheet/lib/aseprite'

export default function CharacterAnimationExperience() {
  const [texture] = useAseprite('./img/character-sheet.png', characterJson as AsepriteJson, 'walk_forward', false)

  console.log('texture', texture)

  return (
    <sprite scale={5}>
      <spriteMaterial transparent map={texture} />
    </sprite>
  )
}
