import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import './App.scss'
import { BrowserRouter as Router,
Route,
Switch,
Redirect } from 'react-router-dom'

import { MenuBar,
AuthRoute } from './components'

import { AuthProvider } from './context/auth'
import { PersistPrevLinkProvider } from './context/persistLinkContext'

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

const App = () => {
  return (<>
    <PersistPrevLinkProvider>
      <AuthProvider>
        <Router>
          <MenuBar />
          <div className='ui container'>
            <Switch>
              <Route exact path='/' render={() =><Redirect to='/posts' />} />
              <Route exact path='/posts' component={Home} />
              <Route exact path='/posts/new' component={NewPost} />
              <Route exact path='/posts/:plainTitle' component={SinglePost} />
              <Route exact path='/posts/:plainTitle/edit' component={EditPost} />
              <AuthRoute exact path='/login' component={Login} />
              <AuthRoute exact path='/register' component={Register} />
              <Route exact path='/*' component={NotFound}/>
            </Switch>
          </div>
        </Router>
      </AuthProvider>
    </PersistPrevLinkProvider>
  </>
  )
}

export default App
