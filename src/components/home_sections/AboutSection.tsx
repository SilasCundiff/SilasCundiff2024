import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import SilvanusLoader from '../godot/silvanus_loader'

export default function AboutSection() {
  return (
    <>
      <Section id='about'>
        {/* <Background backgroundImage={Sky} /> */}
        {/* <Background backgroundImage={BGTrees2} />
        <Background backgroundImage={SnowMountains} />
        <Background backgroundImage={BGTrees1} />
        <Background backgroundImage={BGTrees5} />
        <Background backgroundImage={SnowGround} />
        <Background backgroundImage={BGTrees4} />
        <Background backgroundImage={BGTrees3} />
        <Background backgroundImage={SnowPath} />
        <Background backgroundImage={ForegroundTrees} /> */}

        <Container>
          <h2 className='text-6xl font-bold col-span-full  font-alagard text-center pb-2 mt-24'>My Story</h2>
          <h3 className='uppercase text-1xl col-span-full row-start-2 text-center font-pressStart mb-6'>
            Explore my lore below!
          </h3>
          <div className='container m-auto max-w-[1168px] img-border-cyan'>
            <SilvanusLoader />
          </div>
        </Container>
      </Section>
    </>
  )
}
