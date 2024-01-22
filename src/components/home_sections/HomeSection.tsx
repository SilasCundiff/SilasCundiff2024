import Background from '@/components/common/Background'
import LinkButton from '@/components/common/LinkButton'
import Container from '@/components/layout/Container'
import Nav from '@/components/layout/Nav'
import heroBackground from '../../../public/img/hero-background.png'

export default function HomeSection() {
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
    </>
  )
}
