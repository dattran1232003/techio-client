const flow = (...fns) => args => fns.reduce((v, fn) => fn(v), args)
const devideFor = divisor => devidend => devidend / divisor
const toString = num => num.toString()
const addCharToEnd = char => n => n + char
const floorTo = nthDec => num => Math.floor(num * (nthDec * 10)) / (nthDec * 10) 
const floorToFirstDecimal = floorTo(1)

const ifInRange = (start=0, end=Infinity) => ({
  do: (cb) => val => {
    if (start <= val && val <= end) return cb(val)
    return val // return val if out range
  }
})

const hundreds = ifInRange(0, 1_000-1).do(toString)

const thousands = ifInRange(1_000, 1_000_000-1)
  .do(flow(devideFor(1_000), floorToFirstDecimal, addCharToEnd('K')))


const million = ifInRange(1_000_000, 1e9 - 1) // 1 billion - 1 = 999M
  .do(flow(devideFor(1e6), floorToFirstDecimal, addCharToEnd('M')))

const billion = ifInRange(1e9)
  .do(flow(devideFor(1e9), floorToFirstDecimal, addCharToEnd('B')))

export default function numberBeauty(number) {
  if (typeof number !== 'number') return Error('numberBeauty: except number only, received: ' + typeof number)
  
  let mainFlow = flow(hundreds, thousands, million, billion)

  return mainFlow(number)
}
