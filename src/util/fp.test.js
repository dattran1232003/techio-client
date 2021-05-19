import { Maybe, TypeBox } from './fp'
import { __, add, either, props, divide, type, concat, replace } from 'ramda'


const isNumber = value => type(value) === 'Number' 
const isString = value => type(value) === 'String'

describe('Maybe Monad', () => {
  it('should .inspect() method return either just or nothing', () => {
    const nullableMonad = Maybe.of(null)
    const notNullMonad  = Maybe.of('dat dep trai') 

    expect(nullableMonad.inspect()).toBe('Nothing')
    expect(notNullMonad.inspect()).toMatch('Just')
  })

  it('should chainable', () => {
    /* 
      * using map with normal function.
      * using flatMap with function should return Monad. 
    */

    // normal function
    const double = x => x * 2
    // should return Monad function
    const square = x => Maybe.of(x * x)
    const half   = x => Maybe.of(x % 2 !== 0 ? null : x / 2)
    
    const number1 = Maybe.of(12)
      .map(double)      // 24
      .flatMap(square)  // 576
      .flatMap(half)    // 288
   
    expect(number1.inspect()).toMatch('Just')
    expect(number1.unwrap()).toBe(288)

    const number2 = Maybe.of(423)
      .flatMap(square)  // 178929
      .flatMap(half)    // Nothing
      .map(double)      // Nothing

    expect(number2.inspect()).toBe('Nothing')
    expect(number2.unwrap()).toBeNull()
  })
})

describe('TypeBox', () => {
  test('NumberBox', () => {
    const NumberBox = TypeBox(isNumber, NaN)

    const number1 = NumberBox(5)
      .map(v => v * 2)
      .map(v => v + 1)

    expect(number1.unwrap()).toBe(11)

    const number2 = NumberBox({ v: 5 })
      .map(v => v * 2)
      .map(v => v + 1)

    expect(number2.unwrap()).toBeNaN()
  })

  test('StringBox', () => {
    const StringBox = TypeBox(isString, null)
    
    const string1 = StringBox('Loan')
      .map(concat(__, ' rat dep trai'))
      .map(replace('Loan', 'Dat'))

    expect(string1.unwrap()).toBe('Dat rat dep trai')

    const string2 = StringBox(1)
      .map(concat(__, '2'))
    
    expect(string2.unwrap()).toBeNull()
  })

  test('Multi Types', () => {
    const isStringOrNumber = either(isString, isNumber)

    const MultiTypesBox = TypeBox(isStringOrNumber, null)

    const case1 = MultiTypesBox(2)
      .map(add(2))
      .map(String)
      .map(concat(__, '3'))

    expect(case1.unwrap()).toBe('43')

    const case2 = MultiTypesBox('6')
      .map(Number)
      .map(add(24))
      .map(divide(__, 2))

    expect(case2.unwrap()).toBe(15)

    const case3 = MultiTypesBox({ v: 156 })
      .map(add(35))
      .map(divide(100))

    expect(case3.unwrap()).toBeNull()

    const case4 = MultiTypesBox({ v: 156 })
      .map(props('v')) // even I get the value, it also return null
      .map(add(35))
      .map(divide(100))

    expect(case4.unwrap()).toBeNull()

  })
})
