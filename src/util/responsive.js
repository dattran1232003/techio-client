import React from 'react'

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window
  return { width, height }
}
const screenWidths = [
  [ 425, "mobile" ],
  [ 768, "tablet" ],
  [ 1024, "laptop" ],
  [ 1440, "laptopL" ],
  [ 2560, "fourK" ]
]

export default function useResponsive(props) {
  const [{ width, height }, setWindowsDimensions] = React.useState(getWindowDimensions())

  React.useEffect(() => {
    function handleResize() {
      setWindowsDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [getWindowDimensions().width, getWindowDimensions().height])

  const currentDevice = () => {
    const [resolution, deviceName] = screenWidths.find(([resolution]) => width <= resolution)
    return [deviceName, resolution]
  }

  const onePercentWidth = () => width / 100
  const onePercentHeight = () => height / 100

  function screenWidthPercent(percent) {
    return onePercentWidth() * percent
  }

  function screenHeightPercent(percent) {
    return onePercentHeight() * percent
  }

  function responsivedWidth(selectors) {
    const [currentDeviceName, currentDeviceResolution] = currentDevice()

    const selector = selectors.find(({ breakpoint, percent }) => { 
      switch(typeof breakpoint){
        case 'string':
          return breakpoint === currentDeviceName 
        case 'number': 
          return breakpoint >= currentDeviceResolution
        default:
          return false
      }
    }) || selectors.slice(-1)[0]

    return screenWidthPercent(selector.percent)   
  }

  return { 
    width, 
    height, 
    responsivedWidth,
    screenWidthPercent, 
    screenHeightPercent,
  }
}

