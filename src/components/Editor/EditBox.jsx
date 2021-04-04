import React from 'react'
import MDEditor from '@uiw/react-md-editor'
import { gql, useMutation } from '@apollo/react-hooks'

import './editBox.scss'

function EditBox(props) {
  const [draggingOver, setDraggingOver] = React.useState(false)

  const [uploadPhoto] = useMutation(UPLOAD_PHOTO_MUTATION, {
    update(_, { data: { uploadPhoto } }) {
      console.log(uploadPhoto)
    },
    onError(e) { console.log(e) }
  })

  function onDragOver(ev) { 
    ev.preventDefault() 
    setDraggingOver(true)
  }
  function onDragLeave(ev) {
    ev.preventDefault()
    setDraggingOver(false)
  }
  
  function onDrop(ev, el) {
    console.log('File(s) dropped')
    ev.preventDefault()
    const files = [...(ev.dataTransfer.items || ev.dataTransfer.files)]
      .map(f => (f?.kind === 'file') ? f.getAsFile() : f)

    files.forEach(photo => {
      uploadPhoto({ variables: { photo } })
    })

    setDraggingOver(true)
  }


  return (
    <div className={ `writting__editbox-container ${draggingOver ? 'image-over' : ''}` }>
      <MDEditor 
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        {...props}
      />
    </div>
  )
}

const UPLOAD_PHOTO_MUTATION = gql`
  mutation UploadPhoto($photo: Upload!) {
    uploadPhoto(photo: $photo) {
      url
    }
  }
`

export default EditBox
