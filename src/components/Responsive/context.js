import { createContext } from 'react'

export const ResponsiveContext = createContext({
  deviceWidth: window.innerWidth || 0,
  mobileFirst: true
})
