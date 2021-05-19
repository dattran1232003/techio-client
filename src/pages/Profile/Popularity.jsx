import React from 'react'
import { repeat } from 'ramda'
import { Maybe } from '@util/fp'
import PropTypes from 'prop-types'
import { Popup } from 'semantic-ui-react'
import numberBeauty from '@util/number-beautier'

import './Popularity.scss'

import {
  Image 
} from 'semantic-ui-react'

Popularity.propTypes = {
  thisGuyUsername: PropTypes.string.isRequired,
  followers: PropTypes.shape({
    count: PropTypes.number,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        username: PropTypes.string.isRequired,
        avatarURL: PropTypes.string.isRequired,
        displayName: PropTypes.string
      })
    ).isRequired,
  })
}

Popularity.defaultProps = {
  followers: { count: 0, list: [] }
}

function Popularity({ followers, thisGuyUsername }) {
  
const mockFollowers = {
  list: repeat(
  { username: 'đuông dừa', 
    avatarURL: 'https://res.cloudinary.com/dd2ryr5fy/image/upload/v1617774801/techio/images/avatars/default-avatar_bxm3wr.png' 
  }, 20, []),
  count: 20 
}
  const followersList  = mockFollowers.list // followers.list || []
  const followersCount = Maybe.of(mockFollowers.count) // Maybe.of(followers.count || 0)
    .flatMap(numberBeautierChain)

  return (
    // TODO: List of people following thisPerson
    <div className="popularity popularity__container">
      <span className="popularity popularity__item popularity__description">
        <strong>{thisGuyUsername}</strong> có { followersCount.unwrap() } người theo dõi 
      </span>

      <div className="popularity popularity__item popularity__avatars">
        {
           followersList.map((user) => (
            <SingleAvatar key={'avatarMini'+user.username} user={user} />
          ))
        }
      </div>
    </div>
    
    // TODO: My topics
  )
}

const numberBeautierChain = n => Maybe.of(numberBeauty(n))

const SingleAvatar = ({ user: { avatarURL, username } }) => {
  return (
    <Popup size='tiny' content={username} inverted
      mouseEnterDelay={150}
      trigger={
        <Image avatar lazy='true' size='mini' src={avatarURL} />
      }
    />
  )
}

export default Popularity
