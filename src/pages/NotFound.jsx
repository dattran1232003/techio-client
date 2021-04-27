import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  const containerClassName = useRef()

  useEffect(() => {
    const container = document.getElementsByClassName('ui container')[0]
    containerClassName.current = container.className
    container.className += ' fluid'  
    return function cleanUp() { 
      container.className = containerClassName.current
    }  
  }, [])

  return (
    <div id="notfound">
      <div className="notfound"> 
        <div className="notfound-404">
          <h1>404</h1>
          <h2>Page not found</h2>
        </div>
        <Link href="#">Report</Link>
        <Link to="/">Home Page</Link>
      </div>
    </div>
  )
}

export default NotFound
