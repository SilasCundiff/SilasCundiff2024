/* eslint-disable @next/next/no-img-element */
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import { useEffect, useState } from 'react'
import { Tooltip } from 'react-tooltip'
import Nav from '../layout/Nav'

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
    description: 'Utilize fonts effectively to provide readable and appropriately styled text.',
    iconUrl: './icons/typography.png',
    position: [columnPositions[0], rowPositions[0]],
  },
  {
    name: 'Color Theory',
    description: 'Understand and utilize colors appropriately.',
    unlocks: 'TypeScript',
    iconUrl: './icons/color.png',
    position: [columnPositions[1], rowPositions[0]],
  },
  {
    name: 'Layouts',
    description:
      'Proper use of css and design to creating appealing and easy to navigate websites. Includes responsiveness.',
    iconUrl: './icons/layouts.png',
    position: [columnPositions[2], rowPositions[0]],
  },
  {
    name: 'Figma/XD',
    description: 'Design tools to facilitate creativity and project planning.',
    unlocks: 'Prototyping',
    iconUrl: './icons/figma.png',
    position: [columnPositions[0], rowPositions[1]],
    linkPosition: [columnPositions[0], rowPositions[2]],
  },
  {
    name: 'Photoshop',
    description: 'A picture is worth a thousand words.',
    iconUrl: './icons/photoshop.png',
    position: [columnPositions[2], rowPositions[1]],
  },
  {
    name: 'Illustrator',
    description: 'Need something more than a simple image?',
    unlocks: 'SVGs',
    iconUrl: './icons/illustrator.png',
    position: [columnPositions[1], rowPositions[1]],
    linkPosition: [columnPositions[1], rowPositions[2]],
  },
  {
    name: 'SVGs',
    description: 'PNGs and JPEGs have their uses, but sometimes you need something more crisp and versatile.',
    unlocks: 'After Effects/Lottie',
    iconUrl: './icons/svgs.png',
    position: [columnPositions[1], rowPositions[2]],
    linkPosition: [columnPositions[1], rowPositions[3]],
  },
  {
    name: 'Blender',
    description: '2D models are great, but sometimes you need to bring your designs into the third dimension.',
    unlocks: '3D/GLTF Models',
    iconUrl: './icons/blender.png',
    position: [columnPositions[2], rowPositions[2]],
    linkPosition: [columnPositions[2], rowPositions[3]],
  },
  {
    name: 'Prototyping',
    description: 'Why embark on a journey without a destination?',
    iconUrl: './icons/prototyping.png',
    position: [columnPositions[0], rowPositions[2]],
  },
  {
    name: 'After Effects/Lottie',
    description: 'Some complex animations require a bit more than simple JS and CSS.',
    iconUrl: './icons/aftereffects.png',
    position: [columnPositions[1], rowPositions[3]],
  },
  {
    name: '3D/GLTF Models',
    description: 'Unlocks 3D models and the common GLTF file format.',
    iconUrl: './icons/3d.png',
    position: [columnPositions[2], rowPositions[3]],
  },
  {
    name: 'Accessibility',
    description: 'The web is for everyone. Gain the ability to create experiences that account all users.',
    iconUrl: './icons/accessibility.png',
    position: [columnPositions[0], rowPositions[4]],
  },
  {
    name: 'UX/UI',
    description: 'Ensures a users experience when interacting with your websites.',
    iconUrl: './icons/uxui.png',
    position: [columnPositions[1], rowPositions[4]],
  },
  {
    name: 'Creativity',
    description: 'Anyone can follow, few can create. Find new ways to bring life into designs.',
    iconUrl: './icons/creativity.png',
    position: [columnPositions[1], rowPositions[5]],
  },
]
const skillsProgramming: Skill[] = [
  {
    name: 'Node',
    description: 'JavaScript, but for servers!',
    unlocks: 'Express',
    iconUrl: './icons/node.png',
    position: [columnPositions[2], rowPositions[2]],
    linkPosition: [columnPositions[2], rowPositions[3]],
  },
  {
    name: 'Node',
    description: 'JavaScript, but for servers!',
    unlocks: 'Express',
    iconUrl: './icons/node.png',
    position: [columnPositions[2], rowPositions[2]],
    linkPosition: [columnPositions[1], rowPositions[2]],
  },
  {
    name: 'Express',
    description: 'The premier Node API library',
    iconUrl: './icons/express.png',
    position: [columnPositions[2], rowPositions[3]],
  },
  {
    name: 'JavaScript',
    description: 'The language of the web, a foundation of website interactivity.',
    unlocks: 'TypeScript',
    position: [columnPositions[1], rowPositions[2]],
    linkPosition: [columnPositions[1], rowPositions[3]],

    iconUrl: './icons/javascript.png',
  },
  {
    name: 'Bootstrap',
    description: 'A library of UI elements for rapid development.',
    iconUrl: './icons/bootstrap.png',
    position: [columnPositions[0], rowPositions[2]],
  },
  {
    name: 'TypeScript',
    description: 'The language of the web, but type safe!',
    unlocks: 'React',
    iconUrl: './icons/typescript.png',
    position: [columnPositions[1], rowPositions[3]],
    linkPosition: [columnPositions[1], rowPositions[4]],
  },
  {
    name: 'React',
    description: 'Build better frontends, with stateful components.',
    unlocks: 'NextJS',
    iconUrl: './icons/react.png',
    position: [columnPositions[1], rowPositions[4]],
    linkPosition: [columnPositions[1], rowPositions[5]],
  },
  {
    name: 'NextJS',
    description: 'Build better frontends, with SEO optimizations, routes, apis, and more!',
    iconUrl: './icons/nextjs.png',
    position: [columnPositions[1], rowPositions[5]],
  },
  {
    name: 'Three.js',
    description: 'Turn your webpage into a web experience!',
    iconUrl: './icons/threejs.png',
    position: [columnPositions[2], rowPositions[4]],
  },
  {
    name: 'HTML',
    description: 'The fundamental was to describe your websites.',
    unlocks: 'Seo Optimizations',
    iconUrl: './icons/html.png',

    position: [columnPositions[2], rowPositions[0]],

    linkPosition: [columnPositions[2], rowPositions[1]],
  },
  {
    name: 'PHP',
    description: 'A classic templating and backend language, established and powerful.',
    unlocks: 'WordPress',
    iconUrl: './icons/php.png',

    position: [columnPositions[0], rowPositions[3]],
    linkPosition: [columnPositions[0], rowPositions[4]],
  },
  {
    name: 'WordPress',
    description: 'The largest CMS on the web.',
    iconUrl: './icons/wordpress.png',

    position: [columnPositions[0], rowPositions[4]],
  },
  {
    name: 'Godot',
    description: 'Open source game dev engine, build your dream game.',
    iconUrl: './icons/godot.png',

    position: [columnPositions[2], rowPositions[5]],
  },
  {
    name: 'SEO optimization',
    description: 'Improve search rankings by optimizing your site.',
    iconUrl: './icons/seo.png',
    position: [columnPositions[2], rowPositions[1]],
  },
  {
    name: 'CSS',
    description: "Now that's style! Add color, adjust layouts, improve responsiveness, and more!",
    unlocks: 'Tailwind',
    iconUrl: './icons/css.png',
    position: [columnPositions[0], rowPositions[0]],
    linkPosition: [columnPositions[0], rowPositions[1]],
  },
  {
    name: 'Tailwind',
    description: "Now that's style, but faster and easier to write!",
    iconUrl: './icons/tailwind.png',
    position: [columnPositions[0], rowPositions[1]],
  },
]
const skillsTooling: Skill[] = [
  {
    name: 'Git',
    description: 'An elephant never forgets, and neither does Git... as long as you commit.',
    unlocks: 'GitHub',
    iconUrl: './icons/git.png',
    position: [columnPositions[1], rowPositions[0]],
    linkPosition: [columnPositions[1], rowPositions[1]],
  },
  {
    name: 'GitHub',
    description: 'A place to commit to on the web.',
    iconUrl: './icons/github.png',
    position: [columnPositions[1], rowPositions[1]],
  },
  {
    name: 'VSCode',
    description: 'The standard in code editing.',
    unlocks: 'WSL',
    iconUrl: './icons/vscode.png',
    position: [columnPositions[0], rowPositions[0]],
    linkPosition: [columnPositions[0], rowPositions[2]],
  },
  {
    name: 'Chrome Dev Tools',
    description: 'You merely opened the dev tools, I was born into them, moulded by them!',
    unlocks: 'Chrome Lighthouse',
    iconUrl: './icons/chrome.png',
    position: [columnPositions[2], rowPositions[0]],
    linkPosition: [columnPositions[2], rowPositions[2]],
  },
  {
    name: 'Chrome Lighthouse analysis',
    description: 'Make your websites faster and more accessible for better SEO!',
    iconUrl: './icons/lighthouse.png',
    position: [columnPositions[2], rowPositions[2]],
  },
  {
    name: 'Docker',
    description: 'Keep yourself contained, so you are ready to deploy anywhere!',
    iconUrl: './icons/docker.png',
    position: [columnPositions[1], rowPositions[5]],
  },
  {
    name: 'Bash',
    description: 'Better than CMD',
    unlocks: 'ZSH',
    iconUrl: './icons/bash.png',
    position: [columnPositions[1], rowPositions[3]],
    linkPosition: [columnPositions[1], rowPositions[4]],
  },
  {
    name: 'WSL',
    description: "It's like linux, but for people that are too ingrained to leave windows.",
    iconUrl: './icons/wsl.png',
    position: [columnPositions[0], rowPositions[2]],
  },
  {
    name: 'ZSH',
    description:
      "Your terminal, but with super powers. (let's be honest, you only use this because it lets you use fancy fonts)",
    iconUrl: './icons/zsh.png',
    position: [columnPositions[1], rowPositions[4]],
  },
  {
    name: 'Thunder client/Postman',
    description: "Need to make an http request? Don't log it! Postman it!",
    iconUrl: './icons/postman.png',
    position: [columnPositions[0], rowPositions[4]],
  },
  {
    name: 'Webpack',
    description: "Learn a bundler they said, it'll be fun they said. (no one actually said that ever)",
    iconUrl: './icons/webpack.png',
    position: [columnPositions[2], rowPositions[3]],
  },
]

export default function SkillsSection() {
  return (
    <>
      <Section id='skills'>
        <Nav />
        <Container>
          <h2 className='text-6xl font-bold col-span-full  font-alagard text-center pb-2 mt-12'>Skill Tree</h2>
          <h3 className='uppercase text-1xl col-span-full row-start-2 text-center font-pressStart mb-6'>
            Chosen class: Full-stack Developer
          </h3>
          <div className=' w-full flex flex-wrap justify-between text-white'>
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
      } ${imgUrl === 'ocean.png' && 'img-border-red'} ${imgUrl === 'mountain.png' && 'img-border-green'} max-w-[360px]`}
    >
      <div className='absolute inset-2.5  -z-10'>
        <img className='h-full object-cover' src={`./img/${imgUrl}`} alt='background' />
      </div>
      <p className='uppercase text-center text-sm mt-2 md:mb-4 mb-2'>{title}</p>
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
