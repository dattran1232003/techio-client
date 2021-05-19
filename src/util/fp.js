import { 
  isNil,
  ifElse,
  complement,
} from 'ramda'

const Just = v => ({
  map:     fn => Just(fn(v)),
  flatMap: fn => fn(v),
  inspect: _  => `Just(${v})`,
  unwrap:  _  => v,
}) 

const Nothing = _ => ({
  map:     _ => Nothing(),
  flatMap: _ => Nothing(),
  inspect: _ => `Nothing`,
  unwrap:  _ => null 
})

export const isNotNil = complement(isNil)

const maybeOf = {
  of: ifElse(isNotNil, Just, Nothing),
  Just: Just,
  Nothing: Nothing
}

export { maybeOf as Maybe }


export const TypeBox = (predicate, defaultValue) => {
  const TypePredicate = v => ({
    map: fn => TypePredicate(predicate(v) ? fn(v) : defaultValue),
    unwrap: _ => v
  })

  return TypePredicate
}
