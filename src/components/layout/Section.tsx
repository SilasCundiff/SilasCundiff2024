export default function Section({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <section id={id} className='scroll-snap-child relative flex min-h-[100svh] w-full flex-col font-pressStart '>
      {children}
    </section>
  )
}
