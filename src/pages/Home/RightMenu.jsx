import React from 'react'
import { Tags } from '@components'
import { useTags } from '@util/hooks'
import * as UI from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { AuthContext } from '@context/auth'

// scss
import './RightMenu.scss'

function RightContainer({ context }) {
  const { user } = React.useContext(AuthContext)
  const tagsData = useTags()

  const avatarURLStyle = React.useMemo(() => ({
    '--user-avatar': `url(${user.avatarURL})` 
  }), [user?.avatarURL])

  return (
    <div className='rightcol rightcol__container'>
      { user?.username && <>
        <div className="rightcol rightcol__item rightcol__item--horizontal">
          <div className="overview overview__avatar" style={avatarURLStyle}/>
          <div className="overview overview__textwrapper overview__textwrapper--vertical">
            <span className="overview overview__text overview__text--primary overview__username">
              <Link to={`profile/${user.username}`}>{user.username}</Link>
            </span>
            <span className="overview overview__text overview__text--secondary overview__posts"
            ><span className='text text--highlighted'>0</span> bài viết.</span>
            <span className="overview overview__text overview__text--secondary overview__follower"
            ><span className='text text--highlighted'>0</span> người theo dõi.</span>
          </div>
        </div>
      </>}

      <UI.Sticky context={context}>
        <div className="rightcol rightcol__item">
          <OverviewHeader icon='tags'>Các chủ đề phổ biến:</OverviewHeader>
          <Tags tags={tagsData} />
        </div>
      </UI.Sticky> 
    </div>
  )
}

const OverviewHeader = (props) => (
  <p className="overview overview__header">
    <UI.Icon name={props.icon} size='small' />
    { props.children }
  </p>
)

export default RightContainer
