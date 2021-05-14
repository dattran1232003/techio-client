import moment from 'moment'
import { Tags } from '@components'
import { useTags } from '@util/hooks'
import Markdown from 'react-markdown'
import { Link } from 'react-router-dom'
import React, { useContext } from 'react'
import { AuthContext } from '@context/auth'
import { useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/react-hooks'
import { Image, Grid, Button, Icon } from 'semantic-ui-react'

import './SinglePost.scss'

const SinglePost = () => {
  const { plainTitle } = useParams()
  const { loading, data } = useQuery(GET_POST, { variables: { plainTitle }})
  const tags = useTags()

  const { user } = useContext(AuthContext)
  const { body, createdAt, title, user: writter } = data?.getPost || {}

  return ( !loading &&     
    <Grid columns={2}>
      <Grid.Row className='super'>
        <Grid.Column className='super__container super__container--left' >
          <div className='post post__header'>
            <h1 className='title title--button-inside'>
              <strong className='strong strong__title strong__title--biggest'>{ title }</strong> 
              { user?.username === writter.username &&
              <Button animated className='btn btn--header-custom btn--rounded'
                color='green' basic size='medium'
                as={Link} to={`${plainTitle}/edit` }
              >
                <Button.Content hidden>Chỉnh sửa</Button.Content>
                <Button.Content visible>
                  <Icon name='setting' style={{ marginRight: 0 }} />
                </Button.Content>
              </Button>
              }
            </h1>

            <div className="post post__tag">
              <Tags tags={tags} />
            </div>

            <div className="post post__author post__author__container">
              <Image 
                className="post post__author__item post__author__avatar" 
                src={writter.avatarURL}
              />

              <div className="post post__author__item post__author__infor">
                <Link to={`/profile/${writter.username}`} className="post post__author__name"
                >{writter.username}</Link>

                <span className="post post__meta post__meta__writted-at"
                >{postDate(createdAt)}</span>
              </div>
            </div>
          </div>

          <div className='post post__content'>
            <Markdown>{body}</Markdown>
          </div>
        </Grid.Column>

        <Grid.Column className='super__container super__container--right'>
          <div className="rightcol rightcol__container">
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

function vietnameseMonth(num) {
  const converter = { 
    '1' : 'giêng', '2' : 'hai', '3' : 'ba', '4' : 'tư', '5' : 'năm', 
    '6' : 'sáu', '7' : 'bảy', '8' : 'tám', '9' : 'chín', '10': 'mười', 
    '11': 'mười một', '12': 'mười hai' 
  }
  return converter[parseInt(num).toString()] || num
}

function postDate(date) {
  const momentDate = moment(date)
  const day = momentDate.format('DD')
  const month = vietnameseMonth(momentDate.format('M'))
  const year = momentDate.format('YYYY')
  return `Viết ngày ${day} tháng ${month}, ${year}`

}

const GET_POST = gql`
  query GetPost($plainTitle: String) {
    getPost(plainTitle: $plainTitle) {
      id plainTitle body title draft likeCount commentCount createdAt
      user { username avatarURL }
      likes { username }
      comments { id username body }
    }
  }
`
export default SinglePost
