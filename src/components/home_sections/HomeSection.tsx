import LinkButton from '@/components/common/LinkButton'

export default function HomeSection() {
  return (
    <>
      <header id='home' className='scroll-snap-child flex p-4 h-svh flex-col font-alagard'>
        <div className='container m-auto flex flex-col'>
          <h1 className='text-shadow-blue text-outline text-black transform-gpu text-center text-7xl font-bold'>
            Silas&apos;s Saga
          </h1>
          <p className=' mx-auto text-shadow-blue-dark text-center font-pressStart text-slate-800 text-xl leading-tight max-w-2xl '>
            A tale of my adventure through the world of web development!
          </p>
          <div className='mx-auto pt-4 flex flex-wrap gap-4 '>
            <LinkButton href='#projects'>Projects</LinkButton>
            <LinkButton href='https://github.com/SilasCundiff'>Github</LinkButton>
          </div>
        </div>
      </header>
    </>
  )
}
