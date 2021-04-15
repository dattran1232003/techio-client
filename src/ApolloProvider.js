import React from 'react'
import App from './App.js'

import { setContext } from 'apollo-link-context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { createUploadLink } from 'apollo-upload-client'
import { getMainDefinition } from '@apollo/client/utilities'
import { 
  split,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/react-hooks'

import { typePolicies } from './util/cacheTypePolicies'
const cache = new InMemoryCache({ typePolicies })


const uploadLink = createUploadLink({
  uri: '//localhost:5000'
})

const authLinkSync = setContext(() => {
  const token = localStorage.getItem('jwtToken')
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:5000/subscriptions',
  options: {
    reconnect: true
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  uploadLink,
)

const client = new ApolloClient({
  cache,
  link: authLinkSync.concat(splitLink)
})

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
