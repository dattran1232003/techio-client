import React from 'react'
import PropTypes from 'prop-types'
import * as Breakpoints from './Screen'
import { useDeviceWidth } from './hooks'
import { ResponsiveContext } from './context'


// export all screen breakpoint (Mobile, Tablet, Laptop,...) with Responsive component
// user can use <Responsive.Mobile /> instead of <Mobile />
// without import { Mobile } from 'responsive'
Object.assign(Responsive, Breakpoints)

Responsive.propTypes = {
  children: PropTypes.node, 
  mobileFirst: PropTypes.bool
}

Responsive.defaultProps = {
  mobileFirst: true
}

export function Responsive(props) {
  const { children, mobileFirst=true } = props
  const childrens = liftIntoList(children)

  const deviceWidth = useDeviceWidth()

  return (
    <ResponsiveContext.Provider value={{ deviceWidth, mobileFirst }}>
      { childrens }
    </ResponsiveContext.Provider>
  ) 
}

const liftIntoList = a => {
  if (Array.isArray(a)) return a
  return [a] // lift it into array
}
