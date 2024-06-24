import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export default function Section({
  children,
  id,
  setSectionInView,
}: {
  children: React.ReactNode
  id: string

  setSectionInView: React.Dispatch<React.SetStateAction<string>>
}) {
  const { ref, inView, entry } = useInView({
    threshold: 0.5,
  })

  useEffect(() => {
    if (inView) {
      setSectionInView(entry!.target.id)
    }
  }, [inView, entry, setSectionInView])

  return (
    <section ref={ref} id={id} className='relative flex min-h-[100svh] w-full flex-col font-pressStart '>
      {children}
    </section>
  )
}
