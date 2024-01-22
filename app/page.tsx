'use client'

import Background from '@/components/common/Background'
import LinkButton from '@/components/common/LinkButton'
import Container from '@/components/layout/Container'
import Nav from '@/components/layout/Nav'
import Section from '@/components/layout/Section'
import heroBackground from '../public/img/hero-background.png'

export default function Page() {
  return (
    <>
      <header id='home' className='flex h-svh flex-col font-alagard'>
        <Background backgroundImage={heroBackground} />
        <Container gap='0'>
          <h1 className='text-shadow-blue text-outline col-span-12 text-[4rem] font-bold leading-tight md:col-span-6'>
            Hey, I&apos;m Silas
          </h1>
          <p className='text-shadow-blue-dark col-span-12 row-start-2 pb-4 font-pressStart text-[1.75rem] leading-tight md:col-span-6'>
            Designing and developing cool stuff is what I do!
          </p>
          <div className='col-span-12 row-start-3 space-x-8 md:col-span-6'>
            <LinkButton href='#projects'>Projects</LinkButton>
            <LinkButton href='#contact'>Contact</LinkButton>
          </div>
          {/* <div className='row-span-3 bg-red-500 col-span-6'>placeholder box</div> */}
        </Container>
        <Nav />
      </header>
      <Section id='skills'>
        <Container>
          <h2 className='text-4xl font-bold'>skill tree</h2>
        </Container>
      </Section>
      <Section id='projects'>
        <Background backgroundImage={heroBackground} />
        <Container>
          <h2 className='text-4xl font-bold'>projects deck</h2>
        </Container>
      </Section>
      <Section id='about'>
        <Container>
          <h2 className='text-4xl font-bold'>lore</h2>
        </Container>
      </Section>
      <Section id='contact'>
        <Container>
          <h2 className='text-4xl font-bold'>/whisper</h2>
        </Container>
      </Section>
    </>
  )
}
