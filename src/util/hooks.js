import React from 'react'
import { gql, useMutation } from '@apollo/react-hooks'

export const useForm = (cb, initState={}) => {
  const [values, setValues] = React.useState(initState)

  const onChange = event => 
    setValues({ ...values, [event.target.name]: event.target.value })
  
  const onSubmit = event => {
    console.log(cb)
    event.preventDefault()
    cb()
  }
  
  return {
    onChange, onSubmit, values
 }
}

export const useRegister = ({ successCallback, errorCallback }) => {
  const [userData, setUserData] = React.useState({})

  const [registerUser, { loading }] = useMutation(REGISTER_MUTATION, {
    update(_, { data: { register: userData } }) {
      setUserData(userData)
      successCallback(userData)
    },
    onError(err) {
      errorCallback(err)
    },
  })

  function trigger({ email, username, password, avatarURL, confirmPassword }) {
    registerUser({
      variables: { 
          email, username, password, avatarURL, confirmPassword 
      }  
    })
  }
  return { userData, registerUserToServer: trigger, loading }
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
