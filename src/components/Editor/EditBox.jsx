import React from 'react'
import PropTypes from 'prop-types'
import Markdown from 'react-markdown'
import { Resizable } from 're-resizable'
import { gql, useMutation } from '@apollo/react-hooks'
import { Controlled as CodeMirror }from 'react-codemirror2'

import './editBox.scss'
import 'codemirror/lib/codemirror.css'

EditBox.propsType = {
  value: PropTypes.string,
  onChange: PropTypes.func,
}

function EditBox(props) {
  const [draggingOver, setDraggingOver] = React.useState(false)
  const previewerRef = React.useRef(null)

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
  function onDrop(ev) {
    console.log('File(s) dropped')
    ev.preventDefault()
    const files = [...(ev.dataTransfer.items || ev.dataTransfer.files)]
      .map(f => (f?.kind === 'file') ? f.getAsFile() : f)

    files.forEach(photo => {
      uploadPhoto({ variables: { photo } })
    })

    setDraggingOver(true)
  }

  function onChange(_, __, body) {
    props.onChange(body)
  }

  function onEditorScroll(_, data) {
      const { height, clientHeight, top } = data
      const calScrollPercent = percentOf(height - clientHeight)
      scrollVerticalByPercent(calScrollPercent(top), previewerRef.current)
  }

  const codeMirrorOptions = {
    mode: 'markdown',
    lineWrapping: true
  }

  return (
    <Resizable className='resizer' minWidth='100%' maxWidth='100%' defaultSize={{ height: 300 }}>
      <div className={ `writting__editbox-container ${draggingOver ? 'image-over' : ''}` }>
        <div className="writting writting__editbox-child writting__editbox__editor"
          {...{onDragOver, onDrop, onDragLeave}}
        >
          <CodeMirror
            value={props.value} 
            onScroll={onEditorScroll}
            options={codeMirrorOptions} 
            onBeforeChange={onChange} 
          />
        </div>

        <div className="writting writting__editbox-child writting__editbox__previewer"
          ref={previewerRef}
        >
          <Markdown>{breakLineMD(props.value)}</Markdown>
        </div>
      </div>
    </Resizable>
  )
}

const percentOf = base => num => num * 100 / base
const breakLineMD = str => str.replace(/\n/g, '  \n')

const scrollVerticalByPercent = (percent, elm) => {
  if (percent < 100) {
    const { scrollHeight, clientHeight } = elm
    const scrollYpos = (scrollHeight - clientHeight) / 100 * percent
    elm.scroll(0, scrollYpos)
  } else {
    return 
  }
}

const UPLOAD_PHOTO_MUTATION = gql`
mutation UploadPhoto($photo: Upload!) {
  uploadPhoto(photo: $photo) {
    url
  }
}
`

export default EditBox
