import React from 'react'
import { Pagination } from 'semantic-ui-react'

const Paginate = (props) => {
  const { onPageChange, totalPages, page, children } = props

  const PaginateBar = position => 
    <Pagination className={ `paginate paginate__${position || 'top'}` }
      onPageChange={onPageChange}
      activePage={page}
      pointing
      secondary
      firstItem={'⟨⟨'} lastItem={'⟩⟩'}
      prevItem={ '⟨'}
      nextItem={ '⟩'}
      totalPages={totalPages}
    />

  return <>
    { PaginateBar('top') } 
    { children }
    { PaginateBar('bottom') } 
  </>
}

export default Paginate
