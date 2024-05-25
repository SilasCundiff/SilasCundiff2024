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
        <DeckAndHandContextProvider>
          <CardDraggingContextProvider>
            <CardDropZoneContextProvider>
              <CardGameCanvas />
            </CardDropZoneContextProvider>
          </CardDraggingContextProvider>
        </DeckAndHandContextProvider>
      </Section>
    </>
  )
}
