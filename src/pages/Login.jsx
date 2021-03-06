import { validateUserLogin } from '@util/validate'
import React, { useState, useContext } from 'react'
import { gql, useMutation } from '@apollo/react-hooks'
import { Form, Button, Grid } from 'semantic-ui-react'

// Context
import { useForm } from '@util/hooks'
import { AuthContext } from '@context/auth'

function Login(props) {
  // Use Context
  const { login } = useContext(AuthContext)

  const [errors, setErrors] = useState([])
  const initValue = { username: '', password: '' } 
  const { onChange, onSubmit, values: userInputData } = useForm(loginUserCallback, initValue)
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      login(userData)
      props.history.push('/posts')
    },
    onError(err) {
      setErrors(
        err?.graphQLErrors[0]?.extensions?.exception?.errors ||
        err?.graphQLErrors[0]?.extensions?.errors || []
      )
    },
    variables: { 
      username: userInputData.username, 
      password: userInputData.password 
    }
  })

  function loginUserCallback() { loginUser() }

  const notValidUserInput = !validateUserLogin(userInputData)

  return (
    <Grid style={{ height:'calc(100vh - 5rem)' }} verticalAlign='middle'>
      <Grid.Column className='form-container'>
        <Form onSubmit={onSubmit} noValidate loading={loading}>
          <h1>Login</h1>
          <Form.Input 
            name='username' label='Username' placeholder='Tên đăng nhập...'
            value={userInputData.username} error={!!errors.username}
            onChange={onChange}
          />

          <Form.Input type='password'
            name='password' label='Password' placeholder='Mật khẩu...'
            value={userInputData.password} error={!!errors.password}
            onChange={onChange}
          />

          <Button type='submit' disabled={notValidUserInput} primary>Đăng nhập</Button>
        </Form>

        { Object.keys(errors).length > 0  && (
          <div className="ui error message">
            <ul className="list">
              { Object.values(errors).map(error => <li key={error[0]}>{error[0]}</li>) }
            </ul>
          </div>
        )}
      </Grid.Column>
    </Grid>
  )
}

const LOGIN_USER = gql`
mutation Login($username: String, $password: String) {
  login(username: $username, password: $password) {
    user { id username email createdAt avatarURL }
    token 
  }
}
`

export default Login
