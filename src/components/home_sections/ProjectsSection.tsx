import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Background from '@/components/common/Background'

// jungle bg pieces
import bg3Sky from '../../../public/img/bg3-pieces/sky.png'
import bg3grassRoad from '../../../public/img/bg3-pieces/grass&road.png'
import bg3treesBushes from '../../../public/img/bg3-pieces/trees&bushes.png'
import bg3jungleBG from '../../../public/img/bg3-pieces/jungle_bg.png'
import bg3Fireflies from '../../../public/img/bg3-pieces/fireflys.png'
import bg3Grasses from '../../../public/img/bg3-pieces/grasses.png'

export default function ProjectsSection() {
  return (
    <>
      <Section id='projects'>
        <Background backgroundImage={bg3Sky} />
        <Background backgroundImage={bg3jungleBG} />
        <Background backgroundImage={bg3treesBushes} />
        <Background backgroundImage={bg3Grasses} />
        <Background backgroundImage={bg3grassRoad} />
        <Background backgroundImage={bg3Fireflies} />
        <Container>
          <h2 className='text-4xl font-bold'>projects deck</h2>
        </Container>
      </Section>
    </>
  )
}
