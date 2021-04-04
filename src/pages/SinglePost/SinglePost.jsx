import { Link } from 'react-router-dom'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import Markdown from '@uiw/react-md-editor'
import { Grid, Button, Icon } from 'semantic-ui-react'

import './SinglePost.scss'
import { GET_POST } from '../../util/graphql'
import { AuthContext } from '../../context/auth'

const SinglePost = () => {
  const { plainTitle } = useParams()
  const { loading, data } = useQuery(GET_POST, { variables: { plainTitle },
  })

  const { user } = useContext(AuthContext)
  const { body, title, username } = data?.getPost || {}

  return ( !loading &&     
    <Grid columns={2}>
      <Grid.Row className='super'>
        <Grid.Column className='super__container super__container--left' >
          <div className='post post__header'>
            <h1 className='title title--button-inside'>
              <strong className='strong strong__title strong__title--biggest'>{ title }</strong> 
              { user?.username === username &&
              <Button animated className='btn btn--header-custom btn--rounded'
                color='green' basic size='medium'
                as={Link} to={ `${plainTitle}/edit` }
              >
                <Button.Content hidden>Chỉnh sửa</Button.Content>
                <Button.Content visible><Icon name='setting' style={{ marginRight: 0 }} /></Button.Content>
              </Button>
              }
            </h1>
          </div>
          <hr />

          <div className='post post__content'>
            <Markdown.Markdown source={body} />
          </div>
        </Grid.Column>

        <Grid.Column className='super__container super__container--right'>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default SinglePost
