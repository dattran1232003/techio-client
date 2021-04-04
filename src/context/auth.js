import { ifElse } from '@util/fp'
import jwtDecode from 'jwt-decode'
import React, { useReducer, createContext } from 'react'

const initialState = (jwtToken => {
  const jwtDecoded = !!jwtToken && jwtDecode(jwtToken) || {}
  return {
    user: ifElse(
      ({ exp }) => exp * 1000 <= Date.now(), // check is user expire
      _ => localStorage.removeItem('jwtToken') || {}, // expired, return Nothing
      u => u, // valid, return user
    jwtDecoded)
  }
})(localStorage.getItem('jwtToken'))

const AuthContext = createContext({
  user: {},
  login: _ => {},
  logout: () => {}
})

function authReducer(state, action) {
  switch(action.type) {
    case 'LOGIN': return {
      ...state,
      user: action.payload
    }
    case 'LOGOUT': return {
      user: {}
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
    value={{ user: state.user, login, logout }}
    {...props}
  />
}

export { AuthContext, AuthProvider }

