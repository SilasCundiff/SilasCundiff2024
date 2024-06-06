/* eslint-disable @next/next/no-img-element */
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import { useEffect, useState } from 'react'
import { Tooltip } from 'react-tooltip'

type ColumnPositionsKey = 0 | 1 | 2
type RowPositionsKey = 0 | 1 | 2 | 3 | 4 | 5

export const columnPositions: Record<number, number> = {
  0: 0,
  1: 32,
  2: 64,
}

export const rowPositions: Record<number, number> = {
  0: 0,
  1: 32,
  2: 64,
  3: 96,
  4: 128,
  5: 160,
}

export type Skill = {
  name: string
  description?: string
  unlocks?: string
  investment?: number
  position: [number, number]
  linkPosition?: [number, number]
  iconUrl?: string
  active?: boolean
  fill?: string
  tree?: string
}

const skillsDesign: Skill[] = [
  {
    name: 'Typography',
    description: 'Gain the ability to utilize fonts effectively to provide readable and appropriately styled text.',
    iconUrl: './icons/typography.png',
    position: [columnPositions[0], rowPositions[0]],
  },
  {
    name: 'Color Theory',
    description: 'Gain the ability to understand and utilize colors appropriately.',
    unlocks: 'TypeScript',
    iconUrl: './icons/color.png',
    position: [columnPositions[1], rowPositions[0]],
  },
  {
    name: 'Layouts',
    description:
      'Unlocks the proper use of css and design to creating appealing and easy to navigate websites. Includes responsiveness.',
    iconUrl: './icons/layouts.png',
    position: [columnPositions[2], rowPositions[0]],
  },
  {
    name: 'Figma/XD',
    description: "Don't just wing it, plan it out! Design tools to facilitate creativity and project planning.",
    unlocks: 'Prototyping',
    iconUrl: './icons/figma.png',
    position: [columnPositions[0], rowPositions[1]],
    linkPosition: [columnPositions[0], rowPositions[2]],
  },
  {
    name: 'Photoshop',
    description: 'A picture is worth a thousand words. Unlocks the ultimate image editing software.',
    iconUrl: './icons/photoshop.png',
    position: [columnPositions[2], rowPositions[1]],
  },
  {
    name: 'Illustrator',
    description:
      'Need something more than a simple image? Unlocks the best tool for creating illustrations and SVGs for the web.',
    unlocks: 'SVGs',
    iconUrl: './icons/illustrator.png',
    position: [columnPositions[1], rowPositions[1]],
    linkPosition: [columnPositions[1], rowPositions[2]],
  },
  {
    name: 'SVGs',
    description:
      'PNGs and JPEGs have their uses, but sometimes you need something more crisp and versatile. Unlocks Scalable Vector Graphics: highly performant and animatable images.',
    unlocks: 'After Effects/Lottie',
    iconUrl: './icons/React-icon.png',
    position: [columnPositions[1], rowPositions[2]],
    linkPosition: [columnPositions[1], rowPositions[3]],
  },
  {
    name: 'Blender',
    description:
      '2D models are great, but sometimes you need to bring your designs into the third dimension. Unlocks A 3D modeling tool, allowing for asset creation of complex 3D models.',
    unlocks: '3D/GLTF Models',
    iconUrl: './icons/React-icon.png',
    position: [columnPositions[2], rowPositions[2]],
    linkPosition: [columnPositions[2], rowPositions[3]],
  },
  {
    name: 'Prototyping',
    description:
      'Why embark on a journey without a destination? Gain the ability to create a simple proof of concept of sites before development.',
    iconUrl: './icons/prototyping.png',
    position: [columnPositions[0], rowPositions[2]],
  },
  {
    name: 'After Effects/Lottie',
    description:
      'Some complex animations require a bit more than simple JS and CSS. Unlocks Lottie and After Effects, allowing for performant and complex web animations with minimal effort.',
    iconUrl: './icons/React-icon.png',
    position: [columnPositions[1], rowPositions[3]],
  },
  {
    name: '3D/GLTF Models',
    description: 'Unlocks 3D models and the common GLTF file format.',
    iconUrl: './icons/React-icon.png',
    position: [columnPositions[2], rowPositions[3]],
  },
  {
    name: 'Accessibility',
    description: 'The web is for everyone. Gain the ability to create experiences that account all users.',
    iconUrl: './icons/React-icon.png',
    position: [columnPositions[0], rowPositions[4]],
  },
  {
    name: 'UX/UI',
    description: 'Ensures a users experience when interacting with your websites.',
    iconUrl: './icons/React-icon.png',
    position: [columnPositions[1], rowPositions[4]],
  },
  {
    name: 'Creativity',
    description: 'Anyone can follow, few can create. Find new ways to bring life into designs.',
    iconUrl: './icons/React-icon.png',
    position: [columnPositions[1], rowPositions[5]],
  },
]
const skillsProgramming: Skill[] = [
  {
    name: 'Node',
    description: 'The language of the web',
    unlocks: 'TypeScript',
    iconUrl: './icons/React-icon.png',
    position: [columnPositions[2], rowPositions[2]],
    linkPosition: [columnPositions[2], rowPositions[3]],
  },
  {
    name: 'Node',
    description: 'The language of the web',
    unlocks: 'TypeScript',
    iconUrl: './icons/React-icon.png',
    position: [columnPositions[2], rowPositions[2]],
    linkPosition: [columnPositions[1], rowPositions[2]],
  },
  {
    name: 'Express',
    description: 'The language of the web',
    unlocks: 'TypeScript',
    iconUrl: './icons/React-icon.png',
    position: [columnPositions[2], rowPositions[3]],
  },
  {
    name: 'JavaScript',
    description: 'The language of the web',
    unlocks: 'TypeScript',
    position: [columnPositions[1], rowPositions[2]],
    linkPosition: [columnPositions[1], rowPositions[3]],

    iconUrl: './icons/React-icon.png',
  },
  {
    name: 'Bootstrap',
    description: 'The language of the web',
    unlocks: 'TypeScript',
    iconUrl: './icons/React-icon.png',
    position: [columnPositions[0], rowPositions[2]],
  },
  {
    name: 'TypeScript',
    description: 'The language of the web',
    unlocks: 'TypeScript',
    iconUrl: './icons/React-icon.png',
    position: [columnPositions[1], rowPositions[3]],
    linkPosition: [columnPositions[1], rowPositions[4]],
  },
  {
    name: 'React',
    description: 'The language of the web',
    unlocks: 'TypeScript',
    iconUrl: './icons/React-icon.png',
    position: [columnPositions[1], rowPositions[4]],
    linkPosition: [columnPositions[1], rowPositions[5]],
  },
  {
    name: 'NextJS',
    description: 'The language of the web',
    unlocks: 'TypeScript',
    iconUrl: './icons/React-icon.png',
    position: [columnPositions[1], rowPositions[5]],
  },
  {
    name: 'Three.js',
    description: 'The language of the web',
    unlocks: 'TypeScript',
    iconUrl: './icons/React-icon.png',
    position: [columnPositions[2], rowPositions[4]],
  },
  {
    name: 'HTML',
    description: 'The language of the web',
    unlocks: 'TypeScript',
    iconUrl: './icons/React-icon.png',

    position: [columnPositions[2], rowPositions[0]],

    linkPosition: [columnPositions[2], rowPositions[1]],
  },
  {
    name: 'PHP',
    description: 'The language of the web',
    unlocks: 'TypeScript',
    iconUrl: './icons/React-icon.png',

    position: [columnPositions[0], rowPositions[3]],
    linkPosition: [columnPositions[0], rowPositions[4]],
  },
  {
    name: 'WordPress',
    description: 'The language of the web',
    unlocks: 'TypeScript',
    iconUrl: './icons/React-icon.png',

    position: [columnPositions[0], rowPositions[4]],
  },
  {
    name: 'Godot',
    description: 'The language of the web',
    unlocks: 'TypeScript',
    iconUrl: './icons/React-icon.png',

    position: [columnPositions[2], rowPositions[5]],
  },
  {
    name: 'SEO optimization',
    description: 'The language of the web',
    unlocks: 'TypeScript',
    iconUrl: './icons/React-icon.png',
    position: [columnPositions[2], rowPositions[1]],
  },
  {
    name: 'CSS',
    description: 'The language of the web',
    unlocks: 'TypeScript',
    iconUrl: './icons/React-icon.png',
    position: [columnPositions[0], rowPositions[0]],
    linkPosition: [columnPositions[0], rowPositions[1]],
  },
  {
    name: 'Tailwind',
    description: 'The language of the web',
    unlocks: 'TypeScript',
    iconUrl: './icons/React-icon.png',
    position: [columnPositions[0], rowPositions[1]],
  },
]
const skillsTooling: Skill[] = [
  {
    name: 'Git',
    description: 'The language of the web',
    unlocks: 'TypeScript',
    iconUrl: './icons/React-icon.png',
    position: [columnPositions[1], rowPositions[0]],
    linkPosition: [columnPositions[1], rowPositions[1]],
  },
  {
    name: 'GitHub',
    description: 'The language of the web',
    unlocks: 'TypeScript',
    iconUrl: './icons/React-icon.png',
    position: [columnPositions[1], rowPositions[1]],
  },
  {
    name: 'VSCode',
    description: 'The language of the web',
    unlocks: 'TypeScript',
    iconUrl: './icons/React-icon.png',
    position: [columnPositions[0], rowPositions[0]],
    linkPosition: [columnPositions[0], rowPositions[2]],
  },
  {
    name: 'Chrome Dev Tools',
    description: 'The language of the web',
    unlocks: 'TypeScript',
    iconUrl: './icons/React-icon.png',
    position: [columnPositions[2], rowPositions[0]],
    linkPosition: [columnPositions[2], rowPositions[2]],
  },
  {
    name: 'Chrome Lighthouse analysis',
    description: 'The language of the web',
    unlocks: 'TypeScript',
    iconUrl: './icons/React-icon.png',
    position: [columnPositions[2], rowPositions[2]],
  },
  {
    name: 'Docker',
    description: 'The language of the web',
    unlocks: 'TypeScript',
    iconUrl: './icons/React-icon.png',
    position: [columnPositions[1], rowPositions[5]],
  },
  {
    name: 'Bash',
    description: 'The language of the web',
    unlocks: 'TypeScript',
    iconUrl: './icons/React-icon.png',
    position: [columnPositions[1], rowPositions[3]],
    linkPosition: [columnPositions[1], rowPositions[4]],
  },
  {
    name: 'WSL',
    description: 'The language of the web',
    unlocks: 'TypeScript',
    iconUrl: './icons/React-icon.png',
    position: [columnPositions[0], rowPositions[2]],
  },
  {
    name: 'ZSH',
    description: 'The language of the web',
    unlocks: 'TypeScript',
    iconUrl: './icons/React-icon.png',
    position: [columnPositions[1], rowPositions[4]],
  },
  {
    name: 'Thunder client/Postman',
    description: 'The language of the web',
    unlocks: 'TypeScript',
    iconUrl: './icons/React-icon.png',
    position: [columnPositions[0], rowPositions[4]],
  },
  {
    name: 'Webpack',
    description: 'The language of the web',
    unlocks: 'TypeScript',
    iconUrl: './icons/React-icon.png',
    position: [columnPositions[2], rowPositions[3]],
  },
]

