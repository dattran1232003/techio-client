import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useParams, Redirect } from 'react-router-dom'

import { Editor } from '../components' 
import { GET_POST } from '../util/graphql'

const EditPost = props => {
  const { plainTitle } = useParams()
  const { loading, data } = useQuery(GET_POST, {
    variables: { plainTitle },
    fetchPolicy: 'no-cache'
  })

  const { id: postId, title, body, draft } = data?.getPost || {} 
  return !loading && ( 
    data
    ? <Editor oldPostData={{ postId, title, body, draft }} {...props}/>
    : <Redirect to='/not-found' />
  )

}


export default EditPost
