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

export const useTags = (postPlainTitle='') => {
  const sampleTags = React.useMemo(() => ([
    { tagName: 'Python', used: 74 },
    { tagName: 'Javascript', used: 106 },
    { tagName: 'C#.net', used: 15 },
    { tagName: 'CSS3', used: 43 },
    { tagName: 'ReactJS', used: 105 },
    { tagName: 'HTML5', used: 79 },
    { tagName: 'C++', used: 164 },
  ]), [])

  return sampleTags
}

// graphql queries and mutations
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
      user { username id }
      token
    }
  }
`
