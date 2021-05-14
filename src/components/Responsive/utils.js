const deviceWidthDict = new Map([ // devices srceen width in pixels units
  ['mobileS', 320],
  ['mobileM', 375],
  ['mobile', 425],
  ['tablet', 768],
  ['laptop', 1024],
  ['laptopL', 1440],
  ['4K', 2560],
])

const getDeviceWidthFromDict = deviceName => {
  const deviceWidth = deviceWidthDict.get(deviceName)
  if (!deviceWidth) {
    throw new Error(`Your "${deviceName}" device is not in our devices list. But you can use a number to represent width of "${deviceName}" instead.`)
  }
  return deviceWidth
}

const checkTypeAndConvert = device => {
  switch (typeof device)  {
    case 'string': return getDeviceWidthFromDict(device)
    case 'number': return device
    default: throw new Error(`Type of device must be number or string but receive ${typeof device} instead.`)
  }
}

export const getDeviceWidth = device => {
  return checkTypeAndConvert(device)
}

export const inRange = (start=0, end=Infinity) => val => {
  return (start <= val && val <= end)
}
