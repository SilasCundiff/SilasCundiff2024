import { ProjectData } from '@/lib/hooks/useCardsFromDeckAndHand'
import { faChrome, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Html, Image as ThreeImage, Text, useTexture } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useState } from 'react'
import { DoubleSide, Vector3 } from 'three'

import deckOfCards from '@/lib/Projects'
import { useCardDropZoneContext } from '@/lib/contexts/CardDropZoneContext'
import { AspectRatio } from '@/components/ui/aspect-ratio'

deckOfCards.forEach((card) => {
  useTexture.preload(`./cards/thumbnail-${card.projectData.imageUrl}`)
})

const ProjectStage = ({
  isCardActive,
  projectData,
  setIFrameLoaded,
}: {
  isCardActive: boolean
  projectData: ProjectData
  setIFrameLoaded: (value: boolean) => void
}) => {
  const { title, description, siteUrl, imageUrl, githubUrl, techStack, roles, disableIframe } = projectData

  let gameScalingFactor = Math.min(Math.max(window.innerWidth / 1100, 0.5), 1.2)

  // if the screen is less than 600px wide, increase the scaling factor
  if (window.innerWidth < 600) {
    gameScalingFactor *= 3
  }

  return (
    <>
      <mesh>
        {/* <planeGeometry args={[10, 14, 1]} /> */}
        <group>
          <group>
            <Html transform prepend zIndexRange={[0, 0]} distanceFactor={gameScalingFactor * 5}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className='max-w-[768px]  border-4 inventory-border-md'
                src={`./cards/${imageUrl}`}
                alt={`image of ${title} website`}
              />
            </Html>
          </group>

          <Html zIndexRange={[0, 0]} position={[-4.75 * gameScalingFactor, -2.5 * gameScalingFactor, 4]} transform>
            <div className='flex rounded-sm space-x-1 justify-end bg-inventory border-2 inventory-border-md p-2'>
              <a
                className={`text-white rounded-full text-xl flex hover:text-slate-200 ${
                  !siteUrl && 'cursor-not-allowed opacity-15 pointer-events-none'
                }`}
                href={siteUrl ? siteUrl : ''}
                target='_blank'
                title={siteUrl ? 'View live site' : 'Live site not available'}
                aria-disabled={!siteUrl}
              >
                <FontAwesomeIcon icon={faChrome} height={24} width={24} />
              </a>

              <a
                className={`text-white text-xl rounded-full flex  hover:text-slate-200 ${
                  !githubUrl && 'cursor-not-allowed opacity-25 pointer-events-none'
                }`}
                title={githubUrl ? 'View on GitHub' : 'Source code not available'}
                href={githubUrl ? githubUrl : ''}
                target='_blank'
                aria-disabled={!githubUrl}
              >
                <FontAwesomeIcon icon={faGithub} height={24} width={24} />
              </a>
            </div>
          </Html>
        </group>
        <group>
          <group scale={Math.max(gameScalingFactor * 2, 1.3)}>
            <Text
              font='/fonts/alagard.ttf'
              fontSize={0.74}
              maxWidth={6}
              anchorY={'top-baseline'}
              anchorX={'center'}
              position={new Vector3(0, 1.45, 0.03)}
              outlineColor={'#cb983c'}
              color={'#211f27'}
              outlineWidth={0.03}
              textAlign='center'
            >
              {title}
              <meshBasicMaterial color={'#fff'} side={DoubleSide} />
            </Text>
            <Text
              font='/fonts/PressStart2P-Regular.ttf'
              fontSize={0.18}
              maxWidth={5}
              anchorY={'top-baseline'}
              anchorX={'center'}
              position={new Vector3(0, 0.35, 0.03)}
              outlineColor={'#cb983c'}
              outlineWidth={0.03}
              textAlign='center'
              color={'#211f27'}
            >
              {description}
              <meshBasicMaterial color={'#fff'} side={DoubleSide} />
            </Text>
            <Text
              font='/fonts/PressStart2P-Regular.ttf'
              fontSize={0.12}
              // maxWidth={3.5}
              anchorY={'top-baseline'}
              anchorX={'center'}
              position={new Vector3(0, -0.25, 0.03)}
              outlineColor={'#cb983c'}
              outlineWidth={0.03}
              textAlign='center'
              color={'#211f27'}
              lineHeight={2}
            >
              My roles:{' '}
              {roles?.map((role, i, { length }) => {
                return role + (i !== length - 1 ? ', ' : '')
              })}
              <meshBasicMaterial color={'#fff'} side={DoubleSide} />
            </Text>
            <Text
              font='/fonts/PressStart2P-Regular.ttf'
              fontSize={0.1}
              maxWidth={4}
              anchorY={'top-baseline'}
              anchorX={'center'}
              position={new Vector3(0, -0.9, 0.03)}
              outlineColor={'#cb983c'}
              outlineWidth={0.03}
              textAlign='center'
              color={'#211f27'}
              lineHeight={2}
            >
              Tech stack:{' '}
              {techStack?.map((tech, i, { length }) => {
                return tech + (i !== length - 1 ? ', ' : '')
              })}
              <meshBasicMaterial color={'#fff'} side={DoubleSide} />
            </Text>
          </group>
        </group>
      </mesh>
    </>
  )
}

export default ProjectStage
