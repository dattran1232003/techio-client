import { 
  __, 
  not,
  any,
  map, 
  keys, 
  curry, 
  filter, 
  isEmpty, 
  anyPass,
  includes, 
  pipe as flow 
} from 'ramda'

export const compare2Password = ({ password, confirmPassword }) => password === confirmPassword
export const anyRequiredFieldEmpty = curry(
  (requiredField, userInputData) => flow(
      keys,
      filter(includes(__, requiredField)),
      map(reqkey => userInputData[reqkey]),
      any(isEmpty),
  )(userInputData)
)

const twoPasswordNotMatch = flow(compare2Password, not)
const doNotMakeTheseErrors = errors => flow(anyPass([...errors]), not)

export const validateUserLogin = doNotMakeTheseErrors([
  anyRequiredFieldEmpty(['username', 'password'])
])

export const validateUserRegister = doNotMakeTheseErrors([
  twoPasswordNotMatch,
  anyRequiredFieldEmpty(['username', 'email',  'password', 'confirmPassword'])
])
