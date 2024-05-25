import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Background from '@/components/common/Background'

// winter bg pieces
// import
import Sky from '../../../public/img/winter_bg/sky.png'
import SnowGround from '../../../public/img/winter_bg/snow_ground.png'
import SnowMountains from '../../../public/img/winter_bg/snow_piles.png'
import SnowPath from '../../../public/img/winter_bg/snow_path.png'
import BGTrees1 from '../../../public/img/winter_bg/bg_trees_1.png'
import BGTrees2 from '../../../public/img/winter_bg/bg_trees_2.png'
import BGTrees3 from '../../../public/img/winter_bg/bg_trees_3.png'
import BGTrees4 from '../../../public/img/winter_bg/bg_trees_4.png'
import BGTrees5 from '../../../public/img/winter_bg/bg_trees_5.png'
import ForegroundTrees from '../../../public/img/winter_bg/foreground_trees.png'

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
          <iframe
            className='w-full col-span-12 min-h-[600px]'
            src='./godot/Silvanus_Lore.html'
            frameBorder='0'
          ></iframe>
        </Container>
      </Section>
    </>
  )
}
