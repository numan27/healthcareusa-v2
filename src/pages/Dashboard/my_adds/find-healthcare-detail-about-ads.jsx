import React from 'react'
import '../css/find-healthcare-my-adds.css'
// import '../css/find-healthcare-detail-about-ads.css'
import Findhealthcaredropdownmenu from '../components/find-healthcare-dropdown-menu'

export default function Findhealthcaredetailaboutads() {
    return (
        <div className='find-healthcare-details-about-ads custom-grid-one'>
            <div className='details-about-ads-active-status'>
                <p>Active</p>
            </div>
            <div className='details-about-ads-campaing style-para-heading'>
                <p>CAMPAING</p>
                <h2>AD - 00011</h2>
            </div>
            <div className='details-about-ads-qunatity style-para-heading'>
                <p>Annually</p>
                <h2>Annually</h2>
            </div>
            <div className='details-about-ads-start-date style-para-heading'>
                <p>ads</p>
                <h2>5</h2>
            </div>
            <div className='details-about-ads-start-date style-para-heading'>
                <p>start date</p>
                <h2 className='ads-date'>Jan 20, 2024</h2>
            </div>
                <div className='details-about-ads-renewal-date style-para-heading'>
                    <p>renewal date</p>
                    <h2 className='ads-date'>Jan 20, 2024</h2>
                </div>

            <Findhealthcaredropdownmenu />
        </div>
    )
}
