import { useState, useEffect, use } from 'react'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  const [location, setLocation] = useState('')

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 786)
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setLocation(window.location.origin)
  }, [])

  return isMobile
}

export default useIsMobile
