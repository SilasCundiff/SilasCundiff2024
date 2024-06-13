import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Background from '@/components/common/Background'

// jungle bg pieces
import Sky from '../../../public/img/jungle_bg/sky.png'
import GrassRoad from '../../../public/img/jungle_bg/grass&road.png'
import TreesBushes from '../../../public/img/jungle_bg/trees&bushes.png'
import JungleBG from '../../../public/img/jungle_bg/jungle_bg.png'
import Fireflies from '../../../public/img/jungle_bg/fireflies.png'
import Grasses from '../../../public/img/jungle_bg/grasses.png'
import CardGameCanvas from '../canvas/CardGameCanvas'

import { CardDraggingContextProvider } from '@/helpers/contexts/CardDraggingContext'
import { CardDropZoneContextProvider } from '@/helpers/contexts/CardDropZoneContext'
import DeckAndHandContextProvider from '@/helpers/contexts/DeckAndHandContext'

export default function ProjectsSection() {
  return (
    <>
      <Section id='projects'>
        {/* <Background backgroundImage={Sky} />
        <Background backgroundImage={JungleBG} />
        <Background backgroundImage={TreesBushes} />
        <Background backgroundImage={Grasses} />
        <Background backgroundImage={GrassRoad} />
        <Background backgroundImage={Fireflies} /> */}
        <Container>
          <div className='absolute left-[50%] top-[40%] -translate-x-[50%] -translate-y-[40%]'>
            <h2 className='text-6xl font-bold col-span-full  font-alagard text-center pb-2'>Projects</h2>
            <h3 className='uppercase text-sm col-span-full row-start-2 text-center font-pressStart mb-6'>
              Drag a card to the <br></br>Card Drop Zone to view more!
            </h3>
          </div>
          <DeckAndHandContextProvider>
            <CardDraggingContextProvider>
              <CardDropZoneContextProvider>
                <CardGameCanvas />
              </CardDropZoneContextProvider>
            </CardDraggingContextProvider>
          </DeckAndHandContextProvider>
        </Container>
      </Section>
    </>
  )
}
