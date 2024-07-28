import React from 'react'
import '../css/find-health-my-article.css'
// import '../css/find-healthcare-article-banner.css'
import article_img from '../images/artical-image.png'
import Findhealthcaredropdownmenu from '../components/find-healthcare-dropdown-menu'

export default function Findhealthcarearticlebanner() {
  return (
    <div className='find-healthcare-article-banner'>
      <div className='row align-items-center'>
        <div className='col-lg-6 col-md-6 col-sm-12'>
          <div className='healthcare-article-name-img'>
            <img src={article_img} alt='img-article' />
            <div className='article-heading-name'>
              <h2>How to finance out of pocket costs</h2>
              <p>Cariologist</p>
            </div>
          </div>
        </div>
        <div className='col-lg-6 col-md-6 col=sm-12'>
          <div className='healthcare-article-status'>
            <div className='article-status-date'>
              <h3>Published</h3>
              <p>Jan 20, 2024</p>
            </div>
            <div className='article-status-date'>
              <h3>Updated</h3>
              <p>Mar 20, 2024</p>
            </div>
            <div className='healthcare-article-status-publish'>
              <h3>Published</h3>
            </div>
            <div className='article-banner-dropdown-menu'>
              <Findhealthcaredropdownmenu />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
