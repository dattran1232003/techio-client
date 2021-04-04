import React from 'react'
import { AuthContext } from '@context/auth'
import { Route, Redirect } from 'react-router-dom'

function ProtectedRoute ({ component: Component, ...rest }) {
  const { user } = React.useContext(AuthContext)
  return ( 
    <Route 
      {...rest}
      render={ props => user?.username 
        ? <Component {...props}/>
        : <Redirect to='/login' />
      } 
    />
  ) 
}

export default ProtectedRoute
