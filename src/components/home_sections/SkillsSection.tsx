import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Image from 'next/image'
import { ReactComponentElement } from 'react'

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
            <div className=' flex-1  p-4 relative z-10'>
              <div className='absolute inset-0 bg-red-400 -z-10'>
                <img className='h-full object-cover' src={'./img/aurora.png'} alt='background' />
              </div>
              <p className='uppercase text-center  text-sm mt-2 mb-4'>Design</p>
              <div>
                <SkillNode />
                <SkillNode />
                <SkillNode />
                <SkillNode />
                <SkillNode />
                <SkillNode />
                <SkillNode />
                <SkillNode />
                <SkillNode />
                <SkillNode />
                <SkillNode />
              </div>
            </div>
            <div className='flex-1  p-4 relative z-10 text-black'>
              <div className='absolute inset-0 bg-blue-400 -z-10'>
                <img className='h-full object-cover' src={'./img/mountain.png'} alt='background' />
              </div>
              <p className='uppercase text-center  text-sm mt-2 mb-4'>Programming</p>
              <div>
                <SkillNode />
                <SkillNode />
                <SkillNode />
                <SkillNode />
                <SkillNode />
                <SkillNode />
                <SkillNode />
                <SkillNode />
                <SkillNode />
                <SkillNode />
                <SkillNode />
              </div>
            </div>
            <div className='flex-1  p-4 relative z-10 text-black'>
              <div className='absolute inset-0 bg-green-400 -z-10'>
                <img className='h-full object-cover' src={'./img/ocean.png'} alt='background' />
              </div>
              <p className='uppercase text-center  text-sm mt-2 mb-4'>Tooling</p>
              <div className='grid-cols-6'>
                <SkillTreeRow>
                  <SkillNode />
                  <SkillNode />
                  <SkillNode />
                </SkillTreeRow>
                <SkillTreeRow>
                  <SkillNode />
                  <SkillNode />
                  <SkillNode />
                </SkillTreeRow>
                <SkillTreeRow>
                  <SkillNode />
                  <SkillNode />
                </SkillTreeRow>
                <SkillTreeRow>
                  <SkillNode />
                </SkillTreeRow>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

const SkillTreeRow = ({ children }: { children: any }) => {
  return <div className='flex flex-row col-span-6 gap-2 my-2 bg-blue-600'>{children}</div>
}

const SkillNode = () => {
  return <div className='min-w-12 min-h-12 max-h-12 max-w-12 bg-red-200 border-2 border-black'></div>
}
