import { ifElse } from '@util/fp'
import jwtDecode from 'jwt-decode'
import React, { useReducer, createContext } from 'react'

const initialState = (jwtToken => {
  const jwtDecoded = jwtToken ? jwtDecode(jwtToken) : {}
  return {
    user: ifElse(
      (decoded) => decoded?.exp * 1000 <= Date.now(), // check is user expire
      _ => localStorage.removeItem('jwtToken') || {}, // expired, return Nothing
      u => u, // valid, return user
    jwtDecoded)
  }
})(localStorage.getItem('jwtToken'))

const AuthContext = createContext({
  user: {},
  login: _ => {},
  logout: () => {},
  changeAvatar: _ => {},
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
    case 'CHANGE_AVATAR': return {
      ...state,
      user: {
        ...state.user,
        avatarURL: action.payload
      }
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

  function changeAvatar(avatarURL=
    'https://res.cloudinary.com/dd2ryr5fy/image/upload/v1617774801/techio/images/avatars/default-avatar_bxm3wr.png'
  ) {
    dispatch({ type: 'CHANGE_AVATAR', payload: avatarURL })
  }

  return <AuthContext.Provider
    value={{ user: state.user, login, logout, changeAvatar }}
    {...props}
  />
}

export { AuthContext, AuthProvider }

