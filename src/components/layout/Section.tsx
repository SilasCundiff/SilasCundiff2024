export default function Section({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <section
      id={id}
      className='scroll-snap-child relative flex h-svh max-h-svh w-full flex-col bg-transparent font-pressStart'
    >
      {children}
    </section>
  )
}
