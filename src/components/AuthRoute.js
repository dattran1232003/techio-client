/* eslint react/prop-types: 0 */

import React, { useContext } from 'react'
import { AuthContext } from '@context/auth'
import { Route, Redirect } from 'react-router-dom'
import { PersistPrevLinkContext } from '@context/persistLinkContext'


function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext)
  const { prevLink } = useContext(PersistPrevLinkContext)

  return (
    <Route
      {...rest}
      render={props =>
          user?.username && user?.avatarURL
            ? <Redirect to={prevLink} /> 
            : <Component {...props} />
      }
    />
  )
}

export default AuthRoute
