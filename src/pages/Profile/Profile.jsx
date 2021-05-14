import React from 'react'
import { useFollow } from './hooks'
import { AuthContext } from '@context/auth'
import { useParams } from 'react-router-dom'
import { Tablet, Laptop } from '@dattr/react-responsive'

import './Profile.scss'

// private componets
import AboutUser from './AboutUser'
import Popularity from './Popularity'

function Profile() {
  const { username } = useParams()
  const { user: { avatarURL } } = React.useContext(AuthContext)

  // custom hooks
  const [isFollowing, { followToggle }] = useFollow({ username })

  return (
    <div className="profile profile__container">
      <div className="profile profile__item about-user">
        <AboutUser 
          avatarURL={avatarURL} username={username}
          isFollowing={isFollowing} followToggle={followToggle} 
        />
      </div>

      <Tablet only>
        <div className="profile profile__item popularity">
          <Popularity users={[]}/>
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
