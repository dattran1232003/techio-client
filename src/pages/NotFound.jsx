import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  useEffect(() => {
    const container = document.getElementsByClassName('ui container')[0]
    container.className += ' fluid'  
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
