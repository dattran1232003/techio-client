import { Redirect } from 'react-router-dom'
import { gql, useMutation } from '@apollo/react-hooks'
import React, { useState, useEffect, useContext } from 'react'

import { AuthContext } from '../context/auth'

const NewPost = () => {
  const [postId, setPostId] = useState('')
  const { user } = useContext(AuthContext)

  const [createNewPost, { loading, data }] = useMutation(CREATE_POST_MUTATION, {
    onError(e) { console.error(e) },
    variables: { title: 'Title Here', body: '# Title' } 
  })

  useEffect(() => {
    if (user.username) createNewPost()
  }, [])

  const id = data?.createPost?.id
  useEffect(() => {
    id && setPostId(id)
  }, [id])
  
  return <>
    {!loading && (
      user.username
        ? postId !== '' && <Redirect to={`/posts/${postId}/edit`}/> 
        : <Redirect to='/login' />
    )}
    </>
}

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($body: String!) {
    createPost(body: $body) {
      id
    }
  }    
`

export default NewPost
