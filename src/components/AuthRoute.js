/* eslint react/prop-types: 0 */

import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { AuthContext } from '../context/auth'
import { PersistPrevLinkContext } from '../context/persistLinkContext'

function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext)
  const { prevLink } = useContext(PersistPrevLinkContext)

  return (
    <Route
      {...rest}
      render={props =>
          user?.username
            ? <Redirect to={prevLink} /> 
            : <Component {...props} />
      }
    />
  )
}

export default AuthRoute
