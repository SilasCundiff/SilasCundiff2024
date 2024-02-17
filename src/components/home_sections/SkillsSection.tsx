/* eslint-disable @next/next/no-img-element */
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import { useEffect, useState } from 'react'
import { Tooltip } from 'react-tooltip'

type ColumnPositionsKey = 0 | 1 | 2
type RowPositionsKey = 0 | 1 | 2 | 3 | 4 | 5

const columnPositions: Record<number, number> = {
  0: 0,
  1: 32,
  2: 64,
}

const rowPositions: Record<number, number> = {
  0: 0,
  1: 32,
  2: 64,
  3: 96,
  4: 128,
  5: 160,
}

type Skill = {
  name: string
  description?: string
  unlocks?: string
  investment?: number
  position: [number, number]
  linkPosition?: [number, number]
  iconUrl?: string
  active?: boolean
  fill?: string
}

const skillsDesign: Skill[] = [
  { name: 'Figma', position: [columnPositions[0], rowPositions[0]], fill: 'blue' },
  { name: 'Photoshop', position: [columnPositions[1], rowPositions[0]], fill: 'green' },
  {
    name: 'Illustrator',
    position: [columnPositions[2], rowPositions[0]],
    linkPosition: [columnPositions[2], rowPositions[1]],
    fill: 'red',
  },
  { name: 'After Effects', position: [columnPositions[0], rowPositions[1]], fill: '#fff' },
  { name: 'Premiere Pro', position: [columnPositions[1], rowPositions[2]], fill: '#ff34ff' },
  { name: 'Blender', position: [columnPositions[2], rowPositions[1]], fill: '#5f34ff' },
  { name: 'UX/UI', position: [columnPositions[0], rowPositions[3]], fill: '#ff346f' },
  { name: 'Animation', position: [columnPositions[1], rowPositions[4]], fill: '#fff466' },
  { name: 'Typography', position: [columnPositions[2], rowPositions[4]], fill: '#66ffff' },
  { name: 'UX/UI', position: [columnPositions[1], rowPositions[5]], fill: '#44f466' },
]
const skillsProgramming: Skill[] = [
  {
    name: 'JavaScript',
    description: 'The language of the web',
    unlocks: 'TypeScript',
    position: [columnPositions[1], rowPositions[0]],
    linkPosition: [columnPositions[1], rowPositions[1]],
    fill: 'yellow',
    iconUrl: './img/React-icon.png',
  },
  { name: 'TypeScript', position: [columnPositions[1], rowPositions[1]], fill: 'blue' },
  { name: 'HTML', position: [columnPositions[0], rowPositions[0]], fill: '#5f34ff' },
  { name: 'CSS', position: [columnPositions[2], rowPositions[0]], fill: '#ff346f' },
]
const skillsTooling: Skill[] = [
  { name: 'Git', position: [columnPositions[1], rowPositions[0]], fill: '#66ffff' },
  { name: 'Docker', position: [columnPositions[0], rowPositions[0]], fill: '#fff466' },
  { name: 'Webpack', position: [columnPositions[2], rowPositions[0]], fill: '#ff346f', description: 'Bundler' },
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
      className={`flex-1  p-2 md:p-4 relative z-10 ${
        imgUrl === 'aurora.png' ? 'text-white' : 'text-black'
      } max-w-[360px] m-auto`}
    >
      <div className='absolute inset-0  -z-10'>
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
              <SkillNode key={i} {...skill} />
            ))}
          </svg>
        </div>
      </div>
    </div>
  )
}

const SkillNode = ({ name, position, linkPosition, fill, iconUrl, description, unlocks }: Skill) => {
  const xPos = position[0]
  const yPos = position[1]
  console.log('data', iconUrl, name, description, unlocks)
  return (
    <>
      {linkPosition && (
        <line
          x1={position[0] + SKILL_NODE_SIZE / 2 + SKILL_NODE_PADDING}
          y1={position[1] + SKILL_NODE_SIZE / 2 + SKILL_NODE_PADDING}
          x2={linkPosition[0] + SKILL_NODE_SIZE / 2 + SKILL_NODE_PADDING}
          y2={linkPosition[1] + SKILL_NODE_SIZE / 2 + SKILL_NODE_PADDING}
          stroke='white'
          strokeWidth={2}
        />
      )}
      <g
        data-tooltip-id='tooltip'
        data-node-tooltip={name}
        data-tooltip-content={description}
        data-tooltip-unlocks={`${unlocks ? 'Unlocks: ' + unlocks : ''}`}
        className='outline-none cursor-pointer'
      >
        <rect
          x={xPos + SKILL_NODE_PADDING}
          y={yPos + SKILL_NODE_PADDING}
          width={SKILL_NODE_SIZE}
          height={SKILL_NODE_SIZE}
          fill={fill}
          stroke='cyan'
        />
        {iconUrl && (
          <image
            x={xPos + SKILL_NODE_PADDING}
            y={yPos + SKILL_NODE_PADDING}
            width={SKILL_NODE_SIZE}
            height={SKILL_NODE_SIZE}
            xlinkHref={iconUrl}
          />
        )}
      </g>
    </>
  )
}
