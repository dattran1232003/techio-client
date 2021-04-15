import React from 'react'
import './AvatarUploader.scss'
import ReactCrop from 'react-image-crop'
import { Button } from 'semantic-ui-react'
import { AuthContext } from '@context/auth'
import 'react-image-crop/lib/ReactCrop.scss'
import { gql, useMutation } from '@apollo/react-hooks'

export default function AvatarUploader({ image, history, changeImage, cancelHandler }) {
  // use ref
  const imageRef = React.useRef(null)
  const previewCanvasRef = React.useRef(null)

  // defind context
  const { changeAvatar } = React.useContext(AuthContext)

  // defind state
  const [completedCrop, setCompletedCrop] = React.useState(null)


  // Server communications
  const [uploadAvatarToServer] = useMutation(UPLOAD_AVATAR_MUTATION, {
    update(_, { data: { uploadAvatar: { url: avatarURL } } }) {
      changeAvatar(avatarURL)
      history.push('/posts')
    }, 
    onError(e) { console.error(e) }
  })

  function uploadImage() {
    generateUpload(previewCanvasRef.current, completedCrop)
  }

  React.useEffect(() => {
    if(!completedCrop || !previewCanvasRef.current || !imageRef.current) 
      return

    const crop = completedCrop
    const image = imageRef.current
    const canvas = previewCanvasRef.current

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const ctx = canvas.getContext('2d')
    const pixelRatio = window.devicePixelRatio

    canvas.width = crop.width * pixelRatio
    canvas.height = crop.height * pixelRatio

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.imageSmoothingQuality = 'high'

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )
  }, [completedCrop])

  // event handler functions
  const loadImageToRef = React.useCallback(image => {
    imageRef.current = image
  }, [])

  function onCropChange(crop) {
    changeImage({ type: 'CHANGE_CROP', payload: { crop } })
  }

  function generateUpload(canvas, crop) {
    if(!crop || !canvas) return

    canvas.toBlob(blob => {
      const avatar = new File([blob], 'avatar.png', {  type: 'image/png' })
      uploadAvatarToServer({ variables: { avatar } }) 
    }, 'image/png')
  }

  return (<>
    <div className='avatar avatar__uploader'>
      <div className='avatar avatar__editor'>
        { image.src &&
        <ReactCrop
          ruleOfThirds
          src={image.src}
          crop={image.crop}
          onChange={onCropChange}
          onImageLoaded={loadImageToRef}
          onComplete={crop => setCompletedCrop(crop)}
        />
        }
      </div>

      <div className='avatar avatar__previewer'>
        <canvas ref={previewCanvasRef} />
      </div>
    </div>

    <Button.Group className='btn btn__group'>
      <Button
        content='Huỷ'
        onClick={cancelHandler}
      />

      <Button primary
        content='Tiếp tục'
        onClick={uploadImage}
      />
    </Button.Group>

  </>)
}

const UPLOAD_AVATAR_MUTATION = gql`
  mutation UploadAvatar($avatar: Upload!) {
    uploadAvatar(avatar: $avatar) {
      url
    }
  }
`
