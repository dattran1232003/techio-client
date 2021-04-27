import { useEffect, useState } from 'react'

function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth, 
    height: window.innerHeight
  })

  useEffect(() => {
    const resizeHandle = () => setWindowSize({
      width: window.innerWidth, 
      height: window.innerHeight
    })

    window.addEventListener('resize', resizeHandle)
    return function cleanUp() { 
      window.removeEventListener('resize', resizeHandle) 
    }
  }, [])

  return windowSize
}

export default useResponsive
