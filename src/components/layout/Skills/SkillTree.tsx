/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from 'react'
import { Tooltip } from 'react-tooltip'
import SkillNode from './SkillNode'
import { Skill } from '@/helpers/Skills'
const SkillTree = ({ title, imgUrl, treeData }: { title: string; imgUrl: string; treeData: Skill[] }) => {
  const calculateSVGSize = (padding: number) => {
    if (typeof window === 'undefined') return 300
    return Math.min(300, window.innerWidth - 2 * padding)
  }
  const [svgSize, setSVGSize] = useState(() => calculateSVGSize(16))

  useEffect(() => {
    const handleResize = () => {
      setSVGSize(calculateSVGSize(32))
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div
      className={`flex-1 mx-auto inventory-border-sm p-2 md:p-4 relative z-10 ${
        imgUrl === 'aurora.png' ? 'text-white' : 'text-black'
      } ${imgUrl === 'ocean.png'} ${imgUrl === 'mountain.png'} max-w-[360px]`}
    >
      <div className='absolute inset-2.5  -z-10'>
        {/* TODO make this an image component */}
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

export default SkillTree
