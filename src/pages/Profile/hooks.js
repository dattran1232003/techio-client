import { useState, useEffect } from 'react'
import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'

// check was me followed on this person
export function useFollow({ username: username=null }) {
  const [isFollowing, setIsFollowing] = useState(null)

  const [toggleFollow] = useMutation(TOGGLE_FOLLOW_MUTATION, {
    onCompleted({ toggleFollow: isFollowing }) {
      setIsFollowing(isFollowing)
    }
  })

  useQuery(CHECK_FOLLOWING_QUERY, {
    fetchPolicy: 'cache-and-network',
    variables: { username: username },
    onCompleted({ isFollowing }) {
      setIsFollowing(isFollowing) 
    },
  })

  const toggleFollowCallback = (username) => {
    setIsFollowing(!isFollowing)
    toggleFollow({ variables: { username } })
  }

  return [ 
    isFollowing, 
    {
      followToggle: toggleFollowCallback.bind(this, username),
    }
  ]
}

export function useFollowers({ username }) {
  const [followers, setFollowers] = useState([])

  const [getFollowers] = useLazyQuery(GET_FOLLOWER_LIST, {
    fetchPolicy: 'cache-and-network',
    variables: { username },
    onCompleted({ getUserInfo: { followers, followersCount } }) {
      setFollowers({ list: followers, count: followersCount })
    }
  })

  useEffect(() => getFollowers(), [])

  return [followers]
}

const CHECK_FOLLOWING_QUERY = gql`
  query IsFollowing($username: ID!) {
    isFollowing(username: $username)
  }
`
const GET_FOLLOWER_LIST = gql`
  query GetUserInfo($username: ID!) {
    getUserInfo(username: $username) {
      followers { username avatarURL }
      followersCount
    }
  }
`
const TOGGLE_FOLLOW_MUTATION = gql`
  mutation ToggleFollow($username: ID!) {
    toggleFollow(username: $username)
  }
`
