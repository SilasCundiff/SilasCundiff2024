import Container from '@/components/layout/Container'
import SilvanusLoader from '@/components/godot/SilvanusLoader'

export default function AboutSection() {
  return (
    <>
      <Container>
        <h2 className='text-6xl font-bold col-span-full  font-alagard text-center pb-2 mt-24'>My Story</h2>
        <h3 className='uppercase text-1xl col-span-full row-start-2 text-center font-pressStart mb-6'>
          Explore my lore below!
        </h3>
        <div className='container m-auto max-w-[1168px] img-border-cyan'>
          <SilvanusLoader />
        </div>
      </Container>
    </>
  )
}
