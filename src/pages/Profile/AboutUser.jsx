import React from 'react'
import PropTypes from 'prop-types'
import { AuthContext } from '@context/auth'
import numberBeauty from '@util/number-beautier'
import { Image, Header, Statistic } from 'semantic-ui-react'

import './AboutUser.scss'

// UI components
import { 
  Button,
  Icon
} from 'semantic-ui-react'

AboutUser.propTypes = {
  isFollowing: PropTypes.bool,
  followToggle: PropTypes.func,
  username: PropTypes.string.isRequired,
  avatarURL: PropTypes.string.isRequired
}

AboutUser.defaultProps = {
  // ...default props
}

function AboutUser({ isFollowing, followToggle, username, avatarURL }) {
  // contexts
  const { user: me } = React.useContext(AuthContext)

  return (
    <div className="profile profile__about-user--container">
      <div className="profile profile__avatar">
        <Image size='tiny' avatar src={ avatarURL } />
      </div>

      <div className="profile profile__basic-info">
        <Header as="h2">{ username }</Header>

        <FollowButton 
          me={ me.username } person={ username }
          isFollowing={ isFollowing } followToggle={ followToggle }
        >
          <Icon name='rss' />{ isFollowing ? 'Đang theo dõi' : 'Theo dõi' }
        </FollowButton>
      </div>

      <div className="statistic statistic__three-col">
        <SingleStatistics label='Follower' value={2468} color='red' />
        <span className="statistic statistic__divider" />
        <SingleStatistics label='Bài viết' value={15} />
        <span className="statistic statistic__divider" />
        <SingleStatistics label='Likes' value={186652} />
      </div>
    </div>
  )
}

const SingleStatistics = React.memo(
  function SingleStatistics ({ label, value, color=null }) {
    return (
      <Statistic size='mini' color={color} className='statistic statistic__col'>
        <Statistic.Value>{numberBeauty(value)}</Statistic.Value>
        <span style={{ 
          color: 'rgba(0,0,0,.5)',
          paddingBottom: 4 
        }}>{ label }</span>
      </Statistic>
    )
  }
)

const FollowButton = ({  isFollowing, followToggle, me, person }) => {
  const CustomButton = (
    <Button
      color='black' style={{ fontWeight: 400 }} 
      basic={ !isFollowing } 
      onClick={ followToggle }
    >
      <Icon name='rss' />{ isFollowing ? 'Đang theo dõi' : 'Theo dõi' }
    </Button> 
  )

  return me !== person && CustomButton 
}

export default AboutUser
