import { useState, useEffect, useRef } from 'react'

interface ScrollPosition {
  y: number
}

const useScroll = (): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    y: 0,
  })
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // @ts-ignore
    scrollContainerRef.current = document.querySelector('.scroll-snap-parent')
  }, [])

  useEffect(() => {
    const handleScroll = (): void => {
      if (scrollContainerRef.current) setScrollPosition({ y: scrollContainerRef.current?.scrollTop })
    }

    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('scroll', handleScroll)
    }

    return (): void => {
      if (scrollContainerRef.current) scrollContainerRef.current.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return scrollPosition
}

export default useScroll
