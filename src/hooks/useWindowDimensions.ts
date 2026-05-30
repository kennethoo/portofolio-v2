import { useEffect, useState } from 'react'

function getWindowDimensions() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

export function useWindowDimensions() {
  const [dimensions, setDimensions] = useState(getWindowDimensions)

  useEffect(() => {
    function handleResize() {
      setDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return dimensions
}
