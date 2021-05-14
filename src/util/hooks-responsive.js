import React, { useEffect, useState } from 'react'

const deviceWidthList = new Map([ // devices srceen width in pixels units
  ['mobileS', 320],
  ['mobileM', 375],
  ['mobile', 425],
  ['tablet', 768],
  ['laptop', 1024],
  ['laptopL', 1440],
  ['4K', 2560],
])

const flow = (...funcs) => args => funcs.reduce((v, f) => f(v), args)

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
    return function cleanUp() { window.removeEventListener('resize', resizeHandle) }
  }, [])

  function getDeviceWidth(deviceName) {
    const deviceWidth =  deviceWidthList.get(deviceName)
    if (!deviceWidth) throw new Error(
      `${deviceName} is not in our devices list, but you can provide a number represent device width instead.`
    )

    return deviceWidth
  }

  function checkAndGetDeviceWidth(device) {
    switch (typeof device) {
      case 'string': return getDeviceWidth(device)
      case 'number': return device // device now is device width (px unit)
      default: 
        throw new Error(`Type of device must be string or number but got ${typeof device}.`)
    }
  }

  const smallerThanWindowWidth = mobileFirst => deviceWidth => {
    if (mobileFirst)  return windowSize.width >= deviceWidth
    else              return windowSize.width >  deviceWidth
  }

  const renderComponent = isAllowRender => Component => {
    if (isAllowRender)  return Component
    else                return <span className='responsive-placeholder' />
  }
    

  // export functions
  function renderWhen(device, options) {
    const checkDeviceWidth = flow(getDeviceWidth, smallerThanWindowWidth(options?.mobileFirst || true))
    const deviceWidthSmallerThanWindowWidth = checkDeviceWidth(device)
    const deviceWidthLargerThanWindowWidth  = !deviceWidthSmallerThanWindowWidth

    return [ // function []
      renderComponent(deviceWidthLargerThanWindowWidth),
      renderComponent(deviceWidthSmallerThanWindowWidth)
    ]
  }

  return { windowSize, renderWhen }
}

export default useResponsive
