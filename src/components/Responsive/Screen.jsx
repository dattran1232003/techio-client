import { useContext } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveContext } from './context'
import { getDeviceWidth, inRange } from './utils'

Mobile.propTypes = (function propTypes() { 
  // using self-invoking function to avoid create unnecessary global variables
  const ScreenType = PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]) 
  return {
    children: PropTypes.node,
      only: PropTypes.bool,
      andUp: PropTypes.bool,
      andUpTo: ScreenType
  }
})()

Tablet.propTypes = Mobile.propTypes
Laptop.propTypes = Mobile.propTypes

Mobile.defaultProps = { 
  only: false,
  andUp: false,
  andUpTo: null
}
Tablet.defaultProps = Mobile.defaultProps 
Laptop.defaultProps = Mobile.defaultProps

export function Mobile(props) {
  const { children, andUp, andUpTo } = props
  const { deviceWidth } = useContext(ResponsiveContext)

  const mobileWidth = {
    min: 0,
    max: andUp ? Infinity : getDeviceWidth(andUpTo ?? 'mobile')
  }

  const inMobileRange = inRange(mobileWidth.min, mobileWidth.max)
  return inMobileRange(deviceWidth) && children
}

export function Tablet(props) {
  const { children, only, andUp, andUpTo } = props
  const { deviceWidth } = useContext(ResponsiveContext)

  const tabletWidth = {
    min: only ? getDeviceWidth('mobile') + 1 : 0,
    max: andUp ? Infinity : getDeviceWidth(andUpTo ?? 'tablet')
  }

  const inTabletRange = inRange(tabletWidth.min, tabletWidth.max)
  return inTabletRange(deviceWidth) && children
}

export function Laptop(props) {
  const { children, only, andUp, andUpTo } = props
  const { deviceWidth } = useContext(ResponsiveContext)

  const laptopWidth = {
    min: only ? getDeviceWidth('tablet') + 1 : 0,
    max: andUp ? Infinity : getDeviceWidth(andUpTo ?? 'laptop')
  }

  const inLaptopRange = inRange(laptopWidth.min, laptopWidth.max)
  return inLaptopRange(deviceWidth) && children
}

export function Any({ children }) {
  return children
}

Custom.propTypes = {
  ...Mobile.propTypes,
  minWidth: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired
}

function Custom(props) {
  const { minWidth, deviceName, children, only, andUp, andUpTo } = props
  const { deviceWidth } = useContext(ResponsiveContext)
  
  const customWidth = {
    min: only ? getDeviceWidth(minWidth) : 0,
    max: andUp ? Infinity : getDeviceWidth(andUpTo ??  deviceName)
  }

}

