import React from 'react'
import '../css/find-healthcare-listing..css'
import doc_one from "../images/doc-one.png"
import Findhealthcaredropdownmenu from '../components/find-healthcare-dropdown-menu'

export default function Findhealtcarebannerads() {
    return (
        <div className='row find-helathcare-banner-ad'>
            <div className='col-lg-6 col-md-6 col-sm-12'>
                <div className='banner-ad-img-and-heading'>
                    <img className='banner-ad-img' src={doc_one} alt='doc-one' />
                    <div className='banner-ad-heading'>
                        <h2>Dr. Kimberly Douglas, MD <span>CLAIMED</span></h2>
                        <p>CHIROPRACTORS</p>
                    </div>
                </div>
            </div>
            <div className='col-lg-6 col-md-6 col-sm-12'>
                <div className='banner-ad-details-and-status'>
                    <div className='banner-ad-detail-plan details-text-style'>
                        <h3>Basic (Free)</h3>
                        <p>Active Plan</p>
                    </div>
                    <div className='banner-ad-detail-publish details-text-style'>
                        <h3>1 month ago</h3>
                        <p>Published</p>
                    </div>
                    <div className='banner-ad-detail-status'>
                        <h3>Active</h3>
                    </div>
                    <Findhealthcaredropdownmenu />
                </div>
            </div>
        </div>
    )
}
