import React from 'react'
import { AuthContext } from '@context/auth'
import { useParams } from 'react-router-dom'
import { useFollow, useFollowers } from './hooks'
import { Tablet, Laptop } from '@dattr/react-responsive'

import './Profile.scss'

// private componets
import AboutUser from './AboutUser'
import Popularity from './Popularity'

function Profile() {
  const { username } = useParams()
  const { user: { avatarURL } } = React.useContext(AuthContext)

  // custom hooks
  const [followers] = useFollowers({ username })
  const [isFollowing, { followToggle }] = useFollow({ username })

  return (
    <div className="profile profile__container">
      <div className="profile profile__item about-user">
        <AboutUser 
          avatarURL={avatarURL} username={username}
          isFollowing={isFollowing} followToggle={followToggle} 
        />
      </div>

      <Tablet only andUp>
        <div className="profile profile__item">
          <Popularity followers={followers} thisGuyUsername={username}/>
        </div>
      </Tablet>

      <Laptop only andUp>
        <div className="profile profile__item">
        </div>
      </Laptop>
    </div>
  )
}

export default Profile
