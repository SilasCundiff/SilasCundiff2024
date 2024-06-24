import Nav from '../layout/Nav'
import Section from '../layout/Section'

export default function HomeSection() {
  return (
    <Section id='home'>
      <header className='flex p-4 h-svh w-full flex-col font-alagard relative'>
        <Nav />
        <div className='container m-auto mb-96 flex flex-col inventory-border max-w-fit px-8 pb-8 pt-2 inventory-bg'>
          <h1 className='text-shadow-lg text-outline text-white transform-gpu text-center text-7xl font-bold leading-relaxed'>
            Silas&apos;s Saga
          </h1>
          <p className=' mx-auto text-shadow-sm text-center font-pressStart text-cyan-100 text-lg leading-relaxed max-w-xl'>
            A tale of my adventure through the world of web development!
          </p>
        </div>
      </header>
    </Section>
  )
}