export default function SkillsSection() {
  return (
    <>
      <Section id='skills'>
        <Container>
          <h2 className='text-6xl font-bold col-span-full row-start-1 font-alagard text-center'>Skill Tree</h2>
          <h3 className='uppercase text-1xl col-span-full row-start-2 text-center font-pressStart'>
            Chosen class: Full-stack Developer
          </h3>
          <div className='bg-white w-full col-span-full row-start-3 flex flex-wrap gap-4 text-white'>
            <SkillTree title='Design' imgUrl='aurora.png' treeData={skillsDesign}></SkillTree>
            <SkillTree title='Programming' imgUrl='mountain.png' treeData={skillsProgramming}></SkillTree>
            <SkillTree title='Tooling' imgUrl='ocean.png' treeData={skillsTooling}></SkillTree>
          </div>
        </Container>
      </Section>
    </>
  )
}

const SKILL_NODE_SIZE = 20
const SKILL_NODE_PADDING = 8

const SkillTree = ({ title, imgUrl, treeData }: { title: string; imgUrl: string; treeData: Skill[] }) => {
  const calculateSVGSize = (padding: number) => {
    if (typeof window === 'undefined') return 300
    return Math.min(300, window.innerWidth - 2 * padding)
  }
  const [svgSize, setSVGSize] = useState(() => calculateSVGSize(16))
  const maxPossibleNodes = 18

  useEffect(() => {
    const handleResize = () => {
      setSVGSize(calculateSVGSize(32))
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div
      className={`flex-1 img-border-blue p-2 md:p-4 relative z-10 ${
        imgUrl === 'aurora.png' ? 'text-white' : 'text-black'
      } ${imgUrl === 'ocean.png' && 'img-border-red'} ${
        imgUrl === 'mountain.png' && 'img-border-green'
      } max-w-[360px] m-auto`}
    >
      <div className='absolute inset-2.5  -z-10'>
        <img className='h-full object-cover' src={`./img/${imgUrl}`} alt='background' />
      </div>
      <p className='uppercase text-center  text-sm mt-2 md:mb-4 mb-2'>{title}</p>
      <div className='svg-container flex justify-center items-center'>
        <div className='svg-wrapper h-full min-h-[400px] min-w-72'>
          <Tooltip
            id='tooltip'
            place='top'
            className='node-tooltip'
            render={({ content, activeAnchor }) => {
              return (
                <div role='tooltip'>
                  <h3 className='text-xl font-bold'>{activeAnchor?.getAttribute('data-node-tooltip') || 'no data'}</h3>
                  {content && <p className='my-4 text-md'>{content}</p>}
                  {activeAnchor?.getAttribute('data-tooltip-unlocks') && (
                    <p className='text-xs'>{activeAnchor?.getAttribute('data-tooltip-unlocks')}</p>
                  )}
                </div>
              )
            }}
          />
          <svg viewBox='0 0 100 200' width={'100%'} height={svgSize * 1.5}>
            <rect x={-50} y={0} width={'200%'} height={'100%'} fill='black' opacity={0.5} />
            {treeData.map((skill, i) => (
              <SkillNode key={i} {...skill} tree={title} />
            ))}
          </svg>
        </div>
      </div>
    </div>
  )
}
const getStrokeColor = (treeType = 'string') => {
  if (treeType === 'Design') return '#56a4e9'
  if (treeType === 'Programming') return '#a9e46d'
  return '#f88e87'
}

const SkillNode = ({ name, position, linkPosition, iconUrl, description, unlocks, tree }: Skill) => {
  const xPos = position[0]
  const yPos = position[1]
  const stroke = getStrokeColor(tree)

  return (
    <>
      {linkPosition && (
        <line
          x1={position[0] + SKILL_NODE_SIZE / 2 + SKILL_NODE_PADDING}
          y1={position[1] + SKILL_NODE_SIZE / 2 + SKILL_NODE_PADDING}
          x2={linkPosition[0] + SKILL_NODE_SIZE / 2 + SKILL_NODE_PADDING}
          y2={linkPosition[1] + SKILL_NODE_SIZE / 2 + SKILL_NODE_PADDING}
          stroke={`#ffffff9f`}
          strokeWidth={2}
        />
      )}
      <g
        data-tooltip-id='tooltip'
        data-node-tooltip={name}
        data-tooltip-content={description}
        data-tooltip-unlocks={`${unlocks ? 'Required for: ' + unlocks : ''}`}
        className='outline-none cursor-pointer'
      >
        <rect
          x={xPos + SKILL_NODE_PADDING}
          y={yPos + SKILL_NODE_PADDING}
          width={SKILL_NODE_SIZE}
          height={SKILL_NODE_SIZE}
          fill={`#041237`}
          stroke={`${stroke}`}
        />
        {iconUrl && (
          <image
            x={xPos + SKILL_NODE_PADDING * 1.2}
            y={yPos + SKILL_NODE_PADDING * 1.2}
            width={SKILL_NODE_SIZE * 0.8}
            height={SKILL_NODE_SIZE * 0.8}
            xlinkHref={iconUrl}
            // style={{ filter: 'invert(100%)' }}
          />
        )}
      </g>
    </>
  )
}
