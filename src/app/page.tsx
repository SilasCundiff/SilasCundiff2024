'use client'
import HomeSection from '@/components/layout/Home/HomeSection'
import SkillsSection from '@/components/layout/Skills/SkillsSection'
import ProjectsSection from '@/components/layout/Projects/ProjectsSection'
import AboutSection from '@/components/layout/About/AboutSection'
import Background from '@/components/ui/Background'
import heroBackground from '../../public/img/new_background.png'
import Nav from '@/components/layout/Nav/Nav'

import { useState } from 'react'
import Section from '@/components/layout/Section'
import Footer from '@/components/layout/Footer'
const sections = [
  { id: 'home', title: 'Home', component: <HomeSection /> },
  { id: 'skills', title: 'Skills', component: <SkillsSection /> },
  { id: 'projects', title: 'Projects', component: <ProjectsSection /> },
  { id: 'lore', title: 'About', component: <AboutSection /> },
]
export default function Page() {
  const [sectionInView, setSectionInView] = useState(sections[0].id)

  return (
    <>
      <Nav sectionInView={sectionInView} />
      <Background backgroundImage={heroBackground} />
      {sections.map((section, index) => (
        <Section key={index} id={section.id} setSectionInView={setSectionInView}>
          {section.component}
        </Section>
      ))}
      <Footer />
    </>
  )
}
