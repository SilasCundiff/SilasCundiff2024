import Image, { StaticImageData } from 'next/image'

export default function Background({
  backgroundImage,
  alt = '',
  parallaxStrength = 0,
}: {
  backgroundImage: StaticImageData
  alt?: string
  parallaxStrength?: number
}) {
  return (
    <div className='fixed inset-0 -z-10 max-h-svh '>
      <Image
        src={backgroundImage}
        className='h-auto w-full object-cover object-center'
        alt={alt}
        placeholder='blur'
        quality={100}
        fill
        sizes='100vw'
        style={{
          objectFit: 'cover',
        }}
      />
    </div>
  )
}
