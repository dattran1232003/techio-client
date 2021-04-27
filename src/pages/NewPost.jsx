import { Redirect } from 'react-router-dom'
import { AuthContext } from '@context/auth'
import { gql, useMutation } from '@apollo/react-hooks'
import React, { useState, useEffect, useContext } from 'react'


const NewPost = () => {
  const [postId, setPostId] = useState('')
  const { user } = useContext(AuthContext)

  const [createNewPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
    update(_, { data: { createPost: { id, plainTitle } } }) {
      setPostId(plainTitle || id)
    },
    onError(e) { console.error(e) },
    variables: { title: 'Title Here', body: '# Title' } 
  })

  useEffect(() => {
    if (user.username) createNewPost()
  }, [])
  
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
      id plainTitle
    }
  }    
`

export default NewPost
