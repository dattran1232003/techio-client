import React from 'react'
import moment from 'moment'
import { Loading } from '@components'
import { Link } from 'react-router-dom'
import LoadMorePost from './LoadMorePost'
import { Image, Icon, Item, Grid } from 'semantic-ui-react'
import { gql, useQuery, useSubscription } from '@apollo/react-hooks'
import { CORE_USER_FIELDS, CORE_POST_FIELDS } from '../../util/graphqlFragments'

import useNews from './useNews.jsx'

function NewsBox() {
  const [newsData, dispatch] = useNews({
    posts: [],
    totalPosts: 0
  })

  useQuery(gql`{ totalPost }`, { 
    onCompleted({ totalPost: total }) {
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

  const loadMorePosts = React.useCallback(_ => { 
    fetchMore({
      variables: { 
        offset: newsData.posts?.length || 0,
        limit: 10
      },
    })
  }, [newsData.posts?.length])
  
  React.useLayoutEffect(() => {
  const isBottom = (el) => 
    el.getBoundingClientRect().bottom <= window.innerHeight

    const loadMorePostOnScrollToBottom = () => {
      const wrapper = document.getElementById('posts-container')
      if(isBottom(wrapper)) loadMorePosts()
    }

    document.addEventListener('scroll', loadMorePostOnScrollToBottom)

    return () => document.removeEventListener('scroll', loadMorePostOnScrollToBottom)
  }, [newsData.posts?.length])

  return (
    <Grid id='posts-container' className='posts posts__container'>
      { loading
        ? <Loading />
        : <>
          { newsData.posts.map(post => 
          <SinglePost key={post.plainTitle} post={post}/>
          )}

          <LoadMorePost 
            disabled={newsData.posts.length >= newsData.total} 
            loadMorePosts={loadMorePosts} 
          />
        </>
      }

    </Grid>
  )
}

const SinglePost = React.memo(function SinglePost (
  { post: { title, plainTitle, shortBody, likeCount, commentCount, createdAt, user } }
) { return (
  <Grid.Row columns={2} className='posts__single-post'>
    <span className='posts__image'>
      <Image loading='lazy' size='mini' avatar src={user?.avatarURL} />
    </span>

    <Item className='posts__content'>
      <Item.Header className='posts__header posts__header--headline'
        as={Link} to={ `/posts/${plainTitle}` }
      >{ title }</Item.Header>

      <Item.Description className='posts__description'>{shortBody}</Item.Description>

      <Item.Extra className='posts__button--wrapper'>
        {likeCount} <Icon className='btn btn__in-post btn__like-post' name='thumbs up'/>
        {commentCount} <Icon className='btn btn__in-post btn__comment-post' name='comments' />
      </Item.Extra>

      <Item.Meta className='posts__meta' >
        <span>
          Viết bởi <Link to={ `profile/${user.username}` }>{user.username} </Link>
        vào {moment(createdAt).fromNow()}
        </span>
      </Item.Meta>
    </Item>
  </Grid.Row>
)}
)


const NEW_POST_SUBSCRIPTIONS = gql`
  ${CORE_POST_FIELDS}
  ${CORE_USER_FIELDS}
  subscription {
    publishPost {
      ...corePostFields
      user {
        ...coreUserFields
      }
    }
  }
`

const FETCH_POSTS_QUERY = gql`
  ${CORE_POST_FIELDS}
  ${CORE_USER_FIELDS}
  query GetPosts($offset: Int!, $limit: Int) {
    getPosts(offset: $offset, limit: $limit) {
      ...corePostFields
      user {
        ...coreUserFields
      }
    }
  }
`

export default NewsBox
