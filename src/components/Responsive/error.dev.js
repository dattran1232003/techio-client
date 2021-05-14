const throwError = errString => { throw new Error(`Responsive: `+ errString) }


const minGreaterThanOrEqMax = (deviceName, { deviceMinWidth, deviceMaxWidth, fromScreen }) => {
  if (deviceMinWidth + 1 >= deviceMaxWidth)
  throwError(`your ${fromScreen} width cannot be greater than or equal ${deviceName} width (${deviceMaxWidth}px)`)
}

export default (deviceName, opts) => {
  minGreaterThanOrEqMax(deviceName, opts)
}
