import Image, { StaticImageData } from 'next/image'

export default function Background({ backgroundImage }: { backgroundImage: StaticImageData }) {
  return (
    <div className='absolute inset-0 bg-red-500 -z-10 max-h-svh'>
      <Image
        priority
        quality={100}
        src={backgroundImage}
        className='object-top object-cover w-full h-full'
        alt='pixel background of a mountain view with a tree to the right and a lake in a valley'
      />
    </div>
  )
}
