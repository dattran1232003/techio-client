import React, { useState, createContext } from 'react'
import { Redirect } from 'react-router-dom'


const PersistPrevLinkContext = createContext({
  prevLink: null,
  setPrevLink(prevLink) {},
  RedirectPrevLink() {}
})

const PersistPrevLinkProvider = (props) => {
  const [prevLink, setPrevLinkState] = useState(null)

  function setPrevLink(prevLink) {
    setPrevLinkState(prevLink)
  }

  function RedirectPrevLink() {
    return <Redirect to={`${prevLink || '/posts'}`} />
  }
  return <PersistPrevLinkContext.Provider 
    value={{ prevLink, setPrevLink, RedirectPrevLink }} 
    {...props}
  />
}

export { PersistPrevLinkContext, PersistPrevLinkProvider }
