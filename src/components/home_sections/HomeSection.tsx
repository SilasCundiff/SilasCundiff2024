import Background from '@/components/common/Background'
import LinkButton from '@/components/common/LinkButton'
import Container from '@/components/layout/Container'
import Nav from '@/components/layout/Nav'
import heroBackground from '../../../public/img/hero-background-high-res.png'

export default function HomeSection() {
  return (
    <>
      <header id='home' className='flex h-svh flex-col font-alagard'>
        <Background backgroundImage={heroBackground} />
        <Container gap={false}>
          <h1 className='text-shadow-blue text-outline col-span-12 transform-gpu text-center text-4xl font-bold leading-tight sm:text-6xl md:col-span-6 md:col-start-4 md:text-8xl'>
            Silas&apos;s Saga
          </h1>
          <p className='text-shadow-blue-dark col-span-12 row-start-2 pb-8 text-center font-pressStart text-xl leading-tight sm:text-2xl md:col-span-6 md:col-start-4 md:text-2xl'>
            A tale of my adventure through the world of web development!
          </p>
          {/* <div className='col-span-12 row-start-3 space-x-8  md:col-span-6 md:col-start-4'>
            <LinkButton href='#projects'>Projects</LinkButton>
            <LinkButton href='#contact'>Contact</LinkButton>
          </div> */}
        </Container>
        <Nav />
      </header>
    </>
  )
}
