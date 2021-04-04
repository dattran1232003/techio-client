import { curryN } from 'ramda'

export function Just(v) {
  return {
    map(fn) { return Just(fn(v)) },
    flatMap(fn) { return fn(v) },
    unwrap() { return v }
  }
} 

export function Nothing() {
  return {
    map() { return Nothing() },
    flatMap() { return Nothing() },
    unwrap() { return null }
  }
}

export const getProp = curryN(2, function(propName, obj) {
  return obj[propName] ? Just(obj[propName]) : Nothing()  
})

export * from 'ramda'
