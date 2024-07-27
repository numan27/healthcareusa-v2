import React from 'react'
import '../css/find-healthcare-my-adds.css'
import ListingAdsvalue from '../components/find-healthcare-alllisting-ads'
import Findhealthcaredetailaboutads from './find-healthcare-detail-about-ads'
import Findhealthcareadcampaignoverview from './find-healthcare-ad-campaign-overview'
import add_circle from '../svg-icons/add-circle.svg'



export default function Findhealthcaremyaddstwo() {
    return (
        <div className='find-healthcare-my-adds-two'>
            <div className='my-adds-main-heading-and-button'>
                <h1 className='my-ads-main-two-heading'>All Banner Ads</h1>
                <button className='my-ads-main-two-button'><img src={add_circle} alt='add_circle'/> New Campaign</button>
            </div>

            <ListingAdsvalue />
            <Findhealthcaredetailaboutads />
            <Findhealthcareadcampaignoverview />
        </div>
    )
}