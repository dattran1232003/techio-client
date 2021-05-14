import React from 'react'
import PropTypes from 'prop-types'

import {
  Image 
} from 'semantic-ui-react'

Popularity.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatarURL: PropTypes.string.isRequired,
    displayName: PropTypes.string
  }).isRequired)
}

function Popularity({ users }) {

  return (
    // TODO: List of people following thisPerson
    users.map(user => (
      <SingleAvatar key={'avatarMini'+user.username} user={user} />
    ))
    
    // TODO: My topics
  )
}

const SingleAvatar = ({ user: { avatarURL, username } }) => {
  return (
    <Image avatar lazy size='mini' src={avatarURL} />
  )
}

export default Popularity
