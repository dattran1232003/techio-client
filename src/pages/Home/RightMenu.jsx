import React from 'react'
import './RightMenu.scss'
import { AuthContext } from '@context/auth'

function RightContainer(props) {
  const { user } = React.useContext(AuthContext)
  console.log({ user })
  return (
    <div className='overview overview__container'>
      <div className="overview overview__about-me">
        <div className="overview overview__avatar" style={{
          backgroundImage: `url(${user.avatarURL})`
        }}/>
      </div>
    </div>
  )
}
export default RightContainer
