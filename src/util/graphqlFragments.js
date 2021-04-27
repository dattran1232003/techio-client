import { gql } from '@apollo/react-hooks'

export const CORE_USER_FIELDS = gql`
  fragment coreUserFields on User {
    id username avatarURL createdAt 
  }
`

export const CORE_POST_FIELDS = gql`
  fragment corePostFields on Post {
    id shortBody title plainTitle likeCount commentCount createdAt
  }
`
