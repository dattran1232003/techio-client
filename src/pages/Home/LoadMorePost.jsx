import React from 'react'

const LoadMorePost = ({ disabled, loadMorePosts }) => {

  return ( disabled
    ? <span
      style={{ margin: '1rem auto', color: 'rgba(0, 0, 0, .9)' }}
    >Đã hết bài viết để hiển thị.</span>
    : <button className='btn btn__loadmore btn--medium btn--full-width btn--border-none'
      onClick={loadMorePosts}
    >Tải thêm...</button>
  )
}

export default LoadMorePost
