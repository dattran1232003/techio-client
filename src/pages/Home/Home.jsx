import React, { useState } from 'react'
import { Grid, Menu, Ref } from 'semantic-ui-react'

import NewsBox from './NewsBox'
import RightMenu from './RightMenu'

function Home() {
  const contextRef = React.useRef()
  const [tabName, setTabname] = useState('posts-recent')
  const handleSwitchTab = (_, { name }) => setTabname(name)

  return (
    <Grid columns={2}>
      <Grid.Row className='super'>
        <Grid.Column className='super__container super__container--left'>
          <Menu tabular>
            <Menu.Item name='posts-recent'
              active={tabName === 'posts-recent'}
              onClick={handleSwitchTab}
            >Bài viết mới</Menu.Item>

            <Menu.Item name='posts-popular'
              active={tabName === 'posts-popular'}
              onClick={handleSwitchTab}
            >Bài viết hay</Menu.Item>
          </Menu>

          <Ref innerRef={contextRef}>
            <NewsBox type={tabName} />
          </Ref>

        </Grid.Column>


        <Grid.Column className='super__container super__container--right'>
          <RightMenu context={contextRef} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export { Home }
