import React from 'react'
import { useForm } from '@util/hooks'
import { UploadAvatar } from '@components'
import { AuthContext } from '@context/auth'
import { Grid, Form, Button } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/react-hooks'
import { PersistPrevLinkContext } from '@context/persistLinkContext'
import { validateUserRegister, compare2Password } from '@util/validate'

function Register(props) {
  // Defind contexts
  const { login } = React.useContext(AuthContext)
  const { prevLink } = React.useContext(PersistPrevLinkContext) 
  // Defind states
  const [errors, setErrors] = React.useState([])
  const [confirmBoxOpening, setConfirmBoxOpen] = React.useState(false)

  const initValue = { email: '', username: '', password: '', confirmPassword: '' } 
  const { onChange, onSubmit, values: userInputData } = useForm(registerCallback, initValue)

  const [registerUser, { loading }] = useMutation(REGISTER_MUTATION, {
    update(_, { data: { register: userData } }) {
      login(userData)
      setConfirmBoxOpen(true)
    },
    onError(err) {
      console.error(err)
      setErrors(
        err?.graphQLErrors[0]?.extensions?.exception?.errors ||
        err?.graphQLErrors[0]?.extensions?.errors || []
      )
    },
  })

  function registerCallback() { 
    const { email, username, password, confirmPassword } = userInputData
    registerUser({
      variables: {
        email, username, password, confirmPassword
      },     }) 
  }

  const isPasswordMatch = compare2Password(userInputData)
  const notValidUserInput = !validateUserRegister(userInputData)
  return (<>
    <UploadAvatar 
      open={confirmBoxOpening} 
      confirmHandler={e => onSubmit(e)}
      cancelHandler={setConfirmBoxOpen.bind(null, false)} 
    />

    <Grid style={{ height:'calc(100vh - 5rem)' }} verticalAlign='middle'>
      <Grid.Column className='form-container'>
        <Form noValidate loading={loading} onSubmit={onSubmit}>
          <h1>Đăng ký</h1>
          <Form.Input required
            name='username' label='Username' placeholder='Tên đăng nhập...'
            value={userInputData.username} error={!!errors.username}
            onChange={onChange}
          />

          <Form.Input type='email' required
            name='email' label='Email' placeholder='Email...'
            value={userInputData.email} error={!!errors.email}
            onChange={onChange}
          />

          <Form.Input type='password' required
            name='password' label='Password' placeholder='Mật khẩu...'
            value={userInputData.password} error={!!errors.password}
            onChange={onChange}
          />

          <Form.Input type='password' required
            name='confirmPassword' label='Confirm password' placeholder='Nhập lại mật khẩu...'
            value={userInputData.confirmPassword} error={
              !!errors.confirmPassword || !isPasswordMatch
            }
            onChange={onChange}
          />

          <Button primary type='submit' 
            disabled={ confirmBoxOpening || notValidUserInput } 
          >Đăng ký</Button>
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
  </>)
}

const REGISTER_MUTATION = gql`
  mutation Register(
    $email: String!
    $avatarURL: String
    $username: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(registerInput: { 
      email: $email
      avatarURL: $avatarURL
      username: $username
      password: $password
      confirmPassword: $confirmPassword
    }) {
      id token username 
    }
  }
`

export default Register
