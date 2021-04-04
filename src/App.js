import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { AuthProvider } from '@context/auth'
import { MenuBar, AuthRoute, ProtectRoute } from '@components'
import { PersistPrevLinkProvider } from '@context/persistLinkContext'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import './App.scss'


// Pages
import { 
  Home,
  Register,
  Login,
  NewPost,
  EditPost,
  SinglePost,
  NotFound 
} from './pages/index'

function App() {
  return (<>
    <PersistPrevLinkProvider>
      <AuthProvider>
        <Router>
          <MenuBar />
          <div className='ui container'>
            <Switch>
              <Route exact path='/' render={() =><Redirect to='/posts' />} />
              <Route exact path='/posts' component={Home} />
              <ProtectRoute exact path='/posts/new' component={NewPost} />
              <ProtectRoute exact path='/posts/:plainTitle' component={SinglePost} />
              <ProtectRoute exact path='/posts/:plainTitle/edit' component={EditPost} />
              <AuthRoute exact path='/login' component={Login} />
              <AuthRoute exact path='/register' component={Register} />
              <Route exact path='*' component={NotFound}/>
            </Switch>
          </div>
        </Router>
      </AuthProvider>
    </PersistPrevLinkProvider>
  </>
  )
}

export default App
