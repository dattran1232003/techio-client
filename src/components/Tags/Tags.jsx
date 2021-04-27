import React from 'react'
import PropTypes from 'prop-types'
import { Label } from 'semantic-ui-react'

import './Tags.scss'

Tags.propTypes = {
  tags: PropTypes.array
}

Tags.defaultProps = {
  tags: []
}

function Tags({ tags }) { 
  return (
    <div className="tags tags__container">
      {tags.map(({ tagName, used }) => 
      <Tag className='tags tags__item' key={tagName} used={used}>{tagName}</Tag>
      )}    
    </div>
  )
}

const Tag = React.memo(function Tag({ children, used, className }) { 
  return <Label className={className} as='a'>
    <span>{ children }</span>
    <strong> { used }</strong>
  </Label>
})

export default React.memo(Tags)
