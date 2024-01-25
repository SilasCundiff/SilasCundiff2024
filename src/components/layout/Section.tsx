export default function Section({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <section id={id} className='relative flex h-svh w-full flex-col'>
      {children}
    </section>
  )
}
