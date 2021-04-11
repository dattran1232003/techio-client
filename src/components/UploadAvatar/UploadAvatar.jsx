import React from 'react'
import './UploadAvatar.scss'
import { Icon, Portal, Button } from 'semantic-ui-react'

import AvatarUploader from './AvatarUploader'

const imageReducer = (image, action) => {
  switch (action.type) {
    case 'DELETE_AVATAR':
      return { ...image, src: null }
    case 'CHANGE_SRC':
      return { ...image, src: action.payload.src }
    case 'CHANGE_CROP':
      return { ...image, crop: action.payload.crop }
    case 'IMAGE_CROPPED':
      return {...image, previewImage: action.payload.previewImage }
    default:
      return image
  }
}

function UploadAvatar(props) {
  // useState
  const [acceptImage, setAcceptImage] = React.useState(false)
  // useRef
  const inputRef = React.useRef(null)

  // useReducer
  const [image, dispatchImage] = React.useReducer(imageReducer, {
    src: null,
    previewImage: null,
    crop: { unit: '%', width: 100,  aspect: 1 / 1 }
  })

  // envent handlers
  function openFilesBrowser(_) {
    inputRef.current.click()
  }

  function onImageChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => dispatchImage({ 
        type: 'CHANGE_SRC', payload: { src: reader.result } 
      }))
      reader.readAsDataURL(e.target.files[0])
    }
  }

  
  return (
    <Portal 
      open={props.open}
      onClose={e => {
        setAcceptImage(false)      
        props.cancelHandler(e)
      }}
      closeOnEscape closeOnTriggerMouseLeave
    >
      <div className="popup popup__container popup__container--focus">
        <div className="popup popup__header popup__header--container">
          { !image.src
            ? (
              <h3 className="popup popup__header popup__header__text  popup__header__text--inline">
                Bạn có muốn tải lên ảnh đại diện?</h3>
            )              
            : <>
              <h3 className="popup popup__header popup__header__text">
                Điều chỉnh đến khi bạn thấy vừa ý.</h3>
              <div className="popup popup__header popup__header__button">
                <Button onClick={openFilesBrowser} basic color='red'>Đổi ảnh khác</Button>
              </div>
            </>
          }
        </div>


        { !image.src 
          ? (
            <div className="popup popup__placeholder--container">
              <div className='popup popup__placeholder popup__placeholder__editor'
                onClick={openFilesBrowser}
              >
                <Icon name='cloud upload' size='massive' />
                <p>Nhấn vào đây để chọn hoặc kéo/thả ảnh vào đây</p>
              </div>

              <div className="popup popup__placeholder popup__placeholder__previewer">
                <div className="popup popup__placeholder--square"></div>
              </div>
            </div>
          )

          : (
            <AvatarUploader
              {...props}
              image={image}
              acceptImage={acceptImage}
              changeImage={dispatchImage}
              cancelHandler={props.cancelHandler}
            />
          )
        }

        <input type='file' accept='image/jpeg, image/png'
          ref={inputRef} 
          onChange={onImageChange} 
          style={{display: 'none'}} 
        />
      </div>
    </Portal>
  )
}

export default UploadAvatar
