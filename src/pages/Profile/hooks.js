import { AuthContext } from '@context/auth'
import { useState, useEffect, useContext } from 'react'
import { gql, useLazyQuery, useMutation } from '@apollo/react-hooks'

export function useFollow({ username: personUsername=null }) {
  const { user: me } = useContext(AuthContext)
  const [isFollowing, setIsFollowing] = useState(false)

  const [toggleFollow] = useMutation(TOGGLE_FOLLOW_MUTATION, {
    onCompleted({ toggleFollow: isFollowing }) {
      setIsFollowing(isFollowing)
    }
  })

  const [checkIsFollowing] = useLazyQuery(CHECK_FOLLOWING_QUERY, {
    onCompleted({ isFollowing }) { 
      setIsFollowing(isFollowing) 
    }
  })

  const toggleFollowCallback = (personUsername) => {
    setIsFollowing(!isFollowing)
    toggleFollow({ variables: { username: personUsername } })
  }

  const checkIsFollowingCallback = (personUsername) => {
    checkIsFollowing({ variables: {username: personUsername } })
  }

  useEffect(checkIsFollowingCallback.bind(this, personUsername), [me.username])

  return [ 
    isFollowing, 
    {
      followToggle: toggleFollowCallback.bind(this, personUsername),
      checkIsFollowing: checkIsFollowingCallback.bind(this, personUsername),
    }
  ]
}

const CHECK_FOLLOWING_QUERY = gql`
  query IsFollowing($username: ID!) {
    isFollowing(username: $username)
  }
`
const TOGGLE_FOLLOW_MUTATION = gql`
  mutation ToggleFollow($username: ID!) {
    toggleFollow(username: $username)
  }
`
