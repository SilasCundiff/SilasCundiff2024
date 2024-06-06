import { ProjectData } from '@/helpers/hooks/useCardsFromDeckAndHand'
import { faChrome, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Html, Image, useTexture } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useState } from 'react'
import { DoubleSide, Vector3 } from 'three'

import deckOfCards from '@/helpers/Projects'

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
  const [z, setZ] = useState(0)
  const viewport = useThree((state) => state.viewport)
  const distanceFactor = Math.min(Math.max(window.innerWidth / 1900, 0.9), 1.5)
  const { title, description, siteUrl, imageUrl, githubUrl, techStack, roles, disableIframe } = projectData

  return (
    <>
      <mesh>
        {/* <planeGeometry args={[10, 10, 1]} /> */}
        {isCardActive ? (
          <group>
            {disableIframe ? (
              <Html transform prepend zIndexRange={[0, 0]} distanceFactor={distanceFactor * 3.6}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className='max-w-[1180px] max-h-[600px]  border-4 img-border-black'
                  src={`./cards/${imageUrl}`}
                  alt={`image of ${title} website`}
                />
                {/* <span className='font-alagard text-white text-2xl'>Please visit the live site for full demo!</span> */}
              </Html>
            ) : (
              <group>
                <Html transform prepend zIndexRange={[0, 0]} distanceFactor={distanceFactor * 2.5} className='relative'>
                  <iframe
                    className='img-border-cyan bg-white'
                    src={siteUrl}
                    frameBorder='0'
                    style={{ verticalAlign: 'top' }}
                    width={560 * 2}
                    height={315 * 2}
                    onLoad={() => {
                      setIFrameLoaded(true)
                    }}
                  />
                  <span className='text-2xl text-white font-alagard'>
                    Please note: Some features may be disabled due to iframe limitations, <br /> visit live site for
                    full functionality
                  </span>
                </Html>
              </group>
            )}
            <Html zIndexRange={[0, 0]} position={[0, -1.5 * distanceFactor, 0]} transform>
              <div className='flex rounded-sm space-x-1 justify-end bg-[#211f27] border-1 img-border-black--small px-2 py-2'>
                <a
                  className={`text-white rounded-full flex hover:text-slate-200 ${
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
                  className={`text-white  rounded-full flex  hover:text-slate-200 ${
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
        ) : (
          <>
            {/* @ts-ignore */}
            <Image
              scale={2}
              position={[0, 0, 0.01]}
              // @ts-ignore
              alt={`image of ${title} website`}
              url={`./cards/thumbnail-${imageUrl}`}
            />
            <mesh position={new Vector3(0, 0, 0.02)}>
              <planeGeometry args={[10, 10, 1]} />
              <meshBasicMaterial color='#000' opacity={0.5} transparent={true} side={DoubleSide} />
            </mesh>
          </>
        )}
      </mesh>
    </>
  )
}

export default ProjectStage
