import characterJson from './character-sheet.json'
import { useAseprite } from 'use-spritesheet'
import { AsepriteJson } from 'use-spritesheet/lib/aseprite'

export default function CharacterAnimationExperience() {
  const [texture] = useAseprite('./img/character-sheet.png', characterJson as AsepriteJson, 'walk_forward', false)

  return (
    <sprite scale={7}>
      <spriteMaterial transparent map={texture} />
    </sprite>
  )
}
