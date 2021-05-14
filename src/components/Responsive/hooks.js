import { useState, useEffect } from 'react'

export function useDeviceWidth() {
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth)

  useEffect(() => {
    const changeWidthScreenCB = () => setDeviceWidth(window.innerWidth)
    window.addEventListener('resize', changeWidthScreenCB)

    return function cleanUp() { 
      window.removeEventListener('resize', changeWidthScreenCB) 
    }
  }, [])

  return deviceWidth
}
