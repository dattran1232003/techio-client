import { gql } from '@apollo/react-hooks'

export const FETCH_POSTS_QUERY = gql`
query GetPosts($offset: Int!, $limit: Int) {
  getPosts(offset: $offset, limit: $limit) {
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

export const GET_POST = gql`
  query GetPost($plainTitle: String) {
    getPost(plainTitle: $plainTitle) {
      id plainTitle username body title draft likeCount commentCount createdAt
      likes {
        username
      }
      comments {
        id username body
      }
    }
  }
`

export const GET_TOTAL = gql`
query($model: String!) {
  getTotal(model: $model) {
    model
    count
  }
}
`
