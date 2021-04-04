import moment from 'moment'
import { Link } from 'react-router-dom'
import React from 'react'
import { Image, Icon, Item, Grid } from 'semantic-ui-react'
import { gql, useQuery, useSubscription } from '@apollo/react-hooks'

import LoadMorePost from './LoadMorePost'
import { Loading } from '../../components'
import {  GET_TOTAL, FETCH_POSTS_QUERY } from '../../util/graphql'
import useNews from './useNews.jsx'

function NewsBox() {
  const [newsData, dispatch] = useNews({
    posts: [],
    totalPosts: 0
  })

  useQuery(GET_TOTAL, { 
    variables: { model: 'Post' },
    onCompleted({ getTotal: { count: total } }) {
      dispatch({ type: 'LOAD_TOTAL', total })
    }
  })

  useSubscription(NEW_POST_SUBSCRIPTIONS, {
    onCompleted({ publishPost: newPost }) {
      dispatch({ type: 'ADD_POST', newPost })
    }
  })

  const { loading, data: getPostsData, fetchMore } = useQuery(FETCH_POSTS_QUERY, {
    variables: { offset: 0, limit: 10 },
  })

  const posts = getPostsData?.getPosts || []
  React.useEffect(() => {
    posts.length > 0 && dispatch({ type: 'LOAD_POSTS', posts })
  }, [posts])

  const handleLoadMorePosts = _ => fetchMore({
    variables: { 
      offset: newsData.posts.length,
      limit: 10
    },
  })



  return (
    <Grid className='posts posts__container'>
      { loading
        ? <Loading />
        : <>
          { newsData.posts.map((
            { title, plainTitle, shortBody, likeCount, commentCount, createdAt }
          ) => 
            <Grid.Row key={plainTitle} columns={2} className='posts__single-post'>
              <span className='posts__image'>
                <Image loading='lazy' size='mini' avatar src='//picsum.photos/200' />
              </span>

              <Item className='posts__content'>
                <Item.Header className='posts__header posts__header--headline'
                  as={Link} to={ `/posts/${plainTitle}` }
                >{ title }</Item.Header>

                <Item.Meta className='posts__meta'
                >{moment(createdAt).fromNow(true)}</Item.Meta>

                <Item.Description className='posts__description'>{shortBody}</Item.Description>

                <Item.Extra className='posts__button--wrapper'>
                  {likeCount} <Icon className='btn btn__in-post btn__like-post' name='thumbs up'/>
                  {commentCount} <Icon className='btn btn__in-post btn__comment-post' name='comments' />
                </Item.Extra>
              </Item>
            </Grid.Row>
            )}
          { console.log(newsData.posts.length) }
          <LoadMorePost 
            disabled={newsData.posts.length >= newsData.total} 
            handleLoadMorePosts={handleLoadMorePosts} 
          />
          </>
      }

    </Grid>
  )
}

const NEW_POST_SUBSCRIPTIONS = gql`
  subscription {
    publishPost {
      id username shortBody title plainTitle likeCount commentCount createdAt
      likes {
        username
      }
      comments {
        id username body
      }
    }
  }
`

export default NewsBox
