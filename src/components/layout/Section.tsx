export default function Section({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <section id={id} className='relative flex h-svh flex-col'>
      {children}
    </section>
  )
}
