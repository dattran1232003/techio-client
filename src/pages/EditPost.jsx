import React from 'react'
import { AuthContext } from '@context/auth'
import { gql, useQuery } from '@apollo/react-hooks'
import { useParams, Redirect } from 'react-router-dom'

import { Editor } from '@components' 

const EditPost = props => {
  const { plainTitle } = useParams()
  const { user } = React.useContext(AuthContext)
  const { loading, data } = useQuery(GET_POST, {
    variables: { plainTitle },
    fetchPolicy: 'no-cache'
  })

  const { id: postId, username, title, body, draft } = data?.getPost || {} 
  return user.username === username
    ? !loading && ( 
      data
      ? <Editor oldPostData={{ postId, title, body, draft }} {...props}/>
      : <Redirect to='/not-found' />
    )
    : <div style={{ 
      left: 0,
      top: '50%',
      width: '100%', 
      position: 'absolute', 
      transform: 'translateY(-50%)',
      }}>
      <h1 style={{ textAlign: 'center' }}>Bạn không có quyền chỉnh sửa bài viết này.</h1>
    </div>

}

const GET_POST = gql`
  query GetPost($plainTitle: String) {
    getPost(plainTitle: $plainTitle) {
      id plainTitle username body title draft likeCount commentCount createdAt
      likes {
        username
      }
      comments {
        id username body
      }
    }
  }
`

export default EditPost
