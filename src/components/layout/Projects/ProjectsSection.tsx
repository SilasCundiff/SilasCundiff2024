import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'

import { CardDraggingContextProvider } from '@/helpers/contexts/CardDraggingContext'
import { CardDropZoneContextProvider } from '@/helpers/contexts/CardDropZoneContext'
import DeckAndHandContextProvider from '@/helpers/contexts/DeckAndHandContext'
import CardGameCanvas from '../../experiences/CardGameExperience/CardGameCanvas'

export default function ProjectsSection() {
  return (
    <>
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
    </>
  )
}
