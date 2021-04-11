import React from 'react'
import { useForm } from '@util/hooks'
import { UploadAvatar } from '@components'
import { Grid, Form, Button } from 'semantic-ui-react'
import { validateUserRegister, compare2Password } from '@util/validate'

function Register(props) {
  // Defind states
  const [errors, setErrors] = React.useState([])
  const [confirmBoxOpening, setConfirmBoxOpen] = React.useState(false)

  const initValue = { email: '', username: '', password: '', confirmPassword: '' } 
  const { onChange, onSubmit, values: userInputData } = useForm(openAvatarCallback, initValue)


  function openAvatarCallback() { 
    setConfirmBoxOpen(true)
  }

  const listErrors = React.useCallback((err) => {
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
      open={confirmBoxOpening} 
      showErrorUI={listErrors}
      userInputData={userInputData}
      confirmHandler={e => onSubmit(e)}
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
              { Object.values(errors).map(error => <li key={error[0]}>{error[0]}</li>) }
            </ul>
          </div>
        )}
      </Grid.Column>
    </Grid>
  </>)
}


export default Register
