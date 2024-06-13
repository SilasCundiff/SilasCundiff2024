export default function Section({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <section
      id={id}
      className='scroll-snap-child relative flex min-h-[90svh] w-full flex-col bg-white section-wrapper my-[180px] font-pressStart '
    >
      {children}
    </section>
  )
}
