import React from 'react'
import PropTypes from 'prop-types'
import './UsersAvatarMini.scss'

UsersAvatarMini.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      fullname: PropTypes.string,
      username: PropTypes.string.isRequired,
      avatarURL: PropTypes.string.isRequired
    })
  ).isRequired 
}

UsersAvatarMini.defaultProps = {
}

function UsersAvatarMini({ users }) {
  return (
    users.map((user) => {
      return <AvatarMini key={ user.username } user={ user } />
    })
  )
}

const AvatarMini = React.memo(function AvatarMini({ user: { fullname='', username, avatarURL } }) {

})

export default UsersAvatarMini
