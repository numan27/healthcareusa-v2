import React from 'react'
import '../css/find-healthcare-listing..css'
import doc_one from "../images/doc-one.png"
import Findhealthcaredropdownmenu from '../components/find-healthcare-dropdown-menu'

export default function Findhealthcarebanneradwithdetails() {
    return (
        <div className='row find-helathcare-banner-ad-width-details'>
            <div className='col-lg-6 col-md-6 col-sm-12'>
                <div className='ad-img-and-heading'>
                    <img className='banner-ad-img' src={doc_one} alt='doc-one' />
                    <div className='banner-ad-heading'>
                        <h2>Dr. Kimberly Douglas, MD <span>CLAIMED</span></h2>
                        <p>CHIROPRACTORS</p>
                    </div>
                </div>
            </div>
            <div className='col-lg-6 col-md-6 col-sm-12'>
                <div className='banner-ad-details-status'>
                    <div className='details-text-style'>
                        <p>Phone</p>
                        <h3>(919) 333-4455</h3>
                    </div>
                    <div className='details-text-style'>
                        <p>Fax</p>
                        <h3>(919) 333-4455</h3>
                    </div>
                    <div className='details-text-style'>
                        <p>Email</p>
                        <h3>john@do.com</h3>
                    </div>

                    <Findhealthcaredropdownmenu />
                </div>
            </div>
        </div>
    )
}
