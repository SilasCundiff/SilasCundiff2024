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
          <h2 className='text-4xl font-bold'>lore (about)</h2>
          <SilvanusLoader />
        </Container>
      </Section>
    </>
  )
}
