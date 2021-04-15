import React, { useState } from 'react'
import { Grid, Menu } from 'semantic-ui-react'

import NewsBox from './NewsBox'
import RightMenu from './RightMenu'

function Home() {
  const [tabName, setTabname] = useState('posts-recent')
  const handleSwitchTab = (_, { name }) => setTabname(name)

  return (
    <Grid columns={2}>
      <Grid.Row className='super'>
        <Grid.Column className='super__container super__container--left'
        >
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
          
          <NewsBox type={tabName} />
          
        </Grid.Column>


        <Grid.Column className='super__container super__container--right'>
          <RightMenu />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export { Home }
