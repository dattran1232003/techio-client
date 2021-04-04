import jwtDecode from 'jwt-decode'
import { ifElse, Just, Nothing } from '../util/fp'
import React, { useReducer, createContext } from 'react'

const initialState = ((jwtToken) => {
  const jwtDecoded = jwtToken && jwtDecode(jwtToken) 
    ? Just(jwtDecode(jwtToken)) 
    : Nothing()
  return {
    user: jwtDecoded
    .map(ifElse(
      u => u.exp * 1000 < Date.now(), // check is user expire
      _ => Nothing(localStorage.removeItem('jwtToken')), // expired, return Nothing
      u => Just(u) // valid, return user
    ))
  }
})(localStorage.getItem('jwtToken'))

const AuthContext = createContext({
  user: {},
  login: userData => {},
  logout: () => {}
})

function authReducer(state, action) {
  switch(action.type) {
    case 'LOGIN': return {
      ...state,
      user: Just(action.payload)
    }
    case 'LOGOUT': return {
      user: Nothing()
    }
    default:
      return state
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  function login(userData) {
    localStorage.setItem('jwtToken', userData.token)
    dispatch({
      type: 'LOGIN',
      payload: userData
    })
  }

  function logout() {
    localStorage.removeItem('jwtToken')
    dispatch({ type: 'LOGOUT' })
  }

  return <AuthContext.Provider
    value={{ user: state.user.unwrap(), login, logout }}
    {...props}
  />
}

export { AuthContext, AuthProvider }

