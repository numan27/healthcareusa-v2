import React from 'react'
import '../css/find-health-my-article.css'
// import '../css/find-healthcare-all-articles-bar.css'
import add_circle from '../svg-icons/add-circle.svg'


export default function Findhealthcareallarticlesbar() {
  return (
    <div className='find-healthcare-all-articles-bar'>
      <h3 className='articles-heading'>All Articles</h3>
      <button className='new-blog-post'><img src={add_circle} alt='add_circle'/> New Post</button>
    </div>
    
  )
}
