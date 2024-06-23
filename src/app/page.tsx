'use client'
import HomeSection from '@/components/home_sections/HomeSection'
import SkillsSection from '@/components/home_sections/SkillsSection'
import ProjectsSection from '@/components/home_sections/ProjectsSection'
import AboutSection from '@/components/home_sections/AboutSection'
import Background from '@/components/common/Background'
import heroBackground from '../../public/img/new_background.png'
import Nav from '@/components/layout/Nav'

export default function Page() {
  return (
    <>
      <Background backgroundImage={heroBackground} />
      <HomeSection />
      <SkillsSection />
      <ProjectsSection />
      <AboutSection />
    </>
  )
}
