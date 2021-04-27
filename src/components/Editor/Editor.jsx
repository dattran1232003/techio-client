import './Editor.scss'
import EditBox from './EditBox'
import { Input, Button } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/react-hooks'
import React, { useState, useCallback, useEffect, useReducer } from 'react'


const Editor = ({ oldPostData, history }) => {
  const [isDraft, setIsDraft] = useState(oldPostData.draft)
  const [postData, dispatch] = useReducer(
    postDataReducer, 
    { title: '', body: '', ...oldPostData }
  )

  function postDataReducer(state, { type, payload }) {
    switch (type) {
      case 'changeTitle': 
        return { ...state, title: payload }
      case 'changeBody': 
        return { ...state, body: payload }
      default: return state
    }
  }

  const [editPost, { loading, data }] = useMutation(EDIT_POST_MUTATION, {
    update(_, { data: { editPost: post } }) {
      history.push(`/posts/${post.plainTitle}`)
    }
  })

  const onTitleChange  = useCallback((_, { value: title }) => 
    dispatch({ type: 'changeTitle', payload: title }), [])

  const onEditorChange = useCallback(body => {
    dispatch({ type: 'changeBody', payload: body }) 
  }, [])
  

  const editPostCallback = ({ postId, title, body }, { draft }) => e => {
    e.preventDefault()
    setIsDraft(draft)
    editPost({ variables: { postId, title, body, draft }})
  }

  useEffect(() => {
    data?.editPost?.draft !== undefined && setIsDraft(data?.editPost?.draft)
  }, [data?.editPost?.draft])

  const isRequiredFieldsEmpty = !postData.title || !postData.body

  return ( !loading &&
    <div className='writting writting__container'>
      <Input className='writting writting__text-box writting__title' 
        value={postData.title} onChange={onTitleChange}
        placeholder='Tiêu đề bài viết...'/>      

      <EditBox value={postData.body} onChange={onEditorChange} />

      <div className='writting writting__btn-container'>
        { isDraft === true
          ? ( 
            <Button.Group disabled>
              <Button
                disabled={isRequiredFieldsEmpty}
                onClick={editPostCallback(postData, { draft: true })} 
              >Lưu nháp</Button>
              <Button.Or />
              <Button color='teal'
                disabled={isRequiredFieldsEmpty}
                onClick={editPostCallback(postData, { draft: false })}  
              >Đăng bài</Button>
            </Button.Group>
          ) : (
              <Button color='teal'
                disabled={isRequiredFieldsEmpty}
                onClick={editPostCallback(postData, { draft: false })}  
              >Chỉnh sửa</Button>
          )
        }
      </div>
    </div>
  )
}


const EDIT_POST_MUTATION = gql`
  mutation EditPost($postId: ID!, $title: String, $body: String, $draft: Boolean!) {
    editPost(editPostInput: { postId: $postId, title: $title, body: $body, draft: $draft }) {
      id body title plainTitle
    }
  }
`

export default Editor

