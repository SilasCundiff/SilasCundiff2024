import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import { skillsDesign, skillsProgramming, skillsTooling } from '@/helpers/Skills'
import SkillTree from './SkillTree'

export default function SkillsSection() {
  return (
    <>
      <Section id='skills'>
        <Container>
          <div className='container m-auto mb-8 flex flex-col inventory-border max-w-fit sm:mx-auto mx-3 p-8 inventory-bg'>
            <h2 className='text-6xl font-bold col-span-full  font-alagard text-center pb-2  text-shadow-lg text-white'>
              Skill Tree
            </h2>
            <h3 className='uppercase text-sm col-span-full row-start-2 text-center font-pressStart  text-shadow-sm text-cyan-100'>
              Chosen class: Full-stack Developer
            </h3>
          </div>
          <div className='w-full flex flex-wrap md:gap-x-2 gap-y-4 text-white mx-auto container md:p-8 p-0'>
            <SkillTree title='Design' imgUrl='aurora.png' treeData={skillsDesign} />
            <SkillTree title='Programming' imgUrl='mountain.png' treeData={skillsProgramming} />
            <SkillTree title='Tooling' imgUrl='ocean.png' treeData={skillsTooling} />
          </div>
        </Container>
      </Section>
    </>
  )
}
