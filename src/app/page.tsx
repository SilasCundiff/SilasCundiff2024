'use client'
import SectionSpacer from '@/components/common/SectionSpacer'
import HomeSection from '@/components/home_sections/HomeSection'
import SkillsSection from '@/components/home_sections/SkillsSection'
import ProjectsSection from '@/components/home_sections/ProjectsSection'
import AboutSection from '@/components/home_sections/AboutSection'
import ContactSection from '@/components/home_sections/ContactSection'

export default function Page() {
  return (
    <>
      <HomeSection />
      <SkillsSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
    </>
  )
}
