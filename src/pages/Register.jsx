import React from 'react'
import { useForm } from '@util/hooks'
import { useRegister } from '@util/hooks'
import { UploadAvatar } from '@components'
import { AuthContext } from '@context/auth'
import { Grid, Form, Button } from 'semantic-ui-react'
import { validateUserRegister, compare2Password } from '@util/validate'

function Register(props) {
  const { login } = React.useContext(AuthContext)

  // Defind states
  const [errors, setErrors] = React.useState([])
  const [confirmBoxOpening, setConfirmBoxOpen] = React.useState(false)

  const initValue = { email: '', username: '', password: '', confirmPassword: '' } 
  const { onChange, onSubmit, values: userInputData } = useForm(registerCallback, initValue)

  // useCustomHook
  const { registerUserToServer } = useRegister({
    successCallback(userData) {
      login(userData)      
      setConfirmBoxOpen(true)
    },
    errorCallback(e) {
      console.error(e)
      showErrorUI(e)
    }
  })

  function registerCallback() { 
    registerUserToServer(userInputData)
  }

  const showErrorUI = React.useCallback((err) => {
    console.error(err)
    setErrors(
      err?.graphQLErrors[0]?.extensions?.exception?.errors ||
      err?.graphQLErrors[0]?.extensions?.errors || []
    )
  })

  const [isPasswordMatch, notValidUserInput] = React.useMemo(() => 
    ([compare2Password(userInputData), !validateUserRegister(userInputData) ]), 
    [...Object.values(userInputData)]
  )

  return (<>
    <UploadAvatar 
      {...props}
      open={confirmBoxOpening} 
      confirmHandler={onSubmit}
      userInputData={userInputData}
      cancelHandler={setConfirmBoxOpen.bind(null, false)} 
    />

    <Grid style={{ height:'calc(100vh - 5rem)' }} verticalAlign='middle'>
      <Grid.Column className='form-container'>
        <Form noValidate onSubmit={onSubmit}>
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
              { Object.values(errors).map((error, i) => <li key={i}>{error[0]}</li>) }
            </ul>
          </div>
        )}
      </Grid.Column>
    </Grid>
  </>)
}


export default Register
