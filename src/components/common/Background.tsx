import Image, { StaticImageData } from 'next/image'

export default function Background({ backgroundImage }: { backgroundImage: StaticImageData }) {
  return (
    <div className='absolute inset-0 -z-10 max-h-svh '>
      <Image src={backgroundImage} className='size-full object-cover object-top' alt='pixel background' />
    </div>
  )
}
