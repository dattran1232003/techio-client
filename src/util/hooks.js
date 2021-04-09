import React from 'react'

export const useForm = (cb, initState={}) => {
  const [values, setValues] = React.useState(initState)

  const onChange = event => 
    setValues({ ...values, [event.target.name]: event.target.value })
  
  const onSubmit = event => {
    console.log('submited')
    event.preventDefault()
    cb()
  }
  
  return {
    onChange, onSubmit, values
 }
}
