import { useReducer } from 'react'

function reducer(state, action) {
  const { posts, total } = state
  switch(action.type) {
    case 'LOAD_POSTS': 
      return { ...state, 
        posts: action.posts
      }
    case 'LOAD_TOTAL':
      return { ...state,
        total: action.total
      }
    case 'ADD_POST':
      return { ...state,
        posts: [action.newPost, ...posts],
        total: total + 1
      }
    default: 
      return state
  }
}

const useNews = (initialNews) => {
  return  useReducer(reducer, initialNews)
}

export default useNews
