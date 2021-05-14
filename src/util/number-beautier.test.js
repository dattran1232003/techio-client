import numberBeauty from './number-beautier'

test('Convert number < 1000', () => {
  let nums = [362, 369, 11, 10, 1, 999, 989]  

  nums.forEach((num) => {
    let numConverted = numberBeauty(num)
    expect(typeof numConverted).toBe('string')
    expect(numConverted).toBe(num+'')
  })
})

test('Number in range 1e4 to 1e6-1', () => {
  let num, numConverted

  num = 4869
  numConverted = numberBeauty(num)
  expect(numConverted).toBe('4.8K')

  num = 1234
  numConverted = numberBeauty(num)
  expect(numConverted).toBe('1.2K')

  num = 9999
  numConverted = numberBeauty(num)
  expect(numConverted).toBe('9.9K')

  num = 120_030
  numConverted = numberBeauty(num)
  expect(numConverted).toBe('120K')

  num = 999_999
  numConverted = numberBeauty(num)
  expect(numConverted).toBe('999.9K')
})

test('Number in range 1e6 to 1e9 - 1', () => {
  let num, converted 

  num = 1_230_265
  converted = numberBeauty(num)
  expect(converted).toBe('1.2M')

  num = 122_230_265
  converted = numberBeauty(num)
  expect(converted).toBe('122.2M')

  num = 999_999_999
  converted = numberBeauty(num)
  expect(converted).toBe('999.9M')
})

test('Number in range 1e9 to Infinity', () => {
  let num, converted

  num = 1_000_000_000
  converted = numberBeauty(num)
  expect(converted).toBe('1B')

  num = 1_543_230_020
  converted = numberBeauty(num)
  expect(converted).toBe('1.5B')
})
