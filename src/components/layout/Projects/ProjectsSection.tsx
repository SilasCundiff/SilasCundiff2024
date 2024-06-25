import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'

import { CardDraggingContextProvider } from '@/lib/contexts/CardDraggingContext'
import { CardDropZoneContextProvider } from '@/lib/contexts/CardDropZoneContext'
import DeckAndHandContextProvider from '@/lib/contexts/DeckAndHandContext'
import CardGameCanvas from '../../experiences/CardGameExperience/CardGameCanvas'

export default function ProjectsSection() {
  return (
    <>
      <div className='container pb-4'>
        <div className=''>
          <h2 className='text-6xl font-bold  font-alagard text-center pb-2 text-white text-shadow-lg'>Projects</h2>
          <h3 className='uppercase text-sm row-start-2 text-center font-pressStart mb-0 text-white text-shadow-md'>
            Drag a card to the <br></br>Card Drop Zone to view more!
          </h3>
        </div>
      </div>
      <div className='p-4 container'>
        <DeckAndHandContextProvider>
          <CardDraggingContextProvider>
            <CardDropZoneContextProvider>
              <CardGameCanvas />
            </CardDropZoneContextProvider>
          </CardDraggingContextProvider>
        </DeckAndHandContextProvider>
      </div>
    </>
  )
}
