export default function Section({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <section id={id} className='relative flex h-svh max-h-[calc(100svh-96px)] w-full flex-col'>
      {children}
    </section>
  )
}
